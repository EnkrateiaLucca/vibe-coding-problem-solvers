# Pattern 7: Build Personal Benchmarks - Track AI Improvement

## The Learning Loop Pattern

When AI fails repeatedly on specific tasks, create benchmarks to track improvement over time and measure your collaboration effectiveness.

**Flow**: Track Failed Outputs → Create Test Cases → Retest with New Models/Approaches

---

## Example 1: SQL Query Generation Benchmark

### The Problem
AI keeps generating inefficient SQL queries for complex joins and aggregations.

### Creating the Benchmark

#### Step 1: Document the Failures
```markdown
# SQL Query Generation Benchmark

## Failed Example 1: User Analytics Query
**Date**: 2024-08-05
**Model**: GPT-4
**Prompt**: "Get users with their total orders, average order value, and last order date"

**AI Generated**:
```sql
SELECT u.*, 
       (SELECT COUNT(*) FROM orders WHERE user_id = u.id) as total_orders,
       (SELECT AVG(total) FROM orders WHERE user_id = u.id) as avg_order_value,
       (SELECT MAX(created_at) FROM orders WHERE user_id = u.id) as last_order
FROM users u;
```

**Problems**:
- N+1 query pattern (subqueries in SELECT)
- Poor performance on large datasets
- Doesn't handle users with no orders

**Expected Solution**:
```sql
SELECT u.id, u.name, u.email,
       COALESCE(COUNT(o.id), 0) as total_orders,
       COALESCE(AVG(o.total), 0) as avg_order_value,
       MAX(o.created_at) as last_order
FROM users u
LEFT JOIN orders o ON u.id = o.user_id  
GROUP BY u.id, u.name, u.email;
```

**Score**: 2/5 (functional but inefficient)
```

#### Step 2: Create Structured Test Cases
```json
{
  "benchmark_name": "SQL Query Generation",
  "category": "code_generation", 
  "created_date": "2024-08-05",
  "description": "Tests AI ability to generate efficient SQL queries for common analytics tasks",
  
  "test_cases": [
    {
      "id": "user_analytics",
      "prompt": "Create a SQL query to get users with their total orders, average order value, and last order date. Handle users with no orders gracefully.",
      "expected_patterns": [
        "LEFT JOIN or JOIN with aggregation",
        "GROUP BY on user fields", 
        "COALESCE or NULL handling",
        "No subqueries in SELECT clause"
      ],
      "avoid_patterns": [
        "Subqueries in SELECT",
        "N+1 query pattern",
        "CROSS JOIN",
        "Missing NULL handling"
      ],
      "success_criteria": [
        "Query executes without errors",
        "Handles users with 0 orders",
        "Uses efficient JOIN pattern",
        "Performance acceptable on 100K+ records"
      ]
    },
    {
      "id": "sales_reporting",
      "prompt": "Create a query for monthly sales report showing total revenue, order count, and average order value by month for the last 12 months",
      "expected_patterns": [
        "DATE functions for grouping",
        "Proper time range filtering",
        "Aggregation functions",
        "Clear date formatting"
      ],
      "avoid_patterns": [
        "Missing date bounds",
        "Inefficient date calculations",
        "No timezone consideration"
      ]
    },
    {
      "id": "product_performance",
      "prompt": "Find top 10 products by revenue with their total sales, units sold, and average rating from reviews",
      "expected_patterns": [
        "Multiple table JOINs",
        "Proper aggregation grouping",
        "ORDER BY with LIMIT",
        "Rating calculation"
      ]
    }
  ]
}
```

