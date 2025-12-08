# Pattern 3: Restart When Stuck

When context gets polluted, start fresh with a summary.

## The Problem: Context Rot

Long conversations accumulate:
- Failed attempts the AI keeps referencing
- Outdated code versions
- Contradictory instructions
- Irrelevant tangents

**Signs of context rot:**
- AI keeps making the same mistakes
- Quality of responses degrades
- AI references code you've already changed
- Suggestions become increasingly off-target

---

## The Solution: Strategic Restart

```
┌──────────────────────────────────────────┐
│  STUCK DETECTION                         │
│                                          │
│  □ Same error after 3+ attempts?         │
│  □ AI suggesting already-tried fixes?    │
│  □ Quality noticeably worse than start?  │
│  □ Going in circles?                     │
│                                          │
│  2+ checks = Time to restart             │
└──────────────────────────────────────────┘
```

---

## The Restart Process

### Step 1: Summarize Current State

Before starting a new conversation, document:

```markdown
# Current State Summary

## What's Working
- User authentication complete
- Database schema migrated
- Basic CRUD operations functional

## What's Broken
- Edit function creates duplicates
- Dark mode toggle doesn't persist

## Key Files
- src/auth.py (working)
- src/crud.py (has bug on line 45)

## What We've Tried
- Fixed index reference (didn't help)
- Added console logs (confirmed function runs twice)

## Current Theory
Event handler might be attached twice
```

### Step 2: Start Fresh

Begin new conversation with clean context:

```
I'm working on a Python Flask app. Here's my current situation:

[Paste summary]

Here's the relevant code:

[Paste only the broken file]

The specific issue: Edit function creates duplicates.
Please help me identify why the function might be running twice.
```

### Step 3: Apply Fresh Perspective

The new context is clean. The AI can analyze without baggage.

---

## When to Restart

| Signal | Restart? |
|--------|----------|
| 10+ minutes on same bug | Yes |
| AI repeating suggestions | Yes |
| You're frustrated | Yes |
| Just switching tasks | Optional |
| Making good progress | No |

---

## The 10-Minute Rule

```
Set a timer when you hit a wall.

If after 10 minutes you're still stuck:
1. Stop
2. Summarize what you know
3. Start fresh conversation
4. Continue with clean context
```

This prevents sunk cost fallacy ("I've invested so much, I'll keep trying").

---

## Summary Templates

### Short Summary (for simple issues)
```
Working on: [what]
The problem: [specific issue]
Tried: [what you tried]
Code: [paste relevant section]
```

### Full Summary (for complex situations)
```markdown
# Session Handoff

## Context
[Brief project description]

## Current Goal
[What you're trying to accomplish]

## State
- Working: [list]
- Broken: [list]
- Blocked on: [specific issue]

## Relevant Code
[Only the code needed to understand the issue]

## What's Been Tried
[Failed approaches so the AI doesn't suggest them again]

## Suspected Cause
[Your theory, if any]
```

---

## Example: Before and After

### Before Restart (Polluted Context)
```
Turn 15:
User: It's still not working
AI: Have you tried [thing suggested in turn 8]?
User: Yes, that was turn 8
AI: Let me look at the code again...
[Suggests same broken approach]
```

### After Restart (Clean Context)
```
Turn 1:
User: [Clean summary of problem + code]
AI: I see the issue. The event handler is being
attached in a loop without cleanup. Here's the fix...
[Actually solves it]
```

---

## Automation: Handoff Commands

Many tools support creating handoffs:

```
/create_handoff

"Write a handoff document summarizing our current state,
what's working, what's broken, and what to do next.
Format for pasting into a new conversation."
```

---

## Live Demo

**Exercise:**

1. Start a conversation, ask for a feature
2. Intentionally go down a wrong path for several turns
3. Notice degradation in response quality
4. Create a summary of current state
5. Start new conversation with summary
6. Compare response quality

The difference is usually dramatic.
