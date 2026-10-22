/* ==========================================================================
   Offline rules search.

   Builds a flat, searchable index from EVERYTHING the app already knows:
   core rulebook topics, icon meanings, per-Killer/Location setup steps, play
   rules, phase reminders, tips and achievements. A natural-language question
   is tokenised, stopwords dropped, a few Final Girl synonyms expanded, and
   records are ranked by term overlap (title/tag matches weighted higher).

   No network, no API key, no LLM — it surfaces the relevant rule passages so
   you can read the answer yourself. Works fully offline.
   ========================================================================== */
import { ruleTopics, iconReference } from './rules.js';
import {
  killers,
  locations,
  setupExtras,
  playRules,
  phaseExtras,
  generalTips,
  killerTips,
  locationTips,
  normaliseTip,
} from './games.js';

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'am', 'be', 'been', 'being', 'do', 'does', 'did',
  'can', 'could', 'should', 'would', 'will', 'shall', 'may', 'might', 'must',
  'i', 'you', 'we', 'he', 'she', 'it', 'they', 'my', 'your', 'me',
  'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'from', 'as', 'and', 'or',
  'if', 'then', 'than', 'so', 'but', 'that', 'this', 'these', 'those', 'there',
  'what', 'when', 'where', 'which', 'who', 'how', 'why', 'whose', 'whom',
  'my', 'any', 'all', 'some', 'no', 'not', 'into', 'out', 'up', 'down', 'off',
  'about', 'get', 'got', 'have', 'has', 'had', 'able', 'allowed', 'does', 'use',
  'play', 'playing', 'game', 'turn', 'during',
]);

// Light synonym / alias expansion for common Final Girl phrasing. When a token
// on the left is present, the right-hand tokens are also treated as present.
const SYNONYMS = {
  fg: ['final', 'girl'],
  hp: ['health'],
  dmg: ['damage'],
  bl: ['bloodlust'],
  kill: ['defeat', 'destroy', 'damage'],
  defeat: ['kill', 'destroy'],
  move: ['movement', 'moving'],
  moving: ['move', 'movement'],
  rescue: ['save', 'saving', 'victim'],
  save: ['rescue', 'saving', 'victim'],
  heal: ['recover', 'health'],
  dice: ['die', 'roll'],
  die: ['dice', 'roll'],
  attack: ['attacks', 'combat', 'damage'],
  search: ['searching', 'item', 'items'],
  item: ['items', 'search', 'equipment'],
  escape: ['flee', 'run'],
};

function tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/* Query terms: tokenised, stopwords dropped, synonyms expanded. */
function queryTerms(question) {
  const base = tokenize(question).filter((t) => t.length > 1 && !STOPWORDS.has(t));
  const expanded = new Set(base);
  for (const t of base) {
    if (SYNONYMS[t]) SYNONYMS[t].forEach((s) => expanded.add(s));
  }
  return [...expanded];
}

/* --------------------------------------------------------------------------
   Build the index once. Each record:
     { text, title, source, ownerId, ownerName, page, haystack, titleTokens }
   `source` is a human label of where the passage comes from.
   -------------------------------------------------------------------------- */
function buildIndex() {
  const records = [];
  const push = (rec) => {
    const haystackStr = [rec.title, rec.text, (rec.tags || []).join(' ')].join(' ');
    records.push({
      ...rec,
      haystack: tokenize(haystackStr),
      titleTokens: new Set(tokenize(rec.title || '')),
      tagTokens: new Set((rec.tags || []).flatMap((t) => tokenize(t))),
    });
  };

  // 1. Core rulebook topics.
  for (const t of ruleTopics) {
    push({
      title: t.title,
      text: t.body,
      tags: t.tags,
      source: `Rules Reference \u00b7 ${t.section}`,
      page: t.page || null,
      kind: 'core',
    });
  }

  // 2. Icon meanings.
  for (const ic of iconReference) {
    push({
      title: `Icon: ${ic.label}`,
      text: `${ic.glyph}  ${ic.label} (${ic.group}).`,
      tags: [ic.group, 'icon', 'symbol'],
      source: 'Icon Reference',
      kind: 'icon',
    });
  }

  const nameOf = (id) =>
    (killers.find((k) => k.id === id) || locations.find((l) => l.id === id) || {}).name || id;
  const isKiller = (id) => killers.some((k) => k.id === id);

  // 3. Setup extras (per Killer / Location).
  for (const [ownerId, steps] of Object.entries(setupExtras)) {
    for (const s of steps) {
      push({
        title: `${nameOf(ownerId)} setup: ${s.title}`,
        text: s.body,
        tags: [nameOf(ownerId), 'setup'],
        source: `Setup \u00b7 ${nameOf(ownerId)}`,
        ownerId,
        ownerName: nameOf(ownerId),
        ownerType: isKiller(ownerId) ? 'killer' : 'location',
        kind: 'setup',
      });
    }
  }

  // 4. Play rules (points + watch-outs).
  for (const [ownerId, rules] of Object.entries(playRules)) {
    for (const p of rules.points || []) {
      push({
        title: `${nameOf(ownerId)} \u2014 special rule`,
        text: p,
        tags: [nameOf(ownerId), 'rule'],
        source: `Special Rules \u00b7 ${nameOf(ownerId)}`,
        ownerId,
        ownerName: nameOf(ownerId),
        ownerType: isKiller(ownerId) ? 'killer' : 'location',
        kind: 'play',
      });
    }
    for (const w of rules.watchOuts || []) {
      push({
        title: `${nameOf(ownerId)} \u2014 watch out`,
        text: w,
        tags: [nameOf(ownerId), 'warning', 'watch out'],
        source: `Special Rules \u00b7 ${nameOf(ownerId)}`,
        ownerId,
        ownerName: nameOf(ownerId),
        ownerType: isKiller(ownerId) ? 'killer' : 'location',
        kind: 'play',
      });
    }
  }

  // 5. Phase reminders.
  for (const [ownerId, byPhase] of Object.entries(phaseExtras)) {
    for (const [phaseId, items] of Object.entries(byPhase)) {
      for (const text of items) {
        push({
          title: `${nameOf(ownerId)} \u2014 ${phaseId} phase`,
          text,
          tags: [nameOf(ownerId), phaseId, 'phase'],
          source: `Turn Tracker \u00b7 ${nameOf(ownerId)} (${phaseId})`,
          ownerId,
          ownerName: nameOf(ownerId),
          ownerType: isKiller(ownerId) ? 'killer' : 'location',
          kind: 'phase',
        });
      }
    }
  }

  // 6. Tips (now { text, source, confidence } objects).
  for (const grp of generalTips) {
    for (const item of grp.items) {
      const t = normaliseTip(item);
      push({
        title: `Tip: ${grp.category}`,
        text: t.text,
        tags: ['tip', grp.category],
        source: t.source || `Tips \u00b7 ${grp.category}`,
        kind: 'tip',
      });
    }
  }
  for (const [ownerId, items] of Object.entries(killerTips)) {
    for (const item of items) {
      const t = normaliseTip(item);
      push({
        title: `${nameOf(ownerId)} tip`,
        text: t.text,
        tags: [nameOf(ownerId), 'tip'],
        source: t.source || `Tips \u00b7 ${nameOf(ownerId)}`,
        ownerId,
        ownerName: nameOf(ownerId),
        ownerType: 'killer',
        kind: 'tip',
      });
    }
  }
  for (const [ownerId, items] of Object.entries(locationTips)) {
    for (const item of items) {
      const t = normaliseTip(item);
      push({
        title: `${nameOf(ownerId)} tip`,
        text: t.text,
        tags: [nameOf(ownerId), 'tip'],
        source: t.source || `Tips \u00b7 ${nameOf(ownerId)}`,
        ownerId,
        ownerName: nameOf(ownerId),
        ownerType: 'location',
        kind: 'tip',
      });
    }
  }

  // Achievements are deliberately NOT indexed — Ask is about rules, not
  // achievement conditions, which only cluttered the answers.

  return records;
}

