import { useMemo, useState, useEffect } from 'react';
import { searchRules, EXAMPLE_QUESTIONS } from '../data/rulesSearch.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { getKiller, getLocation } from '../data/games.js';
import { askAI, getApiKey, setApiKey, getModel, setModel, hasApiKey } from '../lib/aiAnswer.js';
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

/* The API-key settings panel. Collapsed by default; the key lives only in this
   browser (localStorage), is never synced, and only leaves it in the call to
   Google. */
function AiSettings({ open, onClose, onKeyChange }) {
  const [key, setKey] = useState(getApiKey());
  const [model, setModelState] = useState(getModel());
  const [show, setShow] = useState(false);

  function save() {
    setApiKey(key);
    setModel(model);
    onKeyChange();
    onClose();
  }
  function clear() {
    setKey('');
    setApiKey('');
    onKeyChange();
  }
  if (!open) return null;
  return (
    <div className="ask-settings fg-panel">
      <h3 className="ask-settings__title">AI answers &mdash; your Google Gemini key</h3>
      <p className="ask-settings__blurb fg-type">
        Paste your own Google Gemini API key to get an interpreted answer on top of the rule
        search. The key is stored <strong>only in this browser</strong> on this device &mdash;
        it is never uploaded, committed or synced, and is only sent directly to Google when you
        ask. Each device needs its own key. See the help below for how to get a free key.
      </p>
      <label className="ask-settings__field">
        <span>API key</span>
        <span className="ask-settings__keyrow">
          <input
            type={show ? 'text' : 'password'}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="AIza..."
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className="fg-btn ask-settings__show" onClick={() => setShow((s) => !s)}>
            {show ? 'Hide' : 'Show'}
          </button>
        </span>
      </label>
      <label className="ask-settings__field">
        <span>Model</span>
        <input
          type="text"
          value={model}
          onChange={(e) => setModelState(e.target.value)}
          placeholder="gemini-3.8-flash"
          spellCheck={false}
        />
      </label>
      <div className="ask-settings__btns">
        <button type="button" className="fg-btn fg-btn--primary" onClick={save}>Save</button>
        <button type="button" className="fg-btn" onClick={onClose}>Cancel</button>
        {hasApiKey() && <button type="button" className="fg-btn ask-settings__clear" onClick={clear}>Remove key</button>}
      </div>

      <details className="ask-settings__help">
        <summary>How to get a free Gemini API key (step by step)</summary>
        <ol>
          <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">aistudio.google.com/app/apikey</a> and sign in with a Google account.</li>
          <li>Accept the terms if prompted.</li>
          <li>Click <strong>Create API key</strong> (choose &ldquo;Create API key in new project&rdquo; if asked).</li>
          <li>Copy the key it shows &mdash; it starts with <code>AIza</code>.</li>
          <li>Paste it into the <strong>API key</strong> box above and press <strong>Save</strong>.</li>
          <li>That&rsquo;s it. Gemini has a free tier that is plenty for occasional rules questions. You can delete or rotate the key any time back on that same page.</li>
        </ol>
        <p className="fg-type">
          The <strong>Model</strong> field defaults to a current Gemini Flash model. Google
          occasionally retires model names; if answers start failing with a &ldquo;model not
          found&rdquo; message, check <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer">AI Studio</a>{' '}
          for the current model name and paste it into that field.
        </p>
        <p className="fg-type">
          Keep the key private &mdash; treat it like a password. If you ever think it leaked,
          delete it on the Google page and paste a fresh one here.
        </p>
      </details>
    </div>
  );
}

export default function Ask() {
  const { killerId, locationId } = useGameSelection();
  const killer = getKiller(killerId);
  const location = getLocation(locationId);

  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [scopeToGame, setScopeToGame] = useState(true);

  // AI state
  const [keyPresent, setKeyPresent] = useState(hasApiKey());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return null;
    return searchRules(query, {
      killerId,
      locationId,
      strict: scopeToGame,
      limit: 14,
    });
  }, [query, killerId, locationId, scopeToGame]);

  // When a new question is asked (or scope changes), auto-run the AI answer if
  // a key is set. Offline search always runs regardless.
  useEffect(() => {
    setAiAnswer('');
    setAiError('');
    if (!query.trim() || !results || results.all.length === 0 || !keyPresent) return;
    const controller = new AbortController();
    setAiLoading(true);
    askAI(query, results, {
      killerName: killer?.name,
      locationName: location?.name,
      signal: controller.signal,
    })
      .then((text) => setAiAnswer(text))
      .catch((e) => {
        if (e.name === 'AbortError') return;
        setAiError(e.message === 'no-key' ? 'Add your API key in Settings to get AI answers.' : e.message);
      })
      .finally(() => setAiLoading(false));
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, results, keyPresent, scopeToGame]);

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
          Ask in plain English. With an AI key set, you get an interpreted answer up top; either
          way the matching rule passages are shown underneath so you can dig deeper. The search
          covers the core rules, icons, and every Killer, Location, tip and achievement.
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
        <button
          type="button"
          className="ask-settings-toggle"
          onClick={() => setSettingsOpen((o) => !o)}
          aria-expanded={settingsOpen}
        >
          {keyPresent ? '\u2699 AI settings' : '\u2728 Enable AI answers'}
        </button>
      </div>

      {hasGame && scopeToGame && (
        <p className="ask-scope__hint fg-type">
          Showing the general rules plus how {[killer?.name, location?.name].filter(Boolean).join(' and ')} change them &mdash; other scenarios&rsquo; rules are hidden.
        </p>
      )}

      <AiSettings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onKeyChange={() => setKeyPresent(hasApiKey())}
      />

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
          {!keyPresent && (
            <p className="ask-suggest__ai fg-type">
              Want a direct, interpreted answer instead of a list of passages?{' '}
              <button type="button" className="ask-link" onClick={() => setSettingsOpen(true)}>
                Enable AI answers
              </button>{' '}
              with a free Google Gemini key.
            </p>
          )}
        </div>
      )}

      {results && (
        <section className="ask-results">
          {/* AI interpreted answer (only when a key is set and there are passages) */}
          {keyPresent && results.all.length > 0 && (
            <div className="ask-ai fg-panel">
              <div className="ask-ai__head">
                <span className="ask-ai__badge">AI answer</span>
                <span className="ask-ai__model fg-type">{getModel()}</span>
              </div>
              {aiLoading && <p className="ask-ai__loading">Thinking through the rules&hellip;</p>}
              {aiError && (
                <p className="ask-ai__error">
                  {aiError}{' '}
                  <button type="button" className="ask-link" onClick={() => ask(query)}>Retry</button>
                </p>
              )}
              {!aiLoading && !aiError && aiAnswer && (
                <div className="ask-ai__body">
                  {aiAnswer.split(/\n{2,}/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
              <p className="ask-ai__disclaimer fg-type">
                Interpreted by AI from the passages below &mdash; not an official ruling. Numbers in
                brackets refer to those passages. Verify anything important against the rule sheet.
              </p>
            </div>
          )}

          <div className="ask-results__head">
            <h2 className="ask-results__title">
              {results.all.length > 0
                ? `${keyPresent ? 'Source passages \u00b7 ' : ''}${results.all.length} relevant ${results.all.length === 1 ? 'passage' : 'passages'}`
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
