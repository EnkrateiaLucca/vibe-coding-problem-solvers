# Vibe Checking Practice Scenarios

## How to Use This Practice Guide

Each scenario presents an AI-generated output. Practice your vibe checking skills by:

1. **Initial gut reaction** - What's your first impression?
2. **Quick checks** - What would you verify in 30 seconds?
3. **Decision** - Ship it, fix it, or deeper review?
4. **Compare** - Check your assessment against the provided analysis

---

## Scenario 1: Express.js API Route

**Context:** Asked AI to create a user registration endpoint

**AI Output:**
```javascript
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  // Create user
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name
  });
  
  // Generate JWT token
  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.status(201).json({
    message: 'User created successfully',
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    }
  });
});
```

### Your Vibe Check
**Initial Reaction:** _______________
**30-Second Checks:** _______________
**Decision:** _______________

<details>
<summary>🔍 Analysis</summary>

**Green Flags:**
- Has input validation
- Checks for existing users
- Hashes passwords properly
- Returns appropriate status codes
- Uses environment variables for secrets

**Red Flags:**
- No input validation (empty email/password)
- No try-catch error handling
- Password returned in response (security issue)
- No rate limiting considerations

**Vibe Check Result:** ⚠️ Good foundation but needs error handling and input validation

**Quick Fixes Needed:** Add try-catch, validate inputs, remove password from response

**Decision:** Fix first before shipping
</details>

---

## Scenario 2: Data Processing Function

**Context:** Asked AI to process user CSV data and convert to JSON

**AI Output:**
```javascript
async function processUserData(csvFilePath) {
  const results = [];
  const stream = fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      const user = {
        id: parseInt(data.user_id),
        name: data.first_name + ' ' + data.last_name,
        email: data.email_address.toLowerCase(),
        age: parseInt(data.age),
        joinDate: new Date(data.created_at).toISOString(),
        isActive: data.status === 'active'
      };
      results.push(user);
    })
    .on('end', () => {
      console.log(`Processed ${results.length} users`);
      return results;
    });
  
  return new Promise((resolve) => {
    stream.on('end', () => resolve(results));
  });
}
```

### Your Vibe Check
**Initial Reaction:** _______________
**30-Second Checks:** _______________
**Decision:** _______________

<details>
<summary>🔍 Analysis</summary>

**Green Flags:**
- Uses streaming for memory efficiency
- Proper data transformations
- Handles async properly with Promise
- Logs progress

**Red Flags:**
- No error handling for invalid data
- No validation (what if age is NaN?)
- Assumes data structure without checking
- No handling of malformed CSV
- Missing error event handler

**Vibe Check Result:** ❌ Will crash on bad data

**Quick Test:** Try with a malformed CSV - would it handle gracefully?

**Decision:** Fix error handling before using with real data
</details>

---

## Scenario 3: React Component

**Context:** Asked AI to create a user profile component

**AI Output:**
```jsx
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError('Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={`${user.name}'s avatar`} />
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

export default UserProfile;
```

### Your Vibe Check
**Initial Reaction:** _______________
**30-Second Checks:** _______________
**Decision:** _______________

<details>
<summary>🔍 Analysis</summary>

**Green Flags:**
- Proper loading/error states
- Clean component structure
- Handles async properly
- Good error handling pattern
- Reasonable UI elements

**Yellow Flags:**
- No response.ok check (could be 404/500)
- Avatar might fail to load (no fallback)
- No PropTypes or TypeScript
- Date formatting could fail on invalid dates

**Vibe Check Result:** ✅ Good for prototype, minor improvements for production

**Quick Test:** Check if it renders without errors in browser

**Decision:** Ship for prototype, add error boundary for production
</details>

---

## Scenario 4: Database Query

**Context:** Asked AI to create a query for user analytics

**AI Output:**
```sql
SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(p.id) as post_count,
  COUNT(c.id) as comment_count,
  AVG(p.likes) as avg_likes,
  MAX(p.created_at) as last_post,
  u.created_at as user_since
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
LEFT JOIN comments c ON u.id = c.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name, u.email, u.created_at
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC
LIMIT 100;
```

### Your Vibe Check
**Initial Reaction:** _______________
**30-Second Checks:** _______________
**Decision:** _______________

<details>
<summary>🔍 Analysis</summary>

**Green Flags:**
- Proper JOINs for related data
- Uses aggregation functions correctly
- Includes reasonable WHERE clause
- LIMITs results appropriately
- Good column selection

**Red Flags:**
- Could be very slow on large tables
- No indexes mentioned
- HAVING clause excludes users with no posts (might not be intended)
- Date format might not match database

**Vibe Check Result:** ⚠️ Logical but potentially slow

**Quick Test:** EXPLAIN the query to check execution plan

**Decision:** Review with DBA before running on production data
</details>

---

## Scenario 5: Python Data Analysis

**Context:** Asked AI to analyze sales data and find trends

**AI Output:**
```python
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

