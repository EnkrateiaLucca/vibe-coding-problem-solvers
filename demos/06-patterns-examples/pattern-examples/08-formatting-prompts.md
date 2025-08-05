# Pattern 8: Store Formatting Prompts - Reusable Transformations

## The Transformation Library Pattern

When you find yourself repeatedly asking AI to convert between formats or transform data in specific ways, save those prompts for instant reuse.

**Flow**: Save Transformation Patterns → Create Prompt Library → Reuse with Shortcuts

---

## Example 1: JSON to TypeScript Interface

### The Repetitive Task
Converting API responses to TypeScript interfaces - done 20+ times per project.

### The Stored Prompt Template
```markdown
# JSON to TypeScript Interface Converter

## Prompt Template
```
Convert this JSON data to a TypeScript interface:

{INPUT_JSON}

Requirements:
- Use proper TypeScript syntax with interface keyword
- Handle optional fields with ? notation
- Use appropriate TypeScript types (string, number, boolean, array, object)
- Add JSDoc comments for complex fields
- Export the interface
- Use PascalCase for interface name
- If arrays contain objects, create separate interfaces for nested objects
- Handle union types for fields that could be multiple types

Name the interface: {INTERFACE_NAME}
```

### Example Usage
**Input JSON:**
```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "is_active": true,
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "tags": ["developer", "javascript"],
  "last_login": "2024-08-05T10:30:00Z",
  "avatar": null
}
```

**Generated Output:**
```typescript
/**
 * User interface representing user data from API
 */
export interface User {
  /** Unique identifier for the user */
  id: number;
  
  /** Full name of the user */
  name: string;
  
  /** Email address */
  email: string;
  
  /** User's age in years */
  age: number;
  
  /** Whether the user account is currently active */
  is_active: boolean;
  
  /** User preferences and settings */
  preferences: UserPreferences;
  
  /** Array of tags associated with the user */
  tags: string[];
  
  /** ISO timestamp of last login */
  last_login: string;
  
  /** URL to user's avatar image, null if not set */
  avatar: string | null;
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  /** UI theme preference */
  theme: string;
  
  /** Whether notifications are enabled */
  notifications: boolean;
}
```

### Automation Setup
```bash
# Shell alias for quick access
alias json2ts='ai-prompt json-to-typescript'

# VS Code snippet
{
  "json-to-typescript": {
    "prefix": "j2ts",
    "body": [
      "Convert this JSON to a TypeScript interface:",
      "",
      "$CLIPBOARD",
      "",
      "Requirements:",
      "- Proper TypeScript syntax with interface keyword",
      "- Optional fields with ? notation", 
      "- JSDoc comments for complex fields",
      "- Export the interface",
      "- PascalCase naming",
      "- Separate interfaces for nested objects"
    ]
  }
}
```

---

## Example 2: API Documentation to Test Cases

### The Stored Prompt
```markdown
# API Documentation to Test Cases Converter

## Prompt Template
```
Convert this API documentation to comprehensive test cases:

{API_DOCUMENTATION}

Generate test cases that cover:

1. **Happy Path Tests**
   - Valid requests with expected responses
   - Different valid parameter combinations
   - Boundary value testing

2. **Error Handling Tests**
   - Invalid parameters
   - Missing required fields
   - Authentication failures
   - Authorization edge cases

3. **Edge Case Tests**
   - Empty responses
   - Large datasets
   - Special characters in inputs
   - Rate limiting scenarios

Format as:
- Test framework: {TEST_FRAMEWORK} (default: Jest/Vitest)
- Language: {LANGUAGE} (default: JavaScript/TypeScript)
- Include setup and teardown
- Use descriptive test names
- Add comments explaining complex test logic
- Include example request/response data
```

### Example Usage
**Input API Documentation:**
```markdown
## POST /api/users
Creates a new user account.

### Parameters
- `email` (string, required): Valid email address
- `password` (string, required): Minimum 8 characters
- `name` (string, required): User display name

### Responses
- `201`: User created successfully
- `400`: Validation error
- `409`: Email already exists
```

