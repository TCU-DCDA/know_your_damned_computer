# Text Encoding and Character Sets

Text encoding problems are one of the most frustrating issues in digital humanities work. You've probably seen mysterious characters like � or strange symbols where accented letters should be. Understanding encoding will save you hours of frustration and ensure your text analysis projects work correctly with diverse languages and historical texts.

## What is Text Encoding?

### The Basic Problem
Computers only understand numbers. To store text, every character must be converted to a number. Text encoding is the system that defines which numbers represent which characters.

### A Simple Example
In the most basic encoding (ASCII), the letter "A" is stored as the number 65, "B" as 66, and so on. But what about "é" or "ñ" or Chinese characters? Different encoding systems handle these differently, which causes problems.

### Why This Matters for DH
- **Historical texts** often contain special characters, accents, and symbols
- **Multilingual corpora** require encodings that support multiple languages
- **Web scraping** can introduce encoding problems
- **Data sharing** between researchers can corrupt text if encodings don't match
- **Python text analysis** fails if encoding issues aren't resolved

## Common Encoding Systems

### ASCII (American Standard Code for Information Interchange)
- **Covers:** Basic English letters, numbers, punctuation
- **Character count:** 128 characters
- **Problem:** No accented letters, no international characters
- **Use today:** Foundation for other encodings, but too limited for DH work

### Latin-1 (ISO 8859-1)
- **Covers:** Western European languages
- **Character count:** 256 characters
- **Includes:** Accented letters like é, ñ, ü
- **Problem:** Still limited to Western Europe

### Windows-1252 (CP-1252)
- **Microsoft's extension** of Latin-1
- **Common source of problems** when sharing files between Mac and PC
- **Includes:** Smart quotes, em dashes, other typographic characters

### UTF-8 (Unicode Transformation Format - 8 bit)
- **THE SOLUTION:** Supports virtually all world languages
- **Character count:** Over 1 million possible characters
- **Backward compatible:** ASCII text is valid UTF-8
- **Standard for:** Web, Python, modern applications
- **Your default choice** for all DH work

## Recognizing Encoding Problems

### Common Symptoms
```
Instead of:  "café naïve résumé"
You see:     "café naÃ¯ve résumé"        (UTF-8 read as Latin-1)
Or:          "cafÃ© naÃ¯ve rÃ©sumÃ©"     (UTF-8 read as Windows-1252)
Or:          "caf� na�ve r�sum�"          (Unknown characters as �)
Or:          "caf□ na□ve r□sum□"          (Unknown characters as boxes)
```

### Specific Examples by Language

**French text problems:**
- Good: `château, être, français`
- Bad: `château, ê tre, franç ais`

**Spanish text problems:**
- Good: `niño, corazón, Andalucía`
- Bad: `niï¿½o, corazï¿½n, Andalucï¿½a`

**German text problems:**
- Good: `Müller, Größe, weiß`
- Bad: `MÃ¼ller, GrÃ¶ï¿½e, weiï¿½`

## Platform-Specific Encoding Behavior

### Mac Encoding
- **Default:** UTF-8 for most applications
- **TextEdit:** Saves as UTF-8 by default
- **Terminal:** Uses UTF-8
- **Generally fewer problems** with modern text

### PC Encoding
- **Legacy default:** Windows-1252 or local code page
- **Notepad:** Historically used ANSI (Windows-1252)
- **Modern Notepad:** Now defaults to UTF-8
- **Command Prompt:** May use different encoding than applications

### Cross-Platform Issues
The most common problems occur when:
1. Text created on PC (Windows-1252) opened on Mac
2. Text created on Mac (UTF-8) opened in older PC software
3. Files shared via email or cloud storage without encoding preservation

## Working with Encoding in Python

### The Golden Rule
**Always specify encoding explicitly in Python:**

```python
# Good - specify encoding
with open('text.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Bad - let Python guess (often causes problems)
with open('text.txt', 'r') as f:
    content = f.read()
```

### Common Python Encoding Tasks

