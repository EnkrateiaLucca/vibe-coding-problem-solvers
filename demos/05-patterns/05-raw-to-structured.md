# Pattern 5: Raw → Structured

Transform messy, unstructured data into clean, usable formats.

## The Problem

Data often arrives as:
- Free-form meeting notes
- Pasted text from emails
- Natural language descriptions
- Inconsistent formats

You need it as:
- JSON for APIs
- CSV for spreadsheets
- Calendar events
- Database records

---

## The Pattern

```
Unstructured Input     →     Structured Output
─────────────────────        ─────────────────────
"Meeting with Bob           {
Tuesday 2pm,                  "title": "Meeting with Bob",
review docs Wednesday         "date": "2025-01-14",
morning"                      "time": "14:00"
                            }
```

---

## Prompt Template

```
Convert this unstructured text into [format]:

[Paste raw text]

Output format:
[Show desired structure with example]

Handle missing data by: [rule]
```

---

## Example 1: Meeting Notes → Action Items

**Input:**
```
Team sync notes:
- Bob will finish the API by Friday
- Need to review Sarah's PR before EOD
- Marketing wants the landing page copy by next week
- Database migration can wait until after launch
- Quick fix needed for the login bug - John looking at it
```

**Prompt:**
```
Extract action items from these meeting notes.

Output as JSON array with structure:
{
  "action": "description",
  "assignee": "name or null",
  "deadline": "date or null",
  "priority": "high/medium/low"
}

Infer priority: deadlines today/tomorrow = high, this week = medium, later = low
```

**Output:**
```json
[
  {
    "action": "Finish the API",
    "assignee": "Bob",
    "deadline": "Friday",
    "priority": "medium"
  },
  {
    "action": "Review Sarah's PR",
    "assignee": null,
    "deadline": "EOD today",
    "priority": "high"
  },
  {
    "action": "Fix login bug",
    "assignee": "John",
    "deadline": null,
    "priority": "high"
  }
]
```

---

## Example 2: Free Text → Calendar Events

**Input:**
```
reminder: dentist appointment next tuesday 3pm
coffee with jane wednesday 10am
quarterly review friday 2-4pm
mom's birthday march 15
```

**Prompt:**
```
Convert these reminders to calendar events.

Output as JSON array:
{
  "title": "event name",
  "date": "YYYY-MM-DD",
  "time": "HH:MM or null",
  "duration_minutes": number or null,
  "all_day": boolean
}

Today is 2025-01-13.
For relative dates (next tuesday), calculate actual date.
```

---

## Example 3: Log Lines → Structured Data

**Input:**
```
2025-01-15 14:32:01 ERROR [auth] Login failed for user john@example.com
2025-01-15 14:32:05 INFO [auth] Retry successful for john@example.com
2025-01-15 14:32:10 WARN [db] Connection pool at 80% capacity
2025-01-15 14:32:15 ERROR [api] Timeout calling payment service
```

**Prompt:**
```
Parse these log lines into JSON objects.

Output structure:
{
  "timestamp": "ISO datetime",
  "level": "ERROR/INFO/WARN",
  "component": "string",
  "message": "string",
  "metadata": {} // extract any entities like emails, services
}
```

---

## Example 4: Requirements → User Stories

**Input:**
```
We need a way for users to reset their passwords.
They should get an email with a link.
Link expires after 24 hours.
Can only be used once.
Show error if link is invalid.
```

**Prompt:**
```
Convert these requirements into user stories.

Output format:
{
  "id": "US-001",
  "title": "short title",
  "story": "As a [role], I want [feature], so that [benefit]",
  "acceptance_criteria": ["list", "of", "criteria"]
}
```

---

## Common Transformations

| From | To | Use Case |
|------|-----|----------|
| Meeting notes | Action items | Task management |
| Natural language | Calendar JSON | Event creation |
| Error logs | Structured data | Analysis |
| Requirements | User stories | Agile planning |
| Contacts list | vCard/CSV | Import/export |
| Recipe text | JSON | Recipe apps |
| Resume text | JSON | ATS systems |

---

## Tips for Better Extraction

### 1. Provide Examples
```
Input: "Meeting with Bob Tuesday 2pm"
Output: {"title": "Meeting with Bob", "day": "Tuesday", "time": "14:00"}

Now convert:
[your input]
```

### 2. Handle Ambiguity
```
When date is unclear:
- "next week" = one week from today
- "EOD" = 17:00
- No deadline mentioned = null
```

### 3. Specify Missing Data Handling
```
If information is missing:
- Use null for unknown values
- Use "unspecified" for optional fields
- Don't make up data
```

---

## Building a Transformation Pipeline

For repeated transformations, create a dedicated prompt:

```
You are a meeting notes parser.

Input: Free-form meeting notes
Output: Structured JSON with action items

Rules:
1. Extract action items with assignee and deadline
2. Mark items with no deadline as priority: low
3. Mark items with today/tomorrow deadline as priority: high
4. Preserve exact wording of tasks
5. If assignee unclear, use null

Output schema:
[
  {
    "task": string,
    "assignee": string | null,
    "deadline": string | null,
    "priority": "high" | "medium" | "low"
  }
]

Process this:
[paste notes]
```

Save this prompt for reuse.

---

## Live Demo

**Exercise:**

Take this raw text:

```
from the meeting:
- need new landing page designs ASAP (maria)
- api docs need updating before release
- fix the checkout bug that john reported
- consider adding dark mode to dashboard (low priority)
- budget review meeting next thursday 3pm
- hire 2 more engineers Q1
```

Transform to structured action items and calendar events in one prompt.
