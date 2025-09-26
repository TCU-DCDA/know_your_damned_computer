/**
 * Quiz Engine for Interactive DH Computer Skills Guide
 * Handles multiple choice questions, feedback, and progress tracking
 */

class QuizEngine {
    constructor() {
        this.quizzes = new Map();
        this.currentQuiz = null;
        this.init();
    }

    init() {
        this.setupQuizElements();
        console.log('📝 Quiz Engine initialized');
    }

    setupQuizElements() {
        // Find all quiz elements on the page
        const quizElements = document.querySelectorAll('[data-quiz]');
        
        quizElements.forEach((element, index) => {
            this.initializeQuiz(element, index);
        });
    }

    initializeQuiz(element, index) {
        const quizId = element.getAttribute('data-quiz') || `quiz-${index}`;
        const quiz = this.parseQuizElement(element, quizId);
        
        if (quiz) {
            this.quizzes.set(quizId, quiz);
            this.renderQuiz(element, quiz);
        }
    }

    parseQuizElement(element, quizId) {
        const question = element.querySelector('.quiz-question')?.textContent || 
                        element.querySelector('h3, h4')?.textContent;
        
        if (!question) return null;

        const options = [];
        const optionElements = element.querySelectorAll('.quiz-option, label');
        
        optionElements.forEach((option, index) => {
            const input = option.querySelector('input[type="radio"]');
            const text = option.textContent.trim();
            const value = input?.value || `option-${index}`;
            const isCorrect = option.hasAttribute('data-correct') || 
                            input?.hasAttribute('data-correct');
            
            options.push({
                value,
                text,
                isCorrect
            });
        });

        // Get feedback messages
        const correctFeedback = element.querySelector('.feedback-correct')?.innerHTML || 
                               element.getAttribute('data-correct-feedback') ||
                               'Correct! Well done.';
        
        const incorrectFeedback = element.querySelector('.feedback-incorrect')?.innerHTML ||
                                 element.getAttribute('data-incorrect-feedback') ||
                                 'Not quite right. Try again!';

        const explanation = element.querySelector('.explanation')?.innerHTML ||
                           element.getAttribute('data-explanation') || '';

        return {
            id: quizId,
            question,
            options,
            correctFeedback,
            incorrectFeedback,
            explanation,
            attempts: 0,
            completed: false
        };
    }

    renderQuiz(element, quiz) {
        const quizHtml = `
            <div class="quiz-container" data-quiz-id="${quiz.id}">
                <div class="quiz-header">
                    <h3 class="quiz-question">${quiz.question}</h3>
                </div>
                
                <div class="quiz-options">
                    ${quiz.options.map((option, index) => `
                        <label class="quiz-option" data-option="${option.value}">
                            <input type="radio" name="${quiz.id}" value="${option.value}">
                            <span class="option-text">${option.text}</span>
                            <span class="option-indicator"></span>
                        </label>
                    `).join('')}
                </div>
                
                <div class="quiz-actions">
                    <button class="btn btn-primary quiz-submit" disabled>
                        Check Answer
                    </button>
                    <button class="btn btn-secondary quiz-reset" style="display: none;">
                        Try Again
                    </button>
                </div>
                
                <div class="quiz-feedback" style="display: none;">
                    <div class="feedback-content"></div>
                </div>
                
                <div class="quiz-stats">
                    <span class="attempts-counter">Attempts: <strong>0</strong></span>
                </div>
            </div>
        `;

        element.innerHTML = quizHtml;
        this.bindQuizEvents(element, quiz);
    }

