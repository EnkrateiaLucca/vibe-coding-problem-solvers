# Demo 03: Vibe Checking

Smart verification without over-engineering. Know when to trust and when to investigate.

## What is Vibe Checking?

Lightweight verification that catches problems without reading every line of code.

**Not this:** Review every line, understand every algorithm, trace every path
**This:** Quick sanity checks that catch 80% of issues in 20% of the time

## The Vibe Checking Framework

```
OUTPUT → Quick Checks → Green Flags? → Trust It
                     → Red Flags?   → Investigate
```

## Demo Files

- `01-green-flags.md` - Signs that output is probably correct
- `02-red-flags.md` - Signs that need investigation
- `03-verification-techniques.md` - Quick verification methods
- `04-practice-scenarios.md` - Interactive exercises
- `vibe-check-checklist.md` - Printable quick reference

## Sample Data (sample-data/)

Real data files for hands-on practice scenarios:

| File | For Scenario | Description |
|------|--------------|-------------|
| `employees.csv` | Scenario 1 | 500 employee records for CSV parsing test |
| `generate_employees.py` | Setup | UV script that generates the CSV |

### Try Scenario 1

The practice scenario asks: "Parse 500 employees into JSON - AI returned 312. What's wrong?"

Test it yourself:

```bash
cd demos/03-vibe-checking/sample-data

# View the CSV
head -5 employees.csv
wc -l employees.csv  # Should show 501 (header + 500 rows)

# The scenario: AI might truncate due to context limits
# Quick check: count the output records
```

## When Vibe Checking Is Enough

| Scenario | Vibe Check | Full Review |
|----------|------------|-------------|
| Personal projects | X | |
| Prototypes | X | |
| Data processing scripts | X | |
| Learning/experimentation | X | |
| Production security code | | X |
| Financial calculations | | X |
| User data handling | | X |
| Code others maintain | | X |

## The Simon Willison Test

From the Open Sauce case study:

```
Expected: Small JSON file with schedule data
Received: App making 176 requests, downloading 130MB

Vibe check: "That doesn't feel right"
Action: Investigated, found unoptimized images
Fix: One prompt to optimize, 1,400x reduction
```

**Key insight:** The numbers didn't match expectations. That's the vibe check.

## Quick Reference

```
VIBE CHECK IN 30 SECONDS
─────────────────────────────────────
1. Does the output size make sense?
2. Does basic functionality work?
3. Are the numbers reasonable?
4. Does the structure look right?
5. Any obvious errors?
─────────────────────────────────────
```
