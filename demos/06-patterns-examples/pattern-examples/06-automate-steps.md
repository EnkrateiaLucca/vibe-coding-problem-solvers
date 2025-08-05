# Pattern 6: Automate Repeatable Steps - Efficiency Through Scripts

## The Repetition Recognition Pattern

When you find yourself doing the same multi-step process repeatedly, it's time to automate. This pattern transforms manual workflows into reusable scripts.

---

## Example 1: React Component Generation

### The Manual Process (Repeated 50+ times)
1. Create component folder
2. Create component file with boilerplate
3. Create TypeScript interface file
4. Create CSS module file
5. Create test file with basic tests
6. Update index.ts to export component
7. Add component to Storybook

**Time per component**: 10-15 minutes
**Total time for 50 components**: 8-12 hours

### The Automation Solution

#### Step 1: Identify the Pattern
```
"I keep creating React components with the same structure. Can you help me create a script that automates:

1. Creating the folder structure: components/[ComponentName]/
2. Generating the component file with TypeScript
3. Creating the interface/types file
4. Adding CSS module file
5. Creating basic test file with React Testing Library
6. Updating index files for exports
7. Adding Storybook story file

The pattern should be consistent across all components."
```

#### Step 2: AI Generates Automation Script
```python
#!/usr/bin/env python3
"""
React Component Generator
Creates a complete React component with all necessary files.

Usage: python create-component.py ComponentName
"""

import os
import sys
from pathlib import Path

def create_component(component_name):
    # Validate component name
    if not component_name[0].isupper():
        print("❌ Component name must start with uppercase letter")
        return False
    
    # Define paths
    components_dir = Path("src/components")
    component_dir = components_dir / component_name
    
    # Check if component already exists
    if component_dir.exists():
        print(f"❌ Component {component_name} already exists")
        return False
    
    # Create directory
    component_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate component file
    component_tsx = f"""import React from 'react';
import {{ {component_name}Props }} from './{component_name}.types';
import styles from './{component_name}.module.css';

const {component_name}: React.FC<{component_name}Props> = ({{
  children,
  className = '',
  ...props
}}) => {{
  return (
    <div 
      className={{`${{styles.{component_name.lower()}}} ${{className}}`.trim()}}
      {{...props}}
    >
      {{children || '{component_name} Component'}}
    </div>
  );
}};

export default {component_name};
"""
    
    # Generate types file
    types_ts = f"""export interface {component_name}Props {{
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}}
"""
    
    # Generate CSS module
    css_module = f""".{component_name.lower()} {{
  /* Add your styles here */
  display: block;
}}
"""
    
    # Generate test file
    test_tsx = f"""import {{ render, screen }} from '@testing-library/react';
import {component_name} from './{component_name}';

describe('{component_name}', () => {{
  it('renders without crashing', () => {{
    render(<{component_name} />);
    expect(screen.getByText('{component_name} Component')).toBeInTheDocument();
  }});

  it('accepts custom className', () => {{
    render(<{component_name} className="custom-class" />);
    const element = screen.getByText('{component_name} Component');
    expect(element).toHaveClass('custom-class');
  }});

  it('renders children when provided', () => {{
    render(<{component_name}>Custom Content</{component_name}>);
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  }});
}});
"""
    
    # Generate Storybook story
    story_tsx = f"""import type {{ Meta, StoryObj }} from '@storybook/react';
import {component_name} from './{component_name}';

const meta: Meta<typeof {component_name}> = {{
  title: 'Components/{component_name}',
  component: {component_name},
  parameters: {{
    layout: 'centered',
  }},
  tags: ['autodocs'],
  argTypes: {{
    className: {{
      control: 'text',
    }},
  }},
}};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {{
  args: {{}},
}};

export const WithCustomContent: Story = {{
  args: {{
    children: 'Custom content for {component_name}',
  }},
}};

export const WithClassName: Story = {{
  args: {{
    className: 'custom-styling',
  }},
}};
"""
    
    # Write files
    files_to_create = [
        (component_dir / f"{component_name}.tsx", component_tsx),
        (component_dir / f"{component_name}.types.ts", types_ts),
        (component_dir / f"{component_name}.module.css", css_module),
        (component_dir / f"{component_name}.test.tsx", test_tsx),
        (component_dir / f"{component_name}.stories.tsx", story_tsx),
    ]
    
    for file_path, content in files_to_create:
        file_path.write_text(content)
        print(f"✅ Created {file_path}")
    
    # Update index.ts
    index_file = components_dir / "index.ts"
    export_line = f"export {{ default as {component_name} }} from './{component_name}/{component_name}';\n"
    
    if index_file.exists():
        # Add to existing index
        with open(index_file, 'a') as f:
            f.write(export_line)
    else:
        # Create new index
        index_file.write_text(export_line)
    
    print(f"✅ Updated {index_file}")
    print(f"🎉 Component {component_name} created successfully!")
    print(f"📁 Location: {component_dir}")
    
    return True

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python create-component.py ComponentName")
        sys.exit(1)
    
    component_name = sys.argv[1]
    success = create_component(component_name)
    
    if success:
        print("\n🚀 Next steps:")
        print(f"1. Customize the styles in {component_name}.module.css")
        print(f"2. Add your component logic to {component_name}.tsx") 
        print(f"3. Update the types in {component_name}.types.ts")
        print(f"4. Run tests: npm test {component_name}")
        print(f"5. View in Storybook: npm run storybook")
```

