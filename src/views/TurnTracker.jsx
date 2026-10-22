import { phases, horrorRoll } from '../data/rules.js';
import { getKiller, getLocation, getPhaseExtras } from '../data/games.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { useTurnState } from '../hooks/useTurnState.js';
import './TurnTracker.css';

/* A compact +/- counter for a live game value. */
function Counter({ label, value, onChange, min = 0, max = 99, tone, hint }) {
  return (
    <div className={'tt-counter' + (tone ? ' tt-counter--' + tone : '')}>
      <span className="tt-counter__label">{label}</span>
      <div className="tt-counter__controls">
        <button
          type="button"
          className="tt-counter__btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`${label} down`}
        >
          &minus;
        </button>
        <span className="tt-counter__value">{value}</span>
        <button
          type="button"
          className="tt-counter__btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`${label} up`}
        >
          +
        </button>
      </div>
      {hint && <span className="tt-counter__hint">{hint}</span>}
    </div>
  );
}

export default function TurnTracker() {
  const { state, patch, reset } = useTurnState();
  const { turn, phaseIndex, horror, bloodlust, time, victimsSaved, checked } = state;

  const { killerId, locationId } = useGameSelection();
  const killer = getKiller(killerId);
  const location = getLocation(locationId);
  const phaseExtrasByPhase = getPhaseExtras(killer, location);

  const phase = phases[phaseIndex];
  const extrasForPhase = phaseExtrasByPhase[phase.id] || [];
  const promptsForPhase = phase.prompts || [];
  const dice = Math.max(1, horror); // always roll at least 1 die

  // One-tap quick actions that update the live counters — the common events
  // you'd otherwise have to remember to apply by hand.
  function victimKilled() {
    patch({ bloodlust: Math.min(20, bloodlust + 1) });
  }
  function victimSaved() {
    patch({ victimsSaved: Math.min(30, victimsSaved + 1) });
  }

  function toggleItem(key) {
    patch({ checked: { ...checked, [key]: !checked[key] } });
  }

  function clearPhaseChecks() {
    const next = { ...checked };
    Object.keys(next).forEach((k) => {
      if (k.startsWith(`${phaseIndex}:`) || k.startsWith(`x:${phaseIndex}:`)) delete next[k];
    });
    patch({ checked: next });
  }

  function goToPhase(idx) {
    patch({ phaseIndex: idx });
  }

  function clearAllChecks() {
    return {}; // helper for resets below
  }

  function nextPhase() {
    if (phaseIndex < phases.length - 1) {
      // Leaving Planning resets Time to full for the turn ahead.
      const leavingPlanning = phase.id === 'planning';
      patch({
        phaseIndex: phaseIndex + 1,
        ...(leavingPlanning ? { time: 6 } : {}),
      });
    } else {
      // End of Upkeep -> next turn. Clear ticks, bump the turn counter.
      patch({ turn: turn + 1, phaseIndex: 0, checked: clearAllChecks() });
    }
  }

  function prevPhase() {
    if (phaseIndex > 0) patch({ phaseIndex: phaseIndex - 1 });
  }

  function newGame() {
    reset();
  }

  const isLastPhase = phaseIndex === phases.length - 1;

  // Per-phase "at a glance" guidance — the single most useful live prompt for
  // each phase (what to do, or crucially what you can skip).
  const phaseGuide = {
    action: { tip: 'Play cards, move, attack, search, save Victims. Spend Time freely.' },
    planning: { tip: 'Buy Action cards with leftover Time, then Time resets to 6.' },
    killer: { tip: 'Killer Action first, then draw & resolve a Terror card (skip the draw once the Finale is revealed).' },
    panic: {
      tip: 'Only happens if a Victim DIED this turn — otherwise skip straight to Upkeep.',
      skippable: true,
    },
    upkeep: { tip: 'Finale check (Terror deck empty?), resolve lingering effects, rearrange Items.' },
  }[phase.id];

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">One turn at a time</p>
        <h1>Turn Tracker</h1>
        <p className="lead">
          Your live game dashboard &mdash; the counters that matter, what each phase does,
          and this game&rsquo;s scenario beats. Tap through at the table; it remembers where
          you are.
        </p>
      </div>

      {/* LIVE STAT BAR — the persistent dashboard */}
      <div className="tt-stats fg-panel">
        <div className="tt-stats__turn">
          <span className="tt-stats__turn-label">Turn</span>
          <span className="tt-stats__turn-num">{turn}</span>
        </div>
        <div className="tt-stats__counters">
          <Counter
            label="Horror"
            value={horror}
            onChange={(v) => patch({ horror: v })}
            min={0}
            max={10}
            tone="horror"
            hint={`roll ${dice} ${dice === 1 ? 'die' : 'dice'}`}
          />
          <Counter label="Bloodlust" value={bloodlust} onChange={(v) => patch({ bloodlust: v })} min={0} max={20} tone="blood" />
          <Counter label="Time" value={time} onChange={(v) => patch({ time: v })} min={-1} max={12} tone="gold" />
          <Counter label="Victims saved" value={victimsSaved} onChange={(v) => patch({ victimsSaved: v })} min={0} max={30} tone="green" />
        </div>
        <button className="fg-btn tt-newgame" onClick={newGame}>New game</button>
      </div>

      {(killer || location) ? (
        <p className="turn-combo fg-type">
          Scenario beats for{' '}
          {killer ? <strong>{killer.name}</strong> : <em>no Killer</em>}
          {' @ '}
          {location ? <strong>{location.name}</strong> : <em>no Location</em>}.
        </p>
      ) : (
        <p className="turn-combo turn-combo--none fg-type">
          No game selected &mdash; pick a Killer and Location (Setup or Codex) to see
          scenario-specific phase beats here.
        </p>
      )}

      {/* PHASE PIPS */}
      <ol className="phase-pips fg-panel" aria-label="Phases">
        {phases.map((p, i) => (
          <li key={p.id}>
            <button
              className={
                'phase-pip' +
                (i === phaseIndex ? ' is-active' : '') +
                (i < phaseIndex ? ' is-past' : '')
              }
              onClick={() => goToPhase(i)}
              style={{ '--pip-color': p.color }}
              aria-current={i === phaseIndex ? 'step' : undefined}
            >
              <span className="phase-pip__dot" aria-hidden="true" />
              <span className="phase-pip__name">{p.name.replace(' Phase', '')}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* CURRENT PHASE */}
      <section className="phase-card fg-panel" style={{ '--phase-color': phase.color }}>
        <header className="phase-card__head">
          <h2 className="phase-card__title">
            <span className="phase-card__index">{phaseIndex + 1}</span>
            {phase.name}
          </h2>
          <p className="phase-card__summary">{phase.summary}</p>
        </header>

        {/* The single most useful live prompt for this phase */}
        {phaseGuide && (
          <p className={'phase-guide' + (phaseGuide.skippable ? ' phase-guide--skip' : '')}>
            {phaseGuide.skippable && <span className="phase-guide__flag">Often skipped</span>}
            {phaseGuide.tip}
          </p>
        )}

        {/* Quick actions — one-tap updates for common events this phase. */}
        <div className="phase-quick">
          {(phase.id === 'killer' || phase.id === 'panic') && (
            <button type="button" className="phase-quick__btn phase-quick__btn--blood" onClick={victimKilled}>
              &#9760; Victim killed <span className="phase-quick__fx">Bloodlust +1</span>
            </button>
          )}
          {(phase.id === 'action' || phase.id === 'upkeep') && (
            <button type="button" className="phase-quick__btn phase-quick__btn--green" onClick={victimSaved}>
              &#9825; Victim saved <span className="phase-quick__fx">Saved +1</span>
            </button>
          )}
        </div>

        {/* Core "don't forget" beats for this phase — every game. */}
        {promptsForPhase.length > 0 && (
          <ul className="phase-prompts">
            {promptsForPhase.map((p, i) => (
              <li key={i} className="phase-prompt">{p}</li>
            ))}
          </ul>
        )}

        {/* Horror roll helper, shown inline during the Action phase where it's
            used most, so you don't have to scroll for it. */}
        {phase.id === 'action' && (
          <div className="phase-roll">
            <span className="phase-roll__dice">{dice}</span>
            <span className="phase-roll__label">
              {dice === 1 ? 'die' : 'dice'} per Horror Roll (Horror {horror})
            </span>
          </div>
        )}

        {/* This game's scenario beats for this phase — surfaced prominently */}
        {extrasForPhase.length > 0 && (
          <div className="phase-extras">
            <h3 className="phase-extras__head">&#9888; This game &mdash; {phase.name.replace(' Phase', '')} beats</h3>
            <ul className="phase-checklist phase-checklist--extra">
              {extrasForPhase.map((x, i) => {
                const key = `x:${phaseIndex}:${i}`;
                const on = !!checked[key];
                return (
                  <li key={key} className={on ? 'is-checked' : ''}>
                    <label>
                      <input type="checkbox" checked={on} onChange={() => toggleItem(key)} />
                      <span className="phase-check__box" aria-hidden="true" />
                      <span>
                        <span className="phase-extras__owner">{x.owner}</span>
                        {x.text}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <details className="phase-details">
          <summary className="phase-details__summary">Full checklist &amp; reminders</summary>
          <div className="phase-card__cols">
            <div>
              <h3 className="phase-sub">Do this</h3>
              <ul className="phase-checklist">
                {phase.checklist.map((item, i) => {
                  const key = `${phaseIndex}:${i}`;
                  const on = !!checked[key];
                  return (
                    <li key={key} className={on ? 'is-checked' : ''}>
                      <label>
                        <input type="checkbox" checked={on} onChange={() => toggleItem(key)} />
                        <span className="phase-check__box" aria-hidden="true" />
                        <span>{item}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <button className="fg-btn fg-btn--small phase-clear" onClick={clearPhaseChecks}>
                Clear ticks
              </button>
            </div>
            <div>
              <h3 className="phase-sub">Remember</h3>
              <ul className="phase-notes">
                {phase.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>

        <footer className="phase-card__nav">
          <button className="fg-btn" onClick={prevPhase} disabled={phaseIndex === 0}>
            &larr; Back
          </button>
          <button className="fg-btn fg-btn--primary phase-card__next" onClick={nextPhase}>
            {isLastPhase ? 'End turn \u2192 next turn' : `Next: ${phases[phaseIndex + 1].name.replace(' Phase', '')} \u2192`}
          </button>
        </footer>
      </section>

      {/* Horror roll reference — collapsed, for when you need the detail */}
      <details className="horror-roll fg-panel">
        <summary className="horror-roll__summary">{horrorRoll.title} &mdash; how it works</summary>
        <p className="horror-roll__lead">{horrorRoll.dicePerLevel}</p>
        <div className="horror-roll__results">
          {horrorRoll.results.map((r) => (
            <div key={r.label} className={'roll-chip roll-chip--' + r.tone}>
              <span className="roll-chip__range">{r.range}</span>
              <span className="roll-chip__label">{r.label}</span>
              {r.note && <span className="roll-chip__note">{r.note}</span>}
            </div>
          ))}
        </div>
        <ul className="horror-roll__rules">
          {horrorRoll.rules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
