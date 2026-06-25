# Video Note Taker with Timestamps

This is an app that takes a video upload as input and provides a clean minimal interface for the user to annotate frames of the video (to be extracted as screenshots) and then provides timestamped hyperlinks to those notes automatically allowing the user to navigate the videos via the notes themselves (by clicking on the linked timestamps) and allows the user when done, to export the annotations as a .pdf containing the screenshots + notes + timestamps in nicely formatted and pretty clean way.

---

## Core functionalities

1. **Video load & playback with a visible timeline**
   - File picker (`<input type="file" accept="video/*">`); loaded locally via `URL.createObjectURL(file)` into a `<video>` element. Nothing is uploaded.
   - A **persistent, always-visible timeline / seekbar** sits directly under the video: current position, total duration (`hh:mm:ss`), draggable scrubber, and a play/pause control. This is a first-class part of the UI, not hidden native chrome.
   - **Note markers on the timeline**: each saved note renders a tick on the seekbar at its timestamp. Clicking a tick seeks to that note. This is the primary visual link between the notes and the video.
   - [Inference] Playback support depends on the browser's codec support, not the app (MP4/H.264 and WebM/VP9 broadly supported; some codecs may fail). Based on observed browser behavior; verify against target browsers.

2. **Add note (single merged action — capture + text together)**
   - One action — button **and** the `N` shortcut — does everything: pause the video, grab the current frame, and open an inline text field focused for typing, all as a single note entry.
   - Under the hood the frame is drawn to an off-screen `<canvas>` (`drawImage` → `toDataURL('image/jpeg', quality)`, downscaled to ~1280px cap) and stored alongside the typed text and the captured `currentTime`.
   - `Enter` saves the note; `Esc` cancels. There is no separate "capture" step and no separate "add text" step — they are the same operation.
   - Notes remain editable and deletable after creation.

3. **Timestamp navigation ("clickable timestamps")**
   - Clicking a note (its timestamp, thumbnail, or timeline tick) sets `video.currentTime = note.timestamp`. Clarification: in-app this is a seek action, not an HTML anchor link, though it behaves like a hyperlink.

4. **Layout — left-to-right workflow**
   - **Left column: video + timeline + controls.** **Right column: the note-taking / annotation panel** (the scrollable, timestamp-ordered notes list and the active note-entry field).
   - The reading/working flow is left → right: watch and capture on the left, the note appears and lives on the right, aligned to the video's height so the two columns read as one unit.
   - Collapses to stacked (video on top, notes below) on narrow screens.

5. **PDF export**
   - "Export PDF" compiles all notes (screenshot + note text + formatted timestamp) into a clean paginated document via **jsPDF** (CDN). Auto page breaks when an entry won't fit; saved as `<videoFileName>-notes.pdf`.
   - Clarification: PDF timestamps are plain text labels, not live links (a local file has no stable URL to target).

6. **Session state (v1 scope)**
   - In-memory for the working session; reload clears it. (Persistence options under Open Questions / Risks.)

---

## Keyboard shortcuts (video navigation, not frame-stepping)

Seeking is in **seconds**, deliberately coarse — no frame-by-frame stepping.

| Key | Action |
|-----|--------|
| `Space` | Play / pause |
| `←` / `→` | Seek −5s / +5s |
| `Shift + ←` / `Shift + →` | Seek −10s / +10s |
| `N` | Add note now (pause, capture frame, focus note field) |
| `Enter` | Save the note currently being edited |
| `Esc` | Cancel note entry |

While the note text field is focused, only `Enter` and `Esc` are intercepted; all other keys type normally to avoid conflicts.

---

## Design direction ("10x" notes)

- Minimal, high-contrast, generous whitespace; one clear visual hierarchy (video is the anchor, notes are the supporting column).
- Tight visual alignment between the two columns: equal vertical rhythm, the notes column top-aligned to the video, consistent corner radius/spacing.
- Timeline is the connective tissue — note markers on the seekbar make the relationship between a note and its moment legible at a glance.
- A distinct "note-entry" state (the active capture) so it's obvious you're annotating *this* frame right now: dim/freeze the timeline, highlight the captured thumbnail, focus the field.
- Smooth seeks, hover affordances on markers, and a clean empty state.

