# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "requests",
# ]
# ///
"""
UV Script Template
==================

A starting point for creating automation scripts with uv.

Usage:
    uv run uv-script-template.py [input] [--option value]

Examples:
    uv run uv-script-template.py data.csv
    uv run uv-script-template.py data.csv --output results.json
"""

import argparse
import sys
from pathlib import Path


def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser(
        description="Template script for automation tasks"
    )
    parser.add_argument("input", help="Input file or directory")
    parser.add_argument("--output", "-o", default="output.txt", help="Output file")
    parser.add_argument("--verbose", "-v", action="store_true", help="Verbose output")
    args = parser.parse_args()

    # Validate input
    input_path = Path(args.input)
    if not input_path.exists():
        print(f"Error: Input not found: {args.input}")
        sys.exit(1)

    if args.verbose:
        print(f"Processing: {input_path}")

    # Your processing logic here
    # --------------------------------------------

    # Example: Read file
    if input_path.is_file():
        content = input_path.read_text()
        print(f"Read {len(content)} characters from {input_path.name}")

    # Example: Process directory
    if input_path.is_dir():
        files = list(input_path.glob("*"))
        print(f"Found {len(files)} items in {input_path.name}")

    # Example: Write output
    output_path = Path(args.output)
    output_path.write_text(f"Processed: {args.input}")
    print(f"Output written to: {output_path}")

    # --------------------------------------------

    print("Done!")


if __name__ == "__main__":
    main()


# ================================================
# COMMON SNIPPETS - Copy what you need
# ================================================

# === Web Requests ===
"""
import requests

response = requests.get("https://api.example.com/data")
response.raise_for_status()
data = response.json()
"""

# === CSV Processing ===
"""
# Add to dependencies: "pandas"
import pandas as pd

df = pd.read_csv("input.csv")
df_filtered = df[df["status"] == "active"]
df_filtered.to_csv("output.csv", index=False)
"""

# === JSON Handling ===
"""
import json

# Read
with open("input.json") as f:
    data = json.load(f)

# Write
with open("output.json", "w") as f:
    json.dump(data, f, indent=2)
"""

# === Image Processing ===
"""
# Add to dependencies: "pillow"
from PIL import Image

img = Image.open("input.jpg")
img = img.resize((800, 600))
img.save("output.jpg", quality=85)
"""

# === Progress Bar ===
"""
# Add to dependencies: "tqdm"
from tqdm import tqdm

for item in tqdm(items, desc="Processing"):
    process(item)
"""

# === Date Handling ===
"""
# Add to dependencies: "python-dateutil"
from datetime import datetime
from dateutil import parser

date = parser.parse("next tuesday")
formatted = date.strftime("%Y-%m-%d")
"""
