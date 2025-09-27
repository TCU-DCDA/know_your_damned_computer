---
layout: guide
title: "Text Encoding & Character Sets"
slug: text-encoding
description: "Avoid garbled text in your analysis projects. Handle multilingual and historical texts correctly in Python."
difficulty: intermediate
time_estimate: "35 min"
learning_objectives:
  - "Understand how text encoding works and why it matters for DH"
  - "Identify and fix common encoding problems in text data"
  - "Use UTF-8 effectively for multilingual and historical texts"
  - "Handle encoding issues in Python scripts and data analysis"
prev_guide:
  title: "Command Line Basics"
  url: "/guides/command-line/"
interactive: true
---

Text encoding problems are one of the most frustrating issues in digital humanities work. You've probably seen mysterious characters like � or strange symbols where accented letters should be. Understanding encoding will save you hours of frustration and ensure your text analysis projects work correctly with diverse languages and historical texts.

## What Is Text Encoding?

<div class="encoding-analogy">
  <h4>🔤 The Translation Problem</h4>
  <p>Think of text encoding like a secret code between you and your computer:</p>
  
  <div class="analogy-grid">
    <div class="analogy-step">
      <div class="step-icon">📝</div>
      <h5>You Type</h5>
      <p><code>"café"</code></p>
    </div>
    <div class="analogy-step">
      <div class="step-icon">🔢</div>
      <h5>Computer Stores</h5>
      <p><code>[99, 97, 102, 195, 169]</code></p>
    </div>
    <div class="analogy-step">
      <div class="step-icon">📖</div>
      <h5>You Read</h5>
      <p><code>"café"</code> or <code>"caf�"</code>?</p>
    </div>
  </div>
  
  <p>The <strong>encoding</strong> determines how those numbers get converted back to characters. Use the wrong encoding, and you get garbled text!</p>
</div>

<div class="quiz" data-quiz="encoding-basics">
  <h3>Encoding Detective</h3>
  <p>You download a CSV file of French poetry and see "caf√©" instead of "café". What's most likely happening?</p>
  
  <label class="quiz-option">
    <input type="radio" name="encoding-quiz" value="corrupt">
    The file is corrupted
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="encoding-quiz" value="wrong-encoding">
    The file is UTF-8 but being read as Latin-1 or Windows-1252
  </label>
  <label class="quiz-option">
    <input type="radio" name="encoding-quiz" value="wrong-font">
    The wrong font is being used
  </label>
  
  <div class="feedback-correct">
    <p><strong>Exactly!</strong> This is a classic UTF-8/Latin-1 mismatch. The UTF-8 bytes for "é" (0xC3 0xA9) are being interpreted as two separate Latin-1 characters ("√" and "©").</p>
  </div>
  <div class="feedback-incorrect">
    <p>This is an <strong>encoding mismatch</strong> - the same bytes are being interpreted using different character sets. Very common when files move between systems.</p>
  </div>
</div>

## The Encoding Landscape

### ASCII - The Foundation (1963)

<div class="encoding-card ascii">
  <div class="encoding-header">
    <h4>🔤 ASCII</h4>
    <span class="encoding-count">128 characters</span>
  </div>
  <div class="encoding-content">
    <p><strong>Covers:</strong> English letters, numbers, basic punctuation</p>
    <p><strong>Problem:</strong> No accented letters, no international characters</p>
    <div class="encoding-example">
      <code>A B C ... a b c ... 1 2 3 ... ! @ #</code>
    </div>
  </div>
</div>

### UTF-8 - The Modern Solution

<div class="encoding-card utf8">
  <div class="encoding-header">
    <h4>🌍 UTF-8</h4>
    <span class="encoding-count">1+ million characters</span>
  </div>
  <div class="encoding-content">
    <p><strong>Covers:</strong> Every writing system in the world</p>
    <p><strong>Magic:</strong> Backward compatible with ASCII</p>
    <div class="encoding-example">
      <code>café 中文 العربية ελληνικά русский</code>
    </div>
    <div class="encoding-benefits">
      ✅ Web standard ✅ Python default ✅ Cross-platform ✅ Future-proof
    </div>
  </div>
</div>

## Visual Encoding Problem Examples

