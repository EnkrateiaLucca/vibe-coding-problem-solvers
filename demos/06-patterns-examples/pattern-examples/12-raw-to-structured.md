# Pattern 12: Raw to Structured - Transform Unstructured Input

## The Data Transformation Pattern

When you have messy, unstructured input (emails, documents, handwritten notes, screenshots), use AI to transform it into clean, structured, actionable formats.

**Flow**: Messy Input → AI Processing → Structured Output → Implementation

---

## Example 1: Email Requirements to User Stories

### Raw Input (Client Email)
```
From: sarah@company.com
Subject: Updates needed for user dashboard

Hi team,

I've been getting feedback from our users about the dashboard and we need to make some changes. Here's what people are saying:

The main issue is that users can't find their recent activity easily. Right now they have to scroll through everything which is really annoying when you have lots of data. We should probably add some kind of filter or search.

Also, the charts are confusing. People don't understand what the different colors mean and the legend is too small. Can we make it clearer?

Another thing - users want to export their data but there's no button for that. They keep asking our support team how to get their data out of the system.

Oh and the mobile version is pretty bad. Everything is squished together and you can't really use it on a phone.

We also need to add some kind of notification system so users know when their data has been updated or if there are any issues.

Let me know what you think and how long this might take.

Thanks,
Sarah
```

### AI Transformation Prompt
```
Convert this client email into properly formatted user stories with acceptance criteria. Extract the key requirements and structure them using standard agile format:

[Email content above]

Format each requirement as:
- User Story: "As a [user type], I want [goal] so that [benefit]"
- Acceptance Criteria: Given/When/Then format
- Priority: High/Medium/Low
- Estimated effort: S/M/L/XL
```

### Structured Output
```markdown
# Dashboard Improvement User Stories

## Epic: Dashboard User Experience Enhancement

### Story 1: Activity Filtering and Search
**As a** dashboard user  
**I want** to filter and search my recent activity  
**So that** I can quickly find specific actions without scrolling through all data

**Acceptance Criteria:**
- **Given** I'm on the dashboard activity section
- **When** I use the search box with keywords
- **Then** I see only activities matching those keywords
- **And** results are highlighted for easy identification

- **Given** I'm viewing my activity feed  
- **When** I select filter options (date range, activity type, status)
- **Then** the feed updates to show only matching activities
- **And** active filters are clearly displayed with remove options

**Priority:** High  
**Effort:** M  
**Notes:** Consider real-time search vs. search-on-submit

---

### Story 2: Chart Clarity and Legend Improvement
**As a** dashboard user  
**I want** clear, understandable charts with readable legends  
**So that** I can interpret my data without confusion

**Acceptance Criteria:**
- **Given** I'm viewing dashboard charts
- **When** I look at the legend
- **Then** text is large enough to read easily (minimum 12px font)
- **And** color meanings are clearly labeled

- **Given** I'm viewing a chart
- **When** I hover over data points
- **Then** I see tooltips with detailed information
- **And** colors have sufficient contrast for accessibility

**Priority:** High  
**Effort:** S  
**Notes:** Audit current color scheme for accessibility compliance

---

### Story 3: Data Export Functionality
**As a** dashboard user  
**I want** to export my data in common formats  
**So that** I can analyze it in external tools or create backups

**Acceptance Criteria:**
- **Given** I'm on any dashboard page with data
- **When** I click the "Export" button
- **Then** I see format options (CSV, PDF, Excel)
- **And** I can select date ranges and data types to include

- **Given** I've initiated an export
- **When** the export is ready
- **Then** I receive a download link via email or in-app notification
- **And** the file contains all requested data in the correct format

**Priority:** Medium  
**Effort:** L  
**Notes:** Consider rate limiting and file size restrictions

---

### Story 4: Mobile Dashboard Optimization
**As a** mobile user  
**I want** a responsive dashboard that works well on my phone  
**So that** I can access my data while away from my computer

**Acceptance Criteria:**
- **Given** I'm using the dashboard on a mobile device
- **When** I navigate between sections
- **Then** all content is readable without horizontal scrolling
- **And** buttons and links are large enough for touch interaction

- **Given** I'm viewing charts on mobile
- **When** I rotate my device
- **Then** charts resize appropriately
- **And** legends remain readable

**Priority:** High  
**Effort:** XL  
**Notes:** May require significant responsive design work

---

### Story 5: Activity Notification System
**As a** dashboard user  
**I want** notifications about data updates and system issues  
**So that** I stay informed about important changes without constantly checking

**Acceptance Criteria:**
- **Given** my data has been updated
- **When** the update process completes
- **Then** I receive an in-app notification
- **And** I can see notification history

- **Given** there's a system issue affecting my data
- **When** the issue occurs
- **Then** I receive a notification explaining the problem
- **And** I'm updated when the issue is resolved

**Priority:** Medium  
**Effort:** L  
**Notes:** Consider user preferences for notification frequency

---

## Implementation Prioritization

### Sprint 1 (High Priority - Quick Wins)
1. Chart legend improvements (Story 2) - 1 week
2. Activity search/filter (Story 1) - 2 weeks

### Sprint 2 (High Priority - Complex)
3. Mobile optimization (Story 4) - 3 weeks

### Sprint 3 (Medium Priority)
4. Data export functionality (Story 3) - 2 weeks
5. Notification system (Story 5) - 2 weeks

**Total Estimated Timeline:** 10 weeks
```

