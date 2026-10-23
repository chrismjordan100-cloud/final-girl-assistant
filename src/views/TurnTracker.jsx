import { useState, useEffect } from 'react';
import { phases, horrorRoll } from '../data/rules.js';
import { getKiller, getLocation, getFinalGirl, getPhaseExtras } from '../data/games.js';
import { finalGirlUltimate } from '../data/cardData.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { useTurnState } from '../hooks/useTurnState.js';
import SetupCapture from '../components/SetupCapture.jsx';
import CardPicker from '../components/CardPicker.jsx';
import './TurnTracker.css';

/* The per-turn event types the quick-capture bar can log. `needsText` means
   the user types the card name / detail exactly as written. Totals and the
   future AI summary are both derived from this same event stream. */
const EVENT_TYPES = [
  { type: 'victim-died', label: 'Victim died', glyph: '\u2620', tone: 'blood', needsText: false },
  { type: 'victim-saved', label: 'Victim saved', glyph: '\u2665', tone: 'green', needsText: false },
  { type: 'victim-escape', label: 'Helped a victim escape', glyph: '\uD83C\uDFC3', tone: 'green', needsText: false },
  { type: 'fg-power', label: 'Enabled Final Girl power', glyph: '\u2728', tone: 'gold', needsText: true, placeholder: 'Her Ultimate / power (auto-filled if known)', isFgPower: true },
  { type: 'item-found', label: 'Found item', glyph: '\uD83C\uDFD5', tone: 'gold', needsText: true, placeholder: 'Item name, as on the card' },
  { type: 'item-used', label: 'Used item', glyph: '\u2692', tone: 'gold', needsText: true, placeholder: 'Item name, as on the card' },
  { type: 'dark-power', label: 'Dark Power', glyph: '\uD83D\uDC41', tone: 'blood', needsText: true, placeholder: 'Dark Power name', hasPower: true },
  { type: 'finale', label: 'Finale', glyph: '\uD83C\uDFAC', tone: 'blood', needsText: true, placeholder: 'Finale card name' },
  { type: 'event', label: 'Event card', glyph: '\u26A1', tone: 'default', needsText: true, placeholder: 'Event card name / effect' },
  { type: 'terror', label: 'Terror card', glyph: '\uD83C\uDCCF', tone: 'default', needsText: true, placeholder: 'Terror card / effect' },
  { type: 'weapon', label: 'Weapon', glyph: '\uD83D\uDDE1', tone: 'default', needsText: true, placeholder: 'Weapon name' },
  { type: 'location', label: 'Where she is', glyph: '\uD83D\uDCCD', tone: 'default', needsText: true, placeholder: 'Where she ended the turn (free text)' },
  { type: 'note', label: 'Note', glyph: '\u270E', tone: 'default', needsText: true, placeholder: 'Anything worth remembering' },
];

const EVENT_LABELS = Object.fromEntries(EVENT_TYPES.map((e) => [e.type, e.label]));

/* Dice rolled for a Horror Roll in STANDARD mode, read off the player board's
   Horror track (inverse, non-linear — higher Horror = fewer dice):
     Horror 1 -> 3 dice · Horror 2–5 -> 2 dice · Horror 6 -> 1 die.
   Clamped for anything outside 1–6. Extreme Horror mode differs (backlog). */