<div class="interactive-exercise" data-exercise="encoding-problems">
  <h4>🔍 Spot the Encoding Issues</h4>
  <p>Can you identify what's wrong with these text samples?</p>
  
  <div class="problem-examples">
    <div class="text-example">
      <h5>Example 1: French Literature</h5>
      <div class="problematic-text">
        <strong>What you see:</strong><br>
        <code class="bad-text">â€œCâ€™est un cafÃ© trÃ¨s cÃ©lÃ¨bre,â€ dit-elle.</code>
      </div>
      <div class="correct-text">
        <strong>Should be:</strong><br>
        <code class="good-text">"C'est un café très célèbre," dit-elle.</code>
      </div>
      <div class="diagnosis">
        <strong>Problem:</strong> UTF-8 text read as Windows-1252
      </div>
    </div>
    
    <div class="text-example">
      <h5>Example 2: Spanish Historical Text</h5>
      <div class="problematic-text">
        <strong>What you see:</strong><br>
        <code class="bad-text">El niï¿½o espaï¿½ol vivi� en Andaluc�a</code>
      </div>
      <div class="correct-text">
        <strong>Should be:</strong><br>
        <code class="good-text">El niño español vivió en Andalucía</code>
      </div>
      <div class="diagnosis">
        <strong>Problem:</strong> Encoding unknown, showing replacement characters
      </div>
    </div>
    
    <div class="text-example">
      <h5>Example 3: German Academic Text</h5>
      <div class="problematic-text">
        <strong>What you see:</strong><br>
        <code class="bad-text">MÃ¼ller schrieb Ã¼ber die GrÃ¶ÃŸe</code>
      </div>
      <div class="correct-text">
        <strong>Should be:</strong><br>
        <code class="good-text">Müller schrieb über die Größe</code>
      </div>
      <div class="diagnosis">
        <strong>Problem:</strong> UTF-8 text read as Latin-1
      </div>
    </div>
  </div>
</div>

## Python Encoding Solutions

### The Right Way to Open Files

<div class="code-showcase">
  <h4>🐍 Python Encoding Best Practices</h4>
  
  <div class="code-comparison">
    <div class="code-bad">
      <h5>❌ Common Mistakes</h5>
      <pre><code># DON'T: Let Python guess
with open('french_texts.txt') as file:
    text = file.read()  # Might fail!

# DON'T: Use system default
with open('data.csv', 'r') as file:
    content = file.read()  # Inconsistent across platforms</code></pre>
    </div>
    
    <div class="code-good">
      <h5>✅ Always Specify Encoding</h5>
      <pre><code># DO: Always specify UTF-8
with open('french_texts.txt', 'r', encoding='utf-8') as file:
    text = file.read()

# DO: Handle errors gracefully
with open('mystery_file.txt', 'r', encoding='utf-8', errors='replace') as file:
    text = file.read()  # Replaces bad chars with �</code></pre>
    </div>
  </div>
</div>

### Encoding Detection and Conversion

<div class="diagnostic-tools">
  <h4>🔧 Encoding Diagnostic Tools</h4>
  
  <div class="tool-showcase">
    <div class="tool-card">
      <h5>1. Detect Unknown Encoding</h5>
      <pre><code>import chardet

# Read file as binary first
with open('mystery_file.txt', 'rb') as file:
    raw_data = file.read()

# Detect encoding
result = chardet.detect(raw_data)
print(f"Encoding: {result['encoding']}")
print(f"Confidence: {result['confidence']}")

# Use detected encoding
with open('mystery_file.txt', 'r', encoding=result['encoding']) as file:
    text = file.read()</code></pre>
    </div>
    
    <div class="tool-card">
      <h5>2. Fix Garbled Text</h5>
      <pre><code>import ftfy

# Fix common encoding errors
garbled = "caf√© na√Øve r√©sum√©"
fixed = ftfy.fix_text(garbled)
print(fixed)  # Output: "café naïve résumé"

# Fix and specify source encoding
double_encoded = "Ã¢â‚¬Å"smart quotesÃ¢â‚¬Â"
fixed = ftfy.fix_text(double_encoded)
print(fixed)  # Output: ""smart quotes""</code></pre>
    </div>
    
    <div class="tool-card">
      <h5>3. Convert Between Encodings</h5>
      <pre><code># Read in one encoding, save in another
with open('old_file.txt', 'r', encoding='latin-1') as infile:
    text = infile.read()

with open('new_file.txt', 'w', encoding='utf-8') as outfile:
    outfile.write(text)

