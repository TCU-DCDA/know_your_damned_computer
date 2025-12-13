/**
 * Terminal Simulator for Interactive DH Computer Skills Guide
 * Simulates command line interface for safe practice
 */

class TerminalSimulator {
    constructor(container) {
        this.container = container;
        this.currentPath = '/Users/student';
        this.history = [];
        this.historyIndex = -1;
        this.fileSystem = this.createFileSystem();
        this.commands = this.setupCommands();
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        this.showWelcome();
        console.log('💻 Terminal Simulator initialized');
    }

    createFileSystem() {
        // Simulate a basic file system for DH work
        return {
            '/Users/student': {
                type: 'directory',
                contents: {
                    'Documents': {
                        type: 'directory',
                        contents: {
                            'DH-Projects': {
                                type: 'directory',
                                contents: {
                                    'victorian-novels': {
                                        type: 'directory',
                                        contents: {
                                            'data': {
                                                type: 'directory',
                                                contents: {
                                                    'novels.csv': { type: 'file', size: '2.1MB' },
                                                    'metadata.json': { type: 'file', size: '156KB' }
                                                }
                                            },
                                            'scripts': {
                                                type: 'directory',
                                                contents: {
                                                    'analyze.py': { type: 'file', size: '3.2KB' },
                                                    'clean_data.py': { type: 'file', size: '1.8KB' }
                                                }
                                            },
                                            'README.md': { type: 'file', size: '1.1KB' }
                                        }
                                    },
                                    'text-analysis-project': {
                                        type: 'directory',
                                        contents: {
                                            'corpus': {
                                                type: 'directory',
                                                contents: {
                                                    'shakespeare.txt': { type: 'file', size: '5.2MB' },
                                                    'austen.txt': { type: 'file', size: '2.8MB' }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            'notes.txt': { type: 'file', size: '891B' },
                            'research-ideas.md': { type: 'file', size: '2.3KB' }
                        }
                    },
                    'Desktop': {
                        type: 'directory',
                        contents: {
                            'quick-notes.txt': { type: 'file', size: '445B' }
                        }
                    },
                    'Downloads': {
                        type: 'directory',
                        contents: {
                            'dataset.zip': { type: 'file', size: '15.7MB' },
                            'python-tutorial.pdf': { type: 'file', size: '8.9MB' }
                        }
                    }
                }
            }
        };
    }

    setupCommands() {
        return {
            pwd: () => {
                return this.currentPath;
            },

            ls: (args = []) => {
                const showHidden = args.includes('-a') || args.includes('-la');
                const longFormat = args.includes('-l') || args.includes('-la');
                const currentDir = this.getCurrentDirectory();
                
                if (!currentDir || currentDir.type !== 'directory') {
                    return 'ls: cannot access: Not a directory';
                }

                let items = Object.entries(currentDir.contents);
                
                if (!showHidden) {
                    items = items.filter(([name]) => !name.startsWith('.'));
                }

                if (longFormat) {
                    return items.map(([name, item]) => {
                        const type = item.type === 'directory' ? 'd' : '-';
                        const size = item.size || '4096';
                        const date = 'Sep 26 10:30';
                        return `${type}rwxr-xr-x  1 student student  ${size.padStart(8)} ${date} ${name}`;
                    }).join('\n');
                } else {
                    return items.map(([name, item]) => {
                        return item.type === 'directory' ? `${name}/` : name;
                    }).join('  ');
                }
            },

            cd: (args = []) => {
                if (args.length === 0) {
                    this.currentPath = '/Users/student';
                    return '';
                }

                const target = args[0];
                const newPath = this.resolvePath(target);
                const targetDir = this.getDirectoryAtPath(newPath);

                if (!targetDir) {
                    return `cd: ${target}: No such file or directory`;
                }

                if (targetDir.type !== 'directory') {
                    return `cd: ${target}: Not a directory`;
                }

                this.currentPath = newPath;
                return '';
            },

            mkdir: (args = []) => {
                if (args.length === 0) {
                    return 'mkdir: missing operand';
                }

                const dirName = args[0];
                const currentDir = this.getCurrentDirectory();
                
                if (!currentDir || currentDir.type !== 'directory') {
                    return 'mkdir: cannot create directory: Permission denied';
                }

                if (currentDir.contents[dirName]) {
                    return `mkdir: cannot create directory '${dirName}': File exists`;
                }

                currentDir.contents[dirName] = {
                    type: 'directory',
                    contents: {}
                };

                return '';
            },

            touch: (args = []) => {
                if (args.length === 0) {
                    return 'touch: missing file operand';
                }

                const fileName = args[0];
                const currentDir = this.getCurrentDirectory();
                
                if (!currentDir || currentDir.type !== 'directory') {
                    return 'touch: cannot create file: Permission denied';
                }

                currentDir.contents[fileName] = {
                    type: 'file',
                    size: '0B'
                };

                return '';
            },

            cat: (args = []) => {
                if (args.length === 0) {
                    return 'cat: missing file operand';
                }

                const fileName = args[0];
                const filePath = this.resolvePath(fileName);
                const file = this.getDirectoryAtPath(filePath);

                if (!file) {
                    return `cat: ${fileName}: No such file or directory`;
                }

                if (file.type !== 'file') {
                    return `cat: ${fileName}: Is a directory`;
                }

                // Return sample content based on file type
                const ext = fileName.split('.').pop();
                switch (ext) {
                    case 'txt':
                        return 'This is a sample text file.\nIt contains some research notes about digital humanities.\nLorem ipsum dolor sit amet...';
                    case 'md':
                        return '# Research Ideas\n\n## Text Analysis Project\n- Analyze Victorian novels\n- Use Python and NLTK\n- Create visualizations';
                    case 'py':
                        return '#!/usr/bin/env python3\n\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\n# Sample Python script for text analysis';
                    case 'csv':
                        return 'title,author,year,genre\n"Pride and Prejudice","Jane Austen",1813,"Romance"\n"Frankenstein","Mary Shelley",1818,"Gothic"';
                    default:
                        return 'Binary file content (use appropriate viewer)';
                }
            },

            python: (args = []) => {
                if (args.length === 0) {
                    return 'Python 3.9.7 (interactive mode not supported in simulator)\nUse: python filename.py to run scripts';
                }

                const fileName = args[0];
                if (fileName.endsWith('.py')) {
                    return `Running ${fileName}...\nHello, Digital Humanities World!\nScript completed successfully.`;
                } else {
                    return `python: can't open file '${fileName}': [Errno 2] No such file or directory`;
                }
            },

            pip: (args = []) => {
                if (args.length === 0) {
                    return 'Usage: pip <command> [options]';
                }

                const command = args[0];
                if (command === 'install') {
                    const package = args[1] || 'package-name';
                    return `Collecting ${package}\nInstalling collected packages: ${package}\nSuccessfully installed ${package}`;
                } else if (command === 'list') {
                    return 'Package    Version\n---------- -------\npandas     1.3.3\nmatplotlib 3.4.3\nnltk       3.6.2\nnumpy      1.21.2';
                } else {
                    return `Unknown command: ${command}`;
                }
            },

            clear: () => {
                this.clearOutput();
                return '';
            },

            zip: (args = []) => {
                if (args.length < 2) {
                    return 'zip: missing arguments\nUsage: zip archive.zip file1 file2... or zip -r archive.zip directory/';
                }

                const archiveName = args[0];
                const targets = args.slice(1);
                const isRecursive = args.includes('-r');
                const currentDir = this.getCurrentDirectory();

                if (!currentDir || currentDir.type !== 'directory') {
                    return 'zip: error accessing current directory';
                }

                let output = '';
                let filesAdded = 0;

                for (const target of targets.filter(t => t !== '-r')) {
                    if (currentDir.contents[target]) {
                        const item = currentDir.contents[target];
                        if (item.type === 'directory' && !isRecursive) {
                            output += `zip warning: directory ${target} not added (use -r to recurse)\n`;
                        } else {
                            output += `  adding: ${target}${item.type === 'directory' ? '/' : ''} (stored 0%)\n`;
                            filesAdded++;
                        }
                    } else {
                        output += `zip warning: ${target} not found\n`;
                    }
                }

                if (filesAdded > 0) {
                    currentDir.contents[archiveName] = {
                        type: 'file',
                        size: `${(Math.random() * 5 + 1).toFixed(1)}MB`
                    };
                    output += `Archive ${archiveName} created successfully`;
                }

                return output;
            },

            unzip: (args = []) => {
                if (args.length === 0) {
                    return 'unzip: missing archive name\nUsage: unzip archive.zip [-l to list contents]';
                }

                const archiveName = args[0];
                const listOnly = args.includes('-l');
                const currentDir = this.getCurrentDirectory();

                if (!currentDir || currentDir.type !== 'directory') {
                    return 'unzip: error accessing current directory';
                }

                if (!currentDir.contents[archiveName]) {
                    return `unzip: cannot find ${archiveName}`;
                }

                if (listOnly) {
                    return `Archive:  ${archiveName}
  Length      Date    Time    Name
---------  ---------- -----   ----
     1234  09-27-2024 10:30   sample-data.txt
     5678  09-27-2024 10:30   research-notes.md
      987  09-27-2024 10:30   metadata.json
---------                     -------
     7899                     3 files`;
                }

                const extractedFiles = ['sample-data.txt', 'research-notes.md', 'metadata.json'];
                let output = `Archive:  ${archiveName}\n`;

                extractedFiles.forEach(file => {
                    output += `  inflating: ${file}\n`;
                    currentDir.contents[file] = {
                        type: 'file',
                        size: `${(Math.random() * 10 + 1).toFixed(1)}KB`
                    };
                });

                return output + `\nExtraction complete! ${extractedFiles.length} files extracted.`;
            },

            help: () => {
                return `Available commands:
  pwd          - Print working directory
  ls [options] - List directory contents (-l for long format, -a for all files)
  cd <dir>     - Change directory
  mkdir <dir>  - Create directory
  touch <file> - Create empty file
  cat <file>   - Display file contents
  python <file>- Run Python script
  pip <cmd>    - Python package manager
  zip <args>   - Create zip archives
  unzip <file> - Extract zip archives (-l to list contents)
  clear        - Clear terminal
  help         - Show this help message

Navigation tips:
  cd ..        - Go up one directory
  cd ~         - Go to home directory
  cd /         - Go to root directory

Compression examples:
  zip data.zip *.txt       - Compress text files (simulated)
  zip -r project.zip docs/ - Compress directory recursively
  unzip -l dataset.zip     - List archive contents
  unzip dataset.zip        - Extract files

Try exploring the sample DH project structure!`;
            }
        };
    }

    render() {
        this.container.innerHTML = `
            <div class="terminal-simulator">
                <div class="terminal-header">
                    <div class="terminal-title">Terminal Simulator</div>
                    <div class="terminal-controls">
                        <button class="terminal-btn terminal-clear" title="Clear Terminal">
                            <i class="fas fa-broom"></i>
                        </button>
                        <button class="terminal-btn terminal-reset" title="Reset Terminal">
                            <i class="fas fa-redo"></i>
                        </button>
                    </div>
                </div>
                <div class="terminal-content">
                    <div class="terminal-output"></div>
                    <div class="terminal-input-line">
                        <span class="terminal-prompt">${this.getPrompt()}</span>
                        <input type="text" class="terminal-input" placeholder="Type a command..." autocomplete="off">
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        const input = this.container.querySelector('.terminal-input');
        const clearBtn = this.container.querySelector('.terminal-clear');
        const resetBtn = this.container.querySelector('.terminal-reset');

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand(input.value.trim());
                input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1, input);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1, input);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.handleTabCompletion(input);
            }
        });

        // Enhanced touch support for mobile devices
        clearBtn.addEventListener('click', () => {
            this.clearOutput();
        });
        
        clearBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.clearOutput();
        });

        resetBtn.addEventListener('click', () => {
            this.reset();
        });
        
        resetBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.reset();
        });

        // Focus input when clicking/touching terminal
        this.container.addEventListener('click', () => {
            input.focus();
        });
        
        this.container.addEventListener('touchstart', () => {
            input.focus();
        });

        // Mobile keyboard support
        if (this.isMobileDevice()) {
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('autocorrect', 'off');
            input.setAttribute('autocapitalize', 'off');
            input.setAttribute('spellcheck', 'false');
        }

        // Auto-focus input on desktop only
        if (!this.isMobileDevice()) {
            input.focus();
        }
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (navigator.maxTouchPoints > 0 && window.matchMedia('(pointer: coarse)').matches);
    }

    handleCommand(commandLine) {
        if (!commandLine) return;

        // Add to history
        this.history.push(commandLine);
        this.historyIndex = this.history.length;

        // Parse command and arguments
        const parts = commandLine.split(/\s+/);
        const command = parts[0];
        const args = parts.slice(1);

        // Add command to output
        this.addOutput(`${this.getPrompt()}${commandLine}`, 'command');

        // Execute command
        if (this.commands[command]) {
            const result = this.commands[command](args);
            if (result) {
                this.addOutput(result, 'output');
            }
        } else {
            this.addOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
        }

        // Update prompt
        this.updatePrompt();
    }

    addOutput(text, type = 'output') {
        const output = this.container.querySelector('.terminal-output');
        const line = document.createElement('div');
        line.className = `terminal-line terminal-${type}`;
        line.textContent = text;
        output.appendChild(line);
        
        // Scroll to bottom
        output.scrollTop = output.scrollHeight;
    }

    clearOutput() {
        const output = this.container.querySelector('.terminal-output');
        output.innerHTML = '';
    }

    reset() {
        this.currentPath = '/Users/student';
        this.history = [];
        this.historyIndex = -1;
        this.fileSystem = this.createFileSystem();
        this.clearOutput();
        this.updatePrompt();
        this.showWelcome();
    }

    showWelcome() {
        this.addOutput('Welcome to the Terminal Simulator!', 'info');
        this.addOutput('This is a safe environment to practice command line skills.', 'info');
        this.addOutput('Type "help" to see available commands.', 'info');
        this.addOutput('', 'output');
    }

    navigateHistory(direction, input) {
        const newIndex = this.historyIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.history.length) {
            this.historyIndex = newIndex;
            input.value = this.history[this.historyIndex];
        } else if (newIndex >= this.history.length) {
            this.historyIndex = this.history.length;
            input.value = '';
        }
    }

    handleTabCompletion(input) {
        const value = input.value;
        const parts = value.split(/\s+/);
        const lastPart = parts[parts.length - 1];

        if (parts.length === 1) {
            // Complete command
            const matches = Object.keys(this.commands).filter(cmd => 
                cmd.startsWith(lastPart)
            );
            
            if (matches.length === 1) {
                input.value = matches[0];
            } else if (matches.length > 1) {
                this.addOutput(`${this.getPrompt()}${value}`, 'command');
                this.addOutput(matches.join('  '), 'output');
            }
        } else {
            // Complete file/directory names
            const currentDir = this.getCurrentDirectory();
            if (currentDir && currentDir.type === 'directory') {
                const matches = Object.keys(currentDir.contents).filter(name =>
                    name.startsWith(lastPart)
                );
                
                if (matches.length === 1) {
                    parts[parts.length - 1] = matches[0];
                    input.value = parts.join(' ');
                } else if (matches.length > 1) {
                    this.addOutput(`${this.getPrompt()}${value}`, 'command');
                    this.addOutput(matches.join('  '), 'output');
                }
            }
        }
    }

    getPrompt() {
        const shortPath = this.currentPath.replace('/Users/student', '~');
        return `student@computer:${shortPath}$ `;
    }

    updatePrompt() {
        const prompt = this.container.querySelector('.terminal-prompt');
        if (prompt) {
            prompt.textContent = this.getPrompt();
        }
    }

    getCurrentDirectory() {
        return this.getDirectoryAtPath(this.currentPath);
    }

    getDirectoryAtPath(path) {
        const parts = path.split('/').filter(part => part);
        let current = this.fileSystem;

        for (const part of parts) {
            if (current[`/${parts.slice(0, parts.indexOf(part) + 1).join('/')}`]) {
                current = current[`/${parts.slice(0, parts.indexOf(part) + 1).join('/')}`];
            } else if (current.contents && current.contents[part]) {
                current = current.contents[part];
            } else {
                return null;
            }
        }

        return current;
    }

    resolvePath(path) {
        if (path.startsWith('/')) {
            return path;
        } else if (path === '~') {
            return '/Users/student';
        } else if (path.startsWith('~/')) {
            return `/Users/student/${path.slice(2)}`;
        } else if (path === '..') {
            const parts = this.currentPath.split('/').filter(part => part);
            if (parts.length > 2) { // Don't go above /Users/student
                parts.pop();
                return '/' + parts.join('/');
            }
            return '/Users/student';
        } else if (path.startsWith('../')) {
            const parentPath = this.resolvePath('..');
            return `${parentPath}/${path.slice(3)}`;
        } else {
            return `${this.currentPath}/${path}`;
        }
    }
}

// Function to create terminal simulators
function createTerminalSimulator(selector, options = {}) {
    const container = typeof selector === 'string' ? 
        document.querySelector(selector) : selector;
    
    if (!container) {
        console.error('Terminal container not found:', selector);
        return null;
    }

    return new TerminalSimulator(container);
}

// Robust Initialization for Terminal Simulator
function initTerminalSimulators() {
    // Prevent multiple initializations
    if (window.terminalSimInitialized) return;
    
    console.log('🚀 Starting Terminal Simulator Initialization...');
    
    const terminals = document.querySelectorAll('[data-terminal]');
    console.log(`Found ${terminals.length} terminals to initialize`);

    terminals.forEach((terminal, index) => {
        // Check if already initialized
        if (terminal.getAttribute('data-initialized') === 'true') return;
        
        console.log(`Initializing terminal ${index + 1}:`, terminal);
        try {
            createTerminalSimulator(terminal);
            terminal.setAttribute('data-initialized', 'true');
        } catch (e) {
            console.error('Failed to initialize terminal:', e);
        }
    });
    
    window.terminalSimInitialized = true;
}

// Initialize on standard DOM events
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalSimulators);
} else {
    initTerminalSimulators();
}

// Re-initialize on Quarto/Turbolinks navigation events
window.addEventListener('quarto:page-load', () => {
    window.terminalSimInitialized = false; // Reset flag for new page
    initTerminalSimulators();
});



// Add terminal-specific styles
const terminalStyles = `
<style>
.terminal-simulator {
    background-color: #1a1a1a;
    color: #00ff00;
    font-family: var(--font-family-mono);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    margin: var(--space-lg) 0;
    max-height: 500px;
    display: flex;
    flex-direction: column;
}

.terminal-header {
    background-color: #333;
    padding: var(--space-sm) var(--space-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #555;
}

.terminal-title {
    color: #ccc;
    font-size: 0.875rem;
    font-weight: 500;
}

.terminal-controls {
    display: flex;
    gap: var(--space-xs);
}

.terminal-btn {
    background: none;
    border: 1px solid #555;
    color: #ccc;
    padding: var(--space-xs);
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: 0.75rem;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.terminal-btn:hover {
    background-color: #444;
    color: #fff;
}

.terminal-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: var(--space-md);
    overflow: hidden;
}

.terminal-output {
    flex: 1;
    overflow-y: auto;
    white-space: pre-wrap;
    margin-bottom: var(--space-sm);
    scrollbar-width: thin;
    scrollbar-color: #555 #1a1a1a;
}

.terminal-output::-webkit-scrollbar {
    width: 6px;
}

.terminal-output::-webkit-scrollbar-track {
    background: #1a1a1a;
}

.terminal-output::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 3px;
}

.terminal-line {
    margin-bottom: 0.25rem;
    line-height: 1.4;
}

.terminal-command {
    color: #00ff00;
}

.terminal-output {
    color: #ffffff;
}

.terminal-error {
    color: #ff6b6b;
}

.terminal-info {
    color: #74c0fc;
}

.terminal-input-line {
    display: flex;
    align-items: center;
    border-top: 1px solid #333;
    padding-top: var(--space-sm);
}

.terminal-prompt {
    color: #00ff00;
    margin-right: var(--space-sm);
    white-space: nowrap;
    font-weight: 500;
}

.terminal-input {
    flex: 1;
    background: transparent;
    border: none;
    color: #00ff00;
    font-family: var(--font-family-mono);
    font-size: 1rem;
    outline: none;
    caret-color: #00ff00;
}

.terminal-input::placeholder {
    color: #666;
}

/* Blinking cursor effect */
.terminal-input:focus::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 1em;
    border-right: 2px solid #00ff00;
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

/* Mobile responsive */
@media (max-width: 768px) {
    .terminal-simulator {
        max-height: 400px;
        font-size: 0.875rem;
    }
    
    .terminal-input-line {
        flex-wrap: wrap;
    }
    
    .terminal-prompt {
        font-size: 0.75rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', terminalStyles);
