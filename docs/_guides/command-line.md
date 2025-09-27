---
layout: guide
title: "Command Line Basics"
slug: command-line
description: "Get comfortable with the terminal for Python development, package installation, and Git version control."
difficulty: intermediate
time_estimate: "45 min"
learning_objectives:
  - "Navigate file systems efficiently using command line"
  - "Install and manage Python packages with pip"
  - "Run Python scripts and troubleshoot common issues"
  - "Use basic Git commands for version control"
prev_guide:
  title: "Essential File Formats for DH"
  url: "/guides/file-formats/"
next_guide:
  title: "Text Encoding & Character Sets"
  url: "/guides/text-encoding/"
interactive: true
---

The command line might seem intimidating, but it's an essential tool for digital humanities work. When you start using Python for text analysis, data visualization, and mapping, you'll find that many tasks are easier and faster with command line skills.

## Why Learn the Command Line?

<div class="quiz" data-quiz="cli-motivation">
  <h3>Reality Check: Command Line Benefits</h3>
  <p>You need to install 5 Python libraries for a text analysis project. What's the fastest way?</p>
  
  <label class="quiz-option">
    <input type="radio" name="cli-quiz" value="gui">
    Download each library manually from websites
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="cli-quiz" value="pip">
    Use command line: <code>pip install pandas matplotlib nltk spacy beautifulsoup4</code>
  </label>
  <label class="quiz-option">
    <input type="radio" name="cli-quiz" value="ide">
    Use an IDE's package manager for each one
  </label>
  
  <div class="feedback-correct">
    <p><strong>Exactly!</strong> One command line installs everything in seconds. This is why developers love the command line - it's incredibly efficient for common tasks.</p>
  </div>
  <div class="feedback-incorrect">
    <p>The command line shines for tasks like this. <code>pip install</code> can handle multiple packages at once, automatically resolving dependencies.</p>
  </div>
</div>

### Real DH Use Cases
- **Installing Python libraries**: `pip install pandas matplotlib`
- **Running analysis scripts**: `python analyze_corpus.py`
- **Converting file formats**: `pandoc input.md -o output.pdf`
- **Downloading datasets**: `curl -O https://example.com/data.csv`
- **Version control**: `git add .` and `git commit -m "Updated analysis"`

## Getting Started by Platform

<div class="platform-tabs">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="mac">Mac</button>
    <button class="tab-btn" data-tab="pc">PC</button>
  </div>
  
  <div class="tab-content mac active">
    <h3>🍎 Mac: Terminal</h3>
    
    <h4>Opening Terminal:</h4>
    <ul>
      <li><strong>Spotlight Search:</strong> ⌘+Space, type "Terminal"</li>
      <li><strong>Applications:</strong> Applications → Utilities → Terminal</li>
      <li><strong>Launchpad:</strong> Look for Terminal icon</li>
    </ul>
    
    <h4>What you'll see:</h4>
    <div class="terminal-example">
      <pre>YourName@YourMac ~ %</pre>
      <p>This is your "prompt" - it's waiting for commands.</p>
    </div>
  </div>
  
  <div class="tab-content pc">
    <h3>🪟 PC: PowerShell (Recommended)</h3>
    
    <h4>Opening PowerShell:</h4>
    <ul>
      <li><strong>Start Menu:</strong> Type "PowerShell"</li>
      <li><strong>Windows Key + X:</strong> Select "Windows PowerShell"</li>
      <li><strong>File Explorer:</strong> Shift+Right-click in any folder → "Open PowerShell window here"</li>
    </ul>
    
    <h4>What you'll see:</h4>
    <div class="terminal-example">
      <pre>PS C:\Users\YourName></pre>
      <p>This is your PowerShell prompt.</p>
    </div>
    
    <div class="pro-tip">
      <p><strong>💡 Why PowerShell over Command Prompt?</strong></p>
      <p>PowerShell is more powerful and uses some Unix-like commands that work on Mac/Linux too.</p>
    </div>
  </div>
</div>

## Essential Navigation Commands

