---
marp: true
theme: automata
paginate: true
---

<style>
/* deck-local components — complement the automata brand theme */
.frame{ border-radius:12px; overflow:hidden; box-shadow:0 22px 50px -18px rgba(22,19,15,.4);
  border:1px solid var(--border); background:#fff; display:inline-block; }
.frame .bar{ height:26px; background:#e7e2d6; display:flex; align-items:center;
  padding:0 12px; gap:6px; border-bottom:1px solid rgba(0,0,0,.05); }
.frame .bar i{ width:9px;height:9px;border-radius:50%;display:inline-block; }
.frame .d1{ background:#ff5f57;} .frame .d2{ background:#febc2e;} .frame .d3{ background:#28c840;}
.frame img{ display:block; width:100%; object-fit:cover; object-position:top center; margin:0; }

.grid{ display:grid; gap:22px; margin-top:10px; }
.g2{ grid-template-columns:1fr 1fr; } .g3{ grid-template-columns:1fr 1fr 1fr; }
.cap{ font-size:14px; margin-top:8px; color:var(--ink-soft); line-height:1.35; }
.cap b{ font-family:var(--font-display); color:var(--ink); display:block; font-size:16px; }

.loop{ display:flex; align-items:center; justify-content:center; gap:0; margin-top:24px; }
.loop .node{ background:var(--cream-card); border:1.5px solid var(--ink); border-radius:16px;
  padding:18px 16px; width:200px; text-align:center; }
.loop .node .n{ font-family:var(--font-display); color:var(--accent); font-weight:600; font-size:14px; letter-spacing:.1em; }
.loop .node .t{ font-family:var(--font-display); font-weight:600; font-size:19px; margin-top:6px; }
.loop .node .s{ font-size:13px; color:var(--ink-soft); margin-top:8px; line-height:1.35; }
.loop .arr{ font-size:26px; color:var(--accent); padding:0 12px; }
section.dark .loop .node{ background:transparent; border-color:var(--cream-card); }
section.dark .loop .node .t{ color:#FBF6EC; } section.dark .loop .arr{ color:var(--accent-soft); }

.prompt{ font-family:'JetBrains Mono',monospace; font-size:15px; line-height:1.5;
  background:var(--dark); color:#efe9dc; border-radius:12px; padding:14px 16px; margin:10px 0;
  border-left:4px solid var(--accent); }
.prompt .step{ color:var(--accent-soft); font-weight:500; display:block; margin-bottom:6px; letter-spacing:.03em; }

.duo{ display:grid; grid-template-columns:1fr 1fr; gap:22px; margin-top:14px; }
.card{ border-radius:14px; padding:20px 22px; border:1px solid var(--border); background:var(--cream-card); }
.card h3{ font-size:20px; margin-bottom:8px; }
.card ul{ margin:0; padding-left:20px; font-size:16px; line-height:1.55; }
.card p{ margin:0; font-size:16px; }
.ok{ background:rgba(47,125,107,.08); border-color:rgba(47,125,107,.35); }
.ok h3{ color:#2F7D6B; }
.no{ background:rgba(155,44,44,.07); border-color:rgba(155,44,44,.35); }
.no h3{ color:var(--accent); }

.two13{ display:grid; grid-template-columns:1.05fr 1.4fr; gap:42px; align-items:center; }
.two{ display:grid; grid-template-columns:1fr 1fr; gap:42px; align-items:center; }
.lead-p{ font-size:33px; line-height:1.25; font-family:var(--font-display); }
.dim{ color:var(--ink-soft); }
.tag{ display:inline-block; font-family:var(--font-body); font-size:13px; font-weight:600;
  padding:5px 12px; border-radius:30px; border:1px solid var(--border); color:var(--ink-soft);
  margin:4px 6px 4px 0; background:var(--cream-card); }
.pat{ display:flex; align-items:baseline; gap:28px; }
.pat .num{ font-family:var(--font-display); font-weight:600; font-size:160px; color:var(--accent); line-height:.8; }
.center{ text-align:center; }
.footnote{ position:absolute; bottom:24px; left:64px; font-size:12px; color:var(--ink-soft); }
.check li::marker{ color:var(--accent); content:"→  "; }
</style>

<!-- _class: lead dark -->
<!-- _paginate: false -->

<div class="kicker">O'Reilly Live Training</div>

# Vibe Coding for Problem Solvers

## Solve your own problems with tiny apps

<p class="dim" style="margin-top:32px;">Lucas Soares · Automata Learning Lab</p>

---

## About me

<div class="two13" style="margin-top:18px;">
<div style="display:flex;gap:18px;align-items:flex-end;">
<div class="frame">
<div class="bar"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div>
<img src="../assets/profile_pic.png" style="width:180px;height:220px;object-position:center;">
</div>
<img src="../assets/book-cover.png" style="width:135px;border-radius:8px;box-shadow:0 16px 36px -12px rgba(22,19,15,.45);">
</div>
<div>
<p class="lead-p">AI Engineer &amp; Instructor.</p>
<p class="dim" style="font-size:18px;">I ship a throwaway little app almost every day — just to get my own work done faster.</p>
<p style="margin-top:18px;">
<span class="tag">Author · <em>Skills for AI Agents</em> (O'Reilly)</span>
<span class="tag">YouTube · @automatalearninglab</span>
</p>
</div>
</div>

---

<!-- _class: lead -->

<div class="kicker">The whole course on one slide</div>

# It's one loop.

<div class="loop">
<div class="node"><div class="n">01</div><div class="t">A problem</div><div class="s">Something annoying in my daily work</div></div>
<div class="arr">→</div>
<div class="node"><div class="n">02</div><div class="t">Vibe-code it</div><div class="s">A tiny app, in minutes</div></div>
<div class="arr">→</div>
<div class="node"><div class="n">03</div><div class="t">A lesson</div><div class="s">What worked? What didn't?</div></div>
<div class="arr">→</div>
<div class="node"><div class="n">04</div><div class="t">Trash · Reuse · Skillify</div><div class="s">Keep it only if it earns it</div></div>
</div>

<p class="center dim" style="margin-top:40px;font-size:18px;">Everything today is one turn of this loop — again and again.</p>

---

<!-- _class: lead -->

<div class="kicker">What vibe coding actually is</div>

<p class="lead-p" style="max-width:18em;">Building software with an LLM, with little or no code review —</p>
<p class="lead-p" style="max-width:18em;color:var(--accent);">fine, because the stakes are small and the app is yours.</p>

<p class="dim" style="margin-top:32px;font-size:16px;">No spectrum charts. When it's your own small tool, speed beats ceremony.</p>

<div class="footnote">Definition adapted from Simon Willison, 2025</div>

---

<!-- _class: lead -->

<div class="kicker">Cold open · a real problem this week</div>

<div class="two13">
<div>
<p class="lead-p">73 events to triage on my calendar.</p>
<p class="dim" style="font-size:18px;">I did not want to click through the calendar app one by one.</p>
<p style="margin-top:18px;font-family:var(--font-display);font-weight:600;color:var(--accent);">So I made this in 5 minutes. →</p>
</div>
<div class="frame">
<div class="bar"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div>
<img src="../assets/app-cal-cleanup.png" style="height:340px;object-position:top;">
</div>
</div>

<p class="center dim" style="margin-top:18px;font-size:15px;">Mark Keep or Delete, hit the button — deletions go straight to Google Calendar. The decision <em>is</em> the workflow.</p>

---

<!-- _class: lead dark -->

<div class="kicker">A quick tour</div>

# Real problems → tiny apps

---

## Decision decks

<p class="dim" style="margin-top:-8px;font-size:17px;">Bulk small decisions you dread doing in the real app. Scrolling becomes deciding.</p>

<div class="grid g3">
<div>
<div class="frame"><div class="bar"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div><img src="../assets/screenshots-v3/idea-swiper.png" style="height:190px;"></div>
<div class="cap"><b>Idea swiper</b>Keep or kill ideas, fast</div>
</div>
<div>
<div class="frame"><div class="bar"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div><img src="../assets/screenshots-v3/file-triage.png" style="height:190px;"></div>
<div class="cap"><b>File triage</b>Sort a messy folder</div>
</div>
<div>
<div class="frame"><div class="bar"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div><img src="../assets/screenshots-v3/screenshot-reviewer.png" style="height:190px;"></div>
<div class="cap"><b>Screenshot reviewer</b>Triage your screenshots folder</div>
</div>
</div>

---

## Learn from your own stuff

<p class="dim" style="margin-top:-8px;font-size:17px;">Turn a document, article, or video into a way to test yourself.</p>

<div class="grid g2">
<div>
<div class="frame"><div class="bar"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div><img src="../assets/screenshots-v3/quiz-app.png" style="height:285px;object-position:center;"></div>
<div class="cap"><b>Quiz app</b>Drop a doc → get quizzed</div>
</div>
<div>
<div class="frame"><div class="bar"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div><img src="../assets/screenshots-v3/video-quiz.png" style="height:285px;"></div>
<div class="cap"><b>Video quiz</b>Video + transcript → quiz</div>
</div>
</div>

---

## Keep it local

<div class="two13">
<div>
<p class="lead-p">Some data should never leave your machine.</p>
<p class="dim" style="font-size:17px;">This note-taker plays your video locally and exports timestamped notes to a <code>.md</code> file. Nothing uploaded.</p>
<p style="margin-top:12px;"><span class="tag">Video stays on device</span><span class="tag">Markdown export</span></p>
</div>
<div class="frame">
<div class="bar"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div>
<img src="../assets/screenshots-v3/video-note-taker.png" style="height:320px;">
</div>
</div>

---

## Generators &amp; one-off dashboards

<div class="two">
<div>
<div class="frame"><div class="bar"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div><img src="../assets/screenshots-v3/tournament.png" style="height:280px;"></div>
<div class="cap"><b>Round-robin tournament</b>A "fake Olympics" in an afternoon</div>
</div>
<div>
<div class="frame"><div class="bar"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div><img src="../assets/screenshots-v3/llm-viz.png" style="height:280px;object-position:top;"></div>
<div class="cap"><b>Tiny dashboard</b>Whatever you're tracking this week</div>
</div>
</div>

---

<!-- _class: lead dark -->

# The same loop made all of these.

<p class="dim" style="margin-top:18px;">Now let's slow down and learn the moves.</p>

---

<!-- _class: lead dark -->

<div class="kicker">Part two</div>

# The moves

---

<div class="kicker">Move 1 · Prompting</div>

# Prompting is a workflow, not a checklist.

<div class="duo" style="margin-top:24px;">
<div class="card no">
<h3>The old way</h3>
<p class="dim">Memorize six generic "prompt patterns" and hope.</p>
</div>
<div class="card ok">
<h3>The real way</h3>
<p>"I'm in Claude / Claude Code. I want to do <em>this</em>, then <em>this</em>. Here's how I actually talk to it."</p>
</div>
</div>

---

<div class="kicker">Move 1 · the build, narrated by the prompts</div>

# Building a decision deck, prompt by prompt

<div class="prompt"><span class="step">1 · clear first ask</span>Build a single-file HTML app that loads a folder and shows one file at a time.</div>
<div class="prompt"><span class="step">2 · iterate on what works</span>Add left/right arrow keys to swipe, and a keep/delete counter at the top.</div>
<div class="prompt"><span class="step">3 · decompose the hard part</span>Wire keep/delete to write a decisions.json I can run later.</div>
<div class="prompt"><span class="step">4 · show, don't tell</span>Match the layout in this screenshot. Single file, no React.</div>

---

<div class="kicker">Move 1 · two tools, one tiny problem</div>

# Let each tool do what it's best at

<div class="two">
<div class="prompt" style="border-left-color:#2F7D6B;">
<span class="step" style="color:#7fd1bf;">Codex — autonomous task</span>
Install playwright, scrape the full 3-day schedule from this URL, save it as JSON, open a PR.
</div>
<div class="prompt">
<span class="step">Claude — iterative UI</span>
Turn that schedule into a mobile-friendly page. Fetch from the URL, don't inline the JSON. Add a "download ICS" button.
</div>
</div>

<p class="center dim" style="margin-top:22px;font-size:16px;">One scrapes while you sleep. One builds while you watch. Same little problem.</p>

<div class="footnote">Simon Willison — vibe-scraping Open Sauce 2025</div>

---

<!-- _class: lead -->

<div class="kicker">Move 2 · Vibe checking</div>

# Don't review every line. Check the things that bite.

<p class="lead-p" style="max-width:16em;margin-top:16px;">For an app like this, here's what actually matters —</p>
<p class="dim" style="font-size:18px;">from dead simple to slightly technical.</p>

---

<div class="kicker">Move 2 · the must-knows</div>

# Security, simple → technical

<ul class="check" style="font-size:20px;margin-top:8px;line-height:1.6;">
<li><strong>Never</strong> put API keys anywhere that can go public.</li>
<li>Store keys in <strong>localStorage</strong> — they never touch a server. <span class="dim">(Simon Willison's tip)</span></li>
<li>Keep sensitive data <strong>local</strong>. The video app? Video stays on the device.</li>
<li>Watch payload size: <strong>176 requests, 130&nbsp;MB</strong> is the kind of thing a vibe check catches.</li>
</ul>

---

<div class="kicker">Move 2 · how much checking is enough</div>

# Enough vs. stop and think

<div class="duo">
<div class="card ok">
<h3>A vibe check is enough</h3>
<ul>
<li>Personal &amp; local</li>
<li>Throwaway / one-off</li>
<li>Only you will use it</li>
</ul>
</div>
<div class="card no">
<h3>Stop and think</h3>
<ul>
<li>Anything public</li>
<li>Other people's data</li>
<li>Anything you'd hate to leak</li>
</ul>
</div>
</div>

---

<div class="kicker">Move 3 · Capability</div>

# Which tool for which job

<div class="grid g2" style="gap:16px;">
<div class="card"><h3 style="color:var(--accent)">Claude artifact</h3><p class="dim">Instant single-file UI. Start here.</p></div>
<div class="card"><h3 style="color:var(--accent)">Claude Code</h3><p class="dim">Multi-file, your local files, MCP tools.</p></div>
<div class="card"><h3 style="color:var(--accent)">Codex</h3><p class="dim">Autonomous, walk-away tasks.</p></div>
<div class="card"><h3 style="color:var(--accent)">v0 / Vercel</h3><p class="dim">When it needs to be deployed.</p></div>
</div>

<p class="center dim" style="margin-top:18px;font-size:16px;">Pick by the job, not the feature list.</p>

---

<div class="kicker">Move 3 · models</div>

# Leaderboards, made actionable

<p class="lead-p" style="max-width:17em;">Unsure which model for a job? Check one board, take the top, move on.</p>

<ul class="check" style="font-size:18px;margin-top:14px;">
<li><strong>LM Arena</strong> — general "which model feels smartest right now"</li>
<li><strong>Artificial Analysis</strong> — speed &amp; price per task</li>
</ul>
<p class="dim" style="margin-top:12px;font-size:16px;">Models have training cut-offs → when in doubt, paste fresh docs into context.</p>

---

<!-- _class: lead -->

<div class="kicker">Move 4 · the part that makes it a practice</div>

# "What did I just learn?"

<div class="loop" style="margin-top:20px;">
<div class="node" style="border-color:var(--ink-soft)"><div class="t">Trash it</div><div class="s">Did its job. Let it go.</div></div>
<div class="arr">·</div>
<div class="node" style="border-color:#2F7D6B"><div class="t" style="color:#2F7D6B">Reuse it</div><div class="s">Keep it handy for next time</div></div>
<div class="arr">·</div>
<div class="node" style="border-color:var(--accent)"><div class="t" style="color:var(--accent)">Skillify it</div><div class="s">Promote to a reusable skill</div></div>
</div>

---

# How small? Local or deployed?

<div class="duo" style="margin-top:18px;">
<div class="card ok">
<h3>Defaults that save you</h3>
<ul>
<li>As small as the problem — no smaller, no bigger</li>
<li>Default to <strong>local</strong> (a file you open)</li>
</ul>
</div>
<div class="card">
<h3>Deploy only when…</h3>
<ul>
<li>Someone else needs to use it</li>
<li>Then: drop it on Vercel</li>
</ul>
</div>
</div>

---

<!-- _class: lead -->

<div class="kicker">Move 4 · the signal</div>

# Rebuilt it three times? Make it a skill.

<p class="lead-p" style="max-width:18em;margin-top:8px;">Repetition is the signal to promote a throwaway app into a reusable <strong>agent skill</strong> or command.</p>

<p style="margin-top:18px;"><span class="tag">See: my book on Agent Skills</span></p>

---

<!-- _class: lead dark -->

<div class="kicker">Part three</div>

# Patterns you can use tomorrow

---

<!-- _class: lead -->

<div class="pat">
<div class="num">1</div>
<div>
<h2>Start with a prototype, not a spec</h2>
<p class="dim">Get something working in 5 minutes. Iterate on what's real, not on a doc.</p>
</div>
</div>

---

<!-- _class: lead -->

<div class="pat">
<div class="num">2</div>
<div>
<h2>Let it see what you see</h2>
<p class="dim">Paste the full error. Screenshot the broken UI. Context beats description.</p>
</div>
</div>

---

<!-- _class: lead -->

<div class="pat">
<div class="num">3</div>
<div>
<h2>Restart when stuck</h2>
<p class="dim">Going in circles for 10+ min? Fresh chat, a tiny handoff of state, continue clean.</p>
</div>
</div>

---

<!-- _class: lead -->

<div class="pat">
<div class="num">4</div>
<div>
<h2>Automate the repeatable step</h2>
<p class="dim">Ask for one self-contained <code>uv</code> script. Paste, <code>uv run</code>, done.</p>
</div>
</div>

<div class="prompt" style="margin-top:20px;max-width:30em;">
# /// script<br>
# requires-python = "&gt;=3.12"<br>
# dependencies = ["requests"]<br>
# ///
</div>

---

<!-- _class: lead -->

<div class="pat">
<div class="num">5</div>
<div>
<h2>Raw → structured</h2>
<p class="dim">Messy notes in, clean JSON out. Notes → calendar, ideas → tasks.</p>
</div>
</div>

---

<!-- _class: lead -->

<div class="pat">
<div class="num">6</div>
<div>
<h2>The decision deck</h2>
<p class="dim">Bulk small decisions → a swipe UI. The signature move of this whole course.</p>
</div>
</div>

---

<!-- _class: lead -->

<div class="kicker">The meta-skill</div>

# It works for thinking, too.

<p class="lead-p" style="max-width:18em;">Swap "apps" for "ideas" and "prototypes" for "rough answers." Same loop — AI as an engine for quick, disposable thinking.</p>

---

<!-- _class: lead dark -->

# The loop, once more

<div class="loop" style="margin-top:24px;">
<div class="node"><div class="t">Problem</div></div>
<div class="arr">→</div>
<div class="node"><div class="t">Tiny app</div></div>
<div class="arr">→</div>
<div class="node"><div class="t">Lesson</div></div>
<div class="arr">→</div>
<div class="node"><div class="t">Trash · Reuse · Skillify</div></div>
</div>

<p class="dim" style="margin-top:36px;">Go make one this week.</p>

---

<!-- _class: lead dark -->
<!-- _paginate: false -->

<div class="kicker">Connect with me</div>

# Keep vibing, keep building

<p style="line-height:2;font-size:18px;margin-top:16px;">
<a href="https://github.com/EnkrateiaLucca/vibe-coding-problem-solvers">Course materials — GitHub</a><br>
<a href="https://www.linkedin.com/in/lucas-soares-969044167/">LinkedIn — Lucas Soares</a><br>
<a href="https://x.com/LucasEnkrateia">X — @LucasEnkrateia</a><br>
<a href="https://www.youtube.com/@automatalearninglab">YouTube — @automatalearninglab</a><br>
<span class="dim">lucasenkrateia@gmail.com</span>
</p>