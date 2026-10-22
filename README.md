# Final Girl — Rules Assistant

A personal, fan-made companion app for the board game **Final Girl** by Van Ryder Games.
Built for my own use at the table. Not affiliated with, endorsed by, or licensed by
Van Ryder Games. Rules content is summarised from the Core rulebook for personal,
non-commercial reference only.

## What it does

- **Setup Assist** — a guided, checkable walkthrough of the full game setup (all 18
  steps, grouped into logical stages). Progress is saved in the browser so you can set
  up at your own pace.
- **Turn Tracker** — step through the five phases of every turn (Action → Planning →
  Killer → Panic → Upkeep) with per-phase checklists and reminders, a turn counter, and
  a Horror Roll quick-reference.
- **Rules Reference** — keyword search across the core rules topics, plus the full icon
  reference grouped by category.

## Tech

- [Vite](https://vite.dev/) + React 18
- No backend; progress persists via `localStorage`
- Theming in `src/styles/theme.css` (1980s slasher / VHS aesthetic)

## Running it

```bash
npm install
npm run dev      # start the dev server (http://localhost:5180)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project layout

```
src/
  App.jsx                # app shell + nav
  main.jsx               # entry point
  data/rules.js          # all rules content (setup, phases, icons, topics)
  styles/
    theme.css            # palette, fonts, grain/scanline overlays, shared bits
    app.css              # shell + home layout
  views/
    Home.jsx
    SetupAssist.jsx      # + .css
    TurnTracker.jsx      # + .css
    RulesReference.jsx   # + .css
```

## Updating the rules data

The rules were extracted from `FinalGirl_Rules_Core.pdf` using a one-off build script:

```bash
npm run extract-pdf      # writes rules-extracted.txt
```

The structured, app-facing content lives in `src/data/rules.js`. Edit that file to
refine wording or add topics.
