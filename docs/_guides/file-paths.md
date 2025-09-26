---
layout: guide
title: "Understanding File Paths"
slug: file-paths
description: "Navigate your computer like a pro and troubleshoot 'file not found' errors with confidence."
difficulty: beginner
time_estimate: "15 min"
learning_objectives:
  - "Understand absolute vs. relative file paths"
  - "Navigate using command line path syntax"
  - "Troubleshoot common path-related errors"
  - "Use paths effectively in Python and VS Code"
prev_guide:
  title: "File Management Fundamentals"
  url: "/guides/file-management/"
next_guide:
  title: "Working with Compressed Files"
  url: "/guides/compression/"
interactive: true
---

File paths are like addresses for your files—they tell your computer exactly where to find something. Understanding paths is crucial for working with Python scripts, VS Code projects, and any command-line tools in digital humanities.

## What Are File Paths?

A file path is the complete location of a file or folder on your computer. Think of it like a postal address that gets more specific as you read from left to right.

<div class="path-example">
  <h4>🏠 Path as Address Analogy</h4>
  <div class="analogy-comparison">
    <div class="postal-address">
      <strong>Postal Address:</strong><br>
      123 Main Street<br>
      Springfield, IL 62704<br>
      United States
    </div>
    <div class="file-path">
      <strong>File Path:</strong><br>
      <code>/Users/student/Documents/DH-Projects/research-notes.txt</code>
    </div>
  </div>
</div>

## Absolute vs. Relative Paths

Understanding the difference between absolute and relative paths is fundamental to working effectively with files in programming and research.

### Absolute Paths
An **absolute path** gives the complete location from the root of your computer.

**Mac Examples:**
```
/Users/sarah/Documents/DH-Projects/victorian-novels/data.csv
/Applications/Visual Studio Code.app
/System/Library/Fonts/Arial.ttf
```

**PC Examples:**
```
C:\Users\Sarah\Documents\DH-Projects\victorian-novels\data.csv
C:\Program Files\Microsoft VS Code\Code.exe
D:\External Drive\Backup\research-archive.zip
```

### Relative Paths
A **relative path** gives the location relative to where you currently are (your "working directory").

<div class="interactive-exercise" data-exercise="path-types">
  <h4>🧭 Interactive: Identify Path Types</h4>
  <p>Can you identify whether these paths are absolute or relative?</p>
  
  <div class="path-quiz">
    <div class="path-item">
      <code>/home/student/thesis.txt</code>
      <div class="path-buttons">
        <button class="path-btn" onclick="checkPathType(this, 'absolute', true)">Absolute</button>
        <button class="path-btn" onclick="checkPathType(this, 'relative', false)">Relative</button>
      </div>
      <div class="path-feedback"></div>
    </div>
    
    <div class="path-item">
      <code>../images/manuscript.jpg</code>
      <div class="path-buttons">
        <button class="path-btn" onclick="checkPathType(this, 'absolute', false)">Absolute</button>
        <button class="path-btn" onclick="checkPathType(this, 'relative', true)">Relative</button>
      </div>
      <div class="path-feedback"></div>
    </div>
    
    <div class="path-item">
      <code>C:\Users\John\Desktop\script.py</code>
      <div class="path-buttons">
        <button class="path-btn" onclick="checkPathType(this, 'absolute', true)">Absolute</button>
        <button class="path-btn" onclick="checkPathType(this, 'relative', false)">Relative</button>
      </div>
      <div class="path-feedback"></div>
    </div>
    
    <div class="path-item">
      <code>data/processed/results.csv</code>
      <div class="path-buttons">
        <button class="path-btn" onclick="checkPathType(this, 'absolute', false)">Absolute</button>
        <button class="path-btn" onclick="checkPathType(this, 'relative', true)">Relative</button>
      </div>
      <div class="path-feedback"></div>
    </div>
  </div>
</div>

## Platform Differences

### Mac and Linux Paths
- Start with `/` (forward slash)
- Use `/` to separate folders
- Case-sensitive (usually)
- Root directory is `/`

