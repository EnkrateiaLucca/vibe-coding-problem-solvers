# Prompt: Quiz App

Build a single-file HTML quiz application that loads questions from a JSON file and presents an interactive multiple-choice quiz.

## Layout & Design

- Purple gradient background: linear-gradient(135deg, #667eea, #764ba2)
- Centered white card container with rounded corners (20px), heavy box-shadow, max-width 800px
- Title "Quiz App" with a book emoji, in the accent purple color
- System font stack
- All buttons use pill shape (border-radius: 50px)
- Primary buttons use the same purple gradient as the background
- Smooth fade-in animations (translateY + opacity) when showing new questions

## File Upload

- Drag-style upload area with a dashed purple border on a light purple background
- Hidden file input with a styled label button ("Choose Quiz File")
- Accepts .json files
- Handles both formats: `{ "questions": [...] }` and a direct array `[...]`
- Also handles double-encoded JSON strings (JSON within a JSON string)
- Each question object has: `question` (string), `alternatives` (array of strings), `correct_answer` (zero-based index)

## Quiz Flow

1. **Upload** → show file picker
2. **Question display** → one question at a time with:
   - Progress bar at the top (purple gradient fill, animates width)
   - "Question X of Y" label in purple
   - Question text in large font (1.3em)
   - Multiple-choice alternatives as clickable cards with borders
   - Alternatives slide right slightly on hover (translateX 5px)
   - Selected alternative gets a purple border highlight
3. **Submit** → "Submit Answer" button (disabled until an answer is selected)
   - Correct answer gets a green border + background with a checkmark prefix
   - Wrong selection gets a red border + background with an X prefix
   - The correct answer is always highlighted green regardless
   - Feedback banner appears below: green "Correct! Well done!" or red with the correct answer shown
   - Submit button is replaced by "Next Question" (or "See Results" on the last question)
4. **Results screen** →
   - "Quiz Complete!" with party emoji
   - Giant percentage score with gradient text effect
   - Motivational message based on score (100%=Perfect, 80%+=Excellent, 60%+=Good, 40%+=Not bad, below=Keep studying)
   - Three stat cards in a responsive grid: Correct, Incorrect, Total Questions
   - "Start New Quiz" button resets everything

## Interaction Details

- Clicking an alternative deselects any previous selection
- After submitting, all alternatives become non-clickable (pointer-events: none)
- The progress bar reflects the current question number (fills to 100% at results)
