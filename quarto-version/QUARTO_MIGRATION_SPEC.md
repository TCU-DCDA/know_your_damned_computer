# Quarto Migration Specification

## Goal
Migrate the Jekyll site to Quarto as the primary platform, achieving feature parity.

## Starting Point
- Branch: `quarto-claude` or `quarto-codex` (from `2nd-edition`)
- Existing Quarto scaffold: `quarto-version/`
- Reference Jekyll site: `docs/`

## Phase 1: Content Parity
Port missing guides to Quarto `.qmd` format:
- [ ] Git/Version Control guide (source: `git-version-control.md` in repo root)
- [ ] Regular Expressions guide (source: `regular-expressions.md` in repo root)
- Update `_quarto.yml` navbar/sidebar
- Fix any existing warnings (unclosed divs in command-line.qmd, file-paths.qmd)

## Phase 2: Interactive Features
Port or reimplement from Jekyll (`docs/assets/js/`):
- [ ] Quiz engine — quizzes with immediate feedback (reference: `quiz-engine.js`)
- [ ] Terminal simulator — command line practice (reference: `terminal-sim.js`; simplification encouraged if it improves stability)
- [ ] Progress tracking (localStorage-based)
- [ ] Reading mode overlay

Embed via raw HTML blocks in `.qmd` files where needed. Reimplementation with simpler approaches is acceptable if functionality is preserved.

## Phase 3: Native Feature Adoption
Replace custom JS with Quarto built-ins where possible:
- TOC generation → native
- Search → native
- Dark mode → native theme toggle
- Tabbed content → `{.panel-tabset}` for Mac/PC

## Phase 4: Polish & Accessibility
- Focus trapping in overlays
- localStorage fallbacks (try/catch for private browsing)
- Replace inline onclick handlers with JS listeners
- Mobile TOC improvements
- Keyboard navigation audit

## Phase 5: Deployment
- GitHub Actions workflow for Quarto build
- Configure `quarto publish gh-pages`
- Update README with new workflow

## Feature Parity Checklist
The Quarto site must support:
- [ ] Multiple-choice quizzes with immediate feedback
- [ ] Terminal simulator for safe command practice
- [ ] Progress tracking across sessions
- [ ] Reading mode (distraction-free view)
- [ ] Dark/light theme toggle
- [ ] Responsive mobile layout
- [ ] All 8 guides rendering without errors

## Exit Criteria
- All guides render without warnings
- All checklist features functional
- Clean GitHub Pages deployment
- No regressions from Jekyll functionality
