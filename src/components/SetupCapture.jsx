import { useState } from 'react';
import { useTurnState } from '../hooks/useTurnState.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import CardPicker from './CardPicker.jsx';

/* Capture the game's Setup and Starting event as you build the game. Stored as
   "turn 0" events on the shared turn state, so they appear as a "Game start"
   group in the game's timeline and flow into the saved game record. The exact
   same store backs the Turn Tracker's setup panel, so entering on either the
   Setup Assist or Turn Tracker tab updates both. */

const SETUP_TYPES = [
  { type: 'setup', label: 'Setup', glyph: '\uD83E\uDDE9', placeholder: 'Setup cards / board configuration' },
  { type: 'event-start', label: 'Starting event', glyph: '\u2728', placeholder: 'Event card revealed at setup' },
];

const LABELS = Object.fromEntries(SETUP_TYPES.map((d) => [d.type, d.label]));

export default function SetupCapture({ heading = 'Record setup & starting event' }) {
  const { state, addEvent, removeEvent } = useTurnState();
  const { killerId, locationId } = useGameSelection();
  const setupEvents = (state.events || []).filter((e) => e.turn === 0);

  const [picking, setPicking] = useState(null);
  const [text, setText] = useState('');

  function pick(def) {
    setPicking(def);
    setText('');
  }
  function confirm() {
    if (!picking) return;
    const detail = text.trim();
    if (!detail) return;
    addEvent({ type: picking.type, detail, turn: 0, phaseName: 'Setup' });
    setPicking(null);
    setText('');
  }
  function cancel() {
    setPicking(null);
    setText('');
  }

  return (
    <div className="setup-capture">
      <h3 className="setup-capture__head">
        {heading}
        {setupEvents.length > 0 && (
          <span className="setup-capture__badge">{setupEvents.length} recorded</span>
        )}
      </h3>
      <p className="setup-capture__hint fg-type">
        Jot down the setup variant and the Event card revealed during setup as you go &mdash;
        it&rsquo;s saved with this game and shows at the top of its timeline.
      </p>

      {picking ? (
        <div className="turn-events__entry">
          <span className="turn-events__entry-label">{picking.glyph} {picking.label}</span>
          <CardPicker
            type={picking.type}
            combo={{ killerId, locationId }}
            value={text}
            onChange={setText}
            placeholder={picking.placeholder}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') confirm();
              if (e.key === 'Escape') cancel();
            }}
          />
          <button type="button" className="fg-btn fg-btn--primary fg-btn--small" onClick={confirm} disabled={!text.trim()}>
            Log
          </button>
          <button type="button" className="fg-btn fg-btn--small" onClick={cancel}>Cancel</button>
        </div>
      ) : (
        <div className="turn-events__buttons">
          {SETUP_TYPES.map((def) => (
            <button key={def.type} type="button" className="te-btn te-btn--default" onClick={() => pick(def)}>
              <span className="te-btn__glyph" aria-hidden="true">{def.glyph}</span>
              {def.label}
            </button>
          ))}
        </div>
      )}

      {setupEvents.length > 0 && (
        <ul className="turn-events__list">
          {setupEvents.map((e) => (
            <li key={e.id} className="te-item">
              <span className="te-item__phase">Setup</span>
              <span className="te-item__text">{LABELS[e.type] || e.type}{e.detail ? `: ${e.detail}` : ''}</span>
              <button type="button" className="te-item__del" onClick={() => removeEvent(e.id)} aria-label="Remove" title="Remove">&times;</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
