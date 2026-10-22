import { useMemo } from 'react';
import {
  killers,
  locations,
  finalGirls,
  getAchievements,
  computeEarned,
  getIcon,
} from '../data/games.js';
import { useGameLog } from '../hooks/useGameLog.js';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
import './Stats.css';

/* Win rate over decisive games (won or lost; abandoned excluded). */
function rateFor(games) {
  const decisive = games.filter((g) => g.outcome === 'won' || g.outcome === 'lost');
  const wins = decisive.filter((g) => g.outcome === 'won').length;
  const pct = decisive.length ? Math.round((wins / decisive.length) * 100) : null;
  return { played: games.length, decisive: decisive.length, wins, pct };
}

const nameFromId = (list, id) => (list.find((x) => x.id === id) || {}).name || null;

/* Most-played entry of a kind (by id), with its win rate. */
function favourite(games, idKey, list) {
  const counts = {};
  for (const g of games) {
    const id = g[idKey];
    if (!id) continue;
    (counts[id] ||= { played: 0, wins: 0, decisive: 0 });
    counts[id].played += 1;
    if (g.outcome === 'won') { counts[id].wins += 1; counts[id].decisive += 1; }
    else if (g.outcome === 'lost') counts[id].decisive += 1;
  }
  let best = null;
  for (const [id, c] of Object.entries(counts)) {
    if (!best || c.played > best.played) best = { id, ...c };
  }
  if (!best) return null;
  return {
    name: nameFromId(list, best.id),
    played: best.played,
    pct: best.decisive ? Math.round((best.wins / best.decisive) * 100) : null,
  };
}

/* Longest run of consecutive wins (chronological) and the current active run. */
function streaks(games) {
  // games arrive newest-first; sort oldest-first for chronological streaks.
  const chrono = [...games]
    .filter((g) => g.outcome === 'won' || g.outcome === 'lost')
    .sort((a, b) => (a.endedAt || '').localeCompare(b.endedAt || ''));
  let best = 0;
  let run = 0;
  for (const g of chrono) {
    if (g.outcome === 'won') { run += 1; best = Math.max(best, run); }
    else run = 0;
  }
  // Current streak = trailing run from the most recent decisive games.
  let current = 0;
  for (let i = chrono.length - 1; i >= 0; i--) {
    if (chrono[i].outcome === 'won') current += 1;
    else break;
  }
  return { best, current };
}

/* Per-entry win-rate records, used to find best/worst performers.
   Returns an array of { id, name, played, wins, decisive, pct } for entries
   with at least `minDecisive` decisive games (won/lost). */
function winRateRecords(games, idKey, list, minDecisive = 2) {
  const counts = {};
  for (const g of games) {
    const id = g[idKey];
    if (!id) continue;
    (counts[id] ||= { played: 0, wins: 0, decisive: 0 });
    counts[id].played += 1;
    if (g.outcome === 'won') { counts[id].wins += 1; counts[id].decisive += 1; }
    else if (g.outcome === 'lost') counts[id].decisive += 1;
  }
  return Object.entries(counts)
    .map(([id, c]) => ({
      id,
      name: nameFromId(list, id),
      played: c.played,
      wins: c.wins,
      decisive: c.decisive,
      pct: c.decisive ? Math.round((c.wins / c.decisive) * 100) : null,
    }))
    .filter((r) => r.decisive >= minDecisive);
}

/* The best and worst performers by win rate from a record list.
   Ties broken by more decisive games (more evidence). */
function bestWorst(records) {
  if (records.length === 0) return { best: null, worst: null };
  const sorted = [...records].sort(
    (a, b) => b.pct - a.pct || b.decisive - a.decisive
  );
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  return { best, worst: worst.id === best.id ? null : worst };
}

/* Games grouped by YYYY-MM, oldest→newest, for an activity sparkline. */
function monthlyActivity(games) {
  const by = {};
  for (const g of games) {
    if (!g.endedAt) continue;
    const key = g.endedAt.slice(0, 7); // YYYY-MM
    (by[key] ||= { won: 0, lost: 0, abandoned: 0, total: 0 });
    by[key][g.outcome] = (by[key][g.outcome] || 0) + 1;
    by[key].total += 1;
  }
  return Object.keys(by)
    .sort()
    .map((key) => ({ key, ...by[key] }));
}

