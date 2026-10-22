import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vite.dev/config/
//
// This project has TWO build modes:
//
//  1. Single-file build (default `npm run build`): bundles the whole app
//     (code + every image, inlined as base64) into ONE self-contained
//     dist/index.html you can just double-click — no server. Great on the PC,
//     but the file is ~115 MB, which is too heavy to load on a phone.
//
//  2. Web build (`npm run build:web`): a normal multi-file build where images
//     stay as separate files and load on demand. This is what gets deployed to
//     GitHub Pages so the phone only downloads what it needs. GitHub Pages
//     serves a project repo under a sub-path, so we set `base` to the repo name.
//
// The mode is chosen by the FG_BUILD env var set in package.json scripts.
const isWeb = process.env.FG_BUILD === 'web';

// Must match the GitHub repo name so asset URLs resolve on Pages.
const REPO_NAME = 'final-girl-assistant';

export default defineConfig({
  base: isWeb ? `/${REPO_NAME}/` : './',
  plugins: [
    react(),
    // Only inline everything into one file for the PC single-file build.
    ...(isWeb ? [] : [viteSingleFile()]),
  ],
  server: {
    port: 5180,
    open: true,
    watch: {
      // Use POLLING instead of the native OS watcher. Polling doesn't hold
      // native file handles, so a briefly-locked file on Windows can't crash
      // the dev server with EBUSY (the bug we kept hitting). Because we now
      // watch src/assets again, newly-added images are picked up on the next
      // poll — no server restart needed, just refresh the page.
      //
      // The large rulebook PDF in /public stays excluded: it's big, rarely
      // changes, and is the file most likely to be locked by a viewer.
      ignored: ['**/public/**'],
      usePolling: true,
      interval: 400,
    },
  },
});
