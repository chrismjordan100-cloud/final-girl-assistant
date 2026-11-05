# Game board photos (visual diary)

One optional photo per logged game — a snapshot of the final board. These are
kept SEPARATE from `src/assets/games/` (which holds card/killer/location art) so
the diary doesn't clog that folder.

## How it works

- When a game is recorded, its log entry stores a `photoFile` name, e.g.
  `game-g-1730800000000.png` (named after the game's unique id).
- The end-of-game screen and the Debrief tab both show that exact filename.
- **Upload is a PC job:** on the desktop, save your board photo into THIS folder
  using that filename, then commit + push (or ask Kiro to). On the next build the
  photo appears in the Game Log detail — on both PC and phone — via the normal
  asset pipeline. No camera upload happens in the app itself.

## Naming

```
game-{gameId}.png        e.g. game-g-1730800000000.png
```

`.png`, `.jpg`, `.jpeg` and `.webp` all work. One photo per game. The app matches
the file by the entry's `photoFile` value, so keep the name exactly as shown in
the app.
