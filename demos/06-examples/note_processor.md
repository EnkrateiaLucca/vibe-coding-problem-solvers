# Prompt: Note Processor

Build a single-file HTML app called "Note Processor" that connects to a local REST API at `http://localhost:5001/api` to manage notes tagged with `@read`.

## Layout & Design

- Use a branded design system with these CSS custom properties:
  - Primary: ink-black (#000000), warm-cream (#F5F3EB)
  - Accents: coral (#E86B5A), golden (#F5C542), sage (#7CB56B), sky (#5B9BD5)
  - Each accent has a light tint variant for backgrounds
  - Grays: #F5F4F1, #DDD9D2, #8A847A, #5C5750, #2A2825
- Fonts: IBM Plex Sans (body) and JetBrains Mono (buttons, code), loaded from Google Fonts
- Container: max-width 900px, centered, white background with 2px solid black border, no border-radius (sharp edges)
- Header: black background with white text, title "Note Processor", subtitle "Process your @read tagged notes"
- Below the header, a 4-color accent stripe bar (coral, golden, sage, sky) spanning the full width
- Items have a hover effect: black border + 4px box-shadow offset creating a "lifted" look
- Buttons use JetBrains Mono, uppercase, with letter-spacing. Two styles:
  - Primary: black background, white text
  - Danger: white background with coral border and text, fills coral on hover
- Footer hint with gray background telling the user to "kill the process on port 5001" when done, with inline `code` styling

## Functionality

- On page load, fetch items from `GET /api/items/read` — response has `{ success, items, count }`
- Display a "Reading List" section with a counter badge (sky-colored) showing item count
- Each item shows its text and action buttons:
  - If the text contains a URL, show a "View" button (sky-colored) that opens the link in a new tab
  - Always show a "Delete" button (coral/danger style)
- "Refresh" button reloads items, "Delete All" button removes everything
- Delete single item: `DELETE /api/items/read` with body `{ lines: [item.full_line] }`
- Delete all: `DELETE /api/items/read` with body `{ delete_all: true }`
- Both deletes require a `confirm()` dialog first
- Toast notifications slide in from the right (top-right corner) with success (sage) or error (coral) styling, auto-dismiss after 3 seconds
- Empty state shows an SVG book icon with "No @read items found" message
- Loading state shows animated dots ("Loading...")
- All user-provided text must be HTML-escaped to prevent XSS
