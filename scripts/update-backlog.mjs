#!/usr/bin/env node
/* ==========================================================================
   Auto-update the BACKLOG.md RAG statuses from the actual code.

   Each backlog item declares a `check(src)` that inspects the source and
   returns 'green' | 'amber' | 'red'. The script reads the relevant files,
   evaluates every item, and rewrites BACKLOG.md so the RAG never drifts from
   reality. Run by a hook on file save (see .kiro/hooks) and before builds, so
   nobody has to prompt for a re-check.

   Usage: node scripts/update-backlog.mjs
   ========================================================================== */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => {
  const abs = join(root, p);
  return existsSync(abs) ? readFileSync(abs, 'utf8') : '';
};

// Convenience: does any of these files contain the pattern?
const has = (files, re) => files.some((f) => re.test(read(f)));

/* The backlog model. `check` returns a RAG code from current source state.
   title + body are rendered into BACKLOG.md. Order = display order. */
const ITEMS = [
  {
    id: 'flavour-text',
    title: 'Real flavour text on cards',
    body:
      'Find and add REAL flavour text (lore/atmosphere) to the card detail dataset\n' +
      '(`src/data/cards.json`). The current data has rules `effect` text but excludes\n' +
      'flavour. Source it and add a `flavour` field per card so the app — and the game\n' +
      'story generator — can draw on it.',
    check() {
      const cards = read('src/data/cards.json');
      // Official flavour field = green; unofficial atmosphere lines = amber
      // (partial — we have colour, but not verified official card flavour).
      if (/"flavour"\s*:/.test(cards)) {
        const n = (cards.match(/"flavour"\s*:/g) || []).length;
        return n > 50 ? 'green' : 'amber';
      }
      if (/"flavour_unofficial"\s*:/.test(cards)) return 'amber';
      return 'red';
    },
  },
  {
    id: 'card-detail',
    title: 'Update card detail for the extra data',
    body:
      'The card dataset has richer fields (tags, range/damage/hands, bonus_health,\n' +
      'epic flags, start_health/horror, etc.). Surface the useful ones in the places\n' +
      'that show card detail (CardPicker, Game Log detail, Codex if relevant).',
    check() {
      const exposes = /tags|range|damage|hands|bonus_health/.test(read('src/data/cardData.js'));
      const shows = /tags|range|damage/.test(read('src/components/CardPicker.jsx'));
      if (exposes && shows) return 'green';
      if (exposes || shows) return 'amber';
      return 'red';
    },
  },
  {
    id: 'rich-summary',
    title: 'Richer game summary using the extra card detail',
    body:
      'Feed the extra card-detail JSON (effects, flavour, tags) into the game story\n' +
      "generator (`src/lib/narrateGame.js`) so recaps describe what cards actually did,\n" +
      'not just name them. Pairs naturally with the Tier 2 AI recap.',
    check() {
      const n = read('src/lib/narrateGame.js');
      // Green if it imports card data / reads effect text; amber if it references
      // effect at all; red if names only.
      if (/cardData|effectForName|cardOptionsFor/.test(n)) return 'green';
      if (/\beffect\b/.test(n)) return 'amber';
      return 'red';
    },
  },
  {
    id: 'mi-trends',
    title: 'Rich-data trends in MI / Stats',
    body:
      'Surface the captured rich data (items found/used, dark powers, finales, events,\n' +
      'setup variants) as trends in the MI/Stats tab — e.g. most-found items, which\n' +
      'finale shows up in losses, average turns to first Dark Power, etc.',
    check() {
      const s = read('src/views/Stats.jsx');
      if (/itemsFound|darkPowers|deriveSummary|\.events\b/.test(s)) return 'green';
      if (/\bsummary\b/.test(s)) return 'amber';
      return 'red';
    },
  },
  {
    id: 'ai-recap',
    title: 'AI game recap (Tier 2 — richer narrative via an LLM)',
    body:
      'Tier 1 (offline template recap) is DONE and shipped. Tier 2 would send the\n' +
      'structured game to a real LLM for a creative, interpretive narrative.\n\n' +
      'Design notes for when we build it:\n' +
      '- Static site on public GitHub Pages — no backend. A billing API key must NOT\n' +
      '  be baked into the frontend (view-source would leak it).\n' +
      '- Recommended (single user): a Settings box where you paste your own LLM API\n' +
      '  key, stored only in `localStorage` (never committed, never synced). An\n' +
      '  "AI recap" button sends the game to the provider and caches the result.\n' +
      '- Providers: Google Gemini (free tier), OpenAI, Anthropic — keep swappable.\n' +
      '- Alternative: a serverless proxy (Cloudflare/Vercel) holding the key — overkill\n' +
      '  for one user.',
    check() {
      const aiWired = has(
        ['src/lib/narrateGame.js', 'src/lib/aiRecap.js', 'src/views/GameDetail.jsx'],
        /generativelanguage|api\.openai|api\.anthropic|localStorage.*(api[_-]?key|apiKey)/i
      );
      return aiWired ? 'green' : 'red';
    },
  },
  {
    id: 'edit-card-suggest',
    title: 'Edit-form card suggestions',
    body:
      'The Game Log edit form uses plain multi-line text for items/events/etc.\n' +
      'Add per-line card suggestions (like the in-flow CardPicker) so edits also\n' +
      'benefit from the known-card dropdowns.',
    check() {
      return /CardPicker/.test(read('src/views/GameDetail.jsx')) ? 'green' : 'red';
    },
  },
];

