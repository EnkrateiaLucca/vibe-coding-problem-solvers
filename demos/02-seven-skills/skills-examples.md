# The 7 Vibe Coding Skills - Detailed Examples

## Skill 1: Prompting 🎯

### Definition
The ability to craft clear, specific instructions that effectively communicate intent to AI models.

### Sub-skills
1. **Clear & Direct** - Specific, unambiguous instructions
2. **Decomposition** - Breaking complex tasks into steps
3. **Examples** - Showing desired output format
4. **Role Assignment** - Defining AI's expertise context
5. **Time to Think** - Requesting reasoning process
6. **Output Constraints** - Specifying format and limits

### Examples

#### ❌ Bad Prompt
```
"Help me with my code"
```

#### ✅ Good Prompt
```
"Write a Python function that:
- Validates email addresses using regex
- Returns True/False
- Includes error handling for None/empty inputs
- Has docstring with examples
- Maximum 20 lines"
```

#### 🌟 Excellent Prompt (with role and examples)
```
"Act as a senior Python developer. Write a function to validate emails.

Requirements:
- Use regex pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
- Handle edge cases (None, empty string, non-string inputs)

Example usage:
validate_email("user@example.com") → True
validate_email("invalid.email") → False
validate_email(None) → False

Include type hints and a comprehensive docstring."
```

---

## Skill 2: Context Management 📚

### Definition
Strategic loading and organizing of information to provide AI with relevant context without overwhelming it.

### Techniques

#### 1. Progressive Context Loading
```
Initial: "Build me a dashboard app"
↓
Add context: "Here is a data sample (upload sample .csv)"
↓
Add specs: "Write it in plain html/js with these features X,Y,Z..."
↓
Add requirements: "The app should provide a dropdown to select the month for which to slide the data...."
```

---

## Skill 3: Capability Assignment 🎯

### Definition
Knowing what tasks to delegate to AI vs. what to handle yourself.

#### Good Delegation
```
"Generate a RESTful API with these endpoints:
- GET /users
- POST /users
- GET /users/:id
Use Express.js with TypeScript, include error handling"
```

#### Poor Delegation
```
"Design the entire system architecture for our banking application"
```

---

## Skill 4: Vibe Checking 🔍

### Definition
Lightweight verification techniques that are simpler than the original task.

### Vibe Check Techniques

#### 1. Quantity Checks
*Example (no code needed):*  
You asked AI to generate 100 quiz questions.  
**Vibe check:** Did you actually get about 100? If you count and see you got between 90 and 110, that's a pass!

#### 2. Format Validation
*Example (no code needed):*  
You asked AI to create a list of customer records.  
**Vibe check:** Does each record include the key details you expect, like "name" and "email"?  
Just scan a few items—if they all have the right fields, the format is probably correct!

#### 3. Smoke Tests
```bash
# AI generated build script
# Vibe check: Does it run without errors?
./build.sh --dry-run  # ✅ No errors
```

#### 4. Output Reasonableness
```
AI: "Processing 1TB will take 3 seconds"
Vibe check: That's impossibly fast ❌

AI: "Processing 1TB will take 2-3 hours"
Vibe check: Sounds reasonable ✅
```

### Red Flags Checklist
- [ ] Dramatic size differences (100KB → 100MB)
- [ ] Too-perfect patterns (every function exactly 10 lines)
- [ ] Missing error handling
- [ ] Overly complex solutions for simple problems
- [ ] Suspicious performance claims

---

## Skill 5: Strategic Cognitive Offloading 🧠

### Definition
Thoughtful delegation of cognitive tasks while maintaining critical thinking abilities.

### The 70-30 Rule

#### 70% AI-Assisted
- Boilerplate generation
- Documentation lookup
- Code formatting
- Initial prototypes
- Test scaffolding

#### 30% Independent
- Core algorithm design
- Architecture decisions
- Performance optimization
- Security review
- Learning new concepts

### Implementation Examples