#### Step 3: Usage and Time Savings
```bash
# Before: 10-15 minutes of manual work
# After: 30 seconds

python create-component.py UserProfile
python create-component.py ProductCard  
python create-component.py CheckoutForm
```

**Time saved**: 90% reduction (15 minutes → 30 seconds per component)
**Quality improvement**: Consistent structure, no forgotten files
**Error reduction**: No typos, consistent naming conventions

---

## Example 2: Database Migration Generation

### The Manual Process
1. Create migration file with timestamp
2. Write up/down SQL scripts
3. Add to migration index
4. Test locally
5. Update schema documentation
6. Create rollback plan

### The Automated Solution

#### AI-Generated Migration Script
```python
#!/usr/bin/env python3
"""
Database Migration Generator
Creates database migrations with proper structure and documentation.

Usage: python create-migration.py "add_user_preferences_table"
"""

import os
import sys
from datetime import datetime
from pathlib import Path

def create_migration(description):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    migration_name = f"{timestamp}_{description}"
    migrations_dir = Path("migrations")
    migrations_dir.mkdir(exist_ok=True)
    
    # Generate migration file
    migration_content = f'''-- Migration: {migration_name}
-- Description: {description.replace('_', ' ').title()}
-- Created: {datetime.now().isoformat()}

-- +migrate Up
-- Add your SQL statements here
-- Example:
-- CREATE TABLE example (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- +migrate Down
-- Add rollback SQL statements here
-- Example:
-- DROP TABLE IF EXISTS example;

-- Notes:
-- - Always test migrations locally first
-- - Consider data migration for existing records
-- - Update schema documentation after applying
-- - Plan rollback strategy for production
'''
    
    migration_file = migrations_dir / f"{migration_name}.sql"
    migration_file.write_text(migration_content)
    
    # Update migration index
    index_file = migrations_dir / "index.txt"
    with open(index_file, 'a') as f:
        f.write(f"{migration_name}.sql\n")
    
    # Create documentation template
    docs = f'''# Migration: {description.replace('_', ' ').title()}

## Overview
Brief description of what this migration does.

## Changes
- [ ] Table changes
- [ ] Index changes  
- [ ] Data changes
- [ ] Constraint changes

## Testing Checklist
- [ ] Migration runs successfully
- [ ] Rollback works correctly
- [ ] Application still functions
- [ ] Performance impact assessed

## Deployment Notes
- Estimated downtime: [X minutes]
- Dependencies: [Other migrations/deployments]
- Rollback plan: [Steps to rollback]

## SQL Statements

### Up Migration
```sql
-- Add your UP migration SQL here
```

### Down Migration  
```sql
-- Add your DOWN migration SQL here
```
'''
    
    docs_file = migrations_dir / f"{migration_name}_docs.md"
    docs_file.write_text(docs)
    
    print(f"✅ Created migration: {migration_file}")
    print(f"✅ Created documentation: {docs_file}")
    print(f"✅ Updated index: {index_file}")
    
    print(f"\n🚀 Next steps:")
    print(f"1. Edit {migration_file} with your SQL")
    print(f"2. Fill out documentation in {docs_file}")
    print(f"3. Test migration: ./run-migration.sh {migration_name}")
    print(f"4. Test rollback: ./rollback-migration.sh {migration_name}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python create-migration.py 'description_of_migration'")
        sys.exit(1)
    
    description = sys.argv[1].lower().replace(' ', '_')
    create_migration(description)
```

