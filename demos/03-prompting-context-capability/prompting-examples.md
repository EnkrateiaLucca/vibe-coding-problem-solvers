# Prompting Examples - From Bad to Excellent

- Live Demo example chat: https://chatgpt.com/share/68922989-d834-8004-92fd-be9839089436

## The 6 Sub-Skills of Effective Prompting

### 1. Clear & Direct Instructions

#### ❌ Bad: Vague and Ambiguous
```
"Make it better"
"Fix the code"
"Help with JavaScript"
```

#### ✅ Good: Specific and Clear
```
"Refactor this function to use async/await instead of callbacks"
"Add error handling for network failures in the fetch call"
"Convert this JavaScript class to use TypeScript with proper types"
```

#### 🌟 Excellent: Precise with Context
```
"Refactor the getUserData function:
- Convert callback pattern to async/await
- Add try-catch for network errors
- Return null for 404 responses
- Throw for other HTTP errors
- Add TypeScript return type annotation"
```

---

### 2. Providing Examples

#### ❌ Bad: No Examples
```
"Format the data properly"
```

#### ✅ Good: With Example
```
"Format the user data like this:
{
  name: 'John Doe',
  email: 'john@example.com',
  joined: '2024-01-15'
}"
```

#### 🌟 Excellent: Multiple Examples with Edge Cases
```
"Transform user data to this format:

Input: {firstName: 'John', lastName: 'Doe', emailAddress: 'john@example.com', createdAt: 1705334400000}
Output: {name: 'John Doe', email: 'john@example.com', joined: '2024-01-15'}

Input: {firstName: 'Jane', emailAddress: 'jane@example.com', createdAt: 1705420800000}
Output: {name: 'Jane', email: 'jane@example.com', joined: '2024-01-16'}

Note: lastName might be missing, use firstName only in that case"
```

---

### 3. Task Decomposition

#### ❌ Bad: Everything at Once
```
"Build a complete user authentication system with login, signup, password reset, 
email verification, OAuth, role-based permissions, and admin dashboard"
```

#### ✅ Good: Broken Down
```
"Let's build user authentication step by step:
1. First, create the user registration endpoint
2. Add password hashing with bcrypt
3. Return JWT token on successful registration"
```

#### 🌟 Excellent: Hierarchical Decomposition
```
"Task: User Registration Endpoint

Main steps:
1. Input validation
   - Email format check
   - Password strength (min 8 chars, 1 number, 1 special)
   - Check duplicate emails

2. Password processing
   - Hash with bcrypt (rounds: 10)
   - Never store plain text

3. Database operation
   - Create user record
   - Handle unique constraint errors

4. Response
   - Return JWT token
   - Include user ID and email
   - Set appropriate HTTP status codes"
```

---

### 4. Role Assignment

#### ❌ Bad: No Role Context
```
"Write some Python code"
```

#### ✅ Good: Basic Role
```
"As a Python developer, write a data processing script"
```

#### 🌟 Excellent: Specific Expertise
```
"Act as a senior Python developer with expertise in data engineering and pandas. 
Write a data processing script that:
- Handles large CSV files (1GB+) efficiently
- Uses chunking to manage memory
- Implements proper error handling
- Follows PEP 8 style guidelines
- Includes performance considerations"
```

---

### 5. Chain of Thought Prompting

#### ❌ Bad: Direct Answer Only
```
"What's the time complexity of this algorithm?"
```

#### ✅ Good: Request Reasoning
```
"Analyze the time complexity of this algorithm. Explain your reasoning step by step."
```

#### 🌟 Excellent: Structured Thinking
```
"Analyze this sorting algorithm:

1. First, identify the algorithm type
2. Walk through one iteration with example data
3. Count the operations in nested loops
4. Derive the Big-O notation
5. Explain best, average, and worst cases
6. Suggest optimizations if possible

Show your work for each step."
```

---

### 6. Output Constraints

#### ❌ Bad: No Constraints
```
"Write a function to validate emails"
```

#### ✅ Good: Basic Constraints
```
"Write a function to validate emails. Keep it under 20 lines."
```

#### 🌟 Excellent: Comprehensive Constraints
```
"Write an email validation function with these constraints:
- Language: Python 3.8+
- Max 15 lines (excluding comments)
- Use only standard library (no regex module)
- Return tuple: (is_valid: bool, error_message: str | None)
- Handle these cases:
  - None/empty input
  - Missing @ symbol
  - Multiple @ symbols
  - Invalid domain format
- Include docstring with examples
- Follow Google Python Style Guide"
```

---

## Real-World Prompting Patterns

### Pattern 1: The Context-First Prompt
```
"Context: I'm building a React Native app for iOS and Android that tracks user fitness goals.
Current stack: Expo, Redux Toolkit, React Navigation 6.

Task: Create a custom hook for managing workout timers that:
- Supports pause/resume
- Persists state when app backgrounds
- Syncs across screens
- Handles iOS/Android differences"
```

