import { useMemo } from 'react';
import { iconReference } from '../data/rules.js';
import { getAllRulesetGroups } from '../data/games.js';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
import './IconReference.css';

// Official icon-reference image, if provided. Falls back to the text version.
const iconRefModules = import.meta.glob(
  '../assets/icon-reference.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' }
);
const iconRefSrc = Object.values(iconRefModules)[0] || null;

export default function IconReference() {
  const iconGroups = useMemo(() => {
    const groups = {};
    for (const icon of iconReference) {
      (groups[icon.group] ||= []).push(icon);
    }
    return Object.entries(groups);
  }, []);

  // Rule-icon ruleset groups, further grouped by series so each season's icons
  // sit together. Driven entirely by the `series` field in the JSON so future
  // series drop in with no code change.
  const ruleIconSeries = useMemo(() => {
    const groups = getAllRulesetGroups();
    const bySeries = new Map();
    for (const grp of groups) {
      const key = grp.series || 'other';
      if (!bySeries.has(key)) bySeries.set(key, []);
      bySeries.get(key).push(grp);
    }
    const order = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
    const seriesLabel = {
      S0: 'Special Features',
      S1: 'Series 1',
      S2: 'Series 2',
      S3: 'Series 3',
      S4: 'Series 4',
      S5: 'Series 5',
      S6: 'Series 6',
    };
    return [...bySeries.keys()]
      .sort((a, b) => {
        const ia = order.indexOf(a);
        const ib = order.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || String(a).localeCompare(b);
      })
      .map((key) => ({
        series: key,
        label: seriesLabel[key] || key,
        groups: bySeries.get(key),
        iconCount: bySeries.get(key).reduce((n, g) => n + g.items.length, 0),
      }));
  }, []);
  const hasRuleIcons = ruleIconSeries.length > 0;

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">Decode any card</p>
        <h1>Icon Reference</h1>
        <p className="lead">
          Every symbol that appears on the Action, Terror, Finale, Item and Event
          cards, in one place.
        </p>
      </div>

      {iconRefSrc ? (
        <figure className="icon-ref__figure fg-panel">
          <img
            className="icon-ref__image"
            src={iconRefSrc}
            alt="Final Girl icon reference chart"
          />
        </figure>
      ) : (
        <div className="icon-ref__groups">
          {iconGroups.map(([group, icons]) => (
            <CollapsibleSection key={group} title={group} count={`${icons.length}`}>
              <ul className="icon-ref__list">
                {icons.map((icon) => (
                  <li key={icon.label} className="icon-ref__item">
                    <span className="icon-ref__glyph" aria-hidden="true">{icon.glyph}</span>
                    <span className="icon-ref__label">{icon.label}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          ))}
        </div>
      )}

      {hasRuleIcons && (
        <div className="icon-ref__rules">
          <div className="icon-ref__rules-head">
            <h2 className="icon-ref__rules-title">Scenario rule icons</h2>
            <p className="fg-type">
              Symbols specific to a single Killer or Location&rsquo;s rules &mdash; pulled from
              the rule sheets, grouped by series. These also appear on the{' '}
              <strong>This Game</strong> tab for whatever you&rsquo;re playing. A{' '}
              <span className="icon-ref__lowres-key">low-res</span> badge marks icons printed
              very small on the sheet, so they look soft when enlarged.
            </p>
          </div>
          {ruleIconSeries.map((srs) => (
            <section key={srs.series} className="icon-ref__series">
              <h3 className="icon-ref__series-title">
                {srs.label}
                <span className="icon-ref__series-count fg-type">
                  {srs.iconCount} icon{srs.iconCount === 1 ? '' : 's'}
                </span>
              </h3>
              {srs.groups.map((grp) => (
                <CollapsibleSection
                  key={grp.ruleset}
                  title={grp.name}
                  count={grp.items.length > 0 ? `${grp.items.length}` : 'core icons only'}
                  defaultOpen={false}
                >
                  {grp.items.length > 0 ? (
                    <ul className="icon-ref__rulelist">
                      {grp.items.map((r) => (
                        <li key={r.id} className="icon-ref__ruleitem">
                          <div className="icon-ref__ruleimgwrap">
                            <img
                              className={'icon-ref__ruleimg' + (r.lowRes ? ' is-lowres' : '')}
                              src={r.src}
                              alt={r.label}
                              loading="lazy"
                            />
                            {r.lowRes && (
                              <span className="icon-ref__lowres-badge" title="Printed small on the sheet; looks soft enlarged.">
                                low-res
                              </span>
                            )}
                          </div>
                          <div className="icon-ref__ruletext">
                            <span className="icon-ref__rulelabel">{r.label}</span>
                            <span className="icon-ref__ruledesc fg-type">{r.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="icon-ref__rulenote fg-type">
                      {grp.note || 'No special icons \u2014 this one uses the core icons only.'}
                    </p>
                  )}
                </CollapsibleSection>
              ))}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
