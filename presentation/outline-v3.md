# Vibe Coding for Problem Solvers — v3 Slide Outline

> **Rebuild brief:** A 100x improvement driven by the feedback note. One narrative
> loop replaces the scattered "7 skills." Everything orbits a single idea:
>
> ### THE LOOP
> **I hit a small problem in my knowledge work → I vibe-code a tiny app for it →
> I extract a lesson → I decide: throw away, reuse, or turn into a skill.**
>
> Course = "Solving your own problems with vibe-coded apps."
> Get to the cool stuff in the first 5 minutes. No abstract preamble.

---

## ACT 0 — COLD OPEN (≈ first 5 minutes, no slow intro)

**S1 — Title**
- Vibe Coding for Problem Solvers — *Solve your own problems with tiny apps*
- Lucas Soares · date

**S2 — About Me**
- AI Engineer & Instructor, Automata Learning Lab
- ADD: book on **Agent Skills** cover (screenshot from academic-tools-workshop folder)
- One line: "I make a throwaway app almost every day to get my own work done."

**S3 — The whole course on one slide: THE LOOP**
- Diagram: Problem → Vibe-code a tiny app → Lesson → (Trash / Reuse / Skillify)
- "That's it. Everything today is one turn of this loop, again and again."
- Sets the narrative the old deck never had.

**S4 — What vibe coding actually is (1 slide, then move on)**
- Simon Willison's definition, the *practical* half only: building with an LLM,
  light or no code review — fine **because the stakes are small and personal**.
- No spectrum bar, no vibe-vs-real-engineering essay. One line: "When it's your own
  small tool, speed beats ceremony."

**S5 — COLD-OPEN DEMO (live or recorded): a real problem from this week**
- "My calendar had 40 junk events. I didn't want to click through the calendar app."
- → spin up an HTML **decision deck**: swipe keep/delete, actions execute via MCP.
- Audience sees a finished, useful thing in minute 5. *This is the course in miniature.*

---

## ACT 1 — THE GALLERY: what's possible (fast montage, ~6 slides)

> Goal: install the vision FAST. Each app = "here's a problem, here's the app."
> All real, all in the repo or buildable live.

**S6 — Decision decks (the signature pattern)**
- Problem family: *bulk small decisions you dread doing in the real app.*
- Calendar event triage · file triage · screenshot-reviewer.html · idea swiper
- "Scrolling/swiping becomes the decision; the decision triggers the workflow."

**S7 — Learn-from-your-own-stuff**
- Dynamic self-quizzing from a document or article (quiz generator)
- Video quiz app · video note-taker (timestamps + `.md` export)

**S8 — Keep-it-local media tools**
- Video chat app where **video never leaves your machine**
- Foreshadows the privacy point in the vibe-checking act.

**S9 — Generators & one-off dashboards**
- Clara cast-board: generate images → export the photos
- Round-robin tournament app ("fake Olympics")
- Small useful dashboards for whatever you're tracking this week

**S10 — The decision deck as a reusable concept**
- Frame it as a *category*: a tiny interface for quick verification & decision
  delegation at small scale.
- Example: rearrange a schedule quickly through a simple deck UI (decision deck,
  not a clunky button grid).

**S11 — "Same loop made all of these"**
- Callback to S3. Transition: "Now let's slow down and learn the moves."

---

## ACT 2 — THE MOVES (teach the skills, each through building a real app)

> Every skill is taught *inside* a build, not as abstract theory.

### Unit A — Prompting as a workflow (full rebuild)

**S12 — Reframe: prompting is a workflow, not a checklist**
- Old way (cut): 6 generic Anthropic patterns copy-pasted.
- New way: "I'm in Claude / Claude Code. I want to do X, then Y. Here's how I
  actually talk to it."

