# Iteration Prompts: Improving the Quote Collector

After the initial build, use these prompts to add features.

---

## Iteration 1: Edit Quotes

```
Add ability to edit existing quotes.
When I click an "Edit" button on a quote card:
- Show the add form pre-filled with the quote data
- Change the "Add" button to "Update"
- After updating, return to normal mode

Keep the existing functionality working.
```

---

## Iteration 2: Dark Mode

```
Add a dark mode toggle.
- Button in the top-right corner
- Toggle between light and dark themes
- Remember preference in localStorage
- Dark theme should have readable contrast

Use CSS variables for easy theme switching.
```

---

## Iteration 3: Search

```
Add a search box that filters quotes in real-time.
- Search matches quote text and author
- Case-insensitive
- Works together with tag filter
- Shows "No results" when nothing matches
```

---

## Iteration 4: Import

```
Add an import button that accepts a JSON file.
- Accepts the same format as export
- Merges with existing quotes (don't overwrite)
- Shows how many quotes were imported
- Handles invalid JSON gracefully
```

---

## Iteration 5: Sort Options

```
Add sorting options for quotes:
- Newest first (default)
- Oldest first
- Alphabetical by author
- Random shuffle

Dropdown or buttons to switch sort order.
```

---

## Progressive Enhancement Pattern

Notice how each iteration:
1. **Adds one feature** - not five things at once
2. **Maintains existing** - "Keep existing functionality"
3. **Specifies behavior** - exact user interaction
4. **Handles edge cases** - "invalid JSON gracefully"

---

## Handling Bugs

If something breaks during iteration:

```
The edit feature has a bug: after editing, the original quote
remains in the list along with the updated one.

Expected: Editing should replace the original quote
Current: Editing adds a duplicate

Please fix this while keeping other functionality working.
```

---

## Context Reset When Needed

If the conversation gets too long or confused:

```
Let me summarize our current state:

WORKING:
- Basic quote CRUD (add, delete)
- localStorage persistence
- Tag filtering
- JSON export
- Dark mode

BROKEN:
- Edit creates duplicates
- Search doesn't clear properly

Please fix the broken features. Here's the current code:
[paste full HTML file]
```

This is the "Restart When Stuck" pattern in action.
