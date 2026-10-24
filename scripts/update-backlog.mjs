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
    affects: ['Card data', 'Codex', 'The Story'],
    remaining:
      'Cards carry unofficial atmosphere lines (flavour_unofficial). Official card flavour still to source and add as a `flavour` field.',
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
    affects: ['Card picker', 'Game Log', 'Codex'],
    remaining:
      'cardData.js exposes the extra fields, but the CardPicker (and Game Log detail) do not show them yet.',
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
    affects: ['The Story', 'Game Log'],
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
    title: 'Rich-data trends in MI / Stats (embellished with card detail)',
    affects: ['MI / Stats'],
    body:
      'Surface the captured rich data as trends in the MI/Stats tab, and embellish\n' +
      'them using the card dataset (effects, flavour, tags) so the stats read like\n' +
      'insight, not just counts. Ideas:\n' +
      '- Most-found and most-used items (by name); your "signature" item.\n' +
      '- Win rate when the Epic Dark Power / Finale came out vs not.\n' +
      '- Average turn the first Dark Power lands; average turn the Finale opens.\n' +
      '- Average victims saved vs died, and how that correlates with winning.\n' +
      '- Which Events/Terror cards show up most in your losses ("your nemesis cards").\n' +
      '- Turn you typically enable your Final Girl Ultimate, and win rate once enabled.\n' +
      '- Pull card flavour/effect into the trend captions for colour (e.g. show the\n' +
      "  item's flavour line next to \"most-used item\").\n" +
      '- Feed these aggregates to the (future) Tier 2 AI for a "meta" season summary.',
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
    affects: ['Game Log', 'The Story', 'Settings'],
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
    affects: ['Game Log'],
    body:
      'The Game Log edit form uses plain multi-line text for items/events/etc.\n' +
      'Add per-line card suggestions (like the in-flow CardPicker) so edits also\n' +
      'benefit from the known-card dropdowns.',
    check() {
      return /CardPicker/.test(read('src/views/GameDetail.jsx')) ? 'green' : 'red';
    },
  },
  {
    id: 'voice-narration',
    title: 'Voice: better narrator + read the game story aloud',
    affects: ['Start Game audio', 'Game Log'],
    body:
      'Two related voice improvements:\n' +
      '1. Improve the start-of-game narration voice (the current Web Speech / system\n' +
      '   voice sounds poor — "crap voice"). Pick a better voice, tune rate/pitch, or\n' +
      '   move to a nicer TTS. Relevant code: src/hooks/useNarration.js.\n' +
      '2. NEW: after a game is saved, let the voice read the generated story\n' +
      '   narrative aloud — a "read me the recap" button on the Game Log detail\n' +
      '   (and/or an auto-offer right after Save result). Reuse the narrateGame\n' +
      '   output as the text to speak.\n' +
      'Note: if the Tier 2 AI recap lands, prefer speaking that richer text. A nicer\n' +
      'cloud TTS would also pair with the user-supplied-API-key approach noted above.',
    check() {
      // Green when the story narrative can be spoken (narration wired into the
      // Game Log detail / story). Today narration is only the start-of-game read.
      const gd = read('src/views/GameDetail.jsx');
      const speaksStory = /useNarration|speak\s*\(/.test(gd);
      return speaksStory ? 'green' : 'red';
    },
  },
  {
    id: 'extreme-horror-dice',
    title: 'Extreme Horror Mode dice track',
    affects: ['Turn Tracker'],
    body:
      'The Turn Tracker now computes Horror Roll dice from the STANDARD player\n' +
      'board track (Horror 1 = 3 dice, 2–5 = 2 dice, 6 = 1 die). Extreme Horror\n' +
      'mode uses a harsher track (and 5 Time per turn instead of 6). Add an\n' +
      'Extreme-mode toggle and its dice mapping so the dice count is right in that\n' +
      'mode too. Relevant code: diceForHorror() in src/views/TurnTracker.jsx.',
    check() {
      const tt = read('src/views/TurnTracker.jsx');
      return /extreme/i.test(tt) ? 'green' : 'red';
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

/* Also emit the items as JSON for the in-app Asset Admin backlog panel, so the
   app shows these auto-tracked items alongside its own hand-kept list.
   RAG maps to the Admin statuses: green=done, amber=partial, red=todo.
   No date in here, and only written when it changes, so it doesn't churn. */
const STATUS_FOR = { green: 'done', amber: 'partial', red: 'todo' };
// Join wrapped lines into prose, but keep line breaks before list items.
const toDetail = (body) => body.replace(/\n(?!\s*(?:- |\d+\.))/g, ' ').replace(/ {2,}/g, ' ');
const json = JSON.stringify(
  ITEMS.map((i) => {
    const rag = i.check();
    return {
      id: i.id,
      title: i.title,
      detail: toDetail(i.body),
      affects: i.affects || [],
      status: STATUS_FOR[rag],
      ...(rag === 'amber' && i.remaining ? { remaining: i.remaining } : {}),
      auto: true,
    };
  }),
  null,
  2
) + '\n';
const jsonPath = join(root, 'src/data/backlogAuto.json');
if (read('src/data/backlogAuto.json') !== json) writeFileSync(jsonPath, json);
// Print a one-line summary of the current RAG for logs.
const summary = ITEMS.map((i) => `${RAG[i.check()]} ${i.id}`).join('  ');
console.log('BACKLOG.md updated — ' + summary);
