# Vibe Checking Checklist

## The Philosophy of Vibe Checking

**Vibe checking** is smart verification that's simpler than the original task. It's about catching major issues quickly without getting bogged down in perfectionism.

## Universal Vibe Check Questions

Before diving into specific checks, ask these universal questions:

1. **Does this feel right?** Trust your intuition
2. **Is it roughly what I expected?** Major deviations are red flags
3. **Would I be comfortable showing this to a colleague?** Social proof test
4. **If this broke, would I be embarrassed?** Stakes assessment

---

## Code Generation Vibe Checks

### ✅ Green Flags
- [ ] Code runs without syntax errors
- [ ] Basic functionality works as expected
- [ ] Reasonable number of lines (not 10x longer than expected)
- [ ] Uses familiar patterns and libraries
- [ ] Includes error handling where expected
- [ ] Variable/function names make sense
- [ ] Consistent code style throughout

### 🚩 Red Flags
- [ ] Syntax errors or won't run
- [ ] Dramatically different size than expected (10KB → 1MB)
- [ ] Uses deprecated or unknown libraries
- [ ] No error handling in critical paths
- [ ] Obvious security vulnerabilities (plain text passwords)
- [ ] Overly complex for simple tasks
- [ ] Copy-pasted boilerplate with wrong names

### Quick Vibe Checks for Code
```bash
# 1. Does it run?
node app.js  # Should start without errors

# 2. Basic smoke test
curl localhost:3000/health  # Should return 200

# 3. Code size check
wc -l *.js  # Reasonable line counts?

# 4. Dependency check
npm ls --depth=0  # Any unknown packages?
```

---

## Data Processing Vibe Checks

### ✅ Green Flags
- [ ] Output count matches expected range (±10%)
- [ ] Data types are consistent
- [ ] No obvious formatting issues
- [ ] Sample records look correct
- [ ] File sizes are reasonable
- [ ] Processing time seems normal

### 🚩 Red Flags  
- [ ] Drastically wrong count (expected 1000, got 10)
- [ ] Mixed data types where consistency expected
- [ ] Obvious data corruption (names like "undefined undefined")
- [ ] Impossible values (negative ages, future dates)
- [ ] Suspiciously perfect data (all values exactly the same)

### Quick Vibe Checks for Data
```bash
# 1. Count check
wc -l output.csv  # Reasonable number?

# 2. Sample check
head -10 output.csv  # Does structure look right?

# 3. Basic stats
cut -d',' -f2 output.csv | sort | uniq -c  # Value distribution?

# 4. Size check
ls -lh output.csv  # File size reasonable?
```

---

## API Integration Vibe Checks

### ✅ Green Flags
- [ ] Returns expected HTTP status codes
- [ ] Response structure matches documentation
- [ ] Authentication works
- [ ] Rate limiting behaves properly
- [ ] Error responses are handled
- [ ] Timeouts are reasonable

### 🚩 Red Flags
- [ ] Always returns 200 (even for errors)
- [ ] Response structure completely different
- [ ] Authentication bypassed or hardcoded
- [ ] No rate limiting consideration
- [ ] Crashes on network errors
- [ ] Infinite timeout values

### Quick Vibe Checks for APIs
```bash
# 1. Health check
curl -I https://api.example.com/health

# 2. Basic authentication
curl -H "Authorization: Bearer fake" https://api.example.com/users

# 3. Error handling
curl https://api.example.com/nonexistent

# 4. Response structure
curl https://api.example.com/users | jq keys
```

---

## UI/Frontend Vibe Checks

### ✅ Green Flags
- [ ] Page loads without console errors
- [ ] Basic interactions work (clicks, forms)
- [ ] Responsive on mobile/desktop
- [ ] Reasonable loading times
- [ ] Images/assets load correctly
- [ ] Text is readable and properly aligned

### 🚩 Red Flags
- [ ] Console full of JavaScript errors
- [ ] Buttons don't respond to clicks
- [ ] Layout broken on mobile
- [ ] Extremely slow loading (>5 seconds)
- [ ] Broken images or missing assets
- [ ] Text overlap or unreadable fonts

### Quick Vibe Checks for UI
```javascript
// 1. Console check
console.clear(); 
// Navigate around, check for errors

// 2. Responsive check
// Resize browser window

// 3. Interaction check
// Click main buttons/links

// 4. Form check
// Try submitting a form
```

---

## Database Query Vibe Checks

### ✅ Green Flags
- [ ] Query executes without errors
- [ ] Returns expected row count
- [ ] Performance is reasonable
- [ ] Data types match expectations
- [ ] No obvious N+1 problems
- [ ] Proper use of indexes

### 🚩 Red Flags
- [ ] Query syntax errors
- [ ] Returns wildly wrong count
- [ ] Takes extremely long (>30 seconds for simple queries)
- [ ] Data types don't match schema
- [ ] Obvious performance issues
- [ ] Missing WHERE clauses on large tables

