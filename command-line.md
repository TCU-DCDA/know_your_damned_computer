# Command Line Basics for Digital Humanities

The command line might seem intimidating, but it's an essential tool for digital humanities work. When you start using Python for text analysis, data visualization, and mapping, you'll find that many tasks are easier and faster with command line skills. This guide will get you comfortable with the basics.

## Why Learn the Command Line?

### What You'll Gain
- **Install Python packages** quickly and efficiently
- **Navigate file systems** faster than clicking through folders
- **Run Python scripts** from any location
- **Use Git** for version control (essential for collaboration)
- **Access powerful DH tools** that only work from command line
- **Automate repetitive tasks** with simple commands

### Real DH Use Cases
- Installing Python libraries: `pip install pandas matplotlib`
- Running text analysis scripts: `python analyze_corpus.py`
- Converting file formats: `pandoc input.md -o output.pdf`
- Downloading data: `wget https://example.com/dataset.csv`
- Managing Git repositories: `git add .` and `git commit -m "Updated analysis"`

## Command Line Basics by Platform

### Mac: Terminal
**Opening Terminal:**
- **Spotlight Search:** ⌘+Space, type "Terminal"
- **Applications:** Applications → Utilities → Terminal
- **Launchpad:** Look for Terminal icon

**What you'll see:**
```
YourName@YourMac ~ %
```
This is called the "prompt" - it's waiting for your command.

### PC: Command Prompt and PowerShell
**Opening Command Prompt:**
- **Start Menu:** Type "cmd" or "Command Prompt"
- **Windows Key + R:** Type "cmd" and press Enter
- **File Explorer:** Type "cmd" in address bar from any folder

**Opening PowerShell (Recommended):**
- **Start Menu:** Type "PowerShell"
- **Windows Key + X:** Select "Windows PowerShell"

**What you'll see:**
```
PS C:\Users\YourName>
```

**Note:** This guide will show both Mac/Linux commands and PC equivalents where they differ.

## Essential Commands

### Navigation Commands

#### See Where You Are
**Mac/Linux:**
```bash
pwd
# Output: /Users/yourname/Documents
```

**PC:**
```cmd
cd
# Output: C:\Users\YourName\Documents
```

#### List Files and Folders
**Mac/Linux:**
```bash
ls                    # Basic list
ls -l                 # Detailed list with permissions, dates
ls -la                # Include hidden files (starting with .)
ls *.txt              # Only .txt files
```

**PC:**
```cmd
dir                   # Basic list
dir /w                # Wide format
dir *.txt             # Only .txt files
```

#### Change Directory
**Both platforms:**
```bash
cd Documents          # Go into Documents folder
cd ..                 # Go up one level (to parent folder)
cd ~                  # Go to home folder (Mac/Linux)
cd %USERPROFILE%      # Go to home folder (PC)
cd /                  # Go to root (Mac/Linux)
cd C:\                # Go to C: drive root (PC)
```

**Pro tip:** You can drag a folder from Finder/File Explorer into Terminal/Command Prompt to get its path automatically.

### File Operations

#### Create Files and Folders
**Mac/Linux:**
```bash
mkdir new-project           # Create folder
mkdir -p path/to/new/dir   # Create nested folders
touch newfile.txt          # Create empty file
```

**PC:**
```cmd
mkdir new-project          # Create folder
mkdir path\to\new\dir      # Create nested folders (will prompt for each)
echo. > newfile.txt        # Create empty file
```

#### Copy Files
**Mac/Linux:**
```bash
cp file.txt backup.txt           # Copy file
cp -r folder/ backup-folder/     # Copy folder and contents
```

**PC:**
```cmd
copy file.txt backup.txt         # Copy file
xcopy folder backup-folder /E    # Copy folder and contents
```

#### Move/Rename Files
**Mac/Linux:**
```bash
mv oldname.txt newname.txt       # Rename file
mv file.txt Documents/           # Move to Documents folder
```

**PC:**
```cmd
ren oldname.txt newname.txt      # Rename file
move file.txt Documents\         # Move to Documents folder
```

#### Delete Files (Be Careful!)
**Mac/Linux:**
```bash
rm file.txt              # Delete file
rm -r folder/            # Delete folder and contents
rm *.tmp                 # Delete all .tmp files
```

