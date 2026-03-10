# Prompt: Ideas Swiper

Build a single-file HTML app that works like Tinder but for triaging ideas. Load a markdown file of bullet-point ideas, then swipe right to keep or left to delete each one.

## Layout & Design

- Dark gradient background: linear-gradient(135deg, #1a1a2e, #16213e)
- White text, centered layout, system font stack
- Title "Ideas Swiper" with a lightbulb emoji
- Stats line showing: Remaining / Kept / Deleted counts
- Card container: max-width 400px, 300px tall, with CSS perspective for 3D feel
- Cards: dark gradient background (linear-gradient 145deg, #2a2a4a to #1e1e3a), rounded corners (20px), centered text, heavy box-shadow
- Two overlay labels on the card that fade in as you drag:
  - "KEEP" (green #4ade80) appears top-right when dragging right
  - "DELETE" (red #f87171) appears top-left when dragging left
- Control buttons: two large circular buttons (60px) below the card — red X (delete) and green checkmark (keep)
- Undo button: small circle (40px) in top-left corner, gray
- Export button: top-right, green (#10b981), downloads kept ideas
- Keyboard hint at the bottom: "← Delete | Keep → | Z Undo"

## File Loading

- File input accepts .md and .txt files
- Parses the file by splitting on newlines, keeping only lines that start with `- ` (markdown bullet points), stripping the `- ` prefix
- Filters out ideas that were already processed (kept or deleted) based on localStorage state

## Swipe Mechanics

- **Drag/touch**: mousedown/touchstart initiates drag, mousemove/touchmove translates the card horizontally with rotation (currentX * 0.05 degrees). The KEEP/DELETE overlays fade in proportionally to drag distance (opacity = distance / 100, capped at 1).
- **Release**: if dragged more than 100px right → keep; more than 100px left → delete; otherwise snap back
- **Button controls**: clicking the X or checkmark buttons triggers the same swipe logic
- **Keyboard**: ArrowLeft = delete, ArrowRight = keep, Z = undo
- **Animation**: cards animate out with translateX(±150%) and rotate(±30deg) with opacity fade, then the next card renders after 300ms

## State Management

- `kept` and `deleted` arrays track processed ideas
- `history` stack enables undo — stores the idea text and which direction it was swiped
- Undo pops from history, removes the idea from kept/deleted, re-inserts it at the current position in the ideas array
- State (kept + deleted) persists to `localStorage` under key `ideas-swiper-state`
- On reload/re-upload, previously processed ideas are automatically skipped

## Export

- "Export Kept" button generates a markdown file with heading "# Kept Ideas" followed by each kept idea as a bullet point
- Downloads as `kept-ideas.md` using Blob + object URL + programmatic click
- Shows alert if no ideas have been kept yet

## Empty State

- Before file load: "Load your ideas file to begin swiping"
- After all ideas processed: "All done! Export your kept ideas." with party emoji