<div class="interactive-exercise" data-exercise="navigation-basics">
  <h4>🧭 Interactive Navigation Practice</h4>
  <p>Let's practice the core navigation commands. Try these in the terminal simulator below:</p>
  
  <div class="command-practice">
    <div class="practice-command">
      <h5>1. Check Current Location</h5>
      <div class="command-example">
        <strong>Mac/Linux:</strong> <code>pwd</code><br>
        <strong>PC:</strong> <code>Get-Location</code> or <code>pwd</code>
      </div>
      <p class="command-desc">Shows your current directory (where you are in the file system)</p>
    </div>
    
    <div class="practice-command">
      <h5>2. List Contents</h5>
      <div class="command-example">
        <strong>Mac/Linux:</strong> <code>ls</code> or <code>ls -la</code><br>
        <strong>PC:</strong> <code>dir</code> or <code>Get-ChildItem</code>
      </div>
      <p class="command-desc">Shows files and folders in current directory</p>
    </div>
    
    <div class="practice-command">
      <h5>3. Change Directory</h5>
      <div class="command-example">
        <strong>Both:</strong> <code>cd Documents</code><br>
        <strong>Go up:</strong> <code>cd ..</code><br>
        <strong>Go home:</strong> <code>cd ~</code> (Mac) or <code>cd $env:USERPROFILE</code> (PC)
      </div>
      <p class="command-desc">Navigate between folders</p>
    </div>
  </div>
</div>

<div class="terminal-simulator" data-terminal="navigation-practice">
  <h4>🖥️ Practice Terminal</h4>
  <p>Try the navigation commands above. Type <code>help</code> for available commands.</p>
  
  <div class="terminal-window">
    <div class="terminal-header">
      <span class="terminal-title">Terminal</span>
    </div>
    <div class="terminal-body">
      <div id="terminal-output">
        <div class="terminal-line">Welcome to the practice terminal!</div>
        <div class="terminal-line">Try: pwd, ls, cd Documents, cd ..</div>
        <div class="terminal-prompt">user@computer:~$ <input type="text" class="terminal-input" placeholder="Type command here..."></div>
      </div>
    </div>
  </div>
</div>

## File Operations

### Creating and Managing Files

<div class="command-reference">
  <div class="command-group">
    <h4>📁 File & Folder Operations</h4>
    
    <div class="command-item">
      <div class="command-syntax">
        <strong>Create File:</strong><br>
        Mac/Linux: <code>touch filename.txt</code><br>
        PC: <code>New-Item filename.txt</code>
      </div>
      <div class="command-desc">Creates an empty file</div>
    </div>
    
    <div class="command-item">
      <div class="command-syntax">
        <strong>Create Folder:</strong><br>
        Both: <code>mkdir foldername</code>
      </div>
      <div class="command-desc">Creates a new directory</div>
    </div>
    
    <div class="command-item">
      <div class="command-syntax">
        <strong>Copy Files:</strong><br>
        Mac/Linux: <code>cp file1.txt file2.txt</code><br>
        PC: <code>Copy-Item file1.txt file2.txt</code>
      </div>
      <div class="command-desc">Duplicates a file</div>
    </div>
    
    <div class="command-item">
      <div class="command-syntax">
        <strong>Move/Rename:</strong><br>
        Mac/Linux: <code>mv oldname.txt newname.txt</code><br>
        PC: <code>Move-Item oldname.txt newname.txt</code>
      </div>
      <div class="command-desc">Moves or renames files</div>
    </div>
  </div>
</div>

## Python from the Command Line

### Installing Python Packages

<div class="interactive-exercise" data-exercise="pip-practice">
  <h4>🐍 Package Installation Practice</h4>
  <p>Let's practice installing Python packages for DH work:</p>
  
  <div class="pip-scenarios">
    <div class="scenario-card">
      <h5>Scenario 1: Text Analysis Setup</h5>
      <p>You need pandas for data analysis and nltk for natural language processing.</p>
      <div class="command-solution">
        <code>pip install pandas nltk</code>
      </div>
      <button class="btn btn-sm" onclick="showExplanation(this, 'Installs both packages and their dependencies automatically')">Why this works</button>
      <div class="explanation" style="display: none;"></div>
    </div>
    
    <div class="scenario-card">
      <h5>Scenario 2: Data Visualization</h5>
      <p>You want to create charts and plots for your research.</p>
      <div class="command-solution">
        <code>pip install matplotlib seaborn plotly</code>
      </div>
      <button class="btn btn-sm" onclick="showExplanation(this, 'Multiple visualization libraries for different chart types and interactivity')">Why these three</button>
      <div class="explanation" style="display: none;"></div>
    </div>
    
    <div class="scenario-card">
      <h5>Scenario 3: Web Scraping</h5>
      <p>You need to collect data from historical newspaper websites.</p>
      <div class="command-solution">
        <code>pip install requests beautifulsoup4 selenium</code>
      </div>
      <button class="btn btn-sm" onclick="showExplanation(this, 'requests for HTTP, BeautifulSoup for HTML parsing, Selenium for JavaScript-heavy sites')">Tool breakdown</button>
      <div class="explanation" style="display: none;"></div>
    </div>
  </div>
