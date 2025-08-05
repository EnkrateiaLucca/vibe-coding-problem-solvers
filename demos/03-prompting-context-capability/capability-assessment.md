# Capability Assessment - What to Delegate to AI

## The Core Decision Framework

Knowing what to delegate to AI vs. handle yourself is crucial for effective AI-augmented development. This guide provides frameworks for making these decisions wisely.

## The Delegation Matrix

### 🟢 Definitely Delegate to AI

Tasks where AI excels and human review is straightforward:

| Task | Why AI Excels | Example |
|------|---------------|---------|
| **Boilerplate Generation** | Pattern-based, repetitive | CRUD endpoints, test scaffolds |
| **Data Transformation** | Clear input→output mapping | JSON to TypeScript interfaces |
| **Documentation Lookup** | Fast search and synthesis | "How to use React Context API" |
| **Code Formatting** | Rule-based, deterministic | Prettier/ESLint fixes |
| **Syntax Conversion** | Mechanical translation | Promise chains to async/await |
| **Mock Data Generation** | Creative but structured | Test fixtures, sample JSONs |
| **Regular Expressions** | Complex pattern matching | Email validation regex |

#### Example: Boilerplate Generation
```
✅ Good delegation:
"Generate Express.js CRUD endpoints for a User model with:
- GET /users (paginated)
- GET /users/:id  
- POST /users
- PUT /users/:id
- DELETE /users/:id
Include error handling and validation"
```

---

### 🟡 Delegate with Careful Review

Tasks where AI helps but requires human judgment:

| Task | Why Review Needed | Example |
|------|-------------------|---------|
| **Algorithm Implementation** | Logic correctness critical | Sorting, searching algorithms |
| **API Integration** | Version/auth specifics | Third-party service integration |
| **Database Queries** | Performance implications | Complex JOINs, aggregations |
| **Business Logic** | Domain expertise required | Pricing calculations, workflows |
| **Error Handling** | Edge cases matter | Retry logic, fallback behavior |
| **Unit Tests** | Coverage quality varies | Test case generation |

#### Example: Algorithm with Review
```
⚠️ Delegate but verify:
"Implement binary search for a sorted array of objects.
Search by the 'timestamp' property.
Handle edge cases: empty array, not found, duplicates"

// Review for: off-by-one errors, edge case handling
```

---

### 🔴 Keep Human-Controlled

Tasks requiring human judgment, creativity, or critical thinking:

| Task | Why Human Needed | Example |
|------|------------------|---------|
| **System Architecture** | Long-term implications | Microservice boundaries |
| **Security Implementation** | Risk too high | Authentication, encryption |
| **Performance Optimization** | Requires profiling/analysis | Database indexing strategy |
| **API Design** | User experience critical | REST vs GraphQL decision |
| **Code Review** | Quality assessment | PR reviews, best practices |
| **Debugging Complex Issues** | Requires deep understanding | Race conditions, memory leaks |
| **Technology Selection** | Strategic decision | Framework/library choices |

#### Example: Architecture Decision
```
❌ Don't delegate:
"Should we use microservices or monolith?"
"Design our authentication system"
"Choose our tech stack"

✅ Instead, use AI for research:
"Compare microservices vs monolith for a 5-person startup"
"List authentication best practices for SaaS"
```

---

## Decision Trees

### Quick Decision Tree
```
Is it a creative/strategic decision?
├─ Yes → Keep human-controlled
└─ No → Continue ↓

Does it involve security/sensitive data?
├─ Yes → Keep human-controlled
└─ No → Continue ↓

Is it repetitive/pattern-based?
├─ Yes → Delegate to AI
└─ No → Continue ↓

Can you easily verify correctness?
├─ Yes → Delegate with review
└─ No → Keep human-controlled
```

---

## Capability Assessment by AI Model

### GPT-4 / Claude Strengths
✅ **Excellent at:**
- Natural language tasks
- Code explanation
- Debugging assistance
- Creative solutions
- Multi-step reasoning

⚠️ **Okay at:**
- Complex algorithms
- System design
- Performance optimization

❌ **Weak at:**
- Real-time data
- Mathematical proofs
- Latest framework updates

### GitHub Copilot Strengths
✅ **Excellent at:**
- Line/function completion
- Pattern matching
- Boilerplate code
- Common algorithms

⚠️ **Okay at:**
- Complex logic
- Project-specific patterns

❌ **Weak at:**
- Architecture decisions
- Business logic
- Debugging

---

## Practical Examples

### Example 1: Building a User Authentication System

#### 🟢 Delegate to AI:
```
- "Generate password hashing function using bcrypt"
- "Create JWT token generation utility"
- "Write email validation regex"
- "Generate login form HTML/CSS"
```

