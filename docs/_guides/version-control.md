---
layout: guide
title: "Git & Version Control"
slug: version-control
description: "Track changes, collaborate with others, and never lose your work again. Essential version control skills for DH projects."
difficulty: intermediate
time_estimate: "50 min"
learning_objectives:
  - "Understand why version control is essential for DH research"
  - "Set up Git and configure it for your projects"
  - "Use the basic Git workflow: add, commit, push, pull"
  - "Use GitHub to collaborate and share your work"
  - "Recover from common mistakes and conflicts"
prev_guide:
  title: "Text Encoding & Character Sets"
  url: "/guides/text-encoding/"
next_guide:
  title: "Regular Expressions for Text Processing"
  url: "/guides/regular-expressions/"
interactive: true
---

Have you ever had multiple versions of a file like `final_paper.docx`, `final_paper_v2.docx`, `final_paper_FINAL.docx`, and `final_paper_FINAL_really.docx`? Or accidentally deleted hours of work with no way to recover it? Version control solves these problems elegantly, and Git is the tool that makes it possible.

For digital humanities work, version control isn't just convenient—it's essential. When you're writing Python scripts for text analysis, collaborating on digital editions, or managing research data, Git helps you track every change, experiment safely, and work with others without chaos.

## What You'll Accomplish

<div class="learning-outcomes">
  <h4>By the end of this guide, you'll be able to:</h4>
  <ul>
    <li><strong>Track changes</strong> to your code and documents over time</li>
    <li><strong>Experiment safely</strong> by creating branches for new ideas</li>
    <li><strong>Collaborate effectively</strong> with other researchers using GitHub</li>
    <li><strong>Recover from mistakes</strong> by reverting to previous versions</li>
    <li><strong>Document your process</strong> with meaningful commit messages</li>
    <li><strong>Share your work</strong> professionally through repositories</li>
  </ul>
</div>