def analyze_sales_trends(data_file):
    # Load data
    df = pd.read_csv(data_file)
    
    # Convert date column
    df['date'] = pd.to_datetime(df['sale_date'])
    df['month'] = df['date'].dt.to_period('M')
    
    # Calculate monthly sales
    monthly_sales = df.groupby('month')['amount'].sum()
    
    # Calculate growth rate
    growth_rate = monthly_sales.pct_change() * 100
    
    # Create visualization
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8))
    
    # Sales trend
    monthly_sales.plot(ax=ax1, title='Monthly Sales')
    ax1.set_ylabel('Sales Amount ($)')
    
    # Growth rate
    growth_rate.plot(ax=ax2, title='Month-over-Month Growth Rate')
    ax2.set_ylabel('Growth Rate (%)')
    ax2.axhline(y=0, color='red', linestyle='--')
    
    plt.tight_layout()
    plt.savefig('sales_analysis.png')
    plt.show()
    
    # Print summary
    print(f"Total sales: ${monthly_sales.sum():,.2f}")
    print(f"Average monthly sales: ${monthly_sales.mean():,.2f}")
    print(f"Best month: {monthly_sales.idxmax()} (${monthly_sales.max():,.2f})")
    print(f"Average growth rate: {growth_rate.mean():.1f}%")
    
    return {
        'monthly_sales': monthly_sales,
        'growth_rate': growth_rate,
        'summary': {
            'total': monthly_sales.sum(),
            'average': monthly_sales.mean(),
            'best_month': monthly_sales.idxmax()
        }
    }
```

### Your Vibe Check
**Initial Reaction:** _______________
**30-Second Checks:** _______________
**Decision:** _______________

<details>
<summary>🔍 Analysis</summary>

**Green Flags:**
- Good pandas usage patterns
- Proper date handling
- Clear visualizations
- Returns both plots and data
- Reasonable summary statistics

**Yellow Flags:**
- No error handling for missing/invalid data
- Assumes specific column names
- No data validation
- Could crash on empty dataset
- No handling of missing dates

**Vibe Check Result:** ✅ Good for exploration, needs validation for production

**Quick Test:** Try with a small sample CSV

**Decision:** Use for initial analysis, add error handling for production
</details>

---

## Quick Vibe Check Exercises

For each output, spend only 30 seconds and decide: ✅ Ship it, ⚠️ Fix first, ❌ Reject

### Exercise 1: Password Validation
```javascript
function validatePassword(password) {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[0-9]/.test(password);
}
```
**Your decision:** _______________

### Exercise 2: API Response
```json
{
  "status": "success",
  "data": {
    "users": [
      {"id": 1, "name": "John", "email": "john@example.com"},
      {"id": 2, "name": "Jane", "email": "jane@example.com"}
    ],
    "total": 2,
    "page": 1,
    "limit": 10
  }
}
```
**Your decision:** _______________

### Exercise 3: CSS Styling
```css
.user-card {
  width: 300px;
  padding: 20px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-card h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.user-card p {
  margin: 5px 0;
  color: #666;
}
```
**Your decision:** _______________

<details>
<summary>Quick Answers</summary>

1. **Password Validation:** ⚠️ Fix first - missing special character requirement, no null check
2. **API Response:** ✅ Ship it - proper structure, reasonable data
3. **CSS Styling:** ✅ Ship it - clean, standard patterns, good practices
</details>

---

## Building Your Vibe Check Speed

### Day 1-3: Methodical Practice
- Use the full checklist
- Time yourself
- Note what takes longest

### Day 4-7: Pattern Recognition
- Focus on common issues
- Develop quick shortcuts
- Trust your instincts more

### Week 2: Speed Building
- 30-second max per check
- Focus on critical issues only
- Build personal shortcuts

### Week 3: Intuition Development
- Trust first impressions
- Quick validation only
- Learn from misses

---

## Personal Vibe Check Development

Track your progress:

```markdown
## Week 1 Assessment
- Average vibe check time: ___ minutes
- Accuracy rate: ___% (issues caught vs missed)
- Most common missed issues: ___________
- Biggest time wasters: ___________

## Week 2 Assessment  
- Average vibe check time: ___ minutes
- Accuracy rate: ___%
- Improvement areas: ___________
- New patterns noticed: ___________

## Week 4 Assessment
- Average vibe check time: ___ minutes
- Accuracy rate: ___%
- Confidence level (1-10): ___
- Ready for production use: Yes/No
```

Remember: The goal is not perfect accuracy, but efficient risk management. A good vibe check catches 80% of issues with 20% of the effort!