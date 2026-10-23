/* ==========================================================================
   Tier 1 game narrator — a free, offline, template-based recap.

   Turns a logged game's chronological event stream into readable slasher-recap
   prose using the Final Girl's name, the real card names, the killer/location
   flavour, and the outcome. No AI/API — deterministic per game (seeded by the
   game id) so the same game reads the same each time, with a "reshuffle"
   option that varies the phrasing.

   A future Tier 2 (real LLM) can reuse the same structured input; see BACKLOG.
   ========================================================================== */

import { buildTimeline } from './gameSummary.js';
import { findCard, killerFlavour, locationFlavour } from '../data/cardData.js';

/* Map an event type to the card type the card database understands, so we can
   look up the logged card's flavour/effect for embellishment. */
const EVENT_TO_CARD_TYPE = {
  'item-found': 'item-found',
  'item-used': 'item-used',
  'dark-power': 'dark-power',
  finale: 'finale',
  event: 'event',
  'event-start': 'event-start',
  setup: 'setup',
  weapon: 'weapon',
};

/* Deterministic PRNG from a string seed so a game's story is stable. */
function seededRandom(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h = (h ^= h >>> 16) >>> 0;
    return h / 4294967296;
  };
}

/* First name only, for a more natural narrative voice. */
function firstName(full) {
  return (full || 'The Final Girl').split(/\s+/)[0];
}

export function narrateGame(entry, { variant = 0 } = {}) {
  if (!entry) return '';
  const events = buildTimeline(entry.events || []);
  const she = firstName(entry.finalGirlName);
  const killer = entry.killerName || 'the Killer';
  const place = entry.locationName || 'the dark';
  const rnd = seededRandom(`${entry.id || 'game'}:${variant}`);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const chance = (p) => rnd() < p;
  const combo = { killerId: entry.killerId, locationId: entry.locationId };

  // Pull atmospheric flavour for this killer/location from the card dataset.
  const kFlav = killerFlavour(entry.killerId);
  const lFlav = locationFlavour(entry.locationId);

  // Look up the flavour line for a logged card (by type + name), if we know it.
  const flavourFor = (e) => {
    const t = EVENT_TO_CARD_TYPE[e.type];
    if (!t || !e.detail) return null;
    const card = findCard(t, e.detail, combo);
    return card ? card.flavour : null;
  };

  const out = [];

  // --- Opening: location flavour sets the scene, then the confrontation. ---
  if (lFlav) out.push(lFlav);
  const openers = [
    `${she} arrived at ${place}. ${killer} was already waiting.`,
    `It began at ${place}. ${she} against ${killer} — one of them would not see morning.`,
    `${place}. ${she} knew the stories about ${killer}. Tonight she would live them.`,
  ];
  out.push(pick(openers));
  if (kFlav) out.push(kFlav);

  // Setup / starting event colour, embellished with the card's flavour.
  const startE = events.find((e) => e.type === 'event-start');
  if (startE && startE.detail) {
    const f = flavourFor(startE);
    out.push(`The night opened on "${startE.detail}".${f ? ` ${f}` : ''}`);
  }

  // --- Body: walk the timeline, turn by turn ---
  const byTurn = new Map();
  for (const e of events) {
    if (e.turn === 0) continue; // setup handled above
    if (!byTurn.has(e.turn)) byTurn.set(e.turn, []);
    byTurn.get(e.turn).push(e);
  }

  const foundSoFar = new Set();
  for (const [turn, evs] of [...byTurn.entries()].sort((a, b) => a[0] - b[0])) {
    const parts = [];
    const turnFlavours = []; // card flavour lines worth surfacing this turn
    for (const e of evs) {
      const f = flavourFor(e);
      if (f) turnFlavours.push(f);
      switch (e.type) {
        case 'item-found':
          foundSoFar.add(e.detail);
          parts.push(pick([
            `${she} scavenged ${article(e.detail)} ${e.detail}`,
            `${she} got her hands on ${article(e.detail)} ${e.detail}`,
            `a ${e.detail} turned up`,
          ]));
          break;
        case 'item-used':
          parts.push(pick([
            `she put the ${e.detail} to use`,
            `the ${e.detail} came out`,
            `she swung the ${e.detail} at ${killer}`,
          ]));
          break;
        case 'victim-died':
          parts.push(pick([
            `someone screamed and went silent`,
            `${killer} claimed another`,
            `a victim fell`,
          ]));
          break;
        case 'victim-saved':
          parts.push(pick([
            `she dragged another survivor to safety`,
            `one more made it out alive`,
            `she got someone clear`,
          ]));
          break;
        case 'dark-power':
          parts.push(pick([
            `${killer} grew stronger — "${e.detail}"${e.meta && e.meta.power === 'epic' ? ', and it was epic' : ''}`,
            `the air changed as "${e.detail}" took hold`,
          ]));
          break;
        case 'event':
          parts.push(`"${e.detail}" struck`);
          break;
        case 'finale':
          parts.push(pick([
            `the Finale broke open: "${e.detail}"`,
            `the end came into view — "${e.detail}"`,
          ]));
          break;
        case 'weapon':
          parts.push(`she readied the ${e.detail}`);
          break;
        case 'terror':
          parts.push(`terror flared — "${e.detail}"`);
          break;
        case 'note':
          parts.push(e.detail);
          break;
        default:
          break;
      }
    }
    if (parts.length) {
      const lead = pick([`Turn ${turn}:`, `By turn ${turn},`, `On turn ${turn},`]);
      let sentence = `${lead} ${joinNaturally(parts)}.`;
      // Embellish with one of this turn's card flavour lines, some of the time,
      // so the recap breathes without repeating a flavour every single turn.
      if (turnFlavours.length && chance(0.6)) {
        sentence += ` ${pick(turnFlavours)}`;
      }
      out.push(sentence);
    }
  }

  // --- Ending ---
  const turns = entry.turns ? ` after ${entry.turns} turns` : '';
  if (entry.outcome === 'won') {
    out.push(pick([
      `In the end${turns}, ${she} struck the final blow. ${killer} was finished. She walked out of ${place} alive.`,
      `${she} did not break. One last stand${turns}, and ${killer} fell. She survived.`,
    ]));
  } else if (entry.outcome === 'lost') {
    out.push(pick([
      `It wasn't enough. ${turns ? 'After' + turns + ', ' : ''}${killer} caught ${she} at last. ${place} kept another.`,
      `${she} fought${turns}, but ${killer} was relentless. The screaming stopped. She was gone.`,
    ]));
  } else {
    out.push(`The game was abandoned before its end — ${she}'s fate at ${place} left untold.`);
  }

  return out.join(' ');
}

/* "a"/"an" for a card name. */
function article(name) {
  return /^[aeiou]/i.test(String(name || '')) ? 'an' : 'a';
}

/* Join clauses into a sentence with commas + "and then". */
function joinNaturally(parts) {
  if (parts.length === 1) return capitalize(parts[0]);
  const head = parts.slice(0, -1).join(', ');
  const tail = parts[parts.length - 1];
  return capitalize(`${head}, and then ${tail}`);
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