/* A single headline stat card. */
function StatCard({ value, label, sub, tone }) {
  return (
    <div className={'stats-card fg-panel' + (tone ? ' stats-card--' + tone : '')}>
      <span className="stats-card__value">{value}</span>
      <span className="stats-card__label">{label}</span>
      {sub && <span className="stats-card__sub fg-type">{sub}</span>}
    </div>
  );
}

/* A best/worst-matchup card. `rec` is a win-rate record (or null). */
function RivalCard({ label, tone, rec, iconType }) {
  return (
    <div className={'stats-rival fg-panel stats-rival--' + tone}>
      <span className="stats-rival__label fg-type">{label}</span>
      {rec ? (
        <>
          <span className="stats-rival__name">
            {getIcon(iconType, rec) && (
              <img className="stats-rival__icon" src={getIcon(iconType, rec)} alt="" aria-hidden="true" />
            )}
            {rec.name}
          </span>
          <span className="stats-rival__pct">{rec.pct}% wins</span>
          <span className="stats-rival__sub fg-type">
            {rec.wins}/{rec.decisive} decisive
            {rec.played !== rec.decisive ? ` \u00b7 ${rec.played} played` : ''}
          </span>
        </>
      ) : (
        <span className="stats-rival__none fg-type">Not enough games yet</span>
      )}
    </div>
  );
}

/* A "most played" card for Killer / Location / Final Girl. */
function FavCard({ kind, fav }) {
  return (
    <div className="stats-favcard fg-panel">
      <span className="stats-favcard__kind fg-type">Most-played {kind}</span>
      {fav ? (
        <>
          <span className="stats-favcard__name">{fav.name}</span>
          <span className="stats-favcard__sub fg-type">
            {fav.played} game{fav.played === 1 ? '' : 's'}
            {fav.pct !== null ? ` \u00b7 ${fav.pct}% wins` : ''}
          </span>
        </>
      ) : (
        <span className="stats-favcard__name stats-favcard__name--none">&mdash;</span>
      )}
    </div>
  );
}

function StatTable({ title, items, idKey, log, showAchievements, earnedSet }) {
  // Which icon type (if any) applies to this table's items.
  const iconType = idKey === 'killerId' ? 'killer' : idKey === 'locationId' ? 'location' : null;

  const rows = items
    .map((item) => {
      const games = log.filter((g) => g[idKey] === item.id);
      const rate = rateFor(games);
      let achPct = null;
      if (showAchievements) {
        const list = getAchievements(item);
        if (list.length) {
          const got = list.filter((a) => earnedSet.has(a.id)).length;
          achPct = Math.round((got / list.length) * 100);
        }
      }
      return { item, ...rate, achPct };
    })
    .filter((r) => r.played > 0)
    .sort((a, b) => (b.pct ?? -1) - (a.pct ?? -1));

  if (rows.length === 0) {
    return (
      <CollapsibleSection title={title}>
        <p className="stats-empty fg-type">No real games recorded yet.</p>
      </CollapsibleSection>
    );
  }

  return (
    <CollapsibleSection title={title} count={`${rows.length} played`}>
      <ul className="stats-rows">
        {rows.map((r) => (
          <li key={r.item.id} className="stats-row">
            <span className="stats-row__name">
              {iconType && getIcon(iconType, r.item) && (
                <img className="stats-row__icon" src={getIcon(iconType, r.item)} alt="" aria-hidden="true" />
              )}
              {r.item.name}
            </span>
            <span className="stats-row__bar">
              <span className="stats-row__fill" style={{ width: `${r.pct ?? 0}%` }} />
            </span>
            <span className="stats-row__pct">{r.pct === null ? '—' : `${r.pct}%`}</span>
            <span className="stats-row__count fg-type">
              {r.wins}/{r.decisive} won
              {r.played !== r.decisive ? ` (${r.played} played)` : ''}
              {showAchievements && r.achPct !== null ? ` · ${r.achPct}% achievements` : ''}
            </span>
          </li>
        ))}
      </ul>
    </CollapsibleSection>
  );
}

