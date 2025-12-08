# Practice Scenarios: Vibe Checking Exercises

Try these exercises to develop your vibe checking instincts.

---

## Scenario 1: The CSV Parser

**Situation:**
You asked AI to parse a CSV with 500 employee records into JSON.

**AI Output:**
```json
[
  {"id": 1, "name": "Alice Smith", "department": "Engineering"},
  {"id": 2, "name": "Bob Johnson", "department": "Marketing"},
  ... (shows 312 records)
]
```

**Vibe Check Questions:**
1. What's wrong here?
2. What quick check reveals the issue?
3. What's likely causing it?

<details>
<summary>Answer</summary>

**Issue:** Only 312 records, expected 500
**Quick check:** `len(output)` shows 312 instead of 500
**Likely cause:** Context window limit hit, or rows with special characters were skipped
**Fix:** Process in batches or investigate skipped rows

</details>

---

## Scenario 2: The Authentication Function

**Situation:**
You asked for a login function. AI produces:

```python
def login(username, password):
    user = db.query(f"SELECT * FROM users WHERE username = '{username}'")
    if user and user.password == password:
        return create_session(user)
    return None
```

**Vibe Check Questions:**
1. What red flags do you see?
2. What's the severity?
3. Is this safe for a prototype?

<details>
<summary>Answer</summary>

**Red flags:**
1. SQL injection vulnerability (string interpolation)
2. Passwords compared in plain text (should be hashed)
3. No rate limiting

**Severity:** CRITICAL - security issues
**Prototype safe?:** NO - even prototypes shouldn't have SQL injection
**Action:** Full review required, don't use as-is

</details>

---

## Scenario 3: The File Size Check

**Situation:**
You asked AI to generate a simple HTML dashboard for displaying 5 metrics.

**AI Output:**
- dashboard.html: 2.3 MB

**Vibe Check Questions:**
1. Is this expected?
2. What should you investigate?

<details>
<summary>Answer</summary>

**Expected?:** NO - simple HTML should be ~10-50KB
**Investigate:**
- Embedded base64 images?
- Inline CSS/JS libraries?
- Duplicated content?

**Quick check:** Open file, search for `data:image` or look at line count
**Likely cause:** AI embedded entire charting library or images inline

</details>

---

## Scenario 4: The API Response

**Situation:**
AI built an API that should return user profiles.

**Test:**
```bash
curl http://localhost:3000/api/users/1
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password_hash": "a8f5f167f44f4964e6c998dee827110c",
  "ssn": "123-45-6789",
  "credit_card": "4111111111111111"
}
```

**Vibe Check Questions:**
1. What's the immediate red flag?
2. What's the severity?
3. What should you do?

<details>
<summary>Answer</summary>

**Red flag:** Sensitive data exposed (password hash, SSN, credit card)
**Severity:** CRITICAL - data breach waiting to happen
**Action:**
1. Do NOT deploy
2. Add response filtering
3. Full security review required
4. This is NOT vibe coding territory - full review needed

</details>

---

## Scenario 5: The Date Formatter

**Situation:**
You asked for a function to format dates as "Jan 15, 2025".

**AI Output:**
```python
def format_date(date_str):
    from datetime import datetime
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    return dt.strftime("%b %d, %Y")
```

**Quick Test:**
```python
print(format_date("2025-01-15"))  # Jan 15, 2025 ✓
print(format_date("2025-12-01"))  # Dec 01, 2025 ✓
```

**Vibe Check Questions:**
1. Green flags or red flags?
2. Is this ready to use?
3. What might still be missing?

<details>
<summary>Answer</summary>

**Flags:** Mostly green
- Output format is correct
- Basic tests pass

**Ready to use:** Yes, for vibe coding purposes

**Potentially missing:**
- Error handling for invalid dates
- Handling for different input formats

**Verdict:** Good enough for a prototype or personal project

</details>

---

## Scenario 6: The Performance Issue

**Situation:**
AI wrote a function to process a list of 10,000 items.
It runs, but takes 45 seconds.

**Vibe Check Questions:**
1. Is 45 seconds expected?
2. What quick check would you do?
3. Red flag or acceptable?

<details>
<summary>Answer</summary>

**Expected?:** Depends on the operation
- Simple transform: Should be milliseconds (RED FLAG)
- API calls per item: Maybe acceptable
- Complex computation: Needs review

**Quick check:**
```python
import time
start = time.time()
result = process([data[0]])  # Single item
print(f"One item: {time.time() - start}s")
```

If one item takes 4.5ms, then 10,000 items = 45s is expected
If one item takes 0.1ms, then O(n²) complexity issue

**Action:** Profile to identify if it's expected or a bug

</details>

---

## Self-Assessment: Vibe Check Instinct Score

After these exercises, rate yourself:

```
[ ] I can spot size discrepancies quickly
[ ] I know when to investigate vs trust
[ ] I can identify security red flags
[ ] I test boundaries automatically
[ ] I know what's acceptable for prototypes
```

4-5 checks: Strong vibe checking instincts
2-3 checks: Developing - keep practicing
0-1 checks: Review the red flags guide again