#### Step 3: Regular Testing Schedule
```python
#!/usr/bin/env python3
"""
SQL Benchmark Runner
Tests AI models on SQL generation tasks
"""

import json
import datetime
from pathlib import Path

class SQLBenchmark:
    def __init__(self):
        self.results_file = Path("sql_benchmark_results.json")
        self.results = self.load_results()
    
    def run_benchmark(self, model_name):
        """Run the full SQL benchmark suite"""
        print(f"🧪 Running SQL Benchmark with {model_name}")
        
        benchmark_data = self.load_benchmark_data()
        run_results = {
            'model': model_name,
            'date': datetime.datetime.now().isoformat(),
            'test_results': []
        }
        
        for test_case in benchmark_data['test_cases']:
            print(f"\n--- Test: {test_case['id']} ---")
            print(f"Prompt: {test_case['prompt']}")
            
            # Here you would send the prompt to your AI model
            # For now, we'll simulate manual testing
            print("\nExpected patterns:")
            for pattern in test_case['expected_patterns']:
                print(f"  ✓ {pattern}")
            
            print("\nAvoid patterns:")
            for pattern in test_case['avoid_patterns']:
                print(f"  ❌ {pattern}")
            
            # Manual scoring (could be automated with SQL parsing)
            score = int(input(f"Score for {test_case['id']} (1-5): "))
            notes = input("Notes: ")
            
            run_results['test_results'].append({
                'test_id': test_case['id'],
                'score': score,
                'notes': notes,
                'passed': score >= 3
            })
        
        # Calculate overall score
        total_score = sum(r['score'] for r in run_results['test_results'])
        max_score = len(run_results['test_results']) * 5
        run_results['overall_score'] = (total_score / max_score) * 100
        
        # Save results
        self.results.append(run_results)
        self.save_results()
        
        # Show improvement
        self.show_progress()
    
    def show_progress(self):
        """Display improvement over time"""
        if len(self.results) < 2:
            return
            
        current = self.results[-1]
        previous = self.results[-2]
        
        improvement = current['overall_score'] - previous['overall_score']
        
        print(f"\n📈 Progress Report")
        print(f"Current score: {current['overall_score']:.1f}%")
        print(f"Previous score: {previous['overall_score']:.1f}%")
        print(f"Improvement: {improvement:+.1f}%")
        
        if improvement > 0:
            print("🎉 Getting better!")
        elif improvement < 0:
            print("📉 Needs attention")
        else:
            print("📊 Stable performance")

# Usage
benchmark = SQLBenchmark()
benchmark.run_benchmark("GPT-4-Turbo")
```

---

## Example 2: Code Review Quality Benchmark

### The Challenge
AI code reviews miss important issues or focus on trivial style problems.

### Benchmark Creation
```json
{
  "benchmark_name": "Code Review Quality",
  "category": "code_analysis",
  "description": "Tests AI ability to identify important code issues during review",
  
  "test_cases": [
    {
      "id": "security_vulnerabilities",
      "code_sample": `
function authenticateUser(req, res) {
  const { username, password } = req.body;
  const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;
  db.query(query, (err, results) => {
    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.json({ success: false });
    }
  });
}`,
      "critical_issues": [
        "SQL injection vulnerability",
        "Plain text password storage/comparison", 
        "No input validation",
        "User data exposed in response"
      ],
      "minor_issues": [
        "No error handling",
        "Magic numbers (length > 0)"
      ],
      "success_criteria": [
        "Identifies SQL injection risk",
        "Flags password security issue",
        "Suggests parameterized queries",
        "Recommends password hashing"
      ]
    },
    {
      "id": "performance_issues",
      "code_sample": `
function getUsersWithPosts() {
  const users = await User.findAll();
  const usersWithPosts = [];
  
  for (const user of users) {
    const posts = await Post.findAll({ where: { userId: user.id } });
    usersWithPosts.push({ ...user, posts });
  }
  
  return usersWithPosts;
}`,
      "critical_issues": [
        "N+1 query problem",
        "No pagination",
        "Blocking async operations"
      ],
      "solutions": [
        "Use eager loading/includes",
        "Implement pagination",
        "Use Promise.all for parallel execution"
      ]
    }
  ]
}
```

### Tracking Results Over Time
```markdown
# Code Review Benchmark Results

## Run 1: GPT-4 (2024-08-05)
- Security test: 3/5 (identified SQL injection, missed password issue)
- Performance test: 4/5 (caught N+1, suggested good solutions)
- Overall: 70%

## Run 2: Claude-3 (2024-08-05)  
- Security test: 5/5 (caught all major issues)
- Performance test: 3/5 (identified problem, solution was vague)
- Overall: 80%

## Run 3: GPT-4 + Better Prompting (2024-08-10)
- Security test: 5/5 (improved with specific security focus prompt)
- Performance test: 5/5 (detailed solutions provided)
- Overall: 100%

## Key Learnings
1. **Prompt specificity matters**: "Review for security issues" vs "Review this code"
2. **Context helps**: Including the intended use case improves suggestions
3. **Model strengths**: Claude better at security, GPT-4 better at performance
```

