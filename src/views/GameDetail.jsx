import { useState } from 'react';
import { deriveSummary, groupByTurn } from '../lib/gameSummary.js';
import { narrateGame } from '../lib/narrateGame.js';

/* Expandable detail + edit for one logged game. Shows the full turn-by-turn
   event timeline, summary tallies, achievements, mistakes and notes; and an
   Edit mode to fix tracking mistakes after the fact. Edits persist via
   updateEntry (which syncs across devices). */

const OUTCOMES = [
  { id: 'won', label: 'Survived' },
  { id: 'lost', label: 'Died' },
  { id: 'abandoned', label: 'Abandoned' },
];

// Turn a newline/comma list <-> array for the editable summary fields.
function toLines(arr) {
  return (Array.isArray(arr) ? arr : []).join('\n');
}
function fromLines(text) {
  return String(text || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function GameDetail({ entry, onUpdate }) {
  const [editing, setEditing] = useState(false);
  // Story: a free, offline template-based recap. The variant reshuffles phrasing.
  const [storyVariant, setStoryVariant] = useState(0);
  const hasEvents = (entry.events || []).length > 0;
  const story = hasEvents ? narrateGame(entry, { variant: storyVariant }) : '';

  // Prefer the stored summary; fall back to deriving from events for older
  // entries saved before summaries existed.
  const storedSummary = entry.summary && Object.keys(entry.summary).length
    ? entry.summary
    : deriveSummary(entry.events || []);

  const turns = groupByTurn(entry.events || []);

  // --- Edit form state (seeded from the entry) ---
  const [form, setForm] = useState(() => ({
    outcome: entry.outcome || 'won',
    turns: entry.turns != null ? String(entry.turns) : '',
    notes: entry.notes || '',
    setup: storedSummary.setup || '',
    startingEvent: storedSummary.startingEvent || '',
    victimsSaved: storedSummary.victimsSaved ?? 0,
    victimsDied: storedSummary.victimsDied ?? 0,
    itemsFound: toLines(storedSummary.itemsFound),
    itemsUsed: toLines(storedSummary.itemsUsed),
    finale: storedSummary.finale || '',
    events: toLines(storedSummary.events),
    weapons: toLines(storedSummary.weapons),
    darkPowers: toLines((storedSummary.darkPowers || []).map((d) => (d.power ? `${d.name} (${d.power})` : d.name))),
    terror: toLines(storedSummary.terror),
  }));

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function save() {
    // Parse dark powers back into { name, power } (power optional, in parens).
    const darkPowers = fromLines(form.darkPowers).map((line) => {
      const m = line.match(/^(.*?)\s*\((minor|epic)\)\s*$/i);
      if (m) return { name: m[1].trim(), power: m[2].toLowerCase() };
      return { name: line, power: 'minor' };
    });
    const nextSummary = {
      ...storedSummary,
      setup: form.setup.trim(),
      startingEvent: form.startingEvent.trim(),
      victimsSaved: Number(form.victimsSaved) || 0,
      victimsDied: Number(form.victimsDied) || 0,
      itemsFound: fromLines(form.itemsFound),
      itemsUsed: fromLines(form.itemsUsed),
      finale: form.finale.trim(),
      events: fromLines(form.events),
      weapons: fromLines(form.weapons),
      darkPowers,
      terror: fromLines(form.terror),
    };
    onUpdate(entry.id, {
      outcome: form.outcome,
      turns: form.turns ? Number(form.turns) : null,
      notes: form.notes,
      summary: nextSummary,
    });
    setEditing(false);
  }

  function cancel() {
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="gd gd--edit">
        <div className="gd__row">
          <label className="gd__field">
            <span className="gd__label">Outcome</span>
            <div className="gd__outcomes">
              {OUTCOMES.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={'gd__outcome' + (form.outcome === o.id ? ' is-active' : '')}
                  onClick={() => setField('outcome', o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </label>
          <label className="gd__field gd__field--sm">
            <span className="gd__label">Turns</span>
            <input className="gd__input" type="number" min="1" value={form.turns} onChange={(e) => setField('turns', e.target.value)} />
          </label>
        </div>

        <div className="gd__row">
          <label className="gd__field">
            <span className="gd__label">Setup (cards / board configuration)</span>
            <input className="gd__input" type="text" value={form.setup} onChange={(e) => setField('setup', e.target.value)} placeholder="e.g. Standard setup, Bonfire variant" />
          </label>
          <label className="gd__field">
            <span className="gd__label">Starting event</span>
            <input className="gd__input" type="text" value={form.startingEvent} onChange={(e) => setField('startingEvent', e.target.value)} placeholder="Event card revealed at setup" />
          </label>
        </div>

        <div className="gd__row">
          <label className="gd__field gd__field--sm">
            <span className="gd__label">Victims saved</span>
            <input className="gd__input" type="number" min="0" value={form.victimsSaved} onChange={(e) => setField('victimsSaved', e.target.value)} />
          </label>
          <label className="gd__field gd__field--sm">
            <span className="gd__label">Victims died</span>
            <input className="gd__input" type="number" min="0" value={form.victimsDied} onChange={(e) => setField('victimsDied', e.target.value)} />
          </label>
          <label className="gd__field">
            <span className="gd__label">Finale</span>
            <input className="gd__input" type="text" value={form.finale} onChange={(e) => setField('finale', e.target.value)} placeholder="Finale card name" />
          </label>
        </div>

        <div className="gd__row">
          <label className="gd__field">
            <span className="gd__label">Items found (one per line)</span>
            <textarea className="gd__textarea" rows={3} value={form.itemsFound} onChange={(e) => setField('itemsFound', e.target.value)} />
          </label>
          <label className="gd__field">
            <span className="gd__label">Items used (one per line)</span>
            <textarea className="gd__textarea" rows={3} value={form.itemsUsed} onChange={(e) => setField('itemsUsed', e.target.value)} />
          </label>
        </div>

        <div className="gd__row">
          <label className="gd__field">
            <span className="gd__label">Dark Powers — "Name (minor|epic)" per line</span>
            <textarea className="gd__textarea" rows={2} value={form.darkPowers} onChange={(e) => setField('darkPowers', e.target.value)} />
          </label>
          <label className="gd__field">
            <span className="gd__label">Weapons (one per line)</span>
            <textarea className="gd__textarea" rows={2} value={form.weapons} onChange={(e) => setField('weapons', e.target.value)} />
          </label>
        </div>

        <div className="gd__row">
          <label className="gd__field">
            <span className="gd__label">Event cards during play (one per line)</span>
            <textarea className="gd__textarea" rows={2} value={form.events} onChange={(e) => setField('events', e.target.value)} />
          </label>
          <label className="gd__field">
            <span className="gd__label">Terror cards of note (one per line)</span>
            <textarea className="gd__textarea" rows={2} value={form.terror} onChange={(e) => setField('terror', e.target.value)} />
          </label>
        </div>

        <div className="gd__row">
          <label className="gd__field">
            <span className="gd__label">Notes</span>
            <textarea className="gd__textarea" rows={2} value={form.notes} onChange={(e) => setField('notes', e.target.value)} />
          </label>
        </div>

        <p className="gd__editnote fg-type">
          Editing totals here doesn&rsquo;t change the turn-by-turn timeline below.
        </p>

        <div className="gd__actions">
          <button className="fg-btn fg-btn--primary" onClick={save}>Save changes</button>
          <button className="fg-btn" onClick={cancel}>Cancel</button>
        </div>
      </div>
    );
  }

  // --- Read-only detail ---
  const s = storedSummary;
  const hasSummary =
    s.victimsSaved || s.victimsDied || s.itemsFound?.length || s.itemsUsed?.length ||
    s.darkPowers?.length || s.finale || s.weapons?.length || s.terror?.length ||
    s.events?.length || s.setup || s.startingEvent;

  return (
    <div className="gd">
      <div className="gd__toolbar">
        {onUpdate && <button className="fg-btn fg-btn--small" onClick={() => setEditing(true)}>Edit details</button>}
      </div>

      {hasEvents && (
        <div className="gd__story">
          <div className="gd__story-head">
            <h4 className="gd__story-title">The Story</h4>
            <button
              className="fg-btn fg-btn--small"
              onClick={() => setStoryVariant((v) => v + 1)}
              title="Reshuffle the wording"
            >
              &#8635; Reshuffle
            </button>
          </div>
          <div className="gd__story-text">
            {story.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="gd__story-note fg-type">
            Auto-written from this game&rsquo;s events. (A richer AI recap is on the backlog.)
          </p>
        </div>
      )}

      {hasSummary ? (
        <dl className="gd__summary">
          {s.setup && <div><dt>Setup</dt><dd>{s.setup}</dd></div>}
          {s.startingEvent && <div><dt>Starting event</dt><dd>{s.startingEvent}</dd></div>}
          <div><dt>Victims saved</dt><dd>{s.victimsSaved || 0}</dd></div>
          <div><dt>Victims died</dt><dd>{s.victimsDied || 0}</dd></div>
          {s.finale && <div><dt>Finale</dt><dd>{s.finale}</dd></div>}
          {s.itemsFound?.length > 0 && <div><dt>Items found</dt><dd>{s.itemsFound.join(', ')}</dd></div>}
          {s.itemsUsed?.length > 0 && <div><dt>Items used</dt><dd>{s.itemsUsed.join(', ')}</dd></div>}
          {s.darkPowers?.length > 0 && (
            <div><dt>Dark Powers</dt><dd>{s.darkPowers.map((d) => d.name + (d.power ? ` (${d.power})` : '')).join(', ')}</dd></div>
          )}
          {s.events?.length > 0 && <div><dt>Events</dt><dd>{s.events.join(', ')}</dd></div>}
          {s.weapons?.length > 0 && <div><dt>Weapons</dt><dd>{s.weapons.join(', ')}</dd></div>}
          {s.terror?.length > 0 && <div><dt>Terror</dt><dd>{s.terror.join(', ')}</dd></div>}
        </dl>
      ) : (
        <p className="gd__none fg-type">No summary captured for this game. Use <strong>Edit details</strong> to add one.</p>
      )}

      {turns.length > 0 && (
        <div className="gd__timeline">
          <h4 className="gd__timeline-head">Turn-by-turn</h4>
          {turns.map((t) => (
            <div key={t.turn} className="gd__turn">
              <span className="gd__turn-num">{t.turn === 0 ? 'Game start' : `Turn ${t.turn}`}</span>
              <ul className="gd__events">
                {t.events.map((ev) => (
                  <li key={ev.id} className={'gd__event gd__event--' + ev.type}>
                    <span className="gd__event-phase">{ev.phaseName}</span>
                    <span>
                      {ev.type.replace('-', ' ')}
                      {ev.detail ? `: ${ev.detail}` : ''}
                      {ev.meta && ev.meta.power ? ` (${ev.meta.power})` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