#### Reading Files with Different Encodings
```python
# Try UTF-8 first (most common)
try:
    with open('mystery.txt', 'r', encoding='utf-8') as f:
        text = f.read()
except UnicodeDecodeError:
    # Try Windows-1252 if UTF-8 fails
    with open('mystery.txt', 'r', encoding='windows-1252') as f:
        text = f.read()
```

#### Detecting Encoding (using chardet library)
```python
import chardet

# Read file as binary first
with open('mystery.txt', 'rb') as f:
    raw_data = f.read()

# Detect encoding
result = chardet.detect(raw_data)
encoding = result['encoding']
confidence = result['confidence']

print(f"Detected encoding: {encoding} (confidence: {confidence})")

# Now read with detected encoding
with open('mystery.txt', 'r', encoding=encoding) as f:
    text = f.read()
```

#### Converting Between Encodings
```python
# Read file in original encoding
with open('windows_file.txt', 'r', encoding='windows-1252') as f:
    text = f.read()

# Save as UTF-8
with open('utf8_file.txt', 'w', encoding='utf-8') as f:
    f.write(text)
```

#### Working with CSV Files
```python
import pandas as pd

# Specify encoding when reading CSV
df = pd.read_csv('data.csv', encoding='utf-8')

# Save with UTF-8 encoding
df.to_csv('output.csv', encoding='utf-8', index=False)

# If you get encoding errors, try:
df = pd.read_csv('data.csv', encoding='utf-8', errors='replace')
# or
df = pd.read_csv('data.csv', encoding='windows-1252')
```

## Fixing Encoding Problems

### Step-by-Step Diagnosis

#### Step 1: Identify the Problem
Look for these warning signs:
- Strange characters where accents should be
- � (replacement character) symbols
- Garbled text that should be readable
- Python UnicodeDecodeError messages

#### Step 2: Determine Original Encoding
Ask yourself:
- Where did this text come from? (Web, old PC, Mac, database)
- What software created it?
- When was it created? (Older files more likely to have encoding issues)

#### Step 3: Test Different Encodings
```python
encodings_to_try = ['utf-8', 'windows-1252', 'latin-1', 'utf-16']

for encoding in encodings_to_try:
    try:
        with open('problem_file.txt', 'r', encoding=encoding) as f:
            sample = f.read(200)  # Read first 200 characters
            print(f"{encoding}: {sample}")
    except UnicodeDecodeError:
        print(f"{encoding}: Failed to decode")
```

### Common Fixes

#### Fix 1: Re-save with Correct Encoding
1. Open file in text editor that shows encoding (VS Code, Sublime Text)
2. Check current encoding in status bar
3. Save As → Choose UTF-8 encoding

#### Fix 2: Convert Using Command Line Tools
**Mac/Linux:**
```bash
# Convert from Windows-1252 to UTF-8
iconv -f windows-1252 -t utf-8 input.txt > output.txt

# Convert from Latin-1 to UTF-8
iconv -f iso-8859-1 -t utf-8 input.txt > output.txt
```

**PC (PowerShell):**
```powershell
# Read as Windows-1252, save as UTF-8
Get-Content -Path "input.txt" -Encoding Default | Set-Content -Path "output.txt" -Encoding UTF8
```

#### Fix 3: Batch Convert Multiple Files
```python
import os
import chardet

def convert_to_utf8(input_dir, output_dir):
    for filename in os.listdir(input_dir):
        if filename.endswith('.txt'):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            
            # Detect encoding
            with open(input_path, 'rb') as f:
                raw_data = f.read()
            encoding = chardet.detect(raw_data)['encoding']
            
            # Convert to UTF-8
            with open(input_path, 'r', encoding=encoding) as f:
                text = f.read()
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(text)
            
            print(f"Converted {filename}: {encoding} → UTF-8")

convert_to_utf8('problematic_texts/', 'clean_texts/')
```

## Best Practices for DH Projects

