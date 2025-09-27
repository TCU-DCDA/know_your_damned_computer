---
layout: guide
title: "Working with Compressed Files"
slug: compression
description: "Learn ZIP files and other compressed formats. Essential for data sharing, backup, and working with DH datasets."
difficulty: beginner
time_estimate: "25 min"
learning_objectives:
  - "Understand different compression formats and their uses"
  - "Create and extract archives using GUI and command line tools"
  - "Implement best practices for DH data archiving"
  - "Troubleshoot common compression problems"
prev_guide:
  title: "Understanding File Paths"
  url: "/guides/file-paths/"
next_guide:
  title: "Essential File Formats for DH"
  url: "/guides/file-formats/"
interactive: true
---

Compressed files (like ZIP archives) are everywhere in digital humanities work. You'll encounter them when downloading datasets, sharing research materials, backing up projects, and working with many DH tools. This guide will help you understand and confidently work with compressed files on both Mac and PC.

## Why Compression Matters in DH

<div class="quiz" data-quiz="compression-scenarios">
  <h3>Knowledge Check: DH Compression Scenarios</h3>
  <p>Which scenario would benefit MOST from file compression?</p>

  <label class="quiz-option">
    <input type="radio" name="scenario-quiz" value="wrong1">
    Editing a single Word document
  </label>

  <label class="quiz-option" data-correct>
    <input type="radio" name="scenario-quiz" value="correct">
    Sharing a 50MB corpus of historical texts via email
  </label>

  <label class="quiz-option">
    <input type="radio" name="scenario-quiz" value="wrong2">
    Opening a PDF file
  </label>

  <label class="quiz-option">
    <input type="radio" name="scenario-quiz" value="wrong3">
    Browsing the web
  </label>
</div>

### Common DH Scenarios
- **Downloading datasets**: Many archives provide data as ZIP files
- **Sharing research**: Email attachments have size limits; compression helps
- **Backing up projects**: Compress completed work for long-term storage
- **Software installation**: Many DH tools are distributed as compressed archives
- **Collaborative work**: Share entire project folders easily

### Benefits of Compression
- **Smaller file sizes**: Save storage space and transfer time
- **Bundling**: Keep related files together in one package
- **Organization**: Archive completed work cleanly
- **Compatibility**: ZIP files work across all platforms

## Types of Compressed Files

<div class="quiz" data-quiz="format-identification">
  <h3>Format Identification Quiz</h3>
  <p>You receive a file called "medieval-manuscripts.tar.gz". What can you tell about this file?</p>

  <label class="quiz-option">
    <input type="radio" name="format-quiz" value="wrong1">
    It's a Word document
  </label>

  <label class="quiz-option" data-correct>
    <input type="radio" name="format-quiz" value="correct">
    It's a tar archive compressed with gzip, likely from Mac/Linux
  </label>

  <label class="quiz-option">
    <input type="radio" name="format-quiz" value="wrong2">
    It's a broken file with a typo in the name
  </label>

  <label class="quiz-option">
    <input type="radio" name="format-quiz" value="wrong3">
    It can only be opened on Windows
  </label>
</div>

### Common Formats You'll Encounter

| Format | Extension | Platform | Notes |
|--------|-----------|----------|-------|
| ZIP | `.zip` | All | Most common, widely supported |
| RAR | `.rar` | All | Good compression, requires special software |
| 7-Zip | `.7z` | All | Excellent compression ratio |
| Gzip | `.gz` | Mac/Linux | Common for single files |
| Tar | `.tar` | Mac/Linux | Archive format, often combined with gzip |
| Tar.gz | `.tar.gz` or `.tgz` | Mac/Linux | Tar archive compressed with gzip |

### Platform-Specific Formats
**Mac:**
- `.dmg` - Disk images (software installation)
- `.sit` - StuffIt archives (legacy)

**PC:**
- `.cab` - Cabinet files (Windows system files)
- `.msi` - Windows installer packages

## Hands-On Exercise: Creating Your First Archive

