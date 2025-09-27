---
layout: guide
title: "Essential File Formats for DH"
slug: file-formats
description: "Choose the right file formats for your digital humanities projects. Focus on Python-compatible formats for analysis."
difficulty: beginner
time_estimate: "30 min"
learning_objectives:
  - "Understand text formats for DH research and Python analysis"
  - "Choose appropriate data formats (CSV, JSON, XML) for different projects"
  - "Handle encoding issues and character set problems"
  - "Convert between formats effectively for cross-platform compatibility"
prev_guide:
  title: "Working with Compressed Files"
  url: "/guides/compression/"
next_guide:
  title: "Command Line Basics"
  url: "/guides/command-line/"
interactive: true
---

Understanding file formats is crucial for DH work, especially when you'll be using Python for text analysis, data visualization, and mapping. This guide focuses on the formats you'll encounter most often and how to work with them effectively.

## Why File Formats Matter in DH

<div class="quiz" data-quiz="format-importance">
  <h3>Knowledge Check: Format Problems</h3>
  <p>You're trying to analyze 500 Victorian novels in Python, but your data is stored in Microsoft Word documents. What's the main problem?</p>
  
  <label class="quiz-option">
    <input type="radio" name="format-quiz" value="size">
    The files are too large
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="format-quiz" value="access">
    Python can't easily read Word documents for text analysis
  </label>
  <label class="quiz-option">
    <input type="radio" name="format-quiz" value="cost">
    Word documents are expensive to store
  </label>
  
  <div class="feedback-correct">
    <p><strong>Exactly!</strong> Python excels at analyzing plain text, CSV, and JSON files. Word documents contain formatting and metadata that make text extraction complex and unreliable.</p>
  </div>
  <div class="feedback-incorrect">
    <p>The main issue is <strong>accessibility</strong> - Python needs simple, structured formats for reliable text analysis. Word documents are designed for human reading, not programmatic analysis.</p>
  </div>
</div>

### Common Problems from Wrong Formats
- **Data that won't open in Python**: Binary formats, proprietary formats
- **Text with garbled characters**: Encoding mismatches, special characters
- **Images too large for web display**: Uncompressed formats, wrong resolution
- **Files that colleagues can't open**: Platform-specific formats, missing software

## Text Formats for DH Research

### Plain Text (.txt) - The Foundation

<div class="format-showcase">
  <div class="format-info">
    <h4>📄 Plain Text</h4>
    <p><strong>Best for:</strong> Research notes, cleaned text data, Python scripts</p>
    <div class="pros-cons">
      <div class="pros">
        <h5>✅ Advantages:</h5>
        <ul>
          <li>Universal compatibility</li>
          <li>Small file size</li>
          <li>Version control friendly</li>
          <li>Python reads easily</li>
        </ul>
      </div>
      <div class="cons">
        <h5>❌ Limitations:</h5>
        <ul>
          <li>No formatting</li>
          <li>No images</li>
          <li>No structure beyond paragraphs</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### Markdown (.md) - Structured Text

**Perfect for:** Documentation, research notes with basic formatting

<div class="code-example">
  <h4>📝 Markdown Example:</h4>
  ```markdown
  # Research Notes: Victorian Novels
  ## Data Sources
  - **Project Gutenberg**: Public domain texts
  - **HathiTrust**: Digitized books
  - *Last updated: 2024-09-26*
  
  ### Analysis Todo
  1. Clean OCR errors
  2. Extract character names
  3. Run sentiment analysis
  ```
</div>

**Tools:** VS Code (excellent support), Typora, any text editor

## Data Formats for Analysis

### CSV (Comma-Separated Values) - Your Best Friend

