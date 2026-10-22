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

  const ruleIconGroups = useMemo(() => getAllRulesetGroups(), []);

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

      {ruleIconGroups.length > 0 && (
        <div className="icon-ref__rules">
          <div className="icon-ref__rules-head">
            <h2 className="icon-ref__rules-title">Scenario rule icons</h2>
            <p className="fg-type">
              Symbols specific to a single Killer or Location&rsquo;s rules &mdash; pulled from
              the rule sheets. These also appear on the <strong>This Game</strong> tab for
              whatever you&rsquo;re playing.
            </p>
          </div>
          {ruleIconGroups.map((grp) => (
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
                      <img
                        className={'icon-ref__ruleimg' + (r.lowRes ? ' is-lowres' : '')}
                        src={r.src}
                        alt={r.label}
                        loading="lazy"
                      />
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
        </div>
      )}
    </div>
  );
}
