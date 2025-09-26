# Essential File Formats for Digital Humanities

Understanding file formats is crucial for DH work, especially when you'll be using Python for text analysis, data visualization, and mapping. This guide focuses on the formats you'll encounter most often and how to work with them effectively.

## Why File Formats Matter

### The Big Picture
Different file formats are designed for different purposes:
- **Text files** preserve your writing and research notes
- **Data files** store structured information for analysis
- **Image files** handle visual materials efficiently
- **Code files** contain your Python scripts and projects

### Common Problems from Wrong Formats
- Data that won't open in Python
- Text with garbled characters
- Images too large for web display
- Files that colleagues can't open

## Text Formats for DH Research

### Plain Text (.txt)
**Best for:** Research notes, simple data, Python scripts
**Pros:** Universal compatibility, small file size, version control friendly
**Cons:** No formatting, no images

**When to use:**
- Taking research notes
- Storing cleaned text data for analysis
- Writing simple Python scripts
- Creating README files

**Mac:** TextEdit (Format → Make Plain Text)
**PC:** Notepad, Notepad++

### Markdown (.md)
**Best for:** Documentation, research notes with basic formatting
**Pros:** Human-readable, supports formatting, works with version control
**Cons:** Limited formatting options

**Example:**
```markdown
# Research Notes: Victorian Novels
## Data Sources
- **Project Gutenberg**: Public domain texts
- **HathiTrust**: Digitized books
- *Last updated: 2024-09-26*
```

**Tools:** Any text editor, VS Code (excellent support), Typora

### Rich Text Format (.rtf)
**Best for:** Formatted documents that need cross-platform compatibility
**Pros:** Preserves formatting, widely supported
**Cons:** Larger than plain text, not ideal for data analysis

### Microsoft Word (.docx)
**Best for:** Final papers, collaboration with non-technical colleagues
**Pros:** Full formatting, commenting, track changes
**Cons:** Proprietary format, not suitable for programming

**Important:** When sharing research data, convert Word docs to plain text or CSV for analysis.

## Data Formats for Analysis

### Comma-Separated Values (.csv)
**THE most important format for DH data work**

**Best for:** Spreadsheet data, survey results, metadata
**Pros:** Universal compatibility, works perfectly with Python, human-readable
**Cons:** Limited to tabular data, no data types

**Example:**
```csv
title,author,year,genre
"Pride and Prejudice","Jane Austen",1813,"Romance"
"Frankenstein","Mary Shelley",1818,"Gothic"
"Emma","Jane Austen",1815,"Romance"
```

**Python usage:**
```python
import pandas as pd
data = pd.read_csv('novels.csv')
```

**Creating CSV files:**
- **Mac:** Numbers (Export → CSV), Excel
- **PC:** Excel (Save As → CSV)
- **Both:** Google Sheets, any text editor

### JSON (.json)
**Best for:** Structured data with nested information, API data
**Pros:** Flexible structure, native Python support, web-friendly
**Cons:** Can be complex for beginners

**Example:**
```json
{
  "novel": {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "year": 1813,
    "characters": ["Elizabeth", "Darcy", "Jane"]
  }
}
```

**Python usage:**
```python
import json
with open('novel.json', 'r') as f:
    data = json.load(f)
```

### Excel (.xlsx)
**Best for:** Complex spreadsheets with multiple sheets, formulas
**Pros:** Powerful features, familiar to many users
**Cons:** Proprietary, can cause issues in Python if not handled carefully

**Python tip:** Always export to CSV for analysis, but keep Excel original for reference.

## Image Formats for DH Projects

### JPEG (.jpg, .jpeg)
**Best for:** Photographs, complex images with many colors
**Pros:** Small file size, universal support
**Cons:** Lossy compression, not ideal for text images

**Use cases:** Historical photographs, artwork reproductions

### PNG (.png)
**Best for:** Screenshots, simple graphics, images with text
**Pros:** Lossless compression, supports transparency
**Cons:** Larger file sizes than JPEG

