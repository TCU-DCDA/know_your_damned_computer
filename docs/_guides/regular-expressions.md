---
layout: guide
title: "Regular Expressions for Text Processing"
slug: regular-expressions
description: "Find patterns in text with precision. Essential skills for cleaning data, extracting information, and text analysis in DH projects."
difficulty: intermediate
time_estimate: "45 min"
learning_objectives:
  - "Understand what regular expressions are and when to use them"
  - "Write basic patterns to match text, numbers, and dates"
  - "Use character classes and quantifiers effectively"
  - "Apply regex in Python for text cleaning and extraction"
  - "Debug and test your patterns before using them on real data"
prev_guide:
  title: "Git & Version Control"
  url: "/guides/version-control/"
interactive: true
---

Regular expressions (often called "regex" or "regexp") are one of the most powerful tools for working with text. If you've ever needed to find all the dates in a document, extract email addresses from a webpage, or clean messy data, regex can do it in seconds—once you know how to use it.

For digital humanities work, regex is indispensable. Whether you're cleaning OCR output, extracting metadata from filenames, finding all mentions of a person in a corpus, or normalizing spelling variations, regex gives you surgical precision that "find and replace" simply can't match.

## What You'll Accomplish

<div class="learning-outcomes">
  <h4>By the end of this guide, you'll be able to:</h4>
  <ul>
    <li><strong>Read regex patterns</strong> and understand what they match</li>
    <li><strong>Write patterns</strong> for common DH tasks</li>
    <li><strong>Clean messy text data</strong> programmatically</li>
    <li><strong>Extract structured information</strong> from unstructured text</li>
    <li><strong>Test and debug</strong> your patterns confidently</li>
  </ul>
</div>

<div class="prerequisite-check">
  <h4>What You Need</h4>
  <ul>
    <li>Basic familiarity with Python (variables, strings)</li>
    <li>A text editor or Python environment to practice in</li>
    <li>Patience—regex looks cryptic at first but becomes intuitive with practice!</li>
  </ul>
</div>

## Why Regular Expressions Matter for DH

<div class="quiz" data-quiz="regex-why">
  <h3>Quick Check: When to Use Regex</h3>
  <p>You have a folder of 500 text files with inconsistent date formats: "January 15, 1842", "15 Jan 1842", "1842-01-15", and "01/15/1842" all appear. You need to find all dates and standardize them. What's the best approach?</p>

  <label class="quiz-option">
    <input type="radio" name="regex-quiz-1" value="manual">
    Open each file and use Ctrl+F to find dates manually
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="regex-quiz-1" value="regex">
    Write regex patterns to match each date format, then extract and convert them
  </label>
  <label class="quiz-option">
    <input type="radio" name="regex-quiz-1" value="ai">
    Just ask AI to read the files and find the dates
  </label>

  <div class="feedback-correct">
    <p><strong>Exactly!</strong> Regex can match complex patterns like dates in seconds across thousands of files. You write a pattern once, and it works on any amount of text. This is what makes regex essential for DH work at scale.</p>
  </div>
  <div class="feedback-incorrect">
    <p>While other approaches might work for small tasks, regular expressions give you <strong>precise, repeatable, scalable</strong> pattern matching. A regex pattern that takes 5 minutes to write can process 500 files in seconds—and you can reuse it whenever similar data appears.</p>
  </div>
</div>

### Real DH Use Cases for Regex

<div class="use-cases-grid">
  <div class="use-case-card">
    <div class="use-case-icon"><i class="fas fa-broom"></i></div>
    <h5>Data Cleaning</h5>
    <p>Remove OCR artifacts, normalize whitespace, fix encoding issues, strip HTML tags</p>
  </div>
  <div class="use-case-card">
    <div class="use-case-icon"><i class="fas fa-search"></i></div>
    <h5>Information Extraction</h5>
    <p>Find dates, names, places, prices, or any structured pattern in text</p>
  </div>
  <div class="use-case-card">
    <div class="use-case-icon"><i class="fas fa-exchange-alt"></i></div>
    <h5>Text Transformation</h5>
    <p>Convert date formats, standardize names, restructure data</p>
  </div>
  <div class="use-case-card">
    <div class="use-case-icon"><i class="fas fa-check-double"></i></div>
    <h5>Validation</h5>
    <p>Check if text matches expected formats (emails, IDs, references)</p>
  </div>