### Pattern 2: The Iterative Refinement Prompt
```
"I need a color palette generator. Start simple:

v1: Function that returns 5 random hex colors
v2: Add support for color harmony rules (complementary, triadic)
v3: Ensure sufficient contrast between colors
v4: Add ability to lock certain colors and regenerate others"
```

### Pattern 3: The Debugging Assistant Prompt
```
"I'm getting this error: [paste error]

Here's my code: [paste relevant code]

Please:
1. Explain what's causing the error
2. Show the exact fix
3. Explain why the fix works
4. Suggest how to prevent similar issues"
```

### Pattern 4: The Code Review Prompt
```
"Review this function for:
- Performance issues
- Security vulnerabilities  
- Code style (we follow Airbnb guide)
- Edge cases I might have missed
- Suggestions for better naming

Function: [paste code]

Format your response as:
1. Critical issues (must fix)
2. Recommendations (should consider)
3. Nice-to-haves (could improve)"
```

---

## Prompting for Different AI Models

### Claude (Anthropic)
- Excels with nuanced, complex tasks
- Appreciates detailed context
- Good with ethical considerations

```
"I need to process user data while respecting privacy. Consider GDPR compliance 
and data minimization principles. Here's what I need to do: [task details]"
```

### GPT-4 (OpenAI)
- Strong with creative solutions
- Good at following structured formats
- Handles multiple requirements well

```
"Create a solution that satisfies these requirements:
□ Requirement 1
□ Requirement 2
□ Requirement 3
Format the output as: [specific format]"
```

### Specialized Models
- Code-specific models like Codex
- Often prefer concise, direct prompts

```
"// Function to merge two sorted arrays in O(n) time
// Input: arr1 = [1,3,5], arr2 = [2,4,6]
// Output: [1,2,3,4,5,6]
function mergeSortedArrays"
```

---

## Common Prompting Mistakes

### 1. The Kitchen Sink
❌ **Problem**: Including everything possibly relevant
```
"I need help with React. I'm using version 18.2.0 with Next.js 13.4.1 on 
macOS Ventura 13.4 with Node 18.16.0 and npm 9.5.1 and VS Code 1.79.2..."
```

✅ **Solution**: Include only what's relevant to the specific problem

### 2. The Mind Reader
❌ **Problem**: Assuming AI knows your context
```
"Fix the bug in the login function"
```

✅ **Solution**: Provide the actual code and describe the bug

### 3. The Novel
❌ **Problem**: Extremely long, rambling prompts
```
"So I was thinking about building this app and I thought it would be cool if...
[500 words later]... so can you help?"
```

✅ **Solution**: Be concise, use bullet points, structure your request

### 4. The Perfectionist
❌ **Problem**: Over-constraining to the point of impossibility
```
"Write a function that: handles every possible edge case, runs in O(1) time, 
uses no memory, works in all languages, is 5 lines max, and solves P=NP"
```

✅ **Solution**: Be realistic with constraints

---

## Prompt Templates

### Template 1: Feature Implementation
```
Role: [Specific expertise needed]
Context: [Current stack/environment]
Task: Implement [feature name] that:
- Requirement 1
- Requirement 2
- Requirement 3
Constraints:
- [Technical constraints]
- [Style guidelines]
Output: [Expected format]
```

### Template 2: Bug Fixing
```
Error: [Paste exact error message]
Code: [Paste relevant code with line numbers]
Expected: [What should happen]
Actual: [What's happening]
Tried: [What you've already attempted]
Need: [Specific help needed]
```

### Template 3: Code Generation
```
Language: [Programming language]
Purpose: [What the code should do]
Input: [Example input with type]
Output: [Example output with type]
Edge cases: [List important edge cases]
Style: [Coding standards to follow]
```

### Template 4: Learning/Explanation
```
Explain [concept] as if I'm a [experience level] developer.
Include:
1. Simple definition
2. Why it matters
3. Basic example
4. Common use case
5. Potential pitfalls
Keep it under [X] words.
```

---

## Advanced Prompting Techniques

### Technique 1: Few-Shot Learning
Provide multiple examples to establish a pattern:

```
Convert these function names to our naming convention:

getUserData -> fetch_user_data
calculateTotal -> calculate_total
parseJSON -> parse_json

Now convert: authenticateUser
```

### Technique 2: Self-Consistency
Ask for multiple approaches:

```
"Provide 3 different ways to implement user authentication:
1. Simple approach for MVP
2. Scalable approach for growth
3. Enterprise approach with all features

Compare pros/cons of each."
```

### Technique 3: Prompt Chaining
Build complex solutions step by step:

```
Step 1: "Design the database schema for a blog system"
Step 2: "Based on that schema, create the SQL migrations"
Step 3: "Now create the ORM models for this schema"
Step 4: "Generate the REST API endpoints"
```

---

## Practice Exercises

1. **Transform This Prompt**
   Bad: "Make a todo app"
   Your version: ________________

2. **Add Constraints**
   Base: "Sort an array"
   Your constrained version: ________________

3. **Create a Role**
   Task: "Optimize database queries"
   Your role assignment: ________________

Remember: The quality of AI output is directly proportional to the quality of your prompts!