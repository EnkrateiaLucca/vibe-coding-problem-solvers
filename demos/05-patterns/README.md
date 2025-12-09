# Demo 05: Practical Patterns

5 workflows you can use tomorrow. Each pattern solves a specific problem.

## The 5 Patterns

| Pattern | Solves | When to Use |
|---------|--------|-------------|
| **1. Prototypes First** | Analysis paralysis | New features, unclear requirements |
| **2. Let It See** | Context gaps | Debugging, UI changes |
| **3. Restart When Stuck** | Context rot | Long sessions, degrading quality |
| **4. Automate Steps** | Repetitive tasks | Scripting, data processing |
| **5. Raw → Structured** | Unstructured data | Notes, logs, natural language |

## Demo Files

- `01-prototypes-first.md` - Fuzzy idea → working prototype → iterate
- `02-let-it-see.md` - Share screenshots, errors, and context
- `03-restart-when-stuck.md` - Strategic context reset
- `04-automate-steps.md` - UV scripts for automation
- `05-raw-to-structured.md` - Transform messy data
- `uv-script-template.py` - Ready-to-use automation template

## Working Scripts (scripts/)

Complete, runnable UV scripts demonstrating each automation pattern:

| Script | Purpose | Usage |
|--------|---------|-------|
| `resize-images.py` | Batch resize images | `uv run resize-images.py ./photos 800` |
| `csv-processor.py` | Filter/select CSV data | `uv run csv-processor.py users.csv --status active` |
| `headline-scraper.py` | Scrape web headlines | `uv run headline-scraper.py https://news.ycombinator.com` |
| `meeting-parser.py` | Notes → action items | `uv run meeting-parser.py notes.txt` |

## Sample Data (sample-data/)

Ready-to-use data files for practicing the patterns:

| File | For Pattern | Description |
|------|-------------|-------------|
| `users.csv` | Pattern 4 | 20-row sample for CSV filtering |
| `meeting-notes.txt` | Pattern 5 | Team meeting for action extraction |
| `app-logs.txt` | Pattern 5 | Server logs for parsing |
| `reminders.txt` | Pattern 5 | Natural language for calendar events |
| `contacts-raw.txt` | Pattern 5 | Messy contacts for structuring |
| `requirements-raw.txt` | Pattern 5 | Feature requirements for user stories |
| `sample-images/` | Pattern 4 | Folder with image generation script |

### Quick Demo Commands

```bash
# Pattern 4: Automate Steps
cd demos/05-patterns

# Process CSV
uv run scripts/csv-processor.py sample-data/users.csv --status active --columns name,email

# Scrape headlines
uv run scripts/headline-scraper.py https://news.ycombinator.com

# Resize images (first generate test images)
cd sample-data/sample-images
uv run generate_test_images.py
uv run ../../scripts/resize-images.py .

# Pattern 5: Raw → Structured
uv run scripts/meeting-parser.py sample-data/meeting-notes.txt
```

## Quick Reference

```
PATTERN SELECTION GUIDE
─────────────────────────────────────
Starting something new? → Prototypes First
AI output missing mark? → Let It See
Quality degrading?      → Restart When Stuck
Doing same thing often? → Automate Steps
Have messy data?        → Raw → Structured
─────────────────────────────────────
```

## Live Demo Suggestions

### Quick Demo (5 min per pattern)
- Pattern 1: Build a dashboard prototype
- Pattern 2: Debug with screenshot
- Pattern 3: Show before/after restart
- Pattern 4: Run a uv script
- Pattern 5: Convert meeting notes to JSON

### Extended Demo (15 min)
- Combine patterns: Start prototype → hit bug → share screenshot → fix it