</div>

## The Basics: Literal Matching

The simplest regex is just the text you want to find. The pattern `cat` matches the literal characters "cat" wherever they appear.

<div class="regex-demo">
  <h4>Literal Pattern: <code>cat</code></h4>
  <div class="demo-text">
    The <mark>cat</mark> sat on the mat. The <mark>cat</mark>alog was on the table.
  </div>
  <p class="demo-note">Notice that "cat" also matches inside "catalog"—we'll learn how to prevent this later.</p>
</div>

<div class="key-concept">
  <h4>🔑 Key Insight</h4>
  <p>Regular expressions describe <strong>patterns</strong>, not specific text. The pattern <code>cat</code> means "the letter c, followed by the letter a, followed by the letter t"—wherever that sequence appears.</p>
</div>

## Special Characters: The Building Blocks

Regex uses special characters (called "metacharacters") to match patterns rather than literal text. Here are the most important ones:

<div class="regex-table">
  <table>
    <thead>
      <tr>
        <th>Character</th>
        <th>Meaning</th>
        <th>Example</th>
        <th>Matches</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>.</code></td>
        <td>Any single character</td>
        <td><code>c.t</code></td>
        <td>cat, cot, cut, c9t</td>
      </tr>
      <tr>
        <td><code>^</code></td>
        <td>Start of line</td>
        <td><code>^The</code></td>
        <td>"The" only at line start</td>
      </tr>
      <tr>
        <td><code>$</code></td>
        <td>End of line</td>
        <td><code>end$</code></td>
        <td>"end" only at line end</td>
      </tr>
      <tr>
        <td><code>\d</code></td>
        <td>Any digit (0-9)</td>
        <td><code>\d\d\d</code></td>
        <td>123, 456, 789</td>
      </tr>
      <tr>
        <td><code>\w</code></td>
        <td>Word character (letter, digit, underscore)</td>
        <td><code>\w+</code></td>
        <td>hello, test123</td>
      </tr>
      <tr>
        <td><code>\s</code></td>
        <td>Whitespace (space, tab, newline)</td>
        <td><code>\s+</code></td>
        <td>spaces, tabs</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="warning-box">
  <h4>⚠️ Escaping Special Characters</h4>
  <p>To match a literal period, question mark, or other special character, put a backslash before it:</p>
  <ul>
    <li><code>\.</code> matches a literal period</li>
    <li><code>\?</code> matches a literal question mark</li>
    <li><code>\\</code> matches a literal backslash</li>
  </ul>
</div>

## Quantifiers: How Many?

Quantifiers specify how many times a pattern should repeat:

<div class="regex-table">
  <table>
    <thead>
      <tr>
        <th>Quantifier</th>
        <th>Meaning</th>
        <th>Example</th>
        <th>Matches</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>*</code></td>
        <td>Zero or more</td>
        <td><code>ab*c</code></td>
        <td>ac, abc, abbc, abbbc</td>
      </tr>
      <tr>
        <td><code>+</code></td>
        <td>One or more</td>
        <td><code>ab+c</code></td>
        <td>abc, abbc, abbbc (not ac)</td>
      </tr>
      <tr>
        <td><code>?</code></td>
        <td>Zero or one (optional)</td>
        <td><code>colou?r</code></td>
        <td>color, colour</td>
      </tr>
      <tr>
        <td><code>{n}</code></td>
        <td>Exactly n times</td>
        <td><code>\d{4}</code></td>
        <td>1842, 2024 (4 digits)</td>
      </tr>
      <tr>
        <td><code>{n,m}</code></td>
        <td>Between n and m times</td>
        <td><code>\d{2,4}</code></td>
        <td>12, 123, 1234</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="regex-demo">
  <h4>Pattern: <code>\d{4}</code> (exactly 4 digits)</h4>
  <div class="demo-text">
    The document was written in <mark>1842</mark> and revised in <mark>1856</mark>. Page 42 has notes.
  </div>
  <p class="demo-note">"42" doesn't match because it's only 2 digits.</p>
