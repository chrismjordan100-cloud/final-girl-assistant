/* ==========================================================================
   Tier 1 game narrator — a free, offline, long-form slasher recap.

   Turns a logged game's chronological event stream into a substantial piece of
   prose (typically 500–1000 words for a full game): atmospheric opening, a
   paragraph per turn that narrates movement, searching, finds, uses and
   encounters with connective tissue and flavour, rising tension as Dark Powers
   and the Finale arrive, and a climactic ending.

   It "fills in the blanks": between the facts you recorded it adds implied
   beats — moving between spaces, searching, bracing against the dark — drawn
   from the killer/location/card flavour in the card dataset. No AI/API;
   deterministic per game (seeded by id + variant), with a reshuffle.

   A future Tier 2 (real LLM) reuses the same structured input; see BACKLOG.
   ========================================================================== */

import { buildTimeline } from './gameSummary.js';
import { findCard, killerFlavour, locationFlavour } from '../data/cardData.js';

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

function firstName(full) {
  return (full || 'The Final Girl').split(/\s+/)[0];
}
function article(name) {
  return /^[aeiou]/i.test(String(name || '')) ? 'an' : 'a';
}
function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
/* Join clauses into one sentence. */
function joinClauses(parts) {
  if (parts.length === 0) return '';
  if (parts.length === 1) return capitalize(parts[0]) + '.';
  if (parts.length === 2) return capitalize(`${parts[0]}, and ${parts[1]}`) + '.';
  const head = parts.slice(0, -1).join(', ');
  return capitalize(`${head}, and ${parts[parts.length - 1]}`) + '.';
}

