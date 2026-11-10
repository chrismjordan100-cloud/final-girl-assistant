/* ==========================================================================
   BackupKit v1 — protects an app's browser-stored data from browser wipes.

   Browser storage (localStorage) is deleted by "Clear browsing data" and by
   cleanup tools such as CCleaner. BackupKit keeps a copy in a real folder on
   disk (e.g. OneDrive or Documents), which a browser wipe cannot touch.

   - You pick a folder once. Every change is then written there automatically:
       <appId>-latest.json        always the newest copy
       <appId>-YYYY-MM-DD.json    one copy per day, the last 30 days kept
   - SHRINK GUARD: it never auto-overwrites a good backup with much less data
     (the tell-tale sign of a wiped browser). It pauses and asks instead.
   - If you pick a folder that holds a bigger backup than the browser has, it
     offers to restore it (the recovery path after a wipe).
   - Download / restore by file work everywhere, including phones.
   - Restore always saves a copy of the current data first.

   Self-contained: no dependencies, never throws into the host app, keeps its
   own bookkeeping in IndexedDB (not localStorage) so it never appears in the
   host app's own exports or cloud syncs. The same file is used, unchanged, by
   Finance Tracker, Media Tracker and the Final Girl assistant.

   Usage:
     BackupKit.init({ appId, appName, prefixes: ['ft_'], exclude: [],
                      button: 'element-id', compact: false, acceptFlat: false,
                      afterRestore: function (keys) {} });
     BackupKit.open();                  // show the backup panel
     BackupKit.snapshot('before-x');    // extra safety copy (only if linked)
   ========================================================================== */
