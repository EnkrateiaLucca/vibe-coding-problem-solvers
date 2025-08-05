# Context Management Strategies

## The Context Challenge

Managing context is like packing for a trip - bring too much and you're weighed down, too little and you're unprepared. The key is strategic selection and organization.

## Context Loading Patterns

### Pattern 1: Progressive Context Loading 📈

Start minimal and add context as needed:

```
Initial prompt:
"I need help with a React component"
↓
Add problem context:
"It's a data table that's rendering slowly"
↓
Add code context:
"Here's the component: [code]"
↓
Add performance context:
"It's rendering 10,000 rows without virtualization"
```

**Benefits:**
- Avoid overwhelming AI initially
- Get targeted responses
- Build shared understanding gradually

---

### Pattern 2: Context Prioritization 🎯

#### The Context Pyramid

```
        🔺 CRITICAL (Must Include)
       /  \  - Error messages
      /    \ - Specific code having issues
     /      \- Expected vs actual behavior
    /________\
   🔸 IMPORTANT (Usually Include)
   - Related code/dependencies
   - Tech stack details
   - Recent changes
  
 🔹 HELPFUL (Include if Relevant)
 - Project structure
 - Coding standards
 - Team preferences

⬜ OPTIONAL (Rarely Needed)
- Historical decisions
- Company info
- Future plans
```

#### Example: Debugging API Error

❌ **Poor Context Management:**
```
"My API isn't working. Here's my entire backend codebase:
[5000 lines of code including unrelated files]
Also, here's our company history and why we chose Node.js..."
```

✅ **Good Context Management:**
```
"API endpoint returning 500 error.

Error: Cannot read property 'id' of undefined
Endpoint: POST /api/users
Relevant code:

app.post('/api/users', async (req, res) => {
  const userId = req.user.id; // Error happens here
  // ...
});

Note: Authentication middleware should set req.user"
```

---

### Pattern 3: Context Refresh Strategy 🔄

When conversations get long, summarize and refocus:

#### The Refresh Template
```
"Let me summarize our progress:
✅ Completed: [What we've done]
🚧 Current: [What we're working on]
🎯 Next: [What we need to do]

Current blocker: [Specific issue]
[Focused question about the blocker]"
```

#### Example Refresh
```
"Summary of our debugging session:
✅ Completed: 
- Identified memory leak in user service
- Fixed improper connection pooling

🚧 Current: 
- Implementing connection retry logic

🎯 Next: 
- Add monitoring alerts

Current blocker: Retry logic causes infinite loops on auth failures.
How should we handle auth errors differently from network errors?"
```

---

## Context Formats

### Format 1: Structured Context Blocks

```markdown
## Environment
- Node.js 18.x
- PostgreSQL 14
- Running in Docker

## Problem
Users report slow page loads after login

## Code
```javascript
// Relevant authentication code
async function authenticateUser(email, password) {
  // ... 
}
```

## What I've Tried
1. Added database indexes - no improvement
2. Checked network latency - normal

## Question
What other bottlenecks should I investigate?
```

### Format 2: Inline Context Annotations

```javascript
// Context: This runs on every page load
async function checkUserPermissions(userId) {
  // ISSUE: This makes 5 separate DB queries
  const user = await db.users.findById(userId);
  const roles = await db.roles.findByUserId(userId);
  const permissions = await db.permissions.findByRoles(roles);
  // ... more queries
}
// Question: How can I optimize this to a single query?
```

### Format 3: Conversation Threading

```
[THREAD: Performance Optimization]

Previous: We identified N+1 query problem
Current: Implementing eager loading
Context: Using Sequelize ORM

New issue: Eager loading includes too much data
Code: User.findAll({ include: [{ all: true }] })
Need: Selective eager loading strategy
```

---

## Context Anti-Patterns to Avoid

### Anti-Pattern 1: The Code Dump 🚫
```
"Here's my entire repository. Find the bug."
[50 files pasted]
```

**Why it fails:** Too much noise, AI can't identify what's relevant

### Anti-Pattern 2: The Mystery Context 🚫
```
"The thing we discussed yesterday isn't working"
```

**Why it fails:** AI doesn't have conversation history