---

## Data model

```js
note = {
  id: string,            // crypto.randomUUID()
  timestamp: number,     // seconds (video.currentTime at capture)
  imageDataUrl: string,  // 'data:image/jpeg;base64,...'
  text: string,          // user annotation
  createdAt: number      // Date.now()
}

appState = {
  videoFileName: string,
  videoDuration: number,
  notes: note[]          // sorted by timestamp for display + markers
}
```

---

## File structure

Single deliverable: **`index.html`** with everything inline; jsPDF the only external (CDN) dependency.

```
index.html
├── <head>
│   ├── <meta> / <title>
│   ├── <style> ............. all CSS (two-column layout, timeline, markers, note-entry state, print-safe)
│   └── <script src> ........ jsPDF from CDN
└── <body>
    ├── markup .............. file input, <video>, timeline, controls (left); notes panel (right)
    └── <script>
        ├── state ........... appState + note CRUD
        ├── video ........... load, seek, time formatting
        ├── timeline ........ scrubber + render note markers
        ├── shortcuts ....... keydown handling (with focus guard)
        ├── note ............ merged capture+text flow
        ├── render .......... notes list + bind seek-on-click
        └── export .......... jsPDF builder
```

No build step, no framework.

---

## Implementation Steps

1. **Scaffold** `index.html` with the left/right two-column layout and minimal CSS; stub file input + empty `<video>`.
2. **Video loading**: file input → `createObjectURL` → `video.src`; read `loadedmetadata` for duration; revoke prior object URLs.
3. **Timeline**: custom seekbar bound to `timeupdate`/`seeking`; draggable scrubber; `formatTime` utility; play/pause.
4. **Keyboard shortcuts**: keydown handler for the table above, with a focus guard so typing in the note field doesn't trigger seeks.
5. **Merged add-note flow** (`N` or button): pause → capture frame to capped canvas → create note → focus inline text field → `Enter` saves / `Esc` cancels.
6. **Notes panel**: render timestamp-ordered list (thumbnail, timestamp, editable text, delete); bind click → seek.
7. **Timeline markers**: render a tick per note; click tick → seek; keep in sync on add/delete.
8. **PDF export**: jsPDF iterate notes, place screenshot + timestamp + text, paginate, save.
9. **Polish**: note-entry state, empty states, responsive stacking, capped image sizes, long-note wrapping.

---

## Stack

- Html, css and javascript
- One file html tool
- **jsPDF** (CDN) — single external dependency, PDF generation only. [Unverified] Confirm the current jsPDF image/text/page API against its docs at implementation time; library APIs shift between versions.
- No build tooling.

---

## Non-goals (v1)

- No backend, accounts, or cloud sync.
- No video editing/trimming or video export.
- No frame-by-frame stepping (navigation is seconds-based by design).
- No multi-video projects per session.
- No live/clickable timestamp links inside the exported PDF.

---

## Edge cases & risks

- **Memory / large media**: many base64 screenshots grow memory; mitigate with width cap + JPEG quality.
- **Persistence limits**: [Inference] `localStorage` (~5 MB typical) is too small for screenshots; IndexedDB is the right store if persistence is added. Based on commonly documented limits; verify per browser.
- **Codec/format gaps**: some files won't play; surface a clear error on `video` `error` events.
- **Seek precision**: [Inference] setting `currentTime` may land on the nearest decodable point, not an exact frame, depending on codec/keyframes. Frame-exact seeking is not assumed; test on target media.
- **PDF size/perf**: large/numerous images slow generation; downscale specifically for the PDF pass.

---

## Open questions / assumptions

1. **"Chat interface" = the note-taking / annotation panel** (assumed). Flag if you meant something else.
2. **PDF timestamps non-clickable** (assumed).
3. **No cross-session persistence in v1** (assumed in-memory only). Wanting refresh-survival pulls in IndexedDB.
4. **One video per session** (assumed).
5. **Annotations are text-only** (assumed; no drawing on the screenshot).