export default function Stats() {
  const { log, manual } = useGameLog();

  // MI reflects REAL games only.
  const realLog = useMemo(() => log.filter((g) => !g.isTest), [log]);
  const testCount = log.length - realLog.length;

  // Earned = games + auto-detection + manual overrides (manual wins).
  const earnedSet = useMemo(() => computeEarned(log, manual).earned, [log, manual]);

  const overall = rateFor(realLog);

  const insights = useMemo(() => {
    const won = realLog.filter((g) => g.outcome === 'won');
    const lost = realLog.filter((g) => g.outcome === 'lost');
    const abandoned = realLog.filter((g) => g.outcome === 'abandoned');

    // Average turns to a win.
    const winTurns = won.map((g) => g.turns).filter((t) => typeof t === 'number');
    const avgWinTurns = winTurns.length
      ? Math.round((winTurns.reduce((a, b) => a + b, 0) / winTurns.length) * 10) / 10
      : null;
    const fastestWin = winTurns.length ? Math.min(...winTurns) : null;

    // Distinct combos / coverage.
    const combos = new Set(realLog.filter((g) => g.killerId && g.locationId).map((g) => g.killerId + '|' + g.locationId));
    const totalCombos = killers.length * locations.length;

    // Mistakes logged.
    const mistakeCount = realLog.reduce((n, g) => n + (g.mistakes ? g.mistakes.length : 0), 0);

    // Total achievements earned (across everything).
    const totalAchv = [...killers, ...locations].reduce((n, e) => n + getAchievements(e).length, 0);
    const gotAchv = earnedSet.size;

    const st = streaks(realLog);

    // Best / worst performers (your win rate) for Killers and Locations.
    const killerWR = bestWorst(winRateRecords(realLog, 'killerId', killers));
    const locationWR = bestWorst(winRateRecords(realLog, 'locationId', locations));

    return {
      won: won.length,
      lost: lost.length,
      abandoned: abandoned.length,
      avgWinTurns,
      fastestWin,
      combosPlayed: combos.size,
      totalCombos,
      mistakeCount,
      gotAchv,
      totalAchv,
      streak: st,
      killerWR,
      locationWR,
      favKiller: favourite(realLog, 'killerId', killers),
      favLocation: favourite(realLog, 'locationId', locations),
      favFinalGirl: favourite(realLog, 'finalGirlId', finalGirls),
      months: monthlyActivity(realLog),
    };
  }, [realLog, earnedSet]);

  const hasGames = realLog.length > 0;
  const maxMonth = insights.months.reduce((m, x) => Math.max(m, x.total), 0) || 1;

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">The numbers</p>
        <h1>MI &amp; Outcomes</h1>
        <p className="lead">
          Win rates and achievement coverage from your <strong>real</strong> games.
          Abandoned games are excluded from win rates; test games are excluded entirely.
        </p>
      </div>

      <div className="stats-headline fg-panel">
        <div className="stats-headline__big">
          {overall.pct === null ? '—' : `${overall.pct}%`}
        </div>
        <div className="stats-headline__detail">
          <strong>Overall win rate</strong>
          <span className="fg-type">
            {overall.wins} won of {overall.decisive} decisive
            {overall.played !== overall.decisive ? ` · ${overall.played} real games` : ''}
            {testCount > 0 ? ` · ${testCount} test game${testCount === 1 ? '' : 's'} excluded` : ''}
          </span>
        </div>
      </div>

      {!hasGames ? (
        <p className="stats-empty fg-type" style={{ marginBottom: '2rem' }}>
          No real games recorded yet. Play some (or flip on Demo data in the header) to
          populate these stats.
        </p>
      ) : (
        <>
          {/* Headline stat cards */}
          <div className="stats-cards">
            <StatCard value={realLog.length} label="Games played" sub={`${insights.won}W / ${insights.lost}L / ${insights.abandoned}A`} />
            <StatCard value={insights.streak.current} label="Current win streak" sub={`best ever ${insights.streak.best}`} tone={insights.streak.current > 0 ? 'good' : undefined} />
            <StatCard value={insights.streak.best} label="Best win streak" />
            <StatCard value={`${insights.gotAchv}/${insights.totalAchv}`} label="Achievements" sub={`${Math.round((insights.gotAchv / (insights.totalAchv || 1)) * 100)}% complete`} tone="gold" />
            <StatCard value={insights.avgWinTurns ?? '—'} label="Avg turns to win" sub={insights.fastestWin ? `fastest ${insights.fastestWin}` : undefined} />
            <StatCard value={`${insights.combosPlayed}/${insights.totalCombos}`} label="Combos tried" sub="Killer × Location" />
            <StatCard value={insights.mistakeCount} label="Mistakes logged" sub="see Debrief" tone={insights.mistakeCount > 0 ? 'bad' : undefined} />
          </div>

          {/* Outcome breakdown bar */}
          <CollapsibleSection title="Outcomes">
            <div className="stats-outcome">
              <div className="stats-outcome__bar">
                {insights.won > 0 && <span className="stats-outcome__seg stats-outcome__seg--won" style={{ flex: insights.won }} title={`${insights.won} won`} />}
                {insights.lost > 0 && <span className="stats-outcome__seg stats-outcome__seg--lost" style={{ flex: insights.lost }} title={`${insights.lost} lost`} />}
                {insights.abandoned > 0 && <span className="stats-outcome__seg stats-outcome__seg--abandoned" style={{ flex: insights.abandoned }} title={`${insights.abandoned} abandoned`} />}
              </div>
              <div className="stats-outcome__legend fg-type">
                <span><span className="stats-dot stats-dot--won" /> {insights.won} survived</span>
                <span><span className="stats-dot stats-dot--lost" /> {insights.lost} died</span>
                <span><span className="stats-dot stats-dot--abandoned" /> {insights.abandoned} abandoned</span>
              </div>
            </div>
          </CollapsibleSection>

          {/* Favourites */}
          <CollapsibleSection title="Most played">
            <div className="stats-fav">
              <FavCard kind="Killer" fav={insights.favKiller} />
              <FavCard kind="Location" fav={insights.favLocation} />
              <FavCard kind="Final Girl" fav={insights.favFinalGirl} />
            </div>
          </CollapsibleSection>

          {/* Best / worst performers — your win rate against each */}
          {(insights.killerWR.best || insights.locationWR.best) && (
            <CollapsibleSection title="Best & worst matchups">
              <h2 className="stats-block__title">Best &amp; worst matchups</h2>
              <p className="stats-note fg-type">
                Your win rate for each Killer and Location (from games with a decisive
                result). Needs at least 2 decisive games for an entry to appear.
              </p>
              <div className="stats-rivals">
                <RivalCard label="Most conquered Killer" tone="good" rec={insights.killerWR.best} iconType="killer" />
                <RivalCard label="Toughest Killer" tone="bad" rec={insights.killerWR.worst} iconType="killer" />
                <RivalCard label="Most conquered Location" tone="good" rec={insights.locationWR.best} iconType="location" />
                <RivalCard label="Toughest Location" tone="bad" rec={insights.locationWR.worst} iconType="location" />
              </div>
            </CollapsibleSection>
          )}

          {/* Activity over time */}
          {insights.months.length > 1 && (
            <CollapsibleSection title="Games per month">
              <p className="stats-note fg-type">
                How many games you played each month, coloured by outcome (green survived,
                red died, gold abandoned). Hover a bar for the detail.
              </p>
              <div className="stats-activity">
                {insights.months.map((m) => (
                  <div key={m.key} className="stats-activity__col" title={`${m.key}: ${m.total} games (${m.won}W/${m.lost}L)`}>
                    <div className="stats-activity__stack" style={{ height: `${(m.total / maxMonth) * 100}%` }}>
                      {m.won > 0 && <span className="stats-activity__seg stats-activity__seg--won" style={{ flex: m.won }} />}
                      {m.lost > 0 && <span className="stats-activity__seg stats-activity__seg--lost" style={{ flex: m.lost }} />}
                      {m.abandoned > 0 && <span className="stats-activity__seg stats-activity__seg--abandoned" style={{ flex: m.abandoned }} />}
                    </div>
                    <span className="stats-activity__label fg-type">{m.key.slice(2)}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          )}
        </>
      )}

      <StatTable
        title="By Killer"
        items={killers}
        idKey="killerId"
        log={realLog}
        showAchievements
        earnedSet={earnedSet}
      />
      <StatTable
        title="By Location"
        items={locations}
        idKey="locationId"
        log={realLog}
        showAchievements
        earnedSet={earnedSet}
      />
      <StatTable
        title="By Final Girl"
        items={finalGirls}
        idKey="finalGirlId"
        log={realLog}
      />
    </div>
  );
}
