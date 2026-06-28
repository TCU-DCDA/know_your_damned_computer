# Know Your Damned Computer — Second Edition Plan

**Date:** March 21, 2026
**Platform:** Quarto (main repo `quarto-version/`)
**Design direction:** Terminal Chic
**Live mockup:** `terminal-chic-mockup.html` (in this directory)

---

## Decision: Quarto Is the Path Forward

The Jekyll version (`docs/`) served its purpose and remains live at https://tcu-dcda.github.io/know_your_damned_computer/. The second edition develops exclusively in `quarto-version/`.

**Why Quarto over Jekyll:**

- Jekyll is functionally frozen; GitHub has deprioritized it and Ruby/Bundler dependency management is increasingly fragile.
- All six guides have already been ported to .qmd format.
- The custom JS (quiz engine, terminal simulator, progress tracking) has been carried over and works.
- Multi-format output (HTML + PDF handouts + Word) from the same source — something students and instructors actually need.
- Cleaner markdown (native callouts, `panel-tabset` for Mac/PC) makes content easier to maintain.
- Quarto's `_brand.yml` support enables centralized theming across all DCDA textbooks.
- The `_shared/` theme infrastructure already exists in `textbooks/_shared/` and MALA60970-textbook is already consuming it.

**Why the main repo's `quarto-version/` over the worktree variants:**

- `know_your_damned_computer-codex` is paused (Feb 2026) with known bugs: `package` variable naming issue in terminal-sim.js, mobile TOC selector mismatches.
- `know_your_damned_computer-claude` has a migration spec but similar incomplete status.
- Both are diverged branches doing parallel work. Cleaner to develop from main and cherry-pick any useful fixes from those worktrees if needed.

---

## Design: Terminal Chic

The visual identity for the second edition is "Terminal Chic" — a dark-mode-first aesthetic that blends code-editor precision with humanities elegance.

**See:** `terminal-chic-mockup.html` for a working preview.

### Typography — "Digital + Humanities" Mix

| Role | Font | Why |
|------|------|-----|
| Headlines | Fraunces (Display Serif) | Grounds the site in academic tradition; character-rich and distinctive |
| Body text | Inter (Sans-Serif) | Clean, high-legibility, optimized for screens |
| UI / Metadata / Code | JetBrains Mono (Monospace) | Buttons, chips, stats, code blocks — the "digital" voice |

### Color Palette

| Element | Value | Usage |
|---------|-------|-------|
| Background | `#111111` | Primary surface — deep charcoal, not black |
| Surface | `#1A1A1A` | Cards, elevated elements |
| Text | `#EAEAEA` | Primary body text — off-white for readability |
| Text muted | `#666666` | Labels, metadata |
| TCU Purple | `#4B2E83` | Accent glow only — gradients, button highlights, hover borders. Not a wall. |
| Blue | `#2780e3` | Links, interactive elements |
| Green | `#059669` | Beginner badges, success states |
| Amber | `#d97706` | Intermediate badges, warnings |
| Red | `#dc2626` | Advanced badges, errors |

### Layout

- **Hero:** Mesh gradient background (purple, deep blue, black) with faint code-texture watermark at 4–5% opacity. Glass-morphism stats bar. Pill-shaped CTAs.
- **Guide cards:** Bento grid (3-column, responsive). 1px border, 12px radius, hover lift + purple glow. Difficulty chips in monospace.
- **Guide pages:** Docked sidebar with learning path. Right-side TOC. Panel tabsets for Mac/PC content. Native Quarto callouts.
- **Footer:** Monospace, understated. Copyright, license, GitHub link.

### Relationship to DCDA Shared Theme

Terminal Chic is KYDC's distinct visual identity. It should:
- Use the shared `_shared/theme/_variables.scss` for common DCDA values (spacing, base colors).
- Override with its own SCSS for the dark-mode-first palette, Fraunces/JetBrains Mono typography, and mesh gradients.
- Share JS modules (`quiz-engine.js`, `progress.js`, `terminal-sim.js`) via `_shared/js/`.

MALA60970 uses a separate aesthetic (Lux + Bookup hybrid — light-mode-first, Roboto, editorial uppercase headings). The two textbooks should feel like siblings in the same program, not clones of each other.

---

## Current State of the Quarto Version

### What's done

- All six guides ported: file-management, file-paths, compression, file-formats, command-line, text-encoding
- Quiz engine JS ported and functional
- Terminal simulator JS ported and functional
- Progress tracking JS ported
- `_quarto.yml` configured with navbar, sidebar ("Learning Path"), and footer
- Homepage (`index.qmd`) with hero section and bento card grid
- `about.qmd` stub exists
- `_extensions/quiz/quiz.lua` filter created
- Terminal Chic theme partially applied via shared SCSS
- `COMPARISON-NOTES.md` documents Jekyll vs Quarto tradeoffs
- `TODO.md` has a clear Definition of Done checklist

### What's not done (from TODO.md)