**Generated Test Cases:**
```javascript
describe('POST /api/users', () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  describe('Happy Path', () => {
    it('should create user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'securePassword123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(userData.email);
      expect(response.body.name).toBe(userData.name);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should handle minimum length password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '12345678', // exactly 8 characters
        name: 'Test User'
      };

      await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);
    });
  });

  describe('Validation Errors', () => {
    it('should reject invalid email format', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'securePassword123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.error).toContain('email');
    });

    it('should reject short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '1234567', // 7 characters
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.error).toContain('password');
    });

    it('should reject missing required fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({})
        .expect(400);

      expect(response.body.errors).toContain('email is required');
      expect(response.body.errors).toContain('password is required');
      expect(response.body.errors).toContain('name is required');
    });
  });

  describe('Business Logic Errors', () => {
    it('should reject duplicate email', async () => {
      // Create first user
      await createTestUser({ email: 'test@example.com' });

      // Try to create second user with same email
      const userData = {
        email: 'test@example.com',
        password: 'differentPassword123',
        name: 'Different User'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(409);

      expect(response.body.error).toContain('already exists');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long names', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'securePassword123',
        name: 'A'.repeat(255) // Very long name
      };

      await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);
    });

    it('should handle special characters in name', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'securePassword123',
        name: 'José María-O\'Connor 李小明'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.name).toBe(userData.name);
    });
  });
});
```

---

## Example 3: CSV to Markdown Table

### The Stored Prompt
```markdown
# CSV to Markdown Table Converter

## Prompt Template
```
Convert this CSV data to a well-formatted Markdown table:

{CSV_DATA}

Requirements:
- Use proper Markdown table syntax with pipes (|)
- Add header separators with dashes (-)
- Align columns nicely for readability
- Handle empty cells gracefully
- If data contains special characters, escape them properly
- Add table caption if {TABLE_TITLE} is provided
- Sort data by {SORT_COLUMN} if specified
- Limit to first {MAX_ROWS} rows if specified (default: all rows)
```

### Example Usage
**Input CSV:**
```csv
name,role,experience,location
John Doe,Senior Developer,5 years,New York
Jane Smith,Product Manager,3 years,San Francisco
Bob Johnson,Designer,7 years,Austin
Alice Brown,DevOps Engineer,4 years,Seattle
```

**Generated Markdown:**
```markdown
# Team Members

| Name | Role | Experience | Location |
|------|------|------------|----------|
| John Doe | Senior Developer | 5 years | New York |
| Jane Smith | Product Manager | 3 years | San Francisco |
| Bob Johnson | Designer | 7 years | Austin |
| Alice Brown | DevOps Engineer | 4 years | Seattle |
```

---

## Example 4: User Stories to Acceptance Criteria

### The Stored Prompt
```markdown
# User Stories to Acceptance Criteria Converter

## Prompt Template
```
Convert these user stories to detailed acceptance criteria:

{USER_STORIES}

For each user story, generate:

1. **Given-When-Then Format**
   - Given: Initial context/state
   - When: Action performed
   - Then: Expected outcome

2. **Edge Cases and Error Scenarios**
   - What happens when things go wrong
   - Boundary conditions
   - Invalid inputs

3. **Non-Functional Requirements**
   - Performance expectations
   - Accessibility requirements
   - Security considerations

4. **Definition of Done**
   - Testing requirements
   - Documentation needs
   - Review criteria

Use clear, testable language that developers and QA can implement.
```

### Example Usage
**Input User Story:**
```
As a user, I want to reset my password so that I can regain access to my account when I forget it.
```