### 1. Always Use UTF-8
- Set UTF-8 as default in your text editor
- Specify UTF-8 in all Python file operations
- Save all project files as UTF-8

### 2. Document Your Encoding Choices
In your project README:
```markdown
## Text Encoding
All text files in this project use UTF-8 encoding.
Original sources were converted from:
- Victorian novels: Windows-1252 → UTF-8
- Medieval manuscripts: Latin-1 → UTF-8
```

### 3. Validate Encoding Early
Before starting analysis, check your text:
```python
def validate_text_sample(filename, encoding='utf-8'):
    """Check if text looks correct in specified encoding"""
    with open(filename, 'r', encoding=encoding) as f:
        sample = f.read(500)
    
    # Look for common problems
    problems = []
    if '�' in sample:
        problems.append("Replacement characters found")
    if 'Ã' in sample and encoding == 'utf-8':
        problems.append("Possible double-encoding")
    
    print(f"Sample text: {sample[:100]}...")
    if problems:
        print(f"Potential issues: {', '.join(problems)}")
    else:
        print("Text appears clean")

validate_text_sample('corpus/novel1.txt')
```

### 4. Handle Encoding Errors Gracefully
```python
def safe_read_text(filename, encodings=['utf-8', 'windows-1252', 'latin-1']):
    """Try multiple encodings until one works"""
    for encoding in encodings:
        try:
            with open(filename, 'r', encoding=encoding) as f:
                return f.read(), encoding
        except UnicodeDecodeError:
            continue
    
    # If all fail, read with error replacement
    with open(filename, 'r', encoding='utf-8', errors='replace') as f:
        return f.read(), 'utf-8-with-errors'

text, used_encoding = safe_read_text('problematic.txt')
print(f"Successfully read with {used_encoding}")
```

## Working with Historical and Multilingual Texts

### Historical Texts Challenges
- **OCR errors:** Scanning may introduce encoding problems
- **Legacy formats:** Old digital texts may use obsolete encodings
- **Special characters:** Historical typography, archaic letters

### Multilingual Corpora
```python
# Example: Working with mixed-language corpus
import unicodedata

def analyze_text_languages(text):
    """Identify character scripts in text"""
    scripts = {}
    for char in text:
        if char.isalpha():
            script = unicodedata.name(char, '').split()[0]
            scripts[script] = scripts.get(script, 0) + 1
    return scripts

# Test with multilingual text
mixed_text = "Hello world! Bonjour le monde! ¡Hola mundo! Здравствуй мир!"
scripts = analyze_text_languages(mixed_text)
print(scripts)  # Shows different character scripts
```

### Normalization for Analysis
```python
import unicodedata

def normalize_text(text):
    """Normalize Unicode text for consistent analysis"""
    # Normalize to canonical form
    text = unicodedata.normalize('NFC', text)
    
    # Optional: Convert to ASCII equivalent where possible
    # text = unicodedata.normalize('NFD', text)
    # text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    
    return text

# Example
original = "café naïve résumé"  # May have different Unicode representations
normalized = normalize_text(original)
```

## Encoding in Different Tools

### VS Code
- **View encoding:** Status bar (bottom right)
- **Change encoding:** Click status bar → "Reopen with Encoding" or "Save with Encoding"
- **Default setting:** File → Preferences → Settings → Search "encoding"

### Excel and CSV Files
- **Problem:** Excel often doesn't handle UTF-8 well
- **Solution:** Use "CSV UTF-8" format when saving
- **Alternative:** Import data using Power Query with encoding specification

### Web Scraping
```python
import requests
from bs4 import BeautifulSoup

# Let requests handle encoding detection
response = requests.get('https://example.com')
response.encoding = response.apparent_encoding  # Use detected encoding
text = response.text

# Or specify encoding if you know it
response = requests.get('https://example.com')
response.encoding = 'utf-8'
text = response.text
```

## Practical Exercises

### Exercise 1: Encoding Detection Practice
1. Create text files with different encodings:
   - Save "café, naïve, résumé" as UTF-8
   - Save the same text as Windows-1252 (if possible)