**PC:**
```cmd
del file.txt             # Delete file
rmdir /s folder          # Delete folder and contents
del *.tmp                # Delete all .tmp files
```

**Important:** Deleted files often bypass the Trash/Recycle Bin!

## Python-Specific Commands

### Check Python Installation
**Both platforms:**
```bash
python --version         # Check Python version
python3 --version        # On Mac, might need python3
```

If Python isn't installed, you'll need to install it from python.org.

### Install Python Packages
**Both platforms:**
```bash
pip install pandas              # Install single package
pip install matplotlib numpy    # Install multiple packages
pip install -r requirements.txt # Install from requirements file
pip list                        # Show installed packages
pip show pandas                 # Info about specific package
```

### Run Python Scripts
**Both platforms:**
```bash
python script.py                # Run a Python script
python -i script.py             # Run and stay in interactive mode
```

### Python Virtual Environments (Important!)
Virtual environments keep your projects' packages separate.

**Create and use virtual environment:**
```bash
# Create virtual environment
python -m venv myproject-env

# Activate it
# Mac/Linux:
source myproject-env/bin/activate

# PC:
myproject-env\Scripts\activate

# Your prompt will change to show the environment is active
(myproject-env) YourName@YourMac ~ %

# Install packages (now only for this project)
pip install pandas matplotlib

# Deactivate when done
deactivate
```

## VS Code Integration

### Opening VS Code from Command Line
**Both platforms (after installing VS Code):**
```bash
code .                    # Open current folder in VS Code
code myfile.py           # Open specific file
code my-project/         # Open specific folder
```

