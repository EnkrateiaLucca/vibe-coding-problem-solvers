# Decision Deck — File Cleanup

A single-file HTML tool that turns folder cleanup into a Tinder-style swipe deck.
Point it at a real folder, flip through every file one card at a time, assign a
decision, then apply them all at once. **No server, no build step, no upload** —
the page reads your files locally through the browser's File System Access API.

This is the "10x" of the original *Ideas Swiper*: instead of swiping a hardcoded
list of ideas, it loads **real files from a folder** and does something useful with them.

## The teaching point

A tiny, ugly problem ("my Downloads folder is a swamp") is exactly the kind of
thing a *single HTML file* can solve. No app store, no SaaS, no account. You
describe the decision you keep making by hand, and the tool compresses it into a
sequence of one-tap judgments. That's the whole vibe-coding pitch in one demo.

## Run it

```bash
# from demos/06-examples/
python -m http.server 8000
# open http://localhost:8000/decision-deck.html  in Chrome or Edge
```

Then click **Choose a folder…** and point it at `sample-messy-folder/` (included)
or any real folder you want to clean up.

> Use **Chrome or Edge** to apply changes in-place. Other browsers can still
> preview files and export a script — they just can't write back.

## Six decisions (not just keep / delete)

| Key | Decision | What "Apply" does |
|-----|----------|-------------------|
| `K` | **Keep**    | leaves the file where it is |
| `D` | **Trash**   | moves it to `_trash/` (reversible — you empty it) |
| `A` | **Archive** | moves it to `_archive/` |
| `M` | **Sort →**  | moves it into a subfolder you name (categorize) |
| `R` | **Rename**  | renames it in place |
| `X` | **Later**   | skips it — no action |

Navigate with `←` / `→`, undo a decision with `U`, open the plan with `S`.
Right-swipe = Keep, left-swipe = Trash, keeping the original two-button feel.

## What you get

- **Live previews** — images render as thumbnails, text/code show their first lines,
  everything else gets a type glyph plus size and modified date.
- **A review screen** before anything moves, grouped by action with counts.
- **Apply in-browser** (Chrome/Edge) — files are actually moved/renamed locally.
- **Export `cleanup.sh`** — a reviewable `mv`/`mkdir` script to run in your terminal.
- **Export `plan.json`** — the decisions as structured data for any other pipeline.
- **Resumable** — decisions persist in `localStorage`, so you can close and come back.

## Why a deck

The deck format turns one big overwhelming chore ("organize this folder") into a
stream of small bounded choices — one file, one decision, no scrolling. That
matches how people actually triage. The apply step makes it durable: your taps
become real file moves or a script you can keep.
