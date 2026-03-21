# KYDC Quarto Version — Smoke Test Checklist

Run after `quarto render`. Open `_site/index.html` in a browser.

## Homepage

- [ ] Hero section renders (title, subtitle, stats bar, buttons)
- [ ] All 6 guide cards display with images/icons
- [ ] Clicking a card navigates to the correct guide
- [ ] Sidebar "Learning Path" appears and sections expand/collapse

## Per-Guide Checks (do at least 1 from each section)

### file-management.qmd
- [ ] Page loads without console errors (open DevTools → Console)
- [ ] Quiz renders and accepts a click — correct/incorrect feedback appears
- [ ] Panel-tabset (Mac/PC) switches between tabs
- [ ] Callout boxes render with proper styling (tip, note, important, warning)

### command-line.qmd
- [ ] Panel-tabset (Mac Terminal / PC PowerShell) switches correctly
- [ ] Terminal simulator initializes (you see a prompt, can type a command)
- [ ] Type `ls` in the terminal sim — get a response
- [ ] Callout-tip inside the PC tab renders (not as literal `:::` text)

### compression.qmd
- [ ] Panel-tabset (Mac/PC) in Exercise 1 switches correctly
- [ ] Quiz blocks render and accept clicks
- [ ] Terminal simulator loads for compression commands section
- [ ] Exercise "Mark Complete" button is clickable

### file-paths.qmd
- [ ] Code blocks render with syntax highlighting (not as literal text)
- [ ] Quiz block works
- [ ] Interactive path exercise renders (if JS-dependent, check console)

### file-formats.qmd
- [ ] Python code blocks render with syntax highlighting
- [ ] Troubleshooting cards display properly (not broken HTML)
- [ ] Quiz works

### text-encoding.qmd
- [ ] Encoding cards (ASCII, UTF-8) render styled
- [ ] Quiz works
- [ ] Interactive exercises render

## Code Block Rendering (Critical)

- [ ] Fenced code blocks show as formatted, highlighted code — NOT as literal backtick text
- [ ] Check at least one Python block, one Bash block, and one generic code block across different guides

## Dark Mode (if applicable)

- [ ] If Quarto theme has dark mode toggle, switching works without breaking layout

## Mobile (375px)

- [ ] Resize browser to 375px width (or use DevTools device emulation)
- [ ] Sidebar collapses or becomes a hamburger/overlay
- [ ] Content is readable without horizontal scrolling
- [ ] Terminal simulator is usable (input field accessible, not cut off)
- [ ] Quiz options are tappable

## Navigation

- [ ] Navbar links (Guides, Exercises, About) work
- [ ] Sidebar links navigate to correct guides
- [ ] Right-side TOC (if present) scrolls to correct sections
- [ ] Footer renders with correct copyright (2026) and license link

## Known Gotchas to Watch For

- Literal `:::` appearing as visible text on any page → fenced div problem
- Code blocks showing raw markdown backticks → HTML/markdown nesting issue
- Terminal sim not appearing on first load → check console for JS errors, try refresh
- Quiz clicks doing nothing → check console for quiz-engine.js load errors
