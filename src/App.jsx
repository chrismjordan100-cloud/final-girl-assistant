import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGameLog } from './hooks/useGameLog.js';
import TextSize from './components/TextSize.jsx';
import Home from './views/Home.jsx';
import SetupAssist from './views/SetupAssist.jsx';
import TurnTracker from './views/TurnTracker.jsx';
import RulesReference from './views/RulesReference.jsx';
import IconReference from './views/IconReference.jsx';
import ThisGame from './views/ThisGame.jsx';
import GameLog from './views/GameLog.jsx';
import Stats from './views/Stats.jsx';
import Achievements from './views/Achievements.jsx';
import ScenarioMatrix from './views/ScenarioMatrix.jsx';
import Admin from './views/Admin.jsx';
import Tips from './views/Tips.jsx';
import Debrief from './views/Debrief.jsx';
import Codex from './views/Codex.jsx';
import Ask from './views/Ask.jsx';

const NAV = [
  { id: 'home', label: 'Home', glyph: '\u2620' },
  { id: 'setup', label: 'Setup Assist', glyph: '\uD83D\uDD2A' },
  { id: 'thisgame', label: 'This Game', glyph: '\uD83C\uDFAE' },
  { id: 'codex', label: 'Codex', glyph: '\uD83D\uDCD1' },
  { id: 'ask', label: 'Ask', glyph: '\u2753' },
  { id: 'turn', label: 'Turn Tracker', glyph: '\uD83D\uDD52' },
  { id: 'log', label: 'Game Log', glyph: '\uD83D\uDCDC' },
  { id: 'matrix', label: 'Scenarios', glyph: '\uD83D\uDDFA' },
  { id: 'stats', label: 'MI', glyph: '\uD83D\uDCCA' },
  { id: 'achievements', label: 'Achievements', glyph: '\uD83C\uDFC6' },
  { id: 'debrief', label: 'Debrief', glyph: '\uD83E\uDDE0' },
  { id: 'tips', label: 'Tips', glyph: '\uD83D\uDCA1' },
  { id: 'rules', label: 'Rules Reference', glyph: '\uD83D\uDCD6' },
  { id: 'icons', label: 'Icon Reference', glyph: '\uD83D\uDD23' },
  { id: 'admin', label: 'Asset Admin', glyph: '\u2699' },
];

const VIEW_IDS = new Set(NAV.map((n) => n.id));

/* The current screen lives in the URL hash (#turn, #thisgame …) so a reload,
   or reopening the home-screen app mid-game, lands you back where you were —
   and the phone's Back gesture steps back through screens. */
