# Codex Review 2-1-26 — Know Your Damned Computer

## Quick Repo Overview (Structure, Deps, Scripts)
- Two implementations: Jekyll site in `docs/` and Quarto port in `quarto-version/`.
- Jekyll dependencies via `docs/Gemfile` (jekyll, minima, jekyll-feed/sitemap/seo-tag). No JS build pipeline.
- Quarto config in `quarto-version/_quarto.yml` with JS assets in `quarto-version/assets/` and `.qmd` guides.
- Development scripts are CLI-based: `bundle exec jekyll serve` (Jekyll) and `quarto preview/render` (Quarto).

## Code Review (Bugs / Risks / Tests)
- No automated tests for interactive JS (quiz engine, terminal simulator, progress tracking). High regression risk.
- Unprotected `localStorage` usage can throw in restricted contexts (private browsing or blocked storage) and break features.
- Reading mode clones `innerHTML` into an overlay; duplicated IDs can cause anchor/ARIA conflicts and unexpected behavior.
- Global document click listener for mobile menu runs on every click; minor perf/maintainability risk.
- Terminal simulator injects CSS at runtime in addition to static CSS, increasing drift risk and extra runtime work.

## Product / UX Critique
- Strong: clear progression, interactive mode + reading mode support learning flow.
- Mobile TOC/guide sidebar is desktop-first; mobile users scroll more and lose context.
- Reading mode lacks focus trapping and ESC to close (accessibility + UX gap).
- Feedback buttons store to localStorage only; no user visibility or export path.

## Performance Audit
- Large, unminified CSS (`docs/assets/css/main.css` ~1,500+ lines).
- Multiple CDN assets (Prism, Font Awesome, Google Fonts) add requests; no SRI hashes.
- Terminal simulator injects CSS at runtime (extra parse/paint).
- Scroll listener for reading progress is not throttled.

## Security Review
- External CDN assets loaded without SRI; harder to lock down with CSP.
- Inline `onclick` handlers in templates reduce CSP strictness.
- Client-side only data is good for privacy, but localStorage should be guarded for failures.

## Prioritized Next Steps (No Code Changes Yet)
### High Priority (Stability + Learner Trust)
1) Add a minimal JS smoke-test harness for quiz engine + terminal sim initialization.
2) Wrap all `localStorage` reads/writes in try/catch with safe fallbacks.
3) Fix reading mode accessibility: focus trap, ESC to close, avoid duplicated IDs.

### Medium Priority (Performance + Maintainability)
4) Consolidate terminal simulator CSS (either all static or all injected, not both).
5) Throttle the scroll handler for reading progress.
6) Reduce CDN surface (self-host or add SRI + preconnect).

### Lower Priority (Polish + Future-Proofing)
7) Replace inline `onclick` handlers with JS listeners to support stricter CSP.
8) Improve mobile TOC UX (sticky or top-of-content mini-nav).
9) Decide a single source of truth (Jekyll vs Quarto) or document a sync strategy.