- [ ] `quarto render` produces 0 warnings (especially HTML/div warnings from markdown-inside-raw-HTML)
- [ ] Each guide loads with 0 console errors on first load
- [ ] All interactive exercises work (click/input behavior, no broken layouts)
- [ ] Internal links and images verified from `_site/` (not just editor)
- [ ] Mobile pass: usable at ~375px width (no overflow, terminal usable)
- [ ] `about.qmd` finalized
- [ ] Footer copyright updated to 2026
- [ ] Terminal Chic design fully applied to all pages (currently partial)

### Known bugs to fix

1. **Terminal simulator strict mode:** `package` variable name is a reserved word in strict mode. Rename to `pkgName`.
2. **Mobile TOC toggle:** Selector checks `.toc` but Quarto uses `#TOC` and `nav[role="doc-toc"]`. Update selector.
3. **Markdown inside raw HTML:** Several guides use `<div>` wrappers around fenced code blocks, causing Quarto to render them as literal text. Convert to Quarto `:::` div syntax.
4. **Compression guide:** Still uses custom `.platform-tabs`; convert to `.panel-tabset` for Quarto-native tabs.

---

## Audience & Framing: The AI Angle

The first edition spoke to one audience: the DH student who doesn't understand their computer and needs to before they can do meaningful digital work. The second edition speaks to that audience and a second one: the student who uses AI tools and assumes computer literacy is now optional. It isn't — it's more necessary than ever.

**The core argument (for the introduction, not the whole book):** AI assistance — whether it's asking ChatGPT to debug an error, prompting Copilot to scaffold a project, or vibecoding an entire site — only works well when you understand what's happening on your machine. You need to know file paths to tell the AI where things are. You need to understand the command line to evaluate the terminal commands it gives you. You need to grasp text encoding to catch when your corpus and your script disagree about character sets. The students who struggle most with AI tools aren't the ones who lack ideas — they're the ones who can't navigate, describe, or verify what the AI produces.

**Implementation — light touch, not a rewrite:**

- **Introduction:** Add a short section (2–3 paragraphs) acknowledging that AI tools exist and are encouraged, then making the case that KYDC is the prerequisite for using them effectively, not the alternative to them. Whether you're hand-coding or vibecoding, these fundamentals are the foundation.
- **Per-guide callouts:** Add a brief recurring element — a callout box or sidebar, something like *"Why this matters when you're working with AI"* — to each guide. One per guide, not one per section. Examples:
  - **File Paths:** "AI can't find your file if you can't describe where it is."
  - **Command Line:** "AI will give you terminal commands. You need to know what they do before you run them."
  - **Text Encoding:** "AI won't tell you your corpus is UTF-16 when your script expects UTF-8."
  - **File Management:** "A messy file system confuses you and the AI equally."
  - **Compression:** "When AI tells you to untar a dataset, you need to know what that means."
  - **File Formats:** "AI-generated code assumes a format. If it assumed wrong, you need to catch it."
- **No standalone AI chapter.** The book isn't about AI. It's about understanding your computer — which happens to be what makes AI tools useful.

---

## Second Edition Content Plan

### Phase 1: Stabilize (Priority: High)

Goal: Get the existing six guides to a clean, shippable state.

1. Fix all build warnings (`quarto render` → 0 warnings)
2. Fix the four known bugs listed above
3. End-to-end QA: quizzes, terminal sim, exercises in every guide
4. Mobile optimization pass (375px minimum)
5. Apply Terminal Chic design to all pages (homepage, guides, exercises, about)
6. Finalize `about.qmd` with course context and contributor info
7. Update footer to 2026; update `_quarto.yml` metadata
8. Verify all internal links and images from rendered `_site/`

### Phase 2: New Content (Priority: Medium)

Goal: Expand from six to nine guides. KYDC is a tool for newbies, not a DH methods book. New content stays foundational.

**Revised guide list (9 total):**

| # | Guide | Status | Notes |
|---|-------|--------|-------|
| 1 | File Management Fundamentals | Existing — **deepen** | Add cloud storage/sync section (Google Drive, Dropbox, iCloud vs. local files vs. Git) |
| 2 | Understanding File Paths | Existing | |
| 3 | Working with Compressed Files | Existing | |
| 4 | Essential File Formats for DH | Existing | |
| 5 | Command Line Basics | Existing — **deepen** | Add package managers (pip, conda) and virtual environments section |
| 6 | Text Encoding & Character Sets | Existing | |
| 7 | **Environment Setup** | **New** | "Chapter 0" — installing Python, VS Code, terminal basics, Git. The guide students do first. |
| 8 | **Version Control with Git** | **New** | Partially written in Jekyll `_site/guides/version-control`. Critical for all DCDA courses. |
| 9 | **Introduction to Regular Expressions** | **New** | Partially written in Jekyll `_site/guides/regular-expressions`. Intro-level, pattern-matching focused, no deep theory. |

**Dropped from earlier plan:**
- Working with APIs — belongs in course-specific material (WRIT20833), not foundational computing
- DH-specific content (TEI XML, Dublin Core, metadata standards, digital archive workflows, corpus preparation) — belongs in course-specific material, not KYDC

**Also add across all guides:**
- AI callouts: one "Why this matters when you're working with AI" callout per guide (see Audience & Framing section above for examples)
- Troubleshooting/debugging content woven into each guide rather than as a standalone guide; each guide already has troubleshooting sections, deepen them

