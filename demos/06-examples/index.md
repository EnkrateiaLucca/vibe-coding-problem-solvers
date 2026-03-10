# Prompt: Note Finder

Build a single-file HTML app called "Note Finder - Lightning Fast Search" — a two-panel note viewer with search and keyboard navigation.

## Layout & Design

- Dark theme with CSS custom properties:
  - Backgrounds: #0a0e27 (primary), #161b33 (secondary), #1e2640 (tertiary)
  - Text: #e4e7f5 (primary), #9ca3c0 (secondary)
  - Accent: #6366f1 (indigo), hover: #818cf8
  - Border: #2d3350
- System font stack (-apple-system, BlinkMacSystemFont, etc.)
- Full viewport height, no scrolling on body (overflow: hidden)
- Two-panel CSS grid layout: left sidebar (400px fixed) | right content area (1fr)
- Custom dark scrollbar styling
- The title "Note Finder" uses a gradient text effect (accent colors)

## Left Sidebar

- Header section with app title and a stats line showing note count (e.g., "42 notes" or "12 of 42 notes" when filtering)
- Search input with dark background, indigo focus ring, placeholder "Search your notes..."
- Scrollable notes list below the search box
- Each note item shows:
  - Date in accent color (bold)
  - A one-line preview of the note content (truncated with ellipsis)
- Active note has an indigo left border, hover shows a subtle border
- Search matches are highlighted with a semi-transparent indigo background

## Right Content Panel

- Empty state: centered emoji (notebook) with "Select a note to read" text
- When a note is selected: shows the full note with a header (date + filename in monospace) separated by a border, then the full content in pre-wrap with 1.8 line-height
- Search terms are highlighted in the content using safe DOM-based highlighting (not innerHTML)
- Max-width 800px, centered

## Data & API

- Fetches notes from `GET /api/notes` — expects a JSON array of objects with fields: `content`, `dateDisplay`, `filename`
- Shows "Loading notes..." while fetching

## Keyboard Navigation

- `↑` / `↓` arrow keys navigate between notes in the list
- `Enter` opens the selected note
- `/` focuses the search input (like vim)
- `Escape` blurs the search input
- A fixed hint bar in the bottom-right shows these keyboard shortcuts with styled `kbd` elements
- Search input auto-focuses on load

## Security

- All text rendering uses safe DOM methods (createElement, textContent) instead of innerHTML to prevent XSS
- Search highlight uses DOM-based text splitting, not regex replacement in HTML strings