    bindQuizEvents(element, quiz) {
        const container = element.querySelector('.quiz-container');
        const options = container.querySelectorAll('input[type="radio"]');
        const submitBtn = container.querySelector('.quiz-submit');
        const resetBtn = container.querySelector('.quiz-reset');
        const feedback = container.querySelector('.quiz-feedback');

        // Enable submit button when option is selected
        options.forEach(option => {
            option.addEventListener('change', () => {
                submitBtn.disabled = false;
                // Reset visual feedback
                container.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                });
            });
        });

        // Handle submit
        submitBtn.addEventListener('click', () => {
            this.submitQuiz(quiz.id, container);
        });

        // Handle reset
        resetBtn.addEventListener('click', () => {
            this.resetQuiz(quiz.id, container);
        });
    }

    submitQuiz(quizId, container) {
        const quiz = this.quizzes.get(quizId);
        if (!quiz) return;

        const selectedOption = container.querySelector('input[type="radio"]:checked');
        if (!selectedOption) return;

        quiz.attempts++;
        this.updateAttemptsCounter(container, quiz.attempts);

        const selectedValue = selectedOption.value;
        const correctOption = quiz.options.find(opt => opt.isCorrect);
        const isCorrect = selectedValue === correctOption.value;

        this.showFeedback(container, quiz, isCorrect, selectedValue);
        this.highlightOptions(container, quiz, selectedValue);

        if (isCorrect && !quiz.completed) {
            quiz.completed = true;
            this.recordQuizCompletion(quizId, quiz.attempts);
        }

        // Update UI
        container.querySelector('.quiz-submit').style.display = 'none';
        container.querySelector('.quiz-reset').style.display = 'inline-flex';
    }

    showFeedback(container, quiz, isCorrect, selectedValue) {
        const feedbackElement = container.querySelector('.quiz-feedback');
        const feedbackContent = container.querySelector('.feedback-content');
        
        let feedbackHtml = '';
        
        if (isCorrect) {
            feedbackHtml = `
                <div class="feedback correct">
                    <div class="feedback-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="feedback-text">
                        <strong>Correct!</strong>
                        <p>${quiz.correctFeedback}</p>
                        ${quiz.explanation ? `<div class="explanation">${quiz.explanation}</div>` : ''}
                    </div>
                </div>
            `;
        } else {
            feedbackHtml = `
                <div class="feedback incorrect">
                    <div class="feedback-icon">
                        <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="feedback-text">
                        <strong>Not quite right...</strong>
                        <p>${quiz.incorrectFeedback}</p>
                        ${quiz.explanation ? `<div class="explanation">${quiz.explanation}</div>` : ''}
                    </div>
                </div>
            `;
        }
        
        feedbackContent.innerHTML = feedbackHtml;
        feedbackElement.style.display = 'block';
        
        // Smooth scroll to feedback
        feedbackElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    highlightOptions(container, quiz, selectedValue) {
        const options = container.querySelectorAll('.quiz-option');
        
        options.forEach(option => {
            const input = option.querySelector('input');
            const value = input.value;
            const isCorrect = quiz.options.find(opt => opt.value === value)?.isCorrect;
            
            if (isCorrect) {
                option.classList.add('correct');
            } else if (value === selectedValue) {
                option.classList.add('incorrect');
            }
            
            // Disable all inputs
            input.disabled = true;
        });
    }

    resetQuiz(quizId, container) {
        const quiz = this.quizzes.get(quizId);
        if (!quiz) return;

        // Reset UI
        const options = container.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
            const input = option.querySelector('input');
            input.disabled = false;
            input.checked = false;
        });

        container.querySelector('.quiz-feedback').style.display = 'none';
        container.querySelector('.quiz-submit').style.display = 'inline-flex';
        container.querySelector('.quiz-submit').disabled = true;
        container.querySelector('.quiz-reset').style.display = 'none';
    }

    updateAttemptsCounter(container, attempts) {
        const counter = container.querySelector('.attempts-counter strong');
        if (counter) {
            counter.textContent = attempts;
        }
    }

    recordQuizCompletion(quizId, attempts) {
        // Record in localStorage
        let completions = JSON.parse(localStorage.getItem('kydc_quiz_completions') || '{}');
        completions[quizId] = {
            completed: true,
            attempts: attempts,
            completedAt: new Date().toISOString()
        };
        localStorage.setItem('kydc_quiz_completions', JSON.stringify(completions));

        // Update global progress if available
        if (window.kydc) {
            window.kydc.markExerciseComplete(`quiz-${quizId}`, attempts === 1 ? 100 : Math.max(50, 100 - (attempts - 1) * 10));
        }

        // Show celebration for first-try correct answers
        if (attempts === 1) {
            this.showCelebration();
        }
    }

    showCelebration() {
        // Create celebration animation
        const celebration = document.createElement('div');
        celebration.className = 'quiz-celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <i class="fas fa-trophy"></i>
                <span>Perfect!</span>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            celebration.remove();
        }, 2000);
    }

    // Method to programmatically create quizzes
    createQuiz(config) {
        const quizId = config.id || `quiz-${Date.now()}`;
        const quiz = {
            id: quizId,
            question: config.question,
            options: config.options,
            correctFeedback: config.correctFeedback || 'Correct! Well done.',
            incorrectFeedback: config.incorrectFeedback || 'Not quite right. Try again!',
            explanation: config.explanation || '',
            attempts: 0,
            completed: false
        };

        this.quizzes.set(quizId, quiz);
        return quiz;
    }

    // Method to insert a quiz into the page
    insertQuiz(targetElement, quiz) {
        if (typeof targetElement === 'string') {
            targetElement = document.querySelector(targetElement);
        }
        
        if (!targetElement) return;

        const quizWrapper = document.createElement('div');
        quizWrapper.className = 'quiz';
        quizWrapper.setAttribute('data-quiz', quiz.id);
        
        targetElement.appendChild(quizWrapper);
        this.renderQuiz(quizWrapper, quiz);
    }

    // Get quiz statistics
    getQuizStats() {
        const completions = JSON.parse(localStorage.getItem('kydc_quiz_completions') || '{}');
        const totalQuizzes = this.quizzes.size;
        const completedQuizzes = Object.keys(completions).length;
        const averageAttempts = Object.values(completions)
            .reduce((sum, completion) => sum + completion.attempts, 0) / completedQuizzes || 0;

        return {
            total: totalQuizzes,
            completed: completedQuizzes,
            completionRate: totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0,
            averageAttempts: Math.round(averageAttempts * 10) / 10
        };
    }
}

