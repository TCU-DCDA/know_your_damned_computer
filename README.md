# Know Your Damned Computer: A Digital Humanities Student's Guide

Welcome to "Know Your Damned Computer" - a comprehensive, interactive resource designed to help college students learn the essential computer skills needed for successful digital humanities work.

**Live Site:** [https://tcu-dcda.github.io/know_your_damned_computer/](https://tcu-dcda.github.io/know_your_damned_computer/)

## About This Guide

This guide is specifically designed for DH students who need to understand their computers better to work more effectively with digital tools, manage research data, and collaborate on projects. Whether you're working with text analysis tools, managing large datasets, or preparing materials for digital archives, understanding your computer's fundamental operations will make your work smoother and more efficient.

## Features

- **Interactive quizzes** with immediate feedback
- **Terminal simulator** for safe command line practice
- **Progress tracking** across all guides
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

### Platform Coverage
This guide provides equal coverage for both Mac and PC users, with specific instructions and screenshots for each platform where they differ.

## Guide Structure

| Guide | Difficulty | Description |
|-------|------------|-------------|
| [File Management](./file-management.md) | Beginner | Organizing your digital research materials |
| [File Paths](./file-paths.md) | Beginner | How your computer organizes files |
| [Compression](./compression.md) | Beginner | Working with ZIP and compressed files |
| [File Formats](./file-formats.md) | Beginner | Choosing the right formats for DH projects |
| [Command Line](./command-line.md) | Intermediate | Terminal basics for advanced DH work |
| [Text Encoding](./text-encoding.md) | Intermediate | Character sets and encoding |

## Getting Started

1. Start with [File Management Fundamentals](./file-management.md) if you're new to organizing digital files
2. Move on to [Understanding File Paths](./file-paths.md) to learn navigation
3. Work through the other sections based on your specific needs

## Local Development

```bash
# Install dependencies
cd docs && bundle install

# Run development server
cd docs && bundle exec jekyll serve

# View at http://localhost:4000/know_your_damned_computer/
```

## Project Structure

```
├── docs/                    # Jekyll site (interactive version)
│   ├── _guides/            # Interactive guide content
│   ├── _layouts/           # Page templates
│   └── assets/js/          # Quiz engine, terminal simulator, progress tracking
├── *.md                    # Static educational content
├── CRITIQUE.md             # Evaluation and improvement roadmap
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