---

## Example 3: API Design Review Benchmark

### The Pattern
AI suggests APIs that don't follow REST conventions or best practices.

### Benchmark Setup
```json
{
  "benchmark_name": "API Design Review",
  "category": "architecture_review",
  
  "test_cases": [
    {
      "id": "rest_conventions",
      "scenario": "Design APIs for a blog platform with posts, comments, and users",
      "prompt": "Design RESTful API endpoints for managing blog posts, comments, and users. Include proper HTTP methods, status codes, and URL structures.",
      
      "expected_patterns": [
        "Proper HTTP methods (GET, POST, PUT, DELETE)",
        "Resource-based URLs (/posts, /posts/:id)",
        "Consistent naming conventions",
        "Appropriate status codes (200, 201, 404, etc.)",
        "Nested resources (/posts/:id/comments)"
      ],
      
      "avoid_patterns": [
        "Verbs in URLs (/getPosts, /createUser)",
        "Inconsistent naming (camelCase vs snake_case)",
        "Wrong HTTP methods (GET for deletion)",
        "Poor status code usage"
      ],
      
      "scoring_rubric": {
        "url_design": "Are URLs resource-based and consistent?",
        "http_methods": "Correct HTTP method usage?", 
        "status_codes": "Appropriate response codes?",
        "data_format": "Consistent request/response format?",
        "error_handling": "Proper error response structure?"
      }
    }
  ]
}
```

---

## Example 4: Technical Writing Benchmark

### The Problem
AI-generated documentation is either too technical or too simplistic.

### Benchmark Structure
```markdown
# Technical Writing Quality Benchmark

## Test Case: API Documentation

### Input Specification
```json
{
  "endpoint": "POST /api/users",
  "description": "Creates a new user account",
  "parameters": {
    "email": "string, required, must be valid email",
    "password": "string, required, min 8 chars",
    "name": "string, required"
  },
  "responses": {
    "201": "User created successfully",
    "400": "Validation error",
    "409": "Email already exists"
  }
}
```

### Quality Criteria
1. **Clarity** (1-5): Is it easy to understand?
2. **Completeness** (1-5): Are all details covered?
3. **Examples** (1-5): Are there useful code examples?
4. **Error handling** (1-5): Are error cases well documented?
5. **Developer experience** (1-5): Would this help a developer integrate?

### Expected Documentation Quality
```markdown
# Create User Account

Creates a new user account in the system.

## Endpoint
```
POST /api/users
```

## Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Valid email address. Must be unique. |
| password | string | Yes | Minimum 8 characters. Must contain at least one number. |
| name | string | Yes | User's display name. 2-50 characters. |

## Example Request
```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe"
  }'
```

## Example Response (201 Created)
```json
{
  "id": "12345",
  "email": "user@example.com", 
  "name": "John Doe",
  "created_at": "2024-08-05T10:30:00Z"
}
```

## Error Responses

### 400 Bad Request
Returned when validation fails.

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 409 Conflict  
Returned when email already exists.

```json
{
  "error": "Email already registered",
  "message": "An account with this email already exists"
}
```
```

### Scoring Results
```markdown
## Benchmark Results

### GPT-4 (2024-08-05)
- Clarity: 4/5 (clear but verbose)
- Completeness: 3/5 (missing error examples)
- Examples: 5/5 (excellent curl examples)
- Error handling: 2/5 (vague error descriptions)
- Developer experience: 4/5 (overall helpful)
**Total: 72%**

### Claude-3 (2024-08-05)
- Clarity: 5/5 (perfect balance)
- Completeness: 5/5 (all details covered)
- Examples: 4/5 (good examples, could be more varied)
- Error handling: 5/5 (comprehensive error docs)
- Developer experience: 5/5 (very developer-friendly)
**Total: 96%**

### Improved GPT-4 Prompt (2024-08-10)
Prompt: "Write developer-friendly API documentation with comprehensive examples and error handling details"
**Total: 94%** (significant improvement)
```

---

## Building Your Personal Benchmark System

### Step 1: Identify Your Problem Areas

**Weekly Failure Tracking**
```markdown
# AI Failure Log - Week of Aug 5, 2024

## Monday
- **Task**: Generate React hook for API calls
- **Issue**: Generated unsafe side effects, no cleanup
- **Category**: code_generation
- **Severity**: High