---

## Example 2: Meeting Notes to Action Items

### Raw Input (Meeting Transcript)
```
Meeting: Product Planning Session
Date: August 5, 2024
Attendees: John (PM), Sarah (Design), Mike (Dev), Lisa (QA)

John: Okay so we need to talk about the Q4 roadmap. The biggest thing on everyone's mind is performance. Our app is getting slower and users are complaining.

Mike: Yeah, I've been looking at this. The main bottleneck is the database queries. We're doing way too many N+1 queries, especially on the user dashboard. I think we could probably cut load times in half just by fixing those.

Sarah: From a design perspective, we also need to look at lazy loading. We're loading way too much content upfront. Maybe we should implement virtual scrolling for the long lists?

Lisa: I can help identify which pages are the slowest. I've been running some performance tests and I have data on the worst offenders.

John: Great. So it sounds like we have a few different approaches. Mike, how long would it take to fix the database issues?

Mike: Probably 3-4 weeks if I focus on it. But I'd need help from Lisa to make sure I don't break anything.

Lisa: Yeah, we should definitely set up performance regression testing so we can catch these issues earlier.

Sarah: What about the lazy loading stuff? I think that could have a big impact too.

Mike: That's probably another 2-3 weeks of work. We'd need to redesign how we handle data fetching.

John: Okay, and what about that new feature request from the sales team? They want bulk user import functionality.

Mike: Oh right, I forgot about that. That's probably a week or two of work, but it's not super complex.

Sarah: We also still haven't finished the dark mode implementation. That's been sitting in our backlog for months.

John: Right. Lisa, what's the status on that?

Lisa: The design is done, we just need development time. Probably 1-2 weeks to implement and test.

John: Okay so it sounds like we have: database performance fixes, lazy loading, bulk import, and dark mode. We need to prioritize these for Q4.

Sarah: Don't forget we also need to update our design system documentation. The new components aren't documented yet.

Mike: And we should probably upgrade to the latest version of React. We're a few versions behind.

John: Alright, so we have even more items. Let's figure out what's most important.
```

### AI Transformation
```
Convert these meeting notes into a structured action plan with:
1. Clear action items with owners and deadlines
2. Dependencies between tasks
3. Priority levels
4. Estimated effort
5. Success criteria for each item

[Meeting notes above]
```

