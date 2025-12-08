# Pattern 4: Automate Repeatable Steps

Turn repetitive tasks into one-liner scripts using uv.

## The Problem

You keep doing the same thing:
- Processing CSV files
- Renaming batches of images
- Scraping the same site
- Converting file formats

Why do it manually when AI can write a script?

---

## The Solution: UV Single-File Scripts

[uv](https://docs.astral.sh/uv/) is a Python package manager that supports inline script dependencies. One file, all dependencies declared, runs anywhere.

```python
# /// script
# requires-python = ">=3.11"
# dependencies = ["requests", "beautifulsoup4"]
# ///

import requests
from bs4 import BeautifulSoup

# Your automation code here
```

**Run it:**
```bash
uv run script.py
```

No virtual environment setup. No requirements.txt. Just works.

---

## How to Request UV Scripts

### The Prompt Template
```
Write a single Python script that [task].

Requirements:
- Use uv script format with dependencies in header
- Accept command-line arguments for [inputs]
- Print progress as it runs
- Handle errors gracefully

Make it a self-contained single file I can run with `uv run script.py`
```

---

## Example 1: Batch Image Resizer

**Prompt:**
```
Write a uv script that resizes all images in a folder to a max width.

Input: folder path, max width (default 800)
Output: resized images in 'resized/' subfolder

Use Pillow. Maintain aspect ratio. Show progress.
```

**Output:**
```python
# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow"]
# ///

import sys
from pathlib import Path
from PIL import Image

def resize_images(folder: str, max_width: int = 800):
    source = Path(folder)
    output = source / "resized"
    output.mkdir(exist_ok=True)

    images = list(source.glob("*.jpg")) + list(source.glob("*.png"))
    print(f"Found {len(images)} images")

    for img_path in images:
        print(f"Processing: {img_path.name}")
        img = Image.open(img_path)

        if img.width > max_width:
            ratio = max_width / img.width
            new_size = (max_width, int(img.height * ratio))
            img = img.resize(new_size, Image.LANCZOS)

        img.save(output / img_path.name)

    print(f"Done! Resized images in {output}")

if __name__ == "__main__":
    folder = sys.argv[1] if len(sys.argv) > 1 else "."
    width = int(sys.argv[2]) if len(sys.argv) > 2 else 800
    resize_images(folder, width)
```

**Usage:**
```bash
uv run resize.py ./photos 1200
```

---

## Example 2: Web Scraper

**Prompt:**
```
Write a uv script that scrapes headlines from a news site.

Input: URL
Output: JSON file with headlines and links

Use requests and BeautifulSoup. Handle errors.
```

---

## Example 3: CSV Processor

**Prompt:**
```
Write a uv script that:
1. Reads a CSV file
2. Filters rows where 'status' is 'active'
3. Outputs new CSV with just name, email columns

Use pandas. Show row counts before and after.
```

---

## Common Automation Tasks

| Task | Key Libraries |
|------|---------------|
| Web scraping | requests, beautifulsoup4 |
| Image processing | pillow |
| PDF handling | pypdf, weasyprint |
| Data processing | pandas |
| File conversion | Various per format |
| API calls | requests, httpx |
| Date/time | python-dateutil |

---

## The Automation Workflow

```
1. Identify repetitive task

2. Write prompt describing:
   - What it should do
   - Input/output format
   - Any specific requirements

3. Generate script with uv header

4. Test with sample data

5. Save to your scripts folder

6. Use whenever needed
```

---

## Where to Store Scripts

Per your CLAUDE.md:
```
/Users/greatmaster/Desktop/automated/
```

Organize by category:
```
automated/
├── data-processing/
├── web-scrapers/
├── file-converters/
└── utilities/
```

---

## Script Best Practices

1. **Always include help/usage**
   ```python
   if len(sys.argv) < 2:
       print("Usage: uv run script.py <input>")
       sys.exit(1)
   ```

2. **Show progress for long tasks**
   ```python
   for i, item in enumerate(items):
       print(f"Processing {i+1}/{len(items)}")
   ```

3. **Handle common errors**
   ```python
   try:
       result = process(item)
   except Exception as e:
       print(f"Error on {item}: {e}")
       continue
   ```

---

## Live Demo

**Exercise:**

"I need to rename files in a folder from 'IMG_1234.jpg' to '2025-01-15_1234.jpg' based on EXIF date"

1. Describe the task
2. Generate uv script
3. Test on sample folder
4. Save to automation folder
5. Use forever more

Time saved over career: Hours.