<div class="interactive-exercise" data-exercise="csv-structure">
  <h4>🧮 Interactive: Build a CSV</h4>
  <p>You're cataloging a collection of medieval manuscripts. Let's build a proper CSV structure:</p>
  
  <div class="csv-builder">
    <div class="csv-headers">
      <h5>Column Headers (first row):</h5>
      <input type="text" class="csv-input" placeholder="manuscript_id" value="manuscript_id">
      <input type="text" class="csv-input" placeholder="title" value="title">
      <input type="text" class="csv-input" placeholder="date_created" value="date_created">
      <input type="text" class="csv-input" placeholder="language" value="language">
    </div>
    
    <div class="csv-data">
      <h5>Sample Data Row:</h5>
      <input type="text" class="csv-input" placeholder="MS001">
      <input type="text" class="csv-input" placeholder="Book of Kells">
      <input type="text" class="csv-input" placeholder="800">
      <input type="text" class="csv-input" placeholder="Latin">
    </div>
    
    <div class="csv-preview">
      <h5>CSV Preview:</h5>
      <pre id="csv-output">manuscript_id,title,date_created,language
MS001,Book of Kells,800,Latin</pre>
    </div>
  </div>
</div>

**Why CSV is Perfect for DH:**
- **Python loves it**: `pandas.read_csv()` 
- **Spreadsheet compatible**: Excel, Google Sheets
- **Human readable**: Can edit in any text editor
- **Version control**: Git tracks changes line by line

### JSON (JavaScript Object Notation) - Structured Data

<div class="format-comparison">
  <div class="format-example">
    <h4>📊 Same Data, Different Formats:</h4>
    
    <div class="format-tabs">
      <div class="tab-content csv-tab">
        <h5>CSV Format:</h5>
        <pre>title,author,year,genre
"Pride and Prejudice","Jane Austen",1813,"Romance"
"Frankenstein","Mary Shelley",1818,"Gothic"</pre>
      </div>
      
      <div class="format-tabs json-tab">
        <h5>JSON Format:</h5>
        <pre>{
  "novels": [
    {
      "title": "Pride and Prejudice",
      "author": "Jane Austen", 
      "year": 1813,
      "genre": "Romance"
    },
    {
      "title": "Frankenstein",
      "author": "Mary Shelley",
      "year": 1818, 
      "genre": "Gothic"
    }
  ]
}</pre>
      </div>
    </div>
  </div>
</div>

**When to use JSON:**
- **Nested data**: Books with multiple authors, chapters, etc.
- **API data**: Many digital libraries provide JSON
- **Configuration files**: Settings for your Python projects
- **Web applications**: JavaScript can read JSON directly

## Encoding and Character Issues

### The UTF-8 Standard

<div class="quiz" data-quiz="encoding-problems">
  <h3>Encoding Detective</h3>
  <p>You open a text file containing French poetry and see: "caf√©" instead of "café". What's the problem?</p>
  
  <label class="quiz-option">
    <input type="radio" name="encoding-quiz" value="corrupt">
    The file is corrupted
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="encoding-quiz" value="encoding">
    Wrong character encoding (probably Latin-1 vs UTF-8)
  </label>
  <label class="quiz-option">
    <input type="radio" name="encoding-quiz" value="font">
    Wrong font is being used
  </label>
  
  <div class="feedback-correct">
    <p><strong>Correct!</strong> The é character (UTF-8: 0xC3A9) is being interpreted as two Latin-1 characters. This is a classic encoding mismatch.</p>
  </div>
  <div class="feedback-incorrect">
    <p>This is a character <strong>encoding</strong> issue - the same bytes are being interpreted using different character sets, causing special characters to display incorrectly.</p>
  </div>
</div>

### Python Encoding Solutions

<div class="code-example">
  <h4>🐍 Python Encoding Best Practices:</h4>
  ```python
  # Always specify encoding when opening files
  with open('french_poetry.txt', 'r', encoding='utf-8') as file:
      text = file.read()
  
  # Check encoding if you're not sure
  import chardet
  with open('mystery_file.txt', 'rb') as file:
      raw_data = file.read()
      encoding = chardet.detect(raw_data)
      print(f"Detected encoding: {encoding['encoding']}")
  
  # Convert if necessary
  with open('mystery_file.txt', 'r', encoding=encoding['encoding']) as file:
      text = file.read()
  
  # Save as UTF-8
  with open('clean_file.txt', 'w', encoding='utf-8') as file:
      file.write(text)
  ```
</div>

## Practical Exercise: Format Decision Tree