# Batch conversion
import os
for filename in os.listdir('old_texts/'):
    if filename.endswith('.txt'):
        # Convert each file to UTF-8
        with open(f'old_texts/{filename}', 'r', encoding='latin-1') as infile:
            content = infile.read()
        with open(f'utf8_texts/{filename}', 'w', encoding='utf-8') as outfile:
            outfile.write(content)</code></pre>
    </div>
  </div>
</div>

## Interactive Encoding Lab

<div class="interactive-exercise" data-exercise="encoding-lab">
  <h4>🧪 Encoding Problem Solver</h4>
  <p>Practice diagnosing and fixing encoding issues:</p>
  
  <div class="lab-scenarios">
    <div class="scenario-lab">
      <h5>Lab 1: Web Scraping Gone Wrong</h5>
      <div class="scenario-setup">
        <p><strong>Situation:</strong> You scraped French newspaper articles, but the text looks wrong:</p>
        <div class="corrupted-sample">
          <code>L'Ã©tudiant franÃ§ais Ã©tudie Ã  l'universitÃ©</code>
        </div>
        <p><strong>Should be:</strong> <em>L'étudiant français étudie à l'université</em></p>
      </div>
      
      <div class="lab-diagnosis">
        <h6>Your Diagnosis:</h6>
        <div class="diagnosis-options">
          <label>
            <input type="radio" name="lab1" value="wrong1"> File is corrupted
          </label>
          <label>
            <input type="radio" name="lab1" value="correct"> UTF-8 content read as Latin-1
          </label>
          <label>
            <input type="radio" name="lab1" value="wrong2"> Wrong font being used
          </label>
        </div>
        
        <div class="lab-solution" style="display: none;">
          <h6>✅ Solution:</h6>
          <pre><code># The webpage was UTF-8, but scraped as Latin-1
import requests
response = requests.get(url)
response.encoding = 'utf-8'  # Force UTF-8
text = response.text</code></pre>
        </div>
      </div>
    </div>
    
    <div class="scenario-lab">
      <h5>Lab 2: Historical Archive Data</h5>
      <div class="scenario-setup">
        <p><strong>Situation:</strong> CSV file from 1990s archive has strange characters:</p>
        <div class="corrupted-sample">
          <code>Müller,Größe → MÃ¼ller,GrÃ¶ï¿½e</code>
        </div>
      </div>
      
      <div class="lab-diagnosis">
        <h6>Python Fix Strategy:</h6>
        <div class="diagnosis-options">
          <label>
            <input type="radio" name="lab2" value="wrong1"> Use encoding='ascii'
          </label>
          <label>
            <input type="radio" name="lab2" value="correct"> Try encoding='latin-1' or detect encoding
          </label>
          <label>
            <input type="radio" name="lab2" value="wrong2"> Use errors='ignore'
          </label>
        </div>
        
        <div class="lab-solution" style="display: none;">
          <h6>✅ Solution:</h6>
          <pre><code>import chardet
import pandas as pd

# Detect encoding first
with open('archive.csv', 'rb') as f:
    encoding = chardet.detect(f.read())['encoding']

# Read with detected encoding
df = pd.read_csv('archive.csv', encoding=encoding)

# Save as UTF-8 for future use
df.to_csv('clean_archive.csv', encoding='utf-8', index=False)</code></pre>
        </div>
      </div>
    </div>
  </div>
</div>

## Platform-Specific Encoding Behavior

<div class="platform-encoding">
  <div class="platform-grid">
    <div class="platform-card mac">
      <h4>🍎 Mac Encoding</h4>
      <ul class="platform-features">
        <li>✅ UTF-8 by default in most apps</li>
        <li>✅ TextEdit saves UTF-8</li>
        <li>✅ Terminal uses UTF-8</li>
        <li>⚠️ Some legacy files may be MacRoman</li>
      </ul>
      <div class="platform-tip">
        <strong>Mac Tip:</strong> Use <code>file -I filename</code> to check encoding
      </div>
    </div>
    
    <div class="platform-card pc">
      <h4>🪟 PC Encoding</h4>
      <ul class="platform-features">
        <li>⚠️ Legacy default: Windows-1252</li>
        <li>⚠️ Notepad historically problematic</li>
        <li>✅ Modern apps increasingly UTF-8</li>
        <li>⚠️ Command Prompt may need config</li>
      </ul>
      <div class="platform-tip">
        <strong>PC Tip:</strong> Set <code>chcp 65001</code> for UTF-8 in Command Prompt
      </div>
    </div>
  </div>