### Structured Output
```markdown
# Q4 Product Planning - Action Items & Roadmap

## Meeting Summary
**Date:** August 5, 2024  
**Attendees:** John (PM), Sarah (Design), Mike (Dev), Lisa (QA)  
**Focus:** Q4 roadmap prioritization and performance improvements

---

## Action Items

### High Priority - Performance Improvements

#### 1. Database Query Optimization
- **Owner:** Mike (Lead), Lisa (Testing Support)
- **Deadline:** September 15, 2024 (4 weeks)
- **Effort:** Large
- **Description:** Fix N+1 queries, especially on user dashboard
- **Success Criteria:** 
  - 50% reduction in page load times
  - Database query count reduced by 70%
  - No functional regressions
- **Dependencies:** Performance regression testing setup
- **Status:** Not started

#### 2. Performance Regression Testing Setup
- **Owner:** Lisa
- **Deadline:** August 20, 2024 (2 weeks)
- **Effort:** Medium
- **Description:** Implement automated performance testing to catch regressions
- **Success Criteria:**
  - Automated tests run on every deployment
  - Performance alerts trigger when load times increase >20%
  - Baseline metrics established for all major pages
- **Dependencies:** None
- **Status:** Not started

#### 3. Lazy Loading & Virtual Scrolling Implementation
- **Owner:** Mike (Dev), Sarah (Design Review)
- **Deadline:** October 1, 2024 (3 weeks after DB optimization)
- **Effort:** Large
- **Description:** Implement lazy loading and virtual scrolling for long lists
- **Success Criteria:**
  - Initial page load times reduced by 30%
  - Memory usage reduced for pages with large datasets
  - Smooth scrolling experience maintained
- **Dependencies:** Database optimization completion
- **Status:** Not started

### Medium Priority - New Features

#### 4. Bulk User Import Functionality
- **Owner:** Mike
- **Deadline:** September 30, 2024 (2 weeks)
- **Effort:** Small-Medium
- **Description:** Sales team requested bulk user import capability
- **Success Criteria:**
  - Support CSV and Excel file formats
  - Handle up to 10,000 users per import
  - Validation and error reporting for invalid data
  - Progress tracking for large imports
- **Dependencies:** None
- **Status:** Not started

#### 5. Dark Mode Implementation
- **Owner:** Mike (Dev), Sarah (Design Complete), Lisa (Testing)
- **Deadline:** October 15, 2024 (2 weeks)
- **Effort:** Small-Medium
- **Description:** Complete dark mode feature implementation
- **Success Criteria:**
  - All components support dark mode
  - User preference persistence
  - Accessibility standards maintained
  - No visual regressions
- **Dependencies:** Design system documentation update
- **Status:** Design complete, development pending

### Low Priority - Technical Debt

#### 6. Design System Documentation Update
- **Owner:** Sarah
- **Deadline:** August 30, 2024 (3 weeks)
- **Effort:** Medium
- **Description:** Document new components in design system
- **Success Criteria:**
  - All new components have usage guidelines
  - Code examples provided
  - Accessibility notes included
- **Dependencies:** None
- **Status:** Not started

#### 7. React Version Upgrade
- **Owner:** Mike
- **Deadline:** November 1, 2024 (4 weeks)
- **Effort:** Large
- **Description:** Upgrade to latest React version
- **Success Criteria:**
  - All functionality works with new version
  - Performance improvements realized
  - Deprecated warnings eliminated
  - Team trained on new features
- **Dependencies:** Major feature work completion
- **Status:** Research phase

---

## Q4 Sprint Planning

### Sprint 1 (Aug 5 - Aug 26)
- **Focus:** Foundation and quick wins
- **Tasks:**
  - Performance regression testing setup (Lisa)
  - Design system documentation (Sarah)
  - Begin database optimization research (Mike)

### Sprint 2 (Aug 26 - Sep 16)
- **Focus:** Database performance
- **Tasks:**
  - Database query optimization implementation (Mike + Lisa)
  - Bulk user import development (Mike)

### Sprint 3 (Sep 16 - Oct 7)
- **Focus:** UI improvements
- **Tasks:**
  - Lazy loading implementation (Mike + Sarah)
  - Dark mode completion (Mike + Lisa)

### Sprint 4 (Oct 7 - Oct 28)
- **Focus:** Technical debt and polish
- **Tasks:**
  - React upgrade planning and execution (Mike)
  - Final performance optimizations
  - Documentation completion

---

## Success Metrics for Q4

### Performance Goals
- [ ] Overall page load times reduced by 50%
- [ ] Database query count reduced by 70%
- [ ] User satisfaction score improvement of 20%
- [ ] Zero performance regressions shipped

### Feature Delivery Goals
- [ ] Bulk import handling 95% of sales team requests
- [ ] Dark mode adoption by 30% of users
- [ ] Design system documentation 100% complete

### Technical Health Goals
- [ ] React version up to date
- [ ] Zero critical performance issues in backlog
- [ ] Automated performance testing coverage >80%

---

## Risk Assessment

### High Risk
- **Database optimization complexity:** May uncover additional performance issues
- **Mitigation:** Start with comprehensive analysis and incremental improvements

### Medium Risk
- **Resource allocation:** Mike is assigned to multiple large tasks
- **Mitigation:** Consider bringing in additional developer or extending timelines

### Low Risk
- **Dark mode implementation:** Design is complete, straightforward development
- **Mitigation:** None needed

---

## Next Steps
1. **John:** Get approval for timeline and resource allocation
2. **Lisa:** Begin performance testing setup immediately
3. **Mike:** Start database performance analysis
4. **Sarah:** Begin design system documentation
5. **All:** Review and confirm commitment to deadlines by August 8

**Next Meeting:** August 12, 2024 - Progress check-in
```

---

## Example 3: Screenshots to Development Specs

### Raw Input (Screenshot Analysis)
```
I have a screenshot of a mobile app login screen that I need to recreate. The AI analyzes the screenshot and provides structured specifications.

[Imagine a screenshot showing a mobile login screen with:
- Company logo at top
- Email input field
- Password input field  
- "Remember me" checkbox
- Login button
- "Forgot password?" link
- Social login buttons (Google, Apple)]
```

