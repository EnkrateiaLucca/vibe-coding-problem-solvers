# Demo 02: Context Management

Context is the fuel for AI effectiveness. Too little context = hallucinations. Too much context = confusion.

## The 4 Context Strategies

| Strategy | Core Idea | When to Use |
|----------|-----------|-------------|
| **Write** | Save info outside context window | Persist decisions across sessions |
| **Select** | Pull relevant info dynamically | Large codebases, specific tasks |
| **Compress** | Keep only essential tokens | Long conversations, complex tasks |
| **Isolate** | Split context across agents | Parallel work, specialized tasks |

## Demo Files

- `01-write-context.md` - CLAUDE.md patterns and external memory
- `02-select-context.md` - RAG, @-mentions, smart file selection
- `03-compress-context.md` - Summaries, handoffs, sliding windows
- `04-isolate-context.md` - Multi-agent patterns
- `tools-reference.md` - Context gathering tools and resources

## The Context Loading Decision Tree

```
Need context for AI task?
│
├── Is it reusable across sessions?
│   └── YES → Write to CLAUDE.md or docs
│
├── Is the codebase too large to load?
│   └── YES → Select specific files (@-mentions, RAG)
│
├── Is the conversation getting too long?
│   └── YES → Compress (summarize, handoff)
│
└── Are multiple specialists needed?
    └── YES → Isolate across agents
```

## Quick Reference

```
CONTEXT MANAGEMENT FORMULA
─────────────────────────────────────
Right context + Right amount + Right time = Better outputs
─────────────────────────────────────

CONTEXT CHECKLIST:
□ What context does this task need?
□ Does the AI have enough to understand?
□ Am I overloading with irrelevant info?
□ Should I save this for future sessions?
```

## Live Demo Flow

1. **Show the problem** - AI making mistakes without context
2. **Apply the right strategy** - Match strategy to situation
3. **Show the improvement** - Better outputs with proper context
