# Know Your Damned Computer - Quarto Version

This is the Quarto implementation of the "Know Your Damned Computer" educational resource, achieving feature parity with the original Jekyll version.

## Current Status (February 2026)

- **All 8 guides ported** to `.qmd` format
- **Interactive features**: Quizzes, terminal simulator, progress tracking, reading mode
- **Native Quarto features**: Dark/light theme toggle, search, responsive TOC
- **Accessibility**: Focus trapping, keyboard navigation, reduced motion support
- **Deployment**: GitHub Actions workflow for automatic publishing

## Features

### Interactive Learning
- **Multiple-choice quizzes** with immediate feedback
- **Terminal simulator** for safe command-line practice
- **Progress tracking** across sessions (localStorage)
- **Reading mode** for distraction-free study

### Native Quarto Features
- Built-in dark/light theme toggle
- Automatic table of contents
- Full-text search
- Tabbed content (`{.panel-tabset}`) for Mac/PC instructions
- Callout blocks (tip, note, warning, important)
- Cross-references and section navigation

### Output
- HTML (primary, deployed to GitHub Pages)

## Development

### Prerequisites

Install Quarto from [quarto.org](https://quarto.org):

```bash
# Mac (with Homebrew)
brew install quarto

# Or download installer from quarto.org
```

### Preview the Site

```bash
cd quarto-version
quarto preview
```

This opens a live-reloading preview in your browser.

### Build the Site

```bash
cd quarto-version
quarto render
```

Output will be in `_site/` directory.

### Render to Other Formats

```bash
# PDF (requires LaTeX)
quarto render guides/file-management.qmd --to pdf

# Word document
quarto render guides/file-management.qmd --to docx
```

## Project Structure

```
quarto-version/
├── _quarto.yml           # Main configuration
├── index.qmd             # Homepage
├── about.qmd             # About page
├── guides/               # Learning modules (8 guides)
│   ├── file-management.qmd
│   ├── file-paths.qmd
│   ├── compression.qmd
│   ├── file-formats.qmd
│   ├── command-line.qmd
│   ├── text-encoding.qmd
│   ├── version-control.qmd
│   └── regular-expressions.qmd
├── assets/
│   └── js/               # Interactive features
│       ├── quiz-engine.js
│       ├── terminal-sim.js
│       ├── progress-tracking.js
│       └── reading-mode.js
├── custom.scss           # Theme customizations
└── includes/             # HTML includes
```

## Deployment

### GitHub Actions (Automatic)

The repository includes a GitHub Actions workflow (`.github/workflows/quarto-publish.yml`) that:
1. Builds the Quarto site on push to `main`
2. Deploys to GitHub Pages

### Manual Deployment

```bash
# Option 1: Quarto's built-in publish
quarto publish gh-pages

# Option 2: Build and push manually
quarto render
# Then push _site/ to gh-pages branch
```

### Quarto Pub (Alternative)

```bash
quarto publish quarto-pub
```

## Keyboard Shortcuts

- **R** - Toggle reading mode
- **Esc** - Close reading mode or overlays
- **Tab** - Navigate interactive elements

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Contributing

1. Create a new branch from `2nd-edition`
2. Make changes to `.qmd` files in `guides/`
3. Test with `quarto preview`
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