function viewFromHash() {
  const id = (window.location.hash || '').replace(/^#/, '');
  return VIEW_IDS.has(id) ? id : 'home';
}

// Quick in-game shortcuts shown under the header on phones while a game is on.
const GAME_SHORTCUTS = [
  { id: 'turn', label: 'Tracker', glyph: '\uD83D\uDD52' },
  { id: 'thisgame', label: 'This Game', glyph: '\uD83C\uDFAE' },
  { id: 'ask', label: 'Ask', glyph: '\u2753' },
  { id: 'rules', label: 'Rules', glyph: '\uD83D\uDCD6' },
];

export default function App() {
  const [view, setView] = useState(viewFromHash);
  const [navOpen, setNavOpen] = useState(false);
  const { demoMode, setDemoMode, active } = useGameLog();
  const topRef = useRef(null);

  // Change view and close the mobile menu in one go. Each new screen starts at
  // the top (it used to open at whatever scroll position the last one had).
  const go = (id) => {
    setNavOpen(false);
    if (id !== view) {
      window.history.pushState(null, '', '#' + id);
      setView(id);
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const onPop = () => {
      setView(viewFromHash());
      setNavOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Publish the pinned header's height as --header-h, so things that stick
  // beneath it (the Turn Tracker's stat bar) sit just under it, not behind it.
  useLayoutEffect(() => {
    const el = topRef.current;
    if (!el) return undefined;
    const apply = () =>
      document.documentElement.style.setProperty('--header-h', `${el.getBoundingClientRect().height}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className={'app-shell' + (demoMode ? ' is-demo' : '')}>
      <div className="app-top" ref={topRef}>
      {demoMode && (
        <div className="demo-banner" role="status">
          <span className="demo-banner__text">
            &#9888; Demo data on
            <span className="demo-banner__more"> &mdash; MI, Achievements, Game Log &amp; Scenarios show sample games, not your real history.</span>
          </span>
          <button className="demo-banner__off" onClick={() => setDemoMode(false)}>
            Turn off
          </button>
        </div>
      )}
      <header className={'app-header' + (navOpen ? ' nav-open' : '')}>
        <button
          className="brand"
          onClick={() => go('home')}
          aria-label="Final Girl Rules Assistant — go home"
        >
          <span className="brand__kicker">The</span>
          <span className="brand__title fg-title-slash">Final Girl</span>
          <span className="brand__sub">Rules Assistant</span>
        </button>

        {/* Mobile-only hamburger: hidden on desktop via CSS. */}
        <button
          className="nav-toggle"
          onClick={() => setNavOpen((o) => !o)}
          aria-expanded={navOpen}
          aria-controls="primary-nav"
          aria-label={navOpen ? 'Close menu' : 'Open menu'}
        >
          <span aria-hidden="true" className="nav-toggle__bars" />
          <span className="nav-toggle__label">{navOpen ? 'Close' : 'Menu'}</span>
        </button>

        <nav
          id="primary-nav"
          className={'app-nav' + (navOpen ? ' is-open' : '')}
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <button
              key={item.id}
              className={'app-nav__link' + (view === item.id ? ' is-active' : '')}
              onClick={() => go(item.id)}
              aria-current={view === item.id ? 'page' : undefined}
            >
              <span aria-hidden="true" className="app-nav__glyph">{item.glyph}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <TextSize />

        <label
          className={'demo-toggle' + (demoMode ? ' is-on' : '')}
          title="Show sample data in the stats tabs for demos"
        >
          <input
            type="checkbox"
            checked={demoMode}
            onChange={(e) => setDemoMode(e.target.checked)}
          />
          <span className="demo-toggle__dot" aria-hidden="true" />
          <span>Demo data{demoMode ? ' ON' : ''}</span>
        </label>

        {active && !navOpen && (
          <nav className="game-shortcuts" aria-label="Game in progress shortcuts">
            {GAME_SHORTCUTS.map((g) => (
              <button
                key={g.id}
                className={'game-shortcuts__btn' + (view === g.id ? ' is-active' : '')}
                onClick={() => go(g.id)}
                aria-current={view === g.id ? 'page' : undefined}
              >
                <span aria-hidden="true">{g.glyph}</span> {g.label}
              </button>
            ))}
          </nav>
        )}
      </header>
      </div>

      <main className="app-main">
        {view === 'home' && <Home onNavigate={go} />}
        {view === 'setup' && <SetupAssist onNavigate={go} />}
        {view === 'turn' && <TurnTracker onNavigate={go} />}
        {view === 'thisgame' && <ThisGame onNavigate={go} />}
        {view === 'codex' && <Codex onNavigate={go} />}
        {view === 'ask' && <Ask />}
        {view === 'log' && <GameLog />}
        {view === 'matrix' && <ScenarioMatrix />}
        {view === 'stats' && <Stats />}
        {view === 'achievements' && <Achievements />}
        {view === 'debrief' && <Debrief />}
        {view === 'tips' && <Tips />}
        {view === 'rules' && <RulesReference />}
        {view === 'icons' && <IconReference />}
        {view === 'admin' && <Admin />}
      </main>

      <footer className="app-footer">
        <p className="fg-type">
          A fan-made assistant for <em>Final Girl</em> by Van Ryder Games. Personal,
          non-commercial use only. Not affiliated with or endorsed by Van Ryder Games.
        </p>
      </footer>
    </div>
  );
}
