# Strategy 3: Compress Context

Retain only essential tokens. When context gets too large, summarize.

## The Problem

Long conversations accumulate:
- Outdated attempts that didn't work
- Verbose explanations already understood
- Dead-end debugging paths
- Redundant code iterations

This leads to **context rot**: AI starts referencing old, irrelevant information.

---

## Compression Methods

### 1. Conversation Summary

When conversation gets long:

```
Before we continue, let me summarize our current state:

WORKING:
- Auth endpoints complete (login, register, logout)
- JWT middleware functional
- User model with password hashing

IN PROGRESS:
- Adding refresh token rotation
- Currently stuck on token storage approach

DECISIONS MADE:
- Using httpOnly cookies for tokens
- 15min access token, 7day refresh token

Let's continue from here with fresh context.
```

---

### 2. Handoff Documents

For switching sessions or agents:

```markdown
# Handoff: Invoice Feature

## Current State
- Database schema designed and migrated
- CRUD API endpoints implemented
- Frontend form scaffolded

## What's Next
- Connect form to API
- Add validation
- Implement PDF generation

## Key Files
- Backend: src/api/invoices.py
- Frontend: components/InvoiceForm.tsx
- Schema: src/models/invoice.py

## Blockers/Notes
- Using weasyprint for PDF (already installed)
- Tax calculation needs review with finance team
```

---

### 3. Sliding Window

Keep recent context, summarize older:

```
[Summary of turns 1-20]:
Built user authentication, decided on JWT, implemented login/register.

[Full context of turns 21-current]:
Now working on password reset...
```

---

### 4. Key Extraction

Pull out only the essentials:

Before:
```
Long debugging session with 50 back-and-forth messages
about why the API returns 500 errors...
```

After:
```
SOLUTION FOUND:
The 500 error was caused by missing database index.
Fix: CREATE INDEX idx_users_email ON users(email);
Applied migration: 2025_01_15_add_user_email_index.py
```

---

## When to Compress

| Signal | Action |
|--------|--------|
| AI referencing old, wrong code | Summarize current state |
| Conversation over 20+ turns | Create handoff |
| Quality of responses declining | Start fresh with summary |
| Switching to different task | Extract key decisions |
| Coming back after break | Read handoff, summarize |

---

## The Restart Pattern

When context is too polluted:

```
1. Create summary of:
   - What's working
   - What's decided
   - What's still needed
   - Key files/code

2. Start new conversation

3. Load summary + relevant files

4. Continue with clean context
```

---

## Compression Templates

### Session Summary Template

```markdown
# Session Summary - [Date]

## Accomplished
- [List of completed items]

## Current State
- [Working code/features]
- [Pending items]

## Key Decisions
- [Important choices made]

## Files Changed
- [List of modified files]

## Next Steps
- [What to do next]
```

### Handoff Template

```markdown
# Handoff: [Feature/Task]

## Context
[1-2 sentences on what this is]

## Progress
- [x] Done items
- [ ] Todo items

## Technical Details
[Key code, schemas, APIs involved]

## Notes for Next Session
[Important context, blockers, gotchas]
```

---

## Warning: What NOT to Compress

Keep full detail for:
- Security-related code
- Complex algorithms
- Non-obvious edge cases
- Important error handling
- Configuration details

---

## Live Demo

1. Start long conversation, work through multiple iterations
2. Notice AI starting to reference old, wrong code
3. Create summary of current state
4. Start fresh conversation with summary
5. Show improved quality of responses