#### Good Offloading
```
Human: Design the data flow architecture
AI: Generate the implementation based on my design
Human: Review and optimize critical paths
```

#### Poor Offloading
```
AI: Design and implement everything
Human: Copy-paste without understanding
```

### Weekly Practice Schedule
- **Monday-Thursday**: AI-assisted development
- **Friday**: "AI-free Friday" - code without assistance
- **Track**: Which tasks were harder without AI?

---

## Skill 6: Personal Benchmarking 📊

### Definition
Creating custom evaluation frameworks to measure AI collaboration effectiveness.

### Metrics Framework

#### 1. Velocity Metrics
```
Task: Implement user authentication
Without AI: 8 hours
With AI: 3 hours
Speedup: 2.67x
```

#### 2. Quality Metrics
```
Bug rate without AI: 2 bugs/100 lines
Bug rate with AI: 3 bugs/100 lines
Quality impact: -33% (needs improvement)
```

#### 3. Understanding Metrics
```
Can you explain the code? [1-5 scale]
Without AI: 5/5
With AI (no review): 2/5
With AI (with review): 4/5
```

### Personal Benchmark Template
```markdown
## Task: [Description]
Date: [Date]
AI Tool: [Tool used]

### Metrics
- Time taken: [X hours]
- Lines of code: [X]
- Tests written: [X]
- Bugs found: [X]
- Understanding level: [1-5]

### What worked well:
- [Point 1]
- [Point 2]

### What didn't work:
- [Point 1]
- [Point 2]

### Learnings:
- [Key insight]
```

---

## Skill 7: Agentic Task Orchestration 🤖

### Definition
Coordinating multiple AI agents working together autonomously on complex tasks.

### Orchestration Patterns

#### 1. Sequential Pipeline
```
Agent 1 (Codex): Scrape website data
    ↓
Agent 2 (Claude): Process and structure data
    ↓
Agent 3 (ChatGPT): Generate visualization
```

#### 2. Parallel Processing
```
Task: Build full-stack app
├── Agent 1: Frontend (React)
├── Agent 2: Backend (Node.js)
└── Agent 3: Database schema
     ↓
Human: Integration and review
```

#### 3. Specialized Agents
```
Architect Agent: "Design the system"
    ↓
Coder Agent: "Implement the design"
    ↓
Tester Agent: "Write tests"
    ↓
Reviewer Agent: "Code review"
```

### Example: Multi-Agent Workflow

```python
# Task: Create a data analysis pipeline

# Agent 1: Data Collection
codex_prompt = """
Write a Python script to:
1. Fetch data from API: https://api.example.com/data
2. Save as CSV with timestamp
3. Handle rate limits and errors
"""

# Agent 2: Data Processing
claude_prompt = """
Given this CSV data structure: [output from Agent 1]
Create a data processing pipeline that:
1. Cleans missing values
2. Normalizes numeric columns
3. Generates summary statistics
"""

# Agent 3: Visualization
chatgpt_prompt = """
Using the processed data: [output from Agent 2]
Create an interactive dashboard with:
1. Time series chart
2. Distribution plots
3. Correlation matrix
Use Plotly and save as HTML
"""

# Human: Review, integrate, and deploy
```

### Best Practices
1. **Clear handoffs** - Each agent's output feeds the next
2. **Defined scopes** - Each agent has specific responsibilities
3. **Error handling** - Plan for agent failures
4. **Human oversight** - Review at critical points
5. **Documentation** - Track what each agent did

---

## Skill Development Path

### Phase 1: Foundation (Weeks 1-2)
- Master Skills 1-2 (Prompting, Context)
- Daily practice with simple tasks
- Track success rates

### Phase 2: Expansion (Weeks 3-4)
- Add Skills 3-4 (Capability, Vibe Checking)
- Work on small projects
- Develop intuition

### Phase 3: Advanced (Weeks 5-8)
- Integrate Skills 5-7
- Complex multi-agent projects
- Personal benchmark development

### Phase 4: Mastery (Ongoing)
- Combine all skills fluidly
- Develop personal style
- Teach others