</div>

## Character Classes: Sets of Characters

Character classes let you match any one character from a set:

<div class="regex-table">
  <table>
    <thead>
      <tr>
        <th>Pattern</th>
        <th>Meaning</th>
        <th>Example Use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>[aeiou]</code></td>
        <td>Any vowel</td>
        <td>Find all vowels in text</td>
      </tr>
      <tr>
        <td><code>[0-9]</code></td>
        <td>Any digit (same as \d)</td>
        <td>Match numbers</td>
      </tr>
      <tr>
        <td><code>[A-Z]</code></td>
        <td>Any uppercase letter</td>
        <td>Find acronyms</td>
      </tr>
      <tr>
        <td><code>[a-zA-Z]</code></td>
        <td>Any letter</td>
        <td>Match words</td>
      </tr>
      <tr>
        <td><code>[^0-9]</code></td>
        <td>NOT a digit</td>
        <td>Match non-numeric characters</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="pro-tip">
  <p><strong>Pro Tip:</strong> The caret <code>^</code> has two meanings: at the start of a pattern it means "start of line", but inside square brackets <code>[^...]</code> it means "NOT these characters".</p>
</div>

<div class="quiz" data-quiz="character-classes">
  <h3>Quick Check: Character Classes</h3>
  <p>You want to find all words that start with a capital letter in a text. Which pattern would work?</p>

  <label class="quiz-option">
    <input type="radio" name="cc-quiz" value="a">
    <code>[A-Z]</code>
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="cc-quiz" value="b">
    <code>[A-Z][a-z]+</code>
  </label>
  <label class="quiz-option">
    <input type="radio" name="cc-quiz" value="c">
    <code>[A-Z]+</code>
  </label>

  <div class="feedback-correct">
    <p><strong>Correct!</strong> <code>[A-Z][a-z]+</code> matches one uppercase letter followed by one or more lowercase letters—exactly what a capitalized word looks like. This would match "The", "London", "Shakespeare" but not "THE" or standalone capital letters.</p>
  </div>
  <div class="feedback-incorrect">
    <p><code>[A-Z]</code> alone only matches a single capital letter. <code>[A-Z]+</code> matches sequences of capitals (like "THE" or "USA"). To match capitalized words like "London", you need <code>[A-Z][a-z]+</code>: one capital followed by lowercase letters.</p>
  </div>
</div>

## Groups and Alternatives

### Grouping with Parentheses

Parentheses group parts of a pattern together and "capture" the matched text for later use:

<div class="regex-demo">
  <h4>Pattern: <code>(\d{4})-(\d{2})-(\d{2})</code></h4>
  <div class="demo-text">
    Date: <mark>2024-01-15</mark>
  </div>
  <p class="demo-note">Group 1 captures "2024", Group 2 captures "01", Group 3 captures "15"</p>
</div>

### Alternatives with Pipe

The pipe `|` means "or" and lets you match alternatives:

<div class="regex-demo">
  <h4>Pattern: <code>cat|dog|bird</code></h4>
  <div class="demo-text">
    I have a <mark>cat</mark> and a <mark>dog</mark>, but no <mark>bird</mark>.
  </div>
</div>

<div class="regex-demo">
  <h4>Pattern: <code>(Mr|Mrs|Ms|Dr)\.?\s+[A-Z][a-z]+</code></h4>
  <div class="demo-text">
    Letter to <mark>Mr. Smith</mark> and <mark>Dr Johnson</mark> regarding <mark>Mrs. Williams</mark>.
  </div>
  <p class="demo-note">Matches titles (with optional period) followed by a capitalized name.</p>
