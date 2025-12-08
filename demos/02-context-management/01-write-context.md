# Strategy 1: Write Context

Save information outside the context window. Create external memory that persists.

## The Problem

Every new conversation starts fresh. You waste time re-explaining:
- Project structure
- Coding conventions
- Personal preferences
- Key decisions made
- File locations

---

## The Solution: CLAUDE.md / AGENTS.md

Create a markdown file that loads automatically with every conversation.

### Example CLAUDE.md Structure

```markdown
# Project: Invoice Processing API

## Tech Stack
- Python 3.11 with FastAPI
- PostgreSQL 15 for storage
- Redis for caching
- Docker for deployment

## Code Conventions
- Use type hints everywhere
- Docstrings for public functions only
- Tests in `tests/` mirror `src/` structure
- Naming: snake_case for functions, PascalCase for classes

## Key Decisions
- We use JWT for auth (not sessions) - see ADR-001
- All dates in UTC, convert in frontend
- Soft deletes for invoices (never hard delete)

## File Locations
- API routes: src/api/routes/
- Business logic: src/services/
- Database models: src/models/
- Config: src/config.py

## Common Commands
- Run tests: `pytest -v`
- Start dev server: `uvicorn src.main:app --reload`
- Run migrations: `alembic upgrade head`
```

---

## Personal CLAUDE.md (Global)

Store personal context that applies to all projects:

```markdown
# ~/CLAUDE.md

## My Preferences
- I prefer functional over OOP when possible
- Always add error handling upfront
- I like verbose logging during development

## My Environment
- macOS, VS Code, iTerm2
- Projects live in: ~/projects/
- Snippets in: ~/Library/Application Support/Cursor/User/snippets/

## Paths I Use Often
- Courses: ~/Desktop/projects/oreilly-live-trainings/
- Personal: ~/Desktop/projects/personal/
- Work: ~/work/

## Shortcuts
- `transcribe file.mp4` - My video transcription tool
- `serve` - Alias for python -m http.server 8000
```

---

## Decision Logs (ADRs)

For important decisions, write Architecture Decision Records:

```markdown
# ADR-001: JWT vs Session Authentication

## Context
Need to authenticate API users. Team debated JWT vs server sessions.

## Decision
Using JWT tokens because:
- Stateless API (easier to scale)
- Mobile apps need tokens anyway
- Team has JWT experience

## Consequences
- Need to handle token refresh
- Cannot invalidate individual tokens easily
- Token storage security is client's responsibility

## Date: 2025-01-15
```

---

## When to Write Context

| Situation | Write It? |
|-----------|-----------|
| Made an architectural decision | Yes |
| Established a convention | Yes |
| Found a non-obvious solution | Yes |
| Explained project structure | Yes |
| Debugging a one-time issue | No |
| Quick prototype | No |

---

## The "Update CLAUDE.md" Habit

After every significant session:

1. What did I explain repeatedly?
2. What decisions did we make?
3. What conventions did we establish?
4. What file locations were important?

Add answers to CLAUDE.md. Future you will thank present you.

---

## Live Demo

1. Start a new conversation without CLAUDE.md
2. Try to work on project code - notice context missing
3. Create CLAUDE.md with key info
4. Start fresh conversation - see how context is automatically available
5. Make a change, update CLAUDE.md
