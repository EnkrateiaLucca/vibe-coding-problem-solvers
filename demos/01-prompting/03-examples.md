# Skill 3: Examples (Few-Shot Prompting)

Show the AI exactly what you want. One good example is worth a hundred words of description.

## The Power of Examples

Without examples, you get what the AI thinks you want.
With examples, you get what you actually want.

---

## Pattern: Input → Output Pairs

### Date Formatting

**Without Examples:**
```
Write a function to format dates nicely
```
Result: Could be any format!

**With Examples:**
```
Write a Python function to format dates.

Examples:
Input: "2025-01-15" → Output: "Jan 15, 2025"
Input: "2025-12-25" → Output: "Dec 25, 2025"
Input: "2025-03-01" → Output: "Mar 1, 2025"
```
Result: Exactly the format you need.

---

### Text Processing

**Without Examples:**
```
Convert names to username format
```

**With Examples:**
```
Convert full names to usernames following this pattern:

Input: "John Smith" → Output: "jsmith"
Input: "Mary Jane Watson" → Output: "mwatson"
Input: "Robert De Niro" → Output: "rdeniro"
Input: "Madonna" → Output: "madonna"
```

---

### Data Transformation

**Without Examples:**
```
Parse this log file
```

**With Examples:**
```
Parse log lines into JSON objects:

Input: "2025-01-15 14:32:01 ERROR Database connection failed"
Output: {"timestamp": "2025-01-15T14:32:01", "level": "ERROR", "message": "Database connection failed"}

Input: "2025-01-15 14:32:05 INFO Retry successful"
Output: {"timestamp": "2025-01-15T14:32:05", "level": "INFO", "message": "Retry successful"}
```

---

## Edge Cases: The Secret Weapon

Good examples include edge cases:

```
Write a function to extract the domain from URLs:

Normal case:
Input: "https://www.example.com/path" → Output: "example.com"

Subdomains:
Input: "https://api.staging.example.com" → Output: "example.com"

No www:
Input: "https://example.com" → Output: "example.com"

With port:
Input: "https://example.com:8080/api" → Output: "example.com"

Edge case - IP address:
Input: "http://192.168.1.1/admin" → Output: "192.168.1.1"
```

---

## How Many Examples?

| Complexity | Examples Needed |
|------------|----------------|
| Simple transformation | 2-3 |
| Multiple variations | 3-5 |
| Complex logic | 5-7 |
| Edge cases matter | Include each edge case |

---

## Live Demo

Try converting unstructured meeting notes:

```
Convert meeting notes to action items:

Input: "We need to update the homepage by Friday.
Sarah will handle the design."
Output: [
  {"action": "Update homepage", "deadline": "Friday", "assignee": null},
  {"action": "Handle homepage design", "deadline": "Friday", "assignee": "Sarah"}
]

Input: "Bob mentioned we should look into caching later"
Output: [
  {"action": "Look into caching", "deadline": null, "assignee": "Bob"}
]

Now convert this:
"Quick sync - John's doing the API, needs to finish before demo day.
We also talked about refactoring but no rush."
```

The AI now understands your exact output format and extraction logic.
