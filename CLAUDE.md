
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



The rest of this file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive digital humanities educational resource called "Know Your Damned Computer". It's a Quarto-based website that teaches computer fundamentals to DH students, covering file management, command line basics, version control, regular expressions, and technical skills needed for digital projects.

## Architecture

### Content Structure
- **Interactive guides**: `quarto-version/guides/` contains 8 Quarto-formatted guides (`.qmd`) with embedded quizzes, terminal simulators, and tabbed Mac/PC instructions
- **Quarto site**: `quarto-version/` directory contains the full interactive website built with Quarto
- **Jekyll site (legacy)**: `docs/` directory contains the original Jekyll version, kept for reference

### Key Components

#### Quarto Configuration (`quarto-version/_quarto.yml`)
- Dual theme: cosmo (light) / darkly (dark) with native toggle
- GitHub Pages deployment via GitHub Actions
- Navbar with guide dropdown, sidebar with learning path sections
- Full-text search enabled

#### Interactive Features (`quarto-version/assets/js/`)
- `quiz-engine.js`: Multiple choice quizzes with immediate feedback (22 quizzes across 8 guides), uses Bootstrap CSS variables for dark/light mode compatibility
- `terminal-sim.js`: Command line simulation with virtual filesystem for safe practice
- `progress-tracking.js`: Scroll-based progress tracking with localStorage, sidebar completion badges, dynamic guide count
- `reading-mode.js`: Distraction-free reading overlay with font controls, focus trapping, keyboard navigation

#### Script Loading (`quarto-version/includes/footer-scripts.html`)
- Dynamic script loader that auto-detects site root from Quarto's `site_libs` link tags
- Resolves correct relative paths for both root and nested guide pages
- Note: Quarto's `js:` YAML key does NOT inject `<script>` tags — the dynamic loader is required

#### Styling (`quarto-version/custom.scss`)
- Bootstrap color variable overrides (do NOT set `$body-bg` or `$body-color` — they break dark mode)
- Quiz container, terminal simulator, and landing page styles
- Accessibility: skip links, focus styles, `prefers-reduced-motion`, `prefers-contrast: high`

### Guides (8 total)
1. File Management (Beginner)
2. File Paths (Beginner)
3. Compression (Beginner)
4. File Formats (Beginner)
5. Command Line (Intermediate)
6. Text Encoding (Intermediate)
7. Git & Version Control (Intermediate)
8. Regular Expressions (Advanced)

### Deployment
- **Live deployment**: https://tcu-dcda.github.io/know_your_damned_computer/
- **GitHub Actions**: `.github/workflows/quarto-publish.yml` builds on push, deploys from `main` only
- **Branch strategy**: `2nd-edition` is the development branch, `main` is production

## Development Commands

### Quarto Development (Primary)
```bash
# Install Quarto: https://quarto.org/docs/get-started/
brew install quarto   # Mac

# Preview with live reload
cd quarto-version && quarto preview

# Build for production
cd quarto-version && quarto render

# Publish to GitHub Pages
cd quarto-version && quarto publish gh-pages
```

### Jekyll Development (Legacy)
```bash
# Install dependencies (first time setup)
cd docs && bundle install

# Run local development server
cd docs && bundle exec jekyll serve
```

### Testing
- Preview with `quarto preview` before committing
- Verify dark mode toggle works on all pages
- Check quiz feedback visibility in both light and dark mode
- Test terminal simulator commands: `ls`, `cd`, `mkdir`, `pwd`
- Verify cross-platform compatibility (Mac/PC tabbed instructions)
- Check responsive design and accessibility features

## File Organization

```
├── quarto-version/                # Quarto site (active development)
│   ├── _quarto.yml               # Main configuration (dual theme, navbar, sidebar)
│   ├── _publish.yml              # GitHub Pages publish config
│   ├── index.qmd                 # Landing page (hero + bento card grid)
│   ├── about.qmd                 # About page
│   ├── custom.scss               # Theme customizations (Bootstrap vars)
│   ├── guides/                   # 8 learning modules (.qmd format)
│   ├── assets/js/                # Interactive features (4 JS modules)
│   └── includes/                 # HTML includes (dynamic script loader)
├── docs/                         # Jekyll site (legacy, kept for reference)
├── .github/workflows/            # CI/CD
│   └── quarto-publish.yml        # Automated Quarto build & deploy
├── QUARTO_MIGRATION_SPEC.md      # Migration tracking (all phases complete)
├── CLAUDE.md                     # This file
└── README.md                     # Project overview
```

## Key Principles

- **Beginner-friendly**: Content progresses from basic to advanced concepts
- **Cross-platform**: Equal support for Mac and PC users
- **Interactive**: Hands-on exercises with immediate feedback
- **DH-focused**: Examples and contexts relevant to digital humanities work
- **Accessible**: Screen reader support, keyboard navigation, responsive design
- **Inclusive language**: Use learning-focused terms (learn, understand, become proficient) rather than hierarchical language (master, slave, etc.)

## Important Technical Notes

- **Dark mode**: Quarto's dual-theme toggle requires `light:` and `dark:` keys under `theme:` in `_quarto.yml`. Never define `$body-bg` or `$body-color` in `custom.scss` — they override both themes' `:root` block.
- **JS injected styles**: Quiz and terminal styles are injected via JavaScript. Always use Bootstrap CSS variables (`--bs-body-bg`, `--bs-border-color`, `--bs-success-bg-subtle`, etc.) — never Jekyll-style custom variables.
- **Reserved words**: JavaScript strict mode forbids `package`, `private`, `public`, etc. as variable names.
- **Cross-links**: Use relative `.qmd` links between guides (e.g., `file-paths.qmd`), never Jekyll `{{ site.baseurl }}` syntax.