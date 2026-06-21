# Building a Quiz App: Step-by-Step Guide

A beginner-friendly walkthrough for building an interactive quiz application using only HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, just one file.

**What you'll build:** A quiz app that loads questions from a JSON file, presents them one at a time with multiple-choice answers, gives instant feedback, and shows a results screen at the end.

**Final result:** [quiz-app.html](quiz-app.html)

---

## Step 1: Set Up the HTML Skeleton

Every web page starts with the same boilerplate. Create a file called `quiz-app.html` and add:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title>
    <style>
        /* CSS goes here */
    </style>
</head>
<body>
    <!-- HTML structure goes here -->

    <script>
        // JavaScript goes here
    </script>
</body>
</html>
```

**What's happening:**
- `<!DOCTYPE html>` tells the browser this is modern HTML5
- `<meta charset="UTF-8">` ensures special characters display correctly
- `<meta name="viewport">` makes the page responsive on mobile
- We put CSS in a `<style>` tag and JS in a `<script>` tag — all in one file

**Why one file?** For small apps like this, a single file means no build tools, no server required, and you can share it by just sending the file. Open it directly in any browser.

---

## Step 2: Create the Page Layout (HTML Structure)

The app has three "screens" that show/hide based on state:
1. **Upload screen** — file picker for loading quiz JSON
2. **Quiz screen** — questions, progress bar, answer buttons
3. **Results screen** — score and stats

```html
<body>
    <div class="container">
        <h1>📚 Quiz App</h1>

        <!-- Screen 1: File Upload -->
        <div class="upload-section" id="uploadSection">
            <input type="file" id="fileInput" accept=".json">
            <label for="fileInput" class="upload-label">
                📁 Choose Quiz File
            </label>
            <p style="margin-top: 20px; color: #666;">
                Select a JSON file to start your quiz
            </p>
        </div>

        <!-- Screen 2: Quiz Questions -->
        <div class="quiz-container" id="quizContainer">
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <div id="questionsContainer"></div>
            <div class="feedback" id="feedback"></div>
            <div class="button-group">
                <button class="btn-primary" id="submitBtn" disabled>Submit Answer</button>
                <button class="btn-secondary" id="nextBtn" style="display: none;">Next Question</button>
            </div>
        </div>

        <!-- Screen 3: Results -->
        <div class="results-container" id="resultsContainer">
            <h2>🎉 Quiz Complete!</h2>
            <div class="score-display" id="scoreDisplay"></div>
            <div class="score-message" id="scoreMessage"></div>
            <div class="stats" id="stats"></div>
            <button class="btn-primary" id="restartBtn" style="margin-top: 30px;">
                Start New Quiz
            </button>
        </div>
    </div>
</body>
```

**Key concepts:**
- **`id` attributes** — Every interactive element gets a unique `id` so JavaScript can find and control it
- **`accept=".json"`** — Restricts the file picker to only show JSON files
- **Hidden file input trick** — The actual `<input type="file">` is hidden; the styled `<label>` acts as the visible button. Clicking the label triggers the file input. This is a common pattern because file inputs are notoriously hard to style
- **`disabled` attribute** — The Submit button starts disabled (grayed out) until the user selects an answer
- **Screen toggling** — Only one screen is visible at a time. We use CSS classes (`active`) to show/hide them

---

## Step 3: Style the Foundation (CSS Reset & Body)

Start with a clean slate and the overall page look:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                 Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
```

**Key concepts:**
- **CSS Reset (`*`)** — Removes default browser margins/padding so all browsers look the same
- **`box-sizing: border-box`** — Makes width/height include padding and borders (much more intuitive)
- **System font stack** — Uses the operating system's native font (San Francisco on Mac, Segoe UI on Windows), so it feels native without downloading fonts
- **`linear-gradient`** — Creates a diagonal purple gradient from top-left to bottom-right
- **`min-height: 100vh`** — Makes body fill at least the full viewport height
- **Flexbox centering** — `display: flex` + `align-items: center` + `justify-content: center` is the modern way to center content both horizontally and vertically

---

## Step 4: Style the Card Container

The white card that holds all content:

```css
.container {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 800px;
    width: 100%;
    padding: 40px;
}

h1 {
    color: #667eea;
    margin-bottom: 30px;
    text-align: center;
    font-size: 2.5em;
}
```