</div>

### Running Python Scripts

<div class="code-workflow">
  <h4>📜 Script Execution Workflow</h4>
  
  <div class="workflow-step">
    <div class="step-number">1</div>
    <div class="step-content">
      <h5>Navigate to Your Script</h5>
      <pre><code># Navigate to your project folder
cd ~/Documents/DH-Projects/text-analysis
      
# Verify your script is there
ls *.py</code></pre>
    </div>
  </div>
  
  <div class="workflow-step">
    <div class="step-number">2</div>
    <div class="step-content">
      <h5>Run the Script</h5>
      <pre><code># Basic execution
python analyze_text.py

# With arguments
python analyze_text.py --input data.csv --output results.json

# Show output and save to file
python analyze_text.py | tee analysis_log.txt</code></pre>
    </div>
  </div>
  
  <div class="workflow-step">
    <div class="step-number">3</div>
    <div class="step-content">
      <h5>Handle Common Issues</h5>
      <pre><code># If "python" command not found
python3 analyze_text.py

# If wrong Python version
which python
python --version

# If module not found
pip list | grep pandas
pip install pandas</code></pre>
    </div>
  </div>
</div>

## Git Basics for DH Projects

### Why Git Matters in DH

<div class="quiz" data-quiz="git-benefits">
  <h3>Version Control Reality Check</h3>
  <p>You've been working on a Python script for 2 weeks. Today you made changes that broke everything, and you can't remember what you changed. What would Git help you do?</p>
  
  <label class="quiz-option">
    <input type="radio" name="git-quiz" value="backup">
    Create backups of your files
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="git-quiz" value="restore">
    See exactly what changed and restore to working version
  </label>
  <label class="quiz-option">
    <input type="radio" name="git-quiz" value="share">
    Share files with collaborators
  </label>
  
  <div class="feedback-correct">
    <p><strong>Exactly!</strong> Git tracks every change you make. You can see line-by-line what changed, when, and easily revert to any previous working version.</p>
  </div>
  <div class="feedback-incorrect">
    <p>While Git does those things too, its superpower is <strong>tracking changes</strong>. You can see exactly what broke and when, then revert specific changes.</p>
  </div>
</div>

### Essential Git Commands

<div class="git-workflow">
  <h4>📚 Basic Git Workflow for DH Projects</h4>
  
  <div class="git-step">
    <h5>1. Initialize Repository</h5>
    <pre><code># In your project folder
git init
git config user.name "Your Name"
git config user.email "your.email@university.edu"</code></pre>
  </div>
  
  <div class="git-step">
    <h5>2. Track Changes</h5>
    <pre><code># See what's changed
git status

# Add files to track
git add analyze_script.py
git add data/cleaned_texts.csv

# Add everything
git add .</code></pre>
  </div>
  
  <div class="git-step">
    <h5>3. Save Snapshots</h5>
    <pre><code># Commit with descriptive message
git commit -m "Add text cleaning script"
git commit -m "Fix encoding issue in data processing"
git commit -m "Complete sentiment analysis implementation"</code></pre>
  </div>
  
  <div class="git-step">
    <h5>4. View History</h5>
    <pre><code># See commit history
git log --oneline

# See what changed in last commit
git show

# Compare current version to last commit
git diff HEAD~1</code></pre>
  </div>
</div>

## Troubleshooting Common Issues

### Problem 1: "Command not found"

<div class="troubleshooting-section">
  <h4>🚨 Error: 'python' is not recognized</h4>
  
  <div class="solution-steps">
    <h5>Solutions to try:</h5>
    <ol>
      <li><strong>Try python3:</strong> <code>python3 --version</code></li>
      <li><strong>Check installation:</strong> <code>which python</code> (Mac) or <code>where python</code> (PC)</li>
      <li><strong>Add to PATH:</strong> Your Python installation might not be in your system PATH</li>
      <li><strong>Reinstall:</strong> Download from <a href="https://python.org">python.org</a> and check "Add to PATH"</li>
    </ol>
  </div>
</div>

### Problem 2: "Permission denied"

