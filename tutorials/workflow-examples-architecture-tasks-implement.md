
vas

@vasumanmoza
·
May 18
Step 1: http://architecture.md

Open ChatGPT (4o, not o1/o3/o4) and say:

“ I’m building a [description of your product - the more detailed the better]. Use Next.js for frontend, Supabase for DB + auth. 
Give me the full architecture:
- File + folder structure
- What each part does
- Where state lives, how services connect
Format this entire document in markdown.”

Save its output as http://architecture.md and throw it in an empty folder where your project will live.
vas

@vasumanmoza
·
May 18
Step 2: http://tasks.md

Now say:

“ Using that architecture, write a granular step-by-step plan to build the MVP.
Each task should:
- Be incredibly small + testable
- Have a clear start + end
- Focus on one concern
I’ll be passing this off to an engineering LLM that will be told to complete one task at a time, allowing me to test in between. "

Save it as http://tasks.md. Again, throw it in the folder.
tasks.md
TasksMD - Open Data Task Management Using Markdown
Privacy-focused task management with TasksMD. Your data stays yours.
vas

@vasumanmoza
·
May 18
Step 3: In Cursor/Windsurf

“ You’re an engineer building this codebase.
You've been given http://architecture.md and http://tasks.md.
- Read both carefully. There should be no ambiguity about what we’re building.
- Follow http://tasks.md and complete one task at a time.
- After each task, stop. I’ll test it. If it works, commit to GitHub and move to the next. "

Include this as well - this is crucial:

### CODING PROTOCOL ###
" Coding Instructions

- Write the absolute minimum code required
- No sweeping changes
- No unrelated edits - focus on just the task you're on
- Make code precise, modular, testable
- Don’t break existing functionality
- If I need to do anything (e.g. Supabase/AWS config), tell me clearly  "