(function () {
  'use strict';
  if (typeof window === 'undefined' || window.BackupKit) return;

  var VERSION = 1;
  var IDB_NAME = 'backupkit';
  var IDB_STORE = 'kv';
  var POLL_MS = 5000;        // how often to check for changes
  var KEEP_DAILY = 30;       // dated daily copies to keep
  var STALE_DAYS = 7;        // nag after this long without any backup
  var SHRINK_RATIO = 0.5;    // pause if data falls below half the last backup
  var BIG_KEY = 1000;        // keys this large are "important" (missing = pause)

  var supported = typeof window.showDirectoryPicker === 'function';
  var cfg = null;
  var started = false;
  var writing = false;
  var restoring = false;
  var timer = null;
  var hostEl = null;
  var lastFocus = null;
  var st = {
    status: 'none',          // none | active | needs-permission | blocked | error
    message: '',
    dir: null,
    dirName: '',
    lastWriteAt: null,
    lastDownloadAt: null,
    baseline: null,          // { size, count, big[], savedAt } of the last good backup
    lastSig: null
  };

  /* ---------------- small helpers ---------------- */
  function safe(fn) { try { return fn(); } catch (e) { return undefined; } }
  function K(name) { return cfg.appId + ':' + name; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function stamp() { var d = new Date(); return today() + '_' + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds()); }
  function days(iso) { return iso ? (Date.now() - new Date(iso).getTime()) / 86400000 : Infinity; }
  function fmt(iso) {
    if (!iso) return 'never';
    return safe(function () {
      return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }) || iso;
  }
  function kb(chars) { return chars < 1024 ? chars + ' bytes' : Math.round(chars / 1024).toLocaleString() + ' KB'; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------------- IndexedDB (bookkeeping + folder handle) ---------------- */
  function idb(mode, fn) {
    return new Promise(function (resolve, reject) {
      var req;
      try { req = indexedDB.open(IDB_NAME, 1); } catch (e) { reject(e); return; }
      req.onupgradeneeded = function () { req.result.createObjectStore(IDB_STORE); };
      req.onerror = function () { reject(req.error); };
      req.onsuccess = function () {
        var db = req.result, r;
        try {
          var tx = db.transaction(IDB_STORE, mode);
          r = fn(tx.objectStore(IDB_STORE));
          tx.oncomplete = function () { db.close(); resolve(r ? r.result : undefined); };
          tx.onerror = function () { db.close(); reject(tx.error); };
        } catch (e) { db.close(); reject(e); }
      };
    });
  }
  function idbGet(k) { return idb('readonly', function (s) { return s.get(k); }).catch(function () { return undefined; }); }
  function idbSet(k, v) { return idb('readwrite', function (s) { return s.put(v, k); }).catch(function () {}); }
  function idbDel(k) { return idb('readwrite', function (s) { return s.delete(k); }).catch(function () {}); }

  /* ---------------- what gets backed up ---------------- */
  function includeKey(k) {
    if (!k) return false;
    if (cfg.exclude.indexOf(k) >= 0) return false;
    for (var i = 0; i < cfg.prefixes.length; i++) if (k.indexOf(cfg.prefixes[i]) === 0) return true;
    return false;
  }
  function collect() {
    var names = [], keys = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (includeKey(k)) names.push(k);
    }
    names.sort();
    names.forEach(function (k) { var v = localStorage.getItem(k); if (v !== null) keys[k] = v; });
    return keys;
  }
  function measure(keys, savedAt) {
    var size = 0, count = 0, big = [];
    Object.keys(keys).forEach(function (k) {
      size += keys[k].length; count++;
      if (keys[k].length > BIG_KEY) big.push(k);
    });
    return { size: size, count: count, big: big, savedAt: savedAt || new Date().toISOString() };
  }
  function payload(keys) {
    return JSON.stringify({
      app: 'backupkit', appId: cfg.appId, appName: cfg.appName, version: VERSION,
      savedAt: new Date().toISOString(), keys: keys
    });
  }
  /* Why the current data looks like a wiped browser, or null if it looks fine. */
  function shrinkProblem(keys) {
    var b = st.baseline;
    if (!b) return null;
    var m = measure(keys);
    if (b.size > 2000 && m.size < b.size * SHRINK_RATIO) {
      return 'This browser now holds ' + kb(m.size) + ' of ' + cfg.appName + ' data, but the last backup (' + fmt(b.savedAt) + ') held ' + kb(b.size) + '.';
    }
    var missing = (b.big || []).filter(function (k) { return !(k in keys); });
    if (missing.length) {
      return 'Data that was in the last backup (' + fmt(b.savedAt) + ') is missing from this browser: ' + missing.join(', ') + '.';
    }
    return null;
  }
  /* Accepts a BackupKit file, or (if acceptFlat) a flat { key: "string" } export. */
  function extractKeys(obj) {
    var src;
    if (obj && obj.app === 'backupkit') {
      if (obj.appId !== cfg.appId) throw new Error('That backup belongs to ' + (obj.appName || obj.appId) + ', not ' + cfg.appName + '.');
      src = obj.keys;
    } else if (cfg.acceptFlat && obj && typeof obj === 'object' && !Array.isArray(obj)) {
      src = obj;
    } else {
      throw new Error('That file is not a ' + cfg.appName + ' backup.');
    }
    var keys = {};
    Object.keys(src || {}).forEach(function (k) {
      if (!includeKey(k)) return;
      var v = src[k];
      if (v === null || v === undefined) return;
      keys[k] = typeof v === 'string' ? v : JSON.stringify(v);
    });
    if (!Object.keys(keys).length) throw new Error('That file has no ' + cfg.appName + ' data in it.');
    return keys;
  }

  /* ---------------- folder I/O ---------------- */
  function perm(h, ask) {
    var o = { mode: 'readwrite' };
    return Promise.resolve().then(function () { return h.queryPermission(o); }).then(function (p) {
      if (p === 'granted') return true;
      if (!ask) return false;
      return h.requestPermission(o).then(function (q) { return q === 'granted'; });
    }).catch(function () { return false; });
  }
  function writeFile(name, text) {
    return st.dir.getFileHandle(name, { create: true }).then(function (fh) {
      return fh.createWritable().then(function (w) {
        return w.write(text).then(function () { return w.close(); });
      });
    });
  }
  function readJson(name) {
    return st.dir.getFileHandle(name).then(function (fh) { return fh.getFile(); })
      .then(function (f) { return f.text(); })
      .then(function (t) { return JSON.parse(t); })
      .catch(function () { return null; });
  }
  function prune() {
    if (!st.dir.entries) return Promise.resolve();
    var re = new RegExp('^' + cfg.appId.replace(/[^a-z0-9]/gi, '\\$&') + '-\\d{4}-\\d{2}-\\d{2}\\.json$');
    var names = [];
    return (async function () {
      for await (var entry of st.dir.entries()) { if (re.test(entry[0])) names.push(entry[0]); }
      names.sort();
      var old = names.slice(0, Math.max(0, names.length - KEEP_DAILY));
      for (var i = 0; i < old.length; i++) { try { await st.dir.removeEntry(old[i]); } catch (e) { /* ignore */ } }
    })().catch(function () {});
  }

  /* ---------------- the auto-backup loop ---------------- */
  function tick(force) {
    if (!cfg || writing || restoring || !st.dir || st.status !== 'active') return Promise.resolve();
    var keys = safe(collect);
    if (!keys || !Object.keys(keys).length) return Promise.resolve(); // never write an empty backup
    var sig = JSON.stringify(keys);
    if (!force && sig === st.lastSig) return Promise.resolve();
    if (!force) {
      var problem = shrinkProblem(keys);
      if (problem) { setStatus('blocked', problem); return Promise.resolve(); }
    }
    writing = true;
    var text = payload(keys);
    return writeFile(cfg.appId + '-latest.json', text)
      .then(function () { return writeFile(cfg.appId + '-' + today() + '.json', text); })
      .then(prune)
      .then(function () {
        st.lastSig = sig;
        st.lastWriteAt = new Date().toISOString();
        st.baseline = measure(keys, st.lastWriteAt);
        idbSet(K('lastWriteAt'), st.lastWriteAt);
        idbSet(K('baseline'), st.baseline);
        setStatus('active');
      })
      .catch(function (e) { setStatus('error', (e && e.message) || String(e)); })
      .then(function () { writing = false; });
  }

  /* ---------------- actions ---------------- */
  function linkFolder() {
    if (!supported) return;
    var h;
    window.showDirectoryPicker({ id: ('bk-' + cfg.appId).slice(0, 32), mode: 'readwrite' })
      .then(function (picked) { h = picked; return perm(h, true); })
      .then(function (ok) {
        if (!ok) { alert('Permission to save into that folder was not given.'); return; }
        st.dir = h; st.dirName = h.name; st.lastSig = null;
        return idbSet(K('dir'), h).then(function () { return readJson(cfg.appId + '-latest.json'); }).then(function (existing) {
          if (existing && existing.app === 'backupkit' && existing.appId === cfg.appId && existing.keys) {
            var em = measure(existing.keys, existing.savedAt), cm = measure(safe(collect) || {});
            st.baseline = em;
            idbSet(K('baseline'), em);
            if (cm.count === 0 || cm.size < em.size * SHRINK_RATIO) {
              var msg = 'This folder already has a ' + cfg.appName + ' backup from ' + fmt(existing.savedAt) +
                ' with more data (' + kb(em.size) + ') than this browser has now (' + kb(cm.size) + ').\n\n' +
                'Restore that backup now? (Recommended if your data has gone missing.)';
              if (confirm(msg)) { applyRestore(existing, true); return; }
              // Declined: carry on, but the shrink guard will pause auto-backup
              // (and explain why) rather than overwrite that bigger backup.
            }
          }
          setStatus('active');
          tick(false);
        });
      })
      .catch(function (e) { if (!e || e.name !== 'AbortError') alert('Could not use that folder: ' + ((e && e.message) || e)); });
  }
  function resume() {
    if (!st.dir) return;
    perm(st.dir, true).then(function (ok) {
      setStatus(ok ? 'active' : 'needs-permission');
      if (ok) { st.lastSig = null; tick(false); }
    });
  }
  function unlink() {
    if (!confirm('Stop saving ' + cfg.appName + ' to the backup folder automatically? Files already in the folder are kept.')) return;
    st.dir = null; st.dirName = ''; st.lastSig = null;
    idbDel(K('dir'));
    setStatus('none');
  }
  function backupAnyway() {
    st.status = 'active';
    st.lastSig = null;
    tick(true);
  }
  function backupNow() { st.lastSig = null; tick(false); }

  function download() {
    var keys = safe(collect) || {};
    if (!Object.keys(keys).length) { alert('There is no ' + cfg.appName + ' data in this browser to download.'); return; }
    downloadText(cfg.appId + '-backup-' + today() + '.json', payload(keys));
    st.lastDownloadAt = new Date().toISOString();
    idbSet(K('lastDownloadAt'), st.lastDownloadAt);
    setStatus(st.status, st.message);
  }
  function downloadText(name, text) {
    var blob = new Blob([text], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name; a.style.display = 'none';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function restoreFromFile() {
    var input = document.createElement('input');
    input.type = 'file'; input.accept = '.json,application/json'; input.style.display = 'none';
    input.addEventListener('change', function () {
      var f = input.files && input.files[0];
      input.remove();
      if (!f) return;
      f.text().then(function (t) {
        var obj;
        try { obj = JSON.parse(t); } catch (e) { throw new Error('That file is not valid JSON.'); }
        applyRestore(obj);
      }).catch(function (e) { alert('Could not restore: ' + e.message); });
    });
    document.body.appendChild(input);
    input.click();
  }
  function restoreLatestFromFolder() {
    if (!st.dir) return;
    perm(st.dir, true).then(function (ok) {
      if (!ok) { alert('Permission to read the backup folder was not given.'); return; }
      return readJson(cfg.appId + '-latest.json').then(function (obj) {
        if (!obj) { alert('No ' + cfg.appId + '-latest.json found in that folder.'); return; }
        applyRestore(obj);
      });
    });
  }
  /* Validate, confirm, save a copy of the current data, then restore and reload. */
  function applyRestore(obj, alreadyConfirmed) {
    var keys;
    try { keys = extractKeys(obj); } catch (e) { alert('Could not restore: ' + e.message); return; }
    var n = Object.keys(keys).length;
    var m = measure(keys);
    var when = obj && obj.savedAt ? ' saved ' + fmt(obj.savedAt) : '';
    if (!alreadyConfirmed && !confirm('Restore ' + cfg.appName + ' from this backup' + when + '?\n\n' + n + ' items, ' + kb(m.size) + '.\n' +
      'It replaces the matching data in this browser. A copy of what is here now is saved first.')) return;
    restoring = true;
    var current = safe(collect) || {};
    var before = Object.keys(current).length
      ? (st.dir ? perm(st.dir, false).then(function (ok) {
          if (ok) return writeFile(cfg.appId + '-before-restore-' + stamp() + '.json', payload(current));
          downloadText(cfg.appId + '-before-restore-' + stamp() + '.json', payload(current));
        }) : Promise.resolve(downloadText(cfg.appId + '-before-restore-' + stamp() + '.json', payload(current))))
      : Promise.resolve();
    before.catch(function () {}).then(function () {
      try {
        Object.keys(keys).forEach(function (k) { localStorage.setItem(k, keys[k]); });
      } catch (e) {
        restoring = false;
        alert('Restore failed part-way (' + e.message + '). The copy of your previous data was saved first.');
        return;
      }
      st.baseline = measure(keys, obj && obj.savedAt);
      idbSet(K('baseline'), st.baseline).then(function () {
        if (cfg.afterRestore) safe(function () { cfg.afterRestore(keys); });
        alert('Restored ' + n + ' items. The page will now reload.');
        location.reload();
      });
    });
  }

  /* Extra safety copy (e.g. before a cloud push). Only writes if a folder is
     linked and permitted; never prompts, never throws. keysOverride lets the
     host save something other than localStorage (e.g. the cloud copy). */
  function snapshot(reason, keysOverride) {
    if (!cfg || !st.dir) return Promise.resolve(false);
    return perm(st.dir, false).then(function (ok) {
      if (!ok) return false;
      var keys = keysOverride || safe(collect) || {};
      if (!Object.keys(keys).length) return false;
      var name = cfg.appId + '-' + String(reason || 'snapshot').replace(/[^a-z0-9\-]/gi, '-') + '-' + stamp() + '.json';
      return writeFile(name, payload(keys)).then(function () { return true; });
    }).catch(function () { return false; });
  }

  /* ---------------- status + button label ---------------- */
  function setStatus(s, message) {
    st.status = s;
    st.message = message || '';
    updateButton();
    if (hostEl) renderPanel();
  }
  function needsNag() {
    return st.status === 'none' && days(st.lastDownloadAt) > STALE_DAYS && (safe(function () { return Object.keys(collect()).length; }) || 0) > 0;
  }
  function label() {
    var warn = st.status === 'needs-permission' || st.status === 'blocked' || st.status === 'error' || needsNag();
    var text =
      st.status === 'active' ? 'Backed up' :
      st.status === 'needs-permission' ? 'Resume backup' :
      st.status === 'blocked' ? 'Backup paused' :
      st.status === 'error' ? 'Backup failed' :
      needsNag() ? 'Back up now' : 'Backup';
    var icon = st.status === 'active' ? '\u2705' : warn ? '\u26A0\uFE0F' : '\uD83D\uDCBE';
    return { icon: icon, text: text, warn: warn };
  }
  function updateButton() {
    if (!cfg || !cfg.button) return;
    var b = typeof cfg.button === 'string' ? document.getElementById(cfg.button) : cfg.button;
    if (!b) return;
    var l = label();
    b.textContent = cfg.compact ? l.icon : l.icon + ' ' + l.text;
    b.title = cfg.appName + ' backup: ' + l.text + (st.lastWriteAt ? ' (last saved ' + fmt(st.lastWriteAt) + ')' : '');
    b.setAttribute('aria-label', b.title);
    b.setAttribute('data-backup-state', l.warn ? 'warn' : st.status === 'active' ? 'ok' : 'idle');
  }

  /* ---------------- panel (shadow DOM so host CSS can't clash) ---------------- */
  var CSS =
    ':host{all:initial}' +
    '.ov{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:2147483646;display:flex;align-items:flex-start;justify-content:center;padding:6vh 12px;font-family:-apple-system,"Segoe UI",Roboto,sans-serif}' +
    '.card{background:#fff;color:#1f2937;border-radius:12px;max-width:560px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,.35);padding:20px 22px;font-size:14px;line-height:1.5}' +
    'h2{margin:0 0 10px;font-size:18px;color:#111827}' +
    'p{margin:0 0 10px}' +
    '.st{padding:10px 12px;border-radius:8px;margin:0 0 12px;background:#f3f4f6}' +
    '.st.ok{background:#ecfdf5;color:#065f46}.st.warn{background:#fffbeb;color:#92400e}.st.bad{background:#fef2f2;color:#991b1b}' +
    '.row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}' +
    'button{font:inherit;font-size:13px;font-weight:600;padding:8px 12px;border-radius:7px;border:1px solid #d1d5db;background:#f9fafb;color:#111827;cursor:pointer}' +
    'button:hover{background:#eef2f7}button.pri{background:#2563eb;border-color:#2563eb;color:#fff}button.pri:hover{background:#1d4ed8}' +
    'button:focus-visible{outline:3px solid #93c5fd;outline-offset:2px}' +
    '.small{font-size:12px;color:#6b7280;margin-top:12px}';

  function open() {
    if (!cfg) return;
    if (hostEl) { renderPanel(); return; }
    lastFocus = document.activeElement;
    var stale = document.getElementById('backupkit-host');
    if (stale) stale.remove();
    hostEl = document.createElement('div');
    hostEl.id = 'backupkit-host';
    var root = hostEl.attachShadow({ mode: 'open' });
    root.innerHTML = '<style>' + CSS + '</style><div class="ov"><div class="card" role="dialog" aria-modal="true" aria-labelledby="bk-t"></div></div>';
    root.querySelector('.ov').addEventListener('click', function (e) { if (e.target === e.currentTarget) close(); });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.body.appendChild(hostEl);
    renderPanel();
    var first = root.querySelector('button');
    if (first) first.focus();
  }
  function close() {
    if (hostEl) { hostEl.remove(); hostEl = null; }
    if (lastFocus && lastFocus.focus) safe(function () { lastFocus.focus(); });
  }
  function renderPanel() {
    if (!hostEl) return;
    var card = hostEl.shadowRoot.querySelector('.card');
    var s = st.status, folder = '<strong>' + esc(st.dirName) + '</strong>';
    var cls = 'st', msg;
    if (s === 'active') {
      cls += ' ok';
      msg = 'Saving every change automatically to folder ' + folder + '. Last saved ' + esc(fmt(st.lastWriteAt)) + '.';
    } else if (s === 'needs-permission') {
      cls += ' warn';
      msg = 'The browser needs your permission to keep saving to folder ' + folder + '. Click \u201cResume auto-backup\u201d (choose \u201cAllow on every visit\u201d if offered).';
    } else if (s === 'blocked') {
      cls += ' bad';
      msg = esc(st.message) + '<br><br>Auto-backup is <b>paused</b> so your good backup is not overwritten. If your data has gone missing, use \u201cRestore latest from folder\u201d. If you removed things on purpose, use \u201cBack up anyway\u201d.';
    } else if (s === 'error') {
      cls += ' bad';
      msg = 'Could not save to folder ' + folder + ': ' + esc(st.message) + '. It may have been moved or renamed. Choose the folder again.';
    } else if (supported) {
      cls += needsNag() ? ' warn' : '';
      msg = 'Your ' + esc(cfg.appName) + ' data is only stored inside this browser. Clearing browsing data or a cleanup tool (such as CCleaner) can delete it. ' +
        'Choose a backup folder (for example in OneDrive or Documents) and every change is saved there automatically, with a dated copy for each of the last ' + KEEP_DAILY + ' days.';
    } else {
      cls += needsNag() ? ' warn' : '';
      msg = 'This browser cannot save to a folder automatically. Download a backup copy regularly and keep it somewhere safe.';
    }
    var btns = [];
    if (s === 'none' && supported) btns.push(['pri', 'link', 'Choose backup folder\u2026']);
    if (s === 'needs-permission') btns.push(['pri', 'resume', 'Resume auto-backup']);
    if (s === 'blocked') { btns.push(['pri', 'restoreLatest', 'Restore latest from folder']); btns.push(['', 'anyway', 'Back up anyway']); }
    if (s === 'error') btns.push(['pri', 'link', 'Choose folder again\u2026']);
    if (s === 'active') { btns.push(['', 'now', 'Back up now']); btns.push(['', 'link', 'Change folder\u2026']); }
    if (s !== 'none' && st.dir) btns.push(['', 'unlink', 'Stop auto-backup']);
    btns.push(['', 'download', 'Download a copy']);
    btns.push(['', 'restoreFile', 'Restore from file\u2026']);
    btns.push(['', 'close', 'Close']);
    card.innerHTML =
      '<h2 id="bk-t">\uD83D\uDCBE ' + esc(cfg.appName) + ' backup</h2>' +
      '<div class="' + cls + '" role="status" aria-live="polite">' + msg + '</div>' +
      '<div class="row">' + btns.map(function (b) { return '<button type="button" class="' + b[0] + '" data-a="' + b[1] + '">' + b[2] + '</button>'; }).join('') + '</div>' +
      '<div class="small">Last downloaded copy: ' + esc(fmt(st.lastDownloadAt)) + '.</div>';
    card.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.getAttribute('data-a');
        if (a === 'link') linkFolder();
        else if (a === 'resume') resume();
        else if (a === 'unlink') unlink();
        else if (a === 'anyway') backupAnyway();
        else if (a === 'now') backupNow();
        else if (a === 'download') download();
        else if (a === 'restoreFile') restoreFromFile();
        else if (a === 'restoreLatest') restoreLatestFromFolder();
        else if (a === 'close') close();
      });
    });
  }

  /* ---------------- start-up ---------------- */
  function init(options) {
    try {
      if (cfg) { if (options && options.button) { cfg.button = options.button; updateButton(); } return; } // idempotent
      cfg = {
        appId: String(options.appId),
        appName: options.appName || options.appId,
        prefixes: options.prefixes || [],
        exclude: options.exclude || [],
        button: options.button || null,
        compact: !!options.compact,
        acceptFlat: !!options.acceptFlat,
        afterRestore: options.afterRestore || null
      };
      updateButton();
      if (started) return;
      started = true;
      safe(function () { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {}); });
      Promise.all([idbGet(K('lastDownloadAt')), idbGet(K('lastWriteAt')), idbGet(K('baseline')), supported ? idbGet(K('dir')) : null])
        .then(function (r) {
          st.lastDownloadAt = r[0] || null;
          st.lastWriteAt = r[1] || null;
          st.baseline = r[2] || null;
          var h = r[3];
          if (!h) { setStatus('none'); return; }
          st.dir = h; st.dirName = h.name;
          return perm(h, false).then(function (ok) { setStatus(ok ? 'active' : 'needs-permission'); });
        })
        .catch(function () { setStatus('none'); })
        .then(function () {
          timer = setInterval(function () { tick(false); }, POLL_MS);
          tick(false);
          document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') tick(false); });
          window.addEventListener('pagehide', function () { tick(false); });
        });
    } catch (e) { /* never break the host app */ }
  }

  window.BackupKit = {
    init: init,
    open: function () { safe(open); },
    snapshot: snapshot,
    status: function () { return st.status; }
  };
})();