**Use cases:** Data visualizations, maps, diagrams

### TIFF (.tiff, .tif)
**Best for:** High-quality scans, archival images
**Pros:** Lossless, high quality, archival standard
**Cons:** Very large files

**Use cases:** Manuscript digitization, high-resolution archival work

### SVG (.svg)
**Best for:** Simple graphics, logos, scalable images
**Pros:** Vector format (scales without quality loss), small file size
**Cons:** Not suitable for photographs

**Use cases:** Maps, charts, simple illustrations

## Code and Project Formats

### Python (.py)
**Your main format for analysis scripts**

**Example structure:**
```python
#!/usr/bin/env python3
"""
Text analysis script for Victorian novels
Author: Your Name
Date: 2024-09-26
"""

import pandas as pd
import matplotlib.pyplot as plt

# Your analysis code here
```

### Jupyter Notebooks (.ipynb)
**Best for:** Exploratory data analysis, combining code with explanations
**Pros:** Interactive, combines code/text/visualizations
**Cons:** Version control challenges, can become messy

**Perfect for:** Learning Python, documenting your analysis process

### Configuration Files
- **.gitignore:** Tells Git which files to ignore
- **requirements.txt:** Lists Python packages needed
- **config.json:** Stores project settings

## Geographic Data Formats

### GeoJSON (.geojson)
**Best for:** Geographic data for web mapping
**Pros:** Web-friendly, human-readable, Python support
**Cons:** Can be large for complex geometries

### Shapefile (.shp + supporting files)
**Best for:** Professional GIS work
**Pros:** Industry standard, precise
**Cons:** Actually multiple files, complex format

**Note:** Python libraries like GeoPandas can handle both formats easily.

## Format Conversion Strategies

### Text Conversions
**Word to Plain Text:**
- **Mac:** TextEdit → Format → Make Plain Text
- **PC:** Notepad → Paste → Save As → UTF-8
- **Both:** pandoc (command-line tool)

**PDF to Text:**
- Use Python libraries like `PyPDF2` or `pdfplumber`
- Adobe Acrobat (Export → Text)
- Online tools (be careful with sensitive data)

### Data Conversions
**Excel to CSV:**
1. Open in Excel/Numbers/LibreOffice
2. File → Save As → CSV UTF-8
3. Choose comma as delimiter

**CSV to JSON (Python):**
```python
import pandas as pd
df = pd.read_csv('data.csv')
df.to_json('data.json', orient='records')
```

### Image Conversions
**Batch processing with Python:**
```python
from PIL import Image
import os

for filename in os.listdir('images/'):
    if filename.endswith('.tiff'):
        img = Image.open(f'images/{filename}')
        img.save(f'converted/{filename[:-5]}.jpg', 'JPEG')
```

## Character Encoding (Critical!)

### What is Encoding?
How computers store text characters as numbers. Wrong encoding = garbled text.

### UTF-8: Your Best Friend
**Always use UTF-8 when possible:**
- Handles all languages and special characters
- Standard for web and Python
- Future-proof

### Common Encoding Problems
**Symptoms:**
- � characters in your text
- Accented letters display incorrectly
- Text appears as boxes or question marks

**Solutions:**
```python
# When reading files in Python, specify encoding
with open('text.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# When saving CSV files
df.to_csv('data.csv', encoding='utf-8')
```

### Platform-Specific Encoding Issues
**Mac:** Generally uses UTF-8 by default
**PC:** May default to Windows-1252, causing problems

**Best practice:** Always specify UTF-8 explicitly.

## Choosing the Right Format

### For Research Notes
1. **Markdown** - if you want basic formatting
2. **Plain text** - for maximum compatibility
3. **Word** - if collaborating with non-technical colleagues

### For Data
1. **CSV** - for tabular data (spreadsheet-like)
2. **JSON** - for hierarchical or nested data
3. **Plain text** - for simple lists or unstructured text

