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
        this.loadProgress();
        
        console.log('🖥️ Know Your Damned Computer initialized');
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
        
        if (!menuToggle || !mobileMenu) return;

        menuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        menuToggle.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (mobileMenu && menuToggle) {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
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

    // Table of Contents Generation
    setupTableOfContents() {
        const tocList = document.getElementById('toc-list');
        if (!tocList) return;

        const headings = document.querySelectorAll('.guide-content h2, .guide-content h3, .guide-content h4');
        const tocItems = [];

        headings.forEach((heading, index) => {
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

            // Create TOC link
            const li = document.createElement('li');
            li.style.paddingLeft = `${(level - 2) * 1}rem`;
            
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToHeading(heading.id);
            });
            
            li.appendChild(a);
            tocList.appendChild(li);
        });

        // Setup intersection observer for active TOC highlighting
        this.setupTocHighlighting(tocItems);
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

    // Progress Management
    loadProgress() {
        const savedProgress = localStorage.getItem('kydc_progress');
        if (savedProgress) {
            this.userProgress = JSON.parse(savedProgress);
        } else {
            this.userProgress = {
                guides: {},
                exercises: {},
                overallProgress: 0
            };
        }
        this.updateProgressDisplay();
    }

    saveProgress() {
        localStorage.setItem('kydc_progress', JSON.stringify(this.userProgress));
    }

    markGuideComplete(guideSlug) {
        this.userProgress.guides[guideSlug] = {
            completed: true,
            completedAt: new Date().toISOString()
        };
        this.calculateOverallProgress();
        this.saveProgress();
        this.updateProgressDisplay();
    }

    markExerciseComplete(exerciseSlug, score = 100) {
        this.userProgress.exercises[exerciseSlug] = {
            completed: true,
            score: score,
            completedAt: new Date().toISOString()
        };
        this.calculateOverallProgress();
        this.saveProgress();
        this.updateProgressDisplay();
    }

    calculateOverallProgress() {
        // This would be calculated based on all available guides and exercises
        const totalGuides = 6; // file-management, file-paths, compression, file-formats, command-line, text-encoding
        const totalExercises = 12; // Estimated number of interactive exercises
        
        const completedGuides = Object.keys(this.userProgress.guides).length;
        const completedExercises = Object.keys(this.userProgress.exercises).length;
        
        this.userProgress.overallProgress = Math.round(
            ((completedGuides + completedExercises) / (totalGuides + totalExercises)) * 100
        );
    }

    updateProgressDisplay() {
        // Update overall progress if element exists
        const overallProgress = document.querySelector('[data-overall-progress]');
        if (overallProgress) {
            overallProgress.style.width = `${this.userProgress.overallProgress}%`;
        }

        // Update guide-specific progress
        // Update in-guide progress bars
        const guideProgressBars = document.querySelectorAll('.progress-fill[data-guide]');
        guideProgressBars.forEach(bar => {
            const guideSlug = bar.getAttribute('data-guide');
            const guideData = this.userProgress.guides[guideSlug] || {};
            const progress = typeof guideData.progress === 'number'
                ? guideData.progress
                : (guideData.completed ? 100 : 0);
            bar.style.width = `${Math.max(0, Math.min(progress, 100))}%`;
        });

        // Update homepage guide cards
        const overviewProgressBars = document.querySelectorAll('.progress-fill[data-guide-progress]');
        overviewProgressBars.forEach(bar => {
            const guideSlug = bar.getAttribute('data-guide-progress');
            const guideData = this.userProgress.guides[guideSlug] || {};
            const progress = typeof guideData.progress === 'number'
                ? guideData.progress
                : (guideData.completed ? 100 : 0);
            bar.style.width = `${Math.max(0, Math.min(progress, 100))}%`;
        });
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

    console.log('Reading mode toggle clicked');
    console.log('Overlay found:', !!overlay);
    console.log('Content found:', !!content);

    if (!overlay) {
        console.error('Reading mode overlay not found');
        return;
    }

    if (!content) {
        console.error('Guide content not found');
        return;
    }

    if (overlay.style.display === 'none' || !overlay.style.display) {
        // Enter reading mode
        console.log('Entering reading mode');
        const readingContent = overlay.querySelector('.reading-content');
        if (readingContent) {
            readingContent.innerHTML = content.innerHTML;
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log('Reading mode activated');
        } else {
            console.error('Reading content container not found');
        }
    } else {
        // Exit reading mode
        console.log('Exiting reading mode');
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
