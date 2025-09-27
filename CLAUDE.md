# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive digital humanities educational resource called "Know Your Damned Computer". It's a Jekyll-based website that teaches computer fundamentals to DH students, covering file management, command line basics, and technical skills needed for digital projects.

## Architecture

### Content Structure
- **Static guides**: Root-level markdown files (`file-management.md`, `command-line.md`, etc.) contain comprehensive educational content
- **Interactive guides**: `docs/_guides/` contains Jekyll-formatted versions with embedded quizzes and exercises
- **Jekyll site**: `docs/` directory contains the full interactive website built with Jekyll

### Key Components

#### Jekyll Configuration (`docs/_config.yml`)
- Configured for GitHub Pages deployment at `/know_your_damned_computer`
- Uses collections for organized content (`guides`, `exercises`)
- Includes SEO and sitemap plugins

#### Layout System (`docs/_layouts/`)
- `default.html`: Main site template with navigation
- `guide.html`: Interactive guide pages with progress tracking
- `exercise.html`: Standalone exercise template

#### Interactive Features (`docs/assets/js/`)
- `main.js`: Core functionality (theme switching, TOC, feedback)
- `quiz-engine.js`: Multiple choice quizzes with immediate feedback
- `terminal-sim.js`: Command line simulation for safe practice
- `progress.js`: User progress tracking with local storage

### Content Development Status
- **Completed**: File management and file paths guides (both static and interactive)
- **In progress**: Converting remaining static guides to interactive format
- **Priority order**: compression.md → file-formats.md → command-line.md → text-encoding.md

## Development Commands

### Jekyll Development
```bash
# Install dependencies (first time setup)
cd docs && bundle install

# Run local development server
cd docs && bundle exec jekyll serve

# Build for production
cd docs && bundle exec jekyll build
```

### Content Development
- Edit static guides in root directory for comprehensive content
- Convert to interactive format in `docs/_guides/` with Jekyll front matter
- Interactive elements use data attributes and JavaScript modules

### Testing
- Test locally with `jekyll serve` before deployment
- Verify cross-platform compatibility (Mac/PC instructions)
- Check responsive design and accessibility features

## File Organization

```
├── docs/                          # Jekyll site for interactive version
│   ├── _config.yml               # Jekyll configuration
│   ├── _guides/                  # Interactive guide content
│   ├── _layouts/                 # Page templates
│   ├── assets/js/                # Interactive functionality
│   └── index.html                # Landing page
├── *.md                          # Static educational content
├── README.md                     # Project overview
└── PROGRESS.md                   # Development status and next steps
```

## Key Principles

- **Beginner-friendly**: Content progresses from basic to advanced concepts
- **Cross-platform**: Equal support for Mac and PC users
- **Interactive**: Hands-on exercises with immediate feedback
- **DH-focused**: Examples and contexts relevant to digital humanities work
- **Accessible**: Screen reader support, keyboard navigation, responsive design
- **Inclusive language**: Use learning-focused terms (learn, understand, become proficient) rather than hierarchical language (master, slave, etc.)

## Known Issues
- **Terminal Simulator**: While terminal-sim.js loads properly and the HTML structure is correct, the terminal may not always appear on first page load. The JavaScript includes extensive debugging and fallback initialization. All other interactive features (quizzes, reading mode) work correctly. Investigation needed: potential timing issues or CSS conflicts.