<div class="prerequisite-check">
  <h4>What You Need</h4>
  <ul>
    <li>Familiarity with the command line (see <a href="{{ site.baseurl }}/guides/command-line/">Command Line Basics</a>)</li>
    <li>A computer with Git installed (we'll cover installation)</li>
    <li>A free GitHub account (we'll set this up together)</li>
  </ul>
</div>

## Why Version Control Matters for DH

<div class="quiz" data-quiz="version-control-why">
  <h3>Quick Check: Why Use Version Control?</h3>
  <p>Imagine this situation: You've been working on a Python script for a week. Yesterday it worked perfectly. Today, after making some edits, it's completely broken—and you can't figure out what you changed. How would you solve this problem?</p>

  <label class="quiz-option">
    <input type="radio" name="vc-quiz-1" value="backup">
    Hope you saved a backup copy somewhere with a different filename
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="vc-quiz-1" value="git">
    Use Git to see exactly what changed and restore the working version
  </label>
  <label class="quiz-option">
    <input type="radio" name="vc-quiz-1" value="memory">
    Try to remember what you changed and manually undo each edit
  </label>

  <div class="feedback-correct">
    <p><strong>Exactly!</strong> Git tracks every change you save (called a "commit"), letting you see exactly what changed and instantly restore any previous version. No more "FINAL_v2_REALLY_FINAL.py" files cluttering your folders!</p>
  </div>
  <div class="feedback-incorrect">
    <p>While backups can help, Git provides a much more powerful solution. It automatically tracks <strong>every change</strong> you save, shows you <strong>exactly what lines changed</strong>, and lets you <strong>restore any previous version instantly</strong>. This is what version control is all about!</p>
  </div>
</div>

### Real DH Use Cases for Git

<div class="use-cases-grid">
  <div class="use-case-card">
    <div class="use-case-icon"><i class="fas fa-code"></i></div>
    <h4>Code Development</h4>
    <p>Track changes to Python scripts, Jupyter notebooks, and analysis code. Experiment with new approaches without fear.</p>
  </div>

  <div class="use-case-card">
    <div class="use-case-icon"><i class="fas fa-users"></i></div>
    <h4>Collaboration</h4>
    <p>Work with research teams on shared codebases. Merge contributions from multiple researchers seamlessly.</p>
  </div>

  <div class="use-case-card">
    <div class="use-case-icon"><i class="fas fa-book"></i></div>
    <h4>Digital Editions</h4>
    <p>Manage TEI-XML transcriptions with full history. Track who made what changes and when.</p>
  </div>

  <div class="use-case-card">
    <div class="use-case-icon"><i class="fas fa-flask"></i></div>
    <h4>Reproducible Research</h4>
    <p>Document your exact methodology. Share complete project history with publications.</p>
  </div>
</div>

## Installing and Configuring Git

<div class="platform-tabs">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="mac">Mac</button>
    <button class="tab-btn" data-tab="pc">PC</button>
  </div>

  <div class="tab-content mac active">
    <h3>Mac Installation</h3>

    <h4>Option 1: Xcode Command Line Tools (Recommended)</h4>
    <p>Open Terminal and type:</p>
    <pre><code>git --version</code></pre>
    <p>If Git isn't installed, macOS will prompt you to install the Xcode Command Line Tools. Click "Install" and wait for completion.</p>

    <h4>Option 2: Homebrew</h4>
    <p>If you have Homebrew installed:</p>
    <pre><code>brew install git</code></pre>

    <h4>Verify Installation:</h4>
    <pre><code>git --version
# Should show: git version 2.x.x</code></pre>
  </div>

  <div class="tab-content pc">
    <h3>PC Installation</h3>

    <h4>Download Git for Windows</h4>
    <ol>
      <li>Visit <a href="https://git-scm.com/download/win">git-scm.com/download/win</a></li>
      <li>Download the installer (64-bit recommended)</li>
      <li>Run the installer with these recommended settings:
        <ul>
          <li>Default editor: VS Code (or your preference)</li>
          <li>PATH environment: "Git from the command line and also from 3rd-party software"</li>
          <li>HTTPS transport: "Use the native Windows Secure Channel library"</li>
          <li>Line ending conversions: "Checkout Windows-style, commit Unix-style"</li>
        </ul>
      </li>
    </ol>

    <h4>Verify Installation:</h4>
    <p>Open PowerShell or Git Bash and type:</p>
    <pre><code>git --version
# Should show: git version 2.x.x</code></pre>
  </div>
</div>

### Essential Configuration

<div class="config-steps">
  <h4>Set Up Your Identity</h4>
  <p>Git needs to know who you are for commit attribution. Run these commands (use your actual name and email):</p>

  <pre><code># Set your name (appears in commit history)
git config --global user.name "Your Name"

# Set your email (should match your GitHub account)
git config --global user.email "your.email@university.edu"

# Verify your settings
git config --list</code></pre>

  <div class="pro-tip">
    <p><strong>Pro Tip:</strong> Use the same email address for Git and GitHub to ensure your contributions are properly linked to your profile.</p>
  </div>
</div>

## Alternative: GitHub Desktop

<div class="desktop-app-section">
  <h4>Prefer a Visual Interface?</h4>
  <p>If the command line feels intimidating, <strong>GitHub Desktop</strong> provides a friendly graphical interface for Git. It's an excellent way to learn version control concepts before diving into commands.</p>

  <div class="desktop-features">
    <div class="desktop-feature">
      <h5>What GitHub Desktop Does Well</h5>
      <ul>
        <li>Visual diff viewer shows exactly what changed</li>
        <li>Simple commit interface with guided workflow</li>
        <li>Easy branch creation and switching</li>
        <li>Handles GitHub authentication automatically</li>
        <li>Great for learning Git concepts visually</li>
      </ul>
    </div>

    <div class="desktop-feature">
      <h5>When to Use Command Line Instead</h5>
      <ul>
        <li>Working on remote servers (no GUI available)</li>
        <li>Automating tasks with scripts</li>
        <li>Advanced operations (rebasing, cherry-picking)</li>
        <li>Faster for experienced users</li>
        <li>Required for most tutorials and documentation</li>
      </ul>
    </div>
  </div>

  <div class="desktop-install">
    <h5>Installing GitHub Desktop</h5>
    <ol>
      <li>Visit <a href="https://desktop.github.com">desktop.github.com</a></li>
      <li>Download for Mac or Windows</li>
      <li>Sign in with your GitHub account</li>
      <li>The app will configure Git automatically</li>
    </ol>
  </div>

  <div class="recommendation-box">
    <p><strong>Our Recommendation:</strong> Learn both! Start with GitHub Desktop to understand the concepts, then gradually add command-line skills. Most DH work benefits from knowing both approaches—use the GUI for complex diffs and visualization, commands for quick operations and scripting.</p>
  </div>
</div>

## The Git Mental Model

<div class="mental-model">
  <h4>Understanding Git's Three States</h4>
  <p>Files in a Git repository can be in one of three states:</p>

  <div class="states-diagram">
    <div class="state-box working">
      <h5>Working Directory</h5>
      <p>Your actual files on disk. Edit freely here.</p>
      <div class="state-action">
        <code>git add</code> moves files to staging
      </div>
    </div>

    <div class="state-arrow">→</div>

    <div class="state-box staging">
      <h5>Staging Area</h5>
      <p>Files ready to be committed. Like a "shopping cart" for changes.</p>
      <div class="state-action">
        <code>git commit</code> saves to repository
      </div>
    </div>

    <div class="state-arrow">→</div>

    <div class="state-box repository">
      <h5>Repository</h5>
      <p>Permanent history of all commits. Safe and tracked.</p>
      <div class="state-action">
        <code>git push</code> shares with GitHub
      </div>
    </div>
  </div>
</div>

## Your First Git Repository

<div class="hands-on-exercise">
  <h4>Exercise: Create a DH Project Repository</h4>
  <p>Let's create a repository for a text analysis project step by step.</p>

  <div class="exercise-steps">
    <div class="exercise-step">
      <div class="step-number">1</div>
      <div class="step-content">
        <h5>Create Project Directory</h5>
        <pre><code># Create and enter project folder
mkdir victorian-novels-analysis
cd victorian-novels-analysis</code></pre>
      </div>
    </div>

    <div class="exercise-step">
      <div class="step-number">2</div>
      <div class="step-content">
        <h5>Initialize Git Repository</h5>
        <pre><code># Initialize Git in this folder
git init

# You should see: Initialized empty Git repository in .../victorian-novels-analysis/.git/</code></pre>
      </div>
    </div>

    <div class="exercise-step">
      <div class="step-number">3</div>
      <div class="step-content">
        <h5>Create Project Structure</h5>
        <pre><code># Create folders for organization
mkdir data scripts results

# Create a README file
echo "# Victorian Novels Analysis" > README.md
echo "Text analysis project for DH research." >> README.md</code></pre>
      </div>
    </div>

    <div class="exercise-step">
      <div class="step-number">4</div>
      <div class="step-content">
        <h5>Check Status</h5>
        <pre><code># See what Git knows about your files
git status

# You'll see README.md as "untracked"</code></pre>
      </div>
    </div>

    <div class="exercise-step">
      <div class="step-number">5</div>
      <div class="step-content">
        <h5>Stage and Commit</h5>
        <pre><code># Add README to staging
git add README.md

# Commit with a descriptive message
git commit -m "Initial commit: Add project README"

# Verify with git log
git log --oneline</code></pre>
      </div>
    </div>
  </div>
</div>

## The Core Git Workflow

<div class="workflow-diagram">
  <h4>Daily Git Workflow</h4>

  <div class="workflow-steps">
    <div class="workflow-step">
      <div class="workflow-icon"><i class="fas fa-edit"></i></div>
      <h5>1. Make Changes</h5>
      <p>Edit your files normally</p>
      <code>Edit analyze.py</code>
    </div>

    <div class="workflow-arrow">→</div>

    <div class="workflow-step">
      <div class="workflow-icon"><i class="fas fa-search"></i></div>
      <h5>2. Review Changes</h5>
      <p>See what you modified</p>
      <code>git status</code>
      <code>git diff</code>
    </div>

    <div class="workflow-arrow">→</div>

    <div class="workflow-step">
      <div class="workflow-icon"><i class="fas fa-plus-circle"></i></div>
      <h5>3. Stage Changes</h5>
      <p>Select changes to commit</p>
      <code>git add filename</code>
    </div>

    <div class="workflow-arrow">→</div>

    <div class="workflow-step">
      <div class="workflow-icon"><i class="fas fa-save"></i></div>
      <h5>4. Commit</h5>
      <p>Save with a message</p>
      <code>git commit -m "message"</code>
    </div>
  </div>
</div>

### Essential Commands Reference

<div class="command-reference-grid">
  <div class="command-card">
    <h5><code>git status</code></h5>
    <p>Show the current state of your repository</p>
    <div class="command-example">
      <pre><code>$ git status
On branch main
Changes not staged for commit:
  modified:   analyze.py

Untracked files:
  results.csv</code></pre>
    </div>
  </div>

  <div class="command-card">
    <h5><code>git add</code></h5>
    <p>Stage files for the next commit</p>
    <div class="command-example">
      <pre><code># Add specific file
git add analyze.py

# Add all changed files
git add .

# Add all Python files
git add *.py</code></pre>
    </div>
  </div>

  <div class="command-card">
    <h5><code>git commit</code></h5>
    <p>Save staged changes to repository history</p>
    <div class="command-example">
      <pre><code># Commit with message
git commit -m "Add sentiment analysis function"

# Commit with detailed message
git commit -m "Fix encoding bug

- Handle UTF-8 files correctly
- Add fallback for Latin-1"</code></pre>
    </div>
  </div>

  <div class="command-card">
    <h5><code>git log</code></h5>
    <p>View commit history</p>
    <div class="command-example">
      <pre><code># Compact view
git log --oneline

# Detailed view
git log

# Show changes in each commit
git log -p</code></pre>
    </div>
  </div>

  <div class="command-card">
    <h5><code>git diff</code></h5>
    <p>Show changes between versions</p>
    <div class="command-example">
      <pre><code># Unstaged changes
git diff

# Staged changes
git diff --staged

# Compare to previous commit
git diff HEAD~1</code></pre>
    </div>
  </div>

  <div class="command-card">
    <h5><code>git restore</code></h5>
    <p>Undo changes to files</p>
    <div class="command-example">
      <pre><code># Discard changes in working directory
git restore analyze.py

# Unstage a file
git restore --staged analyze.py</code></pre>
    </div>
  </div>
</div>

## Writing Good Commit Messages

<div class="commit-message-guide">
  <h4>Commit Message Best Practices</h4>

  <div class="message-comparison">
    <div class="bad-messages">
      <h5>Unhelpful Messages</h5>
      <ul class="message-examples bad">
        <li><code>"fixed stuff"</code></li>
        <li><code>"updates"</code></li>
        <li><code>"asdfasdf"</code></li>
        <li><code>"WIP"</code></li>
        <li><code>"changes"</code></li>
      </ul>
      <p class="message-note">These don't tell you anything useful when you look back at history.</p>
    </div>

    <div class="good-messages">
      <h5>Helpful Messages</h5>
      <ul class="message-examples good">
        <li><code>"Add word frequency analysis function"</code></li>
        <li><code>"Fix encoding error in CSV export"</code></li>
        <li><code>"Update stop words list for Victorian texts"</code></li>
        <li><code>"Refactor data cleaning into separate module"</code></li>
        <li><code>"Add documentation for sentiment analysis"</code></li>
      </ul>
      <p class="message-note">These explain <strong>what</strong> changed and <strong>why</strong>.</p>
    </div>
  </div>

  <div class="message-formula">
    <h5>Commit Message Formula</h5>
    <p><strong>Format:</strong> <code>[Action verb] [what you changed] [optional: why]</code></p>
    <p><strong>Common verbs:</strong> Add, Fix, Update, Remove, Refactor, Document, Test</p>
  </div>
</div>

<div class="quiz" data-quiz="commit-messages">
  <h3>Quick Check: Writing Commit Messages</h3>
  <p>You just fixed a bug in your Python script. The problem was that it crashed whenever it tried to read files containing accented characters like "é" or "ñ". Now you need to save your fix with a commit message. Which message would be most helpful when you look back at your project history in 6 months?</p>

  <label class="quiz-option">
    <input type="radio" name="commit-quiz" value="bad1">
    <code>"bug fix"</code>
  </label>
  <label class="quiz-option">
    <input type="radio" name="commit-quiz" value="bad2">
    <code>"fixed the thing"</code>
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="commit-quiz" value="good">
    <code>"Fix crash when processing files with accented characters"</code>
  </label>
  <label class="quiz-option">
    <input type="radio" name="commit-quiz" value="bad3">
    <code>"encoding"</code>
  </label>

  <div class="feedback-correct">
    <p><strong>This message tells future-you exactly what was fixed and why.</strong> When you're debugging a similar issue months later, this commit message will help you understand what changed.</p>
  </div>
  <div class="feedback-incorrect">
    <p>A good commit message should describe <strong>what</strong> was changed and <strong>why</strong>. "Fix crash when processing files with accented characters" gives useful context that you'll appreciate later.</p>
  </div>
</div>

## Working with GitHub

<div class="github-section">
  <h4>Why GitHub?</h4>
  <p>GitHub is a platform that hosts Git repositories online, enabling:</p>
  <ul>
    <li><strong>Backup:</strong> Your code is safely stored in the cloud</li>
    <li><strong>Collaboration:</strong> Work with others on the same project</li>
    <li><strong>Sharing:</strong> Make your work public for others to learn from</li>
    <li><strong>Portfolio:</strong> Showcase your DH projects to potential employers</li>
  </ul>
</div>

### Setting Up GitHub

<div class="github-setup">
  <h4>Step 1: Create a GitHub Account</h4>
  <ol>
    <li>Visit <a href="https://github.com">github.com</a></li>
    <li>Sign up with your university email (for student benefits)</li>
    <li>Choose a professional username (this will be public)</li>
    <li>Verify your email address</li>
  </ol>

  <h4>Step 2: Set Up Authentication</h4>
  <p>GitHub requires authentication to push code. The easiest method is HTTPS with a personal access token:</p>

  <div class="auth-steps">
    <ol>
      <li>Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)</li>
      <li>Click "Generate new token (classic)"</li>
      <li>Give it a name like "My Computer"</li>
      <li>Select scopes: <code>repo</code> (full control of repositories)</li>
      <li>Generate and <strong>copy the token immediately</strong> (you won't see it again)</li>
      <li>When Git asks for your password, paste this token instead</li>
    </ol>
  </div>

  <div class="pro-tip">
    <p><strong>Credential Storage:</strong> To avoid entering your token repeatedly:</p>
    <pre><code># Mac: Uses Keychain
git config --global credential.helper osxkeychain

# PC: Uses Windows Credential Manager
git config --global credential.helper wincred</code></pre>
  </div>
</div>

### Connecting Local Repository to GitHub

<div class="hands-on-exercise">
  <h4>Exercise: Push Your Project to GitHub</h4>

  <div class="exercise-steps">
    <div class="exercise-step">
      <div class="step-number">1</div>
      <div class="step-content">
        <h5>Create Repository on GitHub</h5>
        <ul>
          <li>Click the "+" icon → "New repository"</li>
          <li>Name: <code>victorian-novels-analysis</code></li>
          <li>Description: "Text analysis of Victorian literature"</li>
          <li>Keep it Public (or Private if you prefer)</li>
          <li><strong>Don't</strong> initialize with README (we already have one)</li>
          <li>Click "Create repository"</li>
        </ul>
      </div>
    </div>

    <div class="exercise-step">
      <div class="step-number">2</div>
      <div class="step-content">
        <h5>Connect Local to Remote</h5>
        <pre><code># Add GitHub as remote (use your username)
git remote add origin https://github.com/YOUR-USERNAME/victorian-novels-analysis.git

# Verify the connection
git remote -v</code></pre>
      </div>
    </div>

    <div class="exercise-step">
      <div class="step-number">3</div>
      <div class="step-content">
        <h5>Push Your Code</h5>
        <pre><code># Push to GitHub (first time needs -u flag)
git push -u origin main

# Enter your GitHub username when prompted
# Enter your personal access token as the password</code></pre>
      </div>
    </div>

    <div class="exercise-step">
      <div class="step-number">4</div>
      <div class="step-content">
        <h5>Verify on GitHub</h5>
        <p>Visit your repository URL to see your files online!</p>
      </div>
    </div>
  </div>
</div>

### The Push/Pull Workflow

<div class="push-pull-diagram">
  <h4>Syncing with GitHub</h4>

  <div class="sync-visual">
    <div class="sync-location local">
      <h5>Your Computer</h5>
      <p>Local repository</p>
    </div>

    <div class="sync-arrows">
      <div class="arrow-up">
        <span>git push</span>
        <span>↑</span>
        <span>Send your commits</span>
      </div>
      <div class="arrow-down">
        <span>git pull</span>
        <span>↓</span>
        <span>Get others' commits</span>
      </div>
    </div>

    <div class="sync-location remote">
      <h5>GitHub</h5>
      <p>Remote repository</p>
    </div>
  </div>

  <div class="sync-commands">
    <div class="sync-command">
      <h5><code>git push</code></h5>
      <p>Upload your commits to GitHub</p>
      <pre><code>git push origin main</code></pre>
    </div>

    <div class="sync-command">
      <h5><code>git pull</code></h5>
      <p>Download changes from GitHub</p>
      <pre><code>git pull origin main</code></pre>
    </div>

    <div class="sync-command">
      <h5><code>git clone</code></h5>
      <p>Download an entire repository</p>
      <pre><code>git clone https://github.com/username/repo.git</code></pre>
    </div>
  </div>
</div>

## Branching: Safe Experimentation

<div class="branching-intro">
  <h4>What Are Branches?</h4>
  <p>Branches let you work on new features or experiments without affecting your main code. Think of them as parallel timelines for your project.</p>

  <div class="branch-visual">
    <div class="branch-diagram">
      <div class="branch main-branch">
        <span class="branch-label">main</span>
        <div class="commits">
          <span class="commit">●</span>
          <span class="commit">●</span>
          <span class="commit">●</span>
          <span class="commit">●</span>
        </div>
        <p>Stable, working code</p>
      </div>
      <div class="branch feature-branch">
        <span class="branch-label">experiment</span>
        <div class="commits">
          <span class="commit branch-point">●</span>
          <span class="commit">●</span>
          <span class="commit">●</span>
        </div>
        <p>Try new ideas here</p>
      </div>
    </div>
  </div>
</div>

### Branch Commands

<div class="branch-commands">
  <div class="branch-command-card">
    <h5>Create and Switch to Branch</h5>
    <pre><code># Create and switch in one command
git checkout -b sentiment-analysis

# Or using newer syntax
git switch -c sentiment-analysis</code></pre>
  </div>

  <div class="branch-command-card">
    <h5>List and Switch Branches</h5>
    <pre><code># List all branches
git branch

# Switch to existing branch
git checkout main
# or
git switch main</code></pre>
  </div>

  <div class="branch-command-card">
    <h5>Merge Branch</h5>
    <pre><code># Switch to main first
git checkout main

# Merge your feature branch
git merge sentiment-analysis

# Delete branch after merging
git branch -d sentiment-analysis</code></pre>
  </div>
</div>

<div class="quiz" data-quiz="branching">
  <h3>Quick Check: Safe Experimentation</h3>
  <p>Your text analysis script is working well, but you have an idea for a completely different approach that might work better. You want to try this new approach, but you're worried about breaking the code that's already working. What's the safest way to experiment?</p>

  <label class="quiz-option">
    <input type="radio" name="branch-quiz" value="copy">
    Copy all your project files to a new folder and work there
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="branch-quiz" value="branch">
    Create a Git branch to try your experiment in isolation
  </label>
  <label class="quiz-option">
    <input type="radio" name="branch-quiz" value="careful">
    Just make changes carefully and hope nothing breaks
  </label>

  <div class="feedback-correct">
    <p><strong>Branching is designed exactly for this!</strong> A branch creates a separate "timeline" for your code. You can experiment freely, and if it works, merge it back into your main code. If it doesn't work out, just delete the branch—your original code stays completely untouched.</p>
  </div>
  <div class="feedback-incorrect">
    <p>Git branches are the safest way to experiment. The command <code>git checkout -b experiment</code> creates a parallel version of your project where you can try anything without risking your working code. Think of it as a "sandbox" for testing ideas.</p>
  </div>
</div>

## The .gitignore File

<div class="gitignore-section">
  <h4>Keeping Sensitive and Generated Files Out of Git</h4>
  <p>Some files should never be committed to Git:</p>
  <ul>
    <li><strong>Sensitive data:</strong> API keys, passwords, personal information</li>
    <li><strong>Large data files:</strong> Datasets that are too big for GitHub</li>
    <li><strong>Generated files:</strong> Outputs that can be recreated</li>
    <li><strong>System files:</strong> <code>.DS_Store</code>, <code>Thumbs.db</code></li>
    <li><strong>Virtual environments:</strong> <code>venv/</code>, <code>.env/</code></li>
  </ul>

  <h4>Creating a .gitignore File</h4>
  <p>Create a file named <code>.gitignore</code> in your project root:</p>

  <pre><code># Python
__pycache__/
*.py[cod]
venv/
.env

# Jupyter Notebooks
.ipynb_checkpoints/

# Data files (too large for GitHub)
data/raw/*.csv
data/raw/*.json
*.sqlite

# Secrets
config/secrets.py
.env

# System files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Output files that can be regenerated
results/figures/
*.log</code></pre>

  <div class="pro-tip">
    <p><strong>GitHub Gitignore Templates:</strong> Visit <a href="https://github.com/github/gitignore">github.com/github/gitignore</a> for ready-made templates for Python, R, and other languages.</p>
  </div>
</div>

## Recovering from Mistakes

<div class="recovery-section">
  <h4>Common Situations and Solutions</h4>

  <div class="recovery-scenarios">
    <div class="scenario-card">
      <h5>"I made changes I want to undo"</h5>
      <div class="scenario-solution">
        <pre><code># Discard changes to a specific file
git restore filename.py

# Discard ALL uncommitted changes (careful!)
git restore .</code></pre>
      </div>
    </div>

    <div class="scenario-card">
      <h5>"I staged files I didn't mean to"</h5>
      <div class="scenario-solution">
        <pre><code># Unstage a specific file
git restore --staged filename.py

# Unstage everything
git restore --staged .</code></pre>
      </div>
    </div>

    <div class="scenario-card">
      <h5>"I need to change my last commit message"</h5>
      <div class="scenario-solution">
        <pre><code># Amend the most recent commit message
git commit --amend -m "New message"</code></pre>
        <p class="warning">Only do this if you haven't pushed yet!</p>
      </div>
    </div>

    <div class="scenario-card">
      <h5>"I need to go back to a previous version"</h5>
      <div class="scenario-solution">
        <pre><code># See commit history
git log --oneline

# View a file from a previous commit
git show abc1234:filename.py

# Restore a file from previous commit
git restore --source=abc1234 filename.py</code></pre>
      </div>
    </div>

    <div class="scenario-card">
      <h5>"I accidentally committed sensitive data"</h5>
      <div class="scenario-solution">
        <p class="warning">If you've already pushed, the data may be visible in Git history. Contact GitHub support for help removing it.</p>
        <p>For unpushed commits, you can rewrite history, but this is advanced. Best practice: use <code>.gitignore</code> to prevent this!</p>
      </div>
    </div>
  </div>
</div>

## Practical DH Workflow Example

<div class="workflow-example">
  <h4>Complete Example: Text Analysis Project</h4>
  <p>Here's a realistic Git workflow for a DH project:</p>

  <div class="workflow-timeline">
    <div class="timeline-event">
      <div class="event-marker">Day 1</div>
      <div class="event-content">
        <h5>Project Setup</h5>
        <pre><code>mkdir dickens-analysis && cd dickens-analysis
git init
mkdir data scripts results
echo "# Dickens Novel Analysis" > README.md
git add .
git commit -m "Initial project structure"</code></pre>
      </div>
    </div>

    <div class="timeline-event">
      <div class="event-marker">Day 2</div>
      <div class="event-content">
        <h5>Add Data Processing Script</h5>
        <pre><code># Create your Python script
# ... write code in scripts/preprocess.py ...

git add scripts/preprocess.py
git commit -m "Add text preprocessing script"</code></pre>
      </div>
    </div>

    <div class="timeline-event">
      <div class="event-marker">Day 3</div>
      <div class="event-content">
        <h5>Experiment with Analysis Approach</h5>
        <pre><code># Create branch for experiment
git checkout -b word-frequency

# Work on analysis...
git add scripts/word_freq.py
git commit -m "Add word frequency analysis"

# Happy with results? Merge back
git checkout main
git merge word-frequency
git branch -d word-frequency</code></pre>
      </div>
    </div>

    <div class="timeline-event">
      <div class="event-marker">Day 4</div>
      <div class="event-content">
        <h5>Share on GitHub</h5>
        <pre><code># Create repo on GitHub, then:
git remote add origin https://github.com/user/dickens-analysis.git
git push -u origin main</code></pre>
      </div>
    </div>

    <div class="timeline-event">
      <div class="event-marker">Ongoing</div>
      <div class="event-content">
        <h5>Daily Workflow</h5>
        <pre><code># Start of session: get any updates
git pull

# Work on code...

# End of session: save and share
git add .
git commit -m "Descriptive message"
git push</code></pre>
      </div>
    </div>
  </div>
</div>

## Quick Reference Card

<div class="reference-card">
  <h4>Git Cheat Sheet</h4>

  <div class="reference-grid">
    <div class="ref-section">
      <h5>Setup</h5>
      <ul>
        <li><code>git init</code> - Initialize repository</li>
        <li><code>git clone URL</code> - Copy remote repo</li>
        <li><code>git config --global user.name</code> - Set name</li>
        <li><code>git config --global user.email</code> - Set email</li>
      </ul>
    </div>

    <div class="ref-section">
      <h5>Daily Commands</h5>
      <ul>
        <li><code>git status</code> - Check state</li>
        <li><code>git add file</code> - Stage changes</li>
        <li><code>git commit -m "msg"</code> - Save snapshot</li>
        <li><code>git push</code> - Upload to GitHub</li>
        <li><code>git pull</code> - Download from GitHub</li>
      </ul>
    </div>

    <div class="ref-section">
      <h5>Branching</h5>
      <ul>
        <li><code>git branch</code> - List branches</li>
        <li><code>git checkout -b name</code> - Create branch</li>
        <li><code>git checkout main</code> - Switch branch</li>
        <li><code>git merge name</code> - Merge branch</li>
      </ul>
    </div>

    <div class="ref-section">
      <h5>History & Undo</h5>
      <ul>
        <li><code>git log --oneline</code> - View history</li>
        <li><code>git diff</code> - Show changes</li>
        <li><code>git restore file</code> - Undo changes</li>
        <li><code>git restore --staged file</code> - Unstage</li>
      </ul>
    </div>
  </div>
</div>

## Next Steps

Congratulations! You now have the foundational Git skills for DH work. To continue developing your skills:

<div class="next-steps-grid">
  <div class="next-step-card">
    <h5>Practice Regularly</h5>
    <p>Use Git for every project, even small ones. Muscle memory develops through repetition.</p>
  </div>

  <div class="next-step-card">
    <h5>Explore GitHub Features</h5>
    <p>Issues, Projects, and Pull Requests help manage larger projects and collaboration.</p>
  </div>

  <div class="next-step-card">
    <h5>Learn Advanced Topics</h5>
    <p>Rebasing, cherry-picking, and stashing become useful as your projects grow.</p>
  </div>

  <div class="next-step-card">
    <h5>Contribute to Open Source</h5>
    <p>Many DH tools are open source. Contributing is a great way to learn and give back.</p>
  </div>
</div>

---

*Version control is a skill that improves with practice. Start using Git today, even for small projects, and it will become second nature.*

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
</script>

<style>
/* Use Cases Grid */
.use-cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
    margin: var(--space-lg) 0;
}

.use-case-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--space-md);
    text-align: center;
}

