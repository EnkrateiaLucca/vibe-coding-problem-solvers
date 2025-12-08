# Strategy 2: Select Context

Pull relevant information when needed. Don't dump everything—be surgical.

## The Problem

Large codebases have thousands of files. Loading everything:
- Exceeds context window limits
- Dilutes focus with irrelevant code
- Increases costs (more tokens)
- Confuses the AI with noise

---

## Selection Techniques

### 1. @-Mentions (Direct File References)

Most tools support @-mentions to pull specific files:

```
@src/auth/login.py @src/models/user.py

Add rate limiting to the login function.
Limit to 5 attempts per minute per IP.
```

Only the relevant files are loaded.

---

### 2. Semantic Search (RAG)

Let the system find relevant files based on your question:

```
Search: "how does password reset work"
→ Returns: auth/reset.py, services/email.py, templates/reset_email.html
```

Your prompt then uses only those retrieved files.

---

### 3. Strategic File Sets

Pre-define groups of files for common tasks:

```
# For working on auth:
/load auth_files
→ Loads: auth/, models/user.py, middleware/auth.py

# For working on API:
/load api_files
→ Loads: routes/, schemas/, controllers/
```

---

### 4. Codebase Indexing

Modern tools (Cursor, Claude Code) index your codebase:

```
"Find all files that import the User model"
"Show me where errors are caught in the payment flow"
"What files would be affected if I change the OrderStatus enum?"
```

The tool searches and loads only relevant files.

---

## When to Use Each Technique

| Need | Technique |
|------|-----------|
| Know exact files needed | @-mentions |
| Don't know which files | Semantic search |
| Frequent file combinations | Pre-defined sets |
| Exploring unfamiliar codebase | Indexing queries |

---

## Selection Patterns

### Pattern: Minimal Context First

Start with the least context possible:

```
Step 1: "What file handles user authentication?"
→ AI finds: src/auth/handler.py

Step 2: "@src/auth/handler.py Add 2FA support"
→ AI works with minimal, focused context
```

### Pattern: Related Files Discovery

```
"Show me the files related to @src/api/orders.py"
→ AI identifies: models/order.py, services/inventory.py, schemas/order.py

"Now @all_related_files add order cancellation"
```

### Pattern: Interface Boundaries

Load only the interfaces, not implementations:

```
"Load only the public interfaces from the payment module"
→ Gets: PaymentService interface, types, not internal logic

"Design a refund feature that works with these interfaces"
```

---

## Anti-Pattern: The Context Dump

**Don't do this:**
```
Load entire src/ folder (5000 files)
"Add a feature to..."
```

Results:
- Context overflow
- Slow responses
- AI confusion
- Inconsistent outputs

---

## Selection Checklist

Before prompting:

- [ ] What specific files does this task need?
- [ ] Can I start with fewer files?
- [ ] Am I loading files "just in case"?
- [ ] Would a search be more efficient?

---

## Live Demo

1. Try to modify code without loading files
2. AI hallucinates or makes wrong assumptions
3. Use @-mention to load specific file
4. Same task now works correctly
5. Show semantic search finding related files