</div>

## Word Boundaries

Remember how `cat` also matched inside "catalog"? Word boundaries solve this:

<div class="regex-table">
  <table>
    <thead>
      <tr>
        <th>Pattern</th>
        <th>Meaning</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>\b</code></td>
        <td>Word boundary</td>
        <td><code>\bcat\b</code> matches "cat" but not "catalog"</td>
      </tr>
      <tr>
        <td><code>\B</code></td>
        <td>NOT a word boundary</td>
        <td><code>\Bcat</code> matches "cat" in "catalog" but not standalone "cat"</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="regex-demo">
  <h4>Pattern: <code>\bcat\b</code></h4>
  <div class="demo-text">
    The <mark>cat</mark> sat on the mat. The catalog was on the table.
  </div>
  <p class="demo-note">"catalog" no longer matches because "cat" there isn't at a word boundary.</p>
</div>

## Practical DH Examples

### Example 1: Finding Dates

<div class="code-example">
  <h4>Pattern for dates like "January 15, 1842"</h4>
<pre><code>(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}</code></pre>
  <p>Breaks down as:</p>
  <ul>
    <li><code>(January|February|...)</code> - Month name</li>
    <li><code>\s+</code> - One or more spaces</li>
    <li><code>\d{1,2}</code> - Day (1-2 digits)</li>
    <li><code>,?</code> - Optional comma</li>
    <li><code>\s+</code> - One or more spaces</li>
    <li><code>\d{4}</code> - Four-digit year</li>
  </ul>
</div>

### Example 2: Extracting Prices

<div class="code-example">
  <h4>Pattern for prices like "$12.99" or "£45"</h4>
<pre><code>[$£€]\d+(?:\.\d{2})?</code></pre>
  <p>Breaks down as:</p>
  <ul>
    <li><code>[$£€]</code> - Currency symbol</li>
    <li><code>\d+</code> - One or more digits</li>
    <li><code>(?:\.\d{2})?</code> - Optional: period and two digits (non-capturing group)</li>
  </ul>
</div>

### Example 3: Cleaning OCR Output

<div class="code-example">
  <h4>Common OCR cleaning patterns</h4>
<pre><code># Replace multiple spaces with single space
\s{2,}  →  (single space)

# Remove page numbers like "[Page 42]"
\[Page \d+\]  →  (nothing)

# Fix "tlie" → "the" (common OCR error)
\btlie\b  →  the

# Remove hyphenation at line breaks: "some-\nthing" → "something"
-\n  →  (nothing)</code></pre>
</div>

### Example 4: Finding Names in Historical Documents

<div class="code-example">
  <h4>Pattern for names with titles</h4>
<pre><code># Matches: "Mr. John Smith", "Mrs Elizabeth Bennett", "Dr. Watson"
(Mr|Mrs|Miss|Ms|Dr|Rev|Prof)\.?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?</code></pre>
</div>

## Using Regex in Python

Python's `re` module provides regex functionality. Here are the essential functions:

<div class="python-example">
  <h4>Python Regex Basics</h4>
<pre><code class="language-python">import re

text = "Contact us at info@example.com or support@example.org"

# Find first match
match = re.search(r'\S+@\S+', text)
if match:
    print(match.group())  # info@example.com

# Find all matches
emails = re.findall(r'\S+@\S+', text)
print(emails)  # ['info@example.com', 'support@example.org']

# Replace matches
cleaned = re.sub(r'\S+@\S+', '[EMAIL]', text)
print(cleaned)  # "Contact us at [EMAIL] or [EMAIL]"

# Split on pattern
parts = re.split(r'\s+', "Split   this    text")
print(parts)  # ['Split', 'this', 'text']</code></pre>
</div>

<div class="warning-box">
  <h4>⚠️ Raw Strings in Python</h4>
  <p>Always use raw strings (prefix with <code>r</code>) for regex patterns in Python:</p>
<pre><code class="language-python"># Good - raw string
pattern = r'\d{4}'

