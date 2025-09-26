---
layout: guide
title: "File Management Fundamentals"
slug: file-management
description: "Master the basics of organizing your digital research materials with hands-on exercises and real DH examples."
difficulty: beginner
time_estimate: "20 min"
learning_objectives:
  - "Develop consistent file naming conventions"
  - "Create logical folder structures for DH projects"
  - "Implement effective backup strategies"
  - "Navigate files efficiently on Mac and PC"
next_guide:
  title: "Understanding File Paths"
  url: "/guides/file-paths/"
interactive: true
---

File management is the foundation of effective digital humanities work. Poor file organization leads to lost research, duplicated effort, and frustration. This guide will help you develop habits that will serve you throughout your academic and professional career.

## Why File Management Matters for DH Students

In digital humanities, you'll work with:
- Multiple versions of text files and datasets
- Research notes and drafts  
- Images, audio, and video files
- Code and scripts
- Collaboration materials shared with team members

Good file management ensures you can always find what you need and that your work is reproducible and shareable.

<div class="quiz" data-quiz="file-management-intro">
  <h3>Quick Check: Why is file management especially important in DH work?</h3>
  <label class="quiz-option">
    <input type="radio" name="intro-quiz" value="size">
    DH projects involve large files that are hard to manage
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="intro-quiz" value="complexity">
    DH projects involve multiple file types, versions, and collaborators
  </label>
  <label class="quiz-option">
    <input type="radio" name="intro-quiz" value="backup">
    DH projects require special backup procedures
  </label>
  <div class="feedback-correct">
    <p><strong>Exactly!</strong> DH projects are complex, involving text data, images, code, analysis results, and often multiple team members. Good organization prevents confusion and lost work.</p>
  </div>
  <div class="feedback-incorrect">
    <p>While file size and backups matter, the main challenge is managing the <strong>complexity</strong> of DH projects—multiple file types, versions, and collaborators all need clear organization.</p>
  </div>
</div>

## Core Principles

### 1. Consistent Naming Conventions
**Good naming habits save hours of searching later.**

#### File Naming Best Practices
- Use descriptive names: `medieval-manuscript-transcription-draft-2024-09-26.txt` not `document1.txt`
- Use hyphens or underscores instead of spaces: `research_notes.txt` not `research notes.txt`
- Include dates in YYYY-MM-DD format for version control: `2024-09-26_interview-transcript.txt`
- Use consistent capitalization (recommend lowercase for compatibility)

<div class="interactive-exercise" data-exercise="naming-practice">
  <h4>🎯 Interactive Exercise: Fix These File Names</h4>
  <p>Your research partner sent you these poorly named files. Can you improve them?</p>
  
  <div class="naming-challenge">
    <div class="bad-name">
      <strong>Original:</strong> <code>My Research Paper (Final Version).docx</code>
      <br>
      <strong>Your fix:</strong> 
      <input type="text" placeholder="Enter a better filename..." class="name-input">
      <button onclick="checkNaming(this, 'victorian-poetry-analysis-final-2024-09-26.docx')">Check</button>
      <div class="feedback"></div>
    </div>
    
    <div class="bad-name">
      <strong>Original:</strong> <code>data file.csv</code>
      <br>
      <strong>Your fix:</strong>
      <input type="text" placeholder="Enter a better filename..." class="name-input">
      <button onclick="checkNaming(this, 'survey-responses-2024-09-26.csv')">Check</button>
      <div class="feedback"></div>
    </div>
  </div>
</div>

#### Platform-Specific Considerations

**Mac Users:**
- File names are case-sensitive in some contexts, case-insensitive in others
- Avoid special characters: / : < > | * ? "
- Maximum filename length: 255 characters

**PC Users:**
- File names are case-insensitive
- Avoid special characters: \ / : * ? " < > |
- Maximum filename length: 260 characters (including full path)

### 2. Folder Structure and Hierarchy

Create a logical, consistent folder structure that makes sense for your work.