<div class="exercise" data-exercise="first-archive">
  <h3>Exercise 1: Create a Research Archive</h3>

  <div class="exercise-step">
    <h4>Step 1: Prepare Sample Files</h4>
    <p>Create a folder called "DH-Sample-Project" with these files:</p>
    <ul>
      <li><code>README.txt</code> - Project description</li>
      <li><code>data.csv</code> - Sample dataset</li>
      <li><code>analysis.py</code> - Python script</li>
    </ul>
  </div>

  <div class="exercise-step">
    <h4>Step 2: Create Archive (Choose Your Platform)</h4>
    <div class="platform-tabs">
      <div class="tab-content mac">
        <p><strong>Mac Method:</strong></p>
        <ol>
          <li>Right-click on the "DH-Sample-Project" folder</li>
          <li>Select "Compress DH-Sample-Project"</li>
          <li>Rename to "dh-sample-project-2024.zip"</li>
        </ol>
      </div>
      <div class="tab-content pc">
        <p><strong>PC Method:</strong></p>
        <ol>
          <li>Right-click on the "DH-Sample-Project" folder</li>
          <li>Select "Send to" → "Compressed (zipped) folder"</li>
          <li>Rename to "dh-sample-project-2024.zip"</li>
        </ol>
      </div>
    </div>
  </div>

  <div class="exercise-step">
    <h4>Step 3: Test Your Archive</h4>
    <ol>
      <li>Move original folder to a different location</li>
      <li>Double-click your ZIP file to extract</li>
      <li>Verify all files are present and can be opened</li>
    </ol>
  </div>

  <button class="btn btn-success" onclick="markExerciseComplete('first-archive')">Mark Complete</button>
</div>

## Command Line Compression

<div data-terminal="compression-commands">
  <div style="background: #f5f5f5; border: 1px solid #ddd; padding: 1rem; margin: 1rem 0; border-radius: 4px;">
    <strong>Terminal Loading...</strong><br>
    <small>If this message persists, there may be a JavaScript issue. Check browser console for errors.</small>
  </div>
</div>

### Mac/Linux Commands

Try these commands in the terminal simulator above:

```bash
# List files in current directory
ls

# Create a ZIP archive
zip research.zip *.txt

# List contents of ZIP file
unzip -l research.zip

# Extract ZIP file
unzip research.zip

# Compress a folder recursively
zip -r project.zip DH-Project/
```

### PC PowerShell Commands

```powershell
# List files
dir

# Create ZIP archive
Compress-Archive -Path "*.txt" -DestinationPath "research.zip"

# Extract ZIP file
Expand-Archive -Path "research.zip" -DestinationPath "."
```

## Advanced Techniques

<div class="quiz" data-quiz="compression-best-practices">
  <h3>Best Practices Quiz</h3>
  <p>You're about to share a 500MB dataset with collaborators worldwide. What's the BEST approach?</p>

  <label class="quiz-option">
    <input type="radio" name="practices-quiz" value="wrong1">
    Email it directly as separate files
  </label>

  <label class="quiz-option">
    <input type="radio" name="practices-quiz" value="wrong2">
    Compress with password protection only
  </label>

  <label class="quiz-option" data-correct>
    <input type="radio" name="practices-quiz" value="correct">
    Compress, add README with metadata, test extraction, use cloud storage
  </label>

  <label class="quiz-option">
    <input type="radio" name="practices-quiz" value="wrong3">
    Compress to maximum level regardless of time
  </label>
</div>

### Password Protection

**Mac (Terminal):**
```bash
# Create password-protected ZIP
zip -er secure.zip confidential-files/

# Extract password-protected ZIP
unzip secure.zip
```

**PC (PowerShell with 7-Zip):**
```powershell
# Install 7-Zip first, then:
& "C:\Program Files\7-Zip\7z.exe" a -pPASSWORD secure.7z files/
```

### Compression Levels
Higher compression = smaller files but slower processing

**Mac:**
```bash
# Fast compression (less compression)
zip -1 fast.zip files/

# Maximum compression
zip -9 small.zip files/
```

## Real-World DH Scenario

<div class="exercise" data-exercise="dh-scenario">
  <h3>Exercise 2: Digital Archive Workflow</h3>

  <div class="scenario-setup">
    <h4>📚 Scenario</h4>
    <p>You've completed transcribing 50 Civil War letters for a digital humanities project. You need to:</p>
    <ul>
      <li>Archive the complete project</li>
      <li>Share it with your research team</li>
      <li>Prepare it for long-term preservation</li>
    </ul>
  </div>

  <div class="exercise-step">
    <h4>Step 1: Organize Project Structure</h4>
    <pre><code>civil-war-letters/