export function narrateGame(entry, { variant = 0 } = {}) {
  if (!entry) return '';
  const events = buildTimeline(entry.events || []);
  const she = firstName(entry.finalGirlName);
  const herCap = she; // name is already a proper noun
  const killer = entry.killerName || 'the Killer';
  const place = entry.locationName || 'the dark';
  const rnd = seededRandom(`${entry.id || 'game'}:${variant}`);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const chance = (p) => rnd() < p;
  const combo = { killerId: entry.killerId, locationId: entry.locationId };

  const kFlav = killerFlavour(entry.killerId);
  const lFlav = locationFlavour(entry.locationId);
  const flavourFor = (e) => {
    const t = EVENT_TO_CARD_TYPE[e.type];
    if (!t || !e.detail) return null;
    const c = findCard(t, e.detail, combo);
    return c ? c.flavour : null;
  };

  // Pronoun variety so we don't open every clause with her name.
  const sheWords = [she, 'she', 'she'];
  const nextShe = () => pick(sheWords);

  // Connective "filler" beats to imply the unrecorded motion of a turn.
  const moveBeats = [
    `${she} kept moving, never still long enough to be cornered`,
    `she pressed deeper in`,
    `she worked her way across`,
    `she doubled back, listening`,
    `she slipped from shadow to shadow`,
    `she took the long way round`,
    `she threaded between the spaces he wasn't`,
    `she moved low and quiet`,
    `she picked her route and committed to it`,
    `she put distance between herself and the last scream`,
    `she edged along the walls`,
    `she broke cover and ran for it`,
  ];
  const searchBeats = [
    `tearing through drawers and lockers for anything that might help`,
    `scavenging whatever the dark would give up`,
    `hunting for something, anything, to even the odds`,
    `rifling every corner she dared`,
  ];
  const tensionBeats = [
    `Somewhere close, ${killer} was moving too`,
    `The quiet was worse than the noise`,
    `Every sound could have been him`,
    `She counted her own breaths to keep them steady`,
    `The night pressed in on all sides`,
  ];

  const paras = [];

  // ---- Opening paragraph: scene + confrontation + killer menace ----
  {
    const p = [];
    if (lFlav) p.push(lFlav);
    p.push(pick([
      `This is where it happened — ${place}, and a night ${she} would spend the rest of her life trying to forget.`,
      `It began at ${place}.`,
      `${place}. ${she} had heard the stories. Tonight she would live them.`,
    ]));
    p.push(pick([
      `${she} came in knowing ${killer} was already here, somewhere in the dark, waiting.`,
      `Between her and the dawn stood ${killer}.`,
      `${she} was not the first to face ${killer}. She intended to be the last.`,
    ]));
    if (kFlav) p.push(kFlav);
    const startE = events.find((e) => e.type === 'event-start');
    if (startE && startE.detail) {
      const f = flavourFor(startE);
      p.push(`From the first moment the night had its own ideas — "${startE.detail}".${f ? ` ${f}` : ''}`);
    }
    const setupE = events.find((e) => e.type === 'setup');
    if (setupE && setupE.detail) {
      p.push(`The ground was set for "${setupE.detail}", and there would be no changing it now.`);
    }
    paras.push(p.join(' '));
  }

  // ---- Group events by turn ----
  const byTurn = new Map();
  for (const e of events) {
    if (e.turn === 0) continue;
    if (!byTurn.has(e.turn)) byTurn.set(e.turn, []);
    byTurn.get(e.turn).push(e);
  }
  const turnNumbers = [...byTurn.keys()].sort((a, b) => a - b);
  const lastTurn = turnNumbers[turnNumbers.length - 1] || 0;

  // ---- A paragraph per turn ----
  let darkPowerSeen = false;
  for (const turn of turnNumbers) {
    const evs = byTurn.get(turn);
    const sentences = [];
    const flavours = [];

    // Turn opener — vary it, and fold in "where she is" if recorded.
    const locE = evs.find((e) => e.type === 'location');
    const where = locE && locE.detail ? locE.detail : null;
    // Two opener shapes: a full sentence ("The third turn came.") or a comma
    // lead-in ("By turn 3,") that flows straight into a lowercase move beat.
    const fullOpener = chance(0.5);
    const moveBeat = pick(moveBeats);
    if (fullOpener) {
      const opener = pick([`Turn ${turn}.`, `The ${ordinal(turn)} turn came.`, `The ${ordinal(turn)} turn.`]);
      sentences.push(where
        ? `${opener} ${capitalize(moveBeat)} — ${where}.`
        : `${opener} ${capitalize(moveBeat)}.`);
    } else {
      const lead = pick([`By turn ${turn},`, `On the ${ordinal(turn)} turn,`, `Turn ${turn} —`]);
      sentences.push(where
        ? `${lead} ${moveBeat} — ${where}.`
        : `${lead} ${moveBeat}.`);
    }

    // Walk this turn's recorded beats in order, building prose.
    const foundThisTurn = [];
    for (const e of evs) {
      const f = flavourFor(e);
      if (f) flavours.push(f);
      switch (e.type) {
        case 'item-found': {
          foundThisTurn.push(e.detail);
          sentences.push(
            capitalize(pick([
              `${nextShe()} came up with ${article(e.detail)} ${e.detail}, ${pick(searchBeats)}`,
              `her search turned up ${article(e.detail)} ${e.detail}`,
              `${nextShe()} closed her hand around ${article(e.detail)} ${e.detail}`,
            ])) + '.'
          );
          break;
        }
        case 'item-used':
          sentences.push(
            capitalize(pick([
              `when the moment came, ${nextShe()} brought the ${e.detail} to bear on ${killer}`,
              `${nextShe()} put the ${e.detail} to work`,
              `the ${e.detail} came up and ${nextShe()} did not hesitate`,
            ])) + '.'
          );
          break;
        case 'victim-died':
          sentences.push(
            pick([
              `A scream tore across ${place} and then stopped. ${killer} had taken another.`,
              `She was a heartbeat too slow. Somewhere, someone stopped running for good.`,
              `${killer} found one of the others. The silence after was the loudest thing in the dark.`,
            ])
          );
          break;
        case 'victim-saved':
          sentences.push(
            pick([
              `${capitalize(nextShe())} reached one of the others in time and dragged them clear.`,
              `Against the odds, ${nextShe()} got someone out alive.`,
              `One more soul she refused to leave behind — pulled from the dark and pointed toward the road.`,
            ])
          );
          break;
        case 'dark-power':
          darkPowerSeen = true;
          sentences.push(
            `${killer} changed. "${e.detail}" woke in him${e.meta && e.meta.power === 'epic' ? ' — and it was the epic kind, the worst of him' : ''}, and the odds tilted a little further from her.`
          );
          break;
        case 'event':
          sentences.push(`Then the night threw "${e.detail}" at her, because of course it did.`);
          break;
        case 'terror':
          sentences.push(`Terror rippled out — "${e.detail}" — and ${nextShe()} rode it out and kept moving.`);
          break;
        case 'weapon':
          sentences.push(`${capitalize(nextShe())} readied the ${e.detail}, knuckles white.`);
          break;
        case 'finale':
          sentences.push(
            pick([
              `And then everything narrowed to one thing: the Finale. "${e.detail}". No more hiding. No more Terror to draw. Just her and him and the end of it.`,
              `The last act opened — "${e.detail}" — and ${place} seemed to hold its breath.`,
            ])
          );
          break;
        case 'note':
          if (e.detail) sentences.push(capitalize(e.detail) + (/[.!?]$/.test(e.detail) ? '' : '.'));
          break;
        case 'location':
          // already used as the turn opener
          break;
        default:
          break;
      }
    }

    // Fill a blank turn (only movement recorded) with a tension beat.
    if (sentences.length <= 1) {
      sentences.push(pick(tensionBeats) + '.');
    }

    // Weave in up to one card-flavour line this turn.
    if (flavours.length && chance(0.7)) {
      sentences.splice(Math.min(2, sentences.length), 0, pick(flavours));
    }

    // Occasional tension beat mid/late game to keep the dread building.
    if (turn > 1 && turn < lastTurn && chance(0.35)) {
      sentences.push(pick(tensionBeats) + '.');
    }

    paras.push(sentences.join(' '));
  }

  // ---- Closing paragraph ----
  {
    const turns = entry.turns ? ` after ${entry.turns} hard-won turns` : '';
    const p = [];
    if (entry.outcome === 'won') {
      p.push(pick([
        `In the end${turns}, ${she} did what no one at ${place} had managed before her — she stood her ground, and she struck the last blow.`,
        `It came down to one final moment${turns}. ${she} did not flinch.`,
      ]));
      p.push(pick([
        `${killer} fell. The dark that had owned ${place} let go of it, just a little.`,
        `Whatever ${killer} was, it was finished now.`,
      ]));
      if (darkPowerSeen) p.push(`Even with his worst unleashed, he was not enough.`);
      p.push(pick([
        `${she} walked out alive. She would not sleep for a long time — but she walked out.`,
        `Dawn found her still standing. That was the whole of the victory, and it was everything.`,
      ]));
    } else if (entry.outcome === 'lost') {
      p.push(pick([
        `It wasn't enough.${turns ? ' Not' + turns + '.' : ''} ${killer} closed the distance one final time, and there was nowhere left to run.`,
        `${she} fought to the last${turns}. But ${killer} was patient, and the dark was deep.`,
      ]));
      p.push(pick([
        `${place} kept her, the way it had kept the others.`,
        `The screaming stopped. The quiet came back. And ${place} waited for the next one.`,
      ]));
      if (kFlav) p.push(kFlav);
    } else {
      p.push(`The night was left unfinished — ${she}'s fate at ${place} still hanging in the dark, untold.`);
    }
    paras.push(p.join(' '));
  }

  // Join paragraphs with blank lines for readability.
  return paras.filter(Boolean).join('\n\n');
}

/* Ordinal words for small turn numbers, numeric fallback above twelve. */
function ordinal(n) {
  const words = [
    '', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh',
    'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth',
  ];
  return words[n] || `${n}th`;
}
