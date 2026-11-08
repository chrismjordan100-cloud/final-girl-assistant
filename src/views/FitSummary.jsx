import { useMemo, useState } from 'react';
import { finalGirls, killers, locations, OFFICIAL_SCENARIOS } from '../data/games.js';
import { scoreGirl, isRated } from '../data/fgFit.js';
import { usePersistentState } from '../hooks/usePersistentState.js';
import { useFgCollection } from '../hooks/useFgCollection.js';
import './FitSummary.css';

/* ==========================================================================
   Fit summary: every rated Final Girl (rows) against every Killer x Location
   combo (columns), with the Best-fit score (1-10) in each cell.
     - Cell colour: red (poor) -> amber -> green (great), so rows and columns
       can be scanned for highs and lows. The number is always shown too.
     - Gold ring: the girl is OFFICIAL for that combo, meaning she comes in the
       same Feature Film box as the Killer or the Location. Gold ring + star:
       both, i.e. her own box's home scenario.
     - Columns are grouped under each Killer. Filters narrow the grid down:
       pick a series, then optionally one Killer / Location within it.
     - Sort: series order, best for the combos shown ("This" column), or
       best over every combo ("All" column).
   Scores come straight from scoreGirl() in src/data/fgFit.js, so this always
   agrees with Setup Assist and the Fit grid tab.
   ========================================================================== */

/* Series present in a list, in order, with season 0 (Krampus, Mort, promos…)
   last as "Specials & promos". */
const seriesOf = (list) => {
  const s = [...new Set(list.map((x) => x.season))].sort((a, b) => (a || 99) - (b || 99));
  return s.map((v) => ({ v: String(v), label: v === 0 ? 'Specials & promos' : `Series ${v}` }));
};
const seriesLabel = (v) => (Number(v) === 0 ? 'Specials & promos' : `Series ${v}`);
const inSeries = (x, s) => s === 'all' || x.season === Number(s);

/* Average score for a girl over a set of combos (null if none scored). */
function avgOver(girlId, ks, ls, envelopes) {
  let sum = 0;
  let n = 0;
  for (const k of ks) for (const l of ls) {
    const f = scoreGirl(girlId, k.id, l.id, envelopes);
    if (f) { sum += f.score; n += 1; }
  }
  return n ? sum / n : null;
}

/* Series dropdown with a second dropdown underneath for one Killer/Location
   within that series. `one` is an id or 'all'. */