// Build once at module load.
const INDEX = buildIndex();

/* --------------------------------------------------------------------------
   Search. Options: { killerId, locationId } — passages tied to the current
   game are boosted (and, when a killer/location is set, off-scenario entity
   passages are gently de-prioritised so answers stay relevant).
   Returns up to `limit` ranked results: { ...record, score }.
   -------------------------------------------------------------------------- */
export function searchRules(question, { killerId, locationId, strict = false, limit = 12 } = {}) {
  const terms = queryTerms(question);
  if (terms.length === 0) return [];

  const hasGame = Boolean(killerId || locationId);
  const scored = [];
  for (const rec of INDEX) {
    // Does this passage belong to a Killer/Location, and is it the one we're
    // playing, or a different scenario's?
    const isOwned = Boolean(rec.ownerId);
    const isThisGame =
      isOwned && (rec.ownerId === killerId || rec.ownerId === locationId);
    const isOtherScenario = isOwned && !isThisGame;

    // STRICT scope with a game selected: drop every passage that belongs to a
    // Killer/Location you are NOT playing — those rules simply don't apply.
    // Generic (core rules, icons, general tips) and this-game passages remain.
    if (strict && hasGame && isOtherScenario) continue;

    const hayset = new Set(rec.haystack);
    let score = 0;
    let hits = 0;
    for (const term of terms) {
      if (rec.titleTokens.has(term)) {
        score += 5;
        hits++;
      } else if (rec.tagTokens.has(term)) {
        score += 3;
        hits++;
      } else if (hayset.has(term)) {
        score += 1.5;
        hits++;
      } else {
        // partial / prefix match (e.g. "bloodlust" vs "bloodlusts")
        const partial = rec.haystack.some((w) => w.length > 3 && (w.startsWith(term) || term.startsWith(w)));
        if (partial) {
          score += 0.6;
          hits++;
        }
      }
    }
    if (hits === 0) continue;

    // Reward covering more of the question.
    score += (hits / terms.length) * 2;

    // Relevance to the current game.
    if (isThisGame) {
      // This game's Killer/Location modifies/adds a rule — surface it high.
      score += 5;
    } else if (isOtherScenario && hasGame && !strict) {
      // A different scenario's entity (non-strict mode only) — push down but
      // don't remove, in case the user is asking about something else.
      score -= 1.2;
    }

    // relevance: 'scenario' = specific to the game you're playing;
    // 'generic' = a baseline rule that applies regardless.
    const relevance = isThisGame ? 'scenario' : 'generic';

    scored.push({ ...rec, score, relevance });
  }

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, limit);

  // Partition so the player sees their scenario-specific modifications first,
  // then the generic baseline rules — both still ordered by relevance within.
  const scenario = top.filter((r) => r.relevance === 'scenario');
  const generic = top.filter((r) => r.relevance === 'generic');
  return { scenario, generic, all: top, hasGame };
}

/** Suggested example questions (static). */
export const EXAMPLE_QUESTIONS = [
  'How does the Horror roll work?',
  'Can I move through walls on the Hellscape?',
  'How does Noise work against the Eyeless?',
  'What happens when I save a Victim?',
  'How do I win against the Poltergeist?',
  'What does the skull icon mean?',
  'How does Bloodlust affect the Killer?',
  'Can Zombies form a Horde?',
];
