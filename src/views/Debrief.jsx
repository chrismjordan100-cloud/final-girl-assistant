import { useMemo, useState } from 'react';
import { useGameLog, aggregateMistakes } from '../hooks/useGameLog.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { getKiller, getLocation } from '../data/games.js';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
import { StatCard, StatCardGrid } from '../components/StatCards.jsx';
import './Debrief.css';

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

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'rules', label: 'Rules errors' },
  { id: 'strategy', label: 'Strategy errors' },
];

export default function Debrief() {
  const { log } = useGameLog();
  const { killerId, locationId } = useGameSelection();
  const [filter, setFilter] = useState('all');
  const [scopeToGame, setScopeToGame] = useState(true);

  const killer = getKiller(killerId);
  const location = getLocation(locationId);
  const hasSelection = Boolean(killer || location);
  const scoped = hasSelection && scopeToGame;

  // When scoping to the current game, only count games that involved the
  // selected Killer or Location. With no selection (or scope off), use all.
  const scopedLog = useMemo(() => {
    if (!scoped) return log;
    return log.filter(
      (g) =>
        (killerId && g.killerId === killerId) ||
        (locationId && g.locationId === locationId)
    );
  }, [log, scoped, killerId, locationId]);

  const groups = useMemo(() => aggregateMistakes(scopedLog), [scopedLog]);
  const shown = filter === 'all' ? groups : groups.filter((g) => g.type === filter);

  const totalLogged = groups.reduce((n, g) => n + g.count, 0);
  const recurring = groups.filter((g) => g.count > 1);
  const rulesCount = groups.filter((g) => g.type === 'rules').reduce((n, g) => n + g.count, 0);
  const strategyCount = groups.filter((g) => g.type === 'strategy').reduce((n, g) => n + g.count, 0);

  // Richer insights derived from the real games (scoped when a game is picked).
  const insights = useMemo(() => {
    const realGames = scopedLog.filter((g) => !g.isTest);
    const gamesWithMistakes = realGames.filter((g) => (g.mistakes || []).length > 0);
    const cleanGames = realGames.length - gamesWithMistakes.length;
    const perGame = realGames.length ? totalLogged / realGames.length : 0;

    // Current "clean streak": trailing most-recent real games with no mistakes.
    // Log is newest-first already.
    let cleanStreak = 0;
    for (const g of realGames) {
      if ((g.mistakes || []).length === 0) cleanStreak += 1;
      else break;
    }

    // Mistakes by combo (which Killer/Location you slip up on most).
    const byCombo = {};
    for (const g of realGames) {
      const n = (g.mistakes || []).length;
      if (!n) continue;
      const combo = [g.killerName, g.locationName].filter(Boolean).join(' @ ') || 'Unknown';
      (byCombo[combo] ||= 0);
      byCombo[combo] += n;
    }
    const comboRanked = Object.entries(byCombo)
      .map(([combo, count]) => ({ combo, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topMistake = groups[0] || null;

    return {
      realGames: realGames.length,
      gamesWithMistakes: gamesWithMistakes.length,
      cleanGames,
      perGame: Math.round(perGame * 10) / 10,
      cleanStreak,
      comboRanked,
      topMistake,
    };
  }, [scopedLog, groups, totalLogged]);

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">Learn from the body count</p>
        <h1>Debrief</h1>
        <p className="lead">
          Every mistake you logged after a real game, grouped so repeat offenders rise to
          the top. Fix the recurring ones and your win rate follows.
        </p>
      </div>

      <div className="db-scope">
        {hasSelection ? (
          <label className="db-scope__toggle">
            <input
              type="checkbox"
              checked={scopeToGame}
              onChange={(e) => setScopeToGame(e.target.checked)}
            />
            Focus on this game
            <span className="db-scope__game fg-type">
              ({[killer?.name, location?.name].filter(Boolean).join(' @ ')})
            </span>
          </label>
        ) : (
          <span className="db-scope__none fg-type">
            No game selected &mdash; showing mistakes across all games. Pick a game to focus.
          </span>
        )}
      </div>

      {groups.length === 0 ? (
        <div className="db-empty fg-panel">
          <span className="db-empty__glyph" aria-hidden="true">&#129520;</span>
          <h2 className="db-empty__title">
            {scoped ? 'No mistakes for this game' : 'Nothing logged yet'}
          </h2>
          <p className="db-empty__body">
            {scoped ? (
              <>
                You haven&rsquo;t logged any mistakes for{' '}
                <strong>{[killer?.name, location?.name].filter(Boolean).join(' @ ')}</strong> yet.
                Untick &ldquo;Focus on this game&rdquo; to see all your mistakes.
              </>
            ) : (
              <>
                When you finish a real game on the <strong>This Game</strong> tab, note any
                slip-ups in the Mistakes box. They&rsquo;ll collect here so you can spot
                patterns over time.
              </>
            )}
          </p>
        </div>
      ) : (
        <>
          <StatCardGrid>
            <StatCard value={totalLogged} label="Mistakes logged" sub={`across ${insights.gamesWithMistakes} game${insights.gamesWithMistakes === 1 ? '' : 's'}`} tone="bad" />
            <StatCard value={recurring.length} label="Recurring" sub="made more than once" tone={recurring.length > 0 ? 'bad' : 'good'} />
            <StatCard value={insights.perGame} label="Per game" sub="average over real games" />
            <StatCard value={insights.cleanGames} label="Clean games" sub="no mistakes logged" tone="good" />
            <StatCard value={insights.cleanStreak} label="Clean streak" sub="most recent games" tone={insights.cleanStreak > 0 ? 'good' : undefined} />
            <StatCard value={rulesCount} label="Rules errors" tone="bad" />
            <StatCard value={strategyCount} label="Strategy errors" tone="gold" />
          </StatCardGrid>

          {insights.topMistake && (
            <div className="db-headline fg-panel">
              <span className="db-headline__label fg-type">Your most common slip-up</span>
              <span className="db-headline__text">
                <span className={'db-headline__tag db-headline__tag--' + insights.topMistake.type}>
                  {insights.topMistake.type === 'rules' ? 'Rules' : 'Strategy'}
                </span>
                {insights.topMistake.text}
              </span>
              <span className="db-headline__count">{insights.topMistake.count}&times;</span>
            </div>
          )}

          {insights.comboRanked.length > 0 && (
            <CollapsibleSection title="Where mistakes happen" count={`${insights.comboRanked.length}`}>
              <p className="db-note fg-type">Which Killer / Location you slip up on most.</p>
              <ul className="db-combo-list">
                {insights.comboRanked.map((c) => (
                  <li key={c.combo} className="db-combo-row">
                    <span className="db-combo-row__name">{c.combo}</span>
                    <span className="db-combo-row__count">{c.count} mistake{c.count === 1 ? '' : 's'}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}

          {recurring.length > 0 && (
            <CollapsibleSection title="⚠ Watch out for these" count={`${recurring.length}`}>
              <p className="db-watch__intro fg-type">
                {scoped
                  ? `Mistakes you've made more than once with ${[killer?.name, location?.name].filter(Boolean).join(' / ')}. Keep them front of mind this game.`
                  : 'You\u2019ve made each of these more than once. Keep them front of mind next game.'}
              </p>
              <ul className="db-watch__list">
                {recurring.slice(0, 5).map((g) => (
                  <li key={g.key} className={'db-watch__item db-watch__item--' + g.type}>
                    <span className="db-watch__count">{g.count}&times;</span>
                    <span className="db-watch__text">{g.text}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}

          <CollapsibleSection title="All mistakes" count={`${shown.length}`}>
          <div className="db-filters" role="tablist">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                className={'db-filter' + (filter === f.id ? ' is-active' : '')}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <ul className="db-list">
            {shown.map((g) => (
              <li key={g.key} className={'db-entry fg-panel db-entry--' + g.type}>
                <div className="db-entry__head">
                  <span className={'db-entry__tag db-entry__tag--' + g.type}>
                    {g.type === 'rules' ? 'Rules' : 'Strategy'}
                  </span>
                  <span className="db-entry__text">{g.text}</span>
                  <span className={'db-entry__count' + (g.count > 1 ? ' is-repeat' : '')}>
                    {g.count}&times;
                  </span>
                </div>
                <div className="db-entry__games fg-type">
                  {g.games.slice(0, 4).map((game, i) => (
                    <span key={game.id + '-' + i} className="db-entry__game">
                      {game.combo}
                      {game.endedAt ? ` (${formatDate(game.endedAt)})` : ''}
                    </span>
                  ))}
                  {g.games.length > 4 && (
                    <span className="db-entry__game db-entry__game--more">
                      +{g.games.length - 4} more
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          </CollapsibleSection>
        </>
      )}
    </div>
  );
}
