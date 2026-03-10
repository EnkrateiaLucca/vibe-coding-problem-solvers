Here is a highly compressed, technically dense implementation specification designed for immediate coding.

# Single-File Video Note Taker: Implementation Spec

## 1\. Core Constraints

  * **Architecture:** Single file (`index.html`) containing all HTML, CSS, and JS.
  * **Stack:** Vanilla JS (ES6+), HTML5, CSS3. No external libraries/CDNs.
  * **Storage:** `LocalStorage` for session persistence; `File API` for inputs; `Blob` for exports.
  * **State:** Global variables manipulated imperatively.

## 2\. Data Models & State

### Global State Variables

```javascript
let notes = [];                   // Array of Note objects
let videoFile = null;             // Current File object
let noteScreenshots = {};         // Map: noteId (int) -> base64 string
let currentActiveNoteId = null;   // ID of currently highlighted note
let transcript = [];              // Array of TranscriptSegment objects
let undoStack = [];               // Array of canvas states (ImageData)
let isDrawing = false;            // Drawing state flag
```

### Data Schemas

**Note Object:**

```javascript
{
  id: Number,           // Date.now()
  timestamp: String,    // "HH:MM:SS" or null
  timestampMs: Number,  // video.currentTime * 1000
  text: String,         // Content
  type: String,         // 'timestamped' | 'free'
  createdAt: Number     // Date.now() for stable sort
}
```

**Transcript Segment:**

```javascript
{
  text: String,
  offsets: { from: Number, to: Number }, // ms
  timestamps: { from: String, to: String }
}
```

**Export Session (JSON):**

```javascript
{
  videoFileName: String,
  notes: Array<Note>,
  screenshots: Object, // { noteId: base64 }
  exportDate: String   // ISO String
}
```

## 3\. DOM Structure (`index.html`)

### CSS (Embedded)

  * **Tokens:** Define CSS vars for colors (`--bg-primary`, `--accent`), spacing, and shadows.
  * **Layout:**
      * `#landing-page`: Flexbox centered, drag-drop zone.
      * `#app-container`: CSS Grid (Sidebar: Notes, Main: Video).
      * `.video-wrapper`: Relative positioning for overlays.
      * `canvas#drawing-layer`: Absolute, full cover over video.
  * **Utilities:** Classes for `.hidden`, `.active`, `.toast`.

### HTML Body

1.  **Landing Section:** File input (`input[type=file]`), Recent Sessions list.
2.  **App Header:** Filename display, "Save/Export" buttons, "New Session" button.
3.  **Main Grid:**
      * **Left Panel (Notes):** Input area (Textarea + "Add Note" btn), Filter controls, Scrollable `ul#notes-list`.
      * **Right Panel (Video):**
          * `div.video-container`: Contains `<video>` and `<canvas>` (hidden drawing layer).
          * `#timeline-markers`: Relative div for visual ticks.
          * `#transcript-container`: Scrollable list of transcript lines.
4.  **Overlays:**
      * `#drawing-toolbar`: Pen/Eraser/Color controls (hidden by default).
      * `#shortcuts-modal`: Table of keybindings.
      * `#toast-container`: Fixed position for notifications.

## 4\. Implementation Logic by Feature

### A. Initialization & Routing

1.  **Boot:** Check `localStorage` for `recentSessions`. Render list on Landing Page.
2.  **Video Load:** On file drop or selection:
      * `URL.createObjectURL(file)` -\> set to video src.
      * Hide Landing, Show App.
      * Start `autoSaveInterval` (30s).

### B. Core Note Taking

1.  **Capture:** On "Add Note":
      * Pause video (optional).
      * **Screenshot:** Draw video frame to temporary canvas -\> `toDataURL('image/jpeg', 0.8)`. Save to `noteScreenshots`.
      * Create `Note` object using `video.currentTime`.
      * Push to `notes` array.
      * Sort `notes`: Primary by `timestampMs`, Secondary by `createdAt`.
      * Call `renderNotes()`.
2.  **Render:** Clear list DOM. Loop `notes`.
      * Insert `<li>`. If `timestamped`, add clickable link calling `video.currentTime = note.time`.
      * Append Edit/Delete buttons.

### C. Playback & Synchronization

1.  **Time Update:** Listen to `video.ontimeupdate`:
      * **Highlight Note:** Find last note where `note.timestampMs <= currentMs`. Toggle `.active` class. Scroll into view.
      * **Highlight Transcript:** Find segment where `from <= current <= to`.
2.  **Timeline Markers:** On `loadedmetadata`:
      * Loop `notes`. Calculate `left: (note.time / video.duration) * 100%`.
      * Append marker dots to timeline container.

### D. Session Management

1.  **JSON Export:** Create Object with notes, screenshots, video name. `JSON.stringify`. Create `Blob`, trigger download.
2.  **PDF Export:** Construct HTML string with inline CSS. Iterate notes, embedding screenshots as `<img>`. `window.open()`, then `window.print()`.
3.  **Restore:** Parse JSON. Load text data into variables. Prompt user to re-select local video file (browser security prevents auto-loading video path).

### E. Drawing System (Canvas Overlay)

1.  **Activation:** Pause video. Show `canvas` overlay over video element.
2.  **Setup:** `ctx.drawImage(video, 0, 0)` to set background.
3.  **Interaction:** Mouse/Touch events (`mousedown`, `mousemove`, `mouseup`).
      * Draw lines using `ctx.lineTo`.
      * **Undo:** `ctx.getImageData` on start of stroke, push to `undoStack`.
4.  **Save:** `canvas.toDataURL()`. Create new Note with this image as the screenshot.

### F. Transcript Support

1.  **Ingest:** File input accepts `.json`. Parse into `transcript` array.
2.  **Render:** List of clickable segments.
3.  **Sync:** Auto-scroll transcript list to keep active segment centered.

### G. Keyboard Shortcuts (`window.keydown`)

  * `Space`: Play/Pause.
  * `Cmd/Ctrl + Enter`: Save Note.
  * `Left/Right Arrow`: Seek -/+ 5s.
  * `N`: Focus Note Input.
  * `A`: Open Drawing Canvas.

## 5\. Key Algorithms

**Time Formatter:**

```javascript
const formatTime = (ms) => {
    if (!ms && ms !== 0) return "--:--";
    const seconds = Math.floor(ms / 1000);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v < 10 ? '0' + v : v).filter((v,i) => v !== '00' || i > 0).join(':');
};
```

**Active Note Highlighting:**

```javascript
const highlightActive = (currTimeMs) => {
    // Filter only timestamped notes
    const timedNotes = notes.filter(n => n.type === 'timestamped');
    // Find last note that occurred before current time
    const active = timedNotes.findLast(n => n.timestampMs <= currTimeMs); 
    if (active && active.id !== currentActiveNoteId) {
        // Update DOM classes
        // Scroll active element into view
        currentActiveNoteId = active.id;
    }
};
```