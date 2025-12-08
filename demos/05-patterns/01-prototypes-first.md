# Pattern 1: Start with Prototypes

Don't over-plan. Get something working, then iterate.

## The Problem

Traditional approach:
```
Idea → Requirements → Design → Architecture → Implementation → Testing
```

This takes forever and you might build the wrong thing.

## The Vibe Coding Approach

```
Fuzzy Idea → Working Prototype → Iterate → Refine
     ↑            5 minutes        ↓
     └─────── Learn what you actually want ←───┘
```

---

## Example: Dashboard

### Traditional Way
1. Write requirements document
2. Create wireframes
3. Design component hierarchy
4. Choose charting library
5. Set up build system
6. Finally write code...

### Prototype First Way

**Prompt:**
```
Create a simple HTML dashboard that shows:
- Total sales (card with big number)
- Sales by region (bar chart)
- Recent orders (table with 5 rows)

Use Chart.js from CDN. Sample data is fine.
Single HTML file I can open in browser.
```

**5 minutes later:** Working dashboard to show stakeholders

**Now iterate:**
```
"Add a date filter to the top"
"Change the bar chart to show monthly trends"
"Add color coding - red if sales below target"
```

---

## When to Use This Pattern

| Situation | Prototype First? |
|-----------|-----------------|
| Unclear requirements | Yes |
| Stakeholder demo needed | Yes |
| Exploring possibilities | Yes |
| Production system | Start with prototype, then engineer properly |
| Learning new tech | Yes |

---

## Prototype Prompt Templates

### For UI
```
Create a [simple/basic] [type] that shows [data/features].
Use [technology]. Sample data is fine.
Single file I can open in browser.
```

### For Scripts
```
Write a Python script that [task].
Don't worry about edge cases.
Just make the basic flow work.
```

### For APIs
```
Create a minimal API endpoint that [functionality].
Hardcode the data for now.
Just show me the structure.
```

---

## The Iteration Loop

```
1. Generate prototype (5 min)
   └── Does basic concept work?

2. Show/test it
   └── What's missing? What's wrong?

3. Iterate with specific feedback
   └── "Add X", "Change Y to Z"

4. Repeat until satisfied

5. (Optional) Rebuild properly
   └── Now you know exactly what to build
```

---

## Real Example: Building This Training

How these demo materials were created:

```
1. Prototype: Generated first draft of all demo files
2. Review: Read through, identified gaps
3. Iterate: "Add practice scenarios", "Include more examples"
4. Refine: Polished specific sections
5. Final: Coherent demo package
```

Total time: Much faster than writing from scratch.

---

## Key Insight

> "I have no idea what I want until I see what I don't want."

Prototypes help you discover requirements by giving you something concrete to react to.

---

## Live Demo

**Exercise:** Build a habit tracker

1. **First prompt:**
```
Create a simple HTML habit tracker.
List of habits I want to track daily.
Click to mark as done for today.
Show streak count for each habit.
Store in localStorage.
Single file, no dependencies.
```

2. **After seeing it:**
```
"Add ability to add new habits"
"Show a week view instead of just today"
"Add color - green for done, red for missed"
```

Notice how requirements emerge through iteration.