<div class="troubleshooting-section">
  <h4>🚨 Error: Permission denied</h4>
  
  <div class="solution-steps">
    <h5>Solutions:</h5>
    <ul>
      <li><strong>Mac/Linux:</strong> Use <code>sudo</code> carefully: <code>sudo pip install package</code></li>
      <li><strong>Better approach:</strong> Use virtual environments or user installs: <code>pip install --user package</code></li>
      <li><strong>PC:</strong> Run PowerShell as Administrator (right-click → "Run as administrator")</li>
    </ul>
  </div>
</div>

### Problem 3: "Module not found"

<div class="troubleshooting-section">
  <h4>🚨 Error: ModuleNotFoundError: No module named 'pandas'</h4>
  
  <div class="solution-steps">
    <h5>Debug process:</h5>
    <pre><code># Check what's installed
pip list

# Check Python version
python --version

# Install missing module
pip install pandas

# If using multiple Python versions
python -m pip install pandas</code></pre>
  </div>
</div>

## Hands-On Exercise: Complete DH Workflow

<div class="comprehensive-exercise">
  <h4>🎯 Exercise: Set Up a Text Analysis Project</h4>
  <p>Let's walk through a complete workflow using command line skills:</p>
  
  <div class="exercise-checklist">
    <div class="exercise-step">
      <input type="checkbox" id="step1">
      <label for="step1">Create project directory: <code>mkdir victorian-sentiment</code></label>
    </div>
    
    <div class="exercise-step">
      <input type="checkbox" id="step2">
      <label for="step2">Navigate into it: <code>cd victorian-sentiment</code></label>
    </div>
    
    <div class="exercise-step">
      <input type="checkbox" id="step3">
      <label for="step3">Initialize Git repository: <code>git init</code></label>
    </div>
    
    <div class="exercise-step">
      <input type="checkbox" id="step4">
      <label for="step4">Create directories: <code>mkdir data scripts results</code></label>
    </div>
    
    <div class="exercise-step">
      <input type="checkbox" id="step5">
      <label for="step5">Install required packages: <code>pip install pandas nltk matplotlib</code></label>
    </div>
    
    <div class="exercise-step">
      <input type="checkbox" id="step6">
      <label for="step6">Create initial script: <code>touch scripts/analyze.py</code></label>
    </div>
    
    <div class="exercise-step">
      <input type="checkbox" id="step7">
      <label for="step7">Track with Git: <code>git add .</code> and <code>git commit -m "Initial project setup"</code></label>
    </div>
  </div>
  
  <div class="exercise-validation">
    <h5>Validation Commands:</h5>
    <pre><code># Check your project structure
ls -la

# Verify Git is tracking
git status

# Check installed packages
pip list | grep -E "(pandas|nltk|matplotlib)"</code></pre>
  </div>
</div>

## Advanced Tips for Efficiency

### Command History and Shortcuts

<div class="productivity-tips">
  <h4>⚡ Productivity Boosters</h4>
  
  <div class="tip-grid">
    <div class="tip-card">
      <h5>History Navigation</h5>
      <ul>
        <li><kbd>↑</kbd> Previous command</li>
        <li><kbd>↓</kbd> Next command</li>
        <li><code>history</code> See all recent commands</li>
        <li><kbd>Ctrl+R</kbd> Search command history</li>
      </ul>
    </div>
    
    <div class="tip-card">
      <h5>Tab Completion</h5>
      <ul>
        <li><kbd>Tab</kbd> Complete file/folder names</li>
        <li><kbd>Tab</kbd><kbd>Tab</kbd> Show all options</li>
        <li>Works with commands too!</li>
      </ul>
    </div>
    
    <div class="tip-card">
      <h5>Useful Shortcuts</h5>
      <ul>
        <li><kbd>Ctrl+C</kbd> Stop running command</li>
        <li><kbd>Ctrl+L</kbd> Clear screen</li>
        <li><kbd>Ctrl+A</kbd> Go to line start</li>
        <li><kbd>Ctrl+E</kbd> Go to line end</li>
      </ul>
    </div>
  </div>
</div>

### Combining Commands

<div class="command-chaining">
  <h4>🔗 Command Chaining for DH Tasks</h4>
  
  ```bash
  # Download and immediately extract data
  curl -O https://example.com/corpus.zip && unzip corpus.zip
  
  # Run analysis and save output
  python analyze.py > results.txt 2>&1
  
  # Process multiple files
  for file in *.txt; do python clean_text.py "$file"; done
  
  # Chain with conditional execution
  python preprocess.py && python analyze.py && python visualize.py
  ```
</div>

## Knowledge Check