---

## Example 3: API Endpoint Testing Automation

### The Repetitive Testing Process
1. Write endpoint code
2. Create test data
3. Write unit tests
4. Write integration tests
5. Test with Postman/curl
6. Document API endpoint
7. Update API docs

### The Automated Test Generator

```python
#!/usr/bin/env python3
"""
API Endpoint Test Generator
Creates comprehensive tests for API endpoints.

Usage: python create-api-tests.py UserController getUsers
"""

import sys
from pathlib import Path

def create_api_tests(controller_name, endpoint_name):
    # Generate comprehensive test suite
    test_content = f'''import {{ describe, it, expect, beforeEach, afterEach }} from 'vitest';
import {{ supertest }} from 'supertest';
import app from '../app';
import {{ setupTestDB, cleanupTestDB }} from '../test-utils/db';
import {{ createTestUser, createTestData }} from '../test-utils/factories';

const request = supertest(app);

describe('{controller_name} - {endpoint_name}', () => {{
  beforeEach(async () => {{
    await setupTestDB();
  }});

  afterEach(async () => {{
    await cleanupTestDB();  
  }});

  describe('GET /{endpoint_name.lower()}', () => {{
    it('should return 200 and list of {endpoint_name.lower()}', async () => {{
      // Arrange
      const testData = await createTestData({endpoint_name.lower()}: 3);
      
      // Act
      const response = await request
        .get('/{endpoint_name.lower()}')
        .expect(200);
      
      // Assert
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveLength(3);
      expect(response.body).toHaveProperty('pagination');
    }});

    it('should handle pagination correctly', async () => {{
      await createTestData({endpoint_name.lower()}: 25);
      
      const response = await request
        .get('/{endpoint_name.lower()}?page=2&limit=10')
        .expect(200);
        
      expect(response.body.data).toHaveLength(10);
      expect(response.body.pagination.page).toBe(2);
    }});

    it('should handle empty results', async () => {{
      const response = await request
        .get('/{endpoint_name.lower()}')
        .expect(200);
        
      expect(response.body.data).toHaveLength(0);
    }});

    it('should require authentication', async () => {{
      await request
        .get('/{endpoint_name.lower()}')
        .expect(401);
    }});

    it('should handle invalid query parameters', async () => {{
      const response = await request
        .get('/{endpoint_name.lower()}?limit=invalid')
        .expect(400);
        
      expect(response.body).toHaveProperty('error');
    }});
  }});

  describe('POST /{endpoint_name.lower()}', () => {{
    const validPayload = {{
      // Add valid payload properties
    }};

    it('should create new {endpoint_name.lower()[:-1]} successfully', async () => {{
      const response = await request
        .post('/{endpoint_name.lower()}')
        .send(validPayload)
        .expect(201);
        
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(validPayload.name);
    }});

    it('should validate required fields', async () => {{
      const response = await request
        .post('/{endpoint_name.lower()}')
        .send({{}})
        .expect(400);
        
      expect(response.body.errors).toContain('name is required');
    }});
  }});

  describe('Error Handling', () => {{
    it('should handle server errors gracefully', async () => {{
      // Simulate server error condition
      const response = await request
        .get('/{endpoint_name.lower()}/invalid-id')
        .expect(500);
        
      expect(response.body).toHaveProperty('error');
    }});
  }});
}});
'''
    
    # Create test file
    test_dir = Path("tests/api")
    test_dir.mkdir(parents=True, exist_ok=True)
    test_file = test_dir / f"{controller_name.lower()}.{endpoint_name.lower()}.test.ts"
    test_file.write_text(test_content)
    
    # Generate Postman collection
    postman_collection = f'''{{
  "info": {{
    "name": "{controller_name} API Tests",
    "description": "Generated API tests for {endpoint_name}",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  }},
  "item": [
    {{
      "name": "Get {endpoint_name}",
      "request": {{
        "method": "GET",
        "header": [
          {{
            "key": "Authorization",
            "value": "Bearer {{{{auth_token}}}}"
          }}
        ],
        "url": {{
          "raw": "{{{{base_url}}}}/{endpoint_name.lower()}",
          "host": ["{{{{base_url}}}}"],
          "path": ["{endpoint_name.lower()}"]
        }}
      }},
      "event": [
        {{
          "listen": "test",
          "script": {{
            "exec": [
              "pm.test('Status code is 200', function () {{",
              "    pm.response.to.have.status(200);",
              "}});",
              "",
              "pm.test('Response has data array', function () {{",
              "    pm.expect(pm.response.json()).to.have.property('data');",
              "}});"
            ]
          }}
        }}
      ]
    }}
  ]
}}'''
    
    postman_file = test_dir / f"{controller_name.lower()}.postman.json"
    postman_file.write_text(postman_collection)
    
    print(f"✅ Created test file: {test_file}")
    print(f"✅ Created Postman collection: {postman_file}")
    print(f"\n🚀 Next steps:")
    print(f"1. Customize test data in {test_file}")
    print(f"2. Run tests: npm test {test_file}")
    print(f"3. Import Postman collection for manual testing")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python create-api-tests.py ControllerName endpointName")
        sys.exit(1)
    
    controller_name = sys.argv[1]
    endpoint_name = sys.argv[2]
    create_api_tests(controller_name, endpoint_name)
```