</div>

## Real-World DH Workflow

<div class="workflow-case-study">
  <h4>📚 Case Study: Multilingual Corpus Processing</h4>
  
  <div class="workflow-timeline">
    <div class="timeline-step">
      <div class="step-marker">1</div>
      <div class="step-content">
        <h5>Data Collection</h5>
        <p><strong>Sources:</strong> Web scraping, digitized archives, crowd-sourced transcriptions</p>
        <p><strong>Encoding Issues:</strong> Mixed encodings, platform differences</p>
        <div class="step-code">
          <pre><code># Always detect before processing
files_info = []
for file in corpus_files:
    with open(file, 'rb') as f:
        encoding = chardet.detect(f.read(100000))
    files_info.append((file, encoding))</code></pre>
        </div>
      </div>
    </div>
    
    <div class="timeline-step">
      <div class="step-marker">2</div>
      <div class="step-content">
        <h5>Standardization</h5>
        <p><strong>Goal:</strong> Convert everything to UTF-8</p>
        <p><strong>Challenge:</strong> Preserve original text integrity</p>
        <div class="step-code">
          <pre><code># Careful conversion with validation
def convert_to_utf8(input_file, detected_encoding):
    try:
        with open(input_file, 'r', encoding=detected_encoding) as f:
            text = f.read()
        
        # Validate by checking for common characters
        if validate_text(text):
            with open(f'utf8/{input_file}', 'w', encoding='utf-8') as f:
                f.write(text)
        else:
            log_problem(input_file, detected_encoding)
    except UnicodeDecodeError:
        try_alternative_encodings(input_file)</code></pre>
        </div>
      </div>
    </div>
    
    <div class="timeline-step">
      <div class="step-marker">3</div>
      <div class="step-content">
        <h5>Quality Control</h5>
        <p><strong>Validation:</strong> Check character frequencies, spot-check random samples</p>
        <div class="step-code">
          <pre><code># Automated quality checks
def validate_corpus_encoding(corpus_dir):
    suspicious_files = []
    for file in os.listdir(corpus_dir):
        text = read_utf8_file(file)
        
        # Check for encoding artifacts
        if '�' in text or 'Ã' in text:
            suspicious_files.append(file)
        
        # Check character distribution
        if analyze_char_frequencies(text):
            suspicious_files.append(file)
    
    return suspicious_files</code></pre>
        </div>
      </div>
    </div>
  </div>
</div>

## Common Encoding Error Patterns

<div class="error-patterns">
  <h4>🚨 Encoding Error Reference</h4>
  
  <div class="error-grid">
    <div class="error-pattern">
      <h5>UTF-8 → Latin-1</h5>
      <div class="error-example">
        <div class="error-input">café → caf√©</div>
        <div class="error-input">naïve → na√Øve</div>
        <div class="error-input">résumé → r√©sum√©</div>
      </div>
      <div class="error-fix">
        <strong>Fix:</strong> Open with encoding='utf-8'
      </div>
    </div>
    
    <div class="error-pattern">
      <h5>UTF-8 → Windows-1252</h5>
      <div class="error-example">
        <div class="error-input">"smart quotes" → â€œquotesâ€</div>
        <div class="error-input">café → cafÃ©</div>
        <div class="error-input">— (em dash) → â€"</div>
      </div>
      <div class="error-fix">
        <strong>Fix:</strong> Use ftfy library or specify encoding
      </div>
    </div>
    
    <div class="error-pattern">
      <h5>Unknown Characters</h5>
      <div class="error-example">
        <div class="error-input">café → caf� or caf□</div>
        <div class="error-input">Any special char → �</div>
      </div>
      <div class="error-fix">
        <strong>Fix:</strong> Use chardet to detect, then re-read
      </div>
    </div>
    
    <div class="error-pattern">
      <h5>Double Encoding</h5>
      <div class="error-example">
        <div class="error-input">café → cafÃƒÂ©</div>
        <div class="error-input">Multiple layers of corruption</div>
      </div>
      <div class="error-fix">
        <strong>Fix:</strong> ftfy.fix_text() handles this well
      </div>
    </div>
  </div>
</div>

## Hands-On Exercise: Encoding Rescue Mission