**Key concepts:**
- **`border-radius: 20px`** — Rounds the corners, giving a modern card look
- **`box-shadow`** — The `0 20px 60px` creates a shadow offset 20px down with 60px blur, the `rgba(0,0,0,0.3)` makes it 30% opaque black. Heavy shadow gives a "floating" effect
- **`max-width` + `width: 100%`** — Card is 800px wide on desktop but shrinks to fit on smaller screens (responsive by default)

---

## Step 5: Style the Upload Area

The drag-style upload zone:

```css
.upload-section {
    text-align: center;
    padding: 40px;
    border: 3px dashed #667eea;
    border-radius: 10px;
    background: #f8f9ff;
    transition: all 0.3s ease;
}

.upload-section:hover {
    background: #f0f2ff;
    border-color: #764ba2;
}

.upload-section input[type="file"] {
    display: none;
}

.upload-label {
    display: inline-block;
    padding: 15px 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    transition: transform 0.2s ease;
}

.upload-label:hover {
    transform: scale(1.05);
}
```

**Key concepts:**
- **Dashed border** — `border: 3px dashed` signals "drop zone" to users (a UI convention)
- **`transition: all 0.3s ease`** — Smoothly animates any CSS change over 0.3 seconds. This makes hover effects feel polished instead of instant
- **Hidden input + styled label** — The real file input is `display: none`. The `<label>` with `for="fileInput"` acts as a proxy — clicking the label clicks the hidden input. This lets us style the button however we want
- **Pill-shaped buttons** — `border-radius: 50px` on a rectangular element creates a fully rounded pill shape
- **`transform: scale(1.05)`** — Grows the button 5% on hover, giving satisfying tactile feedback

---

## Step 6: Style the Progress Bar

A visual indicator of quiz progress:

```css
.progress-bar {
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    border-radius: 10px;
    margin-bottom: 30px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
    border-radius: 10px;
}
```

**Key concepts:**
- **Container + fill pattern** — The outer bar is the gray track, the inner div is the colored fill. We control the fill by changing its `width` percentage in JavaScript
- **`overflow: hidden`** — Ensures the fill doesn't leak outside the rounded container
- **`transition: width 0.3s ease`** — Animates width changes smoothly, so the bar glides instead of jumping

---

## Step 7: Style Questions and Answer Cards

The question display and clickable answer options:

```css
.question-card {
    display: none;
    animation: fadeIn 0.5s ease;
}

.question-card.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

.question-number { color: #667eea; font-weight: 600; margin-bottom: 10px; }
.question-text   { font-size: 1.3em; color: #333; margin-bottom: 25px; line-height: 1.6; }

.alternatives {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
}

.alternative {
    padding: 20px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: white;
}

.alternative:hover {
    border-color: #667eea;
    background: #f8f9ff;
    transform: translateX(5px);
}

.alternative.selected {
    border-color: #667eea;
    background: #f0f2ff;
}
```

**Key concepts:**
- **CSS `@keyframes`** — Defines a custom animation called `fadeIn`. The element starts 20px below and transparent, then slides up and fades in
- **Show/hide with classes** — `.question-card` is hidden by default, `.active` makes it visible. JavaScript toggles this class
- **`translateX(5px)` on hover** — Slides the card 5px right on hover, giving a subtle "you can click me" signal
- **`.selected` class** — JavaScript adds this class when the user clicks an option, changing border and background to purple

---

## Step 8: Style Correct/Incorrect Feedback

Visual feedback after submitting an answer:

```css
.alternative.correct {
    border-color: #10b981;
    background: #d1fae5;
}

.alternative.incorrect {
    border-color: #ef4444;
    background: #fee2e2;
}

.alternative.correct::before  { content: '✓ '; color: #10b981; font-weight: bold; }
.alternative.incorrect::before { content: '✗ '; color: #ef4444; font-weight: bold; }

.feedback {
    margin-top: 15px;
    padding: 15px;
    border-radius: 10px;
    font-weight: 500;
    display: none;
}

.feedback.show    { display: block; animation: fadeIn 0.3s ease; }
.feedback.correct   { background: #d1fae5; color: #065f46; }
.feedback.incorrect { background: #fee2e2; color: #991b1b; }
```

