# Repository Evaluation: know_your_damned_computer
**Date:** February 1, 2026
**Reviewer:** Gemini 3 Pro (Preview)

## 1. Quick Repo Overview
*   **Architecture**: The repo contains **two parallel implementations** of the same educational content:
    *   **Jekyll Site** (`docs/`): The primary production site using the `minima` theme and Liquid templates.
    *   **Quarto Site** (`quarto-version/`): A newer (likely experimental) port using the `cosmo` theme and `.qmd` files.
*   **Scope**: As defined in `README.md` and `CLAUDE.md`, this is a series of 8 interactive guides for Digital Humanities students (Command Line, Git, File Formats, etc.).
*   **Dependencies**:
    *   **Jekyll**: Lightweight. Relies on standard `jekyll (~> 4.3)` and `kramdown`. Defined in `docs/Gemfile`.
    *   **Quarto**: Relies on the Quarto CLI engine and a custom Sass theme (`quarto-version/custom.scss`).

## 2. Code Review
*   **JavaScript Quality**:
    *   **Modern & Modular**: The JS is written in clean ES6+. For example, `docs/assets/js/terminal-sim.js` uses a class-based structure (`TerminalSim`), which makes state management much easier than older functional approaches.
    *   **Safety**: The terminal simulator uses a "Virtual File System" (an in-memory Javascript object) rather than trying to execute real shell commands. This is the correct architectural choice for a browser-based tool.
*   **Major Gap**: There are **zero automated tests**. The logic for path navigation (handling `cd ..` or relative paths) and quiz parsing is complex enough that manual testing will become a bottleneck.
*   **Templates**: The Liquid layouts in `docs/_layouts/` are well-structured, utilizing distinct layouts for generic guides versus interactive exercises.

## 3. Product/UX Critique
*   **Learning Path**: The guides feature excellent metadata ("Time to read", "Prerequisites") which sets clear expectations for students.
*   **Interactivity**: The "Terminal Simulator" and "Quiz Engine" transform passive reading into active learning. This is a strong product differentiator.
*   **Responsive Design**: The CSS (`docs/assets/css/main.css`) treats Dark Mode as a first-class citizen using CSS variables like `--bg-primary`.
*   **Navigation**:
    *   **Jekyll**: Uses a global nav bar.
    *   **Quarto**: Adds a sidebar with a Table of Contents, which is generally better for long-form technical documentation.

## 4. Performance Audit
*   **Assets**:
    *   **Images**: The terminal sketch likely preloads imagery. Ensure images in `images/` are optimized (WebP/AVIF) to prevent delaying the Largest Contentful Paint (LCP).
    *   **Scripts**: JavaScript files are served raw (`docs/assets/js/main.js`). There is no build pipeline (like Webpack/Vite) to minify or tree-shake code. While currently acceptable due to small file sizes, this may need attention if the simulation logic grows.
*   **Rendering**: Since the site is static HTML, Time to First Byte (TTFB) is excellent. The in-memory filesystem is lightweight and unlikely to cause memory issues unless hundreds of files are simulated.

## 5. Security Review
*   **XSS Risks**: The `QuizEngine` likely uses `innerHTML` to render feedback to the user. Since the source content is static Markdown files authored by *you*, this is currently safe. However, strict care must be taken never to reflect user input (like a custom username or URL param) into these feedback elements without sanitization.
*   **External Scripts**: Dependencies (Fonts, PrismJS) are correctly loaded over HTTPS. No API keys or secrets were found in the client-side code, keeping the attack surface minimal.

---

## Prioritized Recommendations

1.  **Add Unit Tests (Vital)**: Implement a lightweight testing framework (like `Jest` or even native `node:test`) specifically for `docs/assets/js/terminal-sim.js`. You need to verify that commands like `cd ../guides` resolve correctly without manually clicking through the UI.
2.  **Consolidate Content**: Maintaining two versions (Jekyll and Quarto) violates DRY (Don't Repeat Yourself). Decide on one "source of truth" and potentially generate the other `_site` from it, or deprecate one.
3.  **Sanitize Inputs**: Even though the content is static now, wrap any `innerHTML` calls in the Quiz Engine with a simple sanitizer to future-proof against accidental XSS if you ever add dynamic user content.