#### 🟡 Delegate with Review:
```
- "Implement rate limiting for login attempts"
- "Create password reset flow"
- "Generate session management code"
```

#### 🔴 Keep Human-Controlled:
```
- Choosing authentication strategy (JWT vs sessions)
- Security audit of implementation
- Deciding token expiration policies
- Integration with existing systems
```

---

### Example 2: Data Processing Pipeline

#### 🟢 Delegate to AI:
```
- "Convert CSV to JSON with these mappings"
- "Generate data validation functions"
- "Create error logging utilities"
- "Write batch processing loop"
```

#### 🟡 Delegate with Review:
```
- "Implement parallel processing"
- "Create data deduplication logic"
- "Generate database insertion queries"
```

#### 🔴 Keep Human-Controlled:
```
- Defining data quality standards
- Choosing processing architecture
- Performance profiling and optimization
- Error recovery strategies
```

---

## Red Flags: When NOT to Delegate

### 🚨 Security Red Flags
- Handling authentication tokens
- Encryption implementation
- Access control logic
- Sensitive data processing
- Security audit code

### 🚨 Business-Critical Red Flags
- Core business algorithms
- Financial calculations
- Legal/compliance logic
- Data privacy handling
- Mission-critical systems

### 🚨 Complex System Red Flags
- Distributed system design
- Concurrency/threading
- Performance-critical paths
- System integration points
- Architectural decisions

---

## Building Your Capability Intuition

### Week 1: Observation
Track every AI interaction:
```
Task: [What you asked]
Delegated: Yes/No
Result Quality: 1-5
Time Saved: [Estimate]
Required Fixes: [What you had to change]
Should Have Delegated?: Yes/No
```

### Week 2: Pattern Recognition
Identify patterns:
- What types of tasks get 4-5 quality scores?
- Where do you spend most time fixing AI output?
- What surprises you with good results?

### Week 3: Refined Delegation
Apply your learnings:
- Delegate more of high-success patterns
- Keep human control of problem patterns
- Experiment with edge cases

### Week 4: Personal Framework
Create your own delegation rules based on experience

---

## Delegation Strategies by Experience Level

### Junior Developer
**Delegate more:**
- Syntax lookups
- Basic implementations
- Code examples
- Error explanations

**Keep control of:**
- Understanding why code works
- Learning core concepts
- Building mental models

### Mid-Level Developer
**Delegate more:**
- Boilerplate code
- Test generation
- Documentation
- Refactoring suggestions

**Keep control of:**
- Architecture decisions
- Code review
- Performance optimization
- Team standards

### Senior Developer
**Delegate more:**
- Research tasks
- Prototype generation
- Migration scripts
- Tool evaluations

**Keep control of:**
- System design
- Tech strategy
- Team mentoring
- Quality standards

---

## Interactive Assessment Exercise

For each scenario, decide: Delegate (D), Review (R), or Keep (K)?

1. Generate TypeScript types from JSON: ___
2. Choose between REST and GraphQL: ___
3. Write unit tests for utilities: ___
4. Implement OAuth integration: ___
5. Create database migration: ___
6. Design caching strategy: ___
7. Format code to team standards: ___
8. Debug production issue: ___
9. Generate API documentation: ___
10. Implement encryption: ___

<details>
<summary>Suggested Answers</summary>

1. D - Mechanical transformation
2. K - Strategic decision
3. R - Delegate but review coverage
4. R - Security-sensitive but standard
5. R - Need to verify correctness
6. K - Requires analysis and strategy
7. D - Rule-based formatting
8. K - Requires deep understanding
9. D - Documentation generation
10. K - Security-critical implementation
</details>

---

## The Evolution of Delegation

### Phase 1: Cautious Delegation
- Mostly syntax and lookups
- Heavy review of everything
- Building confidence

### Phase 2: Strategic Delegation  
- Broader task delegation
- Focused review on critical parts
- Developing intuition

### Phase 3: Sophisticated Orchestration
- Complex multi-step delegation
- Minimal review needed
- Strong capability assessment

### Phase 4: AI-Human Symbiosis
- Seamless collaboration
- Optimal task distribution
- Maximum productivity

---

## Key Principles

1. **Start Conservative**: Better to under-delegate than over-delegate
2. **Build Trust Gradually**: Expand delegation as you verify quality
3. **Always Verify Critical Path**: Never blindly trust security/business logic
4. **Learn from Mistakes**: Track what goes wrong and why
5. **Maintain Core Skills**: Don't delegate away your fundamental abilities
6. **Context Matters**: Same task might need different approach per project

---

## Remember

> "The goal isn't to delegate everything to AI, but to create an optimal partnership where each party does what they do best."

Effective capability assessment is a skill that improves with practice. Start small, track results, and continuously refine your approach.