// Utility function to create quick quizzes
function createQuickQuiz(question, options, targetSelector) {
    if (!window.quizEngine) {
        window.quizEngine = new QuizEngine();
    }

    const quiz = window.quizEngine.createQuiz({
        question: question,
        options: options
    });

    window.quizEngine.insertQuiz(targetSelector, quiz);
    return quiz;
}

// Initialize quiz engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (!window.quizEngine) {
        window.quizEngine = new QuizEngine();
    }
});

// Add quiz-specific styles
const quizStyles = `
<style>
.quiz {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.quiz-question {
    margin-bottom: var(--space-md);
    color: var(--text-primary);
}

.quiz-options {
    margin-bottom: var(--space-lg);
}

.quiz-option {
    display: flex;
    align-items: center;
    padding: var(--space-sm) var(--space-md);
    margin-bottom: var(--space-sm);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
}

.quiz-option:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--color-primary);
}

.quiz-option input[type="radio"] {
    margin-right: var(--space-sm);
}

.quiz-option.correct {
    background-color: rgba(5, 150, 105, 0.1);
    border-color: var(--color-success);
    color: var(--color-success);
}

.quiz-option.incorrect {
    background-color: rgba(220, 38, 38, 0.1);
    border-color: var(--color-danger);
    color: var(--color-danger);
}

.quiz-option.correct .option-indicator::after {
    content: '✓';
    position: absolute;
    right: var(--space-md);
    color: var(--color-success);
    font-weight: bold;
}

.quiz-option.incorrect .option-indicator::after {
    content: '✗';
    position: absolute;
    right: var(--space-md);
    color: var(--color-danger);
    font-weight: bold;
}

.quiz-actions {
    display: flex;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
}

.quiz-feedback {
    margin: var(--space-lg) 0;
}

.feedback {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    border-left: 4px solid;
}

.feedback.correct {
    background-color: rgba(5, 150, 105, 0.1);
    border-left-color: var(--color-success);
}

.feedback.incorrect {
    background-color: rgba(220, 38, 38, 0.1);
    border-left-color: var(--color-danger);
}

.feedback-icon {
    font-size: 1.5rem;
}

.feedback.correct .feedback-icon {
    color: var(--color-success);
}

.feedback.incorrect .feedback-icon {
    color: var(--color-danger);
}

.feedback-text strong {
    display: block;
    margin-bottom: var(--space-xs);
}

.explanation {
    margin-top: var(--space-sm);
    padding-top: var(--space-sm);
    border-top: 1px solid var(--border-color);
    font-style: italic;
    color: var(--text-secondary);
}

.quiz-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-sm);
    border-top: 1px solid var(--border-color);
    font-size: 0.875rem;
    color: var(--text-muted);
}

.quiz-celebration {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    z-index: 10000;
    background: linear-gradient(45deg, #ffd700, #ffed4e);
    color: #333;
    padding: 2rem;
    border-radius: 50%;
    font-size: 2rem;
    font-weight: bold;
    transition: transform 0.5s ease-out;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
}

.quiz-celebration.show {
    transform: translate(-50%, -50%) scale(1);
}

.celebration-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

@media (max-width: 768px) {
    .quiz-option {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }
    
    .quiz-actions {
        flex-direction: column;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', quizStyles);