<div class="interactive-exercise" data-exercise="format-decision">
  <h4>🌳 Choose the Right Format</h4>
  <p>For each scenario, select the best file format:</p>
  
  <div class="scenario-cards">
    <div class="scenario">
      <h5>Scenario 1: Research Notes</h5>
      <p>You're taking notes while reading 50 academic articles about Victorian literature. You want to include quotes, citations, and your own analysis.</p>
      <div class="format-options">
        <label><input type="radio" name="scenario1" value="word"> Word Document</label>
        <label><input type="radio" name="scenario1" value="markdown"> Markdown</label>
        <label><input type="radio" name="scenario1" value="txt"> Plain Text</label>
      </div>
      <div class="scenario-feedback"></div>
    </div>
    
    <div class="scenario">
      <h5>Scenario 2: Metadata Collection</h5>
      <p>You're cataloging 200 historical photographs with information like date, location, people, and keywords for each image.</p>
      <div class="format-options">
        <label><input type="radio" name="scenario2" value="excel"> Excel Spreadsheet</label>
        <label><input type="radio" name="scenario2" value="csv"> CSV File</label>
        <label><input type="radio" name="scenario2" value="json"> JSON File</label>
      </div>
      <div class="scenario-feedback"></div>
    </div>
    
    <div class="scenario">
      <h5>Scenario 3: Text Analysis Data</h5>
      <p>You have 1000 poems with complex metadata including multiple authors, publication info, themes, and full text for Python analysis.</p>
      <div class="format-options">
        <label><input type="radio" name="scenario3" value="csv"> CSV File</label>
        <label><input type="radio" name="scenario3" value="json"> JSON File</label>
        <label><input type="radio" name="scenario3" value="xml"> XML File</label>
      </div>
      <div class="scenario-feedback"></div>
    </div>
  </div>
</div>

## Format Conversion Tools

### Command Line Conversion

<div class="terminal-simulator" data-terminal="format-conversion">
  <h4>🖥️ Practice Format Conversion</h4>
  <p>Try these conversion commands:</p>
  
  <div class="command-examples">
    <div class="command-demo">
      <code>pandoc notes.md -o notes.pdf</code>
      <span class="command-desc">← Convert Markdown to PDF</span>
    </div>
    <div class="command-demo">
      <code>csvkit in.xlsx --sheet "Sheet1" > out.csv</code>
      <span class="command-desc">← Excel to CSV</span>
    </div>
    <div class="command-demo">
      <code>jq '.' data.json</code>
      <span class="command-desc">← Pretty-print JSON</span>
    </div>
  </div>
</div>

### Python Conversion

<div class="code-example">
  <h4>🐍 Convert Formats with Python:</h4>
  ```python
  import pandas as pd
  import json
  
  # Excel to CSV
  df = pd.read_excel('research_data.xlsx')
  df.to_csv('research_data.csv', index=False)
  
  # CSV to JSON
  df = pd.read_csv('research_data.csv')
  df.to_json('research_data.json', orient='records', indent=2)
  
  # JSON to CSV  
  with open('research_data.json', 'r') as f:
      data = json.load(f)
  df = pd.DataFrame(data)
  df.to_csv('converted_data.csv', index=False)
  ```
</div>

## Real-World DH Workflow

<div class="workflow-example">
  <h4>📚 Case Study: Digital Edition Project</h4>
  
  <div class="workflow-steps">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">
        <h5>Original Documents</h5>
        <p><strong>Format:</strong> Scanned PDFs</p>
        <p><strong>Challenge:</strong> Not machine-readable</p>
      </div>
    </div>
    
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">
        <h5>OCR Processing</h5>
        <p><strong>Output:</strong> Plain text (.txt)</p>
        <p><strong>Issue:</strong> OCR errors, inconsistent formatting</p>
      </div>
    </div>
    
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">
        <h5>Manual Correction</h5>
        <p><strong>Format:</strong> Markdown (.md)</p>
        <p><strong>Benefit:</strong> Structure + human readability</p>
      </div>
    </div>
    
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">
        <h5>Analysis Preparation</h5>
        <p><strong>Format:</strong> UTF-8 Plain Text</p>
        <p><strong>Ready for:</strong> Python analysis, NLP tools</p>
      </div>
    </div>
    
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content">
        <h5>Publication</h5>
        <p><strong>Formats:</strong> HTML (web), PDF (print)</p>
        <p><strong>Generated from:</strong> Markdown source</p>
      </div>
    </div>
  </div>
