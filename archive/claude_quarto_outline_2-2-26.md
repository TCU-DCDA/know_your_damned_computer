# Quarto Migration Outline (from Claude)

## Recommendation
**Migrate to Quarto** as the primary platform. The upfront cost (~1-2 days) pays off with significantly reduced long-term maintenance.

## Why Quarto Wins on Maintenance

| Aspect | Jekyll (Current) | Quarto |
|--------|------------------|--------|
| Adding new content | HTML divs for callouts, quizzes | Clean `:::` markdown syntax |
| Built-in features | Custom JS for TOC, search, tabs | Native - zero maintenance |
| Dependencies | Ruby + Bundler + gems | Single binary, no deps |
| Tooling | Aging ecosystem | Active development, modern |
| Format flexibility | HTML only | PDF/Word when students ask |

## Current State Gap

| Content | Jekyll | Quarto |
|---------|--------|--------|
| File Management | ✅ | ✅ |
| File Paths | ✅ | ✅ |
| Compression | ✅ | ✅ |
| File Formats | ✅ | ✅ |
| Command Line | ✅ | ✅ |
| Text Encoding | ✅ | ✅ |
| **Git/Version Control** | ✅ | ❌ Missing |
| **Regular Expressions** | ✅ | ❌ Missing |

## Phase 0 — Decision & Setup
- Designate Quarto as single source of truth
- Archive Jekyll version (keep for reference, stop active development)
- Fix unclosed div warnings in command-line.qmd and file-paths.qmd

## Phase 1 — Content Parity (Day 1)
- Port Git/Version Control guide to `.qmd` format
- Port Regular Expressions guide to `.qmd` format
- Update `_quarto.yml` navbar and sidebar with new guides
- Verify all 8 guides render without warnings

## Phase 2 — Interactive Features (Day 1-2)
- Port `quiz-engine.js` (simplify where Quarto callouts can replace custom HTML)
- Port `terminal-sim.js` (same complexity, embed via raw HTML blocks)
- Consolidate CSS (avoid runtime injection)
- Test quiz feedback and terminal initialization

## Phase 3 — Native Feature Adoption
Replace custom JS with Quarto built-ins:
- ✅ TOC generation → native (already working)
- ✅ Search → native (already working)
- ✅ Dark mode → native theme toggle
- ✅ Tabbed content → `{.panel-tabset}` for Mac/PC instructions
- ❌ Progress tracking → keep custom localStorage (no native equivalent)

## Phase 4 — Polish & Accessibility
- Add focus trapping to reading mode overlay
- Wrap localStorage in try/catch for private browsing
- Replace inline `onclick` handlers with JS listeners
- Mobile TOC improvements (sticky toggle)

## Phase 5 — Deployment
- Set up GitHub Actions for Quarto build
- Configure `quarto publish gh-pages`
- Update repo README with new development workflow
- Deprecate Jekyll paths in documentation

## What Gets Eliminated
~1,000+ lines of custom JS no longer needed:
- `main.js` TOC generation → Quarto native
- `main.js` smooth scrolling → Quarto native
- `main.js` theme toggle → Quarto native
- Custom search implementation → Quarto native

## What Gets Kept/Ported
- `quiz-engine.js` (~400 lines) - core interactive feature
- `terminal-sim.js` (~300 lines) - unique DH learning tool
- Progress tracking (~200 lines) - gamification element

## Exit Criteria
- All 8 guides rendered in Quarto without warnings
- Quizzes functional with feedback
- Terminal simulator initializes correctly
- PDF export works for any guide
- GitHub Pages deployment via Quarto
- Jekyll version archived/deprecated

## Estimated Effort
- **Day 1**: Content parity (port 2 guides) + fix warnings
- **Day 2**: Interactive features (quiz + terminal) + deployment
- **Total**: ~1-2 days for full migration
