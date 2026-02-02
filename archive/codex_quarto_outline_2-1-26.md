# Quarto Feature-Parity Outline (from Codex)

## Goal
Bring the Quarto version to feature parity with the Jekyll site while keeping the modern landing page and enabling multi-format output.

## Phase 0 — Decision & Baseline
- Choose Quarto as the single source of truth (freeze Jekyll or mark it legacy).
- Define “parity” list: quizzes, terminal simulator, progress tracking, reading mode, feedback, TOC behavior.
- Capture current Jekyll UX as reference snapshots.

## Phase 1 — Core Interactivity (Highest Value)
- Port quiz engine behavior (JS + HTML blocks in `.qmd`).
- Integrate quiz styling + feedback states into Quarto theme.
- Add minimal smoke tests or manual QA checklist.

## Phase 2 — Terminal Simulator
- Embed terminal simulator via raw HTML blocks.
- Ensure CSS is consolidated (avoid runtime injection where possible).
- Validate mobile behavior and initialization timing.

## Phase 3 — Progress Tracking + Reading Mode
- Port progress tracking (localStorage + scroll logic).
- Implement reading mode overlay with accessibility improvements.
- Add export/import for progress if desired.

## Phase 4 — UX Parity + Polish
- Match Jekyll sidebar/TOC behavior (collapse sections, active highlights).
- Add mobile TOC affordances (sticky toggle or mini-nav).
- Replace inline handlers with JS listeners for CSP compatibility.

## Phase 5 — Performance + Security
- Add SRI or self-host external assets.
- Throttle scroll handlers.
- Audit localStorage failures and add safe fallbacks.

## Phase 6 — Documentation + Deployment
- Document contributor workflow in a single README.
- Add GitHub Actions build for Quarto and publish to `gh-pages`.
- Deprecate Jekyll paths or archive them.

## Exit Criteria
- Feature parity achieved (quizzes, terminal, progress tracking, reading mode).
- Quarto build publishes cleanly to GitHub Pages.
- A11y checks pass for keyboard-only flow.
