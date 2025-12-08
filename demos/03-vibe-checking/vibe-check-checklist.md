# Vibe Check Checklist

Print this. Use it every time you get AI output.

---

## 30-Second Vibe Check

```
┌─────────────────────────────────────────────────────────┐
│  VIBE CHECK                                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  □ Size reasonable?                                     │
│    Expected: _______ Actual: _______                    │
│                                                         │
│  □ Quantity matches?                                    │
│    Input count: _______ Output count: _______           │
│                                                         │
│  □ Runs without errors?                                 │
│    Test: ________________________________________       │
│                                                         │
│  □ Spot check passed?                                   │
│    First: _______ Last: _______ Random: _______         │
│                                                         │
│  □ No security red flags?                               │
│    □ No SQL injection                                   │
│    □ No exposed secrets                                 │
│    □ Input validated                                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  RESULT:  □ TRUST IT    □ INVESTIGATE                   │
└─────────────────────────────────────────────────────────┘
```

---

## Red Flags Quick Reference

```
STOP AND INVESTIGATE IF:
─────────────────────────────────────
⚠ Size 10x larger/smaller than expected
⚠ Items missing from output
⚠ Unfamiliar imports/methods
⚠ User input goes directly to DB/HTML
⚠ Passwords/keys visible in response
⚠ No error handling for obvious cases
⚠ Hardcoded values that should be config
─────────────────────────────────────
```

---

## Green Flags Quick Reference

```
TRUST IF ALL PASS:
─────────────────────────────────────
✓ Output size is proportional to input
✓ All items processed (count matches)
✓ Basic test case works
✓ Error-free execution
✓ Consistent formatting throughout
✓ Imports are standard/expected
─────────────────────────────────────
```

---

## Context Decision Matrix

```
WHEN TO VIBE CHECK vs FULL REVIEW
─────────────────────────────────────

VIBE CHECK SUFFICIENT:
• Personal projects
• Throwaway prototypes
• Data processing scripts
• Learning experiments
• One-off automations

FULL REVIEW REQUIRED:
• Production code
• Security-related code
• Financial calculations
• User data handling
• Code others will maintain
• Public-facing APIs

─────────────────────────────────────
```

---

## The 4-Point Quick Test

For any AI output, check these four things:

```
1. RUNS?     Does it execute without errors?
2. RIGHT?    Is the output format correct?
3. COMPLETE? Are all expected items present?
4. SAFE?     No obvious security issues?

4/4 = Ship it (for appropriate use cases)
3/4 = Quick fix needed
2/4 = Investigate deeper
1/4 = Start over or ask AI to fix
```

---

## Emergency Security Checklist

Before deploying ANYTHING, even prototypes:

```
□ No f-strings or % formatting in SQL queries
□ No user input in HTML without escaping
□ No hardcoded passwords/API keys
□ No sensitive data in logs
□ No CORS wildcard (*) for sensitive endpoints
□ Authentication required where expected
```

---

## My Vibe Check Notes

Space for your own observations:

```
Project: _________________________________

What I've learned to watch for:
_________________________________________
_________________________________________
_________________________________________

AI outputs I should never trust blindly:
_________________________________________
_________________________________________
_________________________________________
```
