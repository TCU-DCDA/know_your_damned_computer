/**
 * Know Your Damned Computer - Main JavaScript
 * Interactive functionality for DH Computer Skills Guide
 */

class KnowYourComputer {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupTableOfContents();
        this.setupSmoothScrolling();
        this.setupReadingProgress();
        this.initializeTooltips();

        // Load user preferences
        this.loadTheme();
    }

    // Theme Management
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update icon
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Mobile Menu
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        if (!menuToggle || !mobileMenu) {
            return;
        }

        // Use a single handler that works for both touch and click
        // Track if touch was used to prevent double-firing
        let touchUsed = false;

        menuToggle.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            touchUsed = true;
            this.toggleMobileMenu();
        });

        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Only handle click if touch wasn't just used
            if (!touchUsed) {
                this.toggleMobileMenu();
            }
            touchUsed = false;
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside (with delay to avoid immediate close)
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') &&
                !menuToggle.contains(e.target) &&
                !mobileMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

    }
    
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (mobileMenu && menuToggle) {
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            } else {
                mobileMenu.classList.add('active');
                menuToggle.classList.add('active');
            }
            
        }
    }
    
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (mobileMenu && menuToggle) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }

    // Table of Contents Generation with Collapsible Sections
    setupTableOfContents() {
        const tocList = document.getElementById('toc-list');
        if (!tocList) return;

        const headings = document.querySelectorAll('.guide-content h2, .guide-content h3, .guide-content h4');
        const tocItems = [];

        // Build hierarchical structure
        let currentSection = null;
        let currentSublist = null;

        headings.forEach((heading) => {
            // Generate ID if it doesn't exist
            if (!heading.id) {
                heading.id = this.slugify(heading.textContent);
            }

            const level = parseInt(heading.tagName.charAt(1));
            const tocItem = {
                id: heading.id,
                text: heading.textContent,
                level: level
            };
            tocItems.push(tocItem);

            if (level === 2) {
                // H2: Create a new collapsible section
                const li = document.createElement('li');
                li.className = 'toc-section';

                // Section header with toggle
                const sectionHeader = document.createElement('div');
                sectionHeader.className = 'toc-section-header';

                const toggle = document.createElement('button');
                toggle.className = 'toc-toggle';
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Toggle section');
                toggle.innerHTML = '<i class="fas fa-chevron-right"></i>';

                const a = document.createElement('a');
                a.href = `#${heading.id}`;
                a.textContent = heading.textContent;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.scrollToHeading(heading.id);
                });

                sectionHeader.appendChild(toggle);
                sectionHeader.appendChild(a);
                li.appendChild(sectionHeader);

                // Create sublist for children (hidden by default)
                const sublist = document.createElement('ul');
                sublist.className = 'toc-subsection collapsed';
                li.appendChild(sublist);
                currentSublist = sublist;

                // Toggle click handler - use sublist directly to avoid closure issue
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleTocSection(toggle, sublist);
                });

                // Also toggle when clicking the section header area
                sectionHeader.addEventListener('click', (e) => {
                    if (e.target === sectionHeader) {
                        this.toggleTocSection(toggle, sublist);
                    }
                });

                tocList.appendChild(li);
                currentSection = li;

            } else if (level === 3 || level === 4) {
                // H3/H4: Add to current section's sublist
                const li = document.createElement('li');
                li.className = level === 4 ? 'toc-item toc-item-deep' : 'toc-item';

                const a = document.createElement('a');
                a.href = `#${heading.id}`;
                a.textContent = heading.textContent;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.scrollToHeading(heading.id);
                });

                li.appendChild(a);

                if (currentSublist) {
                    currentSublist.appendChild(li);
                } else {
                    // If no current section, add directly to main list
                    tocList.appendChild(li);
                }
            }
        });

        // Setup intersection observer for active TOC highlighting
        this.setupTocHighlighting(tocItems);
    }

    toggleTocSection(toggle, sublist) {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', !isExpanded);
        toggle.querySelector('i').className = isExpanded ? 'fas fa-chevron-right' : 'fas fa-chevron-down';

        if (isExpanded) {
            sublist.classList.add('collapsed');
        } else {
            sublist.classList.remove('collapsed');
        }
    }

    setupTocHighlighting(tocItems) {
        const tocLinks = document.querySelectorAll('.toc a');
        const headings = tocItems.map(item => document.getElementById(item.id));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all TOC links
                    tocLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current heading's TOC link
                    const activeLink = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px'
        });

        headings.forEach(heading => {
            if (heading) observer.observe(heading);
        });
    }

    scrollToHeading(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Reading Progress
    setupReadingProgress() {
        const progressFill = document.querySelector('.guide-progress .progress-fill');
        if (!progressFill) return;

        const updateProgress = () => {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight - winHeight;
            const scrollTop = window.pageYOffset;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressFill.style.width = `${Math.min(scrollPercent, 100)}%`;
            
            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = `${Math.round(scrollPercent)}% complete`;
            }
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial call
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Tooltips
    initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.getAttribute('data-tooltip'));
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.id = 'active-tooltip';
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    }

    hideTooltip() {
        const tooltip = document.getElementById('active-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Utility Functions
    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Feedback System
    submitFeedback(guideSlug, feedbackType) {
        // Store feedback locally for now
        const feedback = {
            guide: guideSlug,
            type: feedbackType,
            timestamp: new Date().toISOString()
        };
        
        let allFeedback = JSON.parse(localStorage.getItem('kydc_feedback') || '[]');
        allFeedback.push(feedback);
        localStorage.setItem('kydc_feedback', JSON.stringify(allFeedback));
        
        // Show thank you message
        this.showNotification('Thank you for your feedback!', 'success');
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after duration
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

// Reading Mode
function toggleReadingMode() {
    const overlay = document.getElementById('reading-mode-overlay');
    const content = document.querySelector('.guide-content .guide-body');

    if (!overlay || !content) {
        return;
    }

    if (overlay.style.display === 'none' || !overlay.style.display) {
        // Enter reading mode
        const readingContent = overlay.querySelector('.reading-content');
        if (readingContent) {
            readingContent.innerHTML = content.innerHTML;
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    } else {
        // Exit reading mode
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function startInteractiveMode() {
    // Enable interactive features on the current page
    const quizzes = document.querySelectorAll('.quiz');
    const exercises = document.querySelectorAll('.exercise');
    const terminals = document.querySelectorAll('.terminal-simulator');

    if (quizzes.length || exercises.length || terminals.length) {
        // Highlight interactive elements
        quizzes.forEach(quiz => quiz.classList.add('highlight-interactive'));
        exercises.forEach(exercise => exercise.classList.add('highlight-interactive'));
        terminals.forEach(terminal => terminal.classList.add('highlight-interactive'));

        // Scroll to first interactive element
        const firstInteractive = document.querySelector('.quiz, .exercise, .terminal-simulator');
        if (firstInteractive) {
            firstInteractive.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        window.kydc.showNotification('Interactive mode activated! Quizzes and exercises are now highlighted.', 'success');
    } else {
        window.kydc.showNotification('No interactive elements found on this page.', 'info');
    }
}

// Global mobile menu toggle function
function toggleMobileMenu() {
    if (window.kydc) {
        window.kydc.toggleMobileMenu();
    }
}

// Global feedback function (called from templates)
function submitFeedback(guideSlug, feedbackType) {
    if (window.kydc) {
        window.kydc.submitFeedback(guideSlug, feedbackType);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.kydc = new KnowYourComputer();
});