---

## Example 4: Deployment Automation

### Manual Deployment Steps
1. Run tests locally
2. Build production bundle
3. Update version numbers
4. Create git tag
5. Push to repository
6. Deploy to staging
7. Run smoke tests
8. Deploy to production
9. Update documentation
10. Notify team

### Automated Deployment Script

```bash
#!/bin/bash
# deploy.sh - Automated deployment script
# Usage: ./deploy.sh [staging|production]

set -e  # Exit on any error

ENVIRONMENT=${1:-staging}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BRANCH=$(git branch --show-current)

echo "🚀 Starting deployment to $ENVIRONMENT"
echo "📋 Branch: $BRANCH"
echo "⏰ Timestamp: $TIMESTAMP"

# Pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# Check if we're on main branch for production
if [[ "$ENVIRONMENT" == "production" && "$BRANCH" != "main" ]]; then
    echo "❌ Production deployments must be from main branch"
    exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "❌ You have uncommitted changes"
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
npm test -- --run --coverage || {
    echo "❌ Tests failed"
    exit 1
}

# Run linting
echo "🔍 Running linter..."
npm run lint || {
    echo "❌ Linting failed"
    exit 1
}

# Build application
echo "🏗️ Building application..."
npm run build || {
    echo "❌ Build failed"
    exit 1
}

# Version bump for production
if [[ "$ENVIRONMENT" == "production" ]]; then
    echo "📈 Bumping version..."
    npm version patch
    NEW_VERSION=$(node -p "require('./package.json').version")
    echo "🏷️ New version: $NEW_VERSION"
fi

# Create deployment tag
DEPLOY_TAG="deploy-$ENVIRONMENT-$TIMESTAMP"
git tag $DEPLOY_TAG
echo "🏷️ Created tag: $DEPLOY_TAG"

# Push changes
echo "📤 Pushing to repository..."
git push origin $BRANCH
git push origin --tags

# Deploy based on environment
if [[ "$ENVIRONMENT" == "staging" ]]; then
    echo "🚧 Deploying to staging..."
    # Add staging deployment commands
    npm run deploy:staging
elif [[ "$ENVIRONMENT" == "production" ]]; then
    echo "🌟 Deploying to production..."
    # Add production deployment commands
    npm run deploy:production
fi

# Post-deployment verification
echo "✅ Running post-deployment checks..."
sleep 30  # Wait for deployment to stabilize

# Health check
if [[ "$ENVIRONMENT" == "staging" ]]; then
    HEALTH_URL="https://staging.myapp.com/health"
else
    HEALTH_URL="https://myapp.com/health"
fi

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)
if [[ "$HTTP_STATUS" == "200" ]]; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed (HTTP $HTTP_STATUS)"
    exit 1
fi

# Notify team
echo "📢 Notifying team..."
curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"🚀 Successfully deployed to $ENVIRONMENT (version $NEW_VERSION)\"}" \
    $SLACK_WEBHOOK_URL

echo "🎉 Deployment to $ENVIRONMENT completed successfully!"
echo "🔗 URL: $HEALTH_URL"
echo "🏷️ Tag: $DEPLOY_TAG"
```

