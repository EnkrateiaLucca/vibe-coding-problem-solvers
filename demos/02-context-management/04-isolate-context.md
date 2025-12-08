# Strategy 4: Isolate Context

Split context across different agents. Each agent gets focused context.

## The Problem

Some tasks are too large for one context window:
- Full-stack features spanning frontend, backend, database
- Large refactors touching many files
- Multiple specialized concerns (security, performance, UX)

Solution: Divide and conquer with multiple agents.

---

## Multi-Agent Patterns

### Pattern 1: Specialist Agents

Each agent focuses on one domain:

```
ORCHESTRATOR:
"We're adding a checkout feature. Coordinate these agents:"

AGENT 1 (Backend):
Context: API routes, database models, business logic
Task: "Create checkout API endpoints"

AGENT 2 (Frontend):
Context: React components, state management
Task: "Build checkout UI flow"

AGENT 3 (Tests):
Context: Test files, fixtures
Task: "Write E2E tests for checkout"
```

---

### Pattern 2: Parallel Workers

Same task type, different files:

```
ORCHESTRATOR:
"Refactor all services to use the new error handling pattern"

AGENT 1: Handles auth/, user/ services
AGENT 2: Handles payment/, billing/ services
AGENT 3: Handles notification/, email/ services

Each agent has full context window for their files.
```

---

### Pattern 3: Reviewer Agent

Separate agent validates outputs:

```
DEVELOPER AGENT:
Context: Feature requirements, existing code
Task: "Implement the feature"
Output: New code

REVIEWER AGENT:
Context: Code standards, security guidelines
Task: "Review the generated code for issues"
Output: Review feedback

DEVELOPER AGENT:
"Apply this feedback: [review results]"
```

---

### Pattern 4: Research + Implementation

```
RESEARCH AGENT:
Context: Documentation, web search
Task: "Research best practices for rate limiting"
Output: Summary of approaches with pros/cons

IMPLEMENTATION AGENT:
Context: Our codebase + research summary
Task: "Implement rate limiting using the recommended approach"
```

---

## When to Isolate

| Situation | Isolate? | Why |
|-----------|----------|-----|
| Full-stack feature | Yes | Different domains |
| Large codebase refactor | Yes | Too many files |
| Learning + implementing | Yes | Separate concerns |
| Simple bug fix | No | Overhead not worth it |
| Single-file change | No | One agent sufficient |

---

## Communication Between Agents

Agents communicate through artifacts:

```
AGENT 1 → writes → api_spec.yaml
AGENT 2 → reads → api_spec.yaml → implements frontend

AGENT 1 → writes → shared_types.ts
AGENT 2 → imports → shared_types.ts
AGENT 3 → imports → shared_types.ts
```

---

## Orchestration Prompt

```
You are the orchestrator for this feature development.

TASK: Add user notification preferences

AGENTS TO COORDINATE:
1. Database Agent: Design schema, create migration
2. Backend Agent: Build API endpoints
3. Frontend Agent: Create settings UI
4. Test Agent: Write integration tests

EXECUTION ORDER:
1. Database Agent first (others depend on schema)
2. Backend Agent second (frontend needs API)
3. Frontend and Test Agents in parallel

COORDINATION POINTS:
- After database: Share schema with all agents
- After backend: Share API contract with frontend
- After all: Test agent validates everything

Begin by instructing the Database Agent.
```

---

## Trade-offs

| Benefit | Cost |
|---------|------|
| Full context per agent | Coordination overhead |
| Parallel execution | Potential conflicts |
| Specialized focus | Synchronization needed |
| Clean separation | Interface definitions required |

---

## Practical Example: Building a Feature

**Without Isolation (One Agent):**
```
Context: 50 files loaded
Problem: Context overflow, slow, confused responses
```

**With Isolation (Multiple Agents):**
```
Backend Agent: 10 relevant backend files
Frontend Agent: 10 relevant frontend files
Test Agent: 5 test files + specs

Each agent: Fast, focused, accurate
Orchestrator: Coordinates handoffs
```

---

## Live Demo

1. Try building full-stack feature with one agent
2. See context overflow and confusion
3. Split into specialized agents
4. Show each agent working efficiently
5. Demonstrate coordination through shared artifacts
