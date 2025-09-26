# Understanding File Paths

File paths are the addresses that tell your computer exactly where to find files and folders. Understanding paths is crucial for DH work, especially when using command-line tools, scripting, or sharing files with collaborators.

## What is a File Path?

A file path is like a street address for your files. Just as "123 Main Street, Springfield, IL" tells you exactly where to find a house, a file path tells your computer exactly where to find a file.

### Example Paths

**Mac Path:**
```
/Users/sarah/Documents/DH-Projects/medieval-texts/manuscript-001.txt
```

**PC Path:**
```
C:\Users\Sarah\Documents\DH-Projects\medieval-texts\manuscript-001.txt
```

Both paths point to the same file (`manuscript-001.txt`) but use different conventions.

## Types of File Paths

### Absolute Paths
An absolute path gives the complete address from the root of the file system.

**Mac Absolute Path:**
```
/Users/sarah/Documents/DH-Projects/data/survey-responses.csv
```

**PC Absolute Path:**
```
C:\Users\Sarah\Documents\DH-Projects\data\survey-responses.csv
```

### Relative Paths
A relative path gives directions from your current location.

If you're currently in `/Users/sarah/Documents/DH-Projects/`:
- `data/survey-responses.csv` (goes into data folder)
- `../Desktop/notes.txt` (goes up one level, then into Desktop)
- `./scripts/analysis.py` (current folder, then scripts folder)

## Platform Differences

### Mac Paths (Unix/Linux Style)
- **Root**: Starts with `/`
- **Separator**: Forward slash `/`
- **Home folder**: `/Users/username/`
- **Case sensitive**: `File.txt` and `file.txt` are different
- **Hidden files**: Start with `.` (like `.DS_Store`)

### PC Paths (Windows Style)
- **Root**: Starts with drive letter `C:\`
- **Separator**: Backslash `\`
- **Home folder**: `C:\Users\Username\`
- **Case insensitive**: `File.txt` and `file.txt` are the same
- **Hidden files**: Have hidden attribute, may start with `$` or `.`

## Common Path Components

### Special Path Shortcuts

| Symbol | Meaning | Example |
|--------|---------|---------|
| `~` | Home folder (Mac/Linux) | `~/Documents/` |
| `.` | Current folder | `./images/photo.jpg` |
| `..` | Parent folder (up one level) | `../data/file.txt` |
| `/` | Root folder (Mac/Linux) | `/Applications/` |
| `C:\` | C drive root (Windows) | `C:\Program Files\` |

### Environment Variables
Both systems use shortcuts for common locations:

**Mac:**
- `$HOME` = `/Users/username/`
- `$USER` = current username
- `$PWD` = current working directory

**PC:**
- `%USERPROFILE%` = `C:\Users\Username\`
- `%USERNAME%` = current username
- `%CD%` = current directory

## Finding File Paths

### Mac: Getting File Paths

#### Method 1: Finder
1. Right-click on file → "Get Info"
2. Look at "Where:" section
3. Or hold `Option` and right-click → "Copy [filename] as Pathname"

#### Method 2: Terminal
```bash
pwd                    # Shows current directory
ls                     # Lists files in current directory
find . -name "*.txt"   # Finds all .txt files from current location
```

#### Method 3: Drag and Drop
- Drag file from Finder into Terminal
- The full path appears automatically

### PC: Getting File Paths

#### Method 1: File Explorer
1. Right-click on file → "Properties"
2. Look at "Location:" field
3. Or click address bar and copy path

#### Method 2: Address Bar
- Click in the address bar of File Explorer
- Path changes from breadcrumbs to full text path

#### Method 3: Command Prompt
```cmd
cd                     # Shows current directory
dir                    # Lists files in current directory
where filename.txt     # Finds file locations
```

## Working with Paths in DH Tools

### Text Editors and IDEs
When opening files in tools like:
- **VS Code**: Use `File → Open Folder` to set working directory
- **Sublime Text**: Drag folder to create project
- **Atom**: `File → Add Project Folder`

### Command Line Tools
Many DH tools require you to specify file paths:

```bash
# Text analysis with command line tools
python analyze.py /path/to/text/corpus/
```

```bash
# Image processing
convert input.jpg -resize 50% /path/to/output/small_image.jpg
```

### Scripting and Programming
When writing scripts, use proper path handling:

**Python Example:**
```python
import os

# Get current working directory
current_dir = os.getcwd()

# Join paths safely (works on Mac and PC)
file_path = os.path.join(current_dir, 'data', 'texts', 'novel.txt')

# Check if file exists
if os.path.exists(file_path):
    print(f"Found file at: {file_path}")