function SeriesPicker({ label, noun, list, series, setSeries, one, setOne }) {
  const options = list.filter((x) => inSeries(x, series));
  const groups = series === 'all' ? seriesOf(list) : [{ v: series, label: seriesLabel(series) }];
  return (
    <div className="fgs-picker">
      <label>
        {label}
        <select
          value={series}
          onChange={(e) => {
            const s = e.target.value;
            setSeries(s);
            const cur = list.find((x) => x.id === one);
            if (cur && !inSeries(cur, s)) setOne('all');
          }}
        >
          <option value="all">All series</option>
          {seriesOf(list).map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
        </select>
      </label>
      <label className="fgs-picker__sub">
        <span className="fgx-dim">&#8627; {noun}</span>
        <select value={one} onChange={(e) => setOne(e.target.value)} aria-label={`${label}: pick one ${noun.toLowerCase()}`}>
          <option value="all">All {options.length} {label.toLowerCase()}</option>
          {groups.map((g) => {
            const items = options.filter((x) => String(x.season) === g.v);
            if (!items.length) return null;
            return series === 'all'
              ? <optgroup key={g.v} label={g.label}>{items.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</optgroup>
              : items.map((x) => <option key={x.id} value={x.id}>{x.name}</option>);
          })}
        </select>
      </label>
    </div>
  );
}

/* score 1..10 -> background colour (red -> amber -> green). */
function scoreColour(score) {
  const t = Math.max(0, Math.min(1, (score - 1) / 9));
  const hue = Math.round(t * 125); // 0 = red, ~60 = amber, 125 = green
  const light = 24 + Math.round(t * 6);
  return `hsl(${hue} 62% ${light}%)`;
}

const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

export default function FitSummary() {
  const [kSeries, setKSeries] = usePersistentState('fg-fitsum-kseries', 'all');
  const [lSeries, setLSeries] = usePersistentState('fg-fitsum-lseries', 'all');
  const [gSeries, setGSeries] = usePersistentState('fg-fitsum-gseries', 'all');
  const [kOne, setKOne] = usePersistentState('fg-fitsum-killer', 'all');
  const [lOne, setLOne] = usePersistentState('fg-fitsum-location', 'all');
  const [sortRaw, setSort] = usePersistentState('fg-fitsum-sort', 'series');
  // 'avg' was the old name for "best for this selection".
  const sort = sortRaw === 'avg' ? 'sel' : sortRaw;
  const [hover, setHover] = useState(null);

  const pick = (list, series, one) => {
    const inS = list.filter((x) => inSeries(x, series));
    const single = one !== 'all' && inS.find((x) => x.id === one);
    return single ? [single] : inS;
  };
  const ks = useMemo(() => pick(killers, kSeries, kOne), [kSeries, kOne]);
  const ls = useMemo(() => pick(locations, lSeries, lOne), [lSeries, lOne]);
  const unrated = finalGirls.filter((g) => !isRated(g.id));
  // Each girl's average over ALL combos: fixed, so work it out once.
  // Opened Secret Envelope items count towards scores (sealed ones never do).
  const { envelopes } = useFgCollection();
  const overall = useMemo(() => Object.fromEntries(
    finalGirls.filter((g) => isRated(g.id)).map((g) => [g.id, avgOver(g.id, killers, locations, envelopes)]),
  ), [envelopes]);

  // Score every (girl, killer, location) once for the current filters.
  const rows = useMemo(() => {
    const girls = finalGirls.filter((g) => isRated(g.id) && inSeries(g, gSeries));
    const out = girls.map((g) => {
      let sum = 0;
      let n = 0;
      const cells = ks.map((k) => ls.map((l) => {
        const fit = scoreGirl(g.id, k.id, l.id, envelopes);
        if (fit) { sum += fit.score; n += 1; }
        const offK = Boolean(g.film && k.film && g.film === k.film);
        const offL = Boolean(g.film && l.film && g.film === l.film);
        return { score: fit ? fit.score : null, offK, offL };
      }));
      return { g, cells, avg: n ? sum / n : null, all: overall[g.id] };
    });
    const by = sort === 'sel' ? 'avg' : sort === 'overall' ? 'all' : null;
    if (by) {
      out.sort((a, b) => (b[by] ?? 0) - (a[by] ?? 0) || (b.avg ?? 0) - (a.avg ?? 0) || a.g.name.localeCompare(b.g.name));
    }
    return out;
  }, [ks, ls, gSeries, sort, overall, envelopes]);

  // Column averages (across the girls shown) for spotting combos anyone can do.
  const colAvg = useMemo(() => ks.map((_, ki) => ls.map((_l, li) => {
    let sum = 0;
    let n = 0;
    for (const r of rows) {
      const s = r.cells[ki][li].score;
      if (s != null) { sum += s; n += 1; }
    }
    return n ? sum / n : null;
  })), [rows, ks, ls]);

  const colCount = ks.length * ls.length;
  const scope = [
    ks.length === 1 ? ks[0].name : kSeries === 'all' ? 'all Killers' : `${seriesLabel(kSeries)} Killers`,
    ls.length === 1 ? ls[0].name : lSeries === 'all' ? 'all Locations' : `${seriesLabel(lSeries)} Locations`,
  ].join(' \u00d7 ');

  return (
    <div className="fgs">
      <p className="fgx-intro">
        Every rated Final Girl against every Killer and Location combo, scored out of 10 with the same
        engine as Setup Assist. Scan along a row to see where a girl shines, or down a column to see who
        suits a combo. Hover or tap a cell for the details.
      </p>

      <section className="fgx-section fg-panel">
        <div className="fgx-pickers">
          <SeriesPicker label="Killers" noun="Killer" list={killers} series={kSeries} setSeries={setKSeries} one={kOne} setOne={setKOne} />
          <SeriesPicker label="Locations" noun="Location" list={locations} series={lSeries} setSeries={setLSeries} one={lOne} setOne={setLOne} />
          <label>
            Final Girls
            <select value={gSeries} onChange={(e) => setGSeries(e.target.value)}>
              <option value="all">All series</option>
              {seriesOf(finalGirls).map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
            </select>
          </label>
          <label>
            Sort girls by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="series">Series order</option>
              <option value="sel">Best for this selection</option>
              <option value="overall">Best overall (every combo)</option>
            </select>
          </label>
        </div>

        <div className="fgs-legend" aria-label="Colour key">
          <span className="fgs-legend__label">Poor</span>
          {[1, 3, 5, 7, 9, 10].map((s) => (
            <span key={s} className="fgs-key" style={{ background: scoreColour(s) }}>{s}</span>
          ))}
          <span className="fgs-legend__label">Great</span>
          <span className="fgs-key fgs-key--off" style={{ background: scoreColour(6) }}>7</span>
          <span className="fgs-legend__label">Official (her box has this Killer or Location)</span>
          <span className="fgs-key fgs-key--off fgs-key--both" style={{ background: scoreColour(6) }}>7</span>
          <span className="fgs-legend__label">Both (her own home scenario)</span>
        </div>

        <p className="fgx-dim fgx-small">
          Showing <strong>{scope}</strong>: {rows.length} Final Girls &times; {colCount} combo{colCount === 1 ? '' : 's'}.
          {' '}<b>This</b> = her average over the combos shown; <b>All</b> = her average over every combo.
          Any Final Girl can be played with any combo; the rings only show the official box pairings.
        </p>

        {rows.length === 0 || colCount === 0 ? (
          <p className="fgx-dim">Nothing matches those filters.</p>
        ) : (
          <div className="fgs-scroll">
            <table className="fgs-table">
              <thead>
                <tr className="fgs-h1">
                  <th className="fgs-corner" rowSpan={2}>Final Girl</th>
                  <th className="fgs-avg" rowSpan={2} title="Her average across the combos shown">This</th>
                  <th className="fgs-avg fgs-avg--all" rowSpan={2} title="Her average across every Killer and Location combo">All</th>
                  {ks.map((k) => (
                    <th key={k.id} colSpan={ls.length} className="fgs-khead" title={k.film || k.name}>
                      <span className="fgs-khead__txt">{k.name}</span>
                    </th>
                  ))}
                </tr>
                <tr className="fgs-h2">
                  {ks.map((k) => ls.map((l, li) => (
                    <th
                      key={k.id + l.id}
                      className={'fgs-lhead' + (li === 0 ? ' fgs-lhead--first' : '') + (OFFICIAL_SCENARIOS[`${k.id}|${l.id}`] ? ' is-home' : '')}
                      title={`${k.name} \u00d7 ${l.name}` + (OFFICIAL_SCENARIOS[`${k.id}|${l.id}`] ? ` (official scenario: ${OFFICIAL_SCENARIOS[`${k.id}|${l.id}`]})` : '')}
                    >
                      <span>{l.name}{OFFICIAL_SCENARIOS[`${k.id}|${l.id}`] ? ' \u25C6' : ''}</span>
                    </th>
                  )))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={r.g.id} className={hover === r.g.id ? 'is-hover' : ''}>
                    <th className="fgs-name" title={r.g.film} onMouseEnter={() => setHover(r.g.id)} onMouseLeave={() => setHover(null)}>
                      {sort !== 'series' && <span className="fgs-rank">{ri + 1}</span>}
                      {r.g.name}
                    </th>
                    <td className="fgs-avg" style={r.avg != null ? { background: scoreColour(r.avg) } : undefined}>
                      {r.avg != null ? r.avg.toFixed(1) : '\u2014'}
                    </td>
                    <td className="fgs-avg fgs-avg--all" style={r.all != null ? { background: scoreColour(r.all) } : undefined}>
                      {r.all != null ? r.all.toFixed(1) : '\u2014'}
                    </td>
                    {ks.map((k, ki) => ls.map((l, li) => {
                      const c = r.cells[ki][li];
                      const off = c.offK || c.offL;
                      const both = c.offK && c.offL;
                      const why = both
                        ? 'official: her own box has both this Killer and Location'
                        : c.offK ? `official: she comes in the ${k.name} box`
                          : c.offL ? `official: she comes in the ${l.name} box` : '';
                      return (
                        <td
                          key={k.id + l.id}
                          className={'fgs-cell' + (li === 0 ? ' fgs-cell--first' : '') + (off ? ' fgs-cell--off' : '') + (both ? ' fgs-cell--both' : '')}
                          style={c.score != null ? { background: scoreColour(c.score) } : undefined}
                          title={`${r.g.name} \u00b7 ${k.name} \u00d7 ${l.name}: ${c.score != null ? fmt(c.score) + '/10' : 'no profile'}${why ? ' (' + why + ')' : ''}`}
                        >
                          {c.score != null ? fmt(c.score) : '\u00b7'}{both ? '\u2605' : ''}
                        </td>
                      );
                    }))}
                  </tr>
                ))}
                <tr className="fgs-foot">
                  <th className="fgs-name">Average</th>
                  <td className="fgs-avg" />
                  <td className="fgs-avg fgs-avg--all" />
                  {ks.map((k, ki) => ls.map((l, li) => {
                    const a = colAvg[ki][li];
                    return (
                      <td
                        key={k.id + l.id}
                        className={'fgs-cell' + (li === 0 ? ' fgs-cell--first' : '')}
                        style={a != null ? { background: scoreColour(a) } : undefined}
                        title={`Average across the girls shown \u00b7 ${k.name} \u00d7 ${l.name}`}
                      >
                        {a != null ? a.toFixed(1) : '\u00b7'}
                      </td>
                    );
                  }))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <p className="fgx-dim fgx-small">&#9670; on a Location heading marks that Killer&rsquo;s official scenario pairing.</p>
        {unrated.length > 0 && (
          <p className="fgx-dim fgx-small">Not rated yet (card details or photos still missing): {unrated.map((g) => g.name).join(', ')}.</p>
        )}
      </section>
    </div>
  );
}
