# Prompt: LLM Prompt Results Visualizer

Build a single-file HTML tool for visualizing LLM experiment results from CSV or JSON files. Keep it minimal and functional — no framework, just vanilla JS.

## Layout & Design

- Clean, minimal design with system font stack
- Simple body padding (24px), no heavy styling
- Light borders (#ddd, #e5e5e5) and subtle backgrounds (#fafafa)
- Summary cards in a responsive CSS grid (auto-fit, minmax 240px)
- Each card has a muted label and a large bold value (24px)
- Full-width data table with sticky headers, monospace font for code-like fields
- Tags/badges with pill shape (border-radius: 999px) for provider names
- Errors displayed in red (#b00)

## Header

- Title "LLM Prompt Results"
- File input accepting .csv and .json files
- Search input (type="search") with placeholder "Filter by provider/model/text..."
- A muted metadata line showing current sort key, direction, and active filter

## File Loading

- CSV files: parse using PapaParse (loaded from CDN: `https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js`) with `header: true` and `skipEmptyLines: true`. Coerce numeric columns (`latency_ms`, `input_tokens`, `output_tokens`, `total_tokens`) to Numbers.
- JSON files: parse directly with `JSON.parse`
- Both formats produce an array of row objects

## Summary Cards

Show 5 cards after data loads:
1. **Providers** — count of unique provider values
2. **Models** — count of unique model values
3. **Avg Latency (ms)** — average of `latency_ms` (rounded, ignoring non-numbers)
4. **Avg Tokens** — average of `total_tokens` (rounded, ignoring non-numbers)
5. **Rows** — total filtered row count

## Data Table

Columns: Provider, Model, Latency (ms), Tokens, Prompt, Output, Error

- **Sortable**: clicking any column header sorts by that column. Clicking the same header toggles ascending/descending.
- **Filterable**: the search input filters rows by checking if the full JSON-stringified row contains the query (case-insensitive)
- Provider shown as a styled tag/pill
- Model, Prompt, Output, Error shown in monospace (pre-wrap)
- Numbers formatted with `Math.round`, nulls/empty shown as "–"
- All text is HTML-escaped to prevent XSS (replace &, <, >, ", ')