**Generated Acceptance Criteria:**
```markdown
# Password Reset Feature - Acceptance Criteria

## User Story
As a user, I want to reset my password so that I can regain access to my account when I forget it.

## Acceptance Criteria

### Happy Path Scenarios

#### AC1: Request Password Reset
**Given** I am on the login page
**When** I click "Forgot Password" and enter my registered email
**Then** I should receive a password reset email within 5 minutes
**And** I should see a confirmation message that the email was sent

#### AC2: Reset Password with Valid Token
**Given** I have received a password reset email
**When** I click the reset link within 1 hour of receiving it
**Then** I should be taken to a password reset form
**And** I should be able to enter a new password
**And** the new password should follow security requirements (8+ chars, 1 number, 1 special char)

#### AC3: Login with New Password
**Given** I have successfully reset my password
**When** I attempt to login with the new password
**Then** I should be logged into my account
**And** all my previous sessions should be invalidated

### Error Scenarios

#### AC4: Invalid Email Address
**Given** I am on the forgot password page
**When** I enter an email that is not registered in the system
**Then** I should still see the confirmation message (for security)
**But** no email should be sent

#### AC5: Expired Reset Token
**Given** I have a password reset link that is older than 1 hour
**When** I click the reset link
**Then** I should see an error message stating the link has expired
**And** I should be provided with an option to request a new reset link

#### AC6: Invalid Password Requirements
**Given** I am on the password reset form
**When** I enter a password that doesn't meet security requirements
**Then** I should see clear error messages explaining what's wrong
**And** I should not be able to submit the form

### Edge Cases

#### AC7: Multiple Reset Requests
**Given** I have already requested a password reset
**When** I request another reset within 5 minutes
**Then** the system should use the original token
**And** should not send duplicate emails

#### AC8: Account Locked During Reset
**Given** my account is locked due to too many failed login attempts
**When** I complete the password reset process
**Then** my account should be unlocked
**And** the failed attempt counter should be reset

### Non-Functional Requirements

#### Performance
- Password reset emails must be sent within 5 minutes
- Reset form should load within 2 seconds
- Password validation should provide real-time feedback

#### Security
- Reset tokens must expire after 1 hour
- Tokens must be cryptographically secure (256-bit)
- All password reset activities must be logged
- No sensitive information in URLs or emails

#### Accessibility
- Form must be keyboard navigable
- Screen reader compatible
- WCAG 2.1 AA compliant
- Error messages must be announced

### Definition of Done

#### Development
- [ ] All acceptance criteria implemented
- [ ] Unit tests cover happy path and error scenarios
- [ ] Integration tests verify email sending
- [ ] Security review completed

#### Testing
- [ ] Manual testing on all supported browsers
- [ ] Accessibility testing completed
- [ ] Performance testing validates timing requirements
- [ ] Security penetration testing passed

#### Documentation
- [ ] API documentation updated
- [ ] User help documentation created
- [ ] Troubleshooting guide updated
```

---

## Building Your Prompt Library

### Organization Structure
```
prompts/
├── data-transformation/
│   ├── json-to-typescript.md
│   ├── csv-to-markdown.md
│   ├── api-to-openapi.md
│   └── xml-to-json.md
├── code-generation/
│   ├── react-component.md
│   ├── api-endpoint.md
│   ├── database-schema.md
│   └── test-cases.md
├── documentation/
│   ├── api-docs.md
│   ├── user-stories-to-ac.md
│   ├── code-to-comments.md
│   └── readme-generator.md
└── analysis/
    ├── code-review.md
    ├── performance-audit.md
    └── security-review.md
```

### Prompt Template Format
```markdown
# [Prompt Name]

## Category
[data-transformation|code-generation|documentation|analysis]

## Description
Brief description of what this prompt does and when to use it.

## Input Format
Description of expected input format and any requirements.

## Prompt Template
```
[The actual prompt with {PLACEHOLDER} variables]
```

## Parameters
- `{PLACEHOLDER_1}`: Description of what this should be
- `{PLACEHOLDER_2}`: Description with default value if applicable

## Example Usage

### Input
```
[Example input]
```

### Output  
```
[Example output]
```

## Variations
- **For beginners**: Simplified version with more explanation
- **For experts**: Concise version focusing on advanced features
- **For teams**: Version with collaboration considerations

## Quality Checklist
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Last Updated
[Date] - [What was changed]
```

### Quick Access Tools

#### Shell Aliases
```bash
# ~/.bashrc or ~/.zshrc
alias j2ts="cat | ai-prompt json-to-typescript"
alias csv2md="cat | ai-prompt csv-to-markdown"  
alias api2test="cat | ai-prompt api-to-tests"
alias story2ac="cat | ai-prompt story-to-acceptance"
```

#### VS Code Snippets
```json
{
  "prompt-json-to-ts": {
    "prefix": "prompt-j2ts",
    "body": [
      "Convert this JSON to a TypeScript interface:",
      "",
      "$CLIPBOARD",
      "",
      "Requirements:",
      "- Proper TypeScript syntax",
      "- Optional fields with ?",
      "- JSDoc comments",
      "- Export interface",
      "- PascalCase naming"
    ]
  }
}
```

#### Browser Bookmarklets
```javascript
// Bookmarklet for quick prompt access
javascript:(function(){
  const selection = window.getSelection().toString();
  const prompt = `Convert this to TypeScript interface:\n\n${selection}\n\nRequirements:\n- Proper syntax\n- Optional fields\n- JSDoc comments`;
  navigator.clipboard.writeText(prompt);
  alert('Prompt copied to clipboard!');
})();
```

