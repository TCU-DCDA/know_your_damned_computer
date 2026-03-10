# Working with Compressed Files

Compressed files (like ZIP archives) are everywhere in digital humanities work. You'll encounter them when downloading datasets, sharing research materials, backing up projects, and working with many DH tools. This guide will help you understand and confidently work with compressed files on both Mac and PC.

## Why Compression Matters in DH

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

## Working with ZIP Files

### Mac: Creating and Opening ZIP Files

#### Creating ZIP Files
**Method 1: Finder (Built-in)**
1. Select files/folders you want to compress
2. Right-click → "Compress [X] items"
3. ZIP file created with name "Archive.zip" (rename as needed)

**Method 2: Terminal**
```bash
# Compress a single file
zip document.zip document.txt

# Compress a folder and its contents
zip -r project.zip DH-Project/

# Compress multiple files
zip research.zip *.txt *.pdf

# Compress with password protection
zip -er secure.zip sensitive-data/
```

#### Opening ZIP Files
**Method 1: Double-click**
- Double-click ZIP file in Finder
- Contents automatically extract to same folder

**Method 2: Terminal**
```bash
# Extract to current directory
unzip archive.zip

# Extract to specific directory
unzip archive.zip -d /path/to/destination/

# List contents without extracting
unzip -l archive.zip

# Extract specific files
unzip archive.zip "*.txt"
```

### PC: Creating and Opening ZIP Files

#### Creating ZIP Files
**Method 1: File Explorer (Built-in)**
1. Select files/folders to compress
2. Right-click → "Send to" → "Compressed (zipped) folder"
3. New ZIP file created; rename as needed

**Method 2: Command Prompt (PowerShell)**
```powershell
# Compress a folder
Compress-Archive -Path "C:\DH-Project" -DestinationPath "C:\project.zip"

# Compress specific file types
Compress-Archive -Path "C:\Data\*.txt" -DestinationPath "C:\texts.zip"

# Add to existing archive
Compress-Archive -Path "C:\NewFiles" -Update -DestinationPath "C:\existing.zip"
```

#### Opening ZIP Files
**Method 1: File Explorer**
- Double-click ZIP file
- Opens as a folder; drag files out to extract

**Method 2: Right-click Menu**
- Right-click ZIP file → "Extract All..."
- Choose destination folder

**Method 3: PowerShell**
```powershell
# Extract to current directory
Expand-Archive -Path "archive.zip" -DestinationPath "."

# Extract to specific location
Expand-Archive -Path "archive.zip" -DestinationPath "C:\Extracted"
```

## Advanced Compression Techniques

### Password Protection

**Mac (Terminal):**
```bash
# Create password-protected ZIP
zip -er secure.zip confidential-files/
# (will prompt for password)

# Extract password-protected ZIP
unzip secure.zip
# (will prompt for password)
```

**PC (PowerShell with 7-Zip):**
```powershell
# First install 7-Zip, then:
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

**PC:**
```powershell
# PowerShell uses optimal compression by default
# For more control, use 7-Zip
```

## Third-Party Tools

### Recommended Software

**Cross-Platform:**
- **7-Zip** (free) - Handles many formats, excellent compression
- **WinRAR** (paid) - Industry standard, handles RAR files
- **PeaZip** (free) - User-friendly interface, many formats

**Mac-Specific:**
- **The Unarchiver** (free) - Handles many formats Finder can't
- **Keka** (free/paid) - Modern interface, good format support
- **BetterZip** (paid) - Preview contents without extracting

**PC-Specific:**
- **WinZip** (paid) - Classic choice with modern features
- **IZArc** (free) - Simple interface, many formats

### Installation and Setup

**Installing 7-Zip (Recommended for both platforms):**

**Mac:**
```bash
# Using Homebrew package manager
brew install sevenzip

