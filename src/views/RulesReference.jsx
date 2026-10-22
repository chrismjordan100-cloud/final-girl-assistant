import { useMemo, useState } from 'react';
import { ruleSections, ruleTopics } from '../data/rules.js';
import './RulesReference.css';

// Path (served from /public) to the full core rulebook PDF.
const RULEBOOK_PDF = `${import.meta.env.BASE_URL}FinalGirl_Rules_Core.pdf`;

// Pick up the core-box cover if it has been added to src/assets, without
// breaking the build when it's absent. Supports png / jpg / jpeg / webp.
const coverModules = import.meta.glob(
  '../assets/core-box-cover.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' }
);
const coverSrc = Object.values(coverModules)[0] || null;

function matches(topic, q) {
  if (!q) return true;
  const hay = (
    topic.title + ' ' + topic.body + ' ' + topic.tags.join(' ')
  ).toLowerCase();
  return hay.includes(q);
}

function RuleTopic({ topic, open, onToggle }) {
  return (
    <article className="rule-topic fg-panel">
      <button
        className="rule-topic__head"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="rule-topic__titlewrap">
          <span className="rule-topic__title">{topic.title}</span>
          {topic.page && <span className="rule-topic__page">{topic.page}</span>}
        </span>
        <span className="rule-topic__toggle" aria-hidden="true">{open ? '\u2212' : '+'}</span>
      </button>
      {open && (
        <div className="rule-topic__body">
          <p>{topic.body}</p>
          <div className="cluster">
            {topic.tags.map((t) => (
              <span key={t} className="fg-tag">{t}</span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default function RulesReference() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  // Search results: flat, in book order.
  const searchResults = useMemo(
    () => (searching ? ruleTopics.filter((t) => matches(t, q)) : []),
    [q, searching]
  );

  function toggle(id) {
    setOpenId((cur) => (cur === id ? null : id));
  }

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">When the table needs a ruling</p>
        <h1>Rules Reference</h1>
        <p className="lead">
          Browse the core rules in the same order as the rulebook, or search by
          keyword. Each entry notes its rulebook page. Summaries are paraphrased from
          the core rulebook.
        </p>
      </div>

      <a
        className="rulebook-link fg-panel"
        href={RULEBOOK_PDF}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="rulebook-link__cover">
          {coverSrc ? (
            <img src={coverSrc} alt="Final Girl core box cover" />
          ) : (
            <span className="rulebook-link__cover-fallback" aria-hidden="true">PDF</span>
          )}
        </span>
        <span className="rulebook-link__text">
          <span className="rulebook-link__kicker">The full rulebook</span>
          <span className="rulebook-link__title">Open the Core Rules (PDF)</span>
          <span className="rulebook-link__desc">
            Opens the complete core rulebook in a new tab for when the summaries
            aren&rsquo;t enough.
          </span>
        </span>
        <span className="rulebook-link__arrow" aria-hidden="true">&#8599;</span>
      </a>

      <p className="rules-authority callout callout--note">
        These are condensed summaries for quick recall. For any edge case, tricky timing,
        or exact wording, the full rulebook (PDF above) is the authority.
      </p>

      <div className="rules-search">
        <span className="rules-search__icon" aria-hidden="true">&#128269;</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search rules (e.g. bloodlust, reaction, time)..."
          aria-label="Search rules"
        />
        {query && (
          <button className="rules-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
            &times;
          </button>
        )}
      </div>

      {searching ? (
        <>
          <div className="rules-count fg-type">
            {searchResults.length} of {ruleTopics.length} topics match
          </div>
          <div className="stack rules-list">
            {searchResults.length === 0 && (
              <p className="rules-empty fg-panel">
                No rules match &ldquo;{query}&rdquo;. Try another term.
              </p>
            )}
            {searchResults.map((topic) => (
              <RuleTopic
                key={topic.id}
                topic={topic}
                open={openId === topic.id}
                onToggle={() => toggle(topic.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="stack rules-sections">
          {ruleSections.map((section) => (
            <section key={section.id} className="rule-section">
              <h2 className="rule-section__title">{section.title}</h2>
              <div className="stack rules-list">
                {section.topics.map((topic) => (
                  <RuleTopic
                    key={topic.id}
                    topic={topic}
                    open={openId === topic.id}
                    onToggle={() => toggle(topic.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

    </div>
  );
}
