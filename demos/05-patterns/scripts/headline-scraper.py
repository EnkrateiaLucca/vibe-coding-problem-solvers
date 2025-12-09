# /// script
# requires-python = ">=3.11"
# dependencies = ["requests", "beautifulsoup4"]
# ///
"""
Headline Scraper
================

Scrapes headlines from news sites or any page with article links.
This is the complete script from Pattern 4: Automate Repeatable Steps.

Usage:
    uv run headline-scraper.py https://news.ycombinator.com
    uv run headline-scraper.py https://example.com --selector "h2 a"
    uv run headline-scraper.py https://example.com --output headlines.json

Output:
    JSON file with headlines and links
"""

import sys
import json
from datetime import datetime
from pathlib import Path
import requests
from bs4 import BeautifulSoup


# Common headline selectors for popular sites
SITE_SELECTORS = {
    "news.ycombinator.com": ".titleline > a",
    "reddit.com": "h3",
    "bbc.com": "h3 a",
    "techcrunch.com": "h2 a",
    "default": "h1 a, h2 a, h3 a, article a"
}


def get_selector_for_url(url: str) -> str:
    """Get appropriate CSS selector based on URL."""
    for domain, selector in SITE_SELECTORS.items():
        if domain in url:
            return selector
    return SITE_SELECTORS["default"]


def scrape_headlines(url: str, selector: str | None = None, limit: int = 20) -> list[dict]:
    """Scrape headlines from a URL."""
    print(f"Fetching: {url}")

    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching URL: {e}")
        sys.exit(1)

    soup = BeautifulSoup(response.text, "html.parser")

    # Use provided selector or auto-detect
    css_selector = selector or get_selector_for_url(url)
    print(f"Using selector: {css_selector}")

    headlines = []
    seen_titles = set()  # Avoid duplicates

    for element in soup.select(css_selector):
        title = element.get_text(strip=True)
        link = element.get("href", "")

        # Skip empty or duplicate titles
        if not title or title in seen_titles:
            continue

        # Make relative URLs absolute
        if link and not link.startswith("http"):
            if link.startswith("/"):
                from urllib.parse import urlparse
                parsed = urlparse(url)
                link = f"{parsed.scheme}://{parsed.netloc}{link}"

        seen_titles.add(title)
        headlines.append({
            "title": title,
            "link": link,
            "scraped_at": datetime.now().isoformat()
        })

        if len(headlines) >= limit:
            break

    print(f"Found {len(headlines)} headlines")
    return headlines


def save_results(headlines: list[dict], output_file: str):
    """Save headlines to JSON file."""
    result = {
        "count": len(headlines),
        "scraped_at": datetime.now().isoformat(),
        "headlines": headlines
    }

    with open(output_file, "w") as f:
        json.dump(result, f, indent=2)

    print(f"Saved to: {output_file}")


def show_usage():
    print("Usage: uv run headline-scraper.py <url> [options]")
    print("")
    print("Options:")
    print("  --selector CSS     Custom CSS selector for headlines")
    print("  --limit N          Maximum headlines to scrape (default: 20)")
    print("  --output FILE      Output JSON file (default: headlines.json)")
    print("")
    print("Examples:")
    print("  uv run headline-scraper.py https://news.ycombinator.com")
    print("  uv run headline-scraper.py https://example.com --selector 'h2 a'")
    print("  uv run headline-scraper.py https://bbc.com --limit 10 --output bbc.json")
    print("")
    print("The script auto-detects selectors for popular sites:")
    for domain, selector in SITE_SELECTORS.items():
        if domain != "default":
            print(f"  {domain}: {selector}")


if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] in ["-h", "--help"]:
        show_usage()
        sys.exit(0)

    url = sys.argv[1]
    selector = None
    limit = 20
    output_file = "headlines.json"

    # Parse arguments
    args = sys.argv[2:]
    i = 0
    while i < len(args):
        if args[i] == "--selector" and i + 1 < len(args):
            selector = args[i + 1]
            i += 2
        elif args[i] == "--limit" and i + 1 < len(args):
            limit = int(args[i + 1])
            i += 2
        elif args[i] == "--output" and i + 1 < len(args):
            output_file = args[i + 1]
            i += 2
        else:
            i += 1

    headlines = scrape_headlines(url, selector, limit)

    if headlines:
        save_results(headlines, output_file)

        # Show preview
        print("\nTop 5 headlines:")
        for h in headlines[:5]:
            print(f"  - {h['title'][:60]}...")
    else:
        print("No headlines found. Try a different selector.")