#### Recommended DH Project Structure
```
Your-DH-Project/
├── 01-raw-data/
│   ├── texts/
│   ├── images/
│   └── metadata/
├── 02-processed-data/
│   ├── cleaned-texts/
│   └── analysis-ready/
├── 03-analysis/
│   ├── scripts/
│   └── outputs/
├── 04-documentation/
│   ├── research-notes/
│   └── methodology/
├── 05-drafts/
└── 06-final-outputs/
```

<div class="terminal-simulator" data-terminal="folder-practice">
  <!-- Terminal simulator will be inserted here -->
</div>

#### Benefits of This Structure
- **Numbered folders** ensure consistent ordering across platforms
- **Descriptive names** make purpose clear
- **Separation by stage** prevents confusion between raw and processed data
- **Documentation folder** keeps important notes accessible

### 3. Version Control Through Naming

Until you learn formal version control (Git), use naming conventions:

#### For Documents
- `paper-draft-v1.docx`
- `paper-draft-v2.docx`
- `paper-draft-final.docx`
- `paper-draft-final-FINAL.docx` (we've all been there!)

#### Better Approach with Dates
- `paper-draft-2024-09-26.docx`
- `paper-draft-2024-10-03.docx`
- `paper-draft-2024-10-15-submitted.docx`

<div class="quiz" data-quiz="version-control">
  <h3>Which versioning approach is most reliable?</h3>
  <label class="quiz-option">
    <input type="radio" name="version-quiz" value="numbers">
    Using version numbers (v1, v2, v3)
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="version-quiz" value="dates">
    Using dates (YYYY-MM-DD format)
  </label>
  <label class="quiz-option">
    <input type="radio" name="version-quiz" value="words">
    Using words (draft, revised, final)
  </label>
  <div class="feedback-correct">
    <p><strong>Perfect!</strong> Dates provide clear chronological order and never repeat. The YYYY-MM-DD format sorts correctly and avoids confusion about which version is newest.</p>
  </div>
  <div class="feedback-incorrect">
    <p>While version numbers and descriptive words can help, <strong>dates in YYYY-MM-DD format</strong> provide the clearest chronological sequence and sort correctly in file listings.</p>
  </div>
</div>

## Platform-Specific File Management

### Mac File Management

#### Using Finder Effectively
1. **View Options**: Use List view (⌘+2) for detailed file info
2. **Column View** (⌘+3): Great for navigating deep folder structures
3. **Tags**: Color-code files by project or status
4. **Smart Folders**: Create saved searches for file types or dates

#### Essential Keyboard Shortcuts
- `⌘+Space`: Open Spotlight search
- `⌘+Shift+G`: Go to specific folder path
- `⌘+I`: Get info on selected file
- `⌘+Delete`: Move to Trash

#### Pro Tips for Mac Users
- Use **Stacks** on Desktop to auto-organize files by type
- Enable **filename extensions** in Finder preferences
- Use **AirDrop** for easy file sharing between Mac devices

### PC File Management

#### Using File Explorer Effectively
1. **Details View**: Shows file size, type, and modification date
2. **Quick Access**: Pin frequently used folders
3. **Ribbon Interface**: Access file operations quickly
4. **Search**: Use search operators like `type:pdf` or `modified:today`

#### Essential Keyboard Shortcuts
- `Windows+E`: Open File Explorer
- `Ctrl+Shift+N`: Create new folder
- `F2`: Rename selected file
- `Alt+Enter`: File properties

#### Pro Tips for PC Users
- Use **Libraries** to group related folders from different locations
- Enable **file extensions** in View options
- Use **OneDrive** integration for cloud storage and sync

## Common File Management Mistakes to Avoid

### 1. Desktop Dumping
**Problem**: Saving everything to the desktop
**Solution**: Use desktop only for temporary files; move to proper folders daily

### 2. Generic Folder Names
**Problem**: Folders named "Stuff," "Misc," "New Folder"
**Solution**: Always use descriptive names that indicate content

### 3. Deep Folder Nesting
**Problem**: Folders buried 8+ levels deep
**Solution**: Keep structure 3-5 levels deep maximum

### 4. Inconsistent Naming
**Problem**: Mixing naming conventions within a project
**Solution**: Establish conventions early and stick to them

### 5. No Backup Strategy
**Problem**: Keeping only one copy of important files
**Solution**: Follow the 3-2-1 rule (3 copies, 2 different media, 1 offsite)

<div class="interactive-exercise" data-exercise="mistake-identification">
  <h4>🔍 Spot the Problems</h4>
  <p>Look at this folder structure and identify the issues:</p>
  
  <div class="folder-structure">
    <pre>
Desktop/
  ├── Untitled folder/
  ├── My Stuff/
  │   └── More Stuff/
  │       └── Research Things/
  │           └── Important/
  │               └── Really Important/
  │                   └── SUPER IMPORTANT/
  │                       └── document.txt
  ├── New folder/
  ├── New folder (2)/
  ├── thesis final.docx
  ├── thesis final FINAL.docx
  └── thesis final FINAL v2.docx
    </pre>
  </div>
  
  <div class="problem-checklist">
    <label>
      <input type="checkbox" data-problem="desktop"> Files stored on desktop
    </label>
    <label>
      <input type="checkbox" data-problem="generic"> Generic folder names ("My Stuff", "New folder")
    </label>
    <label>
      <input type="checkbox" data-problem="deep"> Too many nested levels
    </label>
    <label>
      <input type="checkbox" data-problem="spaces"> Spaces in file names
    </label>
    <label>
      <input type="checkbox" data-problem="versioning"> Poor version control
    </label>
    <button onclick="checkProblems()">Check Answers</button>
    <div class="problem-feedback"></div>
  </div>
</div>

## Practical Exercises

### Exercise 1: Create Your DH Project Structure

Let's practice creating a proper folder structure for a digital humanities project.

<div class="hands-on-exercise">
  <div class="exercise-instructions">
    <h4>📁 Your Mission: Victorian Literature Analysis Project</h4>
    <p>You're starting a project analyzing Victorian novels. Create a folder structure that will keep everything organized.</p>
    
    <div class="exercise-steps">
      <div class="step">
        <input type="checkbox" id="step1">
        <label for="step1">Create main project folder with descriptive name</label>
      </div>
      <div class="step">
        <input type="checkbox" id="step2">
        <label for="step2">Add numbered subfolders for different stages</label>
      </div>
      <div class="step">
        <input type="checkbox" id="step3">
        <label for="step3">Create folders for raw texts, processed data, and analysis</label>
      </div>
      <div class="step">
        <input type="checkbox" id="step4">
        <label for="step4">Add documentation and outputs folders</label>
      </div>
      <div class="step">
        <input type="checkbox" id="step5">
        <label for="step5">Create a README file explaining your structure</label>
      </div>
    </div>
  </div>
  
  <div class="exercise-result">
    <h5>Recommended Structure:</h5>
    <pre>
victorian-literature-analysis-2024/
├── 01-raw-data/
│   ├── novels/
│   ├── author-biographies/
│   └── historical-context/
├── 02-processed-data/
│   ├── cleaned-texts/
│   └── word-frequencies/
├── 03-analysis/
│   ├── python-scripts/
│   └── results/
├── 04-documentation/
│   ├── research-notes/
│   ├── bibliography/
│   └── methodology/
├── 05-drafts/
└── 06-final-outputs/
    └── README.md
    </pre>
  </div>
</div>

### Exercise 2: File Naming Challenge

Practice creating better file names for common DH scenarios.

<div class="naming-exercise">
  <div class="scenario">
    <h5>Scenario 1: Research Interview</h5>
    <p>You interviewed Dr. Sarah Johnson about Victorian women writers on September 26, 2024.</p>
    <p><strong>Bad name:</strong> <code>interview.mp3</code></p>
    <p><strong>Your improvement:</strong> <input type="text" class="name-fix" placeholder="Enter better filename..."></p>
    <button onclick="checkName(this, 'interview-sarah-johnson-victorian-women-writers-2024-09-26.mp3')">Check</button>
    <div class="name-feedback"></div>
  </div>
  
  <div class="scenario">
    <h5>Scenario 2: Data Analysis Script</h5>
    <p>Python script that analyzes word frequency in your text corpus.</p>
    <p><strong>Bad name:</strong> <code>script.py</code></p>
    <p><strong>Your improvement:</strong> <input type="text" class="name-fix" placeholder="Enter better filename..."></p>
    <button onclick="checkName(this, 'analyze-word-frequency-victorian-corpus.py')">Check</button>
    <div class="name-feedback"></div>
  </div>
</div>

## Advanced Tips

### Metadata and File Properties
Both Mac and PC allow you to add metadata to files:
- **Tags/Keywords**: For easy searching
- **Comments**: Brief descriptions of file contents
- **Custom properties**: Project names, authors, etc.

### Automation Tools
- **Mac**: Use Automator for repetitive file tasks
- **PC**: Use PowerToys or batch renaming tools
- **Both**: Consider tools like Hazel (Mac) or File Juggler (PC) for automatic file organization

<div class="pro-tip">
  <h4>💡 Pro Tip: The Two-Minute Rule</h4>
  <p>If organizing a file takes less than two minutes, do it immediately. This prevents the accumulation of messy files and keeps your system clean.</p>
</div>

## Knowledge Check

<div class="quiz" data-quiz="final-check">
  <h3>Final Check: File Management Best Practices</h3>
  <p>Which of these demonstrates good file management for a DH project?</p>
  
  <label class="quiz-option">
    <input type="radio" name="final-quiz" value="bad1">
    <code>Desktop/New folder/stuff.txt</code>
  </label>
  
  <label class="quiz-option" data-correct>
    <input type="radio" name="final-quiz" value="good">
    <code>DH-Projects/medieval-manuscripts-2024/01-raw-data/manuscript-images/ms-001-folio-12r-2024-09-26.jpg</code>
  </label>
  
  <label class="quiz-option">
    <input type="radio" name="final-quiz" value="bad2">
    <code>My Documents/Research/Final Project/Data/file1.csv</code>
  </label>
  
  <div class="feedback-correct">
    <p><strong>Excellent!</strong> This filename shows all the best practices:</p>
    <ul>
      <li>Descriptive project folder name</li>
      <li>Numbered organization system</li>
      <li>Clear subfolder purposes</li>
      <li>Descriptive filename with date</li>
      <li>No spaces (using hyphens)</li>
    </ul>
  </div>
  
  <div class="feedback-incorrect">
    <p>This example has several problems common in poor file management. The correct answer demonstrates all the best practices we've learned.</p>
  </div>
</div>

## Questions for Reflection

1. How much time do you currently spend looking for files?
2. What types of files do you work with most in your DH projects?
3. How do you currently handle different versions of the same document?
4. What file management habits from this guide would help you most?

## Next Steps

Once you've mastered basic file management, you're ready to learn about [file paths and navigation]({{ site.baseurl }}/guides/file-paths/), which will help you understand exactly where your well-organized files live on your computer.

---

*Remember: Good file management is a skill that improves with practice. Start with small improvements and build better habits gradually.*

<script>
function checkNaming(button, correctAnswer) {
  const input = button.previousElementSibling;
  const feedback = button.nextElementSibling;
  const userAnswer = input.value.toLowerCase().trim();
  const correct = correctAnswer.toLowerCase();
  
  if (userAnswer === correct) {
    feedback.innerHTML = '<div class="feedback correct">✅ Perfect! Great naming convention.</div>';
    input.style.borderColor = 'var(--color-success)';
  } else if (userAnswer.length === 0) {
    feedback.innerHTML = '<div class="feedback neutral">Please enter your improved filename.</div>';
  } else {
    const hasGoodElements = userAnswer.includes('2024') || userAnswer.includes('-') || userAnswer.includes('_');
    if (hasGoodElements) {
      feedback.innerHTML = '<div class="feedback partial">👍 Good improvements! Consider: ' + correctAnswer + '</div>';
      input.style.borderColor = 'var(--color-warning)';
    } else {
      feedback.innerHTML = '<div class="feedback incorrect">🤔 Try including: descriptive words, date (2024-09-26), and hyphens instead of spaces.</div>';
      input.style.borderColor = 'var(--color-danger)';
    }
  }
}

function checkProblems() {
  const checkboxes = document.querySelectorAll('[data-problem]');
  const feedback = document.querySelector('.problem-feedback');
  const correctProblems = ['desktop', 'generic', 'deep', 'spaces', 'versioning'];
  const checkedProblems = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.dataset.problem);
  
  const correct = correctProblems.every(p => checkedProblems.includes(p)) && 
                 checkedProblems.every(p => correctProblems.includes(p));
  
  if (correct) {
    feedback.innerHTML = '<div class="feedback correct">🎯 Perfect! You identified all the problems: desktop storage, generic names, excessive nesting, spaces in filenames, and poor version control.</div>';
  } else {
    const missing = correctProblems.filter(p => !checkedProblems.includes(p));
    const extra = checkedProblems.filter(p => !correctProblems.includes(p));
    let message = '🤔 Close! ';
    if (missing.length > 0) message += `You missed: ${missing.join(', ')}. `;
    if (extra.length > 0) message += `Remove: ${extra.join(', ')}.`;
    feedback.innerHTML = `<div class="feedback partial">${message}</div>`;
  }
}

