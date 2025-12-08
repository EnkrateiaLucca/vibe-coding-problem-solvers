# Skill 5: Time to Think

Ask the AI to reason before answering. Reduces errors on complex problems.

## The Problem with Quick Answers

AI can rush to conclusions, especially on:
- Multi-step problems
- Trade-off decisions
- Debugging complex issues
- Architecture choices

Solution: Explicitly ask for reasoning first.

---

## Magic Phrases

These phrases trigger deeper analysis:

- "Think step by step"
- "Before answering, consider..."
- "Walk through your reasoning"
- "Explain your approach first"
- "List the options and trade-offs before recommending"
- "What assumptions are you making?"

---

## Example: Algorithm Selection

**Rushed:**
```
Which sorting algorithm should I use?
```
Result: Generic "it depends" or just "use quicksort"

**With Thinking Time:**
```
I need to sort a list of 10,000 integers that are mostly sorted
(~90% in order). Memory is limited to 100KB extra.

Think step by step about which sorting algorithm is best:
1. What are the options for nearly-sorted data?
2. What are the time complexities for each?
3. How does the memory constraint affect choices?
4. What's the best fit for my specific case?

Then give your recommendation with reasoning.
```

---

## Example: Debugging

**Rushed:**
```
Why isn't my function working?
```

**With Thinking Time:**
```
My function should return the average of a list, but returns None.

Before suggesting a fix, analyze the code step by step:
1. Trace through the execution path
2. Identify where the logic breaks
3. Explain why the current code fails
4. Then provide the corrected version

def average(numbers):
    total = 0
    for n in numbers:
        total + n
    return total / len(numbers)
```

---

## Example: Architecture Decision

**Rushed:**
```
Should I use microservices?
```

**With Thinking Time:**
```
I'm building a B2B SaaS product for invoice processing.
Expected: 1000 users, 50k invoices/month initially.
Team: 3 developers, no DevOps specialist.

Before recommending an architecture:

1. List the pros of microservices for this use case
2. List the cons and operational overhead
3. Consider the team size and expertise
4. Think about the growth trajectory
5. Consider a monolith-first approach

Then give your recommendation with clear reasoning
for why it fits THIS specific situation.
```

---

## The "Before You Answer" Pattern

Structure prompts to force pre-analysis:

```
[Context/Problem]

Before you answer:
- [ ] Consider alternative approaches
- [ ] Identify potential pitfalls
- [ ] Think about edge cases
- [ ] Evaluate trade-offs

Then provide your recommendation.
```

---

## When to Use This

| Situation | Use Thinking Time? |
|-----------|-------------------|
| Simple code generation | No |
| Debugging | Yes |
| Architecture decisions | Always |
| Algorithm selection | Yes |
| Trade-off evaluation | Always |
| Code review | Yes |
| Straightforward formatting | No |

---

## Live Demo

Compare these two approaches for the same problem:

**Quick:**
```
How should I store user sessions?
```

**With Thinking:**
```
I need to implement user sessions for a web app.
Expected: 10,000 daily active users.
Requirements: Session timeout after 30 min of inactivity.

Think through these options step by step:
1. Cookie-based sessions
2. Server-side sessions with Redis
3. JWT tokens
4. Database-stored sessions

For each option, consider:
- Security implications
- Scalability
- Implementation complexity
- My specific requirements

Then recommend the best approach with reasoning.
```

The second approach produces a thoughtful, contextual recommendation
rather than a generic overview.