---

## Automation Success Patterns

### Pattern 1: Template + Parameters
```python
def generate_from_template(template_name, **params):
    template = load_template(template_name)
    return template.render(**params)

# Usage
generate_from_template('component', 
    name='UserProfile',
    has_state=True,
    needs_api=False
)
```

### Pattern 2: Interactive Wizards
```python
def interactive_setup():
    component_name = input("Component name: ")
    needs_api = input("Needs API integration? (y/n): ").lower() == 'y'
    styling = input("Styling approach (css/styled/emotion): ")
    
    create_component(component_name, needs_api, styling)
```

### Pattern 3: Configuration-Driven
```yaml
# component-config.yaml
component:
  name: UserProfile
  type: functional
  props:
    - name: user
      type: User
      required: true
    - name: onEdit
      type: function
      required: false
  styling: css-modules
  tests: true
  storybook: true
```

---

## Tools for Building Automation

### Python Scripts
- **Pros**: Great for file manipulation, cross-platform
- **Cons**: Requires Python installation
- **Best for**: Complex logic, data processing

### Shell Scripts
- **Pros**: Native on Unix systems, simple syntax
- **Cons**: Platform-specific, limited error handling
- **Best for**: System operations, deployment

### Node.js Scripts
- **Pros**: Already available in web projects, JSON handling
- **Cons**: Async complexity for simple tasks
- **Best for**: Web development automation

### Makefiles
- **Pros**: Dependency management, widely supported
- **Cons**: Syntax can be tricky, tab-sensitive
- **Best for**: Build processes, task runners

---

## Measuring Automation Success

### Time Savings
```
Manual time: 15 minutes × 50 components = 12.5 hours
Automated time: 30 seconds × 50 components = 25 minutes
Time saved: 12.25 hours (96% reduction)
```

### Quality Improvements
- **Consistency**: All components follow same patterns
- **Completeness**: No forgotten files or steps
- **Accuracy**: No typos or naming inconsistencies
- **Best practices**: Enforced through templates

### Team Adoption Metrics
- Usage frequency (scripts run per week)
- Team member adoption rate
- Error reduction in generated code
- Time to onboard new team members

---

## Common Automation Mistakes

### Mistake 1: Over-Engineering
```
❌ Creating a complex framework for simple tasks
✅ Simple scripts that solve immediate problems
```

### Mistake 2: Under-Parameterizing
```
❌ Hard-coded values that limit reusability
✅ Configurable parameters for different use cases
```

### Mistake 3: No Error Handling
```
❌ Scripts that fail silently or cryptically
✅ Clear error messages and graceful failure
```

### Mistake 4: Poor Documentation
```
❌ Scripts without usage examples
✅ Clear usage instructions and examples
```

---

## Building Your Automation Library

### Week 1: Identify Patterns
- Track repetitive tasks for one week
- Note tasks that take > 5 minutes
- Look for 3+ step processes

### Week 2: Create First Automation
- Pick the most frequent/annoying task
- Create simple script with AI help
- Test thoroughly before sharing

### Week 3: Refine and Share
- Add error handling and documentation
- Share with team for feedback
- Create usage examples

### Week 4: Expand Library
- Automate 2-3 more common tasks
- Create templates for different scenarios
- Document patterns for future automation

Remember: The best automation is the one that gets used. Start simple and improve based on real usage!