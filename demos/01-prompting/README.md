# Demo 01: Prompting Skills

The foundation of effective vibe coding. This demo covers the 6 prompting sub-skills that make the difference between frustrating AI interactions and productive collaboration.

## The 6 Prompting Sub-Skills

| Skill | Core Idea | When to Use |
|-------|-----------|-------------|
| **1. Clear & Direct** | Specific, unambiguous requests | Always - this is your baseline |
| **2. Decomposition** | Break complex tasks into steps | Multi-step features, large refactors |
| **3. Examples** | Show desired input/output | Data transformations, formatting |
| **4. Role Assignment** | Define AI expertise | Code reviews, specialized tasks |
| **5. Time to Think** | Request reasoning | Architecture decisions, debugging |
| **6. Constraints** | Set boundaries | Specific tech stack, code limits |

## Demo Files

- `01-clear-direct.md` - Vague vs specific prompts
- `02-decomposition.md` - Breaking down complex tasks
- `03-examples.md` - Using input/output pairs
- `04-role-assignment.md` - Expert personas
- `05-time-to-think.md` - Chain of thought prompts
- `06-constraints.md` - Boundaries and limitations

## Sample Code (samples/)

Runnable examples for hands-on practice:

- `buggy_calculator.py` - A script with the exact TypeError from the debugging example
- `data_processor.py` - The complete solution for the "Live Demo" exercise

### Try It

```bash
# See the bug in action
python demos/01-prompting/samples/buggy_calculator.py
# Enter a number when prompted - observe the TypeError

# Run the correct data processor
python demos/01-prompting/samples/data_processor.py
```

## Live Demo Flow

1. **Start with a bad prompt** - Show what happens with vague instructions
2. **Progressively improve** - Apply each sub-skill
3. **Compare outputs** - Show the dramatic difference

## Quick Reference Card

```
PROMPTING FORMULA
─────────────────────────────────────
Context + Task + Examples + Constraints + Format
─────────────────────────────────────

BEFORE PROMPTING, ASK:
□ Is this specific enough?
□ Should I break this down?
□ Would an example help?
□ Does it need specialized expertise?
□ Should I ask for reasoning?
□ What constraints should I set?
```
