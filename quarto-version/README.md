# Know Your Damned Computer - Quarto Version

This is a Quarto implementation of the "Know Your Damned Computer" educational resource for comparison with the Jekyll version.

## Key Differences from Jekyll Version

### Quarto Advantages

1. **Native Academic Features**
   - Built-in callouts (tip, note, warning, important)
   - Cross-references with @sec-id syntax
   - Tabbed content for platform-specific instructions
   - Automatic table of contents and numbering
   - Citation and bibliography support

2. **Simpler Markdown**
   - Less HTML needed for common elements
   - Cleaner YAML front matter
   - Native support for code execution
   - Better handling of figures and tables

3. **Multi-Format Output**
   - HTML (current)
   - PDF via LaTeX
   - Word documents
   - ePub for e-readers
   - RevealJS presentations

4. **Interactive Code**
   - Can embed executable Python/R code
   - WebR for interactive R demonstrations
   - Great for teaching programming concepts

### What We Lose from Jekyll

1. **Custom JavaScript interactivity** - Would need to be reimplemented
   - Quiz engine (custom JS)
   - Terminal simulator (custom JS)
   - Progress tracking (custom JS)

2. **GitHub Pages integration** - Requires different deployment approach
3. **Full control over HTML structure** - Quarto templates less flexible

## Setup

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

This will open a live-reloading preview in your browser.

### Build the Site

```bash
cd quarto-version
quarto render
```

Output will be in `_site/` directory.

## Project Structure

```
quarto-version/
├── _quarto.yml           # Main configuration
├── index.qmd             # Homepage
├── guides/               # Learning modules
│   ├── file-management.qmd
│   ├── file-paths.qmd
│   └── compression.qmd
├── custom.scss           # Styling
└── README.md            # This file
```

## Quarto Features Demonstrated

### In file-management.qmd

- ✅ Callout blocks (tip, note, warning, important)
- ✅ Tabbed content (Mac/PC instructions)
- ✅ Cross-references to sections and tables
- ✅ Collapsible details/summary
- ✅ Code blocks with syntax highlighting
- ✅ Tables with captions and IDs
- ✅ Learning objectives boxes
- ✅ Exercise sections

### Not Yet Implemented

- ⏳ Interactive quizzes (would need Quarto extension or custom JS)
- ⏳ Terminal simulator (would need custom implementation)
- ⏳ Progress tracking (would need custom solution)
- ⏳ Executable code demonstrations

## Deployment Options

### GitHub Pages

1. Build site: `quarto render`
2. Push `_site/` directory to `gh-pages` branch
3. Or use GitHub Actions for automatic builds

### Netlify/Vercel

Connect your repo and these platforms auto-detect Quarto projects.

### Quarto Pub

```bash
quarto publish quarto-pub
```

Free hosting specifically for Quarto sites.

## Comparison Summary

**Choose Quarto if you want:**
- Multi-format output (HTML + PDF + Word)
- Academic publishing features
- Executable code demonstrations
- Simpler markdown syntax
- Built-in educational features

**Stay with Jekyll if you want:**
- Full control over JavaScript interactivity
- Easier GitHub Pages deployment
- Custom quiz/exercise engines
- Terminal simulation
- Already invested in custom features

## Next Steps

To continue developing the Quarto version:

1. Convert remaining guides (compression, command-line, etc.)
2. Explore Quarto extensions for interactivity
3. Implement quiz functionality (possibly with webr or custom JS)
4. Add executable code examples where appropriate
5. Test PDF output for printable handouts