**Key concepts:**
- **`::before` pseudo-element** — Injects content before the element's text, without modifying the HTML. The `content: '✓ '` adds a checkmark before correct answers
- **Color coding** — Green (#10b981) for correct, red (#ef4444) for incorrect. These are universally understood
- **Multiple classes** — `.feedback.correct` means "an element with BOTH classes". This lets one element have different styles based on state

---

## Step 9: Style Buttons and Results Screen

Buttons, score display, and stat cards:

```css
button {
    padding: 15px 40px;
    border: none;
    border-radius: 50px;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.btn-primary:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.score-display {
    font-size: 4em;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 30px 0;
}

.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 30px;
}

.stat-card {
    padding: 20px;
    background: #f8f9ff;
    border-radius: 10px;
    border: 2px solid #e0e0e0;
}

.stat-value { font-size: 2em; font-weight: bold; color: #667eea; }
.stat-label { color: #666; margin-top: 5px; }
```

**Key concepts:**
- **`:hover:not(:disabled)`** — Only apply hover effect when the button is NOT disabled. Compound pseudo-classes prevent confusing visual feedback on inactive buttons
- **Gradient text effect** — A clever trick: set a gradient as `background`, then use `background-clip: text` and `text-fill-color: transparent` to make the gradient show through the text. The text becomes a "window" into the gradient
- **CSS Grid** — `repeat(auto-fit, minmax(200px, 1fr))` creates a responsive grid: each card is at least 200px wide, and they automatically wrap to new rows on smaller screens. No media queries needed

---

## Step 10: Set Up JavaScript State and DOM References

Now for the interactive logic. Start by declaring your app's state variables and grabbing references to all the HTML elements:

```javascript
// App state
let quizData = null;        // Array of question objects
let currentQuestion = 0;    // Index of current question
let selectedAnswer = null;  // Index of selected alternative
let score = 0;              // Number of correct answers
let answers = [];           // History of all answers

// DOM references — grab once, reuse everywhere
const fileInput = document.getElementById('fileInput');
const uploadSection = document.getElementById('uploadSection');
const quizContainer = document.getElementById('quizContainer');
const resultsContainer = document.getElementById('resultsContainer');
const questionsContainer = document.getElementById('questionsContainer');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const feedback = document.getElementById('feedback');
const progressFill = document.getElementById('progressFill');
const restartBtn = document.getElementById('restartBtn');

// Wire up event listeners
fileInput.addEventListener('change', handleFileUpload);
submitBtn.addEventListener('click', submitAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restart);
```

**Key concepts:**
- **State variables** — These 5 variables track everything the app needs to know. When something changes, we update these variables and then update the DOM to match
- **`document.getElementById()`** — Finds an HTML element by its `id` attribute. We store these references in `const` variables so we don't re-search the DOM every time
- **`addEventListener()`** — Connects user actions to functions. When the file input changes, call `handleFileUpload`. When Submit is clicked, call `submitAnswer`. This is the "event-driven" programming model of the web

---

## Step 11: Handle File Upload and JSON Parsing

The most complex part — reading a file from disk and parsing the quiz data:

```javascript
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            let content = e.target.result;
            let data;

            // Try normal JSON parse first
            try {
                data = JSON.parse(content);
            } catch {
                // If that fails, try double-encoded JSON
                const stringContent = JSON.parse(content);
                data = JSON.parse(stringContent);
            }

            // Handle both formats: {questions: [...]} or direct array [...]
            if (Array.isArray(data)) {
                quizData = data;
            } else if (data.questions && Array.isArray(data.questions)) {
                quizData = data.questions;
            } else {
                throw new Error('Invalid quiz format');
            }

            if (quizData.length === 0) {
                throw new Error('No questions found');
            }

            startQuiz();
        } catch (error) {
            alert('Error parsing JSON file. Please check the format.');
            console.error('Parse error:', error);
        }
    };
    reader.readAsText(file);
}
```

**Key concepts:**
- **`FileReader` API** — Reads files from the user's computer in the browser. `readAsText()` reads the file as a string, then the `onload` callback fires when done
- **`JSON.parse()`** — Converts a JSON string into a JavaScript object. This is how the browser understands structured data from files
- **Double-encoded JSON** — Sometimes JSON files contain a string that is itself JSON (e.g., `"\"[{...}]\"`). The nested try/catch handles this by parsing twice
- **Flexible format handling** — The `if/else if/else` chain accepts either `{questions: [...]}` or a plain array `[...]`. Defensive parsing like this prevents user confusion
- **`try/catch`** — If anything goes wrong (bad JSON, wrong format), we show a friendly error instead of crashing

**Expected JSON format:**
```json
{
  "questions": [
    {
      "question": "What does HTML stand for?",
      "alternatives": [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks Text Mark Language"
      ],
      "correct_answer": 0
    }
  ]
}
```

---

## Step 12: Start the Quiz and Render Questions

Transitioning between screens and displaying questions:

```javascript
function startQuiz() {
    currentQuestion = 0;
    selectedAnswer = null;
    score = 0;
    answers = [];

    uploadSection.style.display = 'none';
    quizContainer.classList.add('active');
    resultsContainer.classList.remove('active');

    renderQuestion();
}

function renderQuestion() {
    const question = quizData[currentQuestion];

    questionsContainer.innerHTML = `
        <div class="question-card active">
            <div class="question-number">
                Question ${currentQuestion + 1} of ${quizData.length}
            </div>
            <div class="question-text">${question.question}</div>
            <div class="alternatives">
                ${question.alternatives.map((alt, index) => `
                    <div class="alternative" data-index="${index}">
                        ${alt}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Update progress bar
    const progress = (currentQuestion / quizData.length) * 100;
    progressFill.style.width = progress + '%';

    // Attach click handlers to new alternative elements
    document.querySelectorAll('.alternative').forEach(alt => {
        alt.addEventListener('click', selectAnswer);
    });

    // Reset buttons
    submitBtn.disabled = true;
    submitBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    feedback.classList.remove('show', 'correct', 'incorrect');
}
```

**Key concepts:**
- **Screen transitions** — `style.display = 'none'` hides elements, `classList.add('active')` shows them. This is a simple state machine: upload → quiz → results
- **Template literals** — The backtick strings (`` ` ` ``) allow multi-line HTML with `${expression}` interpolation. This is how we dynamically generate HTML from data
- **`.map().join('')`** — `.map()` transforms each alternative into an HTML string, `.join('')` concatenates them. This is the standard pattern for rendering lists in vanilla JS
- **`data-index` attribute** — Custom data attributes store metadata on HTML elements. When the user clicks an alternative, we read `dataset.index` to know which one they chose
- **Re-attaching listeners** — Since `innerHTML` destroys and recreates DOM elements, we must re-attach click handlers every time we render a new question

---

## Step 13: Handle Answer Selection and Submission

The core quiz interaction:

```javascript
function selectAnswer(event) {
    // Remove previous selection
    document.querySelectorAll('.alternative').forEach(alt => {
        alt.classList.remove('selected');
    });

    // Highlight clicked answer
    event.target.classList.add('selected');
    selectedAnswer = parseInt(event.target.dataset.index);
    submitBtn.disabled = false;
}

function submitAnswer() {
    if (selectedAnswer === null) return;

    const question = quizData[currentQuestion];
    const isCorrect = selectedAnswer === question.correct_answer;

    // Record answer
    answers.push({
        question: currentQuestion,
        selected: selectedAnswer,
        correct: question.correct_answer,
        isCorrect
    });

    if (isCorrect) score++;

    // Show correct/incorrect on all alternatives
    document.querySelectorAll('.alternative').forEach((alt, index) => {
        alt.style.pointerEvents = 'none';  // Disable clicking
        if (index === question.correct_answer) {
            alt.classList.add('correct');
        } else if (index === selectedAnswer && !isCorrect) {
            alt.classList.add('incorrect');
        }
    });

    // Show feedback banner
    feedback.textContent = isCorrect
        ? '✓ Correct! Well done!'
        : `✗ Incorrect. The correct answer was: "${question.alternatives[question.correct_answer]}"`;
    feedback.classList.add('show', isCorrect ? 'correct' : 'incorrect');

    // Swap buttons
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = currentQuestion === quizData.length - 1
        ? 'See Results'
        : 'Next Question';
}
```

**Key concepts:**
- **Single selection** — Before selecting, we remove `selected` from ALL alternatives, then add it to the clicked one. This ensures only one answer is selected at a time
- **`event.target`** — The DOM element that was actually clicked. This is how event handlers know WHAT was clicked
- **`parseInt()`** — `dataset.index` returns a string ("0", "1"), but we need a number to compare with `correct_answer`. `parseInt` converts it
- **`pointer-events: none`** — After submitting, we disable all clicks on alternatives. This CSS property is more reliable than removing event listeners
- **Dynamic button text** — On the last question, the Next button says "See Results" instead of "Next Question"

---

## Step 14: Show Results and Handle Restart

The final screen and reset logic:

```javascript
function showResults() {
    quizContainer.classList.remove('active');
    resultsContainer.classList.add('active');

    const percentage = Math.round((score / quizData.length) * 100);

    document.getElementById('scoreDisplay').textContent = `${percentage}%`;

    // Motivational message based on score
    const messages = {
        100: 'Perfect score! Outstanding!',
        80: 'Excellent work!',
        60: 'Good job!',
        40: 'Not bad, keep practicing!',
        0: 'Keep studying, you can do better!'
    };
    const scoreMessage = document.getElementById('scoreMessage');
    if (percentage === 100) scoreMessage.textContent = messages[100];
    else if (percentage >= 80) scoreMessage.textContent = messages[80];
    else if (percentage >= 60) scoreMessage.textContent = messages[60];
    else if (percentage >= 40) scoreMessage.textContent = messages[40];
    else scoreMessage.textContent = messages[0];

    // Render stat cards
    document.getElementById('stats').innerHTML = `
        <div class="stat-card">
            <div class="stat-value">${score}</div>
            <div class="stat-label">Correct</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${quizData.length - score}</div>
            <div class="stat-label">Incorrect</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${quizData.length}</div>
            <div class="stat-label">Total Questions</div>
        </div>
    `;

    progressFill.style.width = '100%';
}

function restart() {
    fileInput.value = '';
    uploadSection.style.display = 'block';
    quizContainer.classList.remove('active');
    resultsContainer.classList.remove('active');
    quizData = null;
}
```

**Key concepts:**
- **`Math.round()`** — Rounds to the nearest integer. Without it, you might get scores like `66.6666667%`
- **Conditional messages** — The if/else chain maps score ranges to messages. The thresholds (100, 80, 60, 40) provide five tiers of feedback
- **Full reset** — `restart()` clears the file input, hides quiz/results, shows upload. Setting `fileInput.value = ''` is important — otherwise the browser won't fire `change` if the user picks the same file again

---

## Concepts Recap

| Concept | Where Used | Why It Matters |
|---------|-----------|----------------|
| CSS Flexbox | Body centering, button groups | The modern way to align and distribute elements |
| CSS Grid | Stat cards | Responsive layouts without media queries |
| CSS Transitions | Buttons, alternatives, progress bar | Makes interactions feel smooth and polished |
| CSS Animations | Question fade-in | Guides attention to new content |
| `@keyframes` | `fadeIn` animation | Defines custom multi-step animations |
| Template literals | `renderQuestion()`, `showResults()` | Clean way to build HTML strings from data |
| `FileReader` API | `handleFileUpload()` | Read files from the user's computer |
| `JSON.parse()` | File upload handler | Convert JSON text to JavaScript objects |
| Event delegation | Alternative click handlers | Connect user clicks to JavaScript functions |
| CSS class toggling | Screen transitions, answer feedback | Change appearance without modifying HTML structure |
| `data-*` attributes | Alternative cards | Store metadata on HTML elements |
| Pseudo-elements | `::before` on correct/incorrect | Inject visual indicators without extra HTML |

---

## How to Test

1. Open `quiz-app.html` in a browser (double-click the file, or `python -m http.server 8000` and visit localhost)
2. Create a test JSON file:

```json
{
  "questions": [
    {
      "question": "What does CSS stand for?",
      "alternatives": [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style System"
      ],
      "correct_answer": 0
    },
    {
      "question": "Which HTML tag is used for the largest heading?",
      "alternatives": ["<h6>", "<heading>", "<h1>", "<head>"],
      "correct_answer": 2
    },
    {
      "question": "What does the 'C' in CSS stand for?",
      "alternatives": ["Computer", "Cascading", "Creative", "Central"],
      "correct_answer": 1
    }
  ]
}
```

3. Upload the JSON file and take the quiz!

---

## Challenges for Practice

Once you understand the code, try extending it:

1. **Add a timer** — Show a countdown per question (hint: `setInterval` + state variable)
2. **Shuffle answers** — Randomize the order of alternatives each time
3. **Question review** — After results, let users click through their answers to see what they got wrong
4. **Keyboard support** — Press 1-4 to select answers, Enter to submit
5. **Local storage** — Save high scores using `localStorage.setItem()` / `getItem()`
