# The 12 Vibe Coding Patterns - Complete Reference

## Pattern 1: Start with Prototypes 🎯

### Core Concept
Fuzzy Instruction → Prototype → Refine

### When to Use
- Beginning any new project
- Unclear requirements
- Exploring possibilities
- Need to see something working quickly

### Implementation

#### Step 1: Fuzzy Instruction
```
"Create a dashboard for tracking user engagement"
```

#### Step 2: Prototype Generation
AI creates basic working version with assumptions

#### Step 3: Refinement
```
"Good start! Now add:
- Real-time data updates
- Mobile responsive design
- Export functionality"
```

### Real Example
```
Initial: "Build a todo app"
↓
Prototype: Basic HTML todo with add/delete
↓
Refine: "Add priorities, due dates, and categories"
↓
Final: Full-featured task manager
```

### Best Practices
- Start with the simplest possible version
- Test immediately after each iteration
- Don't specify everything upfront
- Let the prototype guide refinement

---

## Pattern 2: Vibe Checking Checklist 🧪

### Core Concept
LLM Output → Quick Check → Custom Validation

### When to Use
- After every AI generation
- Before committing code
- When something feels "off"
- Rapid quality control

### Implementation

#### Universal Vibe Check
```
□ Does it run without errors?
□ Are the results roughly expected?
□ Any obvious red flags?
□ Would I be comfortable sharing this?
```

#### Code-Specific Checks
```
□ Syntax is valid
□ Basic functionality works
□ No obvious security issues
□ File sizes reasonable
□ Dependencies make sense
```

### Real Example
```
AI generates API endpoint
↓
Quick checks:
✓ Returns valid JSON
✓ Handles basic errors
✓ Authentication included
⚠️ No input validation
↓
Decision: Fix validation before using
```

### Custom Checklists
Create project-specific vibe checks:
```
For React Components:
□ Props are typed
□ Handles loading states
□ No memory leaks
□ Accessible markup
```

---

## Pattern 3: Provide Clear Specs 📝

### Core Concept
Prompt for Spec → LLM Feedback → Refined Spec

### When to Use
- Complex projects with many requirements
- Team collaboration needed
- Stakeholder alignment required
- Reducing back-and-forth iterations

### Implementation

#### Step 1: Request Specification
```
"Help me create a detailed spec for a user authentication system. 
Include all necessary components, security considerations, and user flows."
```

#### Step 2: Review and Refine
```
"Great spec! Please also include:
- Password reset flow
- Rate limiting details
- Mobile app considerations
- GDPR compliance"
```

#### Step 3: Use Spec for Implementation
```
"Based on the spec we created, implement the user registration endpoint first."
```

### Real Example
```
Project: E-commerce checkout
↓
Spec Generation: Payment flows, validation, error handling
↓
Stakeholder Review: Add guest checkout, multiple payment methods
↓
Implementation: Clear requirements guide development
```

---

## Pattern 4: Restart When Stuck 🔄

### Core Concept
Clear Context → Transfer Relevant Context → Re-prompt

### When to Use
- Long conversations getting circular
- AI making repeated mistakes
- Quality degrading over time
- Context has become messy

### Implementation

#### Step 1: Identify the Stuck Point
```
"We've been going in circles on this authentication bug.
Let me start fresh with a focused approach."
```

#### Step 2: Context Transfer
```
"I'm working on a Node.js API with JWT authentication.
Current issue: Token validation fails intermittently.
Error: 'JsonWebTokenError: invalid signature'
Here's the relevant code: [paste only relevant parts]"
```

#### Step 3: Fresh Perspective
New conversation with focused context gets better results

### Real Example
```
Long debugging session → 15 failed attempts
↓
Restart with clean context
↓
Problem solved in 3 exchanges
```

### Context Transfer Template
```
"Fresh start: I need help with [specific problem].
Context:
- Tech stack: [relevant tools]
- Problem: [exact issue]
- What I tried: [key attempts]
- Current code: [minimal reproduction]"
```

---

## Pattern 5: Let It See What You See 🖥️

### Core Concept
Share Screenshots, Errors, and Context Visually

### When to Use
- UI/design problems
- Complex error messages
- Visual bugs
- Explaining layouts or flows

### Implementation

