# Red Flags: Signs to Investigate

When you see these, stop and look deeper. Something is probably wrong.

## Dramatic Size Discrepancies

**The Signal:** Output size wildly different from expectation.

```
EXAMPLE: Simon Willison's Open Sauce app
Expected: Small schedule JSON + HTML
Actual: 176 requests, 130MB download

The Fix: Images weren't optimized
Result: 93.58 KB (1,400x smaller)
```

**Quick Check:**
- Is the file 10x larger than expected?
- Is it 10x smaller than expected?
- Either way, investigate.

---

## Incomplete Processing

**The Signal:** AI skipped items without telling you.

```
Asked: "Convert all 200 records"
Received: Only 150 records converted

Check: print(len(input)), print(len(output))
```

**Common Causes:**
- Context window overflow
- Timeout during processing
- Silently dropped edge cases
- Duplicate detection removing valid items

---

## Hallucinated APIs/Libraries

**The Signal:** AI invents functions that don't exist.

```
Code uses: response.json_safe()  # Not a real method
Should be: response.json()

Code imports: from flask.auth import require_login  # Doesn't exist
```

**Quick Check:**
- Do the imports exist?
- Are method names real?
- Check documentation for anything unfamiliar

---

## False Positives/Negatives

**The Signal:** Validation passes/fails incorrectly.

```
Validation says: "user@example" is valid email
Reality: Missing domain extension

Validation says: "+1-555-123-4567" is invalid
Reality: Perfectly valid phone format
```

**Quick Check:**
- Test obvious valid cases
- Test obvious invalid cases
- Test edge cases you care about

---

## Context Blindness

**The Signal:** AI ignores important context you provided.

```
You said: "We use PostgreSQL"
AI generates: MySQL-specific syntax

You said: "Keep it under 50 lines"
AI generates: 200 lines of code
```

**Common Causes:**
- Context too long, key info buried
- Conflicting instructions
- Outdated context from earlier in conversation

---

## Repetitive/Over-Formal Patterns

**The Signal:** Code looks like AI boilerplate.

```
RED FLAGS:
- Every function has identical docstring structure
- Excessive comments stating the obvious
- # This function adds two numbers
- return x + y
- Unnecessary abstraction layers
- Perfect but impractical code
```

**Quick Check:**
- Would a human write it this way?
- Is it over-engineered for the task?

---

## Missing Error Handling

**The Signal:** Happy path only, no error handling.

```
def get_user(id):
    return db.query(User).get(id)  # What if id is None?
                                    # What if user doesn't exist?
                                    # What if DB connection fails?
```

**Quick Check:**
- What happens with invalid input?
- What happens when external services fail?
- What happens at boundaries (0, null, max)?

---

## Security Red Flags

**The Signal:** Common vulnerabilities present.

```
DANGER:
query = f"SELECT * FROM users WHERE id = {user_input}"  # SQL injection

DANGER:
<div dangerouslySetInnerHTML={{__html: userContent}} />  # XSS

DANGER:
password = request.args.get('password')  # Password in URL
```

**Always Check:**
- User input handling
- Database queries
- Authentication logic
- Data exposure

---

## Red Flag Response Flowchart

```
See Red Flag?
│
├── Size wrong → Check data completeness
├── Missing items → Verify processing logic
├── Unknown APIs → Check documentation
├── Wrong validation → Test edge cases
├── Ignored context → Restart with clear context
├── Security issue → Full review required
│
└── When in doubt → Ask AI to explain the code
```

---

## Quick Red Flag Checklist

```
□ Size dramatically off from expectation
□ Items missing from output
□ Unfamiliar methods/imports
□ Obvious validation failures
□ Context instructions ignored
□ Over-engineered boilerplate
□ No error handling
□ Potential security issues
```