**S13 — Live build: a decision deck, narrated by the prompts**
- Show the real prompt sequence:
  1. "Build a single-file HTML app that..." (clear first ask)
  2. "Now add keyboard swipe + a counter" (iterate on what works)
  3. "Wire the keep/delete actions to write a JSON of decisions" (decompose)
  4. "Match this screenshot's layout" (show, don't tell)
- Patterns appear *in context* as they're used: clear-first-ask, iterate,
  decompose, examples/screenshots, constraints ("single file, no React").

**S14 — Prompts that did real work (keep, retie to the loop)**
- Simon's Codex scrape prompt + the Claude artifact UI prompt — but framed as
  "two tools, one tiny problem," not as a generic case study.

### Unit B — Vibe checking THESE apps (rewrite, concrete)

**S15 — Vibe checking, reframed for tiny apps**
- Not vague green/red flags. Concrete: "for an app like this, here's what to look at."

**S16 — Security from simple → technical (the must-knows)**
- Never put API keys anywhere that can go public.
- Use **localStorage** for keys so they never touch a server (Simon Willison tip).
- Keep sensitive data local (the video app: video stays on device).
- Watch the "130MB bug" class of issue: check request counts / payload sizes.

**S17 — When a vibe check is enough vs. when to stop**
- Enough: personal, local, throwaway, only-you-use-it.
- Stop & think: anything public, anything with other people's data, anything
  you'd be embarrassed to leak.

### Unit C — Pick the right tool & model (practical)

**S18 — Which tool for which job**
- Claude artifact (instant single-file UI) · Claude Code (multi-file, MCP, local
  files) · Codex (autonomous tasks) · Vercel/v0 (deploy).
- Decision rule per row, not a feature table.

**S19 — Leaderboards, but actionable (rewrite)**
- "If you're unsure which model for X → check Y, pick the top one, move on."
- LM Arena / Artificial Analysis with a concrete "use this when…" per board.
- One line on limits: training cutoffs → load fresh docs into context.

### Unit D — The decision after the build (the part that makes it a *practice*)

**S20 — "What did I just learn?"**
- After every little app, ask: trash it, reuse it, or skillify it?

**S21 — How small should it stay? Deploy or keep local?**
- The conceptual content, made practical: keep it as small as the problem;
  default to local; deploy on Vercel only when someone else needs it.

**S22 — When to turn an app into an agent skill**
- Signal: "I've rebuilt this three times." → promote to a reusable skill/command.
- Tie to the agent-skills book from S2.

---

## ACT 3 — PATTERNS YOU CAN USE TOMORROW (keep all 5, refine + retie)

> All kept per feedback, but each now explicitly serves "build a tiny app for a
> real problem."

**S23 — Pattern 1: Start with a prototype, not a spec**
**S24 — Pattern 2: Let it see what you see** (screenshots + full errors)
**S25 — Pattern 3: Restart when stuck** (fresh context + tiny handoff)
**S26 — Pattern 4: Automate repeatable steps** (`uv` single-file scripts)
**S27 — Pattern 5: Raw → structured** (notes → JSON/calendar/tasks)
**S28 — Pattern 6 (promoted): The decision deck** (bulk small decisions → swipes)

---

## CLOSE

**S29 — The meta-skill: vibe coding for thought**
- Swap "apps" for "ideas," "prototypes" for "rough answers." Same loop.

**S30 — Recap: the loop, once more**
- Problem → tiny app → lesson → trash/reuse/skillify. "Go make one this week."

**S31 — Connect with me** (GitHub repo, LinkedIn, X, YouTube, email, the book)

---

## CUT FROM v2 (per feedback)
- Long intro: spectrum bar, vibe-vs-real-engineering, tool-landscape table, when-to/danger-zone essay (compress to S4).
- Entire **Context Management** section (4 strategies) — removed.
- **Problem / Tool / Task** delegation framework — removed.
- **Part 5: Practice & Guardrails** — brain-rot, 70-30 rule, success metrics, benchmarking — removed.
- Generic 6-prompting-patterns wheel — replaced by workflow-driven Unit A.
- Appendices (tool pricing, cognitive offloading, benchmarking, orchestration, cross-domain) — drop or fold one line into relevant slide; orchestration is out of scope for "small-scale problem solving."

## KEEP / EVOLVE
- The 5 patterns (refined → 6 with decision deck).
- Simon Willison definition + Open Sauce prompts (retied, not a standalone case study).
- Leaderboards (rewritten to be actionable).
- Vibe checking (rewritten around apps + concrete security).
