# Skill 2: Decomposition

Breaking complex tasks into digestible steps. The AI works better with focused requests.

## The Anti-Pattern: The Mega Prompt

**Don't do this:**
```
Build me a complete e-commerce website with user authentication,
product catalog, shopping cart, payment processing with Stripe,
admin dashboard, inventory management, email notifications,
analytics tracking, and mobile responsive design.
```

This will either:
- Produce overwhelming, incomplete code
- Miss critical details in each feature
- Create inconsistent architecture
- Be impossible to debug

---

## The Pattern: Step-by-Step

**Do this instead:**

### Step 1: Database Schema
```
Design a PostgreSQL database schema for an e-commerce site.
Include tables for: users, products, orders, order_items
Show the relationships and key constraints.
```

### Step 2: Authentication
```
Based on this schema [paste schema], create user authentication
endpoints in Express.js:
- POST /auth/register
- POST /auth/login
- POST /auth/logout
Use JWT tokens, bcrypt for passwords.
```

### Step 3: Product Catalog
```
Add product management to my Express app:
- GET /products (with pagination)
- GET /products/:id
- POST /products (admin only)
Use the existing auth middleware from [previous code].
```

### Step 4: Shopping Cart
```
Implement shopping cart functionality:
- Cart stored in user session
- Add/remove/update quantities
- Calculate totals with tax
Connect to the products API we created.
```

---

## When to Decompose

| Scenario | Decompose? | Why |
|----------|------------|-----|
| Single function | No | One focused task |
| CRUD operations | Maybe | If complex relationships |
| Full feature | Yes | Multiple moving parts |
| Architecture | Always | Sequential dependencies |
| Refactoring | Yes | Risk reduction |

---

## Decomposition Templates

### For Features
```
1. Design the data model
2. Create the backend API
3. Build the frontend UI
4. Connect and test
5. Handle edge cases
```

### For Debugging
```
1. Reproduce the error
2. Identify the failing component
3. Isolate the root cause
4. Implement the fix
5. Verify no regressions
```

### For Refactoring
```
1. Understand current implementation
2. Write tests for existing behavior
3. Plan the new structure
4. Migrate piece by piece
5. Verify tests still pass
```

---

## Live Demo

Build a "URL shortener" step by step:

**Step 1:** "Design a simple database schema for a URL shortener. Store original URL, short code, click count, and creation date."

**Step 2:** "Create the shortcode generation function. Use base62 encoding, generate 6-character codes, ensure uniqueness."

**Step 3:** "Build the Express endpoints: POST /shorten (create), GET /:code (redirect), GET /stats/:code (analytics)."

**Step 4:** "Add rate limiting and validation. Max 100 URLs per IP per hour, validate URL format."

Each step builds on the previous, creating a complete, understandable system.
