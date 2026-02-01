# Interactive DH Computer Skills Resource - Progress & Status

## Project Overview
An interactive, web-based resource to help college students understand their computers for digital humanities work. Designed for beginners working with Python/VS Code on text analysis, data visualization, and mapping projects.

**Live Site:** [https://tcu-dcda.github.io/know_your_damned_computer/](https://tcu-dcda.github.io/know_your_damned_computer/)

## Current Status: A- Grade Resource (February 2026)

### 8 Interactive Guides Complete

| Guide | Difficulty | Time | Status |
|-------|------------|------|--------|
| File Management | Beginner | 20 min | ✅ Complete |
| File Paths | Beginner | 25 min | ✅ Complete |
| Compression | Beginner | 20 min | ✅ Complete |
| File Formats | Beginner | 30 min | ✅ Complete |
| Command Line | Intermediate | 45 min | ✅ Complete |
| Text Encoding | Intermediate | 35 min | ✅ Complete |
| Git & Version Control | Intermediate | 50 min | ✅ Complete |
| **Regular Expressions** | Intermediate | 45 min | ✅ **NEW** |

### Recent Updates (February 2026)

#### Regular Expressions Guide Added
- Comprehensive guide covering regex basics through Python integration
- Interactive quizzes with DH-focused scenarios
- Pattern reference for common DH tasks (dates, names, prices, cleaning)
- Practice exercises with historical document examples
- Debugging strategies and recommended tools

#### Git & Version Control Guide Added
- Comprehensive guide covering Git basics through GitHub collaboration
- GitHub Desktop section for GUI-preferring users
- Interactive quizzes with improved, clearer prompts
- Branching, .gitignore, and recovery from mistakes
- Real DH workflow examples

#### Technical Improvements
- Fixed hard-coded guide count in progress.js (now dynamic)
- Updated homepage to show 8 guides
- Improved quiz prompts across guides for clarity
- Archived deprecated static .md files

## Technical Architecture

### Jekyll Site Structure
```
docs/
├── _config.yml              # Jekyll configuration
├── index.html               # Landing page (8 guides)
├── _layouts/                # Page templates
│   ├── default.html
│   ├── guide.html
│   └── exercise.html
├── _guides/                 # Interactive guide content
│   ├── file-management.md   ✅
│   ├── file-paths.md        ✅
│   ├── compression.md       ✅
│   ├── file-formats.md      ✅
│   ├── command-line.md      ✅
│   ├── text-encoding.md     ✅
│   ├── version-control.md   ✅
│   └── regular-expressions.md ✅ NEW
└── assets/
    ├── css/main.css         # Styling
    └── js/                   # Interactive functionality
        ├── main.js           # Core features
        ├── quiz-engine.js    # Quiz system
        └── terminal-sim.js   # Terminal simulation
```

### Key Features
- **Responsive Design**: Desktop, tablet, and mobile support
- **Accessibility**: ARIA labels, keyboard navigation, reduced-motion support
- **Theme Support**: Light/dark mode toggle
- **Cross-Platform**: Mac and PC specific guidance
- **Interactive Elements**: Quizzes, exercises, terminal simulation

## Remaining Development Priorities

### High Priority
1. ~~**Regular Expressions Guide**~~ ✅ Complete - Essential for text processing
2. **Add linting** - ESLint and Stylelint for code quality
3. **Modularize CSS** - Convert to SCSS with partials

### Medium Priority
4. **Improve terminal realism** - Dynamic outputs, path arguments
5. **Add automated testing** - Unit tests for quiz-engine.js
6. **TEI XML handling** - DH-specific markup guide

### Low Priority / Future
7. **Cumulative assessments** - Multi-guide practical exercises
8. **API and web scraping guide** - Data collection for DH
9. **Database fundamentals** - SQLite for DH projects

## Quarto Evaluation

A parallel Quarto implementation exists in `quarto-version/` for comparison.

**Current Decision:** Stay with Jekyll for primary development due to:
- Significant investment in custom interactive features (quiz engine, terminal simulator)
- Working GitHub Pages deployment
- Interactive web content is the primary use case

**Quarto may be useful for:**
- Generating PDF handouts for offline use
- Academic publication materials
- Future courses with executable code demonstrations

See `quarto-version/COMPARISON-NOTES.md` for detailed analysis.

## Quality Metrics

### Current Assessment (from CRITIQUE.md)
- **Overall Grade:** A- (8.5/10)
- **Content Quality:** 9/10 - Comprehensive, DH-focused, now includes Git
- **Pedagogical Design:** 9/10 - Excellent scaffolding
- **Interactive Features:** 8.5/10 - Good quizzes, terminal works

### Learning Outcomes Achieved
- ✅ Beginner-friendly explanations with progressive difficulty
- ✅ Hands-on practice with immediate feedback
- ✅ Real DH project examples throughout
- ✅ Cross-platform (Mac/PC) guidance
- ✅ Complete pathway from file management to regex text processing

---

*This resource eliminates the "I don't understand computers" barrier that prevents students from engaging effectively with digital humanities projects.*