#### For Errors
```
"Getting this error when deploying:
[paste full error message]

Here's my deployment config:
[paste relevant config]

What's causing this?"
```

#### For UI Issues
```
"The mobile layout looks broken. Here's a screenshot: [image]
Expected: Sidebar should collapse into hamburger menu
Actual: Sidebar overlaps content"
```

#### For Code Issues
```
"This function isn't working as expected:

[paste code with line numbers]

Expected output: [example]
Actual output: [example]"
```

### Visual Context Types
- Screenshots of UI issues
- Error messages (full context)
- Network tab outputs
- Console logs
- Database query results
- API response examples

---

## Pattern 6: Automate Repeatable Steps 🔁

### Core Concept
Identify Repetition → Create Script → Reuse with Variations

### When to Use
- Doing the same task multiple times
- Complex multi-step processes
- Error-prone manual processes
- Time-consuming routine tasks

### Implementation

#### Step 1: Identify Pattern
```
"I keep having to:
1. Create React component
2. Add TypeScript types
3. Write basic tests
4. Update index file
Can we automate this?"
```

#### Step 2: Create Script
```python
# Component generator script
import os
import sys

def create_component(name):
    component_dir = f"src/components/{name}"
    os.makedirs(component_dir, exist_ok=True)
    
    # Generate component file
    component_code = f"""
import React from 'react';
import {{ {name}Props }} from './{name}.types';

const {name}: React.FC<{name}Props> = ({{ }}) => {{
  return (
    <div className="{name.lower()}">
      {name} Component
    </div>
  );
}};

export default {name};
"""
    # ... rest of generation logic
```

#### Step 3: Parameterize and Reuse
```bash
python create-component.py UserProfile
python create-component.py ProductCard
python create-component.py CheckoutForm
```

### Automation Opportunities
- Code generation (components, APIs, tests)
- Data processing pipelines
- Deployment scripts
- Documentation generation
- File organization

---

## Pattern 7: Build Personal Benchmarks 📈

### Core Concept
Track Failed Outputs → Create Test Cases → Retest with New Models

### When to Use
- AI keeps failing on specific tasks
- Want to measure improvement over time
- Testing new models/approaches
- Building confidence in AI capabilities

### Implementation

#### Step 1: Document Failures
```markdown
## Benchmark: SQL Query Generation

### Test Case 1: Complex Joins
**Prompt:** "Create a query to find users with their most recent order and total spent"
**Expected:** Proper LEFT JOIN with subqueries
**AI Output:** Incorrect GROUP BY, missing edge cases
**Status:** ❌ Failed
**Date:** 2024-08-05
**Model:** GPT-4
```

#### Step 2: Create Reusable Tests
```json
{
  "benchmark_name": "SQL Query Generation",
  "test_cases": [
    {
      "id": "complex_joins",
      "prompt": "Create a query to find users with their most recent order and total spent",
      "expected_patterns": ["LEFT JOIN", "subquery", "GROUP BY user"],
      "avoid_patterns": ["CROSS JOIN", "missing WHERE"],
      "success_criteria": ["query executes", "returns correct results", "handles edge cases"]
    }
  ]
}
```

#### Step 3: Regular Retesting
```
Monthly benchmark runs:
- Test same prompts with new models
- Track improvement rates
- Identify persistent failure patterns
- Adjust prompting strategies
```

### Benchmark Categories
- Code generation quality
- Problem-solving accuracy
- Context retention
- Edge case handling
- Performance characteristics

---

## Pattern 8: Store Formatting Prompts 🔗

### Core Concept
Save Transformation Patterns → Create Prompt Library → Reuse with Shortcuts

### When to Use
- Frequently converting between formats
- Consistent styling needed
- Complex transformations
- Team collaboration

### Implementation

#### Step 1: Identify Reusable Transformations
```
Common transformations:
- JSON to TypeScript interfaces
- CSV to markdown tables
- API docs to test cases
- User stories to acceptance criteria
```

#### Step 2: Create Prompt Templates
```yaml
json_to_typescript:
  prompt: |
    Convert this JSON to TypeScript interface:
    
    {input}
    
    Requirements:
    - Use proper TypeScript syntax
    - Handle optional fields with ?
    - Add JSDoc comments
    - Export the interface
  
csv_to_markdown:
  prompt: |
    Convert this CSV data to a markdown table:
    
    {input}
    
    Requirements:
    - Proper markdown table syntax
    - Align columns nicely
    - Add header separators
```