All new guides follow the established pattern: concept → real examples → common mistakes → practice exercises.

### Phase 3: Enhanced Interactivity (Priority: Medium)

1. Terminal simulator enhancement: full file system simulation, guided tutorial sequences, safety mechanisms for destructive commands.
2. Progress dashboard: visual progress across all guides, completion tracking per section.
3. File drag-and-drop exercises for file management guide.
4. Interactive path resolution tool with step-by-step validation.

### Phase 4: Integrated Chatbot (Priority: Medium — Provisional)

KYDC is deployed as self-paced pre-work before courses start. No instructor is available when students get stuck. An integrated chatbot serves as the teaching assistant for a resource that has no teaching assistant.

**Approach:** Embed a context-aware chat widget directly in the guide pages, not a standalone chatbot page. The chatbot should know which guide the student is on so they don't have to explain what they're working on.

**Scope (provisional — needs further scoping before implementation):**
- Trained on KYDC guide content so answers use the vocabulary students just learned
- Context-aware: knows the current guide and section
- Focused on troubleshooting: "my file path doesn't work," "the terminal says permission denied," "my text looks garbled"
- Not a general-purpose AI assistant — scoped to KYDC topics
- Implementation options: custom JS widget with API backend, or integration with existing MALA/WRIT chatbot architecture

**Open questions:**
- API backend: OpenAI, Anthropic, or university-provided?
- Cost model: per-student usage, institutional license, or free tier?
- Privacy: student data handling, conversation logging
- Fallback: what happens when the chatbot can't help? Escalation path?

This is marked provisional. Scope further before committing development time.

### Phase 5: Publishing & Deployment (Priority: High, after Phase 1)

1. Deploy Quarto version to GitHub Pages (replaces Jekyll version at same URL).
2. Generate PDF handouts for each guide (`quarto render --to pdf`).
3. Set up GitHub Actions for automated render + publish on push.
4. Decide: keep Jekyll version accessible at an archive URL, or retire it.
5. Add lightweight, privacy-friendly analytics (Plausible or GoatCounter — no cookies, GDPR-compliant, free for open source). One line in the Quarto `_quarto.yml` include-in-header. Tracks page views, unique visitors, and per-guide engagement to inform content priorities.

---

## File Structure (Target)

```
know_your_damned_computer/
├── docs/                          # Jekyll version (archived, read-only)
├── quarto-version/                # SECOND EDITION — active development
│   ├── _quarto.yml               # Site config
│   ├── _brand.yml                # Terminal Chic brand definition (to create)
│   ├── _extensions/
│   │   └── quiz/quiz.lua         # Quiz filter
│   ├── index.qmd                 # Homepage (hero + bento grid)
│   ├── about.qmd                 # About page
│   ├── guides/
│   │   ├── file-management.qmd   # ✅ Ported
│   │   ├── file-paths.qmd        # ✅ Ported
│   │   ├── compression.qmd       # ✅ Ported
│   │   ├── file-formats.qmd      # ✅ Ported
│   │   ├── command-line.qmd      # ✅ Ported
│   │   ├── text-encoding.qmd     # ✅ Ported
│   │   ├── version-control.qmd   # 📝 Phase 2
│   │   └── regular-expressions.qmd # 📝 Phase 2
│   ├── exercises/
│   │   └── index.qmd
│   ├── assets/
│   │   ├── css/page-ui.css
│   │   └── js/
│   │       ├── page-ui.js
│   │       ├── quiz-engine.js
│   │       ├── terminal-sim.js
│   │       └── terminal-sketch.js
│   ├── images/
│   ├── includes/
│   │   └── footer-scripts.html
│   ├── SECOND-EDITION-PLAN.md    # THIS FILE — canonical plan
│   ├── TODO.md                   # Operational checklist
│   └── terminal-chic-mockup.html # Design reference
├── *.md                           # Static reference content (archived)
├── CLAUDE.md
├── PROGRESS.md                    # Historical development log
└── README.md
```

---

## Superseded Documents

This plan supersedes and consolidates guidance from:

- `PROGRESS.md` — Historical log; still useful for context but no longer the active roadmap.
- `TODO.md` — Still active as the operational checklist for Phase 1 stabilization work.
- `COMPARISON-NOTES.md` — The Jekyll vs Quarto decision is settled. Keep for reference.
- `textbooks/SHARED-THEME-PLAN.md` — Still active for cross-textbook theme infrastructure, but KYDC-specific design decisions live here.
- `textbooks/design-refresh.md` — The Terminal Chic spec. Implemented in the mockup; design details now captured in this plan.
- `know_your_damned_computer-codex/PAUSE_NOTES.md` — Paused worktree. Cherry-pick fixes only; do not develop there.

---

## Resume Command

To continue this work in a new session:

```
Read /Users/curtrode/Code/Teaching/textbooks/know_your_damned_computer/quarto-version/SECOND-EDITION-PLAN.md and begin Phase 1 stabilization. Start by running quarto render and triaging the warnings.
```