├── README.txt
├── raw-scans/
│   ├── letter-001.jpg
│   └── letter-002.jpg
├── transcriptions/
│   ├── letter-001.txt
│   └── letter-002.txt
├── metadata/
│   └── catalog.csv
└── scripts/
    └── text-analysis.py</code></pre>
  </div>

  <div class="exercise-step">
    <h4>Step 2: Create Documentation</h4>
    <p>Write a README.txt that includes:</p>
    <ul>
      <li>Project description and dates</li>
      <li>Creator contact information</li>
      <li>File descriptions</li>
      <li>Usage rights and citation info</li>
    </ul>
  </div>

  <div class="exercise-step">
    <h4>Step 3: Archive with Best Practices</h4>
    <ol>
      <li>Use descriptive filename: <code>civil-war-letters-smith-2024-09-27.zip</code></li>
      <li>Test extraction on different computer</li>
      <li>Verify all files open correctly</li>
      <li>Create backup copy</li>
    </ol>
  </div>

  <button class="btn btn-success" onclick="markExerciseComplete('dh-scenario')">Mark Complete</button>
</div>

## Common Problems and Solutions

### Problem 1: "Archive is Damaged/Corrupted"
**Causes:**
- Incomplete download
- Transfer error
- Storage media failure

**Solutions:**
1. Re-download the file
2. Try different extraction tool
3. Use repair utilities (7-Zip has repair function)

### Problem 2: Can't Extract All Files
**Causes:**
- Insufficient disk space
- File permission issues
- Long file paths (PC)

**Solutions:**
1. Check available disk space
2. Extract to different location
3. Run as administrator (PC)
4. Use shorter destination path

### Problem 3: Password Issues
**Solutions:**
1. Check for correct capitalization
2. Try copying/pasting password
3. Verify with sender if password is correct

## Third-Party Tools

### Recommended Software

**Cross-Platform:**
- **7-Zip** (free) - Handles many formats, excellent compression
- **PeaZip** (free) - User-friendly interface, many formats

**Mac-Specific:**
- **The Unarchiver** (free) - Handles many formats Finder can't
- **Keka** (free/paid) - Modern interface, good format support

**PC-Specific:**
- **WinRAR** (paid) - Industry standard, handles RAR files

## Best Practices for DH Work

### 1. Naming Conventions
```
Good: victorian-novels-corpus-2024-09-27.zip
Bad:  stuff.zip
```

### 2. Documentation
Include a README.txt file in your archives:
```
Contents of victorian-novels-corpus.zip
=====================================
Created: 2024-09-27
Creator: Sarah Johnson
Contact: sarah@university.edu

Contents:
/raw-texts/     - Original OCR files
/cleaned/       - Processed text files
/metadata/      - Bibliographic information
README.txt      - This file

Notes:
- All texts in UTF-8 encoding
- See metadata/sources.csv for complete bibliography
```

### 3. Test Your Archives
Always test that archives extract properly:
1. Create the archive
2. Extract it to a different location
3. Verify all files are present and functional

<div class="quiz" data-quiz="compression-proficiency">
  <h3>Proficiency Check: Compression Skills</h3>
  <p>A colleague sends you "research-data.rar" but you can't open it with your system's built-in tools. What should you do?</p>

  <label class="quiz-option">
    <input type="radio" name="proficiency-quiz" value="wrong1">
    Tell them the file is corrupted
  </label>

  <label class="quiz-option" data-correct>
    <input type="radio" name="proficiency-quiz" value="correct">
    Install a tool like 7-Zip that handles RAR files
  </label>

  <label class="quiz-option">
    <input type="radio" name="proficiency-quiz" value="wrong2">
    Convert it to ZIP online
  </label>

  <label class="quiz-option">
    <input type="radio" name="proficiency-quiz" value="wrong3">
    Ask them to buy WinRAR
  </label>
</div>

## Next Steps

Understanding compression prepares you for [working with different file formats]({{ site.baseurl }}/guides/file-formats/), where you'll learn about choosing the right format for different types of DH data and ensuring compatibility across platforms and tools.

---

*Remember: Compression is a fundamental skill for managing digital materials. Practice with small files first, then apply these techniques to your real research data.*