#### Step 3: Create Shortcuts/Aliases
```bash
# Shell aliases
alias json2ts="ai-prompt json_to_typescript"
alias csv2md="ai-prompt csv_to_markdown"

# VS Code snippets
{
  "ai-json-to-ts": {
    "prefix": "j2ts",
    "body": [
      "Convert this JSON to TypeScript interface:",
      "$CLIPBOARD",
      "",
      "Requirements:",
      "- Use proper TypeScript syntax",
      "- Handle optional fields with ?",
      "- Add JSDoc comments"
    ]
  }
}
```

### Prompt Library Organization
```
prompts/
├── data-transformation/
│   ├── json-to-typescript.md
│   ├── csv-to-markdown.md
│   └── api-to-openapi.md
├── code-generation/
│   ├── react-component.md
│   ├── api-endpoint.md
│   └── database-schema.md
└── documentation/
    ├── code-to-docs.md
    └── readme-generator.md
```

---

## Pattern 9: Generate Synthetic Data 📊

### Core Concept
Complex Analysis → Generate Sample Data → Test → Apply to Real Data

### When to Use
- Testing data processing logic
- Prototyping with realistic data
- Learning new analysis techniques
- No access to real data yet

### Implementation

#### Step 1: Define Data Requirements
```
"Generate sample e-commerce data with:
- 1000 customers (realistic names, emails, demographics)
- 5000 orders (realistic dates, amounts, products)
- 50 products (categories, prices, descriptions)
- Include edge cases: refunds, bulk orders, seasonal patterns"
```

#### Step 2: Generate and Validate
```python
# AI generates this sample data
customers = [
    {"id": 1, "name": "Sarah Johnson", "email": "sarah.j@email.com", "age": 32, "city": "Seattle"},
    {"id": 2, "name": "Mike Chen", "email": "m.chen@email.com", "age": 28, "city": "San Francisco"},
    # ... 998 more realistic entries
]
```

#### Step 3: Test Logic with Synthetic Data
```
"Using this sample data, create a customer segmentation analysis:
- RFM scoring (Recency, Frequency, Monetary)
- Customer lifetime value prediction
- Churn risk assessment"
```

#### Step 4: Apply to Real Data
Once logic is proven with synthetic data, apply to production

### Synthetic Data Types
- User profiles and behavior
- Financial transactions
- IoT sensor readings
- Survey responses
- Log files and events
- Social media posts
- Product catalogs

---

## Pattern 10: Voice Workflows 🗣️

### Core Concept
Long/Complex Instructions → Voice Recording → Transcription → AI Processing

### When to Use
- Complex requirements (>500 words)
- Mobile/hands-free scenarios
- Natural language explanations
- Brainstorming sessions

### Implementation

#### Step 1: Voice Recording
```
"Hey, I need to build a user onboarding flow for our SaaS app. 
So when someone signs up, they first need to verify their email, 
then we collect some basic profile info like company size and role, 
then we show them three different product demos based on their role, 
and finally we set up their workspace with some default settings. 

The whole flow should be mobile-friendly because a lot of our users 
sign up on their phones, and we need to handle edge cases like 
someone closing the browser mid-flow - they should be able to 
resume where they left off.

Also, we want to A/B test different demo content based on the 
company size they selected..."
```

#### Step 2: Process with AI
```
"Based on this voice description, create:
1. User flow diagram
2. Required API endpoints
3. Database schema changes
4. Frontend component structure
5. A/B testing strategy"
```

### Voice Workflow Tools
- Phone voice memos
- AI transcription services
- Voice-to-text browser APIs
- Dictation software
- Meeting transcripts

### Best Practices
- Speak clearly and slowly
- Include context and constraints
- Structure thoughts logically
- Review transcription for accuracy

---

## Pattern 11: Context-Based Coding 🛠️

### Core Concept
Use Official, Up-to-Date Documentation as Context

### When to Use
- Working with new/updated frameworks
- Need current best practices
- API integrations
- Following official patterns

### Implementation

