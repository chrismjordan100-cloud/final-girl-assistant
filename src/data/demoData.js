/* ==========================================================================
   DEMO DATA.

   A generated set of fake completed games so the stats-driven tabs (MI,
   Achievements, Game Log, Debrief, Scenarios) look populated for demos,
   before you've built a real history. Produced deterministically from the
   real roster so every id is valid and icons/names resolve.

   Toggled on/off via the demo switch; it never touches your real data.
   ========================================================================== */
import { killers, locations, finalGirls, getAchievements } from './games.js';
import {
  getItems,
  getDarkPowers,
  getMinorDarkPowers,
  getFinales,
  getEvents,
  getSetupCards,
} from './cardData.js';
import { deriveSummary } from '../lib/gameSummary.js';

const PHASES = [
  { id: 'action', name: 'Action' },
  { id: 'planning', name: 'Planning' },
  { id: 'killer', name: 'Killer' },
  { id: 'panic', name: 'Panic' },
  { id: 'upkeep', name: 'Upkeep' },
];

// Deterministic pseudo-random so the demo set is stable between loads.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SAMPLE_MISTAKES = [
  { type: 'rules', text: 'Moved the Killer on a target-only action (no boot icon).' },
  { type: 'rules', text: 'Forgot the Finale replaces the Killer Action.' },
  { type: 'rules', text: 'Let Time drop below zero outside the Action phase.' },
  { type: 'strategy', text: 'Chased rescues instead of setting up the kill.' },
  { type: 'strategy', text: 'Emptied my hand too early, no Reaction in reserve.' },
  { type: 'strategy', text: 'Left Horror too low on a big attack turn.' },
  { type: 'rules', text: 'Broke a targeting tie toward myself instead of the Victims.' },
  { type: 'strategy', text: 'Went for the kill before unlocking the Ultimate.' },
];

const NOTES = [
  'Close one — down to the Final Health token.',
  'Smooth run, Horror stayed green all game.',
  'Bad opening draw, never recovered.',
  'House rules, just messing about.',
  'Nearly had it, one bad roll in the Finale.',
  '',
  '',
];

/* Build a realistic, logically-ordered event stream for one demo game from the
   REAL card data for that killer/location. Produces the same { id, turn,
   phaseId, phaseName, type, detail, meta, at } shape the Turn Tracker captures,
   so the demo exercises the summary + timeline code exactly like real games.

   Logic baked in:
     - turn 0 "Game start": a setup card + a starting event (if data exists)
     - per turn: Action-phase item finds, occasional item use (only items
       already found), occasional extra Event card
     - Killer phase: victims die (scaling with how the game went), Dark Powers
       revealed in the back half, Finale revealed on the last turn or two
     - Action/Upkeep: victims saved
   Falls back gracefully to free-text-ish names if a combo has no card data. */
function buildEventStream({ killer, location, outcome, turns, startedAt, rnd }) {
  const pick = (arr) => (arr.length ? arr[Math.floor(rnd() * arr.length)] : null);
  const chance = (p) => rnd() < p;
  const combo = { killerId: killer.id, locationId: location.id };

  const items = getItems(location.id);
  const darkPowers = getDarkPowers(killer.id);
  const minorDP = getMinorDarkPowers(killer.id, location.id);
  const finales = getFinales(killer.id);
  const events = getEvents(location.id);
  const setups = getSetupCards(location.id);

  const totalTurns = turns || 7;
  const base = new Date(startedAt).getTime();
  let clock = base;
  const stream = [];
  let seq = 0;
  const add = (turn, phase, type, detail, meta = {}) => {
    clock += 30000 + Math.floor(rnd() * 90000); // 0.5–2 min between events
    stream.push({
      id: `demo-e-${seq++}`,
      turn,
      phaseId: phase.id,
      phaseName: phase.name,
      type,
      detail: detail || '',
      meta,
      at: new Date(clock).toISOString(),
    });
  };

  const found = []; // items found so far (so "used" only uses found ones)
  const setupPhase = { id: 'setup', name: 'Setup' };

  // --- Turn 0: setup + starting event ---
  const setupCard = pick(setups);
  if (setupCard) add(0, setupPhase, 'setup', setupCard.name);
  if (chance(0.8)) {
    const startEv = pick(events);
    if (startEv) add(0, setupPhase, 'event-start', startEv.name);
  }

  const action = PHASES[0];
  const killerPhase = PHASES[2];
  const panic = PHASES[3];
  const upkeep = PHASES[4];

  // Generic "where she ended the turn" phrases for demo colour (real games
  // use free text). Kept location-agnostic so they fit any scenario.
  const SPOTS = [
    'near the entrance, back to the wall',
    'deeper inside, where the light gave out',
    'by a window, watching the dark',
    'cornered against the far side',
    'in the open, exposed and moving fast',
    'somewhere she hoped he hadn\u2019t seen',
    'close to the way out, not daring to take it yet',
  ];

  for (let t = 1; t <= totalTurns; t++) {
    const lateGame = t >= Math.ceil(totalTurns * 0.6);
    const lastTurns = t >= totalTurns - 1;

    // Where she ended the turn (location note) — most turns.
    if (chance(0.75)) add(t, action, 'location', pick(SPOTS));

    // Action phase — find items, save victims, occasional event.
    if (chance(0.7)) {
      const it = pick(items);
      if (it) { add(t, action, 'item-found', it.name); found.push(it); }
    }
    if (chance(0.3) && found.length) {
      add(t, action, 'item-used', pick(found).name);
    }
    if (outcome !== 'lost' && chance(0.45)) add(t, action, 'victim-saved', '');
    if (chance(0.22)) {
      const ev = pick(events);
      if (ev) add(t, action, 'event', ev.name);
    }

    // Killer phase — victims die, dark powers reveal late, finale near the end.
    const deaths = outcome === 'lost' ? (chance(0.7) ? 2 : 1) : chance(0.4) ? 1 : 0;
    for (let d = 0; d < deaths; d++) add(t, killerPhase, 'victim-died', '');
    if (deaths > 0 && chance(0.5)) add(t, panic, 'victim-saved', ''); // scramble in Panic

    if (lateGame && chance(0.4)) {
      const dp = pick([...minorDP, ...darkPowers]);
      if (dp) add(t, killerPhase, 'dark-power', dp.name, { power: dp.epic ? 'epic' : 'minor' });
    }
    if (lastTurns && chance(0.6)) {
      const fin = pick(finales);
      if (fin) add(t, killerPhase, 'finale', fin.name, { epic: Boolean(fin.epic) });
    }

    // Upkeep — the odd late save.
    if (outcome === 'won' && t === totalTurns && chance(0.5)) add(t, upkeep, 'victim-saved', '');
  }

  return stream;
}

