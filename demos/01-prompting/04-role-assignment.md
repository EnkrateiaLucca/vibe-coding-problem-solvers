# Skill 4: Role Assignment

Give the AI a persona. The right role unlocks specialized knowledge and perspective.

## Why Roles Work

Roles activate different "modes" of response:
- More relevant details
- Appropriate tone
- Domain-specific considerations
- Professional standards

---

## Role Assignment Pattern

```
You are a [ROLE] with [EXPERIENCE/SPECIALIZATION].
[TASK]
Consider [RELEVANT FACTORS FOR THIS ROLE].
```

---

## Example Roles for Developers

### Code Review

**Generic:**
```
Review this SQL query for issues
```

**With Role:**
```
You are a senior database administrator with 15 years of experience
optimizing PostgreSQL for high-traffic e-commerce applications.

Review this SQL query for:
- Performance issues (indexes, query plan)
- Security vulnerabilities (injection, permissions)
- Scalability concerns (as data grows)
- Best practices violations

[Your SQL query here]
```

---

### Security Audit

**Generic:**
```
Check my code for security issues
```

**With Role:**
```
You are a penetration tester specializing in web application security.
Think like an attacker reviewing this authentication code.

Look for:
- OWASP Top 10 vulnerabilities
- Session management issues
- Input validation gaps
- Timing attacks
- Information disclosure

[Your auth code here]
```

---

### Architecture Design

**Generic:**
```
How should I structure my app?
```

**With Role:**
```
You are a software architect who has designed systems processing
millions of requests per day at companies like Netflix and Stripe.

Design the architecture for my real-time notification system:
- Expected load: 100k concurrent users
- Message delivery: < 500ms latency
- Features: push notifications, in-app alerts, email digests

Consider: scalability, fault tolerance, cost efficiency
```

---

### Documentation

**Generic:**
```
Write docs for this API
```

**With Role:**
```
You are a technical writer at Stripe, known for exceptional API documentation.
Your docs are famous for being clear, complete, and developer-friendly.

Document this API endpoint:
- Write for developers new to our platform
- Include authentication requirements
- Show curl examples and SDK code
- Document all error responses
- Add common use cases

[API endpoint details]
```

---

## Role Library

| Role | Best For |
|------|----------|
| Senior backend engineer | System design, debugging |
| Security researcher | Vulnerability analysis |
| Technical writer | Documentation, READMEs |
| QA engineer | Test cases, edge cases |
| DevOps specialist | CI/CD, infrastructure |
| Performance engineer | Optimization, profiling |
| UX developer | Accessibility, usability |
| Database expert | Query optimization, schema design |

---

## Combining Roles

For complex reviews, assign multiple perspectives:

```
Review this payment processing code from three perspectives:

1. As a security auditor: Check for vulnerabilities
2. As a performance engineer: Identify bottlenecks
3. As a maintainability expert: Assess code quality

Provide feedback from each perspective separately.
```

---

## Live Demo

Try both versions:

**Version 1:**
```
What's wrong with this function?

def get_user(id):
    query = f"SELECT * FROM users WHERE id = {id}"
    return db.execute(query)
```

**Version 2:**
```
You are a senior security engineer who has prevented
SQL injection attacks at major financial institutions.

Audit this function for security vulnerabilities
and provide a secure alternative:

def get_user(id):
    query = f"SELECT * FROM users WHERE id = {id}"
    return db.execute(query)
```

Notice how the role-assigned version provides more thorough,
professional-grade security analysis.