### Windows Paths
- Start with drive letter (C:, D:, etc.)
- Use `\` (backslash) to separate folders
- Case-insensitive
- Root directory is drive letter (`C:\`)

<div class="quiz" data-quiz="platform-paths">
  <h3>Quick Check: Platform Recognition</h3>
  <p>Which path belongs to a Windows computer?</p>
  
  <label class="quiz-option">
    <input type="radio" name="platform-quiz" value="mac">
    <code>/Users/student/Documents/thesis.docx</code>
  </label>
  
  <label class="quiz-option" data-correct>
    <input type="radio" name="platform-quiz" value="windows">
    <code>C:\Users\student\Documents\thesis.docx</code>
  </label>
  
  <label class="quiz-option">
    <input type="radio" name="platform-quiz" value="linux">
    <code>/home/student/Documents/thesis.docx</code>
  </label>
  
  <div class="feedback-correct">
    <p><strong>Exactly!</strong> The `C:\` at the beginning and the backslashes (`\`) are distinctive features of Windows file paths.</p>
  </div>
  
  <div class="feedback-incorrect">
    <p>Look for the telltale signs: Windows paths start with a drive letter like `C:\` and use backslashes (`\`) to separate folders.</p>
  </div>
</div>

## Special Path Symbols

### Navigation Shortcuts
- `.` (single dot) = current directory
- `..` (double dot) = parent directory  
- `~` (tilde) = home directory (Mac/Linux)
- `%USERPROFILE%` = home directory (Windows)

### Examples in Context
If you're currently in `/Users/sarah/DH-Projects/novels/`:

<div class="path-examples">
  <div class="current-location">
    <strong>You are here:</strong> <code>/Users/sarah/DH-Projects/novels/</code>
  </div>
  
  <div class="relative-examples">
    <div class="example">
      <code>.</code> → <code>/Users/sarah/DH-Projects/novels/</code>
      <span class="explanation">(current directory)</span>
    </div>
    <div class="example">
      <code>..</code> → <code>/Users/sarah/DH-Projects/</code>
      <span class="explanation">(go up one level)</span>
    </div>
    <div class="example">
      <code>../poetry/</code> → <code>/Users/sarah/DH-Projects/poetry/</code>
      <span class="explanation">(up one, then into poetry)</span>
    </div>
    <div class="example">
      <code>./dickens/</code> → <code>/Users/sarah/DH-Projects/novels/dickens/</code>
      <span class="explanation">(into dickens subfolder)</span>
    </div>
  </div>
</div>

<div class="terminal-simulator" data-terminal="path-navigation">
  <h4>🖥️ Practice Navigation</h4>
  <p>Try these commands to practice path navigation:</p>
  <div class="terminal-commands">
    <div class="command-example">
      <code>pwd</code> <span class="command-desc">← Shows current directory</span>
    </div>
    <div class="command-example">
      <code>ls .</code> <span class="command-desc">← List current directory</span>
    </div>
    <div class="command-example">
      <code>ls ..</code> <span class="command-desc">← List parent directory</span>
    </div>
    <div class="command-example">
      <code>cd ../</code> <span class="command-desc">← Move to parent directory</span>
    </div>
  </div>
</div>

## Paths in Programming and DH Tools

### Python Path Issues
Common problems and solutions:

<div class="code-example">
  <h4>❌ Common Python Path Error</h4>
  ```python
  # This often fails:
  with open('data.csv', 'r') as file:
      content = file.read()
  
  # Error: FileNotFoundError: [Errno 2] No such file or directory: 'data.csv'
  ```
  
  <h4>✅ Better Approaches</h4>
  ```python
  import os
  
  # Option 1: Use absolute path
  file_path = '/Users/sarah/DH-Projects/data/data.csv'
  with open(file_path, 'r') as file:
      content = file.read()
  
  # Option 2: Build path relative to script location
  script_dir = os.path.dirname(os.path.abspath(__file__))
  file_path = os.path.join(script_dir, 'data', 'data.csv')
  with open(file_path, 'r') as file:
      content = file.read()
  ```
</div>

### VS Code and Path Issues

<div class="vscode-tips">
  <h4>💡 VS Code Path Tips</h4>
  <ul>
    <li><strong>Open folder, not files:</strong> Always open your project folder in VS Code, not individual files</li>
    <li><strong>Integrated terminal:</strong> Uses your project folder as working directory</li>
    <li><strong>Relative paths:</strong> Work consistently when folder is properly opened</li>
    <li><strong>Python path:</strong> Make sure VS Code detects your Python interpreter correctly</li>
  </ul>
</div>

<div class="interactive-exercise" data-exercise="debug-paths">
  <h4>🐛 Debug the Path Problem</h4>
  <p>A student is getting a "file not found" error. Can you identify what's wrong?</p>
  
  <div class="debug-scenario">
    <div class="file-structure">
      <strong>Project Structure:</strong>
      <pre>
my-research/
├── scripts/
│   └── analyze.py
├── data/
│   └── texts.csv
└── results/
      </pre>
    </div>
    
    <div class="problematic-code">
      <strong>Code in analyze.py:</strong>
      <pre><code>import pandas as pd

# This line is failing:
df = pd.read_csv('texts.csv')
print(df.head())</code></pre>
    </div>
    
    <div class="debug-options">
      <h5>What's the problem?</h5>
      <label class="debug-option">
        <input type="radio" name="debug-quiz" value="wrong-filename">
        The filename is wrong
      </label>
      <label class="debug-option" data-correct>
        <input type="radio" name="debug-quiz" value="wrong-path">
        The path is wrong - file is in different folder
      </label>
      <label class="debug-option">
        <input type="radio" name="debug-quiz" value="file-missing">
        The file doesn't exist
      </label>
      
      <div class="debug-feedback"></div>
      
      <div class="debug-solution" style="display: none;">
        <h5>✅ Correct Solutions:</h5>
        <pre><code># Option 1: Relative path from scripts/ to data/
df = pd.read_csv('../data/texts.csv')

# Option 2: Build path using os.path
import os
data_path = os.path.join('..', 'data', 'texts.csv')
df = pd.read_csv(data_path)

# Option 3: Use pathlib (modern Python)
from pathlib import Path
data_path = Path('../data/texts.csv')
df = pd.read_csv(data_path)</code></pre>
      </div>
    </div>
  </div>
</div>

## Troubleshooting Path Problems

### Common Error Messages and Solutions

<div class="error-solutions">
  <div class="error-case">
    <h4>🚨 "FileNotFoundError" or "No such file or directory"</h4>
    <div class="solutions">
      <h5>Check these:</h5>
      <ul>
        <li>Is the filename spelled correctly?</li>
        <li>Are you in the right directory?</li>
        <li>Does the file actually exist where you think it does?</li>
        <li>Are you using the right type of slash (/ vs \)?</li>
      </ul>
    </div>
  </div>
  
  <div class="error-case">
    <h4>🚨 "Permission denied"</h4>
    <div class="solutions">
      <h5>Try these:</h5>
      <ul>
        <li>Check if file is open in another program</li>
        <li>Verify you have read/write permissions</li>
        <li>On Mac: use <code>ls -la</code> to check permissions</li>
        <li>On PC: right-click → Properties → Security</li>
      </ul>
    </div>
  </div>
  
  <div class="error-case">
    <h4>🚨 Paths with spaces causing issues</h4>
    <div class="solutions">
      <h5>Solutions:</h5>
      <ul>
        <li>Put quotes around the entire path: <code>"My Documents/file.txt"</code></li>
        <li>Escape spaces with backslash: <code>My\ Documents/file.txt</code></li>
        <li>Use tab completion to avoid typing spaces</li>
        <li>Better: avoid spaces in file/folder names</li>
      </ul>
    </div>
  </div>
</div>

## Hands-On Practice

### Exercise 1: Path Translation

<div class="path-exercise">
  <h4>📝 Convert Between Path Types</h4>
  <p>Given this file structure, practice writing different types of paths:</p>
  
  <div class="file-tree">
    <pre>
/Users/alex/DH-Research/
├── 01-data/
│   ├── raw/
│   │   └── survey-responses.csv
│   └── processed/
│       └── clean-data.csv
├── 02-scripts/
│   ├── clean-data.py
│   └── analyze.py
└── 03-outputs/
    └── results.txt
    </pre>
  </div>
  
  <div class="path-questions">
    <div class="question">
      <h5>Question 1:</h5>
      <p>You're in the <code>02-scripts/</code> folder. Write a relative path to access <code>survey-responses.csv</code>:</p>
      <input type="text" class="path-answer" placeholder="Enter relative path...">
      <button onclick="checkPath(this, '../01-data/raw/survey-responses.csv')">Check</button>
      <div class="path-result"></div>
    </div>
    
    <div class="question">
      <h5>Question 2:</h5>
      <p>Write the absolute path to <code>clean-data.py</code> (assuming you're Alex):</p>
      <input type="text" class="path-answer" placeholder="Enter absolute path...">
      <button onclick="checkPath(this, '/Users/alex/DH-Research/02-scripts/clean-data.py')">Check</button>
      <div class="path-result"></div>
    </div>
    
    <div class="question">
      <h5>Question 3:</h5>
      <p>You're in <code>01-data/processed/</code>. Write a relative path to <code>results.txt</code>:</p>
      <input type="text" class="path-answer" placeholder="Enter relative path...">
      <button onclick="checkPath(this, '../../03-outputs/results.txt')">Check</button>
      <div class="path-result"></div>
    </div>
  </div>
</div>

### Exercise 2: Fix the Python Script

<div class="python-exercise">
  <h4>🐍 Fix the Path Issues</h4>
  <p>This Python script has path problems. Can you fix them?</p>
  
  <div class="broken-script">
    <strong>Project structure:</strong>
    <pre>
text-analysis/
├── main.py
├── data/
│   └── novels.txt
└── utils/
    └── helpers.py
    </pre>
    
    <strong>Broken code in main.py:</strong>
    <pre><code class="python">import sys
sys.path.append('helpers.py')  # Problem 1
from helpers import clean_text

# Problem 2
with open('novels.txt', 'r') as f:
    text = f.read()

cleaned = clean_text(text)
print(cleaned)</code></pre>
    
    <div class="fix-attempt">
      <h5>Your Fix:</h5>
      <textarea class="code-fix" placeholder="Paste your corrected code here..."></textarea>
      <button onclick="checkPythonFix(this)">Check Solution</button>
      <div class="fix-feedback"></div>
    </div>
  </div>
</div>

## Advanced Path Concepts

### Environment Variables
Some useful environment variables for paths:

<div class="env-vars">
  <div class="platform-vars">
    <h4>Mac/Linux:</h4>
    <ul>
      <li><code>$HOME</code> - Your home directory</li>
      <li><code>$PWD</code> - Current working directory</li>
      <li><code>$PATH</code> - Directories searched for commands</li>
    </ul>
  </div>
  
  <div class="platform-vars">
    <h4>Windows:</h4>
    <ul>
      <li><code>%USERPROFILE%</code> - Your home directory</li>
      <li><code>%CD%</code> - Current directory</li>
      <li><code>%PATH%</code> - Directories searched for commands</li>
    </ul>
  </div>
</div>

### Path Libraries in Python

<div class="python-libraries">
  <h4>🐍 Modern Python Path Handling</h4>
  ```python
  from pathlib import Path
  
  # Create path objects
  project_root = Path.home() / 'DH-Research'
  data_file = project_root / 'data' / 'texts.csv'
  
  # Check if path exists
  if data_file.exists():
      print(f"Found file: {data_file}")
  
  # Get parent directory
  data_dir = data_file.parent
  
  # Get just the filename
  filename = data_file.name
  
  # Cross-platform path building
  output_file = project_root / 'results' / 'analysis.txt'
  ```
</div>

## Knowledge Check

<div class="quiz" data-quiz="paths-mastery">
  <h3>Mastery Check: File Paths</h3>
  <p>You're working in <code>/Users/student/DH-Project/analysis/</code> and need to access a file at <code>/Users/student/DH-Project/data/raw/manuscript.txt</code>. What's the shortest relative path?</p>
  
  <label class="quiz-option">
    <input type="radio" name="mastery-quiz" value="long">
    <code>../../../student/DH-Project/data/raw/manuscript.txt</code>
  </label>
  
  <label class="quiz-option" data-correct>
    <input type="radio" name="mastery-quiz" value="correct">
    <code>../data/raw/manuscript.txt</code>
  </label>
  
  <label class="quiz-option">
    <input type="radio" name="mastery-quiz" value="wrong">
    <code>./data/raw/manuscript.txt</code>
  </label>
  
  <div class="feedback-correct">
    <p><strong>Perfect!</strong> From <code>analysis/</code>, you go up one level (<code>..</code>) to reach <code>DH-Project/</code>, then down into <code>data/raw/manuscript.txt</code>.</p>
  </div>
  
  <div class="feedback-incorrect">
    <p>Think about the relationship between your current location (<code>analysis/</code>) and the target file. You need to go up one level first.</p>
  </div>
</div>

## Quick Reference

<div class="reference-card">
  <h4>📋 Path Quick Reference</h4>
  
  <div class="reference-sections">
    <div class="ref-section">
      <h5>Absolute Path Indicators:</h5>
      <ul>
        <li>Mac/Linux: starts with <code>/</code></li>
        <li>Windows: starts with drive letter <code>C:\</code></li>
      </ul>
    </div>
    
    <div class="ref-section">
      <h5>Navigation Shortcuts:</h5>
      <ul>
        <li><code>.</code> = current directory</li>
        <li><code>..</code> = parent directory</li>
        <li><code>~</code> = home directory (Mac/Linux)</li>
      </ul>
    </div>
    
    <div class="ref-section">
      <h5>Python Path Handling:</h5>
      <ul>
        <li><code>os.path.join()</code> for cross-platform paths</li>
        <li><code>pathlib.Path()</code> for modern Python</li>
        <li><code>os.path.abspath(__file__)</code> for script location</li>
      </ul>
    </div>
  </div>
</div>

---

Understanding file paths is crucial for effective digital humanities work. With these concepts mastered, you're ready to learn about [working with compressed files]({{ site.baseurl }}/guides/compression/), which will expand your file management toolkit.

<script>
function checkPathType(button, selectedType, isCorrect) {
  const pathItem = button.closest('.path-item');
  const buttons = pathItem.querySelectorAll('.path-btn');
  const feedback = pathItem.querySelector('.path-feedback');
  
  // Reset button states
  buttons.forEach(btn => btn.classList.remove('selected', 'correct', 'incorrect'));
  
  // Mark selected button
  button.classList.add('selected');
  
  if (isCorrect) {
    button.classList.add('correct');
    feedback.innerHTML = '<div class="feedback correct">✅ Correct!</div>';
  } else {
    button.classList.add('incorrect');
    const correctType = selectedType === 'absolute' ? 'relative' : 'absolute';
    feedback.innerHTML = `<div class="feedback incorrect">❌ This is actually a ${correctType} path.</div>`;
  }
}

function checkPath(button, correctAnswer) {
  const input = button.previousElementSibling;
  const result = button.nextElementSibling;
  const userAnswer = input.value.trim();
  
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    result.innerHTML = '<div class="feedback correct">✅ Perfect! That\'s the correct path.</div>';
    input.style.borderColor = 'var(--color-success)';
  } else if (userAnswer.length === 0) {
    result.innerHTML = '<div class="feedback neutral">Please enter a path.</div>';
  } else {
    result.innerHTML = `<div class="feedback incorrect">❌ Not quite. The correct answer is: <code>${correctAnswer}</code></div>`;
    input.style.borderColor = 'var(--color-danger)';
  }
}

function checkPythonFix(button) {
  const textarea = button.previousElementSibling;
  const feedback = button.nextElementSibling;
  const userCode = textarea.value.toLowerCase();
  
  const hasGoodElements = userCode.includes('sys.path.append(\'utils\')') || 
                         userCode.includes('data/novels.txt') ||
                         userCode.includes('../data/novels.txt');
  
  if (hasGoodElements) {
    feedback.innerHTML = `
      <div class="feedback correct">
        <p>✅ Good improvements! Here's the complete solution:</p>
        <pre><code>import sys
