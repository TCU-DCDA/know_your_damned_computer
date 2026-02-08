# Quarto Migration Specification

## Goal
Migrate the Jekyll site to Quarto as the primary platform, achieving feature parity.

## Starting Point
- Branch: `quarto-claude` (worktree: `claude/worktree`)
- Existing Quarto scaffold: `quarto-version/`
- Reference Jekyll site: `docs/`

---

## Phase 1: Content Parity ✅
Port missing guides to Quarto `.qmd` format:
- [x] Git/Version Control guide (`guides/version-control.qmd`)
- [x] Regular Expressions guide (`guides/regular-expressions.qmd`)
- [x] Update `_quarto.yml` navbar/sidebar — all 8 guides listed
- [x] Fix unclosed divs in command-line.qmd, file-paths.qmd

**Status:** All 8 guides present: file-management, file-paths, compression, file-formats, command-line, text-encoding, version-control, regular-expressions.

## Phase 2: Interactive Features ✅
Port or reimplement from Jekyll (`docs/assets/js/`):
- [x] Quiz engine — 22 quizzes across all 8 guides (`quiz-engine.js`)
- [x] Terminal simulator — embeds in 5 guides: command-line, file-paths, file-management, file-formats, compression (`terminal-sim.js`)
- [x] Progress tracking — scroll-based with localStorage, sidebar completion badges, dynamic guide count (`progress-tracking.js`)
- [x] Reading mode overlay — distraction-free view with font size controls, focus trapping, keyboard nav (`reading-mode.js`)

**Status:** All four interactive systems ported as modular JS files. Raw HTML blocks used for quiz and terminal embeds in `.qmd` files.

## Phase 3: Native Feature Adoption ✅
Replace custom JS with Quarto built-ins where possible:
- [x] TOC generation → native (`toc: true` in `_quarto.yml`)
- [x] Search → native (`search: true` in navbar)
- [x] Dark mode → native theme toggle (cosmo/darkly dual theme)
- [x] Tabbed content → `{.panel-tabset}` for Mac/PC (used in 4 guides)

**Status:** All four native replacements in place. No custom JS needed for these features.

## Phase 4: Polish & Accessibility ✅
- [x] Focus trapping in reading mode overlay (Tab/Shift+Tab cycling)
- [x] localStorage fallbacks — all JS files use try/catch for private browsing
- [x] Replace inline onclick handlers with JS listeners (exercise buttons use `addEventListener`)
- [x] Mobile TOC improvements (sticky sidebar in `custom.scss`)
- [x] Keyboard navigation — Escape to close reading mode, focus management
- [x] `prefers-reduced-motion` support in SCSS
- [x] `prefers-contrast: high` support for quiz elements
- [x] Skip link for keyboard users
- [x] Removed dead CSS classes (`.callout-dh`, `.difficulty-*`)
- [x] Dynamic guide count in progress tracking (replaces hardcoded value)
- [x] Fixed inclusive language in Jekyll version-control.md ("Master" → "Use")
- [x] Updated copyright year to 2025–2026 in footer
- [x] Removed dead exercises navbar link (no exercises directory exists)

**Status:** Comprehensive accessibility and polish pass complete.

## Phase 5: Deployment ✅
- [x] GitHub Actions workflow for Quarto build (`.github/workflows/quarto-publish.yml`)
- [x] Configure `quarto publish gh-pages` (`quarto-version/_publish.yml`)
- [x] Update README with new workflow (root `README.md` updated with Quarto dev/deploy instructions)

**Status:** Complete. GitHub Actions workflow builds on push to `main`/`quarto-claude`/`quarto-codex`, deploys to GitHub Pages from `main` only.

---

## Feature Parity Checklist
The Quarto site must support:
- [x] Multiple-choice quizzes with immediate feedback (22 quizzes across 8 guides)
- [x] Terminal simulator for safe command practice (5 guides)
- [x] Progress tracking across sessions (scroll-based + completion badges)
- [x] Reading mode (distraction-free view with font controls)
- [x] Dark/light theme toggle (native Quarto cosmo/darkly)
- [x] Responsive mobile layout (sticky sidebar, Quarto responsive grid)
- [x] All 8 guides rendering without errors

## Exit Criteria
- [x] All guides render without warnings
- [x] All checklist features functional
- [x] Clean GitHub Pages deployment (Phase 5)
- [x] No regressions from Jekyll functionality

---

## Remaining Work

### Optional Enhancements
- Add exercises section (currently removed from navbar; could be added later)
- Cross-guide navigation (prev/next links at bottom of each guide)
- Print/PDF export configuration for offline use
