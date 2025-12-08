# Skill 6: Constraints

Set boundaries. The more you constrain, the more useful the output.

## Why Constraints Matter

Without constraints:
- AI might use wrong language/framework
- Code could be 500 lines when you need 20
- Output format may not match your needs
- Dependencies might conflict with your stack

---

## Types of Constraints

### 1. Language & Framework
```
Write this in Python 3.11+ using only standard library.
Do not use any external packages.
```

### 2. Code Length
```
Implement in under 50 lines of code.
Keep it simple and readable.
```

### 3. Dependencies
```
Allowed dependencies: React 18, TypeScript, Tailwind CSS
Do not use: jQuery, Bootstrap, any UI component libraries
```

### 4. Output Format
```
Return the response as JSON with this exact structure:
{
  "status": "success" | "error",
  "data": [...],
  "metadata": {"count": number}
}
```

### 5. Style Guidelines
```
Follow Google's Python style guide.
Use type hints for all function parameters.
Include docstrings for public functions only.
```

### 6. Performance
```
Solution must handle 1 million records efficiently.
Memory usage should stay under 500MB.
```

---

## The Constraint Stack

Layer constraints for precise results:

```
Write a user authentication function.

Constraints:
- Language: Python 3.11+
- Framework: FastAPI
- Max length: 100 lines
- Dependencies: bcrypt, python-jose (for JWT)
- Output: Return JWT token as string
- Security: Hash passwords, 24-hour token expiry
- Style: Type hints, one docstring for main function
- Do not include: Session management, password reset
```

---

## Common Constraint Patterns

### For Quick Scripts
```
Write a single-file Python script.
No classes, just functions.
Include if __name__ == "__main__" block.
Add minimal comments only where logic is complex.
```

### For Production Code
```
Follow our established patterns (attached).
Include unit tests.
Handle all error cases explicitly.
Log appropriately, no print statements.
Type hints required throughout.
```

### For Prototypes
```
Prioritize readability over optimization.
Inline comments explaining the approach.
Skip edge case handling for now.
Use simple data structures.
```

---

## Anti-Constraints (Negative Constraints)

Sometimes it's clearer to say what NOT to do:

```
Implement a caching solution.

DO NOT:
- Use Redis (we don't have it)
- Add new dependencies
- Change the existing API interface
- Store user data in cache

You CAN:
- Use in-memory caching
- Add TTL for cache entries
- Modify internal implementation
```

---

## Format Constraints

Specify exactly how you want the response:

### For Code
```
Provide only the code, no explanations.
Include necessary imports at the top.
Add a usage example as a comment at the bottom.
```

### For Explanations
```
Explain in 3 bullet points maximum.
Use plain language, no jargon.
Include one code example if helpful.
```

### For Reviews
```
Format your review as:
## Issues Found
- [Severity] Issue description

## Recommendations
- Suggestion with code example

## Summary
One paragraph assessment.
```

---

## Live Demo

Compare results:

**Unconstrained:**
```
Write code to send emails
```

**Constrained:**
```
Write a Python function to send emails.

Constraints:
- Use smtplib (standard library only)
- Max 30 lines of code
- Accept: recipient, subject, body as parameters
- Return: True on success, False on failure
- Handle: connection errors, auth failures
- Do not include: HTML templates, attachments, multiple recipients
- Configuration: Read SMTP settings from environment variables

Provide only the code, no explanations.
```

The constrained version produces exactly what you need,
ready to drop into your project.
