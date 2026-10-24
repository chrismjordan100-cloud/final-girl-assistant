import { useEffect, useRef, useState } from 'react';
import { useGameLog } from '../hooks/useGameLog.js';
import { getKiller, getLocation, getIcon } from '../data/games.js';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
import GameDetail from './GameDetail.jsx';
import './GameLog.css';

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function GameLog() {
  const { log, manual, deleteEntry, updateEntry, clearLog, restoreLog, demoMode } = useGameLog();

  // Which entry is expanded to show its full detail / edit panel.
  const [expandedId, setExpandedId] = useState(null);

  const wins = log.filter((e) => e.outcome === 'won').length;
  const losses = log.filter((e) => e.outcome === 'lost').length;
  const abandoned = log.filter((e) => e.outcome === 'abandoned').length;

  const outcomeLabel = { won: 'Survived', lost: 'Died', abandoned: 'Abandoned' };

  // Undo toast: holds the snapshot to restore + a message. Auto-dismisses.
  const [undo, setUndo] = useState(null); // { snapshot, message } | null
  const undoTimer = useRef(null);

  function showUndo(snapshot, message) {
    if (undoTimer.current) clearTimeout(undoTimer.current);
    setUndo({ snapshot, message });
    // Give a generous window to react before it disappears.
    undoTimer.current = setTimeout(() => setUndo(null), 10000);
  }

  // Clean up the timer if the view unmounts.
  useEffect(() => () => undoTimer.current && clearTimeout(undoTimer.current), []);

  function handleDelete(e) {
    // Snapshot BEFORE deleting so Undo can put it back exactly.
    const snapshot = { log: [...log], manual: { ...manual } };
    const label =
      [e.finalGirlName, e.killerName, e.locationName].filter(Boolean).join(' · ') ||
      'game';
    deleteEntry(e.id);
    showUndo(snapshot, `Deleted "${label}".`);
  }

  function handleClearAll() {
    const snapshot = { log: [...log], manual: { ...manual } };
    const count = log.length;
    clearLog();
    showUndo(snapshot, `Cleared all ${count} game${count === 1 ? '' : 's'}.`);
  }

  function handleUndo() {
    if (!undo) return;
    restoreLog(undo.snapshot);
    if (undoTimer.current) clearTimeout(undoTimer.current);
    setUndo(null);
  }

  return (
    <div>
      {undo && (
        <div className="gl-undo" role="status">
          <span className="gl-undo__msg">{undo.message}</span>
          <button className="gl-undo__btn" onClick={handleUndo}>
            Undo
          </button>
          <button
            className="gl-undo__dismiss"
            onClick={() => setUndo(null)}
            aria-label="Dismiss"
            title="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      <div className="view-head">
        <p className="section-eyebrow">The body count</p>
        <h1>Game Log</h1>
        <p className="lead">
          A record of your past games — who you played, where, and whether you walked
          away. Tap a game for the full turn-by-turn detail, and edit it if you need
          to fix anything. Synced across your devices; deleting also updates MI and
          Achievements.
        </p>
      </div>

      {log.length === 0 ? (
        <div className="gl-empty fg-panel">
          <span className="gl-empty__glyph" aria-hidden="true">&#128220;</span>
          <h2 className="gl-empty__title">No games recorded yet</h2>
          <p className="gl-empty__body">
            Press <strong>Start Game</strong> on the This Game tab, play, then record the
            result. It&rsquo;ll show up here.
          </p>
        </div>
      ) : (
        <>
          <div className="gl-tally fg-panel">
            <div className="gl-tally__stat">
              <span className="gl-tally__num">{log.length}</span>
              <span className="gl-tally__label">Games</span>
            </div>
            <div className="gl-tally__stat gl-tally__stat--won">
              <span className="gl-tally__num">{wins}</span>
              <span className="gl-tally__label">Survived</span>
            </div>
            <div className="gl-tally__stat gl-tally__stat--lost">
              <span className="gl-tally__num">{losses}</span>
              <span className="gl-tally__label">Died</span>
            </div>
            {abandoned > 0 && (
              <div className="gl-tally__stat">
                <span className="gl-tally__num">{abandoned}</span>
                <span className="gl-tally__label">Abandoned</span>
              </div>
            )}
          </div>

          {demoMode && (
            <p className="gl-actions__hint fg-type">
              Showing demo games &mdash; deleting, clearing and editing are switched off until
              you turn demo data off.
            </p>
          )}

          <CollapsibleSection title="History" count={`${log.length} game${log.length === 1 ? '' : 's'}`}>
          <ul className="gl-list">
            {log.map((e) => {
              const isOpen = expandedId === e.id;
              const eventCount = (e.events && e.events.length) || 0;
              return (
              <li key={e.id} className={'gl-entry fg-panel gl-entry--' + e.outcome + (isOpen ? ' is-open' : '')}>
                <button
                  type="button"
                  className="gl-entry__main gl-entry__main--toggle"
                  onClick={() => setExpandedId(isOpen ? null : e.id)}
                  aria-expanded={isOpen}
                >
                  <span className={'gl-entry__outcome gl-entry__outcome--' + e.outcome}>
                    {outcomeLabel[e.outcome] || e.outcome}
                  </span>
                  <div className="gl-entry__combo">
                    {(() => {
                      const killer = getKiller(e.killerId);
                      const location = getLocation(e.locationId);
                      const kIcon = killer && getIcon('killer', killer);
                      const lIcon = location && getIcon('location', location);
                      return (
                        <>
                          {(kIcon || lIcon) && (
                            <span className="gl-entry__icons">
                              {kIcon && <img className="gl-entry__icon" src={kIcon} alt="" aria-hidden="true" />}
                              {lIcon && <img className="gl-entry__icon" src={lIcon} alt="" aria-hidden="true" />}
                            </span>
                          )}
                          {[e.finalGirlName, e.killerName, e.locationName]
                            .filter(Boolean)
                            .join('  \u00B7  ') || 'Unknown game'}
                        </>
                      );
                    })()}
                  </div>
                  <div className="gl-entry__meta fg-type">
                    {formatDate(e.endedAt)}
                    {e.turns ? `  \u00B7  ${e.turns} turns` : ''}
                    {eventCount > 0 ? `  \u00B7  ${eventCount} event${eventCount === 1 ? '' : 's'}` : ''}
                  </div>
                  {e.achievements && e.achievements.length > 0 && (
                    <p className="gl-entry__achv">
                      &#9733; {e.achievements.length} achievement
                      {e.achievements.length === 1 ? '' : 's'} earned
                    </p>
                  )}
                  {e.mistakes && e.mistakes.length > 0 && (
                    <ul className="gl-entry__mistakes">
                      {e.mistakes.map((m, i) => (
                        <li key={i} className={'gl-mistake gl-mistake--' + m.type}>
                          <span className="gl-mistake__tag">{m.type === 'rules' ? 'Rules' : 'Strategy'}</span>
                          {m.text}
                        </li>
                      ))}
                    </ul>
                  )}
                  {e.notes && <p className="gl-entry__notes">{e.notes}</p>}
                  <span className="gl-entry__expand" aria-hidden="true">
                    {isOpen ? 'Hide details \u25B2' : 'Show details \u25BC'}
                  </span>
                </button>

                {isOpen && <GameDetail entry={e} onUpdate={demoMode ? null : updateEntry} />}

                {!demoMode && (
                  <button
                    className="gl-entry__delete"
                    onClick={() => handleDelete(e)}
                    aria-label="Delete this record"
                    title="Delete"
                  >
                    &times;
                  </button>
                )}
              </li>
              );
            })}
          </ul>
          </CollapsibleSection>

          {/* Danger zone lives at the bottom, away from everyday taps */}
          {!demoMode && (
            <div className="gl-actions">
              <button className="gl-clear-all" onClick={handleClearAll}>
                Clear all games
              </button>
              <span className="gl-actions__hint fg-type">
                Handy for resetting after a test run (you get 10 seconds to undo).
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