const RAG = { green: '🟢', amber: '🟡', red: '🔴' };
const LABEL = { green: 'built & shipped', amber: 'partially built / in progress', red: 'not started' };

// Static "Done" list (things fully shipped that aren't tracked as RAG items).
const DONE = [
  'Hosting on GitHub Pages with auto-deploy on push.',
  'Supabase cloud sync of game log across devices.',
  'Mobile nav (hamburger), larger phone text, home-screen icon + manifest.',
  'Per-turn event capture (victims, items, dark powers, finale, terror, weapons, events, notes) stamped with turn + phase, with fast multi-entry per turn.',
  'Game setup + starting event capture, inline with the setup steps.',
  'Rich end-of-game summary + editable Game Log detail with turn-by-turn timeline.',
  'Bundled card database with known-card dropdowns (+ free text) and effect text.',
  'Enriched demo data with logical, card-accurate event streams.',
  'Tier 1 offline game story generator ("The Story") with reshuffle.',
  'Self-updating backlog RAG (this file is regenerated from the code).',
];

function render() {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push('# Final Girl Rules Assistant — Feature Backlog');
  lines.push('');
  lines.push('_Auto-generated from the codebase by `scripts/update-backlog.mjs` — do not edit by hand; edit the script._');
  lines.push('');
  lines.push('**RAG key:** 🟢 built & shipped · 🟡 partially built / in progress · 🔴 not started');
  lines.push('');
  lines.push(`_RAG last synced to code: ${today}._`);
  lines.push('');
  lines.push('## Backlog');
  lines.push('');
  for (const item of ITEMS) {
    const rag = item.check();
    lines.push(`### ${RAG[rag]} ${item.title}`);
    lines.push('');
    lines.push(item.body);
    lines.push('');
    lines.push(`**Status:** ${RAG[rag]} ${LABEL[rag]}.`);
    lines.push('');
  }
  lines.push('## Done (🟢 shipped)');
  for (const d of DONE) lines.push(`- ${d}`);
  lines.push('');
  return lines.join('\n');
}

const out = render();
writeFileSync(join(root, 'BACKLOG.md'), out);
// Print a one-line summary of the current RAG for logs.
const summary = ITEMS.map((i) => `${RAG[i.check()]} ${i.id}`).join('  ');
console.log('BACKLOG.md updated — ' + summary);
