/**
 * Know Your Damned Computer - Progress Tracking for Quarto
 * Tracks reading progress and guide completion using localStorage
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'kydc_progress';
    const COMPLETED_KEY = 'kydc_completed_guides';

    class ProgressTracker {
        constructor() {
            this.currentGuide = this.getCurrentGuide();
            this.progressData = this.loadProgress();
            this.init();
        }

        init() {
            // Only run on guide pages
            if (!this.currentGuide) return;

            this.createProgressBar();
            this.setupScrollTracking();
            this.updateProgressBar();

            // Mark guide as started
            this.markGuideStarted(this.currentGuide);
        }

        getCurrentGuide() {
            // Extract guide name from URL path
            const path = window.location.pathname;
            const match = path.match(/guides\/([^\/\.]+)/);
            return match ? match[1] : null;
        }

        loadProgress() {
            try {
                const data = localStorage.getItem(STORAGE_KEY);
                return data ? JSON.parse(data) : {};
            } catch (e) {
                console.warn('Could not load progress from localStorage:', e);
                return {};
            }
        }

        saveProgress() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progressData));
            } catch (e) {
                console.warn('Could not save progress to localStorage:', e);
            }
        }

        createProgressBar() {
            // Check if progress bar already exists
            if (document.querySelector('.kydc-progress-bar')) return;

            const progressBar = document.createElement('div');
            progressBar.className = 'kydc-progress-bar';
            progressBar.innerHTML = `
                <div class="kydc-progress-fill"></div>
                <span class="kydc-progress-text">0% complete</span>
            `;

            // Insert at top of main content area
            const mainContent = document.querySelector('main') || document.querySelector('.content') || document.body;
            mainContent.insertBefore(progressBar, mainContent.firstChild);

            // Add styles
            this.injectStyles();
        }

        injectStyles() {
            if (document.getElementById('kydc-progress-styles')) return;

            const styles = document.createElement('style');
            styles.id = 'kydc-progress-styles';
            styles.textContent = `
                .kydc-progress-bar {
                    position: sticky;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: var(--bs-gray-200, #e9ecef);
                    z-index: 1000;
                    overflow: hidden;
                }

                .kydc-progress-fill {
                    height: 100%;
                    width: 0%;
                    background: linear-gradient(90deg, var(--bs-primary, #0d6efd), var(--bs-info, #0dcaf0));
                    transition: width 0.3s ease;
                }

                .kydc-progress-text {
                    position: absolute;
                    right: 10px;
                    top: 8px;
                    font-size: 0.75rem;
                    color: var(--bs-secondary, #6c757d);
                    background: var(--bs-body-bg, white);
                    padding: 2px 8px;
                    border-radius: 4px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .kydc-progress-bar:hover .kydc-progress-text {
                    opacity: 1;
                }

                /* Completion badge for sidebar */
                .kydc-completed-badge {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: var(--bs-success, #198754);
                    border-radius: 50%;
                    margin-left: 8px;
                    font-size: 10px;
                    line-height: 16px;
                    text-align: center;
                    color: white;
                }

                .kydc-completed-badge::after {
                    content: '✓';
                }
            `;
            document.head.appendChild(styles);
        }

        setupScrollTracking() {
            let ticking = false;

            const updateOnScroll = () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        this.updateProgressBar();
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', updateOnScroll, { passive: true });
        }

        updateProgressBar() {
            const fill = document.querySelector('.kydc-progress-fill');
            const text = document.querySelector('.kydc-progress-text');

            if (!fill) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

            fill.style.width = `${progress}%`;

            if (text) {
                text.textContent = `${Math.round(progress)}% complete`;
            }

            // Save progress for this guide
            if (this.currentGuide) {
                this.progressData[this.currentGuide] = {
                    progress: Math.round(progress),
                    lastVisited: new Date().toISOString()
                };

                // Mark as completed if scrolled to bottom
                if (progress >= 95) {
                    this.markGuideCompleted(this.currentGuide);
                }

                this.saveProgress();
            }
        }

        markGuideStarted(guide) {
            if (!this.progressData[guide]) {
                this.progressData[guide] = {
                    progress: 0,
                    lastVisited: new Date().toISOString(),
                    started: new Date().toISOString()
                };
                this.saveProgress();
            }
        }

        markGuideCompleted(guide) {
            try {
                let completed = JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]');
                if (!completed.includes(guide)) {
                    completed.push(guide);
                    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
                }
                this.updateSidebarBadges();
            } catch (e) {
                console.warn('Could not save completion status:', e);
            }
        }

        updateSidebarBadges() {
            try {
                const completed = JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]');

                // Find sidebar links and add badges
                const sidebarLinks = document.querySelectorAll('.sidebar-item a, .sidebar-navigation a');
                sidebarLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (!href) return;

                    const guideMatch = href.match(/guides\/([^\/\.]+)/);
                    if (guideMatch && completed.includes(guideMatch[1])) {
                        if (!link.querySelector('.kydc-completed-badge')) {
                            const badge = document.createElement('span');
                            badge.className = 'kydc-completed-badge';
                            badge.title = 'Completed';
                            link.appendChild(badge);
                        }
                    }
                });
            } catch (e) {
                console.warn('Could not update sidebar badges:', e);
            }
        }

        // Static method to get overall progress
        static getOverallProgress() {
            try {
                const progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
                const completed = JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]');

                const totalGuides = 8; // Total number of guides
                const completedCount = completed.length;

                return {
                    completedGuides: completedCount,
                    totalGuides: totalGuides,
                    percentage: Math.round((completedCount / totalGuides) * 100),
                    details: progress
                };
            } catch (e) {
                return { completedGuides: 0, totalGuides: 8, percentage: 0, details: {} };
            }
        }

        // Static method to reset progress
        static resetProgress() {
            try {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(COMPLETED_KEY);
                window.location.reload();
            } catch (e) {
                console.warn('Could not reset progress:', e);
            }
        }
    }

    // Exercise completion handler (replaces inline onclick)
    function setupExerciseButtons() {
        document.querySelectorAll('.kydc-exercise-complete').forEach(button => {
            // Avoid attaching duplicate listeners
            if (button.dataset.listenerAttached) return;
            button.dataset.listenerAttached = 'true';

            button.addEventListener('click', function() {
                const exerciseId = this.dataset.exercise;
                if (!exerciseId) return;

                markExerciseComplete(exerciseId);

                // Visual feedback
                this.textContent = 'Completed!';
                this.disabled = true;
                this.classList.remove('btn-success');
                this.classList.add('btn-secondary');
            });
        });
    }

    // Global function for backwards compatibility
    function markExerciseComplete(exerciseId) {
        try {
            const EXERCISES_KEY = 'kydc_exercises_completed';
            let exercises = JSON.parse(localStorage.getItem(EXERCISES_KEY) || '[]');
            if (!exercises.includes(exerciseId)) {
                exercises.push(exerciseId);
                localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
            }
        } catch (e) {
            console.warn('Could not save exercise completion:', e);
        }
    }

    // Expose globally for any remaining inline handlers
    window.markExerciseComplete = markExerciseComplete;

    // Initialize on page load and Quarto navigation
    function initTracker() {
        window.kydcProgress = new ProgressTracker();
        setupExerciseButtons();
    }

    // Standard DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTracker);
    } else {
        initTracker();
    }

    // Quarto navigation event (for SPA-style navigation)
    document.addEventListener('quarto:page-load', () => {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
            initTracker();
            setupExerciseButtons();
        }, 100);
    });

    // Export for use elsewhere
    window.KYDCProgressTracker = ProgressTracker;
})();
