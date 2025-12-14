# Quarto Version — Troubleshooting + Next Steps

This TODO is organized around **where problems live** (render vs browser vs deploy) and a clear **definition of “done”** for the Quarto port.

## Definition Of Done (v1)
- [ ] `quarto render` produces **0 warnings** (especially HTML/div warnings)
- [ ] Each guide loads with **0 console errors** on first load
- [ ] Quizzes work (selecting answers shows feedback; state persists after refresh)
- [ ] Terminal simulators work (input works; expected commands respond)
- [ ] Interactive exercises work (any click/inputs behave; no broken layouts)
- [ ] Internal links + images work from `_site/` (not just in the editor)
- [ ] Mobile pass: usable at ~375px width (no overflow; terminal usable)

## Troubleshooting Framing (Use This Order)

### 1) Render-Time (Quarto) Problems
Symptoms:
- Build warnings, missing pages, missing assets, weird page structure
- “Exposed code” like literal triple-backticks showing in the rendered HTML

Most common cause in this project:
- **Markdown nested inside raw HTML blocks** (e.g., a `<div>` wrapper that contains fenced code blocks). In Markdown/Quarto, an HTML block often “swallows” Markdown, so the fenced code becomes literal text.

Fix pattern:
- Prefer Quarto/Markdown divs: `:::{.code-example} ... :::` instead of `<div class="code-example"> ... </div>`
- Keep raw HTML limited to small islands: wrap only the HTML that must be raw in ` ```{=html} ... ``` `, and keep Markdown/code fences outside those islands.

### 2) Browser Runtime Problems (JS/CSS)
Symptoms:
- Console errors, quiz clicks do nothing, terminal doesn’t initialize, progress not persisting

Debug loop:
- Open DevTools → Console → reload page → fix first error
- Confirm scripts load once (avoid double-including), and selectors match the HTML in the guide

### 3) Path/Deploy Problems
Symptoms:
- Works in preview but breaks on GitHub Pages, images missing, links 404

Debug loop:
- Test from `_site/` output (not source `.qmd`)
- Verify `website.site-url`, relative `href` usage, and that required resources are under the project folder so Quarto copies them

## Fast Smoke Test (15 Minutes)
- [ ] `index.qmd`: layout loads; nav works; hero images load
- [ ] `guides/file-management.qmd`: at least 1 quiz works
- [ ] `guides/command-line.qmd`: terminal simulator accepts input + responds
- [ ] `guides/file-paths.qmd`: at least 1 interactive element + 1 code sample renders correctly
- [ ] Refresh any guide and confirm quiz/reading progress persists

## Current Work (Prioritized)
- [ ] **Fix “Exposed Code” at the source** by removing raw `<div class="code-example">` wrappers around fenced code (hotspots: `guides/file-paths.qmd`, `guides/file-formats.qmd`, `guides/command-line.qmd`)
- [ ] **Test interactivity end-to-end** (quizzes, terminals, exercises) and log any console errors with page + reproduction steps
- [ ] **Finalize `about.qmd`** (content + any images/links)
- [ ] **Mobile optimization** (especially the terminal simulator and any wide grids)

## Later (Nice To Have)
- [ ] “Copy to clipboard” for code blocks (either Quarto-native or custom)
- [ ] Automated deployment (GitHub Actions: render + publish `_site/`)
- [ ] PDF output pass (decide what to do with interactive-only sections)
