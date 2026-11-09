import { useMemo, useState } from 'react';
import { finalGirls, killers, locations } from '../data/games.js';
import {
  TRAITS, GIRL_TRAITS, KILLER_NEEDS, LOCATION_NEEDS, SPECIALS, GIRL_TRAIT_IDS, FG_STATS,
  comboNeeds, rankGirls, comboConfidence,
} from '../data/fgFit.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { useFgCollection } from '../hooks/useFgCollection.js';
import './FitGrid.css';

/* ==========================================================================
   Fit Grid: the logic behind "Best fits by ability", laid out to read.
     1. Pick any Killer + Location: every rated girl's score and why.
     2. What that scenario needs, trait by trait.
     3. The trait grid: every girl's rating (0-3) in every trait.
     4. Killer and Location needs grids.
   Hover/tap a cell for the reason.
   ========================================================================== */

function Pips({ v, title }) {
  return (
    <span className={'fgx-pips fgx-pips--' + v} title={title}>
      {v > 0 ? '●'.repeat(v) : '·'}
    </span>
  );
}

function NeedsTable({ rows, needs, highlight }) {
  return (
    <div className="fgx-scroll">
      <table className="fgx-table">
        <thead>
          <tr>
            <th className="fgx-rowhead">Name</th>
            {TRAITS.map((t) => (
              <th key={t.id} title={t.desc} className={highlight[t.id] ? 'is-hot' : ''}>{t.short}</th>
            ))}
            <th>Basis</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const n = needs[r.id];
            return (
              <tr key={r.id}>
                <th className="fgx-rowhead">{r.name}</th>
                {TRAITS.map((t) => (
                  <td key={t.id} className={highlight[t.id] ? 'is-hot' : ''}>
                    <Pips v={n && n[t.id] ? n[t.id].v : 0} title={n && n[t.id] ? n[t.id].why : ''} />
                  </td>
                ))}
                <td className="fgx-basis">{n ? (n.confidence === 'tips' ? 'Tips' : 'Estimate') : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function FitGrid() {
  const sel = useGameSelection();
  const [k, setK] = useState(sel.killerId || 'hans');
  const [l, setL] = useState(sel.locationId || '');
  const [open, setOpen] = useState(null);

  const { envelopes } = useFgCollection();
  const ranked = useMemo(() => rankGirls(finalGirls, k, l, envelopes), [k, l, envelopes]);
  const needs = useMemo(() => comboNeeds(k, l), [k, l]);
  const hot = Object.fromEntries(Object.entries(needs).map(([id, n]) => [id, n.v >= 2]));
  const conf = comboConfidence(k, l);
  const rated = finalGirls.filter((g) => GIRL_TRAITS[g.id]);
  const unrated = finalGirls.filter((g) => !GIRL_TRAITS[g.id]);
  const scoreOf = Object.fromEntries(ranked.map((r) => [r.fg.id, r.fit.score]));
  const needOrder = TRAITS.filter((t) => needs[t.id]).sort((a, b) => needs[b.id].v - needs[a.id].v);
  const girlTraits = TRAITS.filter((t) => GIRL_TRAIT_IDS.includes(t.id));

  return (
    <div className="fgx">
      <div className="fgx-intro">
        <p>How &ldquo;Best fits by ability&rdquo; works. Each score out of 10 has three parts:</p>
        <ul>
          <li><strong>Scenario fit (55%)</strong>: each Final Girl is rated 0&ndash;3 in {GIRL_TRAIT_IDS.length} traits, and each Killer and Location says how much it rewards each trait (the Location counts at 70%).</li>
          <li><strong>Survival (20%)</strong>: her starting health, counted in every game. It counts up to half as much again against Killers and Locations that hit hard.</li>
          <li><strong>Ultimate (25%)</strong>: how many Victims she must save before her Ultimate (her card&rsquo;s save slots) <em>times</em> how good that Ultimate is, so a weak Ultimate unlocked after 4 saves still scores low. It counts up to half as much again where Victims are scarce or die quickly.</li>
        </ul>
        <p>A few special pairings add a bonus on top. Hover or tap a dot for the reason.</p>
      </div>

      {/* 1. Scores for a chosen combo */}
      <section className="fgx-section fg-panel">
        <h2 className="fgx-h">Scores for a scenario</h2>
        <div className="fgx-pickers">
          <label>
            Killer
            <select value={k} onChange={(e) => setK(e.target.value)}>
              {killers.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          </label>
          <label>
            Location
            <select value={l} onChange={(e) => setL(e.target.value)}>
              <option value="">(any)</option>
              {locations.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          </label>
        </div>
        {conf === 'estimate' && (
          <p className="fgx-note">Part of this scenario&rsquo;s profile is an estimate from the rules rather than proven strategy.</p>
        )}

        <h3 className="fgx-h3">What this scenario wants</h3>
        <ul className="fgx-needs">
          {needOrder.map((t) => (
            <li key={t.id}>
              <span className="fgx-needs__w">{needs[t.id].v.toFixed(1).replace('.0', '')}</span>
              <strong>{t.label}</strong>
              <span className="fgx-dim"> &mdash; {needs[t.id].reasons.join(' · ')}</span>
            </li>
          ))}
        </ul>

        <h3 className="fgx-h3">Every rated girl</h3>
        <ol className="fgx-rank">
          {ranked.map((r, i) => (
            <li key={r.fg.id} className="fgx-rank__row">
              <button type="button" className="fgx-rank__btn" onClick={() => setOpen(open === r.fg.id ? null : r.fg.id)}>
                <span className="fgx-rank__n">{i + 1}</span>
                <span className="fgx-rank__score">{r.fit.score}</span>
                <span className="fgx-rank__name">{r.fg.name}</span>
                <span className="fgx-dim fgx-rank__sum">
                  {r.fit.strengths.slice(0, 3).map((s) => s.label).join(', ') || 'no standout strengths'}
                </span>
              </button>
              {open === r.fg.id && (
                <div className="fgx-why">
                  <p className="fgx-dim fgx-small">
                    Scenario fit {(r.fit.parts.fit / 0.85 * 10).toFixed(1)} + survival {(r.fit.parts.survival / 0.85 * 10).toFixed(1)} ({r.fit.health.why}) + Ultimate {(r.fit.parts.ultimate / 0.85 * 10).toFixed(1)} ({r.fit.ultimate.saves == null ? 'own flip condition' : `${r.fit.ultimate.saves} save${r.fit.ultimate.saves === 1 ? '' : 's'}`}, power {r.fit.ultimate.power ?? '?'}/3){r.fit.specials.length ? ' + special bonus' : ''}
                  </p>
                  {r.fit.specials.map((s, j) => <p key={j} className="fgx-special">&#10024; {s.why}</p>)}
                  {r.fit.strengths.map((s) => <p key={s.trait}><b className="fgx-plus">+ {s.label}:</b> {s.girlWhy}</p>)}
                  {r.fit.gaps.map((g) => <p key={g.trait}><b className="fgx-minus">&minus; {g.label}:</b> {g.girlWhy || 'nothing to help'}</p>)}
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* 2. Girl × trait grid */}
      <section className="fgx-section fg-panel">
        <h2 className="fgx-h">Final Girl traits</h2>
        <p className="fgx-dim fgx-small">Gold columns are what the scenario above wants most. Health, Saves and Ult count in every scenario. Last column: score for that scenario.</p>
        <div className="fgx-scroll">
          <table className="fgx-table">
            <thead>
              <tr>
                <th className="fgx-rowhead">Final Girl</th>
                {girlTraits.map((t) => <th key={t.id} title={t.desc} className={hot[t.id] ? 'is-hot' : ''}>{t.short}</th>)}
                <th title="Starting health" className={hot.tank ? 'is-hot' : ''}>Health</th>
                <th title="Victims to save before her Ultimate (fewer = sooner)" className={hot.rescue ? 'is-hot' : ''}>Saves</th>
                <th title="How strong her Ultimate is once unlocked (0-3)" className={hot.rescue ? 'is-hot' : ''}>Ult</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {rated.map((g) => (
                <tr key={g.id}>
                  <th className="fgx-rowhead" title={g.film}>{g.name}</th>
                  {girlTraits.map((t) => {
                    const c = GIRL_TRAITS[g.id][t.id];
                    return <td key={t.id} className={hot[t.id] ? 'is-hot' : ''}><Pips v={c ? c.v : 0} title={c ? c.why : ''} /></td>;
                  })}
                  {(() => {
                    const st = FG_STATS[g.id];
                    if (!st) return <><td>—</td><td>—</td><td>—</td></>;
                    return (
                      <>
                        <td className={'fgx-num' + (hot.tank ? ' is-hot' : '')} title={`${st.h} health`}>{st.h}</td>
                        <td className={'fgx-num' + (hot.rescue ? ' is-hot' : '')} title={st.saves == null ? 'Flips on her own condition' : `Ultimate after ${st.saves} save${st.saves === 1 ? '' : 's'}`}>{st.saves ?? '*'}</td>
                        <td className={hot.rescue ? 'is-hot' : ''}><Pips v={st.ult ?? 0} title={st.ult == null ? 'Ultimate not known yet' : st.note} /></td>
                      </>
                    );
                  })()}
                  <td className="fgx-scorecell">{scoreOf[g.id] ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {unrated.length > 0 && (
          <p className="fgx-dim fgx-small">Not rated yet (card details or photos still missing): {unrated.map((g) => g.name).join(', ')}.</p>
        )}
      </section>

      {/* 3. Needs grids */}
      <section className="fgx-section fg-panel">
        <h2 className="fgx-h">What each Killer rewards</h2>
        <NeedsTable rows={killers} needs={KILLER_NEEDS} highlight={{}} />
      </section>
      <section className="fgx-section fg-panel">
        <h2 className="fgx-h">What each Location rewards</h2>
        <NeedsTable rows={locations} needs={LOCATION_NEEDS} highlight={{}} />
      </section>

      <section className="fgx-section fg-panel">
        <h2 className="fgx-h">Special pairings</h2>
        <ul className="fgx-needs">
          {SPECIALS.map((s, i) => {
            const g = finalGirls.find((x) => x.id === s.girl);
            const o = s.killer ? killers.find((x) => x.id === s.killer) : locations.find((x) => x.id === s.location);
            return <li key={i}><strong>{g?.name} + {o?.name}</strong> <span className="fgx-dim">(+{s.bonus}) &mdash; {s.why}</span></li>;
          })}
        </ul>
        <p className="fgx-dim fgx-small">All ratings live in <code>src/data/fgFit.js</code> and can be tuned as you play.</p>
      </section>
    </div>
  );
}
