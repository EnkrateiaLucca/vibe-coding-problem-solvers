# Demo 04: Case Study App

A practical demonstration of all 4 skills working together.

## The Project: Personal Quote Collector

A simple but complete HTML app that:
- Saves favorite quotes with authors and tags
- Filters by tag
- Exports to JSON
- Works entirely offline (localStorage)

**Why this project?**
- Simple enough for a live demo
- Complex enough to show real patterns
- Demonstrates common vibe coding scenarios
- Easy to verify and vibe check

## Demo Files

- `prompts/` - The exact prompts used to build this app
- `quote-collector.html` - The finished app (single file)
- `building-log.md` - Step-by-step chronicle of building the app
- `vibe-checks.md` - What we verified and how

## The 4 Skills in Action

### 1. Prompting (Clear & Direct)
```
"Create a single-file HTML app for collecting quotes.
Include: quote text, author, tags (comma-separated).
Store in localStorage. Display as cards with filter by tag."
```

### 2. Context Management (Write)
```
CLAUDE.md includes:
- Single-file HTML preferred
- No external dependencies
- localStorage for persistence
- Modern CSS (flexbox, grid)
```

### 3. Capability Assignment (Right Tool)
- **Claude Artifacts**: Quick UI iteration
- **Claude Code**: File system integration
- **Browser DevTools**: Vibe checking

### 4. Vibe Checking
- Does it save quotes? ✓
- Does filter work? ✓
- Does export produce valid JSON? ✓
- Is localStorage actually used? ✓ (check DevTools)

## Live Demo Flow

1. **Build the basic app** (10 min)
   - Show the initial prompt
   - Generate the app
   - Run vibe checks

2. **Iterate on feedback** (5 min)
   - "Add ability to edit quotes"
   - "Add dark mode toggle"

3. **Handle edge cases** (5 min)
   - What happens with empty quotes?
   - What if localStorage is full?

4. **Export and verify** (5 min)
   - Export to JSON
   - Verify the data structure
   - Import into new session

## What This Demonstrates

| Skill | How It's Used |
|-------|---------------|
| Prompting | Clear specs for each feature |
| Context | Consistent preferences across prompts |
| Capability | Using the right tool for each task |
| Vibe Checking | Quick verification at each step |

## Try It Yourself

1. Copy the prompts from `prompts/01-initial.md`
2. Paste into Claude or your preferred tool
3. Run the generated HTML
4. Apply vibe checks from `vibe-checks.md`
5. Iterate with prompts from `prompts/02-iterations.md`