### Quick Vibe Checks for Queries
```sql
-- 1. Execution check
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

-- 2. Count check
SELECT COUNT(*) FROM users;  -- Expected range?

-- 3. Sample check
SELECT * FROM users LIMIT 5;  -- Data looks right?

-- 4. Performance check
-- Note execution time in query tool
```

---

## Test Generation Vibe Checks

### ✅ Green Flags
- [ ] Tests run and pass
- [ ] Cover main functionality
- [ ] Include edge cases
- [ ] Assertions make sense
- [ ] Test names are descriptive
- [ ] Setup/teardown is proper

### 🚩 Red Flags
- [ ] Tests don't run or all fail
- [ ] Only happy path testing
- [ ] No edge case coverage
- [ ] Meaningless assertions (assertTrue(true))
- [ ] Vague test names
- [ ] No cleanup (memory leaks in tests)

### Quick Vibe Checks for Tests
```bash
# 1. Run tests
npm test  # Do they pass?

# 2. Coverage check
npm run test:coverage  # Reasonable coverage?

# 3. Test count
find . -name "*.test.js" | xargs wc -l  # Enough tests?

# 4. Speed check
time npm test  # Run in reasonable time?
```

---

## Configuration/Setup Vibe Checks

### ✅ Green Flags
- [ ] Configuration files are valid JSON/YAML
- [ ] Required environment variables are documented
- [ ] Default values are sensible
- [ ] No hardcoded secrets
- [ ] Comments explain non-obvious settings

### 🚩 Red Flags
- [ ] Invalid syntax in config files
- [ ] Missing required configuration
- [ ] Hardcoded production URLs in dev config
- [ ] Plain text secrets in files
- [ ] No documentation for settings

### Quick Vibe Checks for Config
```bash
# 1. Syntax check
json_verify < config.json  # Valid JSON?

# 2. Required vars check
grep -r "process.env" src/  # All documented?

# 3. Secret scan
grep -r "password\|secret\|key" config/  # Any hardcoded?

# 4. Environment check
NODE_ENV=production npm start  # Starts correctly?
```

---

## Vibe Checking by Time Investment

### 30-Second Vibe Checks
- Does it run without errors?
- Are the file sizes reasonable?
- Does the output look roughly right?

### 2-Minute Vibe Checks
- Basic functionality test
- Sample data inspection
- Error handling spot check

### 5-Minute Vibe Checks
- Edge case testing
- Performance spot check
- Integration verification

### Beyond 5 Minutes = Not Vibe Checking
If you're spending more than 5 minutes, you've moved beyond vibe checking into proper testing/review.

---

## Building Your Vibe Check Intuition

### Week 1: Track Everything
```
AI Output: [Description]
Initial Vibe: Good/Bad
Quick Check: [What you checked]
Result: Pass/Fail
Time Spent: [Minutes]
Should Have Trusted Vibe?: Yes/No
```

### Week 2: Pattern Recognition
- What types of issues does your intuition catch?
- Where do you over-check or under-check?
- Which quick checks give you the most confidence?

### Week 3: Calibration
- Adjust based on your patterns
- Develop personal vibe check shortcuts
- Build confidence in your intuition

### Week 4: Speed & Accuracy
- Faster vibe checks
- Better pattern recognition
- Trust your instincts more

---

## Red Flag Taxonomy

### Category 1: Obvious Errors
- Syntax errors
- Runtime crashes
- Broken links
- **Response**: Fix immediately

### Category 2: Logical Issues
- Wrong calculations
- Backward logic
- Missing edge cases
- **Response**: Investigate and fix

### Category 3: Style/Quality Issues
- Poor naming
- Inconsistent formatting
- Verbose code
- **Response**: Note for later cleanup

### Category 4: Performance Issues
- Slow queries
- Memory leaks
- Large file sizes
- **Response**: Assess if critical for current need

---

## Personal Vibe Check Templates

### Template 1: Quick Code Check
```
□ Runs without errors
□ Main function works
□ Size seems reasonable
□ Style is consistent
Decision: Ship it / Fix first / Deeper review
```

### Template 2: Data Processing Check
```
□ Count in expected range
□ Sample records look good
□ No obvious corruption
□ Performance acceptable
Decision: Use it / Check more / Regenerate
```

### Template 3: API Integration Check
```
□ Authentication works
□ Main endpoints respond
□ Error handling present
□ Documentation matches
Decision: Integrate / Test more / Revise
```

---

## Remember: The Vibe Check Mindset

1. **Perfect is the enemy of good** - Don't over-optimize vibe checks
2. **Trust but verify** - Use your instincts but check the critical bits
3. **Speed matters** - If the check takes longer than writing the code, it's not vibe checking
4. **Context is key** - Prototype code needs less checking than production code
5. **Learn from misses** - When your vibe check fails, understand why

The goal is to catch 80% of issues with 20% of the effort.