# Bad - regular string (backslash issues)
pattern = '\d{4}'  # May not work as expected!</code></pre>
  <p>The <code>r</code> prefix prevents Python from interpreting backslashes as escape sequences before regex sees them.</p>
</div>

### Complete Example: Extracting Dates from Text

<div class="python-example">
  <h4>Extracting and Converting Dates</h4>
<pre><code class="language-python">import re

text = """
The treaty was signed on January 15, 1842.
Revisions were made on March 3, 1845.
The final version dates to December 25, 1848.
"""

# Pattern for "Month Day, Year"
pattern = r'(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})'

# Find all dates with captured groups
dates = re.findall(pattern, text)
for month, day, year in dates:
    print(f"{month} {day}, {year}")

# Output:
# January 15, 1842
# March 3, 1845
# December 25, 1848</code></pre>
</div>

<div class="quiz" data-quiz="python-regex">
  <h3>Quick Check: Python Regex</h3>
  <p>You want to find all 4-digit years in a document and collect them into a list. Which Python code would work?</p>

  <label class="quiz-option">
    <input type="radio" name="py-quiz" value="a">
    <code>re.search(r'\d{4}', text)</code>
  </label>
  <label class="quiz-option" data-correct>
    <input type="radio" name="py-quiz" value="b">
    <code>re.findall(r'\b\d{4}\b', text)</code>
  </label>
  <label class="quiz-option">
    <input type="radio" name="py-quiz" value="c">
    <code>re.sub(r'\d{4}', '', text)</code>
  </label>

  <div class="feedback-correct">
    <p><strong>Correct!</strong> <code>re.findall()</code> returns a list of all matches. The <code>\b</code> word boundaries ensure we match standalone 4-digit numbers (years) and not parts of longer numbers.</p>
  </div>
  <div class="feedback-incorrect">
    <p><code>re.search()</code> only finds the first match (not all). <code>re.sub()</code> is for replacing text. To get a list of all matches, use <code>re.findall()</code>.</p>
  </div>
</div>

## Testing and Debugging Regex

Regex patterns can be tricky. Here's how to develop them confidently:

### Strategy 1: Start Simple, Add Complexity

<div class="strategy-box">
  <h4>Building a Date Pattern Step by Step</h4>
  <ol>
    <li><code>\d+</code> - Start with just digits</li>
    <li><code>\d{4}</code> - Specify exactly 4 digits for year</li>
    <li><code>\d{1,2}/\d{1,2}/\d{4}</code> - Add month and day</li>
    <li><code>\d{1,2}/\d{1,2}/\d{2,4}</code> - Allow 2 or 4 digit years</li>
    <li><code>\b\d{1,2}/\d{1,2}/\d{2,4}\b</code> - Add word boundaries</li>
  </ol>
  <p>Test after each step to make sure it still matches what you expect!</p>
</div>

### Strategy 2: Use Online Testers

