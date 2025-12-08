# Vibe Checks for Quote Collector

The specific checks performed to validate the app.

---

## Check 1: Basic Functionality

**What:** Does the core feature work?

**How:**
1. Open the HTML file in a browser
2. Add a quote with text, author, and tags
3. Click "Add Quote"
4. See the quote appear in the grid

**Expected:** Quote card appears below form
**Pass criteria:** Quote displays with correct text, author, and tags

---

## Check 2: Persistence

**What:** Does data survive page reload?

**How:**
1. Add a quote
2. Refresh the page (Cmd+R or F5)
3. Check if quote still exists

**Expected:** Quote persists after refresh
**Pass criteria:** Same quotes visible after reload

**Deeper check (DevTools):**
1. Open DevTools (F12)
2. Go to Application > Local Storage
3. Look for `quotes` key
4. Verify JSON structure looks correct

---

## Check 3: Delete Functionality

**What:** Can I remove quotes?

**How:**
1. Click "Delete" on a quote
2. Verify it disappears
3. Refresh and verify it's gone

**Expected:** Quote removed permanently
**Pass criteria:** Quote not visible, not in localStorage

---

## Check 4: Tag Filtering

**What:** Does tag filter work correctly?

**How:**
1. Add quotes with different tags (e.g., "motivation", "life")
2. Click on a tag in the tag cloud
3. Verify only quotes with that tag show
4. Click same tag again to clear filter

**Expected:** Filter shows only matching quotes
**Pass criteria:** Correct filtering, toggle behavior works

---

## Check 5: Export Validation

**What:** Does export produce valid JSON?

**How:**
1. Add several quotes with different tags
2. Click "Export JSON"
3. Open the downloaded file
4. Verify JSON structure

**Expected:**
```json
[
  {
    "id": "...",
    "text": "...",
    "author": "...",
    "tags": ["..."],
    "createdAt": "..."
  }
]
```

**Pass criteria:** Valid JSON with correct structure

---

## Check 6: Edit Functionality

**What:** Can I modify existing quotes?

**How:**
1. Click "Edit" on a quote
2. Verify form fills with quote data
3. Change the text
4. Click "Update Quote"
5. Verify the quote is updated (not duplicated)

**Expected:** Original quote replaced with updated version
**Pass criteria:** One quote, with new content

---

## Check 7: Dark Mode

**What:** Does theme toggle work and persist?

**How:**
1. Click "Toggle Theme"
2. Verify colors change
3. Refresh page
4. Verify theme persists

**Expected:** Theme switches and remembers preference
**Pass criteria:** Theme persists across sessions

---

## Check 8: Empty State

**What:** Does the app handle no quotes gracefully?

**How:**
1. Delete all quotes (or use fresh localStorage)
2. Verify helpful message appears

**Expected:** "No quotes yet" message
**Pass criteria:** Clear guidance for new users

---

## Check 9: XSS Prevention

**What:** Is user input properly escaped?

**How:**
1. Add a quote with text: `<script>alert('xss')</script>`
2. Verify it displays as text, not executed

**Expected:** Script tags shown as text
**Pass criteria:** No JavaScript execution, text visible

---

## Check 10: Mobile Responsiveness

**What:** Does it work on mobile screens?

**How:**
1. Open DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile viewport
4. Verify layout adapts

**Expected:** Single column, readable text
**Pass criteria:** All features accessible on mobile

---

## Quick Vibe Check Summary

For live demos, run these in order:

```
□ 1. Add quote - does it appear?
□ 2. Refresh - is it still there?
□ 3. Delete - does it go away?
□ 4. Filter - does tag filter work?
□ 5. Export - is JSON valid?
```

If all 5 pass, the app is ready to demo.

---

## Red Flags to Watch For

| Symptom | Likely Cause |
|---------|--------------|
| Quote doesn't appear | JavaScript error (check console) |
| Data lost on refresh | localStorage not working |
| Export downloads empty | quotes array issue |
| Tags not clickable | Event handler missing |
| Weird characters | Encoding issue |