function diceForHorror(horror) {
  if (horror <= 1) return 3;
  if (horror >= 6) return 1;
  return 2; // Horror 2, 3, 4, 5
}

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
  const { state, patch, reset, addEvent, removeEvent } = useTurnState();
  const { turn, phaseIndex, horror, bloodlust, time, victimsSaved, checked, events } = state;

  const { finalGirlId, killerId, locationId } = useGameSelection();
  const killer = getKiller(killerId);
  const location = getLocation(locationId);
  const finalGirl = getFinalGirl(finalGirlId);
  const phaseExtrasByPhase = getPhaseExtras(killer, location);

  const phase = phases[phaseIndex];
  const extrasForPhase = phaseExtrasByPhase[phase.id] || [];
  const promptsForPhase = phase.prompts || [];
  // Dice for a Horror Roll come from the player board's Horror track, which is
  // NOT equal to the Horror Level number — it's an inverse, non-linear mapping.
  // Standard mode (not Extreme — see BACKLOG to add Extreme later):
  //   Horror 1 -> 3 dice · Horror 2–5 -> 2 dice · Horror 6 -> 1 die.
  const dice = diceForHorror(horror);

  // --- Per-turn event capture -------------------------------------------
  // When a type needs text, selecting it opens an inline input; otherwise the
  // event is logged immediately. Each logged event is stamped with the current
  // turn + phase by the hook.
  const [picking, setPicking] = useState(null); // event type awaiting text, or null
  const [eventText, setEventText] = useState('');
  const [powerKind, setPowerKind] = useState('minor'); // for dark-power events
  // On "quiet" phases the capture is collapsed behind a link; this opens it.
  const [forceCaptureOpen, setForceCaptureOpen] = useState(false);

  // Phases where things worth recording routinely happen: the capture bar is
  // shown by default. Planning / Panic / Upkeep are mostly bookkeeping, so
  // there it's collapsed behind a "log something anyway" link (never blocked).
  const CAPTURE_PHASES = ['action', 'killer'];
  const captureDefault = CAPTURE_PHASES.includes(phase.id);
  const showCapture = captureDefault || forceCaptureOpen;

  // Reset the in-progress pick and the forced-open state whenever the turn or
  // phase changes, so advancing always lands back on the fresh button grid
  // (never a stale input box left over from the previous phase/turn).
  useEffect(() => {
    setPicking(null);
    setEventText('');
    setForceCaptureOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, phaseIndex]);

  const allEvents = events || [];
  const thisTurnEvents = allEvents.filter((e) => e.turn === turn);

  // Log a no-text event (and keep the handy live counter in sync).
  function logQuick(type) {
    if (type === 'victim-died') patch({ bloodlust: Math.min(20, bloodlust + 1) });
    if (type === 'victim-saved') patch({ victimsSaved: Math.min(30, victimsSaved + 1) });
    addEvent({ type, phaseId: phase.id, phaseName: phase.name.replace(' Phase', '') });
  }

  function pickType(def) {
    if (!def.needsText) {
      logQuick(def.type);
      return;
    }
    setPicking(def);
    // Pre-fill the Final Girl power with her known Ultimate ability (editable).
    if (def.isFgPower && finalGirl) {
      const ult = finalGirlUltimate(finalGirl.name);
      setEventText(ult && ult.ability ? ult.ability : '');
    } else {
      setEventText('');
    }
    setPowerKind('minor');
  }

  function confirmEvent() {
    if (!picking) return;
    const detail = eventText.trim();
    if (!detail) return; // require text for text events
    const meta = picking.hasPower ? { power: powerKind } : {};
    addEvent({
      type: picking.type,
      detail,
      meta,
      phaseId: phase.id,
      phaseName: phase.name.replace(' Phase', ''),
    });
    // Return to the button grid (the "tableau") after logging, so it's always
    // visible and the next item is a clean, unambiguous fresh pick. (Previously
    // it stayed in the same category, which could leave a confusing stuck
    // input on some mobile browsers.)
    setPicking(null);
    setEventText('');
  }

  function cancelPick() {
    setPicking(null);
    setEventText('');
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

      {/* GAME SETUP — recorded once at the start (setup + starting event).
          Shared component, also on the Setup Assist tab; same backing store. */}
      <SetupCapture heading="Game setup &amp; starting event" />

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

        {/* Per-turn event capture — log what happened, when. Each event is
            stamped with this turn + phase and feeds the end-of-game summary.
            Shown by default in Action/Killer; collapsed elsewhere. */}
        {!showCapture ? (
          <button
            type="button"
            className="turn-events__open"
            onClick={() => setForceCaptureOpen(true)}
          >
            &#43; Log something this phase
          </button>
        ) : (
        <div className="turn-events">
          <h3 className="turn-events__head">
            Log an event <span className="turn-events__ctx">Turn {turn} &middot; {phase.name.replace(' Phase', '')}</span>
          </h3>

          {picking ? (
            <div className="turn-events__entry">
              <span className="turn-events__entry-label">
                {picking.glyph} {picking.label}
              </span>
              {picking.hasPower && (
                <div className="turn-events__power" role="group" aria-label="Dark Power kind">
                  <button
                    type="button"
                    className={'te-power' + (powerKind === 'minor' ? ' is-active' : '')}
                    onClick={() => setPowerKind('minor')}
                  >
                    Minor
                  </button>
                  <button
                    type="button"
                    className={'te-power' + (powerKind === 'epic' ? ' is-active' : '')}
                    onClick={() => setPowerKind('epic')}
                  >
                    Epic
                  </button>
                </div>
              )}
              <CardPicker
                type={picking.type}
                combo={{ killerId, locationId }}
                value={eventText}
                onChange={setEventText}
                placeholder={picking.placeholder}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmEvent();
                  if (e.key === 'Escape') cancelPick();
                }}
              />
              <button type="button" className="fg-btn fg-btn--primary fg-btn--small" onClick={confirmEvent} disabled={!eventText.trim()}>
                Log
              </button>
              <button type="button" className="fg-btn fg-btn--small" onClick={cancelPick}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="turn-events__buttons">
              {EVENT_TYPES.map((def) => (
                <button
                  key={def.type}
                  type="button"
                  className={'te-btn te-btn--' + def.tone}
                  onClick={() => pickType(def)}
                >
                  <span className="te-btn__glyph" aria-hidden="true">{def.glyph}</span>
                  {def.label}
                </button>
              ))}
            </div>
          )}

          {thisTurnEvents.length > 0 && (
            <ul className="turn-events__list">
              {thisTurnEvents.map((e) => (
                <li key={e.id} className={'te-item te-item--' + e.type}>
                  <span className="te-item__phase">{e.phaseName}</span>
                  <span className="te-item__text">
                    {EVENT_LABELS[e.type] || e.type}
                    {e.detail ? `: ${e.detail}` : ''}
                    {e.meta && e.meta.power ? ` (${e.meta.power})` : ''}
                  </span>
                  <button
                    type="button"
                    className="te-item__del"
                    onClick={() => removeEvent(e.id)}
                    aria-label="Remove this event"
                    title="Remove"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        )}

        {/* This turn's logged events — always visible (even on quiet phases),
            so you can see and undo what you've captured this turn. */}
        {!showCapture && thisTurnEvents.length > 0 && (
          <ul className="turn-events__list turn-events__list--standalone">
            {thisTurnEvents.map((e) => (
              <li key={e.id} className={'te-item te-item--' + e.type}>
                <span className="te-item__phase">{e.phaseName}</span>
                <span className="te-item__text">
                  {EVENT_LABELS[e.type] || e.type}
                  {e.detail ? `: ${e.detail}` : ''}
                  {e.meta && e.meta.power ? ` (${e.meta.power})` : ''}
                </span>
                <button
                  type="button"
                  className="te-item__del"
                  onClick={() => removeEvent(e.id)}
                  aria-label="Remove this event"
                  title="Remove"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}

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
