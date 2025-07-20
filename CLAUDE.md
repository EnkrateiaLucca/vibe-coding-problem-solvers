# CLAUDE.md - Remark.js Presentation Development Guide

This file contains essential instructions and guidelines for developing professional technical presentations using Remark.js. Follow these patterns exactly to maintain consistency across all presentations.

## IMPORTANT: Core Principles
- ALWAYS use the established HTML template structure (DO NOT modify the basic template)
- MAINTAIN consistent font styling across all presentations
- FOLLOW the progressive reveal pattern using `--` separators
- NEVER add unnecessary JavaScript or complex customizations
- KEEP slides concise and focused on single concepts

## Bash Commands
- `python -m http.server 8000`: Serve presentation locally for testing
- `open http://localhost:8000/presentation.html`: Open presentation in browser
- `cp presentation.html presentation-backup-$(date +%Y%m%d).html`: Backup presentation before major changes

## HTML Template Structure

YOU MUST use this exact HTML template for all presentations:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Presentation Title</title>
    <meta charset="utf-8">
    <style>
      @import url(https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz);
      @import url(https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic);
      @import url(https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700,400italic);

      body { font-family: 'Droid Serif'; }
      h1, h2, h3 {
        font-family: 'Yanone Kaffeesatz';
        font-weight: normal;
      }
      .remark-code, .remark-inline-code { font-family: 'Ubuntu Mono'; }
    </style>
  </head>
  <body>
    <textarea id="source">
<!-- SLIDES GO HERE -->
    </textarea>
    <script src="https://remarkjs.com/downloads/remark-latest.min.js">
    </script>
    <script>
      var slideshow = remark.create();
    </script>
  </body>
</html>
```

## Slide Templates and Patterns

### Title Slide Pattern
```markdown
class: center, middle

# Presentation Title

*Subtitle if needed*

**By Lucas Soares**

Date: MM/DD/YYYY
```

### Section Divider Pattern
```markdown
---

class: center, middle

# Section Title

---
```

### Demo Slide Pattern (IMPORTANT: Always highlight demos)
```markdown
---

class: center, middle

<h1>
<span style="background-color: lightgreen">
  Demo - Description of Demo
</span>
</h1>

---
```

### Speaker Introduction Slide
```markdown
---

# About Me

.left-column[
- **Role/Title**
- Background point 1
--
- Background point 2
--
- Background point 3
--
- Contact/Social info
]

.right-column[
<img src="./profile-image.jpg" width="300px">
]

---
```

### Code Example Slide Pattern
```markdown
---

# Topic Title

Explanation text here

```python
# Code example
def example_function():
    return "example"
```

--

Key points about the code:
- Point 1
--
- Point 2

---
```

### Q&A and Break Slides
```markdown
---

class: center, middle

# Q&A

---

class: center, middle

# Break 5 minutes

---
```

## Image Handling Guidelines

ALWAYS use these patterns for images:

### Centered Image
```html
<div style="text-align: center;">
  <img src="./image-name.png" width="600px">
</div>
```

### Image Paths
- Local images: `./filename.png` (same directory as presentation.html)
- Notebook assets: `../notebooks/assets-resources/filename.png`
- NEVER use absolute paths

## CSS Styling Patterns

### Highlighting Important Content
- Demo slides: `<span style="background-color: lightgreen">`
- Warnings/Important: `<span style="background-color: yellow">`
- Optional content: `<span style="color: red">`

### Font Sizes for References
```html
<p style="font-size: 14px; margin-top: 20px;">
  <a href='URL'>Reference Text</a>
</p>
```

## Code Presentation Best Practices

1. ALWAYS specify the language for syntax highlighting
2. Keep code examples SHORT (max 10-15 lines per slide)
3. Use progressive reveal (`--`) to explain complex code
4. Include output/results when relevant

Example:
```markdown
```python
# Step 1: Import libraries
import numpy as np
```
--
```python
# Step 2: Create data
data = np.array([1, 2, 3, 4, 5])
```
--
Output: `[1 2 3 4 5]`
```

## File Organization

```
presentation-folder/
├── presentation.html          # Main presentation file
├── profile-image.jpg         # Speaker profile image
├── *.png/jpg/svg            # Local images
└── presentation-backup-*.html # Backup files
```

## Workflow Instructions

1. **Starting a New Presentation**
   - Copy the HTML template above
   - Update title, author, and date
   - Create title slide first

2. **Adding Content**
   - Write slides in markdown within the `<textarea id="source">`
   - Use `---` to separate slides
   - Test frequently with local server

3. **Before Major Changes**
   - Create a backup using the backup command
   - Test all demos and code examples
   - Verify all image paths

4. **Progressive Reveal Strategy**
   - Use `--` to control information flow
   - Reveal complex concepts step by step
   - Don't overuse - max 3-4 reveals per slide

## Common Presentation Structure

1. Title Slide
2. About Me/Speaker Introduction
3. Agenda/Table of Contents
4. Introduction/Context (2-3 slides)
5. Main Content Sections:
   - Concept explanation
   - Visual diagram/image
   - Code example
   - Practical application/demo
6. Q&A after each major section
7. Summary/Key Takeaways
8. References/Resources
9. Thank You/Contact Info

## Testing Checklist

Before finalizing any presentation:
- [ ] All images load correctly
- [ ] Code syntax highlighting works
- [ ] Progressive reveals function properly
- [ ] No JavaScript errors in console
- [ ] Presentation advances with arrow keys
- [ ] All links are clickable and valid

## DO NOT:
- Add custom JavaScript beyond basic Remark initialization
- Use external CSS files
- Create overly complex slide layouts
- Include slides with too much content
- Use absolute file paths
- Forget to test demos before presenting

## Quick Reference for Common Tasks

### Add a Poll Question
```markdown
---

# Quick Poll

```
Which framework do you prefer?
1. Framework A
2. Framework B
3. Framework C
4. Other
```

---
```

### Create a Comparison Table
```html
<div style="display: flex; justify-content: space-around;">
  <div>
    <h3>Option A</h3>
    <ul>
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  </div>
  <div>
    <h3>Option B</h3>
    <ul>
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  </div>
</div>
```

### Add a Footnote Reference
```html
<p style="font-size: 14px; margin-top: 50px;">
  <sup>1</sup> <a href='https://example.com'>Source Title</a>
</p>
```

Remember: Consistency is key. These patterns have been refined across many successful presentations. Follow them exactly for professional results.