# Usage
7z a archive.7z files/
7z x archive.7z
```

**PC:**
1. Download from https://www.7-zip.org/
2. Install normally
3. Right-click integration automatically added

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

### Problem 3: Slow Extraction
**Causes:**
- Large archive size
- High compression ratio
- Antivirus scanning

**Solutions:**
1. Be patient with large files
2. Temporarily disable real-time antivirus scanning
3. Extract to SSD rather than traditional hard drive

### Problem 4: Password Issues
**Solutions:**
1. Check for correct capitalization
2. Try copying/pasting password
3. Verify with sender if password is correct

## Best Practices for DH Work

### 1. Naming Conventions
```
Good: victorian-novels-corpus-2024-09-26.zip
Bad:  stuff.zip
```

### 2. Documentation
Include a README.txt file in your archives:
```
Contents of victorian-novels-corpus.zip
=====================================
Created: 2024-09-26
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

### 3. Organize Before Compressing
Don't just zip a messy folder. Organize first:
```
Good structure before zipping:
DH-Project/
├── README.txt
├── data/
├── scripts/
└── outputs/

Bad structure:
Random files mixed together
```

### 4. Test Your Archives
Always test that archives extract properly:
1. Create the archive
2. Extract it to a different location
3. Verify all files are present and functional

### 5. Keep Originals
Don't delete original files immediately after compressing:
- Keep originals until you've verified the archive works
- Consider keeping both compressed and uncompressed versions for active projects

## Working with Large Archives

### Splitting Large Files
For very large datasets that exceed email limits:

**Mac/Linux:**
```bash
# Split large archive into smaller pieces
split -b 25m large-archive.zip archive-part-
# Creates: archive-part-aa, archive-part-ab, etc.

# Rejoin split files
cat archive-part-* > rejoined-archive.zip
```

**PC:**
```cmd
# Using 7-Zip command line
7z a -v25m archive.7z large-folder/
# Creates: archive.7z.001, archive.7z.002, etc.
```

### Cloud Storage Integration
Most cloud services (Google Drive, Dropbox, OneDrive) handle ZIP files well:
- Upload compressed archives for faster transfer
- Some services can preview ZIP contents without downloading

## Practical Exercises

### Exercise 1: Basic Compression
1. Create a folder with several text files
2. Compress it using your system's built-in tools
3. Extract it to a different location
4. Verify all files are present

### Exercise 2: Command Line Practice
**Mac users:**
```bash
mkdir test-compression
cd test-compression
echo "Hello DH World" > file1.txt
echo "Digital Humanities" > file2.txt
zip test.zip *.txt
ls -la
unzip -l test.zip
```

**PC users:**
```powershell
mkdir test-compression
cd test-compression
"Hello DH World" > file1.txt
"Digital Humanities" > file2.txt
Compress-Archive -Path "*.txt" -DestinationPath "test.zip"
dir
```

### Exercise 3: Archive Documentation
1. Create a small research project folder
2. Add a proper README.txt file
3. Compress with descriptive filename
4. Share with a classmate and have them extract it

### Exercise 4: Problem Solving
Download a ZIP file from an online archive and:
1. Extract it successfully
2. Note any issues you encounter
3. Try different extraction methods if needed

## Integration with DH Workflows

### Version Control
```bash
# Before major changes, create backup
zip "project-backup-$(date +%Y-%m-%d).zip" DH-Project/

# Archive completed phases
zip "phase1-complete-2024-09-26.zip" phase1/
```

### Data Sharing
When sharing datasets:
1. Organize files logically
2. Include comprehensive README
3. Use descriptive archive names
4. Test extraction on different platforms

### Long-term Preservation
For archiving completed projects:
- Use standard formats (ZIP, TAR)
- Include all documentation
- Test archives annually
- Keep multiple copies in different locations

## Questions for Reflection

1. How often do you currently work with compressed files?
2. What types of files do you need to compress most often in your DH work?
3. Have you encountered any compression-related problems in the past?
4. How might better compression skills improve your workflow?

## Next Steps

Understanding compression prepares you for [working with different file formats](./file-formats.md), where you'll learn about choosing the right format for different types of DH data and ensuring compatibility across platforms and tools.

---

*Remember: Compression is a fundamental skill for managing digital materials. Practice with small files first, then apply these techniques to your real research data.*