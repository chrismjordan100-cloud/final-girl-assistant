/* ==========================================================================
   Game board photos — the visual diary.

   Photos live in src/assets/game-photos/, named after the game's id
   (game-{id}.png). They are committed like any other asset, so they show on
   BOTH the PC and the phone via the normal build — no camera upload in-app and
   nothing to sync. The game-log entry stores the expected filename (photoFile);
   this module resolves that name to a bundled image URL when the file exists.
   ========================================================================== */

// Glob every image dropped into the game-photos folder, keyed by base filename.
const photoModules = import.meta.glob(
  '../assets/game-photos/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' }
);
const photosByBase = {};
for (const [path, url] of Object.entries(photoModules)) {
  const base = path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();
  photosByBase[base] = url;
}

// The folder to show in "save your photo here" instructions.
export const GAME_PHOTO_FOLDER = 'src/assets/game-photos/';

/* The filename a game's board photo SHOULD be saved as (no extension assumed —
   the display accepts png/jpg/jpeg/webp, but we recommend .png). */
export function gamePhotoFileName(gameId) {
  return `game-${gameId}.png`;
}

/* The bundled image URL for a game, or null if the photo hasn't been added to
   the folder yet. Accepts either the entry's stored photoFile or its id. */
export function gamePhotoUrl(entryOrId) {
  if (!entryOrId) return null;
  const file =
    typeof entryOrId === 'string'
      ? entryOrId
      : entryOrId.photoFile || (entryOrId.id ? gamePhotoFileName(entryOrId.id) : null);
  if (!file) return null;
  const base = String(file).replace(/\.[^.]+$/, '').toLowerCase();
  return photosByBase[base] || null;
}