</div>

## Troubleshooting Common Issues

### Problem 1: "File won't open in Python"

<div class="troubleshooting-card">
  <h5>🚨 Error Messages:</h5>
  <ul>
    <li><code>UnicodeDecodeError</code></li>
    <li><code>PermissionError</code></li>
    <li><code>pandas.errors.EmptyDataError</code></li>
  </ul>
  
  <h5>✅ Solutions:</h5>
  ```python
  # Try different encodings
  encodings = ['utf-8', 'latin-1', 'cp1252']
  for encoding in encodings:
      try:
          with open('problematic_file.txt', 'r', encoding=encoding) as f:
              text = f.read()
          print(f"Success with {encoding}")
          break
      except UnicodeDecodeError:
          print(f"Failed with {encoding}")
  ```
</div>

### Problem 2: "Garbled characters"

<div class="troubleshooting-card">
  <h5>🔧 Character Fixing:</h5>
  ```python
  # Fix common encoding issues
  import ftfy
  
  garbled_text = "caf√©"
  fixed_text = ftfy.fix_text(garbled_text)
  print(fixed_text)  # Output: "café"
  ```
</div>

## Best Practices Summary

<div class="best-practices">
  <h4>📋 DH File Format Guidelines</h4>
  
  <div class="practice-categories">
    <div class="practice-category">
      <h5>📝 Text & Notes</h5>
      <ul>
        <li><strong>Research notes:</strong> Markdown</li>
        <li><strong>Clean text data:</strong> UTF-8 plain text</li>
        <li><strong>Documentation:</strong> Markdown or plain text</li>
      </ul>
    </div>
    
    <div class="practice-category">
      <h5>📊 Data & Analysis</h5>
      <ul>
        <li><strong>Tabular data:</strong> CSV (UTF-8)</li>
        <li><strong>Hierarchical data:</strong> JSON</li>
        <li><strong>Large datasets:</strong> Parquet or HDF5</li>
      </ul>
    </div>
    
    <div class="practice-category">
      <h5>🔧 Technical</h5>
      <ul>
        <li><strong>Always specify encoding</strong> in Python</li>
        <li><strong>Use UTF-8</strong> for new files</li>
        <li><strong>Test with sample data</strong> first</li>
      </ul>
    </div>
  </div>
</div>

<div class="quiz" data-quiz="formats-proficiency">
  <h3>Proficiency Check: File Formats</h3>
  <p>You're starting a project to analyze 10,000 historical newspaper articles. The data includes article text, publication date, newspaper name, and topic tags. What's the BEST format for Python analysis?</p>
  
  <label class="quiz-option">
    <input type="radio" name="proficiency-quiz" value="word">
    Individual Word documents for each article
  </label>
  <label class="quiz-option">
    <input type="radio" name="proficiency-quiz" value="excel">
    Excel spreadsheet with all data
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="proficiency-quiz" value="csv-utf8">
    CSV file with UTF-8 encoding
  </label>
  <label class="quiz-option">
    <input type="radio" name="proficiency-quiz" value="json-complex">
    JSON with nested topic arrays
  </label>
  
  <div class="feedback-correct">
    <p><strong>Excellent choice!</strong> CSV is perfect for tabular data like this. It loads quickly into pandas, works across platforms, and UTF-8 handles any special characters in historical text.</p>
  </div>
  <div class="feedback-incorrect">
    <p>For this type of <strong>tabular data</strong>, CSV with UTF-8 encoding is ideal. It's Python-friendly, efficient for large datasets, and handles the text encoding issues common in historical documents.</p>
  </div>
</div>

## Next Steps

Understanding file formats prepares you for [command line work]({{ site.baseurl }}/guides/command-line/), where you'll learn to navigate files and run Python scripts efficiently from the terminal.

---

*Remember: The right file format can save hours of debugging and conversion work. When in doubt, choose simple, open formats that Python can read easily.*