### AI Analysis Prompt
```
Analyze this login screen screenshot and create detailed development specifications including:

1. Layout structure and component hierarchy
2. Exact measurements and spacing
3. Color palette and typography
4. Interactive elements and states
5. Responsive design considerations
6. Accessibility requirements
7. Implementation code (React + CSS)

Focus on creating pixel-perfect recreation specifications.
```

### Structured Output
```markdown
# Mobile Login Screen - Development Specifications

## Visual Analysis Summary
**Screen Type:** Mobile login interface  
**Design Style:** Clean, modern, minimal  
**Primary Colors:** Blue accent (#3B82F6), neutral grays  
**Layout:** Single column, center-aligned vertical stack

---

## Component Hierarchy

```
LoginScreen
├── Header
│   └── Logo
├── LoginForm
│   ├── EmailInput
│   ├── PasswordInput
│   ├── RememberMeCheckbox
│   └── LoginButton
├── ForgotPasswordLink
└── SocialLoginSection
    ├── GoogleLoginButton
    └── AppleLoginButton
```

## Detailed Specifications

### Container & Layout
```css
.login-screen {
  min-height: 100vh;
  padding: 24px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 100%;
  max-width: 380px;
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
```

### Logo Section
```css
.logo-section {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
}

.app-name {
  font-size: 28px;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
}
```

### Form Elements
```css
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #9CA3AF;
}
```

### Interactive Elements
```css
.remember-me {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.checkbox {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  accent-color: #3B82F6;
}

.checkbox-label {
  font-size: 14px;
  color: #6B7280;
  cursor: pointer;
}

.login-button {
  width: 100%;
  height: 48px;
  background: #3B82F6;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 16px;
}

.login-button:hover {
  background: #2563EB;
}

.login-button:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}
```

### Social Login Section
```css
.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #9CA3AF;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E5E7EB;
}

.divider span {
  padding: 0 16px;
}

.social-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.social-button {
  flex: 1;
  height: 48px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-button:hover {
  border-color: #D1D5DB;
  background: #F9FAFB;
}
```

---

## React Implementation

```jsx
import React, { useState } from 'react';
import './LoginScreen.css';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Login logic here
      await login(formData);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Social login logic
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        {/* Logo Section */}
        <div className="logo-section">
          <img 
            src="/logo.svg" 
            alt="App Logo" 
            className="logo"
          />
          <h1 className="app-name">MyApp</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="remember-me">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              className="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            <label htmlFor="rememberMe" className="checkbox-label">
              Remember me
            </label>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="forgot-password">
          <a href="/forgot-password" className="forgot-link">
            Forgot your password?
          </a>
        </div>

        {/* Divider */}
        <div className="divider">
          <span>Or continue with</span>
        </div>

        {/* Social Login */}
        <div className="social-buttons">
          <button 
            className="social-button"
            onClick={() => handleSocialLogin('google')}
            type="button"
          >
            <img src="/google-icon.svg" alt="Google" width="24" height="24" />
          </button>
          <button 
            className="social-button"
            onClick={() => handleSocialLogin('apple')}
            type="button"
          >
            <img src="/apple-icon.svg" alt="Apple" width="24" height="24" />
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="signup-link">
          <span>Don't have an account? </span>
          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
```

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance
```css
/* Focus indicators */
.form-input:focus,
.login-button:focus,
.social-button:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .form-input {
    border-width: 3px;
  }
  
  .login-button {
    border: 2px solid white;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

### Screen Reader Support
```jsx
// Add these attributes to the React component
<form onSubmit={handleSubmit} role="form" aria-label="Login form">
  <div className="form-group">
    <label htmlFor="email" className="form-label">
      Email Address <span aria-label="required">*</span>
    </label>
    <input
      id="email"
      name="email"
      type="email"
      required
      className="form-input"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleInputChange}
      aria-describedby="email-error"
      aria-invalid={emailError ? 'true' : 'false'}
    />
    {emailError && (
      <div id="email-error" className="error-message" role="alert">
        {emailError}
      </div>
    )}
  </div>
  
  {/* Similar patterns for other inputs */}
</form>
```

### Mobile Accessibility
```css
/* Touch target sizes */
.login-button,
.social-button,
.checkbox {
  min-height: 44px; /* iOS minimum touch target */
  min-width: 44px;
}

/* Text scaling support */
@media (max-width: 480px) {
  .form-input {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
```

---

## Responsive Design Breakpoints

```css
/* Mobile First (default styles above) */

/* Large mobile / small tablet */
@media (min-width: 480px) {
  .login-container {
    padding: 40px 32px;
  }
}

/* Tablet */
@media (min-width: 768px) {
  .login-screen {
    padding: 40px;
  }
  
  .login-container {
    max-width: 420px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .login-screen {
    background: #F3F4F6;
  }
  
  .login-container {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
}
```

---

## Implementation Checklist

### Phase 1: Basic Structure
- [ ] Create React component with form structure
- [ ] Implement basic CSS styling
- [ ] Add form validation
- [ ] Test keyboard navigation

### Phase 2: Interactive Features  
- [ ] Add social login integration
- [ ] Implement loading states
- [ ] Add error handling and display
- [ ] Test form submission

### Phase 3: Polish & Accessibility
- [ ] Add focus management
- [ ] Implement ARIA labels
- [ ] Test with screen readers
- [ ] Validate color contrast ratios

### Phase 4: Responsive Testing
- [ ] Test on various mobile devices
- [ ] Verify touch targets meet minimum sizes
- [ ] Test landscape orientation
- [ ] Validate tablet and desktop layouts

**Estimated Development Time:** 2-3 days for full implementation
```

---

## Raw-to-Structured Transformation Tools

### Document Processing
```python
# Example: PDF/Word document to structured requirements
import pypdf2
import docx
from ai_service import transform_content

def process_document(file_path):
    # Extract text from document
    if file_path.endswith('.pdf'):
        text = extract_pdf_text(file_path)
    elif file_path.endswith('.docx'):
        text = extract_docx_text(file_path)
    
    # Transform with AI
    structured_output = transform_content(
        content=text,
        output_format="user_stories",
        include_acceptance_criteria=True,
        prioritize=True
    )
    
    return structured_output
```

### Image Analysis
```python
# Screenshot to component specifications
from openai import OpenAI
import base64

def analyze_ui_screenshot(image_path):
    client = OpenAI()
    
    # Encode image
    with open(image_path, "rb") as image_file:
        image_data = base64.b64encode(image_file.read()).decode()
    
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Analyze this UI screenshot and create detailed development specifications including component hierarchy, CSS styles, and React implementation."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{image_data}"
                        }
                    }
                ]
            }
        ]
    )
    
    return response.choices[0].message.content