<div class="rescue-exercise">
  <h4>🚑 Exercise: Fix the Corrupted Corpus</h4>
  <p>You've inherited a digital humanities corpus with encoding problems. Let's fix it step by step:</p>
  
  <div class="exercise-steps">
    <div class="rescue-step">
      <input type="checkbox" id="rescue1">
      <label for="rescue1">
        <strong>Step 1:</strong> Install diagnostic tools
        <code>pip install chardet ftfy</code>
      </label>
    </div>
    
    <div class="rescue-step">
      <input type="checkbox" id="rescue2">
      <label for="rescue2">
        <strong>Step 2:</strong> Create encoding detector script
      </label>
      <div class="step-details">
        <pre><code>import chardet
import os

def analyze_corpus(directory):
    encodings = {}
    for filename in os.listdir(directory):
        if filename.endswith('.txt'):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'rb') as f:
                result = chardet.detect(f.read())
            encodings[filename] = result
    return encodings</code></pre>
      </div>
    </div>
    
    <div class="rescue-step">
      <input type="checkbox" id="rescue3">
      <label for="rescue3">
        <strong>Step 3:</strong> Create text repair function
      </label>
      <div class="step-details">
        <pre><code>import ftfy

def repair_text_file(input_path, output_path):
    # Try multiple strategies
    strategies = [
        lambda: open(input_path, 'r', encoding='utf-8').read(),
        lambda: open(input_path, 'r', encoding='latin-1').read(),
        lambda: open(input_path, 'r', encoding='cp1252').read(),
    ]
    
    for i, strategy in enumerate(strategies):
        try:
            text = strategy()
            # Apply ftfy to fix common issues
            fixed_text = ftfy.fix_text(text)
            
            # Save repaired version
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(fixed_text)
            
            print(f"Repaired {input_path} using strategy {i+1}")
            return True
        except UnicodeDecodeError:
            continue
    
    print(f"Could not repair {input_path}")
    return False</code></pre>
      </div>
    </div>
    
    <div class="rescue-step">
      <input type="checkbox" id="rescue4">
      <label for="rescue4">
        <strong>Step 4:</strong> Validate repairs
      </label>
      <div class="step-details">
        <pre><code>def validate_repair(original_path, repaired_path):
    with open(repaired_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Check for common encoding artifacts
    problems = []
    if '�' in text:
        problems.append("Replacement characters found")
    if 'Ã' in text and len([c for c in text if ord(c) > 127]) > len(text) * 0.1:
        problems.append("Possible UTF-8/Latin-1 mix")
    
    return problems</code></pre>
      </div>
    </div>
  </div>
</div>

## Best Practices Summary

<div class="best-practices-encoding">
  <h4>📋 Encoding Best Practices for DH</h4>
  
  <div class="practices-grid">
    <div class="practice-category">
      <h5>🛡️ Prevention</h5>
      <ul>
        <li><strong>Always use UTF-8</strong> for new files</li>
        <li><strong>Specify encoding</strong> in Python file operations</li>
        <li><strong>Test with special characters</strong> early in your workflow</li>
        <li><strong>Document encoding decisions</strong> for collaborators</li>
      </ul>
    </div>
    
    <div class="practice-category">
      <h5>🔍 Detection</h5>
      <ul>
        <li><strong>Use chardet</strong> for unknown files</li>
        <li><strong>Spot-check</strong> files visually for encoding artifacts</li>
        <li><strong>Validate character frequencies</strong> for your languages</li>
        <li><strong>Keep samples</strong> of known-good text for comparison</li>
      </ul>
    </div>
    
    <div class="practice-category">
      <h5>🚑 Recovery</h5>
      <ul>
        <li><strong>Try ftfy first</strong> for common problems</li>
        <li><strong>Attempt multiple encodings</strong> systematically</li>
        <li><strong>Preserve originals</strong> while experimenting</li>
        <li><strong>Document successful fixes</strong> for similar files</li>
      </ul>
    </div>
    
    <div class="practice-category">
      <h5>🤝 Collaboration</h5>
      <ul>
        <li><strong>Standardize on UTF-8</strong> for shared projects</li>
        <li><strong>Include encoding info</strong> in data documentation</li>
        <li><strong>Test cross-platform</strong> compatibility</li>
        <li><strong>Provide clean UTF-8 versions</strong> alongside originals</li>
      </ul>
    </div>
  </div>
</div>

<div class="quiz" data-quiz="encoding-proficiency">
  <h3>Final Challenge: Encoding Mastery</h3>
  <p>You're working with a multilingual corpus (French, German, Spanish) from various digitization projects. Some files show garbled characters, others look fine. What's your BEST first step?</p>
  
  <label class="quiz-option">
    <input type="radio" name="final-quiz" value="convert-all">
    Convert everything to UTF-8 immediately
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="final-quiz" value="detect-first">
    Run encoding detection on all files, document findings, then plan conversion strategy
  </label>
  <label class="quiz-option">
    <input type="radio" name="final-quiz" value="ignore-problems">
    Use errors='ignore' and proceed with analysis
  </label>
  <label class="quiz-option">
    <input type="radio" name="final-quiz" value="manual-fix">
    Manually fix each problem file as you encounter it
  </label>
  
  <div class="feedback-correct">
    <p><strong>Excellent approach!</strong> Understanding the scope of encoding issues across your entire corpus lets you:</p>
    <ul>
      <li>Identify patterns in encoding problems</li>
      <li>Prioritize which files need immediate attention</li>
      <li>Develop systematic repair strategies</li>
      <li>Avoid making assumptions that could corrupt good files</li>
    </ul>
  </div>
  
  <div class="feedback-incorrect">
    <p>The <strong>systematic approach</strong> is better: detect first, understand the scope of problems, then apply appropriate fixes. This prevents accidentally corrupting files that are already correct.</p>
  </div>
</div>

## Tools and Resources

<div class="tools-resources">
  <h4>🛠️ Essential Encoding Tools</h4>
  
  <div class="tools-grid">
    <div class="tool-resource">
      <h5>Python Libraries</h5>
      <ul>
        <li><strong>chardet:</strong> Automatic encoding detection</li>
        <li><strong>ftfy:</strong> Fix common encoding errors</li>
        <li><strong>unicodedata:</strong> Unicode character information</li>
        <li><strong>codecs:</strong> Low-level encoding operations</li>
      </ul>
    </div>
    
    <div class="tool-resource">
      <h5>Command Line Tools</h5>
      <ul>
        <li><strong>file -I:</strong> Check file encoding (Mac/Linux)</li>
        <li><strong>iconv:</strong> Convert between encodings</li>
        <li><strong>hexdump:</strong> Examine raw bytes</li>
        <li><strong>uchardet:</strong> Command-line encoding detection</li>
      </ul>
    </div>
    
    <div class="tool-resource">
      <h5>Online Resources</h5>
      <ul>
        <li><strong>Unicode.org:</strong> Official Unicode standard</li>
        <li><strong>Encoding converter tools:</strong> For quick testing</li>
        <li><strong>Character code references:</strong> Debug specific characters</li>
        <li><strong>Font testing sites:</strong> Verify character display</li>
      </ul>
    </div>
  </div>
</div>

---

*Congratulations! You've completed all the essential computer skills guides. You now have the foundation to work confidently with files, paths, formats, command line, and text encoding for any digital humanities project.*

<script>
// Interactive lab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Lab scenario handling
    const labRadios = document.querySelectorAll('input[name^="lab"]');
    labRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const scenario = this.closest('.scenario-lab');
            const solution = scenario.querySelector('.lab-solution');
            
            if (this.value === 'correct') {
                solution.style.display = 'block';
                solution.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                solution.style.display = 'none';
            }
        });
    });
    
    // Exercise checklist functionality
    const checkboxes = document.querySelectorAll('.rescue-step input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const step = this.closest('.rescue-step');
            const details = step.querySelector('.step-details');
            
            if (this.checked && details) {
                details.style.display = 'block';
            }
        });
    });
});
</script>

