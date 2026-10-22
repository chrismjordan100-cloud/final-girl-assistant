import { useMemo, useState } from 'react';
import {
  killers,
  locations,
  getAchievements,
  computeEarned,
  isAutoAchievement,
  autoProgress,
} from '../data/games.js';
import { useGameLog } from '../hooks/useGameLog.js';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
import { StatCard, StatCardGrid } from '../components/StatCards.jsx';
import { getIcon } from '../data/games.js';
import './Achievements.css';

function EntryAchievements({ item, earned, source, manual, log, onToggle }) {
  const list = getAchievements(item);
  if (list.length === 0) return null;
  const got = list.filter((a) => earned.has(a.id)).length;
  const complete = got === list.length;
  const pct = Math.round((got / list.length) * 100);

  return (
    <article className={'ach-card fg-panel' + (complete ? ' is-complete' : '')}>
      <header className="ach-card__head">
        <div>
          <h3 className="ach-card__name">{item.name}</h3>
          <span className="ach-card__film fg-type">{item.film}</span>
        </div>
        <span className={'ach-card__count' + (complete ? ' is-complete' : '')}>
          {got}/{list.length}
        </span>
      </header>
      <div className="ach-card__bar">
        <div className="ach-card__fill" style={{ width: `${pct}%` }} />
      </div>
      <ul className="ach-card__list">
        {list.map((a) => {
          const on = earned.has(a.id);
          const src = source.get(a.id);
          const auto = isAutoAchievement(a.id);
          const overridden = manual[a.id] !== undefined;
          // Progress on count-based auto achievements (e.g. 3/5 Locations).
          // Hidden once earned or when the player has set a manual override.
          const progress = !on && !overridden ? autoProgress(a.id, log) : null;
          return (
            <li
              key={a.id}
              className={
                'ach-item' +
                (on ? ' is-on' : ' is-off') +
                (overridden ? ' is-manual' : '')
              }
            >
              <button
                type="button"
                className="ach-item__toggle"
                onClick={() => onToggle(a.id, on)}
                aria-pressed={on}
                title={
                  on
                    ? 'Earned' + (src ? ` (${src})` : '') + ' \u2014 click to mark not earned'
                    : 'Not earned \u2014 click to mark earned'
                }
              >
                <span className="ach-card__mark" aria-hidden="true">{on ? '\u2605' : '\u2606'}</span>
                <span className="ach-card__label">{a.label}</span>
                <span className="ach-item__badges">
                  {progress && (
                    <span className="ach-badge ach-badge--progress" title={`${progress.current} of ${progress.target} so far`}>
                      {progress.current}/{progress.target}
                    </span>
                  )}
                  {auto && <span className="ach-badge ach-badge--auto" title="Auto-detected from your wins">AUTO</span>}
                  {on && src === 'manual' && <span className="ach-badge ach-badge--manual" title="Set by you">MANUAL</span>}
                </span>
              </button>
              {overridden && (
                <button
                  type="button"
                  className="ach-item__reset"
                  onClick={() => onToggle(a.id, on, true)}
                  title="Clear your manual override (go back to auto / game-based)"
                >
                  reset
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default function Achievements() {
  const { log, manual, setAchievementOverride } = useGameLog();
  const [hideComplete, setHideComplete] = useState(false);
  const [season, setSeason] = useState('all'); // 'all' | number

  // The seasons present in the data, ascending.
  const seasonOptions = useMemo(() => {
    const s = new Set([...killers, ...locations].map((e) => e.season));
    return [...s].sort((a, b) => a - b);
  }, []);

  // Earned set = games + auto-detection + manual overrides (manual wins).
  const { earned, source } = useMemo(() => computeEarned(log, manual), [log, manual]);

  // Clicking a tile toggles a manual override. If reset, clear the override.
  function handleToggle(id, currentlyOn, reset = false) {
    if (reset) {
      setAchievementOverride(id, null);
      return;
    }
    // Toggle to the opposite of the current displayed state, as an explicit
    // manual override (which always wins).
    setAchievementOverride(id, !currentlyOn);
  }

  // Apply the season filter.
  const inSeason = (item) => season === 'all' || item.season === Number(season);
  const seasonKillers = killers.filter(inSeason);
  const seasonLocations = locations.filter(inSeason);

  // Totals across the currently-filtered killer + location achievements.
  const all = [...seasonKillers, ...seasonLocations];
  const totalAch = all.reduce((n, item) => n + getAchievements(item).length, 0);
  const gotAch = all.reduce(
    (n, item) => n + getAchievements(item).filter((a) => earned.has(a.id)).length,
    0
  );
  const overallPct = totalAch ? Math.round((gotAch / totalAch) * 100) : 0;

  // Richer insights over the (season-filtered) entries.
  const insights = useMemo(() => {
    const entries = [...seasonKillers, ...seasonLocations].filter(
      (e) => getAchievements(e).length > 0
    );

    // Per-entry completion (got / total), to find complete / closest.
    const perEntry = entries.map((e) => {
      const list = getAchievements(e);
      const got = list.filter((a) => earned.has(a.id)).length;
      return {
        id: e.id,
        name: e.name,
        entry: e,
        type: killers.includes(e) ? 'killer' : 'location',
        got,
        total: list.length,
        remaining: list.length - got,
        pct: list.length ? Math.round((got / list.length) * 100) : 0,
      };
    });

    const complete = perEntry.filter((p) => p.remaining === 0);
    const started = perEntry.filter((p) => p.got > 0);
    // "Closest to complete" — not yet complete, fewest remaining, then highest %.
    const closest = perEntry
      .filter((p) => p.remaining > 0 && p.got > 0)
      .sort((a, b) => a.remaining - b.remaining || b.pct - a.pct)
      .slice(0, 5);

    // How the earned ones were earned (source breakdown).
    const bySource = { auto: 0, game: 0, manual: 0 };
    for (const [id, src] of source) {
      if (earned.has(id)) bySource[src] = (bySource[src] || 0) + 1;
    }

    // Completion by season (across killers+locations in that season).
    const seasons = [...new Set([...killers, ...locations].map((e) => e.season))].sort((a, b) => a - b);
    const bySeason = seasons
      .map((s) => {
        const items = [...killers, ...locations].filter((e) => e.season === s && getAchievements(e).length);
        const t = items.reduce((n, e) => n + getAchievements(e).length, 0);
        const g = items.reduce((n, e) => n + getAchievements(e).filter((a) => earned.has(a.id)).length, 0);
        return { season: s, got: g, total: t, pct: t ? Math.round((g / t) * 100) : 0 };
      })
      .filter((x) => x.total > 0);

    return { perEntry, complete, started, closest, bySource, bySeason };
  }, [seasonKillers, seasonLocations, earned, source]);

  const visible = (items) =>
    hideComplete
      ? items.filter((item) => {
          const list = getAchievements(item);
          return list.length > 0 && list.some((a) => !earned.has(a.id));
        })
      : items.filter((item) => getAchievements(item).length > 0);

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">The hunt for glory</p>
        <h1>Achievements</h1>
        <p className="lead">
          Every Killer and Location achievement, and how far you&rsquo;ve got. Some fill
          in automatically from your wins; the rest come from the end-of-game questions.
          Click any to set it yourself &mdash; your choice always wins.
        </p>
      </div>

      <div className="ach-controls">
        <div className="ach-seasons" role="group" aria-label="Filter by season">
          <button
            className={'ach-season-btn' + (season === 'all' ? ' is-active' : '')}
            onClick={() => setSeason('all')}
          >
            All
          </button>
          {seasonOptions.map((s) => (
            <button
              key={s}
              className={'ach-season-btn' + (season === s ? ' is-active' : '')}
              onClick={() => setSeason(s)}
            >
              Season {s}
            </button>
          ))}
        </div>
        <label className="ach-overall__toggle">
          <input
            type="checkbox"
            checked={hideComplete}
            onChange={(e) => setHideComplete(e.target.checked)}
          />
          Hide fully-complete
        </label>
      </div>

      <div className="ach-overall fg-panel">
        <div className="ach-overall__big">{gotAch}<span>/{totalAch}</span></div>
        <div className="ach-overall__detail">
          <strong>{overallPct}% complete</strong>
          <span className="fg-type">
            {totalAch - gotAch} still to earn
            {season !== 'all' ? ` \u00b7 Season ${season}` : ''}
          </span>
        </div>
      </div>

      {gotAch > 0 && (
        <>
          <StatCardGrid>
            <StatCard value={`${gotAch}/${totalAch}`} label="Earned" sub={`${overallPct}% complete`} tone="gold" />
            <StatCard value={insights.complete.length} label="Fully complete" sub="Killers + Locations" tone={insights.complete.length > 0 ? 'good' : undefined} />
            <StatCard value={insights.started.length} label="Started" sub="at least 1 earned" />
            <StatCard value={insights.bySource.auto || 0} label="Auto-tracked" sub="from your wins" tone="good" />
            <StatCard value={insights.bySource.manual || 0} label="Set manually" tone="gold" />
            <StatCard value={totalAch - gotAch} label="Still to earn" tone={totalAch - gotAch > 0 ? 'bad' : 'good'} />
          </StatCardGrid>

          {insights.closest.length > 0 && (
            <CollapsibleSection title="Closest to completing" count={`${insights.closest.length}`}>
              <ul className="ach-closest">
                {insights.closest.map((p) => (
                  <li key={p.id} className="ach-closest__item">
                    {getIcon(p.type, p.entry) && (
                      <img className="ach-closest__icon" src={getIcon(p.type, p.entry)} alt="" aria-hidden="true" />
                    )}
                    <span className="ach-closest__name">{p.name}</span>
                    <span className="ach-closest__bar">
                      <span className="ach-closest__fill" style={{ width: `${p.pct}%` }} />
                    </span>
                    <span className="ach-closest__count fg-type">
                      {p.got}/{p.total} &middot; {p.remaining} to go
                    </span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}

          {insights.bySeason.length > 1 && (
            <CollapsibleSection title="Completion by season">
              <ul className="ach-season-list">
                {insights.bySeason.map((s) => (
                  <li key={s.season} className="ach-season-row">
                    <span className="ach-season-row__name">Season {s.season}</span>
                    <span className="ach-season-row__bar">
                      <span className="ach-season-row__fill" style={{ width: `${s.pct}%` }} />
                    </span>
                    <span className="ach-season-row__pct">{s.pct}%</span>
                    <span className="ach-season-row__count fg-type">{s.got}/{s.total}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}
        </>
      )}

      <p className="ach-legend fg-type">
        <span className="ach-badge ach-badge--auto">AUTO</span> fills in from your wins &middot;{' '}
        <span className="ach-badge ach-badge--manual">MANUAL</span> set by you &middot; click a
        star to toggle, <em>reset</em> to clear your override.
      </p>

      <CollapsibleSection title="Killers" count={`${visible(seasonKillers).length}`}>
        <div className="ach-grid">
          {visible(seasonKillers).map((item) => (
            <EntryAchievements
              key={item.id}
              item={item}
              earned={earned}
              source={source}
              manual={manual}
              log={log}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Locations" count={`${visible(seasonLocations).length}`}>
        <div className="ach-grid">
          {visible(seasonLocations).map((item) => (
            <EntryAchievements
              key={item.id}
              item={item}
              earned={earned}
              source={source}
              manual={manual}
              log={log}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}
