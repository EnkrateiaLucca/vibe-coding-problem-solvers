# Demo 4: Practicing Basic Vibe Coding Skills

## Overview

This demo focuses on Skill #4: Vibe Checking - the art of lightweight verification without over-engineering. Learn to quickly validate AI outputs while maintaining development velocity.

## Learning Objectives

- Understand what vibe checking is and isn't
- Recognize green flags vs red flags in AI output
- Develop intuition for when quick checks are sufficient
- Practice rapid validation techniques

## Files in This Demo

1. **vibe-checking-checklist.md** - Comprehensive checklist for different scenarios
2. **practice-scenarios.md** - Real-world examples to practice vibe checking

## The Vibe Checking Philosophy

> "Vibe checking is about finding the sweet spot between reckless acceptance and paralyzed perfectionism"

### Key Principles

1. **Simpler than the task** - The check should be easier than writing the code
2. **Good enough validation** - Not perfect, but catches major issues
3. **Speed matters** - Quick checks that don't break flow
4. **Pattern recognition** - Develop intuition over time

## Demo Flow

1. Show example of over-checking (traditional QA approach)
2. Show example of no checking (dangerous)
3. Demonstrate vibe checking (balanced approach)
4. Practice with audience on real examples
5. Build personal vibe checking intuition

## Common Vibe Checks

### Quantity Checks
- "Did it generate roughly the right amount?"
- "Are all requested items present?"

### Smoke Tests
- "Does it run without errors?"
- "Do basic operations work?"

### Sanity Checks
- "Do the numbers seem reasonable?"
- "Is the structure what I expected?"

### Pattern Matching
- "Does this look like typical code?"
- "Any obvious anti-patterns?"

## When Vibe Checking Isn't Enough

- Security-critical code
- Financial calculations
- Core business logic
- Production deployments
- API integrations

Remember: Vibe checking is for rapid development and prototyping, not for production-critical systems.