/**
 * Know Your Damned Computer - Reading Mode for Quarto
 * Provides a distraction-free reading experience
 */

(function() {
    'use strict';

    class ReadingMode {
        constructor() {
            this.overlay = null;
            this.isActive = false;
            this.focusTrap = null;
            this.init();
        }

        init() {
            this.createOverlay();
            this.createToggleButton();
            this.setupKeyboardShortcuts();
            this.injectStyles();
        }

        createOverlay() {
            // Check if overlay already exists
            if (document.getElementById('kydc-reading-overlay')) {
                this.overlay = document.getElementById('kydc-reading-overlay');
                return;
            }

            this.overlay = document.createElement('div');
            this.overlay.id = 'kydc-reading-overlay';
            this.overlay.className = 'kydc-reading-overlay';
            this.overlay.setAttribute('role', 'dialog');
            this.overlay.setAttribute('aria-modal', 'true');
            this.overlay.setAttribute('aria-label', 'Reading mode');
            this.overlay.innerHTML = `
                <div class="kydc-reading-container">
                    <div class="kydc-reading-header">
                        <h2 class="kydc-reading-title"></h2>
                        <div class="kydc-reading-controls">
                            <button class="kydc-font-decrease" aria-label="Decrease font size" title="Decrease font size">A-</button>
                            <button class="kydc-font-increase" aria-label="Increase font size" title="Increase font size">A+</button>
                            <button class="kydc-reading-close" aria-label="Close reading mode" title="Close (Esc)">×</button>
                        </div>
                    </div>
                    <div class="kydc-reading-content" tabindex="0"></div>
                </div>
            `;

            document.body.appendChild(this.overlay);
            this.setupOverlayEvents();
        }

        setupOverlayEvents() {
            // Close button
            const closeBtn = this.overlay.querySelector('.kydc-reading-close');
            closeBtn.addEventListener('click', () => this.close());

            // Font size controls
            const decreaseBtn = this.overlay.querySelector('.kydc-font-decrease');
            const increaseBtn = this.overlay.querySelector('.kydc-font-increase');

            decreaseBtn.addEventListener('click', () => this.adjustFontSize(-2));
            increaseBtn.addEventListener('click', () => this.adjustFontSize(2));

            // Close on overlay background click
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });
        }

        createToggleButton() {
            // Check if toggle already exists
            if (document.querySelector('.kydc-reading-toggle')) return;

            const toggle = document.createElement('button');
            toggle.className = 'kydc-reading-toggle';
            toggle.setAttribute('aria-label', 'Enter reading mode');
            toggle.setAttribute('title', 'Reading mode (R)');
            toggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
            `;

            toggle.addEventListener('click', () => this.toggle());

            // Insert into page - look for Quarto header tools or create fixed position
            const headerTools = document.querySelector('.quarto-title-tools') ||
                               document.querySelector('.page-navigation') ||
                               document.querySelector('header');

            if (headerTools) {
                headerTools.appendChild(toggle);
            } else {
                toggle.classList.add('kydc-reading-toggle-fixed');
                document.body.appendChild(toggle);
            }
        }

        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // 'R' to toggle reading mode (when not in input)
                if (e.key === 'r' || e.key === 'R') {
                    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
                        e.preventDefault();
                        this.toggle();
                    }
                }

                // Escape to close
                if (e.key === 'Escape' && this.isActive) {
                    this.close();
                }
            });
        }

        toggle() {
            if (this.isActive) {
                this.close();
            } else {
                this.open();
            }
        }

        open() {
            // Get main content
            const mainContent = document.querySelector('main .content') ||
                               document.querySelector('main') ||
                               document.querySelector('.quarto-section-container') ||
                               document.querySelector('article');

            if (!mainContent) {
                console.warn('Could not find main content for reading mode');
                return;
            }

            // Clone content (excluding nav, sidebar, etc.)
            const contentClone = mainContent.cloneNode(true);

            // Remove interactive elements that might not work in the overlay
            const elementsToRemove = contentClone.querySelectorAll(
                '.sidebar, .toc, nav, .page-navigation, .kydc-reading-toggle, .quarto-margin-sidebar'
            );
            elementsToRemove.forEach(el => el.remove());

            // Get page title
            const pageTitle = document.querySelector('h1')?.textContent ||
                             document.querySelector('.title')?.textContent ||
                             'Reading Mode';

            // Update overlay
            const readingContent = this.overlay.querySelector('.kydc-reading-content');
            const titleEl = this.overlay.querySelector('.kydc-reading-title');

            titleEl.textContent = pageTitle;
            readingContent.innerHTML = contentClone.innerHTML;

            // Show overlay
            this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.isActive = true;

            // Set up focus trap
            this.setupFocusTrap();

            // Focus the content area for keyboard scrolling
            readingContent.focus();

            // Restore saved font size
            this.restoreFontSize();
        }

        close() {
            this.overlay.classList.remove('active');
            document.body.style.overflow = '';
            this.isActive = false;

            // Return focus to toggle button
            const toggle = document.querySelector('.kydc-reading-toggle');
            if (toggle) toggle.focus();
        }

        setupFocusTrap() {
            const focusableElements = this.overlay.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            this.overlay.addEventListener('keydown', (e) => {
                if (e.key !== 'Tab') return;

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            });
        }

        adjustFontSize(delta) {
            const content = this.overlay.querySelector('.kydc-reading-content');
            const currentSize = parseInt(getComputedStyle(content).fontSize);
            const newSize = Math.min(Math.max(currentSize + delta, 14), 32);

            content.style.fontSize = `${newSize}px`;

            // Save preference
            try {
                localStorage.setItem('kydc_reading_font_size', newSize);
            } catch (e) {
                // localStorage not available
            }
        }

        restoreFontSize() {
            try {
                const savedSize = localStorage.getItem('kydc_reading_font_size');
                if (savedSize) {
                    const content = this.overlay.querySelector('.kydc-reading-content');
                    content.style.fontSize = `${savedSize}px`;
                }
            } catch (e) {
                // localStorage not available
            }
        }

        injectStyles() {
            if (document.getElementById('kydc-reading-styles')) return;

            const styles = document.createElement('style');
            styles.id = 'kydc-reading-styles';
            styles.textContent = `
                .kydc-reading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 9999;
                    display: none;
                    justify-content: center;
                    align-items: flex-start;
                    overflow-y: auto;
                    padding: 2rem;
                }

                .kydc-reading-overlay.active {
                    display: flex;
                }

                .kydc-reading-container {
                    background: var(--bs-body-bg, #fff);
                    color: var(--bs-body-color, #212529);
                    max-width: 720px;
                    width: 100%;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    margin: 1rem auto;
                }

                .kydc-reading-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid var(--bs-border-color, #dee2e6);
                    position: sticky;
                    top: 0;
                    background: var(--bs-body-bg, #fff);
                    border-radius: 8px 8px 0 0;
                }

                .kydc-reading-title {
                    font-size: 1.25rem;
                    margin: 0;
                    font-weight: 600;
                }

                .kydc-reading-controls {
                    display: flex;
                    gap: 0.5rem;
                }

                .kydc-reading-controls button {
                    background: var(--bs-secondary-bg, #e9ecef);
                    border: none;
                    padding: 0.5rem 0.75rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.875rem;
                    color: var(--bs-body-color, #212529);
                    transition: background 0.2s;
                }

                .kydc-reading-controls button:hover {
                    background: var(--bs-tertiary-bg, #dee2e6);
                }

                .kydc-reading-close {
                    font-size: 1.5rem !important;
                    line-height: 1;
                    padding: 0.25rem 0.75rem !important;
                }

                .kydc-reading-content {
                    padding: 2rem;
                    font-size: 18px;
                    line-height: 1.8;
                    outline: none;
                }

                .kydc-reading-content h1,
                .kydc-reading-content h2,
                .kydc-reading-content h3 {
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }

                .kydc-reading-content p {
                    margin-bottom: 1.5rem;
                }

                .kydc-reading-content code {
                    background: var(--bs-secondary-bg, #e9ecef);
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                }

                .kydc-reading-content pre {
                    background: var(--bs-secondary-bg, #f8f9fa);
                    padding: 1rem;
                    border-radius: 4px;
                    overflow-x: auto;
                }

                /* Toggle button */
                .kydc-reading-toggle {
                    background: var(--bs-primary, #0d6efd);
                    color: white;
                    border: none;
                    padding: 0.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }

                .kydc-reading-toggle:hover {
                    background: var(--bs-primary-hover, #0b5ed7);
                }

                .kydc-reading-toggle-fixed {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 100;
                    padding: 0.75rem;
                    border-radius: 50%;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                }

                /* Dark mode adjustments */
                [data-bs-theme="dark"] .kydc-reading-container,
                .quarto-dark .kydc-reading-container {
                    background: #1a1a1a;
                    color: #e9e9e9;
                }

                [data-bs-theme="dark"] .kydc-reading-header,
                .quarto-dark .kydc-reading-header {
                    background: #1a1a1a;
                    border-color: #333;
                }

                [data-bs-theme="dark"] .kydc-reading-controls button,
                .quarto-dark .kydc-reading-controls button {
                    background: #333;
                    color: #e9e9e9;
                }

                [data-bs-theme="dark"] .kydc-reading-controls button:hover,
                .quarto-dark .kydc-reading-controls button:hover {
                    background: #444;
                }

                @media (max-width: 768px) {
                    .kydc-reading-overlay {
                        padding: 0;
                    }

                    .kydc-reading-container {
                        border-radius: 0;
                        min-height: 100vh;
                    }

                    .kydc-reading-header {
                        border-radius: 0;
                    }

                    .kydc-reading-content {
                        padding: 1rem;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }

    // Initialize on page load and Quarto navigation
    function initReadingMode() {
        window.kydcReadingMode = new ReadingMode();
    }

    // Standard DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReadingMode);
    } else {
        initReadingMode();
    }

    // Quarto navigation event
    document.addEventListener('quarto:page-load', () => {
        setTimeout(initReadingMode, 100);
    });

    // Export for use elsewhere
    window.KYDCReadingMode = ReadingMode;
})();
