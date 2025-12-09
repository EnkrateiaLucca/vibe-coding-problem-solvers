# CLAUDE.md

## Project Overview

O'Reilly Live Training repository for teaching "Vibe Coding" - building software with LLMs without reviewing generated code (coined by Simon Willison, 2025). Instructor: Lucas Soares.

**Key distinction**: Vibe Coding (no code review, for prototypes) vs AI-Assisted Programming (with oversight, for production).

## Repository Structure

```
vibe-coding-problem-solvers/
├── presentation/                     # Remark.js slides + PDF export
│   ├── presentation.html             # Main presentation
│   ├── presentation-v2.html          # Updated version
│   └── vibe-coding-slides-final.pdf  # Exported PDF
├── demos/                            # 5 interactive learning modules
│   ├── 01-prompting/                 # 6 prompting sub-skills + buggy_calculator.py
│   ├── 02-context-management/        # 4 context strategies + tools reference
│   ├── 03-vibe-checking/             # Verification techniques + employees.csv (500 records)
│   ├── 04-case-study-app/            # Quote Collector app + building log + prompts
│   └── 05-patterns/                  # 5 patterns + working UV scripts + sample data
├── assets/                           # Visual resources
│   ├── screenshots/                  # 49 presentation slide screenshots
│   ├── screenshot-reviewer.html      # Interactive screenshot viewer
│   └── vibe-coding-techniques-guide.md
├── .claude/                          # Claude Code config
│   └── agents/project-researcher.md  # Research agent definition
├── summary-vibes.md                  # Comprehensive training summary
├── generate_visuals.py               # Gemini API visual generator (needs GOOGLE_API_KEY)
└── file_notifier.py                  # File change monitor utility
```

## Common Commands

```bash
# Serve presentation locally
python -m http.server 8000
open http://localhost:8000/presentation/presentation.html

# Run demo scripts (requires uv)
uv run demos/05-patterns/scripts/csv-processor.py demos/05-patterns/sample-data/users.csv
uv run demos/05-patterns/scripts/meeting-parser.py demos/05-patterns/sample-data/meeting-notes.txt
uv run demos/05-patterns/scripts/resize-images.py <image-folder>

# Test the buggy calculator (debugging exercise)
python demos/01-prompting/samples/buggy_calculator.py
```

## Core Training Content

### 7 Skills Taught
1. **Prompting** - Clear instructions with examples
2. **Context Management** - Strategic information loading
3. **Capability Assignment** - What to delegate to AI
4. **Vibe Checking** - Lightweight verification
5. **Strategic Cognitive Offloading** - 70/30 rule
6. **Personal Benchmarking** - Custom evaluation
7. **Agentic Task Orchestration** - Multi-agent coordination

### 5 Demo Modules
| Module | Focus | Key Files |
|--------|-------|-----------|
| 01-prompting | 6 sub-skills | `buggy_calculator.py`, `data_processor.py` |
| 02-context-management | 4 strategies | Tools reference (gitingest, repomix, r.jina.ai) |
| 03-vibe-checking | Green/red flags | `employees.csv`, checklist |
| 04-case-study-app | Full app build | `quote-collector.html`, building log |
| 05-patterns | 5 patterns | UV scripts, sample data |

### Tool Categories Covered
- **Web Builders**: Claude Artifacts, ChatGPT Canvas, Vercel v0
- **IDE Integration**: Cursor, GitHub Copilot, Windsurf
- **Terminal Agents**: Claude Code, Aider
- **Cloud Environments**: Replit, CodeSandbox

## Key Files

- `summary-vibes.md` - Best written overview of entire training
- `demos/04-case-study-app/building-log.md` - Step-by-step app build chronicle
- `assets/vibe-coding-techniques-guide.md` - Quick reference for techniques
- `demos/05-patterns/scripts/*.py` - Ready-to-use UV automation scripts

## Safety Guidelines (Training Content)

**Safe for vibe coding**: Throwaway projects, experiments, personal scripts, learning
**Avoid vibe coding**: Security-critical, production systems, code others maintain

## Notes

- All Python scripts use UV inline metadata (self-contained dependencies)
- Presentation uses Remark.js - see the `remark-slides-skill` for formatting help
- Sample data included in each demo module for hands-on practice