.use-case-icon {
    font-size: 2rem;
    color: var(--color-primary);
    margin-bottom: var(--space-sm);
}

.use-case-card h4 {
    margin-bottom: var(--space-xs);
}

.use-case-card p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
}

/* Platform Tabs */
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

/* Mental Model */
.mental-model {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

.states-diagram {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-md);
    margin-top: var(--space-lg);
    flex-wrap: wrap;
}

.state-box {
    flex: 1;
    min-width: 200px;
    padding: var(--space-md);
    border-radius: var(--border-radius);
    text-align: center;
}

.state-box.working {
    background: rgba(59, 130, 246, 0.1);
    border: 2px solid #3b82f6;
}

.state-box.staging {
    background: rgba(245, 158, 11, 0.1);
    border: 2px solid #f59e0b;
}

.state-box.repository {
    background: rgba(16, 185, 129, 0.1);
    border: 2px solid #10b981;
}

.state-box h5 {
    margin-bottom: var(--space-xs);
}

.state-box p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: var(--space-sm);
}

.state-action {
    font-size: 0.75rem;
    font-family: var(--font-mono);
    color: var(--text-secondary);
}

.state-arrow {
    font-size: 1.5rem;
    color: var(--text-secondary);
}

/* Workflow Diagram */
.workflow-diagram {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

.workflow-steps {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-sm);
    margin-top: var(--space-md);
    flex-wrap: wrap;
}

