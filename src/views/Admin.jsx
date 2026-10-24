import { useMemo, useState } from 'react';
import {
  killers,
  locations,
  finalGirls,
  ASSETS_FOLDER,
  hasImageBaseName,
  getPageImages,
  getIcon,
  getScenarioAssetList,
  hasWrittenRules,
  noWrittenRulesExpected,
} from '../data/games.js';
import BACKLOG_AUTO from '../data/backlogAuto.json';
import './Admin.css';

/* One marker per asset TYPE for an entry (not per page). */
function assetTypesFor(type, entry) {
  const prefix = `S${entry.season}-${type}-${entry.shortName}`;

  if (type === 'finalgirl') {
    return [
      { key: 'front', label: 'Card front', example: `${prefix}-front.png`, present: hasImageBaseName(`${prefix}-front`) },
      { key: 'back', label: 'Card back', example: `${prefix}-back.png`, present: hasImageBaseName(`${prefix}-back`) },
    ];
  }

  // killer / location
  return [
    { key: 'icon', label: 'Icon', example: `${prefix}-icon.png`, present: Boolean(getIcon(type, entry)) },
    { key: 'art', label: 'Key art', example: `${prefix}-art.png`, present: hasImageBaseName(`${prefix}-art`) },
    { key: 'flavour', label: 'Flavour text', example: `${prefix}-flavour.png`, present: hasImageBaseName(`${prefix}-flavour`) },
    { key: 'rules', label: 'Rules pages', example: `${prefix}-1.png (+ -2, -3, …)`, present: getPageImages(type, entry).length > 0 },
  ];
}

function entryStatus(type, entry) {
  const types = assetTypesFor(type, entry);
  const present = types.filter((t) => t.present).length;
  return { types, present, total: types.length, complete: present === types.length };
}

