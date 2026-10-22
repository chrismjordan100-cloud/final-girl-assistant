/* ==========================================================================
   DEMO DATA.

   A generated set of fake completed games so the stats-driven tabs (MI,
   Achievements, Game Log, Debrief, Scenarios) look populated for demos,
   before you've built a real history. Produced deterministically from the
   real roster so every id is valid and icons/names resolve.

   Toggled on/off via the demo switch; it never touches your real data.
   ========================================================================== */
import { killers, locations, finalGirls, getAchievements } from './games.js';

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
      turns: outcome === 'abandoned' ? null : 5 + Math.floor(rnd() * 9),
      notes: pick(NOTES),
      achievements,
      mistakes,
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
