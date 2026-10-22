import { useGameLog } from '../hooks/useGameLog.js';
import { getKiller, getLocation, getIcon } from '../data/games.js';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
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
  const { log, deleteEntry } = useGameLog();

  const wins = log.filter((e) => e.outcome === 'won').length;
  const losses = log.filter((e) => e.outcome === 'lost').length;
  const abandoned = log.filter((e) => e.outcome === 'abandoned').length;

  const outcomeLabel = { won: 'Survived', lost: 'Died', abandoned: 'Abandoned' };

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">The body count</p>
        <h1>Game Log</h1>
        <p className="lead">
          A record of your past games — who you played, where, and whether you walked
          away. Saved on this device.
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

          <CollapsibleSection title="History" count={`${log.length} game${log.length === 1 ? '' : 's'}`}>
          <ul className="gl-list">
            {log.map((e) => (
              <li key={e.id} className={'gl-entry fg-panel gl-entry--' + e.outcome}>
                <div className="gl-entry__main">
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
                </div>
                <button
                  className="gl-entry__delete"
                  onClick={() => deleteEntry(e.id)}
                  aria-label="Delete this record"
                  title="Delete"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
          </CollapsibleSection>
        </>
      )}
    </div>
  );
}
