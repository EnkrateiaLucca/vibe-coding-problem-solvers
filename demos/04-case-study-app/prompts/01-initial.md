# Initial Prompt: Building the Quote Collector

This is the exact prompt used to create the first version.

---

## The Prompt

```
Create a single-file HTML app for collecting and organizing quotes.

FEATURES:
- Add quotes with: quote text, author name, and tags (comma-separated)
- Display quotes as cards in a grid layout
- Filter quotes by clicking on a tag
- Delete individual quotes
- Export all quotes as JSON file download
- Data persists in localStorage

TECHNICAL REQUIREMENTS:
- Single HTML file with embedded CSS and JavaScript
- No external dependencies (no React, no CDNs)
- Modern CSS (flexbox or grid for layout)
- Responsive design (works on mobile)
- Clean, minimal UI

UI/UX:
- Form at top to add new quotes
- Tag cloud showing all unique tags
- Quote cards below with quote text, author, and tags
- Each card has a delete button
- Export button downloads quotes.json

Please create the complete HTML file.
```

---

## Why This Prompt Works

### Clear & Direct
- "single-file HTML app" - explicit format
- Feature list with bullet points - unambiguous

### Decomposition
- Features listed separately
- Technical requirements separate from UI

### Constraints
- "No external dependencies"
- "Single HTML file"
- "Modern CSS"

### Examples (implied)
- "quote text, author name, tags"
- "cards in a grid layout"
- "quotes.json"

---

## Expected Output

The prompt should generate:
- ~200-300 lines of HTML/CSS/JS
- Functional localStorage persistence
- Working tag filtering
- JSON export capability

---

## Vibe Check After Generation

Before using the output, verify:

```
□ File runs in browser without errors?
□ Can add a quote and see it appear?
□ Quote survives page refresh?
□ Tag filter works?
□ Export downloads valid JSON?
□ Delete removes the quote?
```

If all pass, the basic app is ready.
