# Vibe Coding for Problem Solving: A Research Report

> **Techniques, Evidence, and Best Practices for Small-Scale Niche Projects**
>
> Compiled: March 2026 | Sources: 15 academic papers, 8+ Reddit communities, 14 practitioner sources, 12 case studies

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [What Is Vibe Coding?](#what-is-vibe-coding)
3. [Academic Evidence: What the Research Shows](#academic-evidence)
   - [Productivity Gains: The Lab vs. Field Gap](#productivity-gains-the-lab-vs-field-gap)
   - [Key Academic Papers](#key-academic-papers)
4. [Practitioner Best Practices](#practitioner-best-practices)
   - [The Core Workflow](#the-core-workflow)
   - [Context Engineering](#context-engineering)
   - [Single-File HTML Tools (The Simon Willison Pattern)](#single-file-html-tools)
   - [The Five Anti-Patterns](#the-five-anti-patterns)
5. [Reddit Community Insights](#reddit-community-insights)
   - [Community Landscape](#community-landscape)
   - [Tool Rankings](#tool-rankings)
   - [Consolidated Community Best Practices](#consolidated-community-best-practices)
   - [Safe vs. High-Risk Use Cases](#safe-vs-high-risk-use-cases)
6. [Case Studies: Real People Building Real Tools](#case-studies)
7. [The Vibe Coding Skill Stack](#the-vibe-coding-skill-stack)
8. [Frameworks and Taxonomies](#frameworks-and-taxonomies)
9. [Limitations and Open Questions](#limitations-and-open-questions)
10. [Full Source Index](#full-source-index)

---

## Executive Summary

Vibe coding — using natural language to direct AI tools to write code — has evolved from Andrej Karpathy's February 2025 tweet into a documented practice with academic papers, dedicated communities, and quantified (if contested) productivity claims. This report synthesizes findings from **15 peer-reviewed/preprint papers**, **8+ Reddit communities**, **14 practitioner sources**, and **12 real-world case studies** to answer a specific question:

**Can individuals use vibe coding to be dramatically more productive when building small-scale, niche problem-solving tools?**

The answer is a qualified **yes**, with important caveats:

- **Lab experiments** show 21–56% faster task completion. **Real-world longitudinal studies** show more modest or even negative effects for experienced developers without structured methodology.
- The biggest gains come from **"software for one"** — hyper-personal tools no vendor would build — and from **domain experts** who can now build tools precisely fitted to their workflows.
- Success depends not on AI capability alone but on **systematic context engineering, spec-driven planning, and disciplined verification**.
- The realistic productivity range for greenfield tasks with proper workflow is **20–45%** faster. The extreme 10x–100x claims are supported only by anecdotal self-reports for specific use cases (prototyping, single-file tools, automation scripts).

---

## What Is Vibe Coding?

**Origin:** Coined by Andrej Karpathy on February 2, 2025:

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."
> — [Original tweet](https://x.com/karpathy/status/1886192184808149383)

**Academic definition** (from the largest survey, Ge et al. 2025):

> "A novel development methodology where developers validate AI-generated implementations through outcome observation rather than line-by-line code comprehension."

**The practitioner distinction** (Simon Willison):

| | Vibe Coding | Vibe Engineering |
|---|---|---|
| **Approach** | Fast, loose, prompt-driven, no code review | Professionals accelerate work with LLMs while staying accountable |
| **Testing** | Accept output if it seems to work | Robust test suites, CI/CD, linting |
| **Best for** | Prototypes, throwaway tools, personal scripts | Production code, maintained projects |
| **Risk** | Hidden bugs, security holes, unmaintainable code | Manageable with existing engineering discipline |

Source: [Simon Willison — Vibe Engineering](https://simonw.substack.com/p/vibe-engineering)

---

## Academic Evidence

### Productivity Gains: The Lab vs. Field Gap

The most important finding across the academic literature is the **divergence between controlled experiments and real-world studies**:

| Study | Setting | Result | Population |
|---|---|---|---|
| Peng et al. 2023 (GitHub/Microsoft) | Lab RCT | **+55.8% faster** | Developers implementing HTTP server |
| Paradis et al. 2024 (Google) | Enterprise RCT | **+21–26% faster** | 96 Google engineers |
| Cui et al. 2025 (Microsoft/Accenture) | Field experiment | **+26% more tasks/week** | 4,867 developers across 3 companies |
| Stray et al. 2025 (Norwegian gov't) | Longitudinal (2 years) | **No significant increase** in commits | 39 developers, 26,317 commits |
| Becker et al. 2025 (METR) | Field RCT | **19% slower** with AI | 16 experienced OSS developers |
| Shen & Tamkin 2026 (Anthropic) | RCT | **17% lower comprehension** | Novice developers learning async Python |

**Key insight:** Less experienced developers consistently benefit more. The Cui et al. study found junior developers gained 35–39%, while the METR study showed experienced developers on complex, real-world tasks actually slowed down.

### Key Academic Papers

#### 1. A Survey of Vibe Coding with Large Language Models
**Ge, Y., Mei, L., et al. (2025)** — arXiv:2510.12399

The largest systematic survey, analyzing 1,000+ research papers. Identifies **five development models** (Unconstrained Automation, Iterative Conversational, Planning-Driven, Test-Driven, Context-Enhanced) and concludes that success depends on "systematic context engineering, well-established development environments, and human-agent collaborative development models."

[Paper](https://arxiv.org/abs/2510.12399)

#### 2. Vibe Coding in Practice: Motivations, Challenges, and a Future Outlook
**Fawzy, A., Tahir, A., & Blincoe, K. (2025)** — arXiv:2510.00328

Grey literature review of 101 practitioner sources (518 behavioral accounts). Identifies the **Speed-Quality Paradox**: developers are drawn to rapid development but perceive generated code as "fast but flawed." Quality assurance is frequently neglected. Identifies a new "vulnerable developer class" — people who can build products but lack debugging capability.

[Paper](https://arxiv.org/abs/2510.00328)

#### 3. Vibe Coding: Programming Through Conversation with AI
**Sarkar, A. & Drosos, I. (2025)** — PPIG 2025 — arXiv:2506.23253

First empirical video-based observational study. Key finding: programming expertise is not eliminated but "redistributed toward context management, rapid code evaluation, and strategic decision-making." Trust is "dynamic and contextual, developed through iterative verification."

[Paper](https://arxiv.org/abs/2506.23253)

#### 4. Good Vibrations? Co-Creation, Communication, Flow, and Trust in Vibe Coding
**Pimenova, V., Fakhoury, S., et al. (2025)** — arXiv:2509.12491

Analysis of 190,000+ words from interviews, Reddit, and LinkedIn. Proposes a framework centered on conversational interaction and co-creation. "AI trust regulates movement along a continuum from delegation to co-creation and supports developer experience by sustaining flow."

[Paper](https://arxiv.org/abs/2509.12491)

#### 5. The Impact of AI on Developer Productivity: Evidence from GitHub Copilot
**Peng, S., Kalliamvakou, E., et al. (2023)** — arXiv:2302.06590

The landmark controlled experiment: treatment group completed tasks **55.8% faster**. Newer developers benefited more than experienced ones.

[Paper](https://arxiv.org/abs/2302.06590)

#### 6. Effects of Generative AI on High-Skilled Work (3 Field Experiments)
**Cui, Z., Demirer, M., et al. (2024)** — *Management Science* (INFORMS)

Largest enterprise study: 4,867 developers across Microsoft, Accenture, and a Fortune 100 company. Average **+26% more completed tasks/week**. Less experienced, shorter-tenured, and older developers showed disproportionately larger gains. Adoption was only ~60% after one year.

[Paper](https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/)

#### 7. How Much Does AI Impact Development Speed? (Google RCT)
**Paradis, E., et al. (2024)** — arXiv:2410.12944

96 Google engineers, standardized logging service task. **21–26% faster** with AI features. Senior developers and those coding 5+ hours daily showed greater benefits.

[Paper](https://arxiv.org/html/2410.12944v2)

#### 8. Measuring the Impact of Early-2025 AI on Experienced OSS Developer Productivity
**Becker, J., Rush, N., et al. (2025)** — METR — arXiv:2507.09089

The counterintuitive result: AI tools **increased task completion time by 19%** for experienced developers. Developers predicted 24% time savings but the opposite occurred. Based on 143 hours of manually labeled screen recordings.

[Paper](https://arxiv.org/abs/2507.09089)

#### 9. How AI Impacts Skill Formation
**Shen, J.H. & Tamkin, A. (2026)** — Anthropic Research — arXiv:2601.20245

"AI use impairs conceptual understanding, code reading, and debugging abilities, without delivering significant efficiency gains on average." Developers who delegated code generation scored below 40% on comprehension; those using AI for conceptual inquiry scored 65%+.

[Paper](https://arxiv.org/abs/2601.20245)

#### 10. Professional Software Developers Don't Vibe, They Control
**Huang, R.L., Reyna, A., et al. (2025)** — arXiv:2512.14012

13 field observations + 99 survey responses. Experienced developers deliberately avoid passive vibe coding in favor of active supervision. Agents suit "well-described, straightforward tasks" but struggle with complex work.

[Paper](https://arxiv.org/html/2512.14012)

#### 11. Can Vibe Coding Beat Graduate CS Students?
**Danassis, P. & Goel, N. (2025)** — arXiv:2511.20613

40 LLM-coded agents vs. 17 human-coded agents on logistics optimization. Top 5 positions all held by humans. 33 of 40 LLM agents underperformed simple baselines.

[Paper](https://arxiv.org/abs/2511.20613)

#### 12. Developer Productivity With and Without GitHub Copilot (Longitudinal)
**Stray, V., et al. (2025)** — arXiv:2509.20353

2-year study, 26,317 commits. **No statistically significant increase** in productivity. Developers *feel* more productive despite no measurable output change (Pearson r ≈ 0.17, p=0.40).

[Paper](https://arxiv.org/html/2509.20353v2)

#### 13. FeatBench: Evaluating Coding Agents on Feature Implementation
**Chen, H., Li, C., & Li, J. (2025)** — arXiv:2509.22237

State-of-the-art agents achieved only **29.94% resolved rate** on feature implementation tasks. Success rates dropped from 60–70% on small projects to 10–30% on large codebases.

[Paper](https://arxiv.org/abs/2509.22237)

#### 14. Vibe Coding on Trial: Unanimous LLM Juries
**Ullah, M.A. & Serwadda, A. (2026)** — arXiv:2602.18492

Proposes using LLM juries to review AI-generated code. Small unanimous committees of high-quality models reduce false acceptances while maintaining acceptable query pass rates.

[Paper](https://arxiv.org/abs/2602.18492)

#### 15. Selection of Prompt Engineering Techniques for Code Generation
**Wang, C.-Y., et al. (2024)** — arXiv:2409.16416

No single prompt engineering technique is universally optimal. PET-Select adaptively assigns techniques per query complexity: +1.9% pass@1, **74.8% token cost reduction**.

[Paper](https://arxiv.org/abs/2409.16416)

#### Industry Survey Data

**2025 Stack Overflow Developer Survey:**
- 84% of developers use or plan to use AI tools
- 51% of professional developers use AI tools daily
- 70% of agent users agree agents reduced time on specific tasks
- 66% cite "AI solutions that are almost right, but not quite" as their biggest frustration
- Positive AI sentiment dropped from 70%+ (2023-2024) to 60% (2025)

Source: [Stack Overflow 2025 Survey — AI](https://survey.stackoverflow.co/2025/ai)

---

## Practitioner Best Practices

### The Core Workflow

Synthesized from Simon Willison, Harper Reed, Addy Osmani, Russ Poldrack, and the Wasp team:

```
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: IDEA HONING                                       │
│  Tool: Conversational LLM (ChatGPT, Claude)                 │
│  Prompt: "Ask me one question at a time so we can develop    │
│  a thorough, step-by-step spec for this idea."               │
│  Output: spec.md                                             │
├─────────────────────────────────────────────────────────────┤
│  PHASE 2: PLANNING                                           │
│  Tool: Reasoning model (o3, Gemini 2.5 Pro)                  │
│  Output: prompt_plan.md, TASKS.md, PLANNING.md               │
│  Method: Break into vertical slices — each feature end-to-end│
├─────────────────────────────────────────────────────────────┤
│  PHASE 3: CONTEXT SETUP                                      │
│  Create: CLAUDE.md / AGENTS.md (guardrails, conventions)     │
│  Set up: Framework/boilerplate foundation, test harness       │
│  Principle: "Smaller, smarter context beats massive context"  │
├─────────────────────────────────────────────────────────────┤
│  PHASE 4: EXECUTION                                          │
│  Method: One task at a time → test → commit → repeat          │
│  Target: ~500 lines per focused task                          │
│  Rule: Ultra-granular commits ("save points in a game")       │
├─────────────────────────────────────────────────────────────┤
│  PHASE 5: DOCUMENTATION                                      │
│  AI documents each completed feature → ai/docs/              │
│  Record transcript and prompt decisions in commit messages    │
└─────────────────────────────────────────────────────────────┘
```

**Sources:**
- [Harper Reed — My LLM Codegen Workflow](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/)
- [Addy Osmani — My LLM Coding Workflow Going Into 2026](https://addyosmani.com/blog/ai-coding-workflow/)
- [Russ Poldrack — Workflows for Agentic Coding](https://russpoldrack.substack.com/p/workflows-for-agentic-coding-and)
- [Wasp — Structured Workflow for Vibe Coding Full-Stack Apps](https://dev.to/wasp/a-structured-workflow-for-vibe-coding-full-stack-apps-352l)

### Context Engineering

Martin Fowler's definition: "Curating what the model sees so that you get a better result."

**The documentation system** (from Russ Poldrack):
- `PRD.md` — Functional and non-functional requirements, architecture, tech stack
- `CLAUDE.md` — Agent memory file, development preferences, guardrails
- `PLANNING.md` — System architecture and workflow specifications
- `TASKS.md` — Milestone-based task breakdown
- `SCRATCHPAD.md` — Ongoing notes, cleared after completion
- `problems_tbd.md` — Issue tracker for bugs and problems

**CLAUDE.md best practices** (from Shrivu Shankar at Abnormal AI):
- Start small — guardrails, not a manual
- Professional monorepos range from 13KB to 25KB
- "Keeping CLAUDE.md short is a fantastic forcing function for simplifying your codebase"
- Always provide alternatives to prohibited actions
- Target 50% context window usage, then compact or clear

**Context session management:**
1. `/clear` + `/catchup` — Default restart, rereads git changes (recommended)
2. Document and Clear — Dump progress to markdown before restart
3. `/compact` — Generally avoided ("opaque, error-prone")

**Sources:**
- [Martin Fowler — Context Engineering for Coding Agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html)
- [Shrivu Shankar — How I Use Every Claude Code Feature](https://blog.sshh.io/p/how-i-use-every-claude-code-feature)

### Single-File HTML Tools

Simon Willison's pattern — 150+ tools built with LLMs at [tools.simonwillison.net](https://tools.simonwillison.net/):

**Rules:**
1. **Single file** — inline JavaScript and CSS. Copy-pasteable from LLM output.
2. **No build steps** — always prompt with "No React." Avoid JSX compilation.
3. **CDN dependencies** — load from cdnjs or jsdelivr. Fewer the better.
4. **Start in Claude Artifacts or ChatGPT Canvas** for prototyping (sandboxed rendering).
5. **Upgrade to Claude Code** for complex projects requiring tests and GitHub integration.
6. **URL persistence** for bookmarkable state; **localStorage** for API keys.
7. **Copy-paste as I/O** — "One of the most useful input/output mechanisms."
8. **Reference previous tools in prompts** — models with existing examples produce better code.
9. **Record transcripts** — include prompts in commit messages for reproducibility.

**Source:** [Simon Willison — Useful Patterns for Building HTML Tools](https://simonwillison.net/2025/Dec/10/html-tools/)

### The Five Anti-Patterns

Synthesized from all practitioner sources:

| Anti-Pattern | Why It Fails | Fix |
|---|---|---|
| **Monolithic prompting** | Asking for too much produces "jumbled mess" output | One function, one bug, one feature at a time |
| **Skipping the spec** | Architectural drift, scope creep | Always write spec.md before execution |
| **Blind acceptance** | AI writes "with complete conviction, including bugs and nonsense" | Test every change, review every diff |
| **No test suite** | Agents "blithely assume everything is fine" | Write failing tests first, implement minimal passing code |
| **Context bloat** | Important details get lost in noise | Target 50% context, start fresh between major features |

---

## Reddit Community Insights

### Community Landscape

| Subreddit | Size | Focus |
|---|---|---|
| **r/vibecoding** | ~153,000 members | Core community: tool recommendations, build logs, MVPs |
| **r/ChatGPTCoding** | ~357,000 members | Multi-tool AI coding, performance debates |
| **r/VibeCodeDevs** | ~15,000 members | Technically focused, toolchain questions |
| **r/ClaudeAI / r/ClaudeCode** | ~4,200+ weekly contributors | Claude-specific workflows, CLAUDE.md optimization |
| **r/programming** | 6M+ members | Skeptical, quality-focused, hybrid approach advocacy |
| **r/LocalLLaMA** | Large | Open-source models, privacy-first, local deployment |
| **r/SideProject / Indie Hackers** | Large | Builders shipping real products |
| **r/singularity** | ~300K members | Philosophical, future-oriented, "next abstraction layer" |

**Sources:**
- [Solveo — 1,000 Reddit Comments Analysis](https://www.solveo.co/post/we-analyzed-1-000-reddit-comments-to-discover-the-most-used-vibe-coding-tools)
- [AI Tool Discovery — Claude Code Reddit Guide](https://www.aitooldiscovery.com/guides/claude-code-reddit)
- [GummySearch — r/vibecoding Stats](https://gummysearch.com/r/vibecoding/)

### Tool Rankings

From analysis of 1,000+ Reddit comments across r/vibecoding and r/VibeCodeDevs:

| Rank | Tool | Mentions | Community Consensus |
|---|---|---|---|
| 1 | **Claude Code** | 226 | "Best AI engineer" — terminal-native, complex multi-file tasks |
| 2 | **Cursor** | 219 | "Best AI editor" — superior autocomplete, IDE-native |
| 3 | **ChatGPT/Codex** | 109 | Broad capability, ideation and planning |
| 4 | **Gemini** | 91 | Large context window, architecture planning |
| 5 | **Replit** | 83 | Fastest time-to-deploy, non-developer friendly |
| 6 | **Windsurf** | 73 | Best value at $15/mo, persistent context |

**The recommended multi-tool stack** (most-upvoted workflow):
1. **Gemini 2.5 Pro** for architecture and large-context planning ("BMAD Method")
2. **Claude Code** for implementation execution
3. **Cursor** when Claude exceeds token limits

**The 80/15/5 Rule** (realistic usage pattern):
- 80% — Autocomplete and inline edits (Cursor or Windsurf)
- 15% — Medium agent tasks (Cursor Agent or Windsurf Cascade)
- 5% — Complex multi-file tasks (Claude Code)

**Sources:**
- [Solveo Analysis](https://www.solveo.co/post/we-analyzed-1-000-reddit-comments-to-discover-the-most-used-vibe-coding-tools)
- [Pockit Tools — Cursor vs Windsurf vs Claude Code (2026)](https://dev.to/pockit_tools/cursor-vs-windsurf-vs-claude-code-in-2026-the-honest-comparison-after-using-all-three-3gof)

### Consolidated Community Best Practices

Drawn from across all Reddit communities:

1. **Plan before you prompt.** Create a PRD or task file. Generate a plan first, review it, then execute.
2. **Maintain a CLAUDE.md / rules file.** The single most-cited compounding investment. Include coding style, forbidden patterns, project conventions. Treat as a living document.
3. **Chunk tasks to ~500 lines.** Context windows have a quality ceiling. Smaller, focused tasks produce better output.
4. **Use Gemini for architecture, Claude for execution.** Multi-tool stacking is the most-upvoted workflow pattern.
5. **Write a session handoff file.** Have the agent summarize what was done after each major session. Prevents context amnesia.
6. **Use version control aggressively.** Every major AI-generated change should be committed. Recovery depends on clean checkpoints.
7. **Prompt for the stack you know.** Popular stacks (React, Node.js, PostgreSQL) outperform niche ones because training data is denser.
8. **Request simpler code explicitly.** Asking for "simpler code I can understand and modify" consistently produces more maintainable output.
9. **Test before accepting any change.** Security vulnerabilities most often appear in auth and input handling.
10. **Document prompt decisions.** Maintain a prompt log as living documentation.

> "After 1000+ sessions, the one thing that scales is the CLAUDE.md file — not hooks or plugins, but structured context."
> — r/ClaudeCode practitioner

### Safe vs. High-Risk Use Cases

Community consensus across r/programming, r/webdev, and r/vibecoding:

| Safe for Vibe Coding | Avoid Vibe Coding |
|---|---|
| Personal scripts and CLI tools | Payment processing |
| Static portfolio sites | Authentication mechanisms |
| Learning projects and prototypes | Healthcare / compliance apps |
| Data visualization tools | Database migrations |
| Component libraries | Multi-tenant SaaS backends |
| Chrome extensions | Real-time production APIs |
| Single-file HTML utilities | Security-critical systems |

**Source:** [LogRocket — You're Doing Vibe Coding Wrong](https://blog.logrocket.com/youre-doing-vibe-coding-wrong/)

---

## Case Studies

### The "$55K-to-$20" Dynamic

Multiple cases demonstrate vibe coding collapsing development costs by 99%+ versus agency quotes:

| Builder | What They Built | Cost via Vibe Coding | Agency Quote | Ratio |
|---|---|---|---|---|
| Lavall Chichester | AI ROI Calculator (interactive web app) | ~$20/mo (Replit) in 1 week | $55,000 / 3 months | ~99.96% reduction |
| Dheeraj Sharma | SubflowAI (Chrome extension + backend) | ~$135 total | $5,000–$10,000 est. | ~98% reduction |
| Blinkist (company) | Internal tools suite | Days of vibe coding | ~$60K/year in SaaS | Replaced subscriptions entirely |

### Case Study 1: Gene Kim — 16x Faster Book Manuscript Tool

**Who:** Gene Kim, author of *The Phoenix Project*. Experienced developer (Clojure).
**Built:** `mdparse` — a Clojure tool to query a 300-page book manuscript like a SQL database.
**Method:** 251 prompts, 35 commits over 4 days using Claude Code. Built during breaks, after writing sessions, "while brushing his teeth."
**Result:** **16x faster** than his historical average, **5x faster** than his previous best day. 4,176 lines of working code and tests.

Source: [IT Revolution — The Last 80 Hours](https://itrevolution.com/articles/the-last-80-hours-of-editing-the-vibe-coding-book/)

### Case Study 2: Teresa Torres — Personal AI Operating System

**Who:** Teresa Torres, author of *Continuous Discovery Habits*. Non-developer.
**Built:** A personal AI OS on Claude Code + Obsidian: `/today` command generates prioritized daily to-do, automated research assistant delivers daily summaries, 3-layer context library for writing.
**Result:** Writing output went from **8,000 to 35,000 words/month** — a **4x increase** attributed to friction reduction.

Source: [Creator Economy — Full Tutorial](https://creatoreconomy.so/p/automate-your-life-with-claude-code-teresa-torres)

### Case Study 3: Kevin Roose — "Software for One"

**Who:** Kevin Roose, NYT tech journalist. Not a programmer.
**Built:** Personal utility apps — LunchBox Buddy (fridge-to-lunch suggestions), a podcast transcriber, a social media bookmark organizer.
**Concept:** "Software for one" — hyper-personalized tools tailored to one person's exact workflow, which no commercial product would justify building.
**Result:** Each app built in hours. Coined the category that best describes vibe coding's killer use case.

Source: [IT Revolution — NYT Case for Vibe Coding](https://itrevolution.com/articles/the-new-york-timess-just-made-the-case-for-vibe-coding-heres-the-deeper-story/)

### Case Study 4: Pieter Levels — Flight Simulator ($1M ARR in 17 Days)

**Who:** Pieter Levels, serial indie hacker. No game development experience.
**Built:** A browser-based 3D multiplayer flight simulator with in-game ads and premium upgrades.
**Tools:** Cursor + Claude 3.7 Sonnet + Grok 3 (backend). Three.js, PeerJS, WebSockets.
**Result:** Built in 3 hours. $0 to $1M ARR in 17 days. 26,000 simultaneous users. $87K+/mo revenue.

Source: [Indie Hackers — Pieter Levels Flight Sim](https://www.indiehackers.com/post/tech/pieter-levels-used-ai-to-build-a-viral-flight-simulator-in-3-hours-with-no-background-in-game-development-7CPfMr1yRLEwH6cC8xhE)

### Case Study 5: Dheeraj Sharma — SubflowAI Chrome Extension

**Who:** Enterprise software engineer (hadn't coded in 7–8 years).
**Built:** Chrome extension for scheduling Substack Notes with AI-powered content repurposing. Visual calendar, batch scheduling, AI generation, rich text editing.
**Tools:** Claude Code + Cloudflare Workers + Gemini 2.5 Flash + Lemon Squeezy.
**Result:** MVP in 3 days (38 commits). Chrome Web Store release after 19 build days (238 commits). Total cost: **~$135**. Launched with paying customers on day one.

Source: [Build to Launch Substack](https://buildtolaunch.substack.com/p/vibe-coding-builders-substack-notes-chrome-extension-claude-code-135-dollars)

### Case Study 6: Frederick Vallaeys — PPC Marketing Tools Suite

**Who:** CEO of Optmyzr, former Google Ads engineer.
**Built:** A suite of niche PPC tools: Persona Scorer (10-audience-segment ad evaluation), Seasonality Analysis (IQR + Prophet forecasting), Panel of Experts (multi-GPT blog review), Demo Blurring Extension.
**Tools:** Lovable, V0.dev, Claude, simple prompt interfaces.
**Result:** Persona Scorer was functional **20 seconds** after the initial prompt. Previously equivalent tools required weeks of developer time.

Source: [Search Engine Land — Build PPC Tools in Minutes](https://searchengineland.com/vibe-coding-build-tools-in-minutes-smx-next-465729)

### Case Study 7: Guillaume Laforge — Article Summarizer Chrome Extension

**Who:** Developer and podcaster. Zero Chrome extension experience.
**Built:** Chrome extension that summarizes articles using Gemini API, handling paywalled pages by reading what the browser already has loaded.
**Tools:** Gemini CLI (interactive development), Gemini API.
**Result:** Built in a single interactive session without reading Chrome extension documentation.

Source: [glaforge.dev](https://glaforge.dev/posts/2025/08/06/vibe-coding-a-chrome-extension-with-gemini-cli-to-summarize-articles/)

### Case Study 8: Dave Davies — SEO AI Overview Question Extractor

**Who:** Head of SEO at Weights & Biases. 25+ years in digital marketing, not a software developer.
**Built:** A pipeline that extracts implied questions from Google AI Overviews via SerpAPI → GPT extraction → W&B Weave logging.
**Tools:** Cursor, SerpAPI, GPT-5.2 Thinking, W&B Weave.
**Result:** Produces actionable SEO intelligence in seconds, replacing hours of manual SERP analysis.

Source: [Search Engine Land — How to Vibe-Code an SEO Tool](https://searchengineland.com/vibe-code-seo-tool-469657)

### Case Study 9: Niche "Software for One" Projects (Hacker News)

Three documented examples from [HN: Impressive Vibe Coding Projects](https://news.ycombinator.com/item?id=45642527):

- **Court Calendar Extractor** — Extracts court dates from PDF scheduling orders → ICS calendar files. Built for lawyers with Gemini API.
- **Artist Inventory Management** — Tracks artwork, pricing, gallery locations, multi-currency support. Built with Claude Code.
- **Grocery Price Tracker** — Tracks Aldi prices over time. 100% AI-coded with GitHub Copilot, zero manual code.

### Broader Statistics

- **Y Combinator W25 batch:** 25% of startups had codebases that were 95% AI-generated
- **Indie Hackers 2025:** 1 in 3 indie SaaS founders use AI for 70%+ of development and marketing
- **Stripe 2024 Indie Founder Report:** 44% of profitable SaaS products run by a single founder (doubled since 2018)
- **Lenny Rachitsky's survey (1,750 tech professionals):** 49% of founders report AI saves 6+ hours/week

---

## The Vibe Coding Skill Stack

From the arXiv survey and practitioner sources, the skills required for effective vibe coding:

```
┌─────────────────────────────────────────────────┐
│  1. INTENT ARTICULATION                          │
│     Translating problems into clear prompts      │
│     Knowing what to ask for and when              │
├─────────────────────────────────────────────────┤
│  2. SPEC WRITING                                 │
│     PRD-quality requirements documents           │
│     Given/When/Then scenario definitions          │
├─────────────────────────────────────────────────┤
│  3. CONTEXT CURATION                             │
│     Knowing what the model needs to see           │
│     Managing context windows, handoffs            │
├─────────────────────────────────────────────────┤
│  4. RAPID CODE REVIEW                            │
│     Fast scanning of AI-generated diffs           │
│     Architectural oversight and pattern detection │
├─────────────────────────────────────────────────┤
│  5. TEST-DRIVEN VALIDATION                       │
│     Writing failing tests first                   │
│     Verifying behavior, not just syntax           │
├─────────────────────────────────────────────────┤
│  6. DOMAIN EXPERTISE                             │
│     Recognizing when AI is wrong                  │
│     Knowing what "correct" looks like             │
└─────────────────────────────────────────────────┘
```

**Key insight from Addy Osmani:** "The LLM is an assistant, not an autonomously reliable coder. I am the senior dev."

**Key insight from Simon Willison:** "AI tools amplify existing expertise. The more skills and experience you have as a software engineer, the faster and better the results."

---

## Frameworks and Taxonomies

### Five Development Models (Ge et al. 2025)

| Model | Description | Best For |
|---|---|---|
| **Unconstrained Automation** | Minimal human intervention, broad agent autonomy | Simple, well-bounded tasks |
| **Iterative Conversational** | Natural language dialogue drives refinement | Exploratory prototyping |
| **Planning-Driven** | Explicit task decomposition precedes implementation | Large systems, complex features |
| **Test-Driven** | Test specifications guide code generation | Quality-critical projects |
| **Context-Enhanced** | Systematic curation of project knowledge | Complex domains, specialized APIs |

### Spec-Driven Development (Thoughtworks)

A formalized evolution beyond vibe coding:

> "A development paradigm that uses well-crafted software requirement specifications as prompts, aided by AI coding agents, to generate executable code."

**Specification quality criteria:**
- Domain-oriented ubiquitous language (not tech-specific)
- Given/When/Then structure for scenarios
- Completeness yet conciseness — critical path without enumerating all cases
- Clarity and determinism to reduce hallucinations
- Natural language + semi-structured machine-readable formats

Source: [Thoughtworks — Spec-Driven Development](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)

### When Vibe Coding Works vs. Fails

**Success criteria** (from Russ Poldrack's experience):
- Leverages existing packages with good documentation
- Addresses problems commonly solved on GitHub (in training data)
- Has clear, specific requirements documented upfront
- Integration tasks, not novel algorithm development

**Failure conditions** (from Poldrack's failed GPU experiments):
- Novel technical challenges requiring specialized domain expertise
- Performance optimization on non-mainstream hardware
- GPU architecture mismatches that require deep systems knowledge
- "A bit of deeper knowledge could have prevented several days of watching Claude go down numerous rabbit holes"

Source: [Russ Poldrack — Workflows for Agentic Coding](https://russpoldrack.substack.com/p/workflows-for-agentic-coding-and)

---

## Limitations and Open Questions

### What We Don't Know Yet

1. **No consensus definition of "productivity"** — studies use task completion time, pull requests/week, lines of code, or self-reported satisfaction, making cross-study comparison unreliable.

2. **Code quality is largely unmeasured** — the largest enterprise studies (Cui et al. 2025) explicitly could not measure quality impacts. Community reports suggest 7–15% higher post-merge defect rates with low review depth.

3. **The perception-reality gap** — developers consistently report feeling more productive while measurable output shows modest or no gains (Stray et al. 2025: Pearson r ≈ 0.17 between perceived and actual productivity).

4. **Skill formation risk** — the Anthropic study (Shen & Tamkin 2026) shows AI-assisted coding can harm learning when used for passive delegation. This directly challenges "vibe coding as a learning tool" narratives.

5. **Team dynamics are unsolved** — most evidence is for solo developers. Harper Reed: "The interfaces are all single player mode." Team vibe coding workflows remain an acknowledged open problem.

6. **Domain specificity** — evidence for vibe coding in scientific computing, embedded systems, and performance-critical code is thin to negative.

7. **Negative cases are underreported** — a Replit incident deleted SaaStr's production database during a vibe coding session. Gene Kim's co-author documented an AI agent that silently deleted 80% of a test suite across 35 commits before detection.

### The Honest Bottom Line

**For small-scale, niche problem-solving tools built by individuals:**

The evidence strongly supports vibe coding as a transformative practice — but only when combined with structured methodology (spec → plan → execute → test → commit). The "software for one" use case is the killer app: hyper-personal tools that solve your exact problem, built in hours instead of never.

**Realistic productivity expectations:**
- **Greenfield prototypes with proper workflow:** 20–45% faster (controlled studies)
- **Single-file tools and personal scripts:** Potentially 5–16x faster (practitioner reports, Gene Kim)
- **Complex production systems:** Modest gains to negative impact without deep expertise
- **Domain expert + vibe coding:** The highest-leverage combination (multiple case studies)

The 100x claim is achievable only in a specific sense: **projects that would never have been built at all** can now be built in hours. The multiplier is not "100x faster" — it's "possible vs. impossible."

---

## Full Source Index

### Academic Papers

1. Ge, Y. et al. (2025). *A Survey of Vibe Coding with Large Language Models*. [arXiv:2510.12399](https://arxiv.org/abs/2510.12399)
2. Fawzy, A. et al. (2025). *Vibe Coding in Practice*. [arXiv:2510.00328](https://arxiv.org/abs/2510.00328)
3. Sarkar, A. & Drosos, I. (2025). *Vibe coding: programming through conversation*. [arXiv:2506.23253](https://arxiv.org/abs/2506.23253)
4. Pimenova, V. et al. (2025). *Good Vibrations?*. [arXiv:2509.12491](https://arxiv.org/abs/2509.12491)
5. Peng, S. et al. (2023). *Impact of AI on Developer Productivity: GitHub Copilot*. [arXiv:2302.06590](https://arxiv.org/abs/2302.06590)
6. Cui, Z. et al. (2024). *Effects of Generative AI on High-Skilled Work*. [Microsoft Research](https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/)
7. Paradis, E. et al. (2024). *How much does AI impact development speed?*. [arXiv:2410.12944](https://arxiv.org/html/2410.12944v2)
8. Becker, J. et al. (2025). *Measuring Impact of AI on Experienced OSS Developer Productivity*. [arXiv:2507.09089](https://arxiv.org/abs/2507.09089)
9. Shen, J.H. & Tamkin, A. (2026). *How AI Impacts Skill Formation*. [arXiv:2601.20245](https://arxiv.org/abs/2601.20245)
10. Huang, R.L. et al. (2025). *Professional Software Developers Don't Vibe, They Control*. [arXiv:2512.14012](https://arxiv.org/html/2512.14012)
11. Danassis, P. & Goel, N. (2025). *Can Vibe Coding Beat Graduate CS Students?*. [arXiv:2511.20613](https://arxiv.org/abs/2511.20613)
12. Stray, V. et al. (2025). *Developer Productivity With and Without GitHub Copilot*. [arXiv:2509.20353](https://arxiv.org/html/2509.20353v2)
13. Chen, H. et al. (2025). *FeatBench: Evaluating Coding Agents*. [arXiv:2509.22237](https://arxiv.org/abs/2509.22237)
14. Ullah, M.A. & Serwadda, A. (2026). *Vibe Coding on Trial*. [arXiv:2602.18492](https://arxiv.org/abs/2602.18492)
15. Wang, C.-Y. et al. (2024). *PET-Select for Code Generation*. [arXiv:2409.16416](https://arxiv.org/abs/2409.16416)

### Practitioner Sources

16. Willison, S. (2025). *Here's How I Use LLMs to Help Me Write Code*. [simonwillison.net](https://simonwillison.net/2025/Mar/11/using-llms-for-code/)
17. Willison, S. (2025). *Vibe Engineering*. [simonw.substack.com](https://simonw.substack.com/p/vibe-engineering)
18. Willison, S. (2025). *Useful Patterns for Building HTML Tools*. [simonwillison.net](https://simonwillison.net/2025/Dec/10/html-tools/)
19. Reed, H. (2025). *My LLM Codegen Workflow atm*. [harper.blog](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/)
20. Osmani, A. (2025). *My LLM Coding Workflow Going Into 2026*. [addyosmani.com](https://addyosmani.com/blog/ai-coding-workflow/)
21. Poldrack, R. (2025). *Workflows for Agentic Coding*. [russpoldrack.substack.com](https://russpoldrack.substack.com/p/workflows-for-agentic-coding-and)
22. Kreutzbender, J. (2025). *Thoughts and Experiences with Vibe Coding*. [jeremykreutzbender.com](https://jeremykreutzbender.com/blog/thoughts-and-experiences-vibe-coding-mid-2025)
23. Wasp team. (2025). *Structured Workflow for Vibe Coding Full-Stack Apps*. [DEV Community](https://dev.to/wasp/a-structured-workflow-for-vibe-coding-full-stack-apps-352l)
24. Shankar, S. (2025). *How I Use Every Claude Code Feature*. [blog.sshh.io](https://blog.sshh.io/p/how-i-use-every-claude-code-feature)
25. Fowler, M. (2025). *Context Engineering for Coding Agents*. [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html)
26. Thoughtworks. (2025). *Spec-Driven Development*. [thoughtworks.com](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)
27. Osmani, A. (2025). *Vibe Coding is Not AI-Assisted Engineering*. [addyo.substack.com](https://addyo.substack.com/p/vibe-coding-is-not-the-same-as-ai)

### Reddit and Community Sources

28. Solveo. (2025). *We Analyzed 1,000 Reddit Comments on Vibe Coding Tools*. [solveo.co](https://www.solveo.co/post/we-analyzed-1-000-reddit-comments-to-discover-the-most-used-vibe-coding-tools)
29. AI Tool Discovery. (2025). *Claude Code Reddit Guide*. [aitooldiscovery.com](https://www.aitooldiscovery.com/guides/claude-code-reddit)
30. AI Tool Discovery. (2025). *Best AI for Coding: Reddit's Top Picks*. [aitooldiscovery.com](https://www.aitooldiscovery.com/guides/best-ai-for-coding-reddit)
31. LogRocket. (2025). *You're Doing Vibe Coding Wrong*. [blog.logrocket.com](https://blog.logrocket.com/youre-doing-vibe-coding-wrong/)
32. Softr. (2025). *8 Vibe Coding Best Practices*. [softr.io](https://www.softr.io/blog/vibe-coding-best-practices)
33. Stack Overflow. (2025). *2025 Developer Survey — AI Section*. [survey.stackoverflow.co](https://survey.stackoverflow.co/2025/ai)
34. Pockit Tools. (2026). *Cursor vs Windsurf vs Claude Code*. [DEV Community](https://dev.to/pockit_tools/cursor-vs-windsurf-vs-claude-code-in-2026-the-honest-comparison-after-using-all-three-3gof)
35. getpanto.ai. (2025). *Vibe Coding Statistics*. [getpanto.ai](https://www.getpanto.ai/blog/vibe-coding-statistics)

### Case Study Sources

36. Indie Hackers. (2025). *Pieter Levels Flight Simulator*. [indiehackers.com](https://www.indiehackers.com/post/tech/pieter-levels-used-ai-to-build-a-viral-flight-simulator-in-3-hours-with-no-background-in-game-development-7CPfMr1yRLEwH6cC8xhE)
37. IT Revolution. (2025). *Gene Kim — Last 80 Hours of Editing the Vibe Coding Book*. [itrevolution.com](https://itrevolution.com/articles/the-last-80-hours-of-editing-the-vibe-coding-book/)
38. Creator Economy. (2025). *Teresa Torres — Automate Your Life with Claude Code*. [creatoreconomy.so](https://creatoreconomy.so/p/automate-your-life-with-claude-code-teresa-torres)
39. IT Revolution. (2025). *NYT Case for Vibe Coding (Kevin Roose)*. [itrevolution.com](https://itrevolution.com/articles/the-new-york-timess-just-made-the-case-for-vibe-coding-heres-the-deeper-story/)
40. Build to Launch. (2025). *SubflowAI — Chrome Extension for $135*. [buildtolaunch.substack.com](https://buildtolaunch.substack.com/p/vibe-coding-builders-substack-notes-chrome-extension-claude-code-135-dollars)
41. Search Engine Land. (2025). *Vibe Coding PPC Tools*. [searchengineland.com](https://searchengineland.com/vibe-coding-build-tools-in-minutes-smx-next-465729)
42. glaforge.dev. (2025). *Vibe Coding a Chrome Extension*. [glaforge.dev](https://glaforge.dev/posts/2025/08/06/vibe-coding-a-chrome-extension-with-gemini-cli-to-summarize-articles/)
43. Search Engine Land. (2025). *How to Vibe-Code an SEO Tool*. [searchengineland.com](https://searchengineland.com/vibe-code-seo-tool-469657)
44. Hacker News. (2025). *Impressive Vibe Coding Projects*. [news.ycombinator.com](https://news.ycombinator.com/item?id=45642527)
45. Indie Hackers. (2025). *8 Vibe Coders Building Real SaaS MVPs*. [indiehackers.com](https://www.indiehackers.com/post/tech/8-vibe-coders-who-are-building-real-saas-mvps-not-just-games-ItN5XsfrbQ2RCwawoIqn)

### Additional References

46. Karpathy, A. (2025). *Original "vibe coding" tweet*. [x.com](https://x.com/karpathy/status/1886192184808149383)
47. Wikipedia. *Vibe coding*. [wikipedia.org](https://en.wikipedia.org/wiki/Vibe_coding)
48. Willison, S. *Tools Collection*. [tools.simonwillison.net](https://tools.simonwillison.net/)
49. AGENTS.md. *Open Standard*. [agents.md](https://agents.md/)
50. Continue.dev. (2025). *Stop Asking AI to Build the Whole Feature*. [blog.continue.dev](https://blog.continue.dev/task-decomposition/)