## Tuesday  
- **Task**: Write SQL for analytics query
- **Issue**: Inefficient subqueries, poor performance
- **Category**: sql_generation
- **Severity**: Medium

## Wednesday
- **Task**: Create deployment script
- **Issue**: Missing error handling, no rollback
- **Category**: devops_automation
- **Severity**: High
```

### Step 2: Create Structured Test Cases

**Template for Test Cases**
```json
{
  "id": "unique_test_id",
  "category": "test_category",
  "prompt": "exact prompt to test",
  "expected_output": "description of good output",
  "success_criteria": [
    "specific requirement 1",
    "specific requirement 2"
  ],
  "avoid_patterns": [
    "anti-pattern 1",
    "anti-pattern 2"
  ],
  "test_data": "sample input if applicable",
  "scoring_rubric": {
    "criterion_1": "What to look for",
    "criterion_2": "How to evaluate"
  }
}
```

### Step 3: Regular Testing Rhythm

**Monthly Benchmark Schedule**
- **Week 1**: Create new benchmarks from recent failures
- **Week 2**: Run existing benchmarks with primary AI model
- **Week 3**: Test alternative models/prompting approaches
- **Week 4**: Analyze results and plan improvements

### Step 4: Track Long-term Trends

**Benchmark Dashboard**
```python
def generate_progress_report():
    benchmarks = load_all_benchmarks()
    
    for benchmark in benchmarks:
        scores = [run['overall_score'] for run in benchmark['runs']]
        
        print(f"\n📊 {benchmark['name']}")
        print(f"Latest: {scores[-1]:.1f}%")
        print(f"Best: {max(scores):.1f}%")
        print(f"Trend: {calculate_trend(scores)}")
        
        if len(scores) >= 3:
            recent_trend = scores[-3:]
            if all(recent_trend[i] <= recent_trend[i+1] for i in range(len(recent_trend)-1)):
                print("📈 Improving!")
            elif all(recent_trend[i] >= recent_trend[i+1] for i in range(len(recent_trend)-1)):
                print("📉 Declining")
            else:
                print("📊 Variable")
```

---

## Advanced Benchmarking Techniques

### Competitive Benchmarking
```markdown
# Model Comparison Benchmark

## Task: Generate React Component Tests

### GPT-4 Turbo
- Score: 85%
- Strengths: Good test coverage, proper mocking
- Weaknesses: Verbose setup code

### Claude-3 Opus  
- Score: 92%
- Strengths: Clean test structure, edge cases
- Weaknesses: Less detailed assertions

### GitHub Copilot
- Score: 78%
- Strengths: Fast generation, familiar patterns
- Weaknesses: Missing error scenarios

**Winner**: Claude-3 for comprehensive test generation
```

### Context Sensitivity Testing
```json
{
  "test_case": "api_error_handling",
  "variations": [
    {
      "context": "beginner_developer",
      "prompt": "I'm new to APIs. Help me handle errors...",
      "expected": "Simple, educational explanation"
    },
    {
      "context": "senior_developer", 
      "prompt": "Design robust error handling for production API...",
      "expected": "Advanced patterns, edge cases"
    }
  ]
}
```

### Domain-Specific Benchmarks
```markdown
# Frontend Development Benchmark Suite

## React Components
- Component generation
- Hook implementation  
- State management
- Performance optimization

## Styling
- CSS-in-JS solutions
- Responsive design
- Animation implementation
- Design system integration

## Testing
- Unit test generation
- Integration test patterns
- E2E test scenarios
- Mock implementation
```

---

## Benchmark Success Metrics

### Individual Performance
- **Accuracy Trend**: Are scores improving over time?
- **Consistency**: Are results stable across runs?
- **Speed**: How quickly can you get good results?
- **Adaptability**: Can you adjust when benchmarks fail?

### Model Comparison
- **Strengths Mapping**: Which model is best for what tasks?
- **Cost Effectiveness**: Best results per dollar spent?
- **Reliability**: Which model most consistently delivers?

### Workflow Impact
- **Time Savings**: Reduced debugging and rework time
- **Quality Improvement**: Fewer issues in delivered code
- **Learning Acceleration**: Faster skill development
- **Confidence Building**: Trust in AI collaboration

Remember: Benchmarks are not about achieving perfect scores, but about continuous improvement and informed decision-making in your AI collaboration!