<script>
// Interactive CSV builder
function updateCSVPreview() {
    const headers = Array.from(document.querySelectorAll('.csv-headers .csv-input')).map(input => input.value);
    const data = Array.from(document.querySelectorAll('.csv-data .csv-input')).map(input => input.value);
    
    const csvOutput = document.getElementById('csv-output');
    if (csvOutput) {
        csvOutput.textContent = headers.join(',') + '\n' + data.join(',');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // CSV builder functionality
    const csvInputs = document.querySelectorAll('.csv-input');
    csvInputs.forEach(input => {
        input.addEventListener('input', updateCSVPreview);
    });
    
    // Scenario decision feedback
    const scenarios = document.querySelectorAll('.scenario');
    scenarios.forEach((scenario, index) => {
        const radios = scenario.querySelectorAll('input[type="radio"]');
        const feedback = scenario.querySelector('.scenario-feedback');
        
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    let message = '';
                    let className = '';
                    
                    switch(index) {
                        case 0: // Research notes
                            if (this.value === 'markdown') {
                                message = '✅ Perfect! Markdown gives you structure, formatting, and works great with version control.';
                                className = 'feedback-correct';
                            } else {
                                message = '🤔 Markdown would be better - it provides structure and formatting while staying version-control friendly.';
                                className = 'feedback-partial';
                            }
                            break;
                        case 1: // Metadata collection
                            if (this.value === 'csv') {
                                message = '✅ Excellent! CSV is perfect for tabular data and works seamlessly with Python analysis.';
                                className = 'feedback-correct';
                            } else if (this.value === 'excel') {
                                message = '👍 Not bad, but CSV would be better for Python compatibility and version control.';
                                className = 'feedback-partial';
                            } else {
                                message = '🤔 JSON is overkill for simple tabular data. CSV would be more appropriate here.';
                                className = 'feedback-incorrect';
                            }
                            break;
                        case 2: // Complex text analysis
                            if (this.value === 'json') {
                                message = '✅ Smart choice! JSON handles nested data beautifully and Python loves it.';
                                className = 'feedback-correct';
                            } else {
                                message = '🤔 With complex nested metadata, JSON would handle the structure better than flat formats.';
                                className = 'feedback-partial';
                            }
                            break;
                    }
                    
                    feedback.innerHTML = `<div class="feedback ${className}">${message}</div>`;
                }
            });
        });
    });
});
</script>

<style>
.format-showcase {
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.pros, .cons {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.csv-builder {
    background: var(--bg-tertiary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-md) 0;
}

.csv-headers, .csv-data {
    display: flex;
    gap: var(--space-sm);
    margin: var(--space-sm) 0;
    flex-wrap: wrap;
}

.csv-input {
    padding: var(--space-xs);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-family: var(--font-mono);
    min-width: 120px;
}

.csv-preview {
    margin-top: var(--space-md);
    padding: var(--space-md);
    background: var(--bg-primary);
    border-radius: var(--border-radius);
}

.format-comparison {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.format-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.csv-tab, .json-tab {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.scenario-cards {
    display: grid;
    gap: var(--space-lg);
    margin: var(--space-md) 0;
}

.scenario {
    background: var(--bg-tertiary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-primary);
}

.format-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    margin: var(--space-md) 0;
}

.format-options label {
    cursor: pointer;
    padding: var(--space-xs);
}

.workflow-example {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.workflow-steps {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.step {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
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

.troubleshooting-card {
    background: var(--bg-tertiary);
    border-left: 4px solid var(--color-warning);
    padding: var(--space-md);
    margin: var(--space-md) 0;
    border-radius: var(--border-radius);
}

.best-practices {
    background: var(--bg-secondary);
    border: 2px solid var(--color-success);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.practice-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.practice-category {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.command-examples {
    margin: var(--space-md) 0;
}

.command-demo {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin: var(--space-sm) 0;
    font-family: var(--font-mono);
}

.command-desc {
    color: var(--text-secondary);
    font-family: var(--font-sans);
}

@media (max-width: 768px) {
    .pros-cons,
    .format-tabs,
    .practice-categories {
        grid-template-columns: 1fr;
    }
    
    .csv-headers,
    .csv-data {
        flex-direction: column;
    }
    
    .csv-input {
        width: 100%;
    }
}
</style>