2. Try opening each in different programs
3. Note the differences you observe

### Exercise 2: Python Encoding Handling
```python
# Create a test file with problematic text
test_text = "Smart quotes: "Hello" and em-dash: —"

# Save with different encodings
with open('test_utf8.txt', 'w', encoding='utf-8') as f:
    f.write(test_text)

with open('test_win1252.txt', 'w', encoding='windows-1252') as f:
    f.write(test_text)

# Try reading each with different encodings
# Document what you observe
```

### Exercise 3: Real-World Scenario
1. Download a text file from Project Gutenberg
2. Check its encoding using Python's chardet
3. Ensure it's properly encoded as UTF-8
4. Create a small analysis script that counts characters

### Exercise 4: Encoding Conversion Script
Write a Python script that:
1. Takes a folder of text files
2. Detects the encoding of each
3. Converts all to UTF-8
4. Reports any files that couldn't be converted

## Common DH Tools and Encoding

### Text Analysis Libraries
```python
# NLTK - specify encoding when loading custom corpora
import nltk
from nltk.corpus import PlaintextCorpusReader

corpus = PlaintextCorpusReader('my_texts/', '.*\.txt', encoding='utf-8')

# spaCy - generally handles UTF-8 well
import spacy
nlp = spacy.load('en_core_web_sm')

# Ensure your text is UTF-8 before processing
with open('text.txt', 'r', encoding='utf-8') as f:
    text = f.read()
doc = nlp(text)
```

### Mapping and Visualization
```python
# Geographic data often includes international place names
import geopandas as gpd

# Ensure encoding when reading shapefiles
gdf = gpd.read_file('world_cities.shp', encoding='utf-8')

# Check for encoding issues in place names
print(gdf['city_name'].head())
```

## Troubleshooting Quick Reference

### Problem: File won't open in Python
```python
# Try this diagnostic approach
import chardet

with open('problem_file.txt', 'rb') as f:
    raw_data = f.read(10000)  # Sample first 10KB
    
result = chardet.detect(raw_data)
print(f"Detected: {result}")

# Use detected encoding
with open('problem_file.txt', 'r', encoding=result['encoding']) as f:
    text = f.read()
```

### Problem: Garbled characters in output
```python
# Force UTF-8 output
import sys
import codecs

# On Windows, ensure UTF-8 output
if sys.platform == 'win32':
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer)

print("Now UTF-8 text should display correctly: café, naïve")
```

### Problem: CSV files with mixed encodings
```python
import pandas as pd

# Try UTF-8 first, fall back to other encodings
try:
    df = pd.read_csv('data.csv', encoding='utf-8')
except UnicodeDecodeError:
    try:
        df = pd.read_csv('data.csv', encoding='windows-1252')
    except UnicodeDecodeError:
        df = pd.read_csv('data.csv', encoding='latin-1')

# Always save as UTF-8
df.to_csv('clean_data.csv', encoding='utf-8', index=False)
```

## Questions for Reflection

1. Have you encountered garbled text in your work? What did it look like?
2. What types of texts do you expect to work with? (Historical, multilingual, etc.)
3. How might encoding problems affect your text analysis results?
4. What tools do you use most often for working with text files?

## Final Tips for Success

### Prevention is Better Than Cure
- Set UTF-8 as default in all your tools
- Always specify encoding in Python scripts
- Test with sample data before processing large corpora
- Document encoding choices in project documentation

### When in Doubt
- UTF-8 is almost always the right choice for new files
- chardet library can help identify unknown encodings
- Visual inspection often reveals encoding problems quickly
- Ask colleagues about known encoding issues with shared datasets

### Building Good Habits
- Include encoding checks in your data validation routines
- Create templates with proper encoding specifications
- Share encoding information when passing files to others
- Keep a reference of common encoding problems and solutions

---

*Remember: Encoding problems are frustrating but solvable. Understanding the basics will save you hours of debugging and ensure your text analysis projects work reliably with diverse sources.*