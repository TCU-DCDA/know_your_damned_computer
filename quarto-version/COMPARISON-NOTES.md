# Jekyll vs Quarto: Side-by-Side Comparison

## Overview

I've created a parallel Quarto implementation so you can compare both approaches for "Know Your Damned Computer."

## Directory Structure

```
know_your_damned_computer/
├── docs/              # Jekyll version (current)
└── quarto-version/    # Quarto implementation (new)
```

## Feature Comparison

### Markdown Syntax

| Feature | Jekyll | Quarto |
|---------|--------|--------|
| **Callouts** | Custom HTML divs | Native `:::` syntax |
| **Tabs** | Custom JavaScript | Native `{.panel-tabset}` |
| **Cross-refs** | Manual links | Auto `@sec-id` |
| **Tables** | Markdown only | Captions + IDs |
| **Code blocks** | Basic | Syntax + execution |

### Example: Callout Boxes

**Jekyll Version:**
```html
<div class="quiz" data-quiz="file-management-intro">
  <h3>Quick Check: Why is file management especially important in DH work?</h3>
  <label class="quiz-option">
    <input type="radio" name="intro-quiz" value="size">
    DH projects involve large files that are hard to manage
  </label>
  <div class="feedback-correct">
    <p><strong>Exactly!</strong> DH projects are complex...</p>
  </div>
</div>
```

**Quarto Version:**
```markdown
::: {.callout-tip}
## Quick Check
**Why is file management especially important in DH work?**

DH projects are complex, involving multiple file types, versions,
and collaborators all need clear organization.
:::
```

### Example: Platform-Specific Content

**Jekyll Version:**
```markdown
### Mac File Management
- Use Spotlight...

### PC File Management
- Use File Explorer...
```

**Quarto Version:**
```markdown
::: {.panel-tabset}
## Mac Users
- Use Spotlight...

## PC Users
- Use File Explorer...
:::
```

## Strengths Comparison

### Quarto Wins

✅ **Cleaner markdown** - Less HTML, more readable source
✅ **Multi-format output** - HTML + PDF + Word + ePub from same source
✅ **Academic features** - Citations, cross-references, footnotes built-in
✅ **Code execution** - Can run Python/R code in documents
✅ **Better tables** - Automatic numbering and cross-referencing
✅ **Simpler deployment** - Single `quarto render` command

### Jekyll Wins

✅ **Custom interactivity** - Full control over JavaScript
✅ **GitHub Pages** - Built-in, zero-config deployment
✅ **Quiz engine** - Your custom implementation works great
✅ **Terminal simulator** - Unique interactive feature
✅ **Progress tracking** - Custom localStorage solution
✅ **Mature ecosystem** - More themes and plugins

## What You'd Gain with Quarto

### 1. Academic Publishing

Generate PDF handouts from the same source:

```bash
quarto render file-management.qmd --to pdf
```

Students could print or download guides in their preferred format.

### 2. Executable Examples

```markdown
```{python}
# Students see this code AND the output
import os
print(os.listdir('.'))
```
```

### 3. Cross-References

```markdown
As discussed in @sec-naming, good file names include dates.
See @tbl-shortcuts for Mac keyboard shortcuts.
```

Auto-generates numbered links with "Section 2.1" or "Table 3."

### 4. Simpler Syntax

Compare the "Spot the Problems" exercise:

**Jekyll:** 50 lines of HTML + 80 lines of JavaScript
**Quarto:** 20 lines with native `{.callout-warning}` + `<details>`

## What You'd Lose with Quarto

### 1. Interactive Quizzes

Your Jekyll quiz engine is sophisticated. Quarto would need:
- Custom Lua filter (I created a basic one)
- Or third-party extension
- Or embed Shiny/webR (more complex)

### 2. Terminal Simulator

This is unique to your Jekyll version. Quarto would require:
- Custom JavaScript (same complexity)
- Or link to external tool
- No native equivalent

### 3. Progress Tracking

Would need custom localStorage implementation in Quarto too.

## Real-World Usage

### Jekyll Workflow

```bash
cd docs
bundle exec jekyll serve   # Preview
git push                   # Deploy to GitHub Pages (automatic)
```

### Quarto Workflow

```bash
cd quarto-version
quarto preview            # Preview (faster than Jekyll)
quarto render             # Build all formats
quarto publish gh-pages   # Deploy to GitHub Pages (one command)
```

## Recommendation

### Stay with Jekyll if:

- ✅ You're happy with current features
- ✅ Custom interactivity is core to your vision
- ✅ You only need HTML output
- ✅ GitHub Pages integration is important
- ✅ You've already invested significant time

### Switch to Quarto if:

- ✅ You want **multi-format output** (HTML + PDF handouts)
- ✅ You plan to add **executable code examples**
- ✅ You want **simpler markdown** for easier maintenance
- ✅ Academic publishing features matter
- ✅ You're still early in development

### Hybrid Approach?

You could:
1. **Keep Jekyll** for main interactive site
2. **Use Quarto** to generate PDF/Word versions from simplified content
3. Best of both worlds (but more maintenance)

## Testing the Quarto Version

To preview the Quarto version:

1. Install Quarto: https://quarto.org/docs/get-started/

```bash
# Mac
brew install quarto

# Or download from quarto.org
```

2. Preview the site:

```bash
cd quarto-version
quarto preview
```

3. Try rendering to different formats:

```bash
quarto render                              # HTML
quarto render --to pdf                     # PDF (requires LaTeX)
quarto render guides/file-management.qmd --to docx  # Word doc
```

## My Opinion

For your specific project, I'd **recommend staying with Jekyll** because:

1. Your custom interactivity (quizzes, terminal sim) is excellent
2. You're already 50% done with Jekyll version
3. You primarily need web output
4. GitHub Pages deployment is seamless

**But** consider Quarto if you decide you want to:
- Provide PDF handouts for students
- Add executable Python examples later
- Simplify the markdown for easier updates

## Files Created

I've created a working Quarto version in `quarto-version/`:

- `_quarto.yml` - Configuration
- `index.qmd` - Homepage
- `guides/file-management.qmd` - Full guide conversion
- `custom.scss` - Styling
- `README.md` - Setup instructions
- `about.qmd` - About page

You can compare the source files directly to see the differences.

**Message #3**