### Anti-Pattern 3: The Context Sandwich 🚫
```
[Important detail]
[200 lines of irrelevant code]
[Critical error message]
```

**Why it fails:** Important information gets buried

---

## Advanced Context Techniques

### Technique 1: Context Templates

Create reusable templates for common scenarios:

#### Bug Report Template
```yaml
Error: [Exact error message]
When: [What action triggers it]
Expected: [What should happen]
Actual: [What actually happens]
Code: [Minimal reproduction]
Environment: [Relevant versions]
```

#### Feature Request Template
```yaml
Goal: [What you want to achieve]
Current: [Existing implementation]
Constraints: [Technical limitations]
Stack: [Relevant technologies]
Example: [Desired outcome]
```

### Technique 2: Context Layering

Build context in layers, each adding detail:

```
Layer 1 (Problem): "React form validation not working"
Layer 2 (Specific): "Custom email validator always returns false"
Layer 3 (Code): [Validator function code]
Layer 4 (Debug): "Console shows regex.test is not a function"
Layer 5 (Root Cause): "Regex is string, not RegExp object"
```

### Technique 3: Context Tokens

Use markers to highlight important context:

```
[CRITICAL] Production server down
[CONTEXT] Node.js API, 10k requests/second
[ERROR] "EMFILE: too many open files"
[TRIED] Increased ulimit, no effect
[CODE] Server initialization below...
```

---

## Context Management by Task Type

### For Debugging
1. Error message (exact)
2. Code where error occurs
3. Steps to reproduce
4. What you've tried
5. Environment details

### For Code Review
1. Purpose of the code
2. Specific concerns
3. Performance requirements
4. Team coding standards
5. The code itself

### For Architecture Decisions
1. Business requirements
2. Technical constraints
3. Current system overview
4. Scaling needs
5. Team expertise

### For Learning
1. Your current knowledge level
2. Specific concept confusion
3. What you've already read
4. Practical application needs
5. Learning style preference

---

## Interactive Context Exercise

Practice identifying essential context:

### Scenario 1: Database Query Optimization
You have a slow query. What context do you include?

Essential:
- [ ] The slow query
- [ ] Execution plan
- [ ] Table schema
- [ ] Data volume
- [ ] Your favorite color
- [ ] Database version
- [ ] Index information
- [ ] Company mission statement

<details>
<summary>Answer</summary>
Essential: Slow query, execution plan, table schema, data volume, database version, index information
</details>

### Scenario 2: React Component Bug
Component crashes on certain input. What context matters?

Essential:
- [ ] Error message
- [ ] Component code
- [ ] Props that cause crash
- [ ] Parent component
- [ ] Entire app structure
- [ ] React version
- [ ] Browser console output
- [ ] Your lunch order

<details>
<summary>Answer</summary>
Essential: Error message, component code, props that cause crash, React version, browser console output
</details>

---

## Context Management Tools

### Browser Extensions
- **ChatGPT Context Manager**: Save/load context templates
- **Claude Context Helper**: Track token usage

### CLI Tools
```bash
# Context extraction tool
$ extract-context --file app.js --lines 45-67 --format markdown

# Context size checker
$ check-context-size prompt.md
> Tokens: 1,245
> Estimated cost: $0.02
```

### IDE Plugins
- VS Code: "AI Context Builder"
- IntelliJ: "Smart Context for AI"

---

## Best Practices Checklist

✅ **DO:**
- Start with minimal context
- Add progressively as needed
- Summarize long conversations
- Use clear structure/formatting
- Highlight critical information
- Remove redundant details
- Test with less context first

❌ **DON'T:**
- Dump entire codebases
- Include irrelevant details  
- Bury important information
- Assume AI remembers previous chats
- Mix multiple problems
- Use ambiguous references
- Forget to update stale context

---

## Context Efficiency Metrics

Track your context management improvement:

```
Metric: Context Efficiency Score
Formula: (Problem Solved / Context Tokens Used) × 100

Example:
- Week 1: 500 tokens to solve = Score: 0.2
- Week 4: 200 tokens to solve = Score: 0.5
- Improvement: 150% more efficient
```

Remember: The best context is just enough to solve the problem, no more, no less.