---

## Advanced Prompt Techniques

### Conditional Logic in Prompts
```markdown
## Dynamic Prompt Template
```
Convert this {INPUT_TYPE} to {OUTPUT_TYPE}:

{INPUT_DATA}

{IF language=typescript}
Requirements:
- Use TypeScript syntax
- Include type annotations
- Add JSDoc comments
{ENDIF}

{IF language=python}  
Requirements:
- Use Python syntax
- Include type hints
- Add docstrings
{ENDIF}

{IF include_tests=true}
Also generate unit tests using {test_framework}.
{ENDIF}
```

### Context-Aware Prompts
```markdown
## Context-Sensitive API Documentation
```
Convert this API specification to documentation:

{API_SPEC}

Target audience: {AUDIENCE} (beginner|intermediate|expert)
Documentation style: {STYLE} (tutorial|reference|guide)
Include examples: {INCLUDE_EXAMPLES} (basic|comprehensive|none)

{IF audience=beginner}
- Use simple language
- Explain concepts thoroughly
- Include step-by-step examples
{ENDIF}

{IF audience=expert}
- Be concise and technical
- Focus on edge cases
- Include performance notes
{ENDIF}
```

### Multi-Step Transformation Prompts
```markdown
## Multi-Stage Data Processing
```
Process this data through multiple transformations:

{INPUT_DATA}

Step 1: Clean and validate the data
- Remove invalid entries
- Standardize formats
- Fill missing values

Step 2: Transform structure
- Convert to {TARGET_FORMAT}
- Apply naming conventions
- Optimize for {USE_CASE}

Step 3: Generate documentation
- Create schema documentation
- Add usage examples
- Include validation rules

Provide output for each step and final result.
```

---

## Measuring Prompt Library Success

### Usage Metrics
```bash
# Track prompt usage
echo "$(date): Used json-to-typescript prompt" >> ~/prompt-usage.log

# Monthly usage report
grep "json-to-typescript" ~/prompt-usage.log | wc -l
```

### Time Savings Calculation
```markdown
## ROI Analysis: JSON to TypeScript Prompt

### Before Automation
- Manual conversion time: 10 minutes per interface
- Monthly interfaces created: 50
- Total monthly time: 500 minutes (8.3 hours)

### After Automation  
- Prompt + review time: 2 minutes per interface
- Monthly interfaces created: 50
- Total monthly time: 100 minutes (1.7 hours)

### Savings
- Time saved: 400 minutes (6.6 hours) per month
- Efficiency gain: 80% time reduction
- Quality improvement: Consistent formatting, fewer typos
```

### Quality Improvement Tracking
```markdown
# Prompt Quality Assessment

## Before Stored Prompts
- Inconsistent output format: 40% of time
- Missing requirements: 25% of time  
- Rework needed: 35% of time

## After Stored Prompts
- Inconsistent output format: 5% of time
- Missing requirements: 2% of time
- Rework needed: 8% of time

## Improvement
- 88% reduction in formatting issues
- 92% reduction in missing requirements  
- 77% reduction in rework needed
```

---

## Prompt Library Best Practices

### 1. Version Control Your Prompts
```bash
git init prompt-library
cd prompt-library
# Add your prompts
git add .
git commit -m "Initial prompt library"

# Track changes over time
git log --oneline prompts/json-to-typescript.md
```

### 2. Test Prompts Before Storing
```markdown
# Testing Checklist for New Prompts
- [ ] Test with 3 different input examples
- [ ] Verify output quality meets standards
- [ ] Check edge cases and error handling
- [ ] Validate with team members
- [ ] Document known limitations
```

### 3. Keep Prompts Updated
```markdown
# Prompt Maintenance Schedule
- **Monthly**: Review usage statistics
- **Quarterly**: Update based on new AI capabilities
- **Annually**: Archive unused prompts
- **As needed**: Fix reported issues
```

### 4. Share and Collaborate
```markdown
# Team Prompt Library Guidelines
1. Use consistent naming conventions
2. Include clear descriptions and examples
3. Test prompts before sharing
4. Document any customizations needed
5. Provide feedback on others' prompts
```

Remember: The best prompt library is one that gets used daily and saves real time. Start with your most frequent transformations and build from there!