```

## Common Path Problems and Solutions

### Problem 1: Spaces in Paths
**Issue**: Paths with spaces can break command-line tools

**Mac/Linux Solution:**
```bash
# Wrong
cd /Users/sarah/My Documents/

# Right
cd "/Users/sarah/My Documents/"
# or
cd /Users/sarah/My\ Documents/
```

**PC Solution:**
```cmd
# Wrong
cd C:\Users\Sarah\My Documents\

# Right
cd "C:\Users\Sarah\My Documents\"
```

### Problem 2: Special Characters
**Issue**: Characters like `&`, `$`, `#` can be interpreted as commands

**Solution**: Always quote paths with special characters
```bash
"/Users/sarah/DH Projects/Text & Data/file.txt"
```

### Problem 3: Path Length Limits
**PC Issue**: Windows has a 260-character path length limit

**Solutions:**
- Use shorter folder names
- Move projects closer to root (like `C:\Projects\`)
- Enable long path support in Windows 10+

### Problem 4: Cross-Platform Compatibility
**Issue**: Sharing paths between Mac and PC users

**Solutions:**
- Use forward slashes `/` in documentation (most tools accept them)
- Use relative paths when possible
- Use path-joining functions in scripts

## Best Practices for DH Projects

### 1. Keep Paths Short and Simple
```
Good: /Users/sarah/DH/victorian-novels/data/
Bad:  /Users/sarah/Documents/Graduate School/Digital Humanities/Fall 2024/Victorian Literature Project/Digitized Novels and Analysis/Raw Data Files/
```

### 2. Avoid Problematic Characters
- No spaces (use hyphens or underscores)
- No special characters (`&`, `$`, `#`, `@`, etc.)
- Stick to letters, numbers, hyphens, and underscores

### 3. Use Consistent Structure
```
project-root/
├── data/
│   ├── raw/
│   └── processed/
├── scripts/
├── outputs/
└── docs/
```

### 4. Document Your Paths
Create a `README.md` file explaining your folder structure:
```markdown
## Folder Structure
- `data/raw/` - Original, unmodified source files
- `data/processed/` - Cleaned and prepared data
- `scripts/` - Analysis and processing code
- `outputs/` - Results, visualizations, and reports
```

## Practical Exercises

### Exercise 1: Path Discovery
1. Find a file on your computer
2. Write down its absolute path
3. Navigate to its parent folder
4. Write the relative path from parent to file

### Exercise 2: Cross-Platform Translation
Given this Mac path: `/Users/alex/DH-Research/civil-war-letters/transcripts/letter-001.txt`

Write the equivalent PC path if Alex's username is the same.

### Exercise 3: Command Practice
**Mac users:** Open Terminal and practice:
```bash
pwd
ls
cd Documents
pwd
cd ..
pwd
```

**PC users:** Open Command Prompt and practice:
```cmd
cd
dir
cd Documents
cd
cd ..
cd
```

### Exercise 4: Path Problem Solving
Fix these problematic paths:
1. `/Users/student/My DH Project/Text & Analysis/data file.txt`
2. `C:\Users\Student\Research (Fall 2024)\#1 Priority\manuscript.txt`

## Tools for Path Management

### Path Utilities
**Mac:**
- `realpath filename` - Shows absolute path
- `dirname path` - Shows parent directory
- `basename path` - Shows filename only

**PC:**
- `forfiles` - Advanced file finding
- PowerShell path cmdlets
- `pushd`/`popd` - Directory stack navigation

### GUI Tools
- **Path Finder** (Mac) - Enhanced file browser
- **Explorer++** (PC) - Advanced file explorer
- **Directory Opus** (PC) - Professional file manager

## Troubleshooting Common Issues

### "File Not Found" Errors
1. Check spelling and capitalization
2. Verify the file actually exists at that location
3. Check for hidden characters or spaces
4. Use quotes around the entire path

### Permission Denied
1. Check if you have read/write access to the folder
2. On Mac: Check if Terminal has "Full Disk Access" in System Preferences
3. On PC: Run Command Prompt as Administrator if needed

### Path Too Long (PC)
1. Move files to shorter paths
2. Use subst command to create drive mapping
3. Enable long path support in Windows

## Questions for Reflection

1. How comfortable are you with navigating to files using paths instead of clicking?
2. What types of path errors have you encountered when using DH tools?
3. How might understanding paths help you troubleshoot software issues?

## Next Steps

Now that you understand file paths, you're ready to learn about [working with compressed files](./compression.md), which often involve specifying exact paths for extraction and archiving.

---

*Remember: File paths are fundamental to computing. The more comfortable you become with them, the more efficiently you'll work with digital tools.*