<div class="quiz" data-quiz="cli-proficiency">
  <h3>Proficiency Check: Command Line Skills</h3>
  <p>You want to run a Python script called <code>sentiment_analysis.py</code> that's in your <code>scripts</code> folder, but you're currently in your project root directory. What's the most efficient command?</p>
  
  <label class="quiz-option">
    <input type="radio" name="proficiency-quiz" value="navigate-first">
    <code>cd scripts</code> then <code>python sentiment_analysis.py</code>
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="proficiency-quiz" value="direct-path">
    <code>python scripts/sentiment_analysis.py</code>
  </label>
  <label class="quiz-option">
    <input type="radio" name="proficiency-quiz" value="absolute-path">
    <code>python /full/absolute/path/to/scripts/sentiment_analysis.py</code>
  </label>
  
  <div class="feedback-correct">
    <p><strong>Perfect!</strong> You can run scripts from anywhere by specifying the relative path. This saves time and keeps you in your project root where you might need to access other files.</p>
  </div>
  <div class="feedback-incorrect">
    <p>While those work, <code>python scripts/sentiment_analysis.py</code> is more efficient - you can run the script without changing directories first.</p>
  </div>
</div>

## Next Steps

With command line skills mastered, you're ready to tackle [text encoding and character sets]({{ site.baseurl }}/guides/text-encoding/), where you'll learn to handle multilingual and historical texts without garbled characters.

## Quick Reference Card

<div class="reference-card">
  <h4>📋 Command Line Cheat Sheet</h4>
  
  <div class="reference-grid">
    <div class="ref-section">
      <h5>Navigation</h5>
      <ul>
        <li><code>pwd</code> - Where am I?</li>
        <li><code>ls</code> / <code>dir</code> - What's here?</li>
        <li><code>cd folder</code> - Go somewhere</li>
        <li><code>cd ..</code> - Go up one level</li>
      </ul>
    </div>
    
    <div class="ref-section">
      <h5>Python</h5>
      <ul>
        <li><code>python script.py</code> - Run script</li>
        <li><code>pip install package</code> - Install library</li>
        <li><code>pip list</code> - Show installed</li>
        <li><code>python --version</code> - Check version</li>
      </ul>
    </div>
    
    <div class="ref-section">
      <h5>Git Basics</h5>
      <ul>
        <li><code>git status</code> - What changed?</li>
        <li><code>git add .</code> - Stage all changes</li>
        <li><code>git commit -m "msg"</code> - Save snapshot</li>
        <li><code>git log --oneline</code> - See history</li>
      </ul>
    </div>
    
    <div class="ref-section">
      <h5>Help & Shortcuts</h5>
      <ul>
        <li><kbd>Tab</kbd> - Auto-complete</li>
        <li><kbd>↑</kbd> - Previous command</li>
        <li><kbd>Ctrl+C</kbd> - Stop command</li>
        <li><code>command --help</code> - Get help</li>
      </ul>
    </div>
  </div>
</div>

---

*Remember: The command line becomes second nature with practice. Start with these basics and gradually add more advanced techniques as you become comfortable.*

<script>
// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.querySelector(`.tab-content.${targetTab}`).classList.add('active');
        });
    });
});

// Terminal simulator
function showExplanation(button, text) {
    const explanation = button.nextElementSibling;
    explanation.textContent = text;
    explanation.style.display = explanation.style.display === 'none' ? 'block' : 'none';
}

// Simple terminal simulator
document.addEventListener('DOMContentLoaded', function() {
    const terminalInput = document.querySelector('.terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    if (terminalInput) {
        terminalInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = this.value;
                const response = simulateCommand(command);
                
                // Add command to output
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `user@computer:~$ ${command}`;
                terminalOutput.insertBefore(commandLine, terminalOutput.lastElementChild);
                
                // Add response
                const responseLine = document.createElement('div');
                responseLine.className = 'terminal-line';
                responseLine.innerHTML = response;
                terminalOutput.insertBefore(responseLine, terminalOutput.lastElementChild);
                
                // Clear input
                this.value = '';
                
                // Scroll to bottom
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }
});

function simulateCommand(command) {
    const cmd = command.toLowerCase().trim();
    
    switch(cmd) {
        case 'pwd':
            return '/home/user';
        case 'ls':
            return 'Documents  Downloads  Pictures  scripts  data';
        case 'ls -la':
            return 'drwxr-xr-x  Documents<br>drwxr-xr-x  Downloads<br>drwxr-xr-x  Pictures<br>drwxr-xr-x  scripts<br>drwxr-xr-x  data';
        case 'cd documents':
            return '';
        case 'cd ..':
            return '';
        case 'help':
            return 'Available commands: pwd, ls, cd, mkdir, touch, python --version';
        case 'python --version':
            return 'Python 3.9.7';
        case 'mkdir test':
            return '';
        case 'touch test.txt':
            return '';
        default:
            return `Command not found: ${command}. Try 'help' for available commands.`;
    }
}
</script>