```

### Audio Transcription
```python
# Voice memos to structured plans
import whisper
from ai_service import structure_content

def process_voice_memo(audio_file):
    # Transcribe audio
    model = whisper.load_model("base")
    result = model.transcribe(audio_file)
    transcript = result["text"]
    
    # Structure the content
    structured_plan = structure_content(
        content=transcript,
        output_type="project_plan",
        include_timeline=True,
        assign_priorities=True
    )
    
    return structured_plan
```

---

## Common Transformation Patterns

### 1. Requirements Gathering
```markdown
# Input Types → Output Format

## Email/Chat Messages → User Stories
- Extract user needs and pain points
- Convert to "As a... I want... So that..." format
- Add acceptance criteria and priority

## Meeting Notes → Action Items
- Identify decisions and commitments
- Assign owners and deadlines
- Track dependencies and risks

## Whiteboard Photos → System Architecture
- Convert sketches to formal diagrams
- Document component relationships
- Create implementation specifications
```

### 2. Design Translation
```markdown
# Visual → Code Specifications

## Screenshots → Component Specs
- Analyze layout and styling
- Generate CSS and HTML/JSX
- Include responsive breakpoints
- Add accessibility requirements

## Mockups → Implementation Plan
- Break down into development tasks
- Estimate effort and timeline
- Identify reusable components
- Plan testing approach
```

### 3. Data Transformation
```markdown
# Unstructured → Structured Data

## Spreadsheets → Database Schema
- Analyze data relationships
- Design normalized tables
- Generate migration scripts
- Create API endpoints

## Text Files → Configuration
- Extract settings and options
- Format as JSON/YAML/ENV
- Add validation rules
- Document usage
```

---

## Transformation Quality Checklist

### Input Preparation
- [ ] Remove sensitive information before processing
- [ ] Ensure input is complete and representative
- [ ] Add context about intended use case
- [ ] Specify desired output format clearly

### Output Validation
- [ ] Check for completeness vs. original input
- [ ] Verify technical accuracy of specifications
- [ ] Ensure actionability of recommendations
- [ ] Validate that structure matches requirements

### Implementation Readiness  
- [ ] Code examples are syntactically correct
- [ ] Specifications include necessary details
- [ ] Dependencies and requirements are clear
- [ ] Timeline and effort estimates are realistic

Remember: The key to successful raw-to-structured transformation is providing clear context about your desired output format and intended use. The more specific your transformation request, the better the structured result!