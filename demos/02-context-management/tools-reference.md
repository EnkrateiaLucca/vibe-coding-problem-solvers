# Context Gathering Tools Reference

A curated list of tools for gathering and preparing context for LLMs.

## Repository → Context

### gitingest.com
**URL:** https://gitingest.com

Convert any GitHub repository into LLM-ready context.

**Usage:**
```
Visit gitingest.com
Paste: github.com/username/repo
Get: Formatted context ready to paste
```

**Best for:** Quick repo analysis, understanding new codebases

---

### repomix
**URL:** https://github.com/yamadashy/repomix

Pack an entire repository into a single LLM-friendly file.

**Usage:**
```bash
npx repomix
# Creates repomix-output.txt with full repo content
```

**Best for:** Offline analysis, custom context preparation

---

### files-to-prompt
**URL:** https://github.com/simonw/files-to-prompt

CLI tool to concatenate files into LLM prompts.

**Usage:**
```bash
files-to-prompt src/ --include "*.py" > context.txt
```

**Best for:** Selective file inclusion, script automation

---

## Web Content → Context

### r.jina.ai
**URL:** https://r.jina.ai

Clean web content extraction. Returns markdown.

**Usage:**
```
https://r.jina.ai/https://example.com/article
→ Returns clean markdown content
```

**Best for:** Documentation, articles, blog posts

---

### llms.txt
**URL:** https://llmstxt.org

Standard for LLM-ready documentation.

**Look for:** `/llms.txt` on documentation sites for optimized content.

**Best for:** API docs, library documentation

---

### arxiv-txt.org
**URL:** https://www.arxiv-txt.org

Convert arXiv papers to clean text.

**Usage:**
```
https://arxiv-txt.org/abs/2301.xxxxx
→ Returns paper as text
```

**Best for:** Research papers, academic content

---

## IDE Integration

### Cursor
Built-in codebase indexing and @-mentions.

**Commands:**
- `@filename` - Include specific file
- `@codebase` - Search entire codebase
- `@docs` - Search documentation

---

### Claude Code
Terminal-based with codebase awareness.

**Commands:**
- Automatic codebase scanning
- Context from CLAUDE.md
- Smart file selection

---

### GitHub Copilot
Context from open files and repository.

**Features:**
- Open file context
- Repository-level awareness
- @workspace mentions

---

## Context Preparation Checklist

Before starting any AI task:

```
CONTEXT CHECKLIST
─────────────────────────────────────
□ What files does this task need?
□ What external docs are relevant?
□ Is CLAUDE.md up to date?
□ Should I use a context tool?
□ Am I loading too much context?
─────────────────────────────────────
```

## Quick Reference: Context Size Guidelines

| Context Type | Recommended Approach |
|--------------|---------------------|
| < 5 files | Direct @-mentions |
| 5-20 files | Selective loading |
| 20-100 files | Use gitingest/repomix |
| > 100 files | Isolate to agents |
| External docs | Use llms.txt or r.jina.ai |
| Research papers | Use arxiv-txt |