<div class="tool-recommendation">
  <h4>Recommended Tools</h4>
  <ul>
    <li><strong><a href="https://regex101.com">regex101.com</a></strong> - Best for learning. Shows explanations and highlights matches in real-time</li>
    <li><strong><a href="https://regexr.com">regexr.com</a></strong> - Great visual interface with a helpful reference</li>
    <li><strong><a href="https://pythex.org">pythex.org</a></strong> - Specifically for testing Python regex</li>
  </ul>
  <p>These tools let you paste sample text and see immediately what your pattern matches (and doesn't match).</p>
</div>

### Strategy 3: Test with Edge Cases

<div class="strategy-box">
  <h4>Things That Often Break Patterns</h4>
  <ul>
    <li><strong>Unexpected whitespace</strong> - Tabs, multiple spaces, line breaks</li>
    <li><strong>Case sensitivity</strong> - "The" vs "THE" vs "the"</li>
    <li><strong>Optional elements</strong> - "Mr." vs "Mr" (period optional?)</li>
    <li><strong>Partial matches</strong> - Finding "cat" in "catalog"</li>
    <li><strong>Empty matches</strong> - Patterns with <code>*</code> can match nothing</li>
  </ul>
</div>

## Common Patterns Reference

<div class="reference-card">
  <h4>📋 Copy-Paste Patterns for DH Work</h4>

  <div class="pattern-group">
    <h5>Dates</h5>
<pre><code># MM/DD/YYYY or MM-DD-YYYY
\d{1,2}[/-]\d{1,2}[/-]\d{2,4}

# Month Day, Year
(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}

# Year alone (19th-21st century)
\b(1[89]\d{2}|20[0-2]\d)\b</code></pre>
  </div>

  <div class="pattern-group">
    <h5>People and Places</h5>
<pre><code># Capitalized words (potential names)
[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*

# Titles with names
(Mr|Mrs|Ms|Miss|Dr|Prof|Rev)\.?\s+[A-Z][a-z]+</code></pre>
  </div>

  <div class="pattern-group">
    <h5>Numbers and Money</h5>
<pre><code># Integers with optional commas
\d{1,3}(?:,\d{3})*

# Prices (USD, GBP, EUR)
[$£€]\d+(?:\.\d{2})?

# Percentages
\d+(?:\.\d+)?%</code></pre>
  </div>

  <div class="pattern-group">
    <h5>Text Cleaning</h5>
<pre><code># Multiple whitespace → single space
\s+

# Text in brackets [like this]
\[[^\]]+\]

# Text in parentheses (like this)
\([^)]+\)

# HTML/XML tags
<[^>]+></code></pre>
  </div>
</div>

## Practice Exercise

<div class="exercise-box">
  <h4>🎯 Try It Yourself: Historical Document Processing</h4>
  <p>You're processing a collection of 19th-century letters. Here's a sample:</p>

<pre><code>London, January 15, 1842

Dear Mr. Smith,

I received your letter of December 3, 1841 regarding the property
at 42 Baker Street. The asking price of £450 seems reasonable,
though Dr. Watson suggests we offer £400.

Please contact Mrs. Hudson at your earliest convenience.

Yours faithfully,
S. Holmes</code></pre>

  <p><strong>Challenge:</strong> Write regex patterns to extract:</p>
  <ol>
    <li>All dates mentioned</li>
    <li>All people with titles (Mr., Mrs., Dr.)</li>
    <li>All prices in pounds (£)</li>
    <li>The street address</li>
  </ol>

  <details>
    <summary>Click to see solutions</summary>
    <div class="solution">
<pre><code># 1. Dates
(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}
# Matches: "January 15, 1842" and "December 3, 1841"

# 2. People with titles
(Mr|Mrs|Dr)\.?\s+[A-Z][a-z]+
# Matches: "Mr. Smith", "Dr. Watson", "Mrs. Hudson"

# 3. Prices in pounds
£\d+
# Matches: "£450", "£400"

# 4. Street address
\d+\s+[A-Z][a-z]+\s+Street
# Matches: "42 Baker Street"</code></pre>
    </div>
  </details>
</div>

## What's Next?

Regular expressions are a skill that improves with practice. As you work with text data in your DH projects, you'll encounter new patterns to match and new challenges to solve. The key is to:

1. **Start with simple patterns** and build complexity gradually
2. **Test thoroughly** with tools like regex101.com
3. **Keep a collection** of patterns that work for your common tasks
4. **Read other people's patterns** to learn new techniques

<div class="reflection-questions">
  <h4>Reflection Questions</h4>
  <ul>
    <li>What kinds of patterns appear frequently in your research materials?</li>
    <li>Where could regex save you time that you currently spend on manual text processing?</li>
    <li>What patterns would you need to extract metadata from your file naming conventions?</li>
  </ul>
</div>

<style>
/* Regex Guide Specific Styles */
.regex-demo {
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--space-md);
    margin: var(--space-md) 0;
}

.regex-demo h4 {
    margin-bottom: var(--space-sm);
    font-family: var(--font-mono);
}

