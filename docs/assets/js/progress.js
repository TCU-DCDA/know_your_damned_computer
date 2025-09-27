/**
 * Progress Tracking System for Interactive DH Computer Skills Guide
 * Handles user progress across guides and exercises
 */

class ProgressTracker {
    constructor() {
        this.storageKey = 'kydc_progress';
        this.progress = this.loadProgress();
        this.init();
    }

    init() {
        this.setupProgressElements();
        this.updateAllProgressBars();
        console.log('📊 Progress Tracker initialized');
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : this.getDefaultProgress();
        } catch (error) {
            console.warn('Failed to load progress, using defaults:', error);
            return this.getDefaultProgress();
        }
    }

    getDefaultProgress() {
        return {
            guides: {
                'file-management': { completed: false, progress: 0, timeSpent: 0 },
                'file-paths': { completed: false, progress: 0, timeSpent: 0 },
                'compression': { completed: false, progress: 0, timeSpent: 0 },
                'file-formats': { completed: false, progress: 0, timeSpent: 0 },
                'command-line': { completed: false, progress: 0, timeSpent: 0 },
                'text-encoding': { completed: false, progress: 0, timeSpent: 0 }
            },
            exercises: {},
            quizzes: {},
            overall: {
                startedAt: new Date().toISOString(),
                totalTimeSpent: 0,
                completionPercentage: 0,
                streak: 0,
                lastActivity: new Date().toISOString()
            },
            achievements: [],
            preferences: {
                darkMode: false,
                reminderEnabled: true,
                soundEnabled: true
            }
        };
    }

    saveProgress() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
        } catch (error) {
            console.error('Failed to save progress:', error);
        }
    }

    setupProgressElements() {
        // Setup reading progress for current page
        this.setupReadingProgress();
        
        // Setup section completion tracking
        this.setupSectionTracking();
        
        // Setup exercise progress
        this.setupExerciseProgress();
        
        // Setup overall progress dashboard
        this.setupDashboard();
    }

    setupReadingProgress() {
        const progressBar = document.querySelector('.progress-fill[data-guide]');
        if (!progressBar) return;

        const guideSlug = progressBar.getAttribute('data-guide');
        if (!guideSlug) return;

        let readingStartTime = Date.now();
        let isReading = true;

        // Track scroll progress
        const updateReadingProgress = () => {
            if (!isReading) return;

            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = Math.min((scrolled / documentHeight) * 100, 100);

            // Update progress bar
            progressBar.style.width = `${progress}%`;
            
            // Update text if exists
            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = `${Math.round(progress)}% complete`;
            }

            // Update stored progress
            this.updateGuideProgress(guideSlug, progress);

            // Mark as completed if user scrolled to 90%
            if (progress >= 90 && !this.progress.guides[guideSlug]?.completed) {
                this.markGuideComplete(guideSlug);
            }
        };

        // Throttled scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateReadingProgress, 100);
        });

        // Track time spent reading
        const trackTimeSpent = () => {
            if (isReading) {
                const timeSpent = Date.now() - readingStartTime;
                this.addTimeSpent(guideSlug, timeSpent);
                readingStartTime = Date.now();
            }
        };

        // Track when user leaves/returns to page
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isReading = false;
                trackTimeSpent();
            } else {
                isReading = true;
                readingStartTime = Date.now();
            }
        });

        // Track when user leaves page
        window.addEventListener('beforeunload', trackTimeSpent);

        // Initial progress update
        updateReadingProgress();
    }

    setupSectionTracking() {
        // Track which sections user has visited
        const sections = document.querySelectorAll('h2, h3');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id || this.slugify(entry.target.textContent);
                    this.markSectionVisited(sectionId);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    setupExerciseProgress() {
        const exercises = document.querySelectorAll('[data-exercise]');
        exercises.forEach(exercise => {
            const exerciseId = exercise.getAttribute('data-exercise');
            this.initializeExercise(exerciseId);
        });
    }

    setupDashboard() {
        // Create or update progress dashboard if it exists
        const dashboard = document.querySelector('[data-progress-dashboard]');
        if (dashboard) {
            this.renderProgressDashboard(dashboard);
        }
    }

    updateGuideProgress(guideSlug, progress) {
        if (!this.progress.guides[guideSlug]) {
            this.progress.guides[guideSlug] = { completed: false, progress: 0, timeSpent: 0 };
        }
        
        this.progress.guides[guideSlug].progress = Math.max(
            this.progress.guides[guideSlug].progress, 
            progress
        );
        
        this.progress.overall.lastActivity = new Date().toISOString();
        this.calculateOverallProgress();
        this.saveProgress();
    }

    markGuideComplete(guideSlug) {
        if (!this.progress.guides[guideSlug]) {
            this.progress.guides[guideSlug] = { completed: false, progress: 0, timeSpent: 0 };
        }
        
        this.progress.guides[guideSlug].completed = true;
        this.progress.guides[guideSlug].progress = 100;
        this.progress.guides[guideSlug].completedAt = new Date().toISOString();
        
        this.checkForAchievements(guideSlug);
        this.calculateOverallProgress();
        this.saveProgress();
        
        // Show completion celebration
        this.showCompletion(`Guide Complete: ${this.getGuideTitle(guideSlug)}`);
    }

    markExerciseComplete(exerciseId, score = 100) {
        this.progress.exercises[exerciseId] = {
            completed: true,
            score: score,
            completedAt: new Date().toISOString(),
            attempts: this.progress.exercises[exerciseId]?.attempts || 1
        };
        
        this.checkForAchievements(exerciseId);
        this.calculateOverallProgress();
        this.saveProgress();
        
        this.showCompletion(`Exercise Complete: ${score}% score`);
    }

    markQuizComplete(quizId, score, attempts) {
        this.progress.quizzes[quizId] = {
            completed: true,
            score: score,
            attempts: attempts,
            completedAt: new Date().toISOString()
        };
        
        this.calculateOverallProgress();
        this.saveProgress();
    }

    addTimeSpent(guideSlug, timeMs) {
        if (!this.progress.guides[guideSlug]) {
            this.progress.guides[guideSlug] = { completed: false, progress: 0, timeSpent: 0 };
        }
        
        this.progress.guides[guideSlug].timeSpent += timeMs;
        this.progress.overall.totalTimeSpent += timeMs;
        this.saveProgress();
    }

    markSectionVisited(sectionId) {
        // Track which sections have been visited for detailed analytics
        const currentGuide = this.getCurrentGuideSlug();
        if (!currentGuide) return;

        if (!this.progress.guides[currentGuide].sectionsVisited) {
            this.progress.guides[currentGuide].sectionsVisited = [];
        }

        if (!this.progress.guides[currentGuide].sectionsVisited.includes(sectionId)) {
            this.progress.guides[currentGuide].sectionsVisited.push(sectionId);
            this.saveProgress();
        }
    }

    calculateOverallProgress() {
        const totalGuides = Object.keys(this.progress.guides).length;
        const completedGuides = Object.values(this.progress.guides)
            .filter(guide => guide.completed).length;
        
        const totalExercises = Object.keys(this.progress.exercises).length;
        const completedExercises = Object.values(this.progress.exercises)
            .filter(exercise => exercise.completed).length;
        
        const totalQuizzes = Object.keys(this.progress.quizzes).length;
        const completedQuizzes = Object.values(this.progress.quizzes)
            .filter(quiz => quiz.completed).length;

        const totalItems = totalGuides + totalExercises + totalQuizzes;
        const completedItems = completedGuides + completedExercises + completedQuizzes;
        
        this.progress.overall.completionPercentage = totalItems > 0 ? 
            Math.round((completedItems / totalItems) * 100) : 0;
    }

    checkForAchievements(itemId) {
        const achievements = [];
        
        // First guide completed
        const completedGuides = Object.values(this.progress.guides)
            .filter(guide => guide.completed).length;
        
        if (completedGuides === 1 && !this.hasAchievement('first-guide')) {
            achievements.push({
                id: 'first-guide',
                title: 'Getting Started',
                description: 'Completed your first guide',
                icon: '🎯',
                earnedAt: new Date().toISOString()
            });
        }
        
        // All guides completed
        if (completedGuides === 6 && !this.hasAchievement('guide-expert')) {
            achievements.push({
                id: 'guide-expert',
                title: 'Guide Expert',
                description: 'Completed all guides',
                icon: '🏆',
                earnedAt: new Date().toISOString()
            });
        }
        
        // Perfect quiz score
        const quizzes = Object.values(this.progress.quizzes);
        const perfectQuizzes = quizzes.filter(quiz => quiz.score === 100 && quiz.attempts === 1);
        
        if (perfectQuizzes.length >= 5 && !this.hasAchievement('quiz-ace')) {
            achievements.push({
                id: 'quiz-ace',
                title: 'Quiz Ace',
                description: 'Perfect score on 5 quizzes',
                icon: '🎓',
                earnedAt: new Date().toISOString()
            });
        }
        
        // Speed reader (completed guide in under 10 minutes)
        const currentGuide = this.progress.guides[this.getCurrentGuideSlug()];
        if (currentGuide?.timeSpent < 600000 && currentGuide?.completed && 
            !this.hasAchievement('speed-reader')) {
            achievements.push({
                id: 'speed-reader',
                title: 'Speed Reader',
                description: 'Completed a guide in under 10 minutes',
                icon: '⚡',
                earnedAt: new Date().toISOString()
            });
        }
        
        // Add new achievements
        achievements.forEach(achievement => {
            this.progress.achievements.push(achievement);
            this.showAchievement(achievement);
        });
        
        if (achievements.length > 0) {
            this.saveProgress();
        }
    }

    hasAchievement(achievementId) {
        return this.progress.achievements.some(a => a.id === achievementId);
    }

    showCompletion(message) {
        this.showNotification(message, 'success', {
            icon: '✅',
            duration: 4000
        });
    }

    showAchievement(achievement) {
        const achievementHtml = `
            <div class="achievement-notification">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-content">
                    <div class="achievement-title">Achievement Unlocked!</div>
                    <div class="achievement-name">${achievement.title}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            </div>
        `;
        
        this.showNotification(achievementHtml, 'achievement', {
            duration: 6000,
            sound: true
        });
    }

    showNotification(content, type = 'info', options = {}) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        if (typeof content === 'string') {
            notification.innerHTML = `
                ${options.icon ? `<span class="notification-icon">${options.icon}</span>` : ''}
                <span class="notification-text">${content}</span>
            `;
        } else {
            notification.innerHTML = content;
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Play sound if enabled
        if (options.sound && this.progress.preferences.soundEnabled) {
            this.playNotificationSound(type);
        }
        
        // Remove after duration
        const duration = options.duration || 3000;
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    playNotificationSound(type) {
        // Create audio context for notification sounds
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const frequencies = {
            success: [523.25, 659.25, 783.99], // C5, E5, G5
            achievement: [440, 554.37, 659.25, 880], // A4, C#5, E5, A5
            info: [440], // A4
            warning: [369.99, 369.99], // F#4 twice
            error: [207.65] // G#3
        };
        
        const freqs = frequencies[type] || frequencies.info;
        
        freqs.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.3);
            }, index * 150);
        });
    }

    updateAllProgressBars() {
        // Update overall progress
        const overallBars = document.querySelectorAll('[data-overall-progress]');
        overallBars.forEach(bar => {
            bar.style.width = `${this.progress.overall.completionPercentage}%`;
        });
        
        // Update guide-specific progress
        const guideBars = document.querySelectorAll('[data-guide-progress]');
        guideBars.forEach(bar => {
            const guideSlug = bar.getAttribute('data-guide-progress');
            const progress = this.progress.guides[guideSlug]?.progress || 0;
            bar.style.width = `${progress}%`;
        });
    }

    renderProgressDashboard(container) {
        const stats = this.getProgressStats();
        
        const dashboardHtml = `
            <div class="progress-dashboard">
                <div class="dashboard-header">
                    <h2>Your Learning Progress</h2>
                    <div class="overall-progress">
                        <div class="progress-circle" data-progress="${stats.overallProgress}">
                            <span class="progress-percentage">${stats.overallProgress}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-number">${stats.completedGuides}</div>
                        <div class="stat-label">Guides Completed</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${stats.completedExercises}</div>
                        <div class="stat-label">Exercises Done</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${this.formatTime(stats.totalTimeSpent)}</div>
                        <div class="stat-label">Time Spent</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${stats.achievements}</div>
                        <div class="stat-label">Achievements</div>
                    </div>
                </div>
                
                <div class="guide-progress-list">
                    <h3>Guide Progress</h3>
                    ${this.renderGuideProgressList()}
                </div>
                
                ${stats.achievements > 0 ? `
                <div class="achievements-section">
                    <h3>Achievements</h3>
                    <div class="achievements-grid">
                        ${this.renderAchievements()}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
        
        container.innerHTML = dashboardHtml;
    }

    renderGuideProgressList() {
        const guideNames = {
            'file-management': 'File Management Fundamentals',
            'file-paths': 'Understanding File Paths',
            'compression': 'Working with Compressed Files',
            'file-formats': 'Essential File Formats for DH',
            'command-line': 'Command Line Basics',
            'text-encoding': 'Text Encoding and Character Sets'
        };
        
        return Object.entries(this.progress.guides).map(([slug, data]) => {
            const name = guideNames[slug] || slug;
            const progress = data.progress || 0;
            const completed = data.completed;
            
            return `
                <div class="guide-progress-item ${completed ? 'completed' : ''}">
                    <div class="guide-info">
                        <div class="guide-name">${name}</div>
                        <div class="guide-meta">
                            ${completed ? '<i class="fas fa-check-circle"></i> Complete' : `${Math.round(progress)}% complete`}
                        </div>
                    </div>
                    <div class="guide-progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderAchievements() {
        return this.progress.achievements.map(achievement => `
            <div class="achievement-badge">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-title">${achievement.title}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            </div>
        `).join('');
    }

    getProgressStats() {
        const guides = Object.values(this.progress.guides);
        const exercises = Object.values(this.progress.exercises);
        
        return {
            overallProgress: this.progress.overall.completionPercentage,
            completedGuides: guides.filter(g => g.completed).length,
            totalGuides: guides.length,
            completedExercises: exercises.filter(e => e.completed).length,
            totalExercises: exercises.length,
            totalTimeSpent: this.progress.overall.totalTimeSpent,
            achievements: this.progress.achievements.length,
            streak: this.progress.overall.streak
        };
    }

    getCurrentGuideSlug() {
        // Try to determine current guide from URL or page data
        const path = window.location.pathname;
        const guideMatch = path.match(/\/guides\/([^\/]+)/);
        if (guideMatch) {
            return guideMatch[1];
        }
        
        // Try to get from page data
        const guideElement = document.querySelector('[data-guide]');
        if (guideElement) {
            return guideElement.getAttribute('data-guide');
        }
        
        return null;
    }

    getGuideTitle(slug) {
        const titles = {
            'file-management': 'File Management Fundamentals',
            'file-paths': 'Understanding File Paths',
            'compression': 'Working with Compressed Files',
            'file-formats': 'Essential File Formats for DH',
            'command-line': 'Command Line Basics',
            'text-encoding': 'Text Encoding and Character Sets'
        };
        return titles[slug] || slug;
    }

    formatTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else {
            return `${minutes}m`;
        }
    }

    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Public API methods
    resetProgress() {
        this.progress = this.getDefaultProgress();
        this.saveProgress();
        this.updateAllProgressBars();
        this.showNotification('Progress reset', 'info');
    }

    exportProgress() {
        const dataStr = JSON.stringify(this.progress, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'kydc-progress.json';
        link.click();
    }

    importProgress(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            this.progress = { ...this.getDefaultProgress(), ...imported };
            this.saveProgress();
            this.updateAllProgressBars();
            this.showNotification('Progress imported successfully', 'success');
        } catch (error) {
            this.showNotification('Failed to import progress', 'error');
        }
    }
}

// Initialize progress tracker
document.addEventListener('DOMContentLoaded', () => {
    if (!window.progressTracker) {
        window.progressTracker = new ProgressTracker();
    }
});

// Add progress-specific styles
const progressStyles = `
<style>
.achievement-notification {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-lg);
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: #333;
    border-radius: var(--border-radius-lg);
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
}

.achievement-icon {
    font-size: 2rem;
}

.achievement-title {
    font-weight: bold;
    font-size: 1.1rem;
}

.achievement-name {
    font-weight: 600;
    margin: 0.25rem 0;
}

.achievement-description {
    font-size: 0.875rem;
    opacity: 0.8;
}

.progress-dashboard {
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin: var(--space-lg) 0;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xl);
}

.progress-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: conic-gradient(var(--color-primary) 0deg, var(--color-primary) calc(var(--progress, 0) * 3.6deg), var(--bg-tertiary) calc(var(--progress, 0) * 3.6deg));
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.progress-circle::before {
    content: '';
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--bg-secondary);
    position: absolute;
}

.progress-percentage {
    position: relative;
    z-index: 1;
    font-weight: bold;
    font-size: 1.2rem;
}

.dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-lg);
    margin-bottom: var(--space-xl);
}

.stat-card {
    text-align: center;
    padding: var(--space-lg);
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
}

.stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: var(--space-sm);
}

.stat-label {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.guide-progress-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    margin-bottom: var(--space-sm);
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
}

.guide-progress-item.completed {
    border-color: var(--color-success);
    background: rgba(5, 150, 105, 0.05);
}

.guide-info {
    flex: 1;
}

.guide-name {
    font-weight: 500;
    margin-bottom: var(--space-xs);
}

.guide-meta {
    font-size: 0.875rem;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
}

.guide-progress-bar {
    width: 100px;
    height: 6px;
    background: var(--bg-tertiary);
    border-radius: 3px;
    overflow: hidden;
}

.achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--space-md);
}

.achievement-badge {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
}

.achievement-badge .achievement-icon {
    font-size: 1.5rem;
}

.achievement-badge .achievement-title {
    font-weight: 600;
    margin-bottom: var(--space-xs);
}

.achievement-badge .achievement-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', progressStyles);