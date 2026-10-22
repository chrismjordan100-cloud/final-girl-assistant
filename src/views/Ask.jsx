import { useMemo, useState } from 'react';
import { searchRules, EXAMPLE_QUESTIONS } from '../data/rulesSearch.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { getKiller, getLocation } from '../data/games.js';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
import './Ask.css';

/* A single result passage. `badge` optionally flags scenario-specific hits. */
function HitItem({ r, badge }) {
  return (
    <li className={'ask-hit fg-panel ask-hit--' + r.kind + (badge ? ' ask-hit--flagged' : '')}>
      <div className="ask-hit__top">
        <span className="ask-hit__title">
          {r.title}
          {badge && <span className="ask-hit__badge">{badge}</span>}
        </span>
        <span className="ask-hit__source fg-type">
          {r.source}
          {r.page ? ` \u00b7 ${r.page}` : ''}
        </span>
      </div>
      <p className="ask-hit__body">{r.text}</p>
    </li>
  );
}

export default function Ask() {
  const { killerId, locationId } = useGameSelection();
  const killer = getKiller(killerId);
  const location = getLocation(locationId);

  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [scopeToGame, setScopeToGame] = useState(true);

  const results = useMemo(() => {
    if (!query.trim()) return null;
    return searchRules(query, {
      killerId,
      locationId,
      strict: scopeToGame,
      limit: 14,
    });
  }, [query, killerId, locationId, scopeToGame]);

  function ask(q) {
    const text = (q ?? input).trim();
    setInput(text);
    setQuery(text);
  }

  const hasGame = Boolean(killer || location);

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">What can I do?</p>
        <h1>Ask a Question</h1>
        <p className="lead">
          Ask in plain English and this searches everything the app knows &mdash; the core
          rules, icons, and every Killer, Location, tip and achievement &mdash; then shows the
          rule passages that answer it. Works offline; it finds the rules, you make the call.
        </p>
      </div>

      <form
        className="ask-bar"
        onSubmit={(e) => {
          e.preventDefault();
          ask();
        }}
      >
        <input
          className="ask-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Can I move through walls on the Hellscape?"
          aria-label="Your question"
          autoFocus
        />
        <button type="submit" className="fg-btn fg-btn--primary ask-go" disabled={!input.trim()}>
          Ask
        </button>
      </form>

      <div className="ask-controls">
        {hasGame ? (
          <label className="ask-scope">
            <input
              type="checkbox"
              checked={scopeToGame}
              onChange={(e) => setScopeToGame(e.target.checked)}
            />
            Tailor to my game
            <span className="ask-scope__game fg-type">
              ({[killer?.name, location?.name].filter(Boolean).join(' @ ') || 'none'})
            </span>
          </label>
        ) : (
          <span className="ask-scope fg-type">
            No game selected &mdash; searching all Killers and Locations. Pick a game (Setup or Codex) to tailor answers.
          </span>
        )}
        {hasGame && scopeToGame && (
          <p className="ask-scope__hint fg-type">
            Showing the general rules plus how {[killer?.name, location?.name].filter(Boolean).join(' and ')} change them &mdash; other scenarios&rsquo; rules are hidden.
          </p>
        )}
      </div>

      {!results && (
        <div className="ask-suggest">
          <p className="ask-suggest__title fg-type">Try one of these:</p>
          <div className="ask-suggest__chips">
            {EXAMPLE_QUESTIONS.map((q) => (
              <button key={q} className="ask-chip" onClick={() => ask(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {results && (
        <section className="ask-results">
          <div className="ask-results__head">
            <h2 className="ask-results__title">
              {results.all.length > 0
                ? `Found ${results.all.length} relevant ${results.all.length === 1 ? 'passage' : 'passages'}`
                : 'No matching rules found'}
            </h2>
            <span className="ask-results__q fg-type">for &ldquo;{query}&rdquo;</span>
          </div>

          {results.all.length === 0 ? (
            <div className="ask-empty fg-panel">
              <p>
                Nothing in the loaded rules matched that. Try different words (e.g. the
                official term &mdash; &ldquo;Bloodlust&rdquo;, &ldquo;Panic&rdquo;,
                &ldquo;Reaction&rdquo;), or check the full Rules Reference and Icon Reference tabs.
              </p>
            </div>
          ) : (
            <>
              {results.hasGame && results.scenario.length > 0 && (
                <CollapsibleSection
                  title="How your game changes this"
                  count={[killer?.name, location?.name].filter(Boolean).join(' @ ')}
                >
                  <ul className="ask-list">
                    {results.scenario.map((r, i) => (
                      <HitItem key={'s' + i} r={r} badge="Your scenario" />
                    ))}
                  </ul>
                </CollapsibleSection>
              )}

              {results.generic.length > 0 && (
                <CollapsibleSection
                  title={results.hasGame && results.scenario.length > 0 ? 'General rules' : 'Relevant rules'}
                  count={`${results.generic.length}`}
                >
                  <ul className="ask-list">
                    {results.generic.map((r, i) => (
                      <HitItem key={'g' + i} r={r} />
                    ))}
                  </ul>
                </CollapsibleSection>
              )}
            </>
          )}

          <p className="ask-disclaimer fg-type">
            These are the closest matches from the app&rsquo;s own rule data, ranked by
            relevance &mdash; not a verdict. When a Killer or Location rule here changes a
            general rule, the specific one wins. For anything fiddly, the printed rule
            sheets are the final word.
          </p>
        </section>
      )}
    </div>
  );
}