.workflow-step {
    flex: 1;
    min-width: 150px;
    text-align: center;
    padding: var(--space-md);
}

.workflow-icon {
    font-size: 2rem;
    color: var(--color-primary);
    margin-bottom: var(--space-sm);
}

.workflow-step h5 {
    margin-bottom: var(--space-xs);
}

.workflow-step p {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: var(--space-xs);
}

.workflow-step code {
    display: block;
    font-size: 0.75rem;
    background: var(--bg-tertiary);
    padding: 0.25rem;
    border-radius: var(--border-radius);
    margin-top: 0.25rem;
}

.workflow-arrow {
    font-size: 1.5rem;
    color: var(--text-secondary);
    padding-top: var(--space-xl);
}

/* Command Reference Grid */
.command-reference-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-md);
    margin: var(--space-lg) 0;
}

.command-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--space-md);
}

.command-card h5 {
    font-family: var(--font-mono);
    color: var(--color-primary);
    margin-bottom: var(--space-xs);
}

.command-card > p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: var(--space-sm);
}

.command-example {
    background: var(--bg-tertiary);
    border-radius: var(--border-radius);
    padding: var(--space-sm);
}

.command-example pre {
    margin: 0;
    font-size: 0.75rem;
}

/* Commit Message Guide */
.commit-message-guide {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

.message-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
    margin: var(--space-md) 0;
}