<style>
.encoding-analogy {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: var(--space-lg);
    border-radius: var(--border-radius-lg);
    margin: var(--space-lg) 0;
}

.analogy-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.analogy-step {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.step-icon {
    font-size: 2rem;
    margin-bottom: var(--space-sm);
}

.encoding-card {
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    margin: var(--space-md) 0;
    border-left: 4px solid var(--color-primary);
}

.encoding-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
}

.encoding-count {
    background: var(--color-primary);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.75rem;
}

.encoding-example {
    background: var(--bg-primary);
    padding: var(--space-sm);
    border-radius: var(--border-radius);
    margin: var(--space-sm) 0;
    font-family: var(--font-mono);
}

.encoding-benefits {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-top: var(--space-sm);
    font-size: 0.875rem;
}

.problem-examples {
    display: grid;
    gap: var(--space-lg);
    margin: var(--space-md) 0;
}

.text-example {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-warning);
}

.bad-text {
    color: var(--color-danger);
    background: rgba(220, 38, 38, 0.1);
    padding: 0.25rem;
    border-radius: var(--border-radius);
}

.good-text {
    color: var(--color-success);
    background: rgba(5, 150, 105, 0.1);
    padding: 0.25rem;
    border-radius: var(--border-radius);
}

.diagnosis {
    margin-top: var(--space-sm);
    font-style: italic;
    color: var(--color-info);
}

