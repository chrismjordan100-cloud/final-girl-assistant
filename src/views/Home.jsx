import logo from '../assets/final-girl-logo.png';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { getFinalGirl, getKiller, getLocation } from '../data/games.js';

const SETUP_PROGRESS_KEY = 'fg-setup-progress';

const FEATURES = [
  {
    id: 'setup',
    glyph: '\uD83D\uDD2A',
    title: 'Setup Assist',
    desc: 'A guided, checkable walkthrough of the full game setup — from choosing your Killer to drawing the first Event.',
  },
  {
    id: 'thisgame',
    glyph: '\uD83C\uDFAE',
    title: 'This Game',
    desc: 'The extra rules for the Killer and Location you picked in setup — plus Start Game narration and your end-of-game record.',
  },
  {
    id: 'codex',
    glyph: '\uD83D\uDCD1',
    title: 'Codex',
    desc: 'Browse every Killer, Location and Final Girl — art, flavour and key rules — and pick one straight into your game.',
  },
  {
    id: 'ask',
    glyph: '\u2753',
    title: 'Ask a Question',
    desc: 'Ask in plain English and it searches every rule the app knows, tailored to the game you\u2019re playing.',
  },
  {
    id: 'turn',
    glyph: '\uD83D\uDD52',
    title: 'Turn Tracker',
    desc: 'Step through the five phases of every turn with per-phase checklists, scenario reminders, and a turn counter.',
  },
  {
    id: 'log',
    glyph: '\uD83D\uDCDC',
    title: 'Game Log',
    desc: 'A record of past games — who you played, where, the result, and any mistakes you logged.',
  },
  {
    id: 'matrix',
    glyph: '\uD83D\uDDFA',
    title: 'Scenarios',
    desc: 'The full Killer \u00d7 Location grid, showing official pairings and which combos you\u2019ve played.',
  },
  {
    id: 'stats',
    glyph: '\uD83D\uDCCA',
    title: 'MI & Outcomes',
    desc: 'Win rates and achievement coverage across your real games, by Killer, Location and Final Girl.',
  },
  {
    id: 'achievements',
    glyph: '\uD83C\uDFC6',
    title: 'Achievements',
    desc: 'Every Killer and Location achievement, auto-tracked from your wins and manually tickable.',
  },
  {
    id: 'debrief',
    glyph: '\uD83E\uDDE0',
    title: 'Debrief',
    desc: 'Your logged mistakes grouped so repeat offenders rise to the top, with reminders before you play.',
  },
  {
    id: 'tips',
    glyph: '\uD83D\uDCA1',
    title: 'Tips',
    desc: 'Strategy advice grounded in the mechanics — general play plus pointers for each Killer and Location.',
  },
  {
    id: 'rules',
    glyph: '\uD83D\uDCD6',
    title: 'Rules Reference',
    desc: 'Browse the core rules in rulebook order, or search by keyword when a question comes up at the table.',
  },
  {
    id: 'icons',
    glyph: '\uD83D\uDD23',
    title: 'Icon Reference',
    desc: 'The full chart of card symbols, on its own page so you can jump straight to it.',
  },
  {
    id: 'admin',
    glyph: '\u2699',
    title: 'Asset Admin',
    desc: 'A live checklist of every image the app expects, with readiness and naming help for adding art and rule sheets.',
  },
];

export default function Home({ onNavigate }) {
  const { finalGirlId, killerId, locationId, clear } = useGameSelection();

  const finalGirl = getFinalGirl(finalGirlId);
  const killer = getKiller(killerId);
  const location = getLocation(locationId);
  const picks = [finalGirl, killer, location].filter(Boolean);
  const hasGame = picks.length > 0;

  function clearEverything() {
    clear();
    try {
      localStorage.removeItem(SETUP_PROGRESS_KEY);
    } catch {
      /* ignore storage failures */
    }
    // Nudge Setup Assist (which reads progress on mount) to refresh if open.
    window.dispatchEvent(new CustomEvent('fg-setup-progress-change'));
  }

  return (
    <div className="stack" style={{ gap: '2rem' }}>
      <section className="hero">
        <p className="hero__kicker">Kill or be killed</p>
        <h1 className="hero__logo">
          <img src={logo} alt="Final Girl" className="hero__logo-img" />
        </h1>
        <p className="hero__tagline">
          "Everyone else is dead. YOU are the Final Girl." Your personal companion for
          setting up, tracking, and surviving a game.
        </p>
        <div className="cluster" style={{ justifyContent: 'center' }}>
          <button className="fg-btn fg-btn--primary" onClick={() => onNavigate('setup')}>
            Start Setup
          </button>
          <button className="fg-btn" onClick={() => onNavigate('turn')}>
            Track a Turn
          </button>
        </div>
      </section>

      {hasGame && (
        <section className="home-game fg-panel">
          <div className="home-game__text">
            <p className="section-eyebrow" style={{ marginBottom: '0.3rem' }}>
              Current game
            </p>
            <p className="home-game__picks">
              {picks.map((p) => p.name).join('  \u00B7  ')}
            </p>
          </div>
          <button className="fg-btn home-game__clear" onClick={clearEverything}>
            Clear this game
          </button>
        </section>
      )}

      <section>
        <p className="section-eyebrow">What&rsquo;s inside</p>
        <div className="home-cards">
          {FEATURES.map((f) => (
            <button
              key={f.id}
              className="home-card fg-panel"
              onClick={() => onNavigate(f.id)}
            >
              <span className="home-card__glyph" aria-hidden="true">{f.glyph}</span>
              <h2 className="home-card__title">{f.title}</h2>
              <p className="home-card__desc">{f.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