#### Step 1: Gather Current Documentation
```
"I need to implement authentication in Next.js 14. Let me get the 
latest documentation..."

[Include official Next.js 14 auth docs]
[Include latest middleware examples]
[Include current API route patterns]
```

#### Step 2: Context-Aware Prompting
```
"Based on this Next.js 14 documentation, implement user authentication with:
- App router (not pages router)
- Server components where appropriate
- Middleware for route protection
- Current best practices for session management

Documentation context: [paste relevant docs]"
```

#### Step 3: Verify Against Official Examples
Cross-reference AI output with official examples

### Context Sources
- Official framework documentation
- API reference guides
- GitHub repository examples
- Release notes and changelogs
- Best practice guides
- Security advisories

### Context Management
```
"I'm using the following stack with these specific versions:
- Next.js 14.0.3
- React 18.2.0
- TypeScript 5.2.2
- Prisma 5.6.0

Please ensure all suggestions are compatible with these versions."
```

---

## Pattern 12: Raw to Structured 🗃️

### Core Concept
Unstructured Input → AI Processing → Structured Output

### When to Use
- Converting meeting notes to action items
- Processing customer feedback
- Organizing research data
- Creating structured datasets

### Implementation

#### Step 1: Define Output Structure
```json
{
  "tasks": [
    {
      "title": "string",
      "assignee": "string",
      "due_date": "YYYY-MM-DD",
      "priority": "high|medium|low",
      "status": "pending|in_progress|completed"
    }
  ],
  "decisions": [
    {
      "decision": "string",
      "rationale": "string",
      "stakeholders": ["string"]
    }
  ]
}
```

#### Step 2: Process Raw Input
```
"Convert these meeting notes into the structured format above:

'So we talked about the Q4 launch and decided that Sarah will handle 
the marketing campaign by end of November, that's high priority. 
Mike mentioned the API integration is still pending and he'll finish 
it next week, medium priority. We also decided to postpone the mobile 
app launch until Q1 because we need more testing time, John disagreed 
but we went with the majority vote...'

Output as JSON matching the schema above."
```

#### Step 3: Validate and Use
```json
{
  "tasks": [
    {
      "title": "Handle Q4 marketing campaign",
      "assignee": "Sarah",
      "due_date": "2024-11-30",
      "priority": "high",
      "status": "pending"
    },
    {
      "title": "Complete API integration",
      "assignee": "Mike",
      "due_date": "2024-11-15",
      "priority": "medium",
      "status": "in_progress"
    }
  ],
  "decisions": [
    {
      "decision": "Postpone mobile app launch to Q1",
      "rationale": "Need more testing time",
      "stakeholders": ["John (disagreed)", "majority vote"]
    }
  ]
}
```

### Common Transformations
- Email threads → Action items
- Customer feedback → Feature requests
- Research notes → Structured insights
- Logs → Incident reports
- Interviews → User personas
- Documents → Knowledge base entries

---

## Pattern Combinations

### Common Pattern Chains

#### Prototype → Refine → Automate
1. Start with Prototypes (Pattern 1)
2. Vibe Check results (Pattern 2)
3. Automate successful approach (Pattern 6)

#### Stuck → Restart → Document
1. Restart When Stuck (Pattern 4)
2. Store successful prompts (Pattern 8)
3. Build benchmark for future (Pattern 7)

#### Complex → Voice → Structure
1. Voice Workflows for complex requirements (Pattern 10)
2. Raw to Structured for organization (Pattern 12)
3. Provide Clear Specs for implementation (Pattern 3)

### Pattern Selection Matrix

| Situation | Primary Pattern | Supporting Patterns |
|-----------|----------------|-------------------|
| New project | 1: Start with Prototypes | 2: Vibe Checking, 3: Clear Specs |
| Stuck in conversation | 4: Restart When Stuck | 5: Let It See, 8: Store Prompts |
| Repetitive task | 6: Automate Steps | 8: Store Prompts, 7: Benchmarks |
| Complex requirements | 10: Voice Workflows | 3: Clear Specs, 12: Raw to Structured |
| Data transformation | 12: Raw to Structured | 9: Synthetic Data, 2: Vibe Checking |

Remember: These patterns are guidelines, not rules. Adapt them to your specific workflow and combine them creatively!