function checkName(button, correctAnswer) {
  const input = button.previousElementSibling;
  const feedback = button.nextElementSibling;
  const userAnswer = input.value.toLowerCase().trim();
  
  if (userAnswer.includes('2024') && (userAnswer.includes('-') || userAnswer.includes('_'))) {
    feedback.innerHTML = '<div class="feedback correct">✅ Great improvement! You included dates and avoided spaces.</div>';
  } else {
    feedback.innerHTML = `<div class="feedback hint">💡 Suggested: ${correctAnswer}</div>`;
  }
}
</script>

<style>
.interactive-exercise {
  background: var(--bg-secondary);
  border-left: 4px solid var(--color-primary);
  padding: var(--space-lg);
  margin: var(--space-lg) 0;
  border-radius: var(--border-radius);
}

.naming-challenge .bad-name {
  background: var(--bg-tertiary);
  padding: var(--space-md);
  margin: var(--space-sm) 0;
  border-radius: var(--border-radius);
}

.name-input {
  width: 300px;
  padding: var(--space-sm);
  margin: var(--space-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.hands-on-exercise {
  background: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  margin: var(--space-lg) 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
}

.step {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin: var(--space-sm) 0;
}

.step input[type="checkbox"]:checked + label {
  text-decoration: line-through;
  color: var(--color-success);
}

.exercise-result pre {
  background: var(--bg-primary);
  padding: var(--space-md);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
}

.folder-structure {
  background: var(--bg-primary);
  padding: var(--space-md);
  border-radius: var(--border-radius);
  margin: var(--space-md) 0;
}

.problem-checklist label {
  display: block;
  margin: var(--space-sm) 0;
  cursor: pointer;
}

.naming-exercise .scenario {
  background: var(--bg-tertiary);
  padding: var(--space-md);
  margin: var(--space-md) 0;
  border-radius: var(--border-radius);
}

.name-fix {
  width: 300px;
  padding: var(--space-sm);
  margin: var(--space-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.feedback {
  margin-top: var(--space-sm);
  padding: var(--space-sm);
  border-radius: var(--border-radius);
}

.feedback.correct {
  background: rgba(5, 150, 105, 0.1);
  color: var(--color-success);
  border-left: 4px solid var(--color-success);
}

.feedback.incorrect {
  background: rgba(220, 38, 38, 0.1);
  color: var(--color-danger);
  border-left: 4px solid var(--color-danger);
}

.feedback.partial {
  background: rgba(217, 119, 6, 0.1);
  color: var(--color-warning);
  border-left: 4px solid var(--color-warning);
}

.feedback.hint {
  background: rgba(8, 145, 178, 0.1);
  color: var(--color-info);
  border-left: 4px solid var(--color-info);
}

.pro-tip {
  background: linear-gradient(135deg, var(--color-info), var(--color-primary));
  color: white;
  padding: var(--space-lg);
  border-radius: var(--border-radius-lg);
  margin: var(--space-lg) 0;
}

.pro-tip h4 {
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

@media (max-width: 768px) {
  .hands-on-exercise {
    grid-template-columns: 1fr;
  }
  
  .name-input,
  .name-fix {
    width: 100%;
    max-width: 300px;
  }
}
</style>