.code-showcase {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.code-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.code-bad {
    background: rgba(220, 38, 38, 0.1);
    border-left: 4px solid var(--color-danger);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.code-good {
    background: rgba(5, 150, 105, 0.1);
    border-left: 4px solid var(--color-success);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.diagnostic-tools {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.tool-showcase {
    display: grid;
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.tool-card {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.lab-scenarios {
    display: grid;
    gap: var(--space-lg);
    margin: var(--space-md) 0;
}

.scenario-lab {
    background: var(--bg-tertiary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-primary);
}

.scenario-setup {
    margin-bottom: var(--space-md);
}

.corrupted-sample {
    background: var(--bg-primary);
    padding: var(--space-sm);
    border-radius: var(--border-radius);
    font-family: var(--font-mono);
    color: var(--color-danger);
    margin: var(--space-sm) 0;
}

.diagnosis-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    margin: var(--space-sm) 0;
}

.diagnosis-options label {
    cursor: pointer;
    padding: var(--space-xs);
}

.lab-solution {
    background: var(--bg-secondary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    margin-top: var(--space-md);
    border-left: 4px solid var(--color-success);
}

.platform-encoding {
    margin: var(--space-lg) 0;
}

.platform-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
}

.platform-card {
    background: var(--bg-secondary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

.platform-card.mac {
    border-left: 4px solid #007AFF;
}

.platform-card.pc {
    border-left: 4px solid #0078D4;
}

.platform-features {
    margin: var(--space-sm) 0;
}

.platform-tip {
    background: var(--bg-tertiary);
    padding: var(--space-sm);
    border-radius: var(--border-radius);
    margin-top: var(--space-md);
    font-style: italic;
}

.workflow-case-study {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.workflow-timeline {
    margin-top: var(--space-md);
}

.timeline-step {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    margin: var(--space-md) 0;
}

.step-marker {
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

.step-code {
    background: var(--bg-primary);
    padding: var(--space-sm);
    border-radius: var(--border-radius);
    margin-top: var(--space-sm);
}

.error-patterns {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.error-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.error-pattern {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-warning);
}

.error-example {
    margin: var(--space-sm) 0;
}

.error-input {
    font-family: var(--font-mono);
    background: var(--bg-primary);
    padding: 0.25rem;
    margin: 0.25rem 0;
    border-radius: var(--border-radius);
    font-size: 0.875rem;
}

.error-fix {
    color: var(--color-success);
    font-weight: 500;
    margin-top: var(--space-sm);
}

.rescue-exercise {
    background: var(--bg-secondary);
    border: 2px solid var(--color-primary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.exercise-steps {
    margin: var(--space-md) 0;
}

.rescue-step {
    margin: var(--space-md) 0;
    padding: var(--space-sm);
}

.rescue-step label {
    display: block;
    cursor: pointer;
    margin-bottom: var(--space-sm);
}

.step-details {
    display: none;
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    margin-top: var(--space-sm);
}

.best-practices-encoding {
    background: var(--bg-secondary);
    border: 2px solid var(--color-success);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.practices-grid {
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

.tools-resources {
    background: var(--bg-secondary);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    margin: var(--space-lg) 0;
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.tool-resource {
    background: var(--bg-tertiary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
}

@media (max-width: 768px) {
    .analogy-grid,
    .code-comparison,
    .platform-grid,
    .error-grid,
    .practices-grid,
    .tools-grid {
        grid-template-columns: 1fr;
    }
    
    .timeline-step {
        flex-direction: column;
    }
    
    .step-marker {
        align-self: flex-start;
    }
}
</style>