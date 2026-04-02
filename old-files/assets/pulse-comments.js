/**
 * Pulse Comments Widget
 * Drop-in script for any project screen.
 *
 * Usage:
 *   <script src="../assets/pulse-comments.js"
 *           data-project="create-survey"
 *           data-screen="get-started"></script>
 *
 * Requires server.py running on the same host (port 8080).
 */
(function () {
  'use strict';

  /* ── Config ──────────────────────────────────────────────────────────────── */
  const scriptEl  = document.currentScript ||
    [...document.querySelectorAll('script[data-project]')].pop();
  const PROJECT   = (scriptEl && scriptEl.dataset.project) || 'unknown';
  const SCREEN    = (scriptEl && scriptEl.dataset.screen)  ||
    location.pathname.split('/').pop().replace(/\.html?$/i, '') || 'index';
  const API_BASE  = location.origin + '/api/comments';
  const NAME_KEY  = 'pulse-commenter-name';

  /* ── Helpers ─────────────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function fmtTime(iso) {
    const d    = new Date(iso), now = new Date(), diff = now - d;
    if (diff < 60000)    return 'just now';
    if (diff < 3600000)  return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  function initials(name) {
    return name.trim().split(/\s+/).map(w => w[0].toUpperCase()).slice(0, 2).join('');
  }
  function avatarColor(name) {
    const palette = ['#6d28d9','#0891b2','#059669','#d97706','#e11d48','#7c3aed','#0284c7','#0d9488'];
    let h = 0;
    for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
    return palette[Math.abs(h) % palette.length];
  }
  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  /* ── CSS ─────────────────────────────────────────────────────────────────── */
  const CSS = `
/* ── Pulse Comments ────────────────────────────────────────────────────────── */

#pcw-backdrop {
  position: fixed; inset: 0; z-index: 9799;
  background: rgba(16,24,40,.22); backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  opacity: 0; pointer-events: none;
  transition: opacity .25s;
}
#pcw-backdrop.open { opacity: 1; pointer-events: all; }

#pcw-panel {
  position: fixed; top: 0; right: 0; bottom: 0; z-index: 9801;
  width: 400px; max-width: 95vw;
  background: #fff;
  border-left: 1px solid #e4e7ec;
  box-shadow: -10px 0 50px rgba(16,24,40,.12);
  display: flex; flex-direction: column;
  font-family: 'Inter', -apple-system, sans-serif;
  transform: translateX(100%);
  transition: transform .28s cubic-bezier(.4,0,.2,1);
}
#pcw-panel.open { transform: translateX(0); }

/* dark mode */
@media (prefers-color-scheme: dark) { }
html[data-theme="dark"] #pcw-panel  { background: #1c1c32; border-color: #2a2a42; }
html[data-theme="dark"] #pcw-backdrop { background: rgba(0,0,0,.45); }

/* ── Header ── */
.pcw-hd {
  padding: 20px 20px 0;
  border-bottom: 1px solid #f2f4f7;
  flex-shrink: 0;
}
html[data-theme="dark"] .pcw-hd { border-color: #252540; }

.pcw-hd-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
.pcw-hd-left {}
.pcw-hd-title { font-size: 15px; font-weight: 700; color: #101828; letter-spacing: -.2px; }
html[data-theme="dark"] .pcw-hd-title { color: #e8e8f8; }
.pcw-hd-sub   { font-size: 11.5px; color: #98a2b3; margin-top: 3px; }
.pcw-hd-close {
  width: 30px; height: 30px; border-radius: 8px; border: none; background: none;
  color: #98a2b3; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background .15s, color .15s; flex-shrink: 0; margin-top: -2px;
}
.pcw-hd-close:hover { background: #f2f4f7; color: #344054; }
html[data-theme="dark"] .pcw-hd-close:hover { background: #252540; color: #c0c0e0; }

/* ── Filter tabs ── */
.pcw-tabs { display: flex; gap: 2px; padding-bottom: 0; margin-bottom: -1px; }
.pcw-tab {
  padding: 6px 12px; border-radius: 8px 8px 0 0; border: none;
  font-family: inherit; font-size: 12.5px; font-weight: 500; color: #667085;
  cursor: pointer; background: none; transition: all .15s;
  display: flex; align-items: center; gap: 5px;
  border-bottom: 2px solid transparent;
}
.pcw-tab:hover { color: #344054; background: #f9fafb; }
html[data-theme="dark"] .pcw-tab:hover { color: #c0c0e0; background: #252540; }
.pcw-tab.active { color: #6d28d9; font-weight: 600; border-bottom-color: #7c3aed; }
html[data-theme="dark"] .pcw-tab.active { color: #a78bfa; border-bottom-color: #7c3aed; }
.pcw-tab-count {
  min-width: 16px; height: 16px; padding: 0 4px;
  background: #f4f0fd; color: #6d28d9; border-radius: 8px;
  font-size: 10.5px; font-weight: 700;
  display: inline-flex; align-items: center; justify-content: center;
}
.pcw-tab.active .pcw-tab-count { background: #e9d7fe; }

/* ── Comment list ── */
.pcw-list {
  flex: 1; overflow-y: auto; padding: 0;
  scrollbar-width: thin; scrollbar-color: #e4e7ec transparent;
}
.pcw-list::-webkit-scrollbar       { width: 4px; }
.pcw-list::-webkit-scrollbar-thumb { background: #e4e7ec; border-radius: 2px; }
html[data-theme="dark"] .pcw-list::-webkit-scrollbar-thumb { background: #2a2a42; }

.pcw-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 48px 24px; gap: 10px; color: #98a2b3; font-size: 13px; text-align: center;
}
.pcw-empty svg { width: 36px; height: 36px; opacity: .35; }
.pcw-empty p { margin: 0; line-height: 1.5; }

/* ── Comment item ── */
.pcw-item {
  padding: 16px 20px; border-bottom: 1px solid #f9fafb;
  display: grid; grid-template-columns: 34px 1fr; gap: 10px;
  transition: background .1s;
}
.pcw-item:last-child { border-bottom: none; }
.pcw-item:hover { background: #fafafa; }
html[data-theme="dark"] .pcw-item { border-color: #1e1e34; }
html[data-theme="dark"] .pcw-item:hover { background: #1e1e34; }
.pcw-item.resolved { opacity: .6; }

.pcw-avatar {
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: #fff; margin-top: 1px;
  user-select: none;
}
.pcw-body { min-width: 0; }
.pcw-meta { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; flex-wrap: wrap; }
.pcw-author { font-size: 13px; font-weight: 600; color: #1d2939; }
html[data-theme="dark"] .pcw-author { color: #e0e0f0; }
.pcw-time   { font-size: 11px; color: #98a2b3; }
.pcw-resolved-tag {
  font-size: 10.5px; font-weight: 600; color: #027a48;
  background: #ecfdf3; padding: 1px 7px; border-radius: 10px; line-height: 1.6;
}
.pcw-text {
  font-size: 13px; line-height: 1.55; color: #344054; word-break: break-word;
  white-space: pre-wrap;
}
html[data-theme="dark"] .pcw-text { color: #a0a0c0; }
.pcw-item.resolved .pcw-text { text-decoration: line-through; color: #98a2b3; }

.pcw-actions { margin-top: 8px; display: flex; gap: 4px; }
.pcw-btn {
  padding: 3px 9px; border-radius: 6px; border: none; background: none;
  font-family: inherit; font-size: 11.5px; font-weight: 500;
  cursor: pointer; transition: background .12s, color .12s;
}
.pcw-btn-resolve   { color: #6d28d9; }
.pcw-btn-resolve:hover   { background: #f4f0fd; }
.pcw-btn-unresolve { color: #027a48; }
.pcw-btn-unresolve:hover { background: #ecfdf3; }
.pcw-btn-delete    { color: #d92d20; }
.pcw-btn-delete:hover    { background: #fef3f2; }
html[data-theme="dark"] .pcw-btn-resolve:hover   { background: #1e1838; }
html[data-theme="dark"] .pcw-btn-unresolve:hover { background: #0c1f17; }
html[data-theme="dark"] .pcw-btn-delete:hover    { background: #1f0c0c; }

/* ── Add comment form ── */
.pcw-form {
  padding: 16px 20px 20px; border-top: 1px solid #f2f4f7;
  display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;
  background: #f9fafb;
}
html[data-theme="dark"] .pcw-form { border-color: #252540; background: #14142a; }
.pcw-form-label { font-size: 11px; font-weight: 600; color: #344054; text-transform: uppercase; letter-spacing: .6px; }
html[data-theme="dark"] .pcw-form-label { color: #6060a0; }

.pcw-input, .pcw-textarea {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 13px; color: #29294c;
  border: 1px solid #e1e5ea; border-radius: 6px; outline: none;
  background: #fff; width: 100%;
  transition: border-color .15s, box-shadow .15s;
  -webkit-appearance: none;
}
html[data-theme="dark"] .pcw-input,
html[data-theme="dark"] .pcw-textarea { background: #1c1c32; border-color: #2a2a42; color: #e0e0f0; }
.pcw-input::placeholder, .pcw-textarea::placeholder { color: #98a2b3; }
.pcw-input:hover, .pcw-textarea:hover { border-color: #9e77ed; }
.pcw-input:focus, .pcw-textarea:focus {
  border-color: #7f56d9;
  box-shadow: 0 0 0 3px rgba(127,86,217,.12);
}
.pcw-input.err, .pcw-textarea.err {
  border-color: #f04438 !important;
  box-shadow: 0 0 0 3px rgba(240,68,56,.1) !important;
}
.pcw-input    { height: 34px; padding: 0 10px; }
.pcw-textarea { height: 78px; padding: 8px 10px; resize: vertical; line-height: 1.5; min-height: 56px; }

/* ── Name field locked state ── */
.pcw-name-row { display: flex; align-items: center; gap: 6px; }
.pcw-name-row .pcw-input { flex: 1; }
.pcw-name-row .pcw-input:disabled {
  background: #f9fafb; color: #667085; cursor: default;
  border-color: #e1e5ea; opacity: 1;
}
html[data-theme="dark"] .pcw-name-row .pcw-input:disabled {
  background: #14142a; color: #6060a0; border-color: #2a2a42;
}
.pcw-name-edit {
  flex-shrink: 0; padding: 0 8px; height: 34px; border-radius: 6px; border: none;
  background: none; font-family: inherit; font-size: 11.5px; font-weight: 500;
  color: #7c3aed; cursor: pointer; white-space: nowrap;
  transition: background .12s;
}
.pcw-name-edit:hover { background: #f4f0fd; }
html[data-theme="dark"] .pcw-name-edit { color: #a78bfa; }
html[data-theme="dark"] .pcw-name-edit:hover { background: #1e1838; }

.pcw-form-footer { display: flex; align-items: center; justify-content: space-between; }
.pcw-form-hint   { font-size: 11px; color: #98a2b3; }
.pcw-submit {
  height: 34px; padding: 0 16px; border-radius: 6px; border: none;
  background: #7c3aed; color: #fff;
  font-family: inherit; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: background .15s, opacity .15s;
}
.pcw-submit:hover    { background: #6d28d9; }
.pcw-submit:disabled { opacity: .5; cursor: not-allowed; }

/* ── Spinner ── */
.pcw-spinner {
  width: 14px; height: 14px; border: 2px solid rgba(255,255,255,.4);
  border-top-color: #fff; border-radius: 50%;
  animation: pcw-spin .7s linear infinite; display: inline-block;
}
@keyframes pcw-spin { to { transform: rotate(360deg); } }

/* ── New-comment flash ── */
@keyframes pcw-flash { 0%,100%{background:transparent} 40%{background:rgba(124,58,237,.08)} }
.pcw-item-new { animation: pcw-flash 1s ease; }
`;

  /* ── HTML ────────────────────────────────────────────────────────────────── */
  const SCREEN_LABEL = SCREEN.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const PROJECT_LABEL = PROJECT.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const HTML = `
<div id="pcw-backdrop"></div>
<aside id="pcw-panel" role="complementary" aria-label="Comments">
  <div class="pcw-hd">
    <div class="pcw-hd-row">
      <div class="pcw-hd-left">
        <div class="pcw-hd-title">Comments</div>
        <div class="pcw-hd-sub">${esc(PROJECT_LABEL)} &rsaquo; ${esc(SCREEN_LABEL)}</div>
      </div>
      <button class="pcw-hd-close" id="pcw-close" title="Close (Esc)">
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <div class="pcw-tabs" id="pcw-tabs" role="tablist">
      <button class="pcw-tab active" data-f="all"      role="tab" aria-selected="true">All      <span class="pcw-tab-count" id="pcw-n-all">0</span></button>
      <button class="pcw-tab"        data-f="open"     role="tab">Open     <span class="pcw-tab-count" id="pcw-n-open">0</span></button>
      <button class="pcw-tab"        data-f="resolved" role="tab">Resolved <span class="pcw-tab-count" id="pcw-n-res">0</span></button>
    </div>
  </div>

  <div class="pcw-list" id="pcw-list"></div>

  <div class="pcw-form" id="pcw-form">
    <div class="pcw-form-label">Add comment</div>
    <div class="pcw-name-row">
      <input class="pcw-input" id="pcw-name" type="text" placeholder="Your name" maxlength="60" autocomplete="name"/>
      <button class="pcw-name-edit" id="pcw-name-edit" type="button" style="display:none">Edit</button>
    </div>
    <textarea class="pcw-textarea" id="pcw-text" placeholder="Share feedback on this screen… (Ctrl+Enter to post)" maxlength="1000"></textarea>
    <div class="pcw-form-footer">
      <span class="pcw-form-hint" id="pcw-char-hint"></span>
      <button class="pcw-submit" id="pcw-submit">Post</button>
    </div>
  </div>
</aside>
`;

  /* ── State ───────────────────────────────────────────────────────────────── */
  let comments = [];
  let filterMode = 'all';
  let isOpen = false;

  /* ── API calls ───────────────────────────────────────────────────────────── */
  async function apiGet() {
    const r = await fetch(`${API_BASE}?project=${encodeURIComponent(PROJECT)}&screen=${encodeURIComponent(SCREEN)}`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  }
  async function apiPost(author, text) {
    const r = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project: PROJECT, screen: SCREEN, author, text }),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  }
  async function apiPatch(id, resolved) {
    const r = await fetch(`${API_BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resolved }),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  }
  async function apiDelete(id) {
    const r = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  }

  /* ── Render ──────────────────────────────────────────────────────────────── */
  function renderList() {
    const open     = comments.filter(c => !c.resolved);
    const resolved = comments.filter(c =>  c.resolved);
    const shown    = filterMode === 'open' ? open : filterMode === 'resolved' ? resolved : comments;

    document.getElementById('pcw-n-all').textContent  = comments.length;
    document.getElementById('pcw-n-open').textContent = open.length;
    document.getElementById('pcw-n-res').textContent  = resolved.length;

    const list = document.getElementById('pcw-list');
    if (!shown.length) {
      const msg = filterMode === 'resolved' ? 'No resolved comments yet.'
                : filterMode === 'open'     ? 'No open comments.'
                : 'No comments yet — be the first!';
      list.innerHTML = `
        <div class="pcw-empty">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
          <p>${msg}</p>
        </div>`;
      return;
    }

    list.innerHTML = shown.map(c => `
      <div class="pcw-item${c.resolved ? ' resolved' : ''}" data-id="${c.id}">
        <div class="pcw-avatar" style="background:${avatarColor(c.author)}">${esc(initials(c.author))}</div>
        <div class="pcw-body">
          <div class="pcw-meta">
            <span class="pcw-author">${esc(c.author)}</span>
            <span class="pcw-time">${fmtTime(c.ts)}</span>
            ${c.resolved ? '<span class="pcw-resolved-tag">Resolved</span>' : ''}
          </div>
          <div class="pcw-text">${esc(c.text)}</div>
          <div class="pcw-actions">
            ${!c.resolved
              ? `<button class="pcw-btn pcw-btn-resolve"   data-action="resolve"   data-id="${c.id}">✓ Resolve</button>`
              : `<button class="pcw-btn pcw-btn-unresolve" data-action="unresolve" data-id="${c.id}">↩ Re-open</button>`}
            <button class="pcw-btn pcw-btn-delete" data-action="delete" data-id="${c.id}">Delete</button>
          </div>
        </div>
      </div>`).join('');
  }

  /* ── Panel open/close ────────────────────────────────────────────────────── */
  function openPanel() {
    isOpen = true;
    document.getElementById('pcw-panel').classList.add('open');
    document.getElementById('pcw-backdrop').classList.add('open');
    // Focus textarea if name is already locked in, otherwise focus name field
    const nameEl = document.getElementById('pcw-name');
    (nameEl.disabled ? document.getElementById('pcw-text') : nameEl).focus();
  }
  function closePanel() {
    isOpen = false;
    document.getElementById('pcw-panel').classList.remove('open');
    document.getElementById('pcw-backdrop').classList.remove('open');
  }

  /* ── Post comment ────────────────────────────────────────────────────────── */
  async function postComment() {
    const nameEl = document.getElementById('pcw-name');
    const textEl = document.getElementById('pcw-text');
    const name   = nameEl.value.trim();
    const text   = textEl.value.trim();

    nameEl.classList.remove('err');
    textEl.classList.remove('err');

    let hasErr = false;
    if (!name) { nameEl.classList.add('err'); hasErr = true; }
    if (!text) { textEl.classList.add('err'); hasErr = true; }
    if (hasErr) { (name ? textEl : nameEl).focus(); return; }

    // Persist name and lock the field
    localStorage.setItem(NAME_KEY, name);
    document.getElementById('pcw-name').disabled = true;
    document.getElementById('pcw-name-edit').style.display = '';

    const btn = document.getElementById('pcw-submit');
    btn.disabled = true;
    btn.innerHTML = '<span class="pcw-spinner"></span>';

    try {
      const newComment = await apiPost(name, text);
      comments.unshift(newComment);
      textEl.value = '';
      document.getElementById('pcw-char-hint').textContent = '';
      renderList();

      // Flash the new comment
      const firstItem = document.querySelector('#pcw-list .pcw-item');
      if (firstItem) firstItem.classList.add('pcw-item-new');
      document.getElementById('pcw-list').scrollTop = 0;

    } catch (err) {
      console.error('[Pulse Comments] post failed:', err);
      alert('Could not save comment. Make sure the Pulse server (server.py) is running.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Post';
    }
  }

  /* ── Actions (resolve/delete) ────────────────────────────────────────────── */
  async function handleAction(action, id) {
    try {
      if (action === 'resolve' || action === 'unresolve') {
        await apiPatch(id, action === 'resolve');
        const c = comments.find(x => x.id === id);
        if (c) c.resolved = (action === 'resolve');
      } else if (action === 'delete') {
        if (!confirm('Delete this comment?')) return;
        await apiDelete(id);
        comments = comments.filter(x => x.id !== id);
      }
      renderList();
    } catch (err) {
      console.error('[Pulse Comments] action failed:', err);
    }
  }

  /* ── Init ────────────────────────────────────────────────────────────────── */
  async function init() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Inject HTML
    const wrap = document.createElement('div');
    wrap.innerHTML = HTML;
    document.body.appendChild(wrap);

    // Restore saved name — lock the field if a name is already known
    const nameEl   = document.getElementById('pcw-name');
    const editBtn  = document.getElementById('pcw-name-edit');
    function lockName(name) {
      nameEl.value    = name;
      nameEl.disabled = true;
      editBtn.style.display = '';
    }
    function unlockName() {
      nameEl.disabled = false;
      editBtn.style.display = 'none';
      nameEl.focus();
      nameEl.select();
    }
    const saved = localStorage.getItem(NAME_KEY);
    if (saved) lockName(saved);

    editBtn.addEventListener('click', unlockName);

    // When user manually edits name, save on blur and re-lock
    nameEl.addEventListener('blur', function () {
      const v = this.value.trim();
      if (v) { localStorage.setItem(NAME_KEY, v); lockName(v); }
    });

    // Char counter
    document.getElementById('pcw-text').addEventListener('input', function () {
      const len = this.value.length;
      const hint = document.getElementById('pcw-char-hint');
      hint.textContent = len > 900 ? `${1000 - len} chars left` : '';
      this.classList.remove('err');
    });
    nameEl.addEventListener('input', function () {
      this.classList.remove('err');
    });

    // Keyboard shortcut: Ctrl/Cmd + Enter to submit
    document.getElementById('pcw-text').addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) postComment();
    });

    // Close button
    document.getElementById('pcw-close').addEventListener('click', closePanel);

    // Backdrop click
    document.getElementById('pcw-backdrop').addEventListener('click', closePanel);

    // Global keyboard shortcuts
    document.addEventListener('keydown', e => {
      // Escape closes panel
      if (e.key === 'Escape' && isOpen) { closePanel(); return; }

      // "C" toggles panel (ignore when typing in an input/textarea)
      const tag = document.activeElement && document.activeElement.tagName;
      if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey && !e.metaKey && !e.altKey &&
          tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
        isOpen ? closePanel() : openPanel();
      }
    });

    // Filter tabs
    document.getElementById('pcw-tabs').addEventListener('click', e => {
      const tab = e.target.closest('.pcw-tab');
      if (!tab) return;
      filterMode = tab.dataset.f;
      document.querySelectorAll('.pcw-tab').forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      renderList();
    });

    // Comment actions (event delegation)
    document.getElementById('pcw-list').addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      handleAction(btn.dataset.action, Number(btn.dataset.id));
    });

    // Submit button
    document.getElementById('pcw-submit').addEventListener('click', postComment);

    // Load existing comments
    try {
      comments = await apiGet();
      renderList();
    } catch (err) {
      console.warn('[Pulse Comments] Could not load comments — is server.py running?', err);
      // Show empty state but don't break the page
      renderList();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