### VS Code Integrated Terminal
- **Menu:** Terminal → New Terminal
- **Keyboard:** Ctrl+` (backtick)
- **Advantage:** Terminal opens in your project folder automatically

## Git Commands (Version Control)

Once you start working on larger projects, Git becomes essential.

### Basic Git Workflow
```bash
git init                 # Initialize new repository
git add .                # Stage all changes
git add file.py          # Stage specific file
git commit -m "Initial commit"  # Save changes with message
git status               # Check what's changed
git log                  # See commit history
```

### Working with GitHub
```bash
git clone https://github.com/user/repo.git  # Download repository
git push                 # Upload your changes
git pull                 # Download updates from others
```

## Text Processing Commands

### View File Contents
**Mac/Linux:**
```bash
cat file.txt             # Display entire file
head file.txt            # First 10 lines
tail file.txt            # Last 10 lines
less file.txt            # View file page by page (press q to quit)
```

**PC:**
```cmd
type file.txt            # Display entire file
more file.txt            # View file page by page
```

### Search Within Files
**Mac/Linux:**
```bash
grep "search term" file.txt           # Find lines containing term
grep -i "search term" file.txt        # Case-insensitive search
grep -r "term" folder/                # Search all files in folder
```

**PC:**
```cmd
findstr "search term" file.txt        # Find lines containing term
findstr /i "search term" file.txt     # Case-insensitive search
```

### Count Lines, Words, Characters
**Mac/Linux:**
```bash
wc file.txt              # Lines, words, characters
wc -l file.txt           # Just line count
wc -w file.txt           # Just word count
```

**PC (PowerShell):**
```powershell
Get-Content file.txt | Measure-Object -Line -Word -Character
```

## File Download and Web Commands

### Download Files
**Mac/Linux:**
```bash
curl -O https://example.com/data.csv         # Download file
wget https://example.com/data.csv            # Alternative (if installed)
```

**PC (PowerShell):**
```powershell
Invoke-WebRequest -Uri "https://example.com/data.csv" -OutFile "data.csv"
```

## Common Beginner Mistakes and Solutions

### Mistake 1: Spaces in File Names
**Problem:** `cd My Documents` doesn't work
**Solution:** Use quotes: `cd "My Documents"` or escape spaces: `cd My\ Documents` (Mac/Linux)

### Mistake 2: Wrong Directory
**Problem:** "File not found" errors
**Solution:** Always check where you are with `pwd` (Mac) or `cd` (PC)

### Mistake 3: Case Sensitivity
**Mac/Linux:** File names are case-sensitive: `file.txt` ≠ `File.txt`
**PC:** Usually case-insensitive, but be consistent anyway

### Mistake 4: Confusing Slash Directions
**Mac/Linux:** Use forward slashes `/`
**PC:** Use backslashes `\` (but forward slashes often work too)

## Building Your Command Line Skills

### Start Small
1. **Navigation practice:** Use `cd` and `ls`/`dir` to explore your file system
2. **File operations:** Create, copy, and move a few test files
3. **Python basics:** Check your Python installation, install a package

### Daily Practice Ideas
- Navigate to your project folder using command line instead of clicking
- Install Python packages from command line
- Run your Python scripts from Terminal/Command Prompt
- Use `git status` to check your project changes

### Useful Aliases and Shortcuts
**Mac/Linux (.bashrc or .zshrc):**
```bash
alias ll='ls -la'                    # Detailed file listing
alias ..='cd ..'                     # Go up one directory
alias dh='cd ~/Documents/DH-Projects' # Jump to DH folder
```

**PC (PowerShell profile):**
```powershell
Set-Alias ll Get-ChildItem
function .. { cd .. }
function dh { cd "$env:USERPROFILE\Documents\DH-Projects" }
```

## Practical Exercises

### Exercise 1: Navigation Practice
1. Open Terminal/Command Prompt
2. Find out where you are (`pwd` or `cd`)
3. Navigate to your Documents folder
4. List all files and folders
5. Go back to your home directory

### Exercise 2: File Management
1. Create a new folder called "command-line-practice"
2. Navigate into it
3. Create three empty text files
4. List the files to confirm they exist
5. Copy one file with a new name
6. Delete one of the original files

### Exercise 3: Python Setup
1. Check if Python is installed
2. Create a simple Python script that prints "Hello DH World!"
3. Run the script from command line
4. Install the `requests` package using pip
5. Check that it installed correctly

### Exercise 4: Real Project Workflow
1. Create a new project folder with proper structure:
   ```
   my-text-analysis/
   ├── data/
   ├── scripts/
   └── outputs/
   ```
2. Navigate between folders using command line
3. Create a simple Python script in the scripts folder
4. Run it from the project root directory

## Integration with Your DH Workflow

### Starting a New Project
```bash
mkdir new-dh-project
cd new-dh-project
mkdir data scripts outputs docs
touch README.md
python -m venv venv
source venv/bin/activate  # Mac/Linux
# or
venv\Scripts\activate     # PC
pip install pandas matplotlib jupyter
code .                    # Open in VS Code
```

### Daily DH Work Pattern
```bash
cd my-project             # Navigate to project
source venv/bin/activate  # Activate Python environment
git status               # Check what's changed
python scripts/analyze.py # Run analysis
git add .                # Stage changes
git commit -m "Updated analysis"  # Save changes
```

## Troubleshooting Common Issues

### "Command not found" / "not recognized"
- **Cause:** Command not installed or not in PATH
- **Solution:** Install the software, or check installation guides

### "Permission denied"
- **Mac/Linux:** Try `sudo` before command (be careful!)
- **PC:** Run Command Prompt as Administrator

### "No such file or directory"
- **Cause:** Wrong location or typo in filename
- **Solution:** Check current directory with `pwd`/`cd`, verify file name

### Python/pip not working
- **Try:** `python3` and `pip3` instead of `python` and `pip`
- **Check:** Python installation from python.org

## Next Steps

### Advanced Topics to Explore Later
- **Shell scripting:** Automate repetitive tasks
- **Regular expressions:** Powerful text searching
- **Package managers:** Homebrew (Mac), Chocolatey (PC)
- **SSH:** Access remote servers
- **Advanced Git:** Branching, merging, collaboration

### Resources for Continued Learning
- **Online tutorials:** Command Line Crash Course, Learn Enough Command Line
- **Practice platforms:** Command Line Challenge, OverTheWire
- **Cheat sheets:** Keep reference cards handy

## Questions for Reflection

1. Which command line tasks seem most relevant to your DH work?
2. What aspects of the command line feel most intimidating?
3. How might command line skills change your workflow?
4. What would you like to automate in your research process?

## Next Steps

Command line skills prepare you for [text encoding and character sets](./text-encoding.md), where you'll learn to handle the text data that forms the foundation of much DH work - crucial knowledge for avoiding garbled characters and encoding errors in your Python text analysis projects.

---

*Remember: Command line skills develop with practice. Start with basic navigation and file operations, then gradually add more advanced techniques as you need them for your DH projects.*