# Building Log: Quote Collector

A chronicle of building the app using vibe coding principles.

---

## Phase 1: Initial Build (10 minutes)

### The Prompt
Used the prompt from `prompts/01-initial.md` - clear, specific, constrained.

### What We Got
- ~250 lines of HTML/CSS/JS
- Working CRUD operations
- localStorage persistence
- Basic styling

### Vibe Checks Performed

| Check | Result |
|-------|--------|
| File runs without errors | ✓ |
| Can add a quote | ✓ |
| Quote survives refresh | ✓ |
| Can delete a quote | ✓ |
| Export works | ✓ |

### Issues Found
- None in initial build

---

## Phase 2: Adding Edit Feature (5 minutes)

### The Prompt
```
Add ability to edit existing quotes.
When I click "Edit" on a quote card, show the form pre-filled.
Change the Add button to "Update".
After updating, return to normal add mode.
```

### Vibe Checks

| Check | Result |
|-------|--------|
| Edit button appears | ✓ |
| Form fills correctly | ✓ |
| Update saves changes | ✓ |
| No duplicate created | ✓ |

---

## Phase 3: Adding Dark Mode (5 minutes)

### The Prompt
```
Add dark mode toggle button.
Remember preference in localStorage.
Use CSS variables for easy theming.
```

### Vibe Checks

| Check | Result |
|-------|--------|
| Toggle button works | ✓ |
| Theme persists on refresh | ✓ |
| All elements readable | ✓ |

### Issue Found
First attempt had low contrast on tags in dark mode.

### Fix Prompt
```
The tag badges are hard to read in dark mode.
Increase the contrast for --accent-light in dark theme.
```

Fixed in one iteration.

---

## Total Time: ~20 minutes

From zero to working app with:
- Full CRUD
- Persistence
- Tag filtering
- Export
- Dark mode
- Responsive design

---

## Skills Used

| Skill | How Used |
|-------|----------|
| **Prompting** | Clear specs, constraints, decomposed features |
| **Context** | CLAUDE.md preferences (single file, no deps) |
| **Capability** | Claude for UI, browser DevTools for verification |
| **Vibe Check** | Quick tests after each feature |

---

## Key Decisions Made

1. **Single file** - Easier to share and demo
2. **localStorage** - No backend needed
3. **CSS variables** - Enabled dark mode easily
4. **ID generation** - Timestamp + random for uniqueness

---

## What Wasn't Vibe Coded

- No production security review
- No edge case testing for huge data
- No accessibility audit
- No performance optimization

These would be needed for production, but for a personal tool or prototype, the vibe checked version is sufficient.

---

## Lessons Learned

1. **Start simple, iterate** - Basic app first, features later
2. **One feature per prompt** - Easier to verify
3. **Vibe check immediately** - Don't stack untested changes
4. **Context helps** - CLAUDE.md saved re-explaining preferences
5. **Know when to restart** - If iteration gets messy, start fresh