<style>
.platform-tabs {
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.tab-buttons {
    display: flex;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
}

.tab-btn {
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.2s ease;
}

.tab-btn.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.terminal-example {
    background: var(--bg-primary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    margin: var(--space-md) 0;
    border-left: 4px solid var(--color-primary);
}

.pro-tip {
    background: linear-gradient(135deg, var(--color-info), var(--color-primary));
    color: white;
    padding: var(--space-md);
    border-radius: var(--border-radius);
    margin: var(--space-md) 0;
}

.command-practice {
    display: grid;
    gap: var(--space-md);
    margin: var(--space-md) 0;
}

.practice-command {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-secondary);
}

.command-example {
    background: var(--bg-primary);
    padding: var(--space-sm);
    border-radius: var(--border-radius);
    margin: var(--space-sm) 0;
    font-family: var(--font-mono);
}

.terminal-window {
    background: #1e1e1e;
    color: #ffffff;
    border-radius: var(--border-radius);
    margin: var(--space-md) 0;
    font-family: var(--font-mono);
}

.terminal-header {
    background: #333;
    padding: var(--space-sm);
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    text-align: center;
}

.terminal-body {
    padding: var(--space-md);
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
}

.terminal-line {
    margin: 0.2rem 0;
    line-height: 1.4;
}

.terminal-prompt {
    display: flex;
    align-items: center;
}

.terminal-input {
    background: transparent;
    border: none;
    color: #ffffff;
    font-family: var(--font-mono);
    flex: 1;
    outline: none;
    margin-left: 0.5rem;
}

.command-reference {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.command-group {
    display: grid;
    gap: var(--space-md);
}

.command-item {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--bg-tertiary);
    border-radius: var(--border-radius);
    align-items: center;
}

.command-syntax {
    font-family: var(--font-mono);
    font-size: 0.875rem;
}

.pip-scenarios {
    display: grid;
    gap: var(--space-md);
    margin: var(--space-md) 0;
}

.scenario-card {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-primary);
}

.command-solution {
    background: var(--bg-primary);
    padding: var(--space-sm);
    border-radius: var(--border-radius);
    margin: var(--space-sm) 0;
    font-family: var(--font-mono);
}

.explanation {
    margin-top: var(--space-sm);
    padding: var(--space-sm);
    background: var(--color-info-light);
    border-radius: var(--border-radius);
    font-style: italic;
}

.code-workflow {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.workflow-step {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    margin: var(--space-md) 0;
}

.step-number {
    background: var(--color-primary);
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
}

.step-content {
    flex: 1;
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.git-workflow {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.git-step {
    margin: var(--space-md) 0;
    padding: var(--space-md);
    background: var(--bg-tertiary);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-success);
}

.troubleshooting-section {
    background: var(--bg-tertiary);
    border-left: 4px solid var(--color-warning);
    padding: var(--space-md);
    margin: var(--space-md) 0;
    border-radius: var(--border-radius);
}

.solution-steps {
    margin-top: var(--space-md);
}

.comprehensive-exercise {
    background: var(--bg-secondary);
    border: 2px solid var(--color-primary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.exercise-checklist {
    margin: var(--space-md) 0;
}

.exercise-step {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin: var(--space-sm) 0;
    padding: var(--space-xs);
}

.exercise-step input[type="checkbox"]:checked + label {
    text-decoration: line-through;
    color: var(--color-success);
}

.exercise-validation {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    margin-top: var(--space-md);
}

.productivity-tips {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.tip-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.tip-card {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.command-chaining {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.reference-card {
    background: var(--bg-secondary);
    border: 2px solid var(--color-primary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.reference-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.ref-section {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.ref-section ul {
    margin: 0;
    padding-left: var(--space-md);
}

.ref-section li {
    margin: 0.25rem 0;
}

@media (max-width: 768px) {
    .command-item,
    .tip-grid,
    .reference-grid {
        grid-template-columns: 1fr;
    }
    
    .tab-buttons {
        flex-direction: column;
    }
    
    .terminal-body {
        min-height: 150px;
    }
}
</style>