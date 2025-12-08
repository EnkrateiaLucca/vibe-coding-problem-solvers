# Pattern 2: Let It See What You See

Share screenshots, errors, and context. Visual information beats description.

## The Problem

Describing what you see is hard:

```
"The thing is broken. There's an error somewhere.
The layout is wrong. It doesn't look right."
```

This forces the AI to guess what you mean.

## The Solution

Show, don't tell. Share:
- Screenshots of UI issues
- Full error messages
- Console output
- Current state of the code

---

## For Errors: Copy Everything

### Bad
```
I got an error with the database
```

### Good
```
I got this error when running my Flask app:

Traceback (most recent call last):
  File "app.py", line 45, in get_user
    user = db.session.query(User).filter_by(id=user_id).first()
  File "/lib/sqlalchemy/orm/query.py", line 3418, in first
    return self.limit(1).one_or_none()
sqlalchemy.exc.ProgrammingError: (psycopg2.ProgrammingError)
relation "users" does not exist

The users table should exist. Here's my model:

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120))
```

---

## For UI Issues: Screenshot + Description

### Bad
```
The layout is broken on mobile
```

### Good
```
[Paste screenshot]

Issue: On mobile (iPhone 12), the navigation menu overlaps
the content area. Expected: Menu should be collapsed into
hamburger icon.

Current CSS for the nav:
.nav {
    display: flex;
    position: fixed;
    width: 100%;
}
```

---

## For Features: Show Current State

### Bad
```
Add dark mode to my site
```

### Good
```
Add dark mode to my site.

[Paste screenshot of current design]

Current color scheme I want to preserve:
- Primary: #4a90a4
- Background: #f5f5f5
- Text: #333333

Toggle button in top right corner.
Remember preference in localStorage.
```

---

## The Context Hierarchy

Most to least useful:

```
1. Screenshots + code (best)
2. Full error messages + code
3. Console output + code
4. Code alone
5. Description only (least useful)
```

---

## What to Include

### For Debugging
```
□ Full error message (not just the last line)
□ Stack trace
□ Relevant code section
□ What you were trying to do
□ What you expected to happen
```

### For UI Changes
```
□ Screenshot of current state
□ Description of desired change
□ Reference image if available
□ Relevant CSS/HTML
□ Screen size/device if responsive issue
```

### For Feature Requests
```
□ Screenshot of where feature should go
□ Description of functionality
□ Example of desired behavior
□ Related existing code
```

---

## Tool Tips

### Capturing Screenshots

**macOS:**
- `Cmd + Shift + 4` - Select area
- `Cmd + Shift + 5` - More options

**Windows:**
- `Win + Shift + S` - Snipping tool

**Chrome DevTools:**
- `Cmd + Shift + P` → "Capture screenshot"

### Capturing Console Output

**Browser:**
- Right-click error → "Copy" or "Copy stack trace"

**Terminal:**
- Select + Copy, or `| tee output.log`

---

## Example Conversation

### Turn 1 (Bad)
```
User: My chart isn't working
AI: [Guesses various possibilities]
```

### Turn 1 (Good)
```
User: My Chart.js bar chart shows blank.

[Screenshot showing empty chart area]

Error in console:
"Cannot read property 'length' of undefined"
at Chart.js:3847

Here's my data setup:
const data = fetchData(); // Returns promise
const chart = new Chart(ctx, { data: data });

Expected: Bar chart with sales data
```

The AI can now see exactly what's wrong (Promise not resolved).

---

## Live Demo

**Exercise:**

1. Create a simple HTML page with an intentional bug
2. Try fixing with vague description: "it's broken"
3. Then share: screenshot + error message + code
4. Compare the quality of responses

Notice how specific context produces specific fixes.
