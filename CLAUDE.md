
# CLAUDE.md

## Standard claude.md ruleset

I will start a coding session with you.

Output the message number after each message without explanation.

Every 4th message, remind yourself of these rules:

**MANDATORY CHECKS:**  
* Only change what's explicitly requested – NEVER modify unrelated code  
* Update `package.json`/dependencies when adding imports  
* NO placeholders (`YOUR_API_KEY`, `TODO`) – use proper variables/config  
* Questions = Answers ONLY – don't modify code unless asked to "change/update/fix"  
* NO assumptions – ASK for missing information  
* Security first – NO secrets in client code, use env variables  
* Add intelligent logging to core flows automatically  
* Clean unused code when making changes  
* Provide CODE EVIDENCE when asked about implementations  
* Output the message number after each message without explanation  
* Every 4th message, remind yourself of these rules  

If you violate these rules, you are breaking critical development protocols.

Start with message #1.



The rest of thss file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Completed**: All six core guides (file management, file paths, compression, file formats, command line, text encoding) - both static and interactive versions
- **Live deployment**: https://tcu-dcda.github.io/know_your_damned_computer/
- **Evaluation phase**: Quarto parallel implementation created for platform comparison

## Development Commands

### Jekyll Development (Primary)
```bash
# Install dependencies (first time setup)
cd docs && bundle install

# Run local development server
cd docs && bundle exec jekyll serve

# Build for production
cd docs && bundle exec jekyll build
```

### Quarto Development (Evaluation)
```bash
# Install Quarto: https://quarto.org/docs/get-started/
brew install quarto  # Mac

# Preview site
cd quarto-version && quarto preview

# Render all formats
cd quarto-version && quarto render

# Render to specific format
quarto render --to pdf    # PDF handouts
quarto render --to docx   # Word documents
```

### Content Development
- Edit static guides in root directory for comprehensive content
- Interactive Jekyll version in `docs/_guides/` with Jekyll front matter
- Quarto evaluation version in `quarto-version/guides/` with .qmd format
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
├── quarto-version/                # Quarto implementation for comparison
│   ├── _quarto.yml               # Quarto configuration
│   ├── index.qmd                 # Homepage
│   ├── guides/                   # Guide content (.qmd format)
│   ├── custom.scss               # Styling
│   └── COMPARISON-NOTES.md       # Jekyll vs Quarto analysis
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