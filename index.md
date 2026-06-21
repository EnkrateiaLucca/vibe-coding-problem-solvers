# Vibe Coding: Problem Solvers — File Index

> O'Reilly Live Training repo teaching 7 vibe-coding skills. Instructor: Lucas Soares.

```
.
├── .gitignore                          — Ignores OS files, Python artifacts, .env, IDE folders, Jupyter checkpoints
├── CLAUDE.md                           — Project instructions for Claude: course overview, structure, setup commands
├── README.md                           — Public-facing repo overview with course description and setup instructions
├── simple_timer_app.html               — Multi-timer productivity app with labeled countdown timers and warm color palette
├── index.md                            — This file: tree-based index of the entire repository
│
├── assets/
│   ├── andrej-tweet-vb-cd.png          — Screenshot of Andrej Karpathy's original vibe coding tweet
│   ├── coding-tools-survey.png         — Survey results graphic on AI coding tools usage
│   ├── dev-spectrum.png                — Diagram of the developer spectrum (traditional → vibe coding)
│   ├── llms-txt.png                    — Screenshot related to the llms.txt standard
│   ├── profile_pic.png                 — Instructor profile photo
│   ├── sample_sales_data.csv           — Synthetic sales dataset (Date, Customer, Region, Category, Product, Quantity, Price)
│   ├── screenshot-reviewer.html        — Dark-themed HTML tool for browsing and reviewing screenshot galleries
│   ├── simonw-quote-vibe-coding-skills.png — Simon Willison quote about vibe coding skills
│   ├── troubleshooting.png             — Troubleshooting reference graphic
│   ├── vibe-coding-spectrum.png        — Spectrum diagram of vibe coding approaches
│   ├── vibe-coding-techniques-guide.md — Comprehensive reference guide covering vibe coding definition, techniques, patterns, tools
│   └── screenshots/                    — 47 PNG screenshots of individual presentation slides (slide-03 through slide-63 + appendices)
│
├── presentation/
│   ├── presentation-v2.html            — Remark.js slide deck for the full O'Reilly Live Training presentation
│   └── vibe-coding-slides-final.pdf    — Exported PDF version of the training slides
│
├── demos/
│   ├── 01-prompting/                   — Skill 1: The 6 prompting sub-skills
│   │   ├── README.md                   — Overview and summary table of all 6 prompting sub-skills
│   │   ├── 01-clear-direct.md          — Skill 1.1: Writing specific, unambiguous prompts (bad vs. good examples)
│   │   ├── 02-decomposition.md         — Skill 1.2: Breaking complex tasks into focused sequential steps
│   │   ├── 03-examples.md              — Skill 1.3: Using few-shot examples to show exact desired output
│   │   ├── 04-role-assignment.md       — Skill 1.4: Assigning the AI a role/persona for specialized knowledge
│   │   ├── 05-time-to-think.md         — Skill 1.5: Prompting the AI to reason step-by-step before answering
│   │   ├── 06-constraints.md           — Skill 1.6: Using constraints to narrow AI output to what's needed
│   │   ├── timer_app_minimal.html      — Minimal multi-timer app generated from a commented prompt (demo artifact)
│   │   └── samples/
│   │       ├── buggy_calculator.py     — Intentionally buggy calculator (TypeError) for debugging exercises
│   │       └── data_processor.py       — Sample data processing function for vague-to-specific prompt practice
│   │
│   ├── 02-context-management/          — Skill 2: The 4 context strategies
│   │   ├── README.md                   — Overview of write, select, compress, and isolate strategies
│   │   ├── 01-write-context.md         — Strategy 1: Saving information as persistent external memory
│   │   ├── 02-select-context.md        — Strategy 2: Surgically pulling only relevant information into context
│   │   ├── 03-compress-context.md      — Strategy 3: Summarizing oversized context down to essential tokens
│   │   ├── 04-isolate-context.md       — Strategy 4: Splitting work across multiple agents with focused context
│   │   └── tools-reference.md          — Curated reference list of context-gathering tools for LLMs
│   │
│   ├── 03-vibe-checking/               — Skill 3: Smart verification techniques
│   │   ├── README.md                   — Overview of vibe checking: when to trust AI output vs. investigate
│   │   ├── 01-green-flags.md           — Signs that AI output can be trusted without deep inspection
│   │   ├── 02-red-flags.md             — Warning signs that AI output needs investigation
│   │   ├── 03-verification-techniques.md — Quick validation methods (spot checks) for verifying AI output
│   │   ├── 04-practice-scenarios.md    — Hands-on exercises for developing vibe checking instincts
│   │   ├── vibe-check-checklist.md     — Printable checklist to apply every time AI output is received
│   │   └── sample-data/
│   │       ├── employees.csv           — Synthetic 500-record employee dataset for vibe checking exercises
│   │       └── generate_employees.py   — UV script (Faker) to generate the employees.csv dataset
│   │
│   ├── 04-case-study-app/              — Case study: building Quote Collector with all 4 skills
│   │   ├── README.md                   — Overview of the case study applying all skills to build a real app
│   │   ├── building-log.md             — Chronological log of each build phase, prompts used, and vibe checks
│   │   ├── quote-collector.html        — Complete single-file Quote Collector web app (the finished artifact)
│   │   ├── vibe-checks.md              — Documentation of specific vibe checks performed during the build
│   │   └── prompts/
│   │       ├── 01-initial.md           — Exact initial prompt used to generate the first Quote Collector version
│   │       └── 02-iterations.md        — Follow-up prompts used to iterate and add features
│   │
│   ├── 05-patterns/                    — 5 practical vibe coding patterns
│   │   ├── README.md                   — Overview of the 5 patterns covered in this section
│   │   ├── 01-prototypes-first.md      — Pattern 1: Get something working quickly, then iterate
│   │   ├── 02-let-it-see.md            — Pattern 2: Share screenshots/errors — visual context beats text
│   │   ├── 03-restart-when-stuck.md    — Pattern 3: Fresh context with summary when conversation rots
│   │   ├── 04-automate-steps.md        — Pattern 4: Convert repetitive tasks into one-liner UV scripts
│   │   ├── 05-raw-to-structured.md     — Pattern 5: Transform messy unstructured data into clean formats
│   │   ├── uv-script-template.py       — Starter template for UV inline-metadata automation scripts
│   │   ├── scripts/
│   │   │   ├── csv-processor.py        — UV script (pandas) to filter CSV rows by status and output selected columns
│   │   │   ├── headline-scraper.py     — UV script (requests+BS4) to scrape headlines/links from any webpage
│   │   │   ├── meeting-parser.py       — UV script (openai) to parse free-form meeting notes into structured JSON
│   │   │   └── resize-images.py        — UV script (Pillow) to batch-resize images preserving aspect ratio
│   │   └── sample-data/
│   │       ├── app-logs.txt            — Sample application log file (ERROR/WARN/INFO) for parsing demos
│   │       ├── contacts-raw.txt        — Messy contact list export for raw-to-structured conversion
│   │       ├── meeting-notes.txt       — Free-form Q1 Planning Meeting notes for meeting-parser testing
│   │       ├── reminders.txt           — Informal plain-text reminders for structured extraction exercises
│   │       ├── requirements-raw.txt    — Unstructured product requirements for conversion exercises
│   │       ├── users.csv               — Small sample user dataset for csv-processor testing
│   │       └── sample-images/
│   │           ├── generate_test_images.py — UV script (Pillow) to generate test images for resize demo
│   │           └── README.md           — Instructions for using sample-images with resize-images.py
│   │
│   ├── 06-examples/                    — Standalone HTML apps and project examples
│   │   ├── index.html                  — Note Finder: two-panel note viewer with dark theme and full-text search
│   │   ├── index.md                    — Detailed prompt used to generate the Note Finder app
│   │   ├── ideas-swiper.html           — Tinder-style idea triage app (v1) — swipe to keep or discard ideas
│   │   ├── ideas-swiper.md             — Prompt used to generate the Ideas Swiper app
│   │   ├── ideas-money.md              — AI-powered money-making automation ideas (sample content for swiper)
│   │   ├── llm_experiments_viz.html    — Single-file tool for visualizing LLM prompt experiment results (CSV/JSON)
│   │   ├── llm_experiments_viz.md      — Prompt used to build the LLM experiments visualizer
│   │   ├── note_processor.html         — Note Processor app connecting to localhost:5001 REST API for @read-tagged notes
│   │   ├── note_processor.md           — Prompt spec for the Note Processor (API contract, styling)
│   │   ├── quiz-app.html               — Interactive multiple-choice quiz app loading questions from JSON
│   │   ├── quiz-app.md                 — Prompt used to generate the quiz app
│   │   ├── quiz-app-progress.md        — Beginner-friendly step-by-step walkthrough for building the quiz app
│   │   ├── sample-quiz.json            — Sample quiz data: web development multiple-choice questions (JSON)
│   │   ├── sample-quiz.md              — Same quiz questions in markdown format for reference
│   │   ├── video-chat-plain-html.md    — Notes for an AI-powered video quiz app generating quizzes from transcripts
│   │   │
│   │   ├── idea-swiper-v2/
│   │   │   ├── index.html              — Ideas Swiper v2: improved Tinder-style idea triage app
│   │   │   └── sample-ideas.md         — Sample project idea backlog (CLI tools, extensions, productivity apps)
│   │   │
│   │   ├── file-triage-app/
│   │   │   ├── index.html              — Frontend for universal file triage (previews via marked.js + pdf.js)
│   │   │   ├── server.js               — Express.js backend (port 3002) serving files and filesystem API
│   │   │   └── package.json            — Node.js manifest with Express as sole dependency
│   │   │
│   │   ├── instagram-downloader-chrome-extension/
│   │   │   ├── manifest.json           — Chrome Extension Manifest V3 config (activeTab, downloads, scripting)
│   │   │   ├── popup.html              — Extension popup UI
│   │   │   ├── popup.js                — Popup interaction logic
│   │   │   ├── popup.css               — Popup styles
│   │   │   ├── content.js              — Content script injected on instagram.com pages
│   │   │   ├── background.js           — Service worker for download handling
│   │   │   ├── icon16.png              — Extension icon (16px)
│   │   │   ├── icon48.png              — Extension icon (48px)
│   │   │   ├── icon128.png             — Extension icon (128px)
│   │   │   └── README.md              — Install and usage instructions for the extension
│   │   │
│   │   ├── video-note-taker-with-timestamps-v2/
│   │   │   ├── index.html              — Video note-taking app with timestamp linking and localStorage persistence
│   │   │   └── PLAN.md                 — Implementation spec: single file, vanilla JS, LocalStorage, File API
│   │   │
│   │   └── video-quiz-app/
│   │       └── index.html              — AI-powered video quiz app generating interactive quizzes from video content
│   │
│   └── students-usecases/              — Student-submitted project examples
│       ├── compliance-qa-prototype/    — RAG-based compliance Q&A Python app (FastAPI + venv)
│       ├── spreadsheet-web-app/        — Bill-of-materials web app for manufacturing planning
│       ├── portfolio-layout-preview/   — React JSX portfolio layout preview component
│       └── lr-round-robin-tournament/  — Round-robin tournament bracket HTML app (v1 and v2)
```