import os
sys.path.append('utils')  # Add utils directory to path
from helpers import clean_text

# Use relative path to data folder
with open('data/novels.txt', 'r') as f:
    text = f.read()

cleaned = clean_text(text)
print(cleaned)</code></pre>
      </div>`;
  } else {
    feedback.innerHTML = `
      <div class="feedback hint">
        <p>💡 Hints:</p>
        <ul>
          <li>For Problem 1: Add the directory 'utils', not the file 'helpers.py'</li>
          <li>For Problem 2: The file is in the 'data' subdirectory</li>
        </ul>
      </div>`;
  }
}

// Quiz handling for debug scenario
document.addEventListener('change', function(e) {
  if (e.target.name === 'debug-quiz') {
    const feedback = document.querySelector('.debug-feedback');
    const solution = document.querySelector('.debug-solution');
    
    if (e.target.value === 'wrong-path') {
      feedback.innerHTML = '<div class="feedback correct">✅ Exactly! The script is looking for texts.csv in the same directory as analyze.py, but the file is actually in the data/ folder.</div>';
      solution.style.display = 'block';
    } else {
      feedback.innerHTML = '<div class="feedback incorrect">❌ Look at where the script is (scripts/) versus where the file is (data/). The filename and file existence are fine.</div>';
      solution.style.display = 'none';
    }
  }
});
</script>

<style>
.path-example {
  background: var(--bg-secondary);
  padding: var(--space-lg);
  border-radius: var(--border-radius-lg);
  margin: var(--space-lg) 0;
}

.analogy-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  margin-top: var(--space-md);
}

.postal-address, .file-path {
  background: var(--bg-tertiary);
  padding: var(--space-md);
  border-radius: var(--border-radius);
  text-align: center;
}

.path-quiz .path-item {
  background: var(--bg-tertiary);
  padding: var(--space-md);
  margin: var(--space-sm) 0;
  border-radius: var(--border-radius);
}

.path-buttons {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
}

.path-btn {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border-color);
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
}

.path-btn:hover {
  background: var(--bg-secondary);
}

.path-btn.correct {
  background: var(--color-success);
  color: white;
  border-color: var(--color-success);
}

.path-btn.incorrect {
  background: var(--color-danger);
  color: white;
  border-color: var(--color-danger);
}

.path-examples {
  background: var(--bg-secondary);
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  margin: var(--space-lg) 0;
}

.current-location {
  background: var(--color-primary);
  color: white;
  padding: var(--space-md);
  border-radius: var(--border-radius);
  margin-bottom: var(--space-md);
  text-align: center;
}

.relative-examples .example {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--border-color);
}

.relative-examples .example:last-child {
  border-bottom: none;
}

.explanation {
  color: var(--color-secondary);
  font-style: italic;
}

.terminal-commands .command-example {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin: var(--space-sm) 0;
  font-family: var(--font-mono);
}

.command-desc {
  color: var(--color-secondary);
  font-family: var(--font-sans);
}

.code-example {
  background: var(--bg-secondary);
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  margin: var(--space-lg) 0;
}

.vscode-tips {
  background: linear-gradient(135deg, var(--color-info), var(--color-primary));
  color: white;
  padding: var(--space-lg);
  border-radius: var(--border-radius-lg);
  margin: var(--space-lg) 0;
}

.debug-scenario {
  background: var(--bg-tertiary);
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  margin: var(--space-md) 0;
}

.file-structure, .problematic-code {
  background: var(--bg-primary);
  padding: var(--space-md);
  border-radius: var(--border-radius);
  margin: var(--space-md) 0;
}

.debug-options {
  margin-top: var(--space-md);
}

.debug-option {
  display: block;
  margin: var(--space-sm) 0;
  cursor: pointer;
}

.debug-solution {
  background: var(--bg-secondary);
  padding: var(--space-md);
  border-radius: var(--border-radius);
  margin-top: var(--space-md);
  border-left: 4px solid var(--color-success);
}

.error-solutions .error-case {
  background: var(--bg-secondary);
  padding: var(--space-lg);
  margin: var(--space-md) 0;
  border-radius: var(--border-radius);
  border-left: 4px solid var(--color-warning);
}

.path-exercise {
  background: var(--bg-secondary);
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  margin: var(--space-lg) 0;
}

.file-tree {
  background: var(--bg-primary);
  padding: var(--space-md);
  border-radius: var(--border-radius);
  margin: var(--space-md) 0;
}

.path-questions .question {
  background: var(--bg-tertiary);
  padding: var(--space-md);
  margin: var(--space-md) 0;
  border-radius: var(--border-radius);
}

.path-answer {
  width: 300px;
  padding: var(--space-sm);
  margin: var(--space-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-family: var(--font-mono);
}

.python-exercise {
  background: var(--bg-secondary);
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  margin: var(--space-lg) 0;
}

.broken-script {
  background: var(--bg-tertiary);
  padding: var(--space-md);
  border-radius: var(--border-radius);
  margin: var(--space-md) 0;
}

.code-fix {
  width: 100%;
  height: 200px;
  padding: var(--space-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-family: var(--font-mono);
  resize: vertical;
}

.env-vars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  margin: var(--space-lg) 0;
}

.platform-vars {
  background: var(--bg-secondary);
  padding: var(--space-md);
  border-radius: var(--border-radius);
}

.python-libraries {
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

.reference-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.ref-section {
  background: var(--bg-tertiary);
  padding: var(--space-md);
  border-radius: var(--border-radius);
}

@media (max-width: 768px) {
  .analogy-comparison,
  .env-vars {
    grid-template-columns: 1fr;
  }
  
  .path-answer {
    width: 100%;
    max-width: 300px;
  }
}
</style>