function EntryCard({ type, entry }) {
  const { types, present, total, complete } = entryStatus(type, entry);

  // Rule-sheet images present but the WRITTEN rules haven't been transcribed by
  // Kiro yet (Killers/Locations only — Final Girls have no written rules).
  const rulesImagesPresent = type !== 'finalgirl' && getPageImages(type, entry).length > 0;
  const needsTranscription =
    type !== 'finalgirl' &&
    rulesImagesPresent &&
    !hasWrittenRules(entry) &&
    !noWrittenRulesExpected.has(entry.id);

  return (
    <article className={'admin-entry fg-panel' + (complete ? ' is-complete' : '')}>
      <header className="admin-entry__head">
        <h3 className="admin-entry__name">{entry.name}</h3>
        <span className="admin-entry__meta">{entry.film} &middot; S{entry.season}</span>
        <span className={'admin-entry__count' + (complete ? ' is-complete' : '')}>
          {complete ? 'Complete' : `${present}/${total}`}
        </span>
      </header>
      {entry.note && <p className="admin-entry__note fg-type">&#9888; {entry.note}</p>}
      {needsTranscription && (
        <p className="admin-entry__transcribe">
          &#9888; Rule-sheet images are in, but the written rules aren&rsquo;t in the app
          yet. Ask Kiro: &ldquo;read and add the special rules for {entry.name}.&rdquo;
        </p>
      )}
      <ul className="admin-asset-list">
        {types.map((t) => (
          <li key={t.key} className={'admin-asset' + (t.present ? ' is-present' : '')}>
            <span className={'admin-asset__status ' + (t.present ? 'is-ok' : 'is-missing')}>
              {t.present ? '\u2713' : '\u2715'}
            </span>
            <span className="admin-asset__label">{t.label}</span>
            <code className="admin-asset__file">{t.example}</code>
          </li>
        ))}
      </ul>
    </article>
  );
}

const SECTIONS = [
  { type: 'finalgirl', title: 'Final Girls', entries: finalGirls },
  { type: 'killer', title: 'Killers', entries: killers },
  { type: 'location', title: 'Locations', entries: locations },
];

/* Running backlog of material still to scan / transcribe with Kiro. Add to
   this list as new ideas come up so nothing gets forgotten. */
const BACKLOG = [
  // status: 'done' (green) | 'partial' (amber) | 'todo' (red).
  // `remaining` is shown ONLY for 'partial' items — what's left to finish.
  // Keep this RAG + remaining notes current as the app grows.
  {
    title: 'Tips: strategy database with sources per combination',
    detail:
      'A Tips tab with general strategy plus per-Killer and per-Location advice, surfaced for the current selection and searchable via Ask. Built from the Strategy Tips Handbook, each tip carrying its source and a confirmed/reported confidence tag.',
    affects: ['Tips', 'Ask', 'This Game'],
    status: 'done',
  },
  {
    title: 'Codex: browse Killers, Locations & Final Girls',
    detail:
      'A Codex tab to scan art, flavour and at-a-glance rules for every Killer and Location, and both ability faces of every Final Girl, with "Play this" to jump into Setup. Collapsible by season/group.',
    affects: ['Codex', 'Setup Assist'],
    status: 'done',
  },
  {
    title: 'Ask a Question: offline rules search',
    detail:
      'A plain-English rules search over all loaded data (core rules, icons, setup, play rules, phase steps, tips), tailored to the current combination — general rules plus how your Killer/Location change them. Achievements excluded by design.',
    affects: ['Ask'],
    status: 'done',
  },
  {
    title: 'Debrief: post-match mistake tracking & trends',
    detail:
      'Log rules/strategy mistakes at end of game; the Debrief tab groups recurring ones and surfaces reminders before you play that combo again.',
    affects: ['This Game', 'Debrief', 'Game Log'],
    status: 'done',
  },
  {
    title: 'Vignettes: verify Destiny rules/achievements + build all three',
    detail:
      'All three vignettes (Terror From Above / the Birds, Terror From the Grave / the Zombies, Terror From Destiny / Destiny) are built as killer-only entries selectable from the Killer list, with setup, play rules, phase extras, tips and achievements. Destiny\u2019s full rules and its official achievement list were transcribed from the rule sheet and verified.',
    affects: ['Setup Assist', 'This Game', 'Turn Tracker', 'Achievements', 'Asset Admin'],
    status: 'done',
  },
  {
    title: 'Auto-track achievements from wins (incl. vignettes)',
    detail:
      'Win-based achievements (win here, defeat here, five different Locations/Killers) auto-detect from the Game Log, with live progress counts and manual overrides. Vignette "five Locations" achievements auto-track too.',
    affects: ['Achievements', 'MI'],
    status: 'done',
  },
  {
    title: 'Make the full Feature Film Rules PDFs viewable in-app',
    detail:
      'Serve the full-season special-rules PDFs from public/ and add "Open the Feature Film Rules (PDF)" links, mirroring the Core Rules PDF link on Rules Reference.',
    affects: ['This Game', 'Rules Reference'],
    status: 'partial',
    remaining:
      'PDFs are present in public/ (FeatureFilmRules.pdf, _S2, _S3), but no in-app link/viewer is wired up yet. Add links on Rules Reference (and ideally per-season). S4 PDF still to source.',
  },
  {
    title: 'Official scenarios: Series 2-4, specials, vignettes & cross-combos',
    detail:
      'Canon Killer+Location pairings and names in OFFICIAL_SCENARIOS, with vignettes correctly treated as "no official pairing".',
    affects: ['This Game', 'Scenarios'],
    status: 'partial',
    remaining:
      'Series 1-3 pairings + names are wired, and vignettes are handled. Still to add: Series 4 pairings (needs the S4 Killers/Locations added first), the Special Features (Krampus @ Santa\u2019s Village, Mort @ Mega Boardgame Convention), and the Lore-book cross-combo scenario titles (up to 25 per series) which need the books.',
  },
  {
    title: 'Add achievements with each new rules import',
    detail:
      'Every new season/vignette brings its own achievement lists; transcribe them so the end-of-game tickboxes and Achievements tab stay complete.',
    affects: ['This Game', 'Achievements'],
    status: 'partial',
    remaining:
      'Series 1-3 and all three vignettes are fully transcribed. Ongoing: add Series 4 achievements (and any Special Features / promos) when those Killers/Locations are added to the app.',
  },
  {
    title: 'Bespoke Final Girl narration lines',
    detail:
      'Custom spooky Start Game lines per Final Girl, instead of the generic fallback.',
    affects: ['Start Game audio'],
    status: 'partial',
    remaining:
      'Only Laurie, Reiko and Selena have bespoke lines so far; every other Final Girl (Series 1-4, vignettes, specials, promos) still uses the generic fallback. Write lines for the rest.',
  },
  {
    title: 'Lore & scenario books (per season)',
    detail:
      'Each season\u2019s lore/scenario book has richer flavour for Locations, Killers and Final Girls than the rule-sheet flavour. Scanning these could deepen This Game text and Start Game narration.',
    affects: ['This Game', 'Start Game audio'],
    status: 'todo',
  },
  {
    title: 'Gruesome Deaths section',
    detail:
      'The books include a gruesome-deaths section — flavour for when a Victim or the Final Girl dies. Could drive an optional "death flavour" readout or audio sting during play.',
    affects: ['This Game', 'Audio', 'Turn Tracker (future)'],
    status: 'todo',
  },
  {
    title: 'Use the full as-written flavour (not paraphrases)',
    detail:
      'Prefer the complete original flavour text over paraphrased narration snippets. Cleanest route is likely the scanned flavour images already shown in This Game — decide the mechanism (copyright) when we pick this up.',
    affects: ['This Game', 'Start Game audio'],
    status: 'todo',
  },
  {
    title: 'Scan win conditions per Killer / Location',
    detail:
      'Each Killer/Location can have different victory conditions (e.g. Poltergeist is won by saving Carolyn). Capture these so the end-of-game record (and maybe in-game tracking) reflects condition-specific outcomes rather than just Won/Lost.',
    affects: ['Game Log', 'Turn Tracker (future)'],
    status: 'todo',
  },
  {
    title: 'Host on phone / iPad (iOS companion)',
    detail:
      'An iPhone/iPad version is the real goal — that\u2019s where the game is played. Options: deploy the built site and use it as an offline PWA (add-to-home-screen), or wrap it. Needs a build/deploy step with images/data travelling along.',
    affects: ['Whole app', 'Hosting'],
    status: 'todo',
  },
  {
    title: 'Set up ElevenLabs for cinematic Start Game audio',
    detail:
      'Replace the robotic browser speech with ElevenLabs TTS. Recommended: pre-generate an .mp3 per narration snippet once and play the files (cinematic, no runtime key, offline). Alternative: live API calls (needs key in app, per-play cost, internet).',
    affects: ['Start Game audio'],
    status: 'todo',
  },
  {
    title: 'Scenario rule icons — add the rest as they\u2019re pulled',
    detail:
      'Scenario-specific rule icons live in src/assets/icons/rules/ with metadata in rule-icons.json. They show in the Icon Reference (Scenario rule icons) and on This Game for the chosen combo. Series 1-3 + vignettes are in; keep extracting any still-missing symbols from the rule sheets and drop them in the folder (filename = the id, add a matching rule-icons.json entry).',
    affects: ['Icon Reference', 'This Game'],
    status: 'partial',
    remaining:
      'Add any remaining per-ruleset symbols you still want (some rule sheets have more icons than are extracted). A few current ones are flagged low-res in the JSON and could be re-captured at higher resolution.',
  },
  {
    title: 'Series 4 icons — add with the S4 import',
    detail:
      'When Series 4 is added, remember the icon assets too: (a) the main Killer/Location emblems in src/assets/icons/ named S4-killer-{id}-icon.png / S4-location-{id}-icon.png; and (b) any S4 scenario rule icons in src/assets/icons/rules/ with rule-icons.json entries. Without these the S4 entries show no icons in Codex, This Game, Scenarios, Tips and the pickers.',
    affects: ['Codex', 'This Game', 'Scenarios', 'Icon Reference', 'Asset Admin'],
    status: 'todo',
  },
];

/* The full backlog shown on this screen = the hand-kept list above PLUS the
   feature items from BACKLOG.md. Those come from src/data/backlogAuto.json,
   which scripts/update-backlog.mjs regenerates (with RAG checked against the
   code) on every build — edit the script, not the JSON. */
const ALL_BACKLOG = [...BACKLOG, ...BACKLOG_AUTO];

const STATUS_META = {
  done: { label: 'Done', cls: 'done' },
  partial: { label: 'In progress', cls: 'partial' },
  todo: { label: 'Not started', cls: 'todo' },
};

export default function Admin() {
  const [query, setQuery] = useState('');
  const [onlyMissing, setOnlyMissing] = useState(false);
  // Collapsed state per section. Default: all expanded.
  const [collapsed, setCollapsed] = useState({});

  const q = query.trim().toLowerCase();

  const sections = useMemo(() => {
    return SECTIONS.map((section) => {
      let entries = section.entries;
      if (q) {
        entries = entries.filter((e) =>
          (e.name + ' ' + e.film + ' ' + e.shortName).toLowerCase().includes(q)
        );
      }
      if (onlyMissing) {
        entries = entries.filter((e) => !entryStatus(section.type, e).complete);
      }
      // Section-level completeness (over the FULL set, not the filtered view).
      const done = section.entries.filter((e) => entryStatus(section.type, e).complete).length;

      // Group the (filtered) entries by season, ascending.
      const bySeason = {};
      for (const e of entries) {
        (bySeason[e.season] ||= []).push(e);
      }
      const seasons = Object.keys(bySeason)
        .map(Number)
        .sort((a, b) => a - b)
        .map((season) => {
          const seasonEntries = bySeason[season];
          const seasonDone = seasonEntries.filter((e) => entryStatus(section.type, e).complete).length;
          return { season, entries: seasonEntries, done: seasonDone };
        });

      return { ...section, entries, seasons, done, totalEntries: section.entries.length };
    });
  }, [q, onlyMissing]);

  function toggleSection(type) {
    setCollapsed((c) => ({ ...c, [type]: !c[type] }));
  }

  // RAG tally for the backlog header.
  const backlogCounts = useMemo(() => {
    const c = { done: 0, partial: 0, todo: 0 };
    for (const item of ALL_BACKLOG) c[item.status || 'todo'] += 1;
    return c;
  }, []);

  // Scenario title graphics (official pairings + vignettes), filtered like
  // the rest of the admin view.
  const scenarioAssets = useMemo(() => {
    let list = getScenarioAssetList();
    if (q) list = list.filter((s) => (s.label + ' ' + s.sub + ' ' + s.file).toLowerCase().includes(q));
    if (onlyMissing) list = list.filter((s) => !s.present);
    return list;
  }, [q, onlyMissing]);
  const scenarioDone = useMemo(
    () => getScenarioAssetList().filter((s) => s.present).length,
    []
  );
  const scenarioTotal = useMemo(() => getScenarioAssetList().length, []);

  // Overall asset readiness across every slot we track (art/flavour/rules for
  // killers & locations; front/back for final girls). Motivating %.
  const readiness = useMemo(() => {
    const perSection = SECTIONS.map((section) => {
      let present = 0;
      let total = 0;
      for (const entry of section.entries) {
        const s = entryStatus(section.type, entry);
        present += s.present;
        total += s.total;
      }
      return { title: section.title, present, total, pct: total ? Math.round((present / total) * 100) : 0 };
    });
    const present = perSection.reduce((n, s) => n + s.present, 0);
    const total = perSection.reduce((n, s) => n + s.total, 0);
    return { perSection, present, total, pct: total ? Math.round((present / total) * 100) : 0 };
  }, []);

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">Behind the screen</p>
        <h1>Asset Admin</h1>
        <p className="lead">
          A live checklist of every image the app expects, cross-referenced against what
          is actually in the folder. Green tick = added; red cross = still missing.
        </p>
      </div>

      <div className="admin-readiness fg-panel">
        <div className="admin-readiness__top">
          <span className="admin-readiness__pct">{readiness.pct}%</span>
          <div className="admin-readiness__label">
            <strong>Assets ready</strong>
            <span className="fg-type">{readiness.present} of {readiness.total} image slots filled</span>
          </div>
        </div>
        <div className="admin-readiness__bar">
          <div className="admin-readiness__fill" style={{ width: `${readiness.pct}%` }} />
        </div>
        <div className="admin-readiness__breakdown">
          {readiness.perSection.map((s) => (
            <span key={s.title} className="admin-readiness__chip">
              {s.title}: <strong>{s.pct}%</strong>
              <span className="fg-type"> ({s.present}/{s.total})</span>
            </span>
          ))}
        </div>
      </div>

      <div className="admin-howto fg-panel">
        <button
          className="admin-panel-toggle"
          onClick={() => toggleSection('howto')}
          aria-expanded={!collapsed.howto}
        >
          <span className="admin-panel-toggle__caret" aria-hidden="true">
            {collapsed.howto ? '\u25B6' : '\u25BC'}
          </span>
          <h2 className="admin-howto__title">How to add an asset</h2>
        </button>

        {!collapsed.howto && (
        <div className="admin-howto__body">
        <div className="admin-twostep">
          <div className="admin-twostep__item">
            <span className="admin-twostep__num">1</span>
            <div>
              <h3>Images &mdash; just add the file</h3>
              <p>
                Art, flavour, card faces and rule-sheet pages all display automatically.
                Drop the PNG in the folder with the right name and refresh — no step back
                in Kiro needed.
              </p>
            </div>
          </div>
          <div className="admin-twostep__item">
            <span className="admin-twostep__num">2</span>
            <div>
              <h3>Written rules &mdash; ask Kiro</h3>
              <p>
                The special <strong>setup steps</strong> and <strong>play-rules
                summaries</strong> are text Kiro writes by reading the rulebook. The app
                can&rsquo;t read a rule-sheet image. For a <em>new</em> Killer or Location,
                add the images <em>and</em> tell Kiro:{' '}
                <em>&ldquo;read and add the special rules for [name].&rdquo;</em> Season 1
                is already done.
              </p>
            </div>
          </div>
        </div>

        <h3 className="admin-howto__sub">Adding image files</h3>
        <ol className="admin-steps">
          <li>
            Save your PNG into this folder (relative to the project root):
            <span className="admin-folder"><code>{ASSETS_FOLDER}</code></span>
          </li>
          <li>Name it using the convention for its type (below). Names are lower-case and must match exactly.</li>
          <li>Refresh the page — new images are picked up automatically (no server restart needed).</li>
          <li>Come back here: the item&rsquo;s marker turns from a red cross to a green tick.</li>
        </ol>

        <div className="admin-naming">
          <div className="admin-naming__type">
            <h3>Final Girl</h3>
            <ul>
              <li><code>S&#123;season&#125;-finalgirl-&#123;shortName&#125;-front.png</code></li>
              <li><code>S&#123;season&#125;-finalgirl-&#123;shortName&#125;-back.png</code></li>
            </ul>
          </div>
          <div className="admin-naming__type">
            <h3>Killer</h3>
            <ul>
              <li><code>S&#123;season&#125;-killer-&#123;shortName&#125;-art.png</code></li>
              <li><code>S&#123;season&#125;-killer-&#123;shortName&#125;-flavour.png</code></li>
              <li><code>S&#123;season&#125;-killer-&#123;shortName&#125;-1.png</code>, <code>-2.png</code>, &hellip; (rules pages)</li>
              <li><code>S&#123;season&#125;-killer-&#123;shortName&#125;-icon.png</code> &mdash; in the <code>icons/</code> folder</li>
            </ul>
          </div>
          <div className="admin-naming__type">
            <h3>Location</h3>
            <ul>
              <li><code>S&#123;season&#125;-location-&#123;shortName&#125;-art.png</code></li>
              <li><code>S&#123;season&#125;-location-&#123;shortName&#125;-flavour.png</code></li>
              <li><code>S&#123;season&#125;-location-&#123;shortName&#125;-1.png</code>, <code>-2.png</code>, &hellip; (rules pages)</li>
              <li><code>S&#123;season&#125;-location-&#123;shortName&#125;-icon.png</code> &mdash; in the <code>icons/</code> folder</li>
            </ul>
          </div>
          <div className="admin-naming__type">
            <h3>Scenario graphic</h3>
            <ul>
              <li>Official: <code>S&#123;killerSeason&#125;-scenario-&#123;killerShortName&#125;-&#123;locationShortName&#125;.png</code></li>
              <li>Vignette: <code>S&#123;season&#125;-scenario-&#123;vignetteShortName&#125;.png</code></li>
            </ul>
          </div>
        </div>
        <p className="fg-type admin-restart-note">
          Icons live in <code>src/assets/icons/</code> (not the games folder) and show
          throughout the app &mdash; Codex, This Game, Scenarios and Tips.
        </p>
        <p className="fg-type admin-restart-note">
          The &ldquo;Rules pages&rdquo; marker is a single check for the whole set — it
          goes green once at least one numbered page is present. Number pages
          contiguously from 1. If a page doesn&rsquo;t appear after a refresh, give it a
          second (the file watcher polls) or reload once more.
        </p>
        </div>
        )}
      </div>

      <div className="admin-backlog fg-panel">
        <button
          className="admin-panel-toggle"
          onClick={() => toggleSection('backlog')}
          aria-expanded={!collapsed.backlog}
        >
          <span className="admin-panel-toggle__caret" aria-hidden="true">
            {collapsed.backlog ? '\u25B6' : '\u25BC'}
          </span>
          <h2 className="admin-backlog__title">
            Backlog &mdash; progress
            <span className="admin-backlog__rag">
              <span className="admin-rag admin-rag--done">{backlogCounts.done} done</span>
              <span className="admin-rag admin-rag--partial">{backlogCounts.partial} in progress</span>
              <span className="admin-rag admin-rag--todo">{backlogCounts.todo} not started</span>
            </span>
          </h2>
        </button>

        {!collapsed.backlog && (
        <div className="admin-backlog__body">
        <p className="admin-backlog__intro fg-type">
          Where each planned feature stands. Green = done, amber = in progress (with
          what&rsquo;s left), red = not started. Items tagged <em>Auto-tracked</em> come
          from BACKLOG.md and have their status checked against the code on every build.
        </p>
        <ul className="admin-backlog__list">
          {ALL_BACKLOG.map((item) => {
            const meta = STATUS_META[item.status] || STATUS_META.todo;
            return (
              <li key={item.title} className={'admin-backlog__item admin-backlog__item--' + meta.cls}>
                <h3 className="admin-backlog__item-title">
                  <span className={'admin-rag-dot admin-rag-dot--' + meta.cls} aria-hidden="true" />
                  {item.title}
                  <span className={'admin-rag admin-rag--' + meta.cls}>{meta.label}</span>
                </h3>
                <p className="admin-backlog__item-detail">{item.detail}</p>
                {item.status === 'partial' && item.remaining && (
                  <p className="admin-backlog__remaining">
                    <strong>Still to do:</strong> {item.remaining}
                  </p>
                )}
                <div className="admin-backlog__affects">
                  {item.affects.map((a) => (
                    <span key={a} className="fg-tag">{a}</span>
                  ))}
                  {item.auto && <span className="fg-tag admin-backlog__auto">Auto-tracked</span>}
                </div>
              </li>
            );
          })}
        </ul>
        </div>
        )}
      </div>

      <div className="admin-controls">
        <div className="admin-search">
          <span className="admin-search__icon" aria-hidden="true">&#128269;</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name, film or short name..."
            aria-label="Filter assets"
          />
          {query && (
            <button className="admin-search__clear" onClick={() => setQuery('')} aria-label="Clear filter">
              &times;
            </button>
          )}
        </div>
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={onlyMissing}
            onChange={(e) => setOnlyMissing(e.target.checked)}
          />
          Only show items with missing assets
        </label>
      </div>

      {sections.map((section) => {
        const isCollapsed = !!collapsed[section.type];
        const sectionComplete = section.done === section.totalEntries;
        return (
          <section key={section.type} className="admin-section">
            <button
              className="admin-section__title"
              onClick={() => toggleSection(section.type)}
              aria-expanded={!isCollapsed}
            >
              <span className="admin-section__caret" aria-hidden="true">
                {isCollapsed ? '\u25B6' : '\u25BC'}
              </span>
              {section.title}
              <span
                className={'admin-section__count' + (sectionComplete ? ' is-complete' : '')}
              >
                {section.done}/{section.totalEntries} complete
              </span>
            </button>

            {!isCollapsed && (
              section.entries.length === 0 ? (
                <p className="admin-empty fg-type">Nothing matches the current filter.</p>
              ) : (
                section.seasons.map((grp) => {
                  const seasonKey = `${section.type}-s${grp.season}`;
                  const seasonCollapsed = !!collapsed[seasonKey];
                  const seasonComplete = grp.done === grp.entries.length;
                  return (
                    <div key={seasonKey} className="admin-season">
                      <button
                        className="admin-season__title"
                        onClick={() => toggleSection(seasonKey)}
                        aria-expanded={!seasonCollapsed}
                      >
                        <span className="admin-season__caret" aria-hidden="true">
                          {seasonCollapsed ? '\u25B6' : '\u25BC'}
                        </span>
                        Season {grp.season}
                        <span
                          className={'admin-season__count' + (seasonComplete ? ' is-complete' : '')}
                        >
                          {grp.done}/{grp.entries.length} complete
                        </span>
                      </button>
                      {!seasonCollapsed && (
                        <div className="admin-grid">
                          {grp.entries.map((entry) => (
                            <EntryCard key={entry.id} type={section.type} entry={entry} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )
            )}
          </section>
        );
      })}

      <section className="admin-section">
        <button
          className="admin-section__title"
          onClick={() => toggleSection('scenario-graphics')}
          aria-expanded={!collapsed['scenario-graphics']}
        >
          <span className="admin-section__caret" aria-hidden="true">
            {collapsed['scenario-graphics'] ? '\u25B6' : '\u25BC'}
          </span>
          Scenario graphics
          <span className={'admin-section__count' + (scenarioDone === scenarioTotal ? ' is-complete' : '')}>
            {scenarioDone}/{scenarioTotal} complete
          </span>
        </button>
        {!collapsed['scenario-graphics'] && (
          <>
            <p className="admin-empty fg-type" style={{ marginBottom: '0.8rem' }}>
              The big title image shown at the top of This Game for an official
              Killer+Location scenario or a vignette. Drop the PNG in{' '}
              <code>{ASSETS_FOLDER}</code> with the filename shown.
            </p>
            {scenarioAssets.length === 0 ? (
              <p className="admin-empty fg-type">Nothing matches the current filter.</p>
            ) : (
              <div className="admin-grid">
                {scenarioAssets.map((s) => (
                  <article key={s.key} className={'admin-entry fg-panel' + (s.present ? ' is-complete' : '')}>
                    <header className="admin-entry__head">
                      <h3 className="admin-entry__name">{s.label}</h3>
                      <span className="admin-entry__meta">
                        {s.sub} &middot; {s.kind === 'vignette' ? 'Vignette' : `S${s.season}`}
                      </span>
                      <span className={'admin-entry__count' + (s.present ? ' is-complete' : '')}>
                        {s.present ? 'Added' : 'Missing'}
                      </span>
                    </header>
                    <ul className="admin-asset-list">
                      <li className={'admin-asset' + (s.present ? ' is-present' : '')}>
                        <span className={'admin-asset__status ' + (s.present ? 'is-ok' : 'is-missing')}>
                          {s.present ? '\u2713' : '\u2715'}
                        </span>
                        <span className="admin-asset__label">Scenario graphic</span>
                        <code className="admin-asset__file">{s.file}</code>
                      </li>
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