.bad-messages, .good-messages {
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.bad-messages {
    background: rgba(220, 38, 38, 0.1);
    border-left: 4px solid var(--color-danger);
}

.good-messages {
    background: rgba(16, 185, 129, 0.1);
    border-left: 4px solid var(--color-success);
}

.message-examples {
    list-style: none;
    padding: 0;
    margin: var(--space-sm) 0;
}

.message-examples li {
    padding: var(--space-xs) 0;
    font-family: var(--font-mono);
    font-size: 0.875rem;
}

.message-examples.bad li {
    color: var(--color-danger);
}

.message-examples.good li {
    color: var(--color-success);
}

.message-note {
    font-size: 0.875rem;
    font-style: italic;
    color: var(--text-secondary);
    margin: 0;
}

.message-formula {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    margin-top: var(--space-md);
}

/* GitHub Section */
.github-section {
    background: linear-gradient(135deg, #24292e, #1a1e22);
    color: white;
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

.github-section h4 {
    color: white;
}

.github-section ul {
    margin: var(--space-sm) 0;
}

.github-section li {
    margin-bottom: var(--space-xs);
}

.github-setup {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

.auth-steps {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    margin: var(--space-md) 0;
}

/* Push/Pull Diagram */
.push-pull-diagram {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

.sync-visual {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: var(--space-lg) 0;
    gap: var(--space-md);
}

.sync-location {
    text-align: center;
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    min-width: 150px;
}

.sync-location.local {
    background: rgba(59, 130, 246, 0.1);
    border: 2px solid #3b82f6;
}

.sync-location.remote {
    background: rgba(16, 185, 129, 0.1);
    border: 2px solid #10b981;
}

.sync-arrows {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.arrow-up, .arrow-down {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.arrow-up span:nth-child(2),
.arrow-down span:nth-child(2) {
    font-size: 1.5rem;
}

.sync-commands {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-lg);
}

.sync-command {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.sync-command h5 {
    font-family: var(--font-mono);
    color: var(--color-primary);
}

/* Branching */
.branching-intro {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

.branch-visual {
    margin: var(--space-lg) 0;
}

.branch-diagram {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.branch {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-sm);
}

.branch-label {
    font-family: var(--font-mono);
    font-weight: bold;
    min-width: 100px;
}

.main-branch .branch-label {
    color: var(--color-primary);
}

.feature-branch {
    margin-left: 60px;
}

.feature-branch .branch-label {
    color: var(--color-secondary);
}

.commits {
    display: flex;
    gap: var(--space-sm);
}

.commit {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
}

.feature-branch .commit {
    background: var(--color-secondary);
}

.branch p {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;
}

.branch-commands {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
    margin: var(--space-lg) 0;
}

.branch-command-card {
    background: var(--bg-secondary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

/* Gitignore Section */
.gitignore-section {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

/* Recovery Section */
.recovery-section {
    margin: var(--space-lg) 0;
}

.recovery-scenarios {
    display: grid;
    gap: var(--space-md);
}

.scenario-card {
    background: var(--bg-secondary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-warning);
}

.scenario-card h5 {
    color: var(--color-warning);
    margin-bottom: var(--space-sm);
}

.scenario-solution {
    background: var(--bg-tertiary);
    padding: var(--space-sm);
    border-radius: var(--border-radius);
    margin-top: var(--space-sm);
}

.scenario-solution pre {
    margin: 0;
}

.scenario-solution .warning {
    color: var(--color-danger);
    font-size: 0.875rem;
    margin: var(--space-xs) 0 0 0;
}

/* Workflow Example */
.workflow-example {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

.workflow-timeline {
    margin-top: var(--space-md);
}

.timeline-event {
    display: flex;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
    padding-left: var(--space-md);
    border-left: 2px solid var(--border-color);
}

.event-marker {
    background: var(--color-primary);
    color: white;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--border-radius);
    font-size: 0.75rem;
    font-weight: bold;
    white-space: nowrap;
    height: fit-content;
}

.event-content {
    flex: 1;
}

.event-content h5 {
    margin-bottom: var(--space-xs);
}

/* Reference Card */
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

.ref-section h5 {
    margin-bottom: var(--space-sm);
    color: var(--color-primary);
}

.ref-section ul {
    margin: 0;
    padding-left: var(--space-md);
}

.ref-section li {
    margin: 0.25rem 0;
    font-size: 0.875rem;
}

.ref-section code {
    font-size: 0.75rem;
}

/* Next Steps */
.next-steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
    margin: var(--space-lg) 0;
}

.next-step-card {
    background: var(--bg-secondary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-primary);
}

.next-step-card h5 {
    margin-bottom: var(--space-xs);
}

.next-step-card p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
}

/* Hands-on Exercise */
.hands-on-exercise {
    background: var(--bg-secondary);
    border: 2px solid var(--color-success);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.exercise-steps {
    margin-top: var(--space-md);
}

.exercise-step {
    display: flex;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
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
}

.step-content h5 {
    margin-bottom: var(--space-xs);
}

/* Pro Tip */
.pro-tip {
    background: linear-gradient(135deg, var(--color-info), var(--color-primary));
    color: white;
    padding: var(--space-md);
    border-radius: var(--border-radius);
    margin: var(--space-md) 0;
}

.pro-tip p {
    margin: 0;
}

.pro-tip pre {
    background: rgba(0, 0, 0, 0.2);
    padding: var(--space-sm);
    border-radius: var(--border-radius);
    margin-top: var(--space-sm);
}

.pro-tip code {
    color: white;
}

/* Config Steps */
.config-steps {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

/* Responsive */
@media (max-width: 768px) {
    .states-diagram,
    .workflow-steps,
    .sync-visual {
        flex-direction: column;
    }

    .state-arrow,
    .workflow-arrow {
        transform: rotate(90deg);
    }

    .message-comparison {
        grid-template-columns: 1fr;
    }

    .feature-branch {
        margin-left: 0;
    }

    .timeline-event {
        flex-direction: column;
    }
}

/* GitHub Desktop Section */
.desktop-app-section {
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.desktop-app-section > h4 {
    margin-bottom: var(--space-md);
}

.desktop-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-md);
    margin: var(--space-md) 0;
}

.desktop-feature {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.desktop-feature h5 {
    margin-bottom: var(--space-sm);
    color: var(--color-primary);
}

.desktop-feature ul {
    margin: 0;
    padding-left: var(--space-md);
}

.desktop-feature li {
    margin-bottom: var(--space-xs);
    font-size: 0.875rem;
}

.desktop-install {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    margin: var(--space-md) 0;
}

.desktop-install h5 {
    margin-bottom: var(--space-sm);
}

.desktop-install ol {
    margin: 0;
    padding-left: var(--space-lg);
}

.desktop-install li {
    margin-bottom: var(--space-xs);
}

.recommendation-box {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
    border: 1px solid var(--color-primary);
    border-radius: var(--border-radius);
    padding: var(--space-md);
    margin-top: var(--space-md);
}

.recommendation-box p {
    margin: 0;
    font-size: 0.9375rem;
}
</style>
