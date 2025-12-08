# Skill 1: Clear & Direct

The foundation of effective prompting. Every vague word is a decision the AI makes for you.

## Bad vs Good Examples

### Example 1: Code Generation

**Vague:**
```
Can you help me with my code?
```

**Clear & Direct:**
```
Write a Python function that validates email addresses using regex.
The function should:
- Accept a string parameter
- Return True for valid emails, False for invalid
- Handle edge cases (empty string, None)
- Include basic error handling
```

---

### Example 2: Debugging

**Vague:**
```
My code isn't working, can you fix it?
```

**Clear & Direct:**
```
My Python function raises TypeError when processing user input.

Error: TypeError: unsupported operand type(s) for +: 'int' and 'str'
Line: total = count + user_input

Expected behavior: Add numeric user input to running total
Current behavior: Crashes when user_input is a string

Fix the type conversion issue while preserving error handling.
```

---

### Example 3: Feature Implementation

**Vague:**
```
Add search to my app
```

**Clear & Direct:**
```
Add a search feature to my React todo app that:
- Filters todos by title (case-insensitive)
- Updates results as user types (debounced 300ms)
- Shows "No results" when nothing matches
- Clears search when X button is clicked

The todo items are stored in state as:
[{id: number, title: string, completed: boolean}]
```

---

## The Specificity Checklist

Ask yourself before sending any prompt:

- [ ] **What** exactly do I want? (Not "help with code" but "validate email function")
- [ ] **How** should it work? (Return type, behavior, handling)
- [ ] **Where** does it apply? (Language, framework, file location)
- [ ] **Why** context matters? (Only if it affects the solution)

## Live Demo

Try this in your preferred AI tool:

1. Start with: "Write a function to process data"
2. Then try: "Write a Python function that takes a list of dictionaries containing 'name' and 'age' keys, filters out entries where age is under 18, and returns a new list sorted by name alphabetically"

Notice how the second prompt eliminates ambiguity and produces exactly what you need on the first try.
