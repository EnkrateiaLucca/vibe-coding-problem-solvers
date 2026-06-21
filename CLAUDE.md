# Vibe Coding: Problem Solvers — O'Reilly Live Training

O'Reilly course teaching 7 vibe-coding skills (prompting, context management, vibe checking, capability assignment, cognitive offloading, benchmarking, agentic orchestration). Instructor: Lucas Soares.

## Structure

```
├── presentation/           # Remark.js slides (presentation-v2.html) + PDF export
├── demos/
│   ├── 01-prompting/       # 6 sub-skills + buggy_calculator.py exercise
│   ├── 02-context-management/  # 4 strategies + tools reference
│   ├── 03-vibe-checking/   # Green/red flags + employees.csv dataset
│   ├── 04-case-study-app/  # Quote Collector app + building log
│   ├── 05-patterns/        # 5 patterns + UV scripts + sample data
│   └── 06-examples/        # Standalone HTML apps (ideas swiper, quiz, note processor, etc.)
├── assets/                 # Screenshots, images, techniques guide
└── summary-vibes.md        # Full training summary
```

## Setup & Run

```bash
# Serve presentation or any HTML app
python -m http.server 8000
# then open http://localhost:8000/presentation/presentation-v2.html
# or open http://localhost:8000/demos/06-examples/index.html

# Run UV automation scripts (self-contained deps, no install needed)
uv run demos/05-patterns/scripts/csv-processor.py demos/05-patterns/sample-data/users.csv
uv run demos/05-patterns/scripts/meeting-parser.py demos/05-patterns/sample-data/meeting-notes.txt
uv run demos/05-patterns/scripts/resize-images.py <image-folder>

# Debugging exercise
python demos/01-prompting/samples/buggy_calculator.py
```

## Notes

- Python scripts use UV inline metadata — run with `uv run` directly
- HTML apps are single-file, no build step — serve with any static server
- Presentation uses Remark.js markdown slides
