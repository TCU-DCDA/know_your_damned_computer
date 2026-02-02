# Know Your Damned Computer: A Digital Humanities Student's Guide

Welcome to "Know Your Damned Computer" - a comprehensive, interactive resource designed to help college students learn the essential computer skills needed for successful digital humanities work.

**Live Site:** [https://tcu-dcda.github.io/know_your_damned_computer/](https://tcu-dcda.github.io/know_your_damned_computer/)

## About This Guide

This guide is specifically designed for DH students who need to understand their computers better to work more effectively with digital tools, manage research data, and collaborate on projects. Whether you're working with text analysis tools, managing large datasets, or preparing materials for digital archives, understanding your computer's fundamental operations will make your work smoother and more efficient.

## Features

- **Interactive quizzes** with immediate feedback
- **Terminal simulator** for safe command line practice
- **Dark mode** support
- **Mobile-friendly** responsive design
- **Accessibility-first** with ARIA labels, keyboard navigation, and reduced motion support

## What You'll Learn

### Core Computer Literacy
- **File Management**: Organizing, finding, and managing your research files
- **File Paths and Navigation**: Understanding where your files live and how to reference them
- **Compression and Archives**: Working with ZIP files and other compressed formats
- **File Formats**: Choosing the right format for your data and projects
- **Command Line Basics**: Terminal skills for Python, pip, and Git
- **Text Encoding**: Understanding character sets and avoiding encoding problems
- **Git & Version Control**: Track changes, collaborate, and never lose work again
- **Regular Expressions**: Find patterns in text for data cleaning and extraction

### Platform Coverage
This guide provides equal coverage for both Mac and PC users, with specific instructions and screenshots for each platform where they differ.

## Guide Structure

| Guide | Difficulty | Time | Description |
|-------|------------|------|-------------|
| [File Management](https://tcu-dcda.github.io/know_your_damned_computer/guides/file-management/) | Beginner | 20 min | Organizing your digital research materials |
| [File Paths](https://tcu-dcda.github.io/know_your_damned_computer/guides/file-paths/) | Beginner | 25 min | How your computer organizes files |
| [Compression](https://tcu-dcda.github.io/know_your_damned_computer/guides/compression/) | Beginner | 20 min | Working with ZIP and compressed files |
| [File Formats](https://tcu-dcda.github.io/know_your_damned_computer/guides/file-formats/) | Beginner | 30 min | Choosing the right formats for DH projects |
| [Command Line](https://tcu-dcda.github.io/know_your_damned_computer/guides/command-line/) | Intermediate | 45 min | Terminal basics for advanced DH work |
| [Text Encoding](https://tcu-dcda.github.io/know_your_damned_computer/guides/text-encoding/) | Intermediate | 35 min | Character sets and encoding |
| [Git & Version Control](https://tcu-dcda.github.io/know_your_damned_computer/guides/version-control/) | Intermediate | 50 min | Track changes and collaborate with Git |
| [Regular Expressions](https://tcu-dcda.github.io/know_your_damned_computer/guides/regular-expressions/) | Intermediate | 45 min | Pattern matching for text processing |

## Getting Started

1. Start with [File Management Fundamentals](https://tcu-dcda.github.io/know_your_damned_computer/guides/file-management/) if you're new to organizing digital files
2. Move on to [Understanding File Paths](https://tcu-dcda.github.io/know_your_damned_computer/guides/file-paths/) to learn navigation
3. Work through the other sections based on your specific needs

## Local Development

### Quarto (Preferred)

```bash
cd quarto-version
quarto preview
```

Build:
```bash
cd quarto-version
quarto render
```

Deployment (GitHub Pages):
- Push to `main` to trigger the GitHub Actions workflow in `.github/workflows/quarto.yml`

```bash
# Install dependencies
cd docs && bundle install

# Run development server
cd docs && bundle exec jekyll serve

# View at http://localhost:4000/know_your_damned_computer/
```

## Project Structure

```
├── quarto-version/          # Quarto site (primary)
├── docs/                    # Jekyll site (legacy reference)
│   ├── _guides/            # Interactive guide content (8 guides)
│   ├── _layouts/           # Page templates
│   └── assets/js/          # Quiz engine, terminal simulator, progress tracking
├── .archive/               # Archived static content (deprecated)
├── CRITIQUE.md             # Evaluation and improvement roadmap
├── PROGRESS.md             # Development status and priorities
└── README.md               # This file
```

## Contributing

This is a living document. If you find errors, have suggestions for improvements, or want to contribute additional content, please feel free to:

1. Open an issue for bugs or suggestions
2. Submit a pull request with improvements
3. Contact the maintainers

## For Instructors

Each section includes practical exercises and real-world examples relevant to DH work. Consider using these materials as:
- Pre-course preparation for DH students
- Reference materials during DH courses
- Troubleshooting guides when students encounter technical difficulties

## License

MIT License - see LICENSE file for details.

---

*Remember: These skills form the foundation for all your digital humanities work. Take time to learn them thoroughly, and your future self will thank you!*
