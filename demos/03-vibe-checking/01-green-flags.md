# Green Flags: Signs to Trust the Output

When you see these, the output is probably correct. Trust and move on.

## Output Quantity Matches Expectations

**Check:** Does the amount of output match what you asked for?

```
Asked for: "Parse these 100 log lines"
Received: Array with 100 entries
→ GREEN FLAG

Asked for: "Parse these 100 log lines"
Received: Array with 47 entries
→ RED FLAG (investigate missing 53)
```

---

## File Sizes Are Reasonable

**Check:** Is the file size proportional to the data?

```
Generated: HTML file for simple dashboard
Size: 15KB
→ GREEN FLAG (reasonable for HTML + CSS)

Generated: HTML file for simple dashboard
Size: 2MB
→ RED FLAG (probably embedded unnecessary assets)
```

---

## Basic Functionality Tests Pass

**Check:** Does the happy path work?

```
Asked for: Login function
Test: Can I log in with valid credentials?
Result: Yes, redirects to dashboard
→ GREEN FLAG

Result: Returns undefined
→ RED FLAG
```

---

## Error-Free Execution

**Check:** Does it run without crashes?

```
Run: python script.py
Output: "Processing complete. 50 files handled."
→ GREEN FLAG

Run: python script.py
Output: Traceback... TypeError...
→ RED FLAG
```

---

## Consistent Formatting

**Check:** Is the output format consistent throughout?

```
Asked for: JSON array of users
Received:
[
  {"id": 1, "name": "Alice"},
  {"id": 2, "name": "Bob"},
  {"id": 3, "name": "Charlie"}
]
→ GREEN FLAG (consistent structure)

Received:
[
  {"id": 1, "name": "Alice"},
  {"id": "2", "name": "Bob"},
  {"id": 3, "username": "Charlie"}
]
→ RED FLAG (inconsistent types, key names)
```

---

## Expected Dependencies Present

**Check:** Are the imports/dependencies what you'd expect?

```
Asked for: React component with forms
Imports: React, useState
→ GREEN FLAG

Imports: React, useState, lodash, moment, axios, redux
→ AMBER FLAG (maybe over-engineered?)
```

---

## Code Structure Matches Conventions

**Check:** Does the code follow expected patterns?

```
Asked for: Express route handler
Received:
- Uses req, res parameters
- Has try/catch
- Returns appropriate status codes
- Follows middleware pattern
→ GREEN FLAG
```

---

## Quick Green Flag Checklist

```
□ Output quantity matches input quantity
□ File/response size is reasonable
□ Basic functionality works
□ No runtime errors
□ Formatting is consistent
□ Dependencies make sense
□ Code follows expected patterns
```

---

## The 10-Second Scan

Train yourself to do this automatically:

1. **Glance at size** - Roughly what you expected?
2. **Run it** - Does it execute?
3. **Check one output** - Does the first/last item look right?
4. **Scan structure** - Consistent shape?

If all four pass, the output is probably fine for vibe coding purposes.