### For Images
1. **PNG** - for screenshots, charts, simple graphics
2. **JPEG** - for photographs
3. **SVG** - for scalable graphics and maps

### For Code
1. **Python (.py)** - for reusable scripts
2. **Jupyter (.ipynb)** - for exploratory analysis
3. **Markdown (.md)** - for documentation

## VS Code and File Formats

### File Association
VS Code automatically recognizes file types by extension and provides:
- Syntax highlighting
- Error checking
- Auto-completion
- Format-specific tools

### Useful VS Code Extensions
- **Python** - Essential for Python development
- **Jupyter** - For working with notebooks
- **CSV Rainbow** - Makes CSV files easier to read
- **Markdown All in One** - Enhanced Markdown support

### Changing File Types in VS Code
1. Click the language indicator in bottom-right
2. Select "Configure File Association for..."
3. Choose the correct language/format

## Common Beginner Mistakes

### Mistake 1: Using Word for Data
**Problem:** Saving tabular data in Word documents
**Solution:** Use CSV or Excel, then export to CSV for Python

### Mistake 2: Ignoring Encoding
**Problem:** Text appears garbled when opened in Python
**Solution:** Always specify UTF-8 encoding

### Mistake 3: Wrong Image Formats
**Problem:** Using TIFF files for web display (too large)
**Solution:** Convert to PNG or JPEG for sharing

### Mistake 4: Not Planning for Python
**Problem:** Choosing formats that Python can't easily handle
**Solution:** Stick to CSV for data, plain text for text, standard image formats

## Practical Exercises

### Exercise 1: Format Conversion Practice
1. Create a simple spreadsheet with book data (title, author, year)
2. Save as Excel (.xlsx)
3. Export as CSV
4. Open both in VS Code and compare

### Exercise 2: Text Encoding Experiment
1. Create a text file with accented characters (café, naïve, etc.)
2. Save with different encodings
3. Open in different programs and observe differences

### Exercise 3: Python Format Test
Create small sample files in different formats and try opening them with Python:

```python
# Test CSV
import pandas as pd
df = pd.read_csv('test.csv')
print(df.head())

# Test JSON
import json
with open('test.json', 'r') as f:
    data = json.load(f)
print(data)

# Test plain text
with open('test.txt', 'r', encoding='utf-8') as f:
    text = f.read()
print(text[:100])
```

### Exercise 4: Real-World Scenario
Download a dataset from Project Gutenberg:
1. Identify the file format
2. Open in VS Code
3. Note any encoding issues
4. Plan how you'd prepare it for Python analysis

## Preparing for Python Work

### File Organization for Python Projects
```
my-dh-project/
├── data/
│   ├── raw/           # Original files (keep these!)
│   │   ├── novels.csv
│   │   └── metadata.json
│   └── processed/     # Cleaned files for analysis
├── scripts/
│   ├── clean_data.py
│   └── analyze_text.py
├── outputs/
│   ├── visualizations/
│   └── results/
├── requirements.txt   # Python packages needed
└── README.md         # Project documentation
```

### Essential File Types for Your Python Journey
- **.csv** - Your data files
- **.py** - Your analysis scripts
- **.ipynb** - Your experimental notebooks
- **.txt** - Your raw text data
- **.md** - Your documentation
- **.png/.jpg** - Your visualization outputs

## Questions for Reflection

1. What file formats do you currently use most often?
2. Have you encountered files that wouldn't open properly? What format were they?
3. How might choosing better file formats improve your research workflow?
4. What types of data do you expect to work with in your DH projects?

## Next Steps

Understanding file formats prepares you for [command line basics](./command-line.md), where you'll learn to navigate and manipulate these files efficiently using text commands - a crucial skill for Python-based DH work.

---

*Remember: Choosing the right file format from the start saves hours of conversion work later. When in doubt, choose simple, open formats like CSV, plain text, and PNG.*