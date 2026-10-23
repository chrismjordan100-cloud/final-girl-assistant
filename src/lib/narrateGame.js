/* ==========================================================================
   Tier 1 game narrator — a free, offline, long-form slasher recap.

   Turns a logged game's chronological event stream into a substantial piece of
   prose — aiming for 500+ words even for a modest game. Atmospheric opening,
   a rich paragraph per turn that narrates movement, searching, finds, uses,
   rescues, powers and encounters with connective tissue and flavour, rising
   dread as Dark Powers and the Finale arrive, and a climactic ending.

   It "fills in the blanks": between the facts you recorded it adds implied
   beats — moving between spaces, searching, bracing against the dark — drawn
   from the killer / location / card / Final-Girl flavour in the card dataset.
   If the result still falls short of the target length, it folds in extra
   atmospheric interstitials so every recap reads full. No AI/API; deterministic
   per game (seeded by id + variant), with a reshuffle.

   A future Tier 2 (real LLM) reuses the same structured input; see BACKLOG.
   ========================================================================== */

import { buildTimeline } from './gameSummary.js';
import {
  findCard,
  killerFlavour,
  locationFlavour,
  finalGirlUltimate,
} from '../data/cardData.js';

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

const TARGET_WORDS = 520; // soft floor — pad with atmosphere if we fall short

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
function wordCount(s) {
  return s.split(/\s+/).filter(Boolean).length;
}
/* Lowercase a leading flavour fragment so it can follow a comma lead-in. */
function lower(s) {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
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

  const kFlav = killerFlavour(entry.killerId);
  const lFlav = locationFlavour(entry.locationId);
  const ult = finalGirlUltimate(entry.finalGirlName);
  const fgFlav = ult ? ult.flavour : null;
  const flavourFor = (e) => {
    const t = EVENT_TO_CARD_TYPE[e.type];
    if (!t || !e.detail) return null;
    const c = findCard(t, e.detail, combo);
    return c ? c.flavour : null;
  };

  // A short, readable snippet of what a card actually DOES, drawn from its
  // rules effect text — so the story can describe the effect, not just name
  // the card. We take the first sentence/clause, trim rules jargon lightly,
  // and cap the length so it reads as prose rather than a rulebook dump.
  const effectFor = (e) => {
    const t = EVENT_TO_CARD_TYPE[e.type];
    if (!t || !e.detail) return null;
    const c = findCard(t, e.detail, combo);
    if (!c || !c.effect) return null;
    let s = String(c.effect).trim();
    // First sentence only (keep it punchy).
    const firstSentence = s.match(/^[^.!?]*[.!?]/);
    if (firstSentence) s = firstSentence[0];
    s = s.replace(/\s+/g, ' ').trim().replace(/[.!?]+$/, '');
    // Cap length so a wordy card doesn't swamp the prose.
    if (s.length > 120) {
      s = s.slice(0, 117).replace(/\s+\S*$/, '');
      s = s.replace(/[,;:\s]+$/, ''); // no dangling punctuation before the ellipsis
      s += '…';
    }
    return s || null;
  };
  // The effect as a clause. Game effects often start with a name or an
  // imperative ("Hans now begins…", "Roll 2 dice…"), which read better in
  // their natural case than forced lowercase, so we keep the original casing.
  const effectClause = (e) => effectFor(e);

  const sheWords = [she, 'she', 'she'];
  const nextShe = () => pick(sheWords);

  // --- Vocabularies (each returns one or more full sentences) --------------
  const moveBeats = [
    `${she} kept moving, never still long enough to be cornered`,
    `she pressed deeper in, trusting her feet more than her eyes`,
    `she worked her way across, counting exits as she went`,
    `she doubled back, listening for the drag of a step that wasn't hers`,
    `she slipped from shadow to shadow`,
    `she took the long way round, the safer way, or so she told herself`,
    `she threaded between the spaces he wasn't`,
    `she moved low and quiet, hugging whatever cover there was`,
    `she picked her route and committed to it`,
    `she put distance between herself and the last scream`,
    `she edged along the walls where the floor wouldn't betray her`,
    `she broke cover and ran, because standing still was worse`,
  ];
  const searchBeats = [
    `tearing through drawers and lockers for anything that might help`,
    `scavenging whatever the dark would give up`,
    `hunting for something, anything, to even the odds`,
    `rifling every corner she dared reach into`,
    `turning the place over with shaking hands`,
  ];
  const tensionBeats = [
    `Somewhere close, ${killer} was moving too, and the not-knowing-where was its own kind of terror.`,
    `The quiet was worse than the noise; the quiet meant he was being careful.`,
    `Every creak could have been him. Most of them weren't. That was the trap of it.`,
    `She counted her own breaths to keep them steady, and lost count, and started again.`,
    `The night pressed in on all sides, patient as a held breath.`,
    `For a moment nothing happened, and somehow that was the hardest part.`,
    `Her pulse was loud enough that she was sure it would give her away.`,
  ];
  const interstitials = [
    `${place} did not care who won. It had seen this before and would see it again.`,
    `Time stretched the way it only does when something is hunting you — each second both an eternity and gone too fast.`,
    `She thought, briefly, of the people who had walked these same spaces and never walked out. She did not let herself think about it long.`,
    `There is a particular arithmetic to a night like this: how far to the next room, how many seconds a locked door buys, how much fight is left in your legs.`,
    `Fear, she had learned, was not the enemy. Freezing was. So she kept choosing to move.`,
  ];

  const paras = [];

  // ---- Opening paragraph ----
  {
    const p = [];
    if (lFlav) p.push(lFlav);
    p.push(pick([
      `This is where it happened — ${place} — and it would become a night ${she} spent the rest of her life trying to forget, and never quite could.`,
      `It began, as these things do, at ${place}: ordinary until it wasn't.`,
      `${place}. ${she} had heard the stories, the way everyone had. Tonight she would stop hearing them and start living one.`,
    ]));
    p.push(pick([
      `${she} came in already knowing ${killer} was here, somewhere in the dark ahead of her, waiting with all the patience of something that has done this many times before.`,
      `Between her and the dawn stood ${killer}, and only one of them would see it.`,
      `${she} was not the first to face ${killer}. She had decided, somewhere on the way in, that she would be the last.`,
    ]));
    if (kFlav) p.push(kFlav);
    if (fgFlav) p.push(`${fgFlav} Whatever that counted for, she would need all of it.`);
    const startE = events.find((e) => e.type === 'event-start');
    if (startE && startE.detail) {
      const f = flavourFor(startE);
      p.push(`From the first moment the night had its own ideas — "${startE.detail}". ${f ? `${f} ` : ''}She filed it away and kept going.`);
    }
    const setupE = events.find((e) => e.type === 'setup');
    if (setupE && setupE.detail) {
      p.push(`The ground was set for "${setupE.detail}", and there would be no changing it now; she would have to win on the terms the night had dealt her.`);
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

  let darkPowerSeen = false;
  let powerEnabled = false;

  const totalTurns = turnNumbers.length;
  let turnOrdinalPos = 0; // position among played turns (0-based), for pacing
  for (const turn of turnNumbers) {
    const evs = byTurn.get(turn);
    const sentences = [];
    const flavours = [];

    const locE = evs.find((e) => e.type === 'location');
    const where = locE && locE.detail ? locE.detail : null;
    const moveBeat = pick(moveBeats);

    // Immersive transition instead of a turn number. Varies by where we are in
    // the game (opening beats, the thick of it, the closing stretch) so the
    // story reads with momentum rather than "Turn 3."
    const frac = totalTurns > 1 ? turnOrdinalPos / (totalTurns - 1) : 0;
    let transitions;
    if (turnOrdinalPos === 0) {
      transitions = ['At first,', 'To begin with,', 'Early on,', 'In the first of it,'];
    } else if (frac < 0.5) {
      transitions = ['Then,', 'Next,', 'Not long after,', 'A little while later,', 'Soon enough,'];
    } else if (frac < 0.85) {
      transitions = ['As the night wore on,', 'Later,', 'Deeper into it,', 'The hours turned, and', 'By now,'];
    } else {
      transitions = ['Near the end,', 'As it all closed in,', 'In the last of it,', 'Toward the finish,'];
    }
    const trans = pick(transitions);
    sentences.push(where
      ? `${trans} ${moveBeat} — ${where}.`
      : `${trans} ${moveBeat}.`);
    turnOrdinalPos += 1;

    for (const e of evs) {
      const f = flavourFor(e);
      if (f) flavours.push(f);
      switch (e.type) {
        case 'item-found':
          sentences.push(
            capitalize(pick([
              `${nextShe()} came up with ${article(e.detail)} ${e.detail}, ${pick(searchBeats)}`,
              `her search turned up ${article(e.detail)} ${e.detail} — not much, maybe, but more than she'd had a moment ago`,
              `${nextShe()} closed her hand around ${article(e.detail)} ${e.detail} and felt, for a heartbeat, less alone`,
            ])) + '.'
          );
          break;
        case 'item-used': {
          const eff = effectClause(e);
          const base = pick([
            `when the moment came, ${nextShe()} brought the ${e.detail} to bear on ${killer} and made it count`,
            `${nextShe()} put the ${e.detail} to work — no finesse, just need`,
            `the ${e.detail} came up and ${nextShe()} did not hesitate, because hesitation was how the others had died`,
          ]);
          // Describe what it does, not just that she used it.
          sentences.push(capitalize(base) + (eff ? ` — ${eff}.` : '.'));
          break;
        }
        case 'victim-died':
          sentences.push(pick([
            `A scream tore across ${place} and then stopped, cut clean off. ${killer} had taken another, and there was nothing she could do but keep breathing.`,
            `She was a heartbeat too slow. Somewhere behind her, someone stopped running for good, and the night got a little emptier.`,
            `${killer} found one of the others. The silence afterward was the loudest thing in the dark, and it sat in her chest like a stone.`,
          ]));
          break;
        case 'victim-saved':
          sentences.push(pick([
            `${capitalize(nextShe())} reached one of the others in time and dragged them clear, hands slick, heart hammering.`,
            `Against every odd, ${nextShe()} got someone out alive — one small defiance thrown back at the dark.`,
            `One more soul she refused to leave behind, pulled from the shadow and pointed hard toward the way out.`,
          ]));
          break;
        case 'victim-escape':
          sentences.push(pick([
            `${capitalize(nextShe())} bought a trapped survivor the opening they needed, and watched them vanish toward safety before ${killer} could turn.`,
            `A victim who should have died didn't — ${nextShe()} covered their escape and swallowed the cost of it.`,
            `${capitalize(nextShe())} cleared a path and sent one of the others running for the dark edge of the map, free.`,
          ]));
          break;
        case 'fg-power': {
          powerEnabled = true;
          const abilityRaw = e.detail || (ult && ult.ability) || '';
          const ability = abilityRaw.replace(/[.\s]+$/, ''); // no trailing dot
          sentences.push(pick([
            `And then something turned. ${capitalize(nextShe())} crossed the line she'd been fighting toward all night — her Ultimate, earned in blood and rescues${ability ? `: ${lower(ability)}` : ''}. For the first time, the odds looked back at her instead.`,
            `The tide shifted. Enough saved, enough survived, and ${nextShe()} came into her full strength${ability ? ` — ${lower(ability)}` : ''}. ${capitalize(killer)} should have been worried.`,
          ]));
          break;
        }
        case 'dark-power': {
          darkPowerSeen = true;
          const eff = effectClause(e);
          sentences.push(
            `${killer} changed. "${e.detail}" woke in him${e.meta && e.meta.power === 'epic' ? ' — and it was the epic kind, the very worst of him' : ''}` +
            (eff ? ` — ${eff} — ` : ', ') +
            `and she felt the odds tilt further from her, the room grow colder, the fight grow longer.`
          );
          break;
        }
        case 'event': {
          const eff = effectClause(e);
          const base = pick([
            `the night threw "${e.detail}" at her, because of course it did`,
            `"${e.detail}" came out of nowhere and rewrote the rules mid-stride`,
            `"${e.detail}" landed, one more thing the dark had been holding back`,
          ]);
          sentences.push(capitalize(base) + (eff ? `: ${eff}. ` : '. ') + pick([
            `She adjusted, because stopping wasn't an option.`,
            `Nothing here was ever going to be simple.`,
            `She took it on the chin and kept going.`,
          ]));
          break;
        }
        case 'terror': {
          const eff = effectClause(e);
          const base = pick([
            `Terror rippled out — "${e.detail}"`,
            `The Terror deck turned up "${e.detail}"`,
            `"${e.detail}" crept in from the edges of the dark`,
            `Then came "${e.detail}"`,
            `The night tightened its grip: "${e.detail}"`,
          ]);
          const reaction = pick([
            `and ${nextShe()} braced against it and pressed on`,
            `and ${nextShe()} swallowed the fear and kept moving`,
            `and ${nextShe()} refused to let it root her to the spot`,
            `and ${nextShe()} weathered it, barely`,
            `and it took everything she had not to run blind`,
          ]);
          sentences.push(`${base}${eff ? ` — ${eff}` : ''} — ${reaction}.`);
          break;
        }
        case 'weapon': {
          const eff = effectClause(e);
          sentences.push(`${capitalize(nextShe())} readied the ${e.detail}, knuckles white` + (eff ? `; ${eff}.` : `, and told herself it would be enough.`));
          break;
        }
        case 'finale': {
          const eff = effectClause(e);
          sentences.push(pick([
            `And then everything narrowed to one thing: the Finale. "${e.detail}". No more hiding, no more Terror to draw, no more waiting — just her and him and the end of it, one way or the other.`,
            `The last act opened — "${e.detail}" — and ${place} itself seemed to hold its breath, waiting to see which of them would still be standing.`,
          ]) + (eff ? ` From here on, ${eff}.` : ''));
          break;
        }
        case 'note':
          if (e.detail) sentences.push(capitalize(e.detail) + (/[.!?]$/.test(e.detail) ? '' : '.'));
          break;
        default:
          break;
      }
    }

    // Every turn gets at least a little texture.
    if (sentences.length <= 1) {
      sentences.push(pick(tensionBeats));
      if (chance(0.5)) sentences.push(capitalize(pick(searchBeats)) + ', she pressed on.');
    }
    if (flavours.length && chance(0.75)) {
      sentences.splice(Math.min(2, sentences.length), 0, pick(flavours));
    }
    if (turn > 1 && turn < lastTurn && chance(0.45)) {
      sentences.push(pick(tensionBeats));
    }

    paras.push(sentences.join(' '));
  }

  // ---- Closing paragraph ----
  {
    const turns = entry.turns ? ` after ${entry.turns} hard-won turns` : '';
    const p = [];
    if (entry.outcome === 'won') {
      p.push(pick([
        `In the end${turns}, ${she} did what no one at ${place} had managed before her — she stood her ground, she chose the moment, and she struck the last blow.`,
        `It came down to a single moment${turns}, the kind everything else had been building toward, and ${she} did not flinch from it.`,
      ]));
      p.push(pick([
        `${killer} fell, and the dark that had owned ${place} loosened its grip, just a little, just enough.`,
        `Whatever ${killer} had been — whatever he still was — it was finished now, and the finishing was hers.`,
      ]));
      if (powerEnabled) p.push(`In the end it was her own strength, fully come into, that did it.`);
      else if (darkPowerSeen) p.push(`Even with his worst unleashed, he had not been enough.`);
      p.push(pick([
        `${she} walked out alive. She would not sleep properly for a long time — but she walked out, and that was the whole of it.`,
        `Dawn found her still standing, filthy and shaking and breathing. That was the entire victory, and it was everything.`,
      ]));
    } else if (entry.outcome === 'lost') {
      p.push(pick([
        `It wasn't enough.${turns ? ' Not' + turns + '.' : ''} ${killer} closed the distance one final time, and there was nowhere left to run and nothing left to try.`,
        `${she} fought to the very last${turns}. But ${killer} was patient, and the dark was deep, and in the end the night took what it had come for.`,
      ]));
      p.push(pick([
        `${place} kept her, the way it had kept the others, the way it always does.`,
        `The screaming stopped. The quiet came back, settling over everything. And ${place} simply waited for the next one.`,
      ]));
      if (kFlav) p.push(kFlav);
    } else {
      p.push(`The night was left unfinished — ${she}'s fate at ${place} still hanging somewhere in the dark, a story without its last page.`);
    }
    paras.push(p.join(' '));
  }

  // ---- Length floor: pad with atmosphere until we clear the target ----
  let text = paras.filter(Boolean).join('\n\n');
  let guard = 0;
  const usedInter = new Set();
  while (wordCount(text) < TARGET_WORDS && guard < interstitials.length + tensionBeats.length) {
    // Prefer unused interstitials, then tension beats, inserted before the
    // closing paragraph so the ending stays last.
    const pool = interstitials.filter((s) => !usedInter.has(s));
    const line = pool.length ? pick(pool) : pick(tensionBeats);
    usedInter.add(line);
    const idx = Math.max(1, paras.length - 1);
    paras.splice(idx, 0, line);
    text = paras.filter(Boolean).join('\n\n');
    guard += 1;
  }

  return text;
}