/* Build the demo log once. ~38 games across many combos, with wins, losses,
   abandons, varied Final Girls, turns, achievements and the odd mistake. */
function buildDemoLog() {
  const rnd = mulberry32(20261018);
  const realKillers = killers; // includes vignettes — fine for demo
  const realLocations = locations;
  const log = [];

  // A spread of combos to seed. Bias toward some killers being beaten at
  // several locations (to light up the "five Locations" achievements) and
  // some locations beaten by several killers.
  const plannedGames = 40;
  let dayOffset = 0;

  // Helper: pick with the rng.
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

  // Force a few deliberate "mastery" streaks for interesting achievements:
  // Hans beaten at 5+ locations; Camp Happy Trails beaten by 5+ killers.
  const forced = [];
  const hans = realKillers.find((k) => k.id === 'hans');
  const camp = realLocations.find((l) => l.id === 'camp-happy-trails');
  if (hans) {
    realLocations.slice(0, 6).forEach((l) => forced.push({ killer: hans, location: l, outcome: 'won' }));
  }
  if (camp) {
    realKillers.slice(0, 6).forEach((k) => forced.push({ killer: k, location: camp, outcome: 'won' }));
  }

  const games = [...forced];
  while (games.length < plannedGames) {
    const killer = pick(realKillers);
    const location = killer.isVignette
      ? pick(realLocations)
      : pick(realLocations);
    // Outcome distribution: ~50% won, ~38% lost, ~12% abandoned.
    const r = rnd();
    const outcome = r < 0.5 ? 'won' : r < 0.88 ? 'lost' : 'abandoned';
    games.push({ killer, location, outcome });
  }

  for (let i = 0; i < games.length; i++) {
    const { killer, location, outcome } = games[i];
    const finalGirl = pick(finalGirls);
    dayOffset += 1 + Math.floor(rnd() * 5);
    const ended = new Date(Date.now() - (games.length - i) * 86400000 - dayOffset * 1000);
    const started = new Date(ended.getTime() - (20 + Math.floor(rnd() * 50)) * 60000);

    // Achievements earned: on a win, tick the "win here / defeat here" style
    // plus a random extra or two. (Auto-detection also fills the multi-game
    // ones from the wins themselves.)
    let achievements = [];
    if (outcome === 'won') {
      const kList = getAchievements(killer).map((a) => a.id);
      const lList = getAchievements(location).map((a) => a.id);
      const earned = new Set();
      // First achievement of each (home win / win here) is plausible.
      if (kList[0]) earned.add(kList[0]);
      if (lList[0]) earned.add(lList[0]);
      // A couple of random extras.
      [...kList, ...lList].forEach((id) => {
        if (rnd() < 0.18) earned.add(id);
      });
      achievements = [...earned];
    }

    // Mistakes: ~45% of games log one or two.
    const mistakes = [];
    if (rnd() < 0.45) {
      mistakes.push(pick(SAMPLE_MISTAKES));
      if (rnd() < 0.4) {
        const second = pick(SAMPLE_MISTAKES);
        if (second.text !== mistakes[0].text) mistakes.push(second);
      }
    }

    const turns = outcome === 'abandoned' ? null : 5 + Math.floor(rnd() * 9);
    // A logical, card-accurate chronological event stream for this game
    // (abandoned games get a short, truncated stream).
    const events = buildEventStream({
      killer,
      location,
      outcome,
      turns: turns || 3,
      startedAt: started.toISOString(),
      rnd,
    });
    const summary = deriveSummary(events);

    log.push({
      id: `demo-${i}`,
      isTest: false,
      demo: true,
      finalGirlId: finalGirl.id,
      killerId: killer.id,
      locationId: location.id,
      finalGirlName: finalGirl.name,
      killerName: killer.name,
      locationName: location.name,
      startedAt: started.toISOString(),
      endedAt: ended.toISOString(),
      outcome,
      turns,
      notes: pick(NOTES),
      achievements,
      mistakes,
      events,
      summary,
    });
  }

  // Newest first, matching the real log's ordering.
  log.sort((a, b) => (b.endedAt || '').localeCompare(a.endedAt || ''));
  return log;
}

// A few manual achievement overrides, to show the manual/auto mix in the UI.
function buildDemoOverrides() {
  const overrides = {};
  const hans = getAchievements({ id: 'hans' });
  // Force-earn a flashy Hans achievement and force-off one, as examples.
  if (hans[6]) overrides[hans[6].id] = true;
  if (hans[8]) overrides[hans[8].id] = false;
  return overrides;
}

export const DEMO_LOG = buildDemoLog();
export const DEMO_OVERRIDES = buildDemoOverrides();
