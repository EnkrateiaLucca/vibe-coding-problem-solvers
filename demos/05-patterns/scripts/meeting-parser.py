# /// script
# requires-python = ">=3.11"
# dependencies = ["openai"]
# ///
"""
Meeting Notes to Structured Data
=================================

Parses free-form meeting notes into structured JSON action items.
This demonstrates Pattern 5: Raw to Structured.

Usage:
    uv run meeting-parser.py meeting-notes.txt
    uv run meeting-parser.py meeting-notes.txt --output actions.json

Requires:
    OPENAI_API_KEY environment variable (or use Anthropic/other LLM)

Output:
    JSON with action items, assignees, deadlines, and priorities
"""

import sys
import json
from pathlib import Path
from datetime import datetime
import os

# Check for API key to determine mode
DEMO_MODE = not os.getenv("OPENAI_API_KEY")

if DEMO_MODE:
    print("Note: OPENAI_API_KEY not set. Running in demo mode with simple extraction.")
else:
    from openai import OpenAI


SYSTEM_PROMPT = """You are a meeting notes parser. Extract action items from meeting notes.

For each action item found, output JSON with this structure:
{
  "action": "description of the task",
  "assignee": "person name or null if unassigned",
  "deadline": "deadline as stated or null if none",
  "priority": "high/medium/low"
}

Priority rules:
- high: today, tomorrow, ASAP, urgent, or blocking other work
- medium: this week, before [upcoming date]
- low: no deadline, "when possible", low priority mentioned

Output a JSON array of action items. Only output valid JSON, nothing else."""


def parse_with_llm(notes: str) -> list[dict]:
    """Use OpenAI to parse meeting notes into structured data."""
    client = OpenAI()

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Parse these meeting notes:\n\n{notes}"}
        ],
        response_format={"type": "json_object"}
    )

    result = json.loads(response.choices[0].message.content)

    # Handle both array and object with array responses
    if isinstance(result, list):
        return result
    elif isinstance(result, dict) and "items" in result:
        return result["items"]
    elif isinstance(result, dict) and "action_items" in result:
        return result["action_items"]
    else:
        return [result]


def parse_demo_mode(notes: str) -> list[dict]:
    """Demo mode parser using simple keyword extraction."""
    print("(Demo mode: Using simple keyword extraction)")

    action_items = []
    lines = notes.split("\n")

    keywords = {
        "high": ["asap", "urgent", "today", "tomorrow", "immediately", "eod", "end of day", "before eod", "quick fix"],
        "medium": ["this week", "friday", "by", "before", "next week", "q1", "q2"],
        "low": ["consider", "maybe", "low priority", "when possible", "eventually", "can wait"]
    }

    # Indicators that a line is an action item
    action_indicators = [
        "will", "need to", "should", "must", "fix", "update", "create",
        "review", "hire", "schedule", "complete", "finish", "investigate",
        "refactor", "looking at", "wants", "required", "pending"
    ]

    for line in lines:
        line_lower = line.lower().strip()

        # Skip empty lines, headers, and short lines
        if not line_lower or line_lower.startswith("#") or line_lower.startswith("=") or len(line_lower) < 10:
            continue

        # Skip date/time only lines
        if line_lower.startswith("date:") or line_lower.startswith("attendees:"):
            continue

        # Look for action indicators
        if any(indicator in line_lower for indicator in action_indicators):
            # Determine priority
            priority = "medium"  # default
            for p, words in keywords.items():
                if any(word in line_lower for word in words):
                    priority = p
                    break

            # Try to extract assignee
            assignee = None

            # Check for "Name will" pattern
            for name in ["bob", "sarah", "maria", "john", "lisa", "alice", "carol", "david"]:
                if name in line_lower:
                    assignee = name.title()
                    break

            # Check for parentheses pattern (maria)
            if not assignee and "(" in line and ")" in line:
                start = line.index("(") + 1
                end = line.index(")")
                potential_name = line[start:end].strip()
                if len(potential_name.split()) <= 2 and potential_name.isalpha():
                    assignee = potential_name.title()

            # Extract deadline from common patterns
            deadline = None
            deadline_patterns = [
                ("by friday", "Friday"),
                ("by eod", "EOD today"),
                ("end of day", "EOD today"),
                ("next week", "Next week"),
                ("next thursday", "Next Thursday"),
                ("before end of week", "End of week"),
                ("q1", "Q1"),
                ("by q1", "Q1"),
                ("before april", "Before April"),
            ]
            for pattern, value in deadline_patterns:
                if pattern in line_lower:
                    deadline = value
                    break

            # Clean up the action text
            action = line.strip("- *").strip()

            action_items.append({
                "action": action,
                "assignee": assignee,
                "deadline": deadline,
                "priority": priority
            })

    return action_items


def main():
    if len(sys.argv) < 2 or sys.argv[1] in ["-h", "--help"]:
        print("Usage: uv run meeting-parser.py <notes.txt> [--output FILE]")
        print("")
        print("Parses meeting notes into structured action items.")
        print("Set OPENAI_API_KEY for LLM-powered parsing, or run in demo mode.")
        sys.exit(0)

    input_file = sys.argv[1]
    output_file = "action_items.json"

    # Parse arguments
    if "--output" in sys.argv:
        idx = sys.argv.index("--output")
        if idx + 1 < len(sys.argv):
            output_file = sys.argv[idx + 1]

    # Read input
    input_path = Path(input_file)
    if not input_path.exists():
        print(f"Error: File not found: {input_file}")
        sys.exit(1)

    notes = input_path.read_text()
    print(f"Reading: {input_file} ({len(notes)} characters)")

    # Parse
    if DEMO_MODE:
        action_items = parse_demo_mode(notes)
    else:
        action_items = parse_with_llm(notes)

    print(f"Found {len(action_items)} action items")

    # Save output
    result = {
        "source_file": str(input_path),
        "parsed_at": datetime.now().isoformat(),
        "item_count": len(action_items),
        "action_items": action_items
    }

    with open(output_file, "w") as f:
        json.dump(result, f, indent=2)

    print(f"Saved to: {output_file}")

    # Show preview
    print("\nAction Items:")
    for item in action_items[:5]:
        priority = item.get("priority", "medium")
        priority_emoji = {"high": "🔴", "medium": "🟡", "low": "🟢"}.get(priority, "⚪")
        assignee_val = item.get("assignee")
        assignee = f" ({assignee_val})" if assignee_val else ""
        action_text = item.get("action", str(item))[:50]
        print(f"  {priority_emoji} {action_text}...{assignee}")

    if len(action_items) > 5:
        print(f"  ... and {len(action_items) - 5} more")


if __name__ == "__main__":
    main()