.regex-demo h4 code {
    background: var(--color-primary);
    color: white;
    padding: 0.2em 0.5em;
    border-radius: var(--border-radius-sm);
}

.demo-text {
    background: var(--bg-primary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    font-size: 1.1rem;
    line-height: 1.6;
}

.demo-text mark {
    background: rgba(59, 130, 246, 0.3);
    color: inherit;
    padding: 0.1em 0.2em;
    border-radius: 2px;
}

.demo-note {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-top: var(--space-sm);
    margin-bottom: 0;
    font-style: italic;
}

.regex-table {
    overflow-x: auto;
    margin: var(--space-md) 0;
}

.regex-table table {
    width: 100%;
    border-collapse: collapse;
}

.regex-table th,
.regex-table td {
    padding: var(--space-sm) var(--space-md);
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}

.regex-table th {
    background: var(--bg-secondary);
    font-weight: 600;
}

.regex-table code {
    background: var(--bg-tertiary);
    padding: 0.2em 0.4em;
    border-radius: var(--border-radius-sm);
    font-size: 0.9em;
}

.key-concept {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
    border-left: 4px solid var(--color-primary);
    padding: var(--space-md);
    margin: var(--space-lg) 0;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.key-concept h4 {
    margin-bottom: var(--space-sm);
}

.warning-box {
    background: rgba(234, 179, 8, 0.1);
    border-left: 4px solid #eab308;
    padding: var(--space-md);
    margin: var(--space-md) 0;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.warning-box h4 {
    color: #ca8a04;
    margin-bottom: var(--space-sm);
}

.pro-tip {
    background: var(--bg-secondary);
    border: 1px solid var(--color-primary);
    border-radius: var(--border-radius);
    padding: var(--space-md);
    margin: var(--space-md) 0;
}

.code-example {
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-md);
    margin: var(--space-md) 0;
}

.code-example h4 {
    margin-bottom: var(--space-sm);
    color: var(--color-primary);
}

.code-example pre {
    background: var(--bg-primary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.code-example ul {
    margin-top: var(--space-sm);
    padding-left: var(--space-lg);
}

.python-example {
    background: var(--bg-secondary);
    border: 2px solid #3572A5;
    border-radius: var(--border-radius-lg);
    padding: var(--space-md);
    margin: var(--space-md) 0;
}

.python-example h4 {
    margin-bottom: var(--space-sm);
    color: #3572A5;
}

.python-example pre {
    background: var(--bg-primary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.strategy-box {
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-md);
    margin: var(--space-md) 0;
}

.strategy-box h4 {
    margin-bottom: var(--space-sm);
}

.strategy-box ol,
.strategy-box ul {
    padding-left: var(--space-lg);
}

.strategy-box code {
    background: var(--bg-tertiary);
    padding: 0.2em 0.4em;
    border-radius: var(--border-radius-sm);
}

.tool-recommendation {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
    border-radius: var(--border-radius-lg);
    padding: var(--space-md);
    margin: var(--space-md) 0;
}

.tool-recommendation h4 {
    margin-bottom: var(--space-sm);
}

.tool-recommendation a {
    color: var(--color-primary);
    font-weight: 600;
}

.reference-card {
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.reference-card h4 {
    margin-bottom: var(--space-md);
}

.pattern-group {
    margin-bottom: var(--space-md);
}

.pattern-group h5 {
    color: var(--color-primary);
    margin-bottom: var(--space-xs);
}

.pattern-group pre {
    background: var(--bg-primary);
    padding: var(--space-sm);
    border-radius: var(--border-radius);
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 0.875rem;
}

.exercise-box {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05));
    border: 2px solid var(--color-primary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-lg);
    margin: var(--space-lg) 0;
}

.exercise-box h4 {
    color: var(--color-primary);
    margin-bottom: var(--space-md);
}

.exercise-box pre {
    background: var(--bg-primary);
    padding: var(--space-md);
    border-radius: var(--border-radius);
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.exercise-box details {
    margin-top: var(--space-md);
}

.exercise-box summary {
    cursor: pointer;
    color: var(--color-primary);
    font-weight: 600;
}

.exercise-box .solution {
    margin-top: var(--space-sm);
}

.use-cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-md);
    margin: var(--space-md) 0;
}

.use-case-card {
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
    padding: var(--space-md);
    text-align: center;
}

.use-case-icon {
    font-size: 2rem;
    margin-bottom: var(--space-sm);
    color: var(--color-primary);
}

.use-case-card h5 {
    margin-bottom: var(--space-xs);
}

.use-case-card p {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin: 0;
}

.learning-outcomes,
.prerequisite-check {
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-md);
    margin: var(--space-md) 0;
}

.learning-outcomes h4,
.prerequisite-check h4 {
    margin-bottom: var(--space-sm);
}

.learning-outcomes ul,
.prerequisite-check ul {
    margin: 0;
    padding-left: var(--space-lg);
}

.reflection-questions {
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-md);
    margin: var(--space-lg) 0;
}

.reflection-questions h4 {
    margin-bottom: var(--space-sm);
}

.reflection-questions ul {
    margin: 0;
    padding-left: var(--space-lg);
}

/* Responsive */
@media (max-width: 768px) {
    .regex-table {
        font-size: 0.875rem;
    }

    .regex-table th,
    .regex-table td {
        padding: var(--space-xs) var(--space-sm);
    }

    .use-cases-grid {
        grid-template-columns: 1fr 1fr;
    }

    .demo-text {
        font-size: 1rem;
    }

    .code-example pre,
    .python-example pre,
    .pattern-group pre,
    .exercise-box pre {
        font-size: 0.8rem;
        padding: var(--space-sm);
    }

    .reference-card {
        padding: var(--space-md);
    }

    .exercise-box {
        padding: var(--space-md);
    }

    .key-concept,
    .warning-box,
    .pro-tip {
        padding: var(--space-sm);
    }
}

@media (max-width: 480px) {
    .use-cases-grid {
        grid-template-columns: 1fr;
    }

    .regex-table table {
        font-size: 0.75rem;
    }

    .regex-table th,
    .regex-table td {
        padding: var(--space-xs);
    }

    .code-example pre,
    .python-example pre,
    .pattern-group pre,
    .exercise-box pre {
        font-size: 0.75rem;
        word-break: break-word;
        white-space: pre-wrap;
    }

    .regex-demo h4 {
        font-size: 0.9rem;
    }

    .regex-demo h4 code {
        font-size: 0.8rem;
        word-break: break-all;
    }

    .demo-text {
        font-size: 0.9rem;
        word-break: break-word;
    }
}

/* Prevent horizontal overflow globally */
.guide-body {
    overflow-x: hidden;
    max-width: 100%;
}

pre {
    max-width: 100%;
    overflow-x: auto;
    word-wrap: break-word;
}

code {
    word-break: break-word;
    overflow-wrap: break-word;
}

/* Inline code in headings and paragraphs */
p code,
h4 code,
li code,
td code {
    word-break: break-all;
}

.regex-demo,
.code-example,
.python-example,
.reference-card,
.exercise-box,
.key-concept,
.warning-box,
.pro-tip,
.strategy-box,
.tool-recommendation {
    max-width: 100%;
    overflow-x: auto;
    box-sizing: border-box;
}

/* Tables must scroll horizontally rather than expand page */
.regex-table {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.regex-table table {
    min-width: 100%;
    width: max-content;
}

/* Ensure long regex patterns in table cells wrap or scroll */
.regex-table td code {
    white-space: nowrap;
}

@media (max-width: 768px) {
    .regex-table td code {
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .regex-table td code {
        font-size: 0.7rem;
    }

    /* Force table to be scrollable on very small screens */
    .regex-table {
        margin-left: -var(--space-md);
        margin-right: -var(--space-md);
        padding-left: var(--space-md);
        padding-right: var(--space-md);
        width: calc(100% + 2 * var(--space-md));
    }
}
</style>
