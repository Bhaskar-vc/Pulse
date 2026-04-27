import * as React from 'react';
import { useCallback } from 'react';
import { addons, types } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

/* ── Design-system palette ─────────────────────────────────────── */
const DARK = {
  bg:          '#242933',
  bgContent:   '#242933',
  bgMuted:     '#2a2f40',
  border:      '#353858',
  text:        '#e9ecf5',
  textMuted:   '#9aa3be',
  textFaint:   '#6e7798',
  brand:       '#9b77ed',
  inputBg:     '#2a2e44',
  inputBorder: '#353858',
};

const LIGHT = {
  bg:          '#f9fafb',
  bgContent:   '#ffffff',
  border:      '#eaeaed',
  text:        '#29294c',
  textMuted:   '#707087',
  brand:       '#7f56d9',
  brandDark:   '#6941c6',
  inputBg:     '#ffffff',
  inputBorder: '#eaeaed',
};

/* ── Storybook theme objects ───────────────────────────────────── */
const lightTheme = create({
  base: 'light',
  brandTitle: 'Pulse Design System',
  brandUrl: 'https://github.com/Bhaskar-vc/Pulse-designsystem',
  brandImage: './VC-logo.svg',
  brandTarget: '_blank',

  colorPrimary:   LIGHT.brand,
  colorSecondary: LIGHT.brandDark,

  appBg:          LIGHT.bg,
  appContentBg:   LIGHT.bgContent,
  appBorderColor: LIGHT.border,
  appBorderRadius: 8,

  textColor:        LIGHT.text,
  textInverseColor: '#ffffff',
  textMutedColor:   LIGHT.textMuted,

  barTextColor:     LIGHT.textMuted,
  barSelectedColor: LIGHT.brandDark,
  barHoverColor:    LIGHT.text,
  barBg:            LIGHT.bgContent,

  inputBg:          LIGHT.inputBg,
  inputBorder:      LIGHT.inputBorder,
  inputTextColor:   LIGHT.text,
  inputBorderRadius: 6,
});

const darkTheme = create({
  base: 'dark',
  brandTitle: 'Pulse Design System',
  brandUrl: 'https://github.com/Bhaskar-vc/Pulse-designsystem',
  brandImage: './VC-logo-white.svg',
  brandTarget: '_blank',

  colorPrimary:   DARK.brand,
  colorSecondary: '#363d52',

  appBg:          DARK.bg,
  appContentBg:   DARK.bgContent,
  appBorderColor: DARK.border,
  appBorderRadius: 8,

  textColor:        DARK.text,
  textInverseColor: DARK.bg,
  textMutedColor:   DARK.textFaint,

  barTextColor:     DARK.textMuted,
  barSelectedColor: '#b39ff7',
  barHoverColor:    DARK.text,
  barBg:            DARK.bgMuted,

  inputBg:          DARK.inputBg,
  inputBorder:      DARK.inputBorder,
  inputTextColor:   DARK.text,
  inputBorderRadius: 6,
});

/* ── Set Storybook theme object once at startup ─────────────────
   IMPORTANT: addons.setConfig() must NOT be called from inside
   channel event listeners (GLOBALS_UPDATED etc.) — doing so causes
   addons.setConfig → FORCE_RE_RENDER → GLOBALS_UPDATED → setConfig
   → infinite loop that hangs the manager tab.
   ──────────────────────────────────────────────────────────────── */
const _savedTheme = (() => {
  try { return localStorage.getItem('pulse-theme') ?? 'light'; } catch { return 'light'; }
})();

/* ── Force sidebar collapsed on first visit per browser tab ───────
   Storybook 8 tracks nav width via navSize (navSize=0 = collapsed)
   and persists it in sessionStorage (cross-tab sync) and sometimes
   localStorage.

   We only reset navSize on the FIRST page load for each browser tab
   (detected via a sessionStorage flag). After that — if the user
   manually opens the sidebar — navSize stays as-is across story
   navigations within the same tab session.                          */
(() => {
  const SESSION_FLAG = 'pulse-nav-initialized';

  /* Already initialized in this tab → user may have opened sidebar; leave it alone */
  try {
    if (sessionStorage.getItem(SESSION_FLAG)) return;
    sessionStorage.setItem(SESSION_FLAG, '1');
  } catch { /* storage unavailable — fall through and collapse */ }

  const collapseNav = (storage: Storage) => {
    try {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key) continue;
        const raw = storage.getItem(key);
        if (!raw || !raw.includes('navSize')) continue;
        try {
          const val = JSON.parse(raw);
          if (!val || typeof val !== 'object') continue;
          let changed = false;
          /* Shape A: { layout: { navSize: N } } */
          if (val.layout && typeof val.layout === 'object' && 'navSize' in val.layout && val.layout.navSize !== 0) {
            val.layout.navSize = 0;
            changed = true;
          }
          /* Shape B: { navSize: N } */
          if ('navSize' in val && val.navSize !== 0) {
            val.navSize = 0;
            changed = true;
          }
          if (changed) storage.setItem(key, JSON.stringify(val));
        } catch { /* not JSON */ }
      }
    } catch { /* storage unavailable */ }
  };

  /* Ensure controls panel is open (bottomPanelHeight > 0, showPanel !== false) */
  const ensurePanelOpen = (storage: Storage) => {
    try {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key) continue;
        const raw = storage.getItem(key);
        if (!raw) continue;
        const hasPanelKey = raw.includes('bottomPanelHeight') || raw.includes('showPanel');
        if (!hasPanelKey) continue;
        try {
          const val = JSON.parse(raw);
          if (!val || typeof val !== 'object') continue;
          const target = (val.layout && typeof val.layout === 'object') ? val.layout : val;
          let changed = false;
          if ('bottomPanelHeight' in target && target.bottomPanelHeight < 50) {
            target.bottomPanelHeight = 300; changed = true;
          }
          if ('showPanel' in target && target.showPanel === false) {
            target.showPanel = true; changed = true;
          }
          if (changed) {
            if (val.layout) val.layout = target;
            storage.setItem(key, JSON.stringify(val));
          }
        } catch { /* not JSON */ }
      }
    } catch { /* storage unavailable */ }
  };

  collapseNav(localStorage);
  collapseNav(sessionStorage);
  ensurePanelOpen(localStorage);
  ensurePanelOpen(sessionStorage);
})();

addons.setConfig({
  theme: _savedTheme === 'dark' ? darkTheme : lightTheme,
  initialActive: 'canvas',
  navSize: 0,
  showPanel: true,
  panelPosition: 'bottom',
  selectedPanel: 'storybook/controls/panel',
  sidebar: { showRoots: true },
});

/* ── Theme Toggle Toolbar Button ───────────────────────────────── */
function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(
    () => { try { return localStorage.getItem('pulse-theme') === 'dark'; } catch { return false; } }
  );

  const toggle = useCallback(() => {
    const next = !isDark;
    const theme = next ? 'dark' : 'light';

    // Persist to localStorage — read by polling in both manager-head and preview-head
    try { localStorage.setItem('pulse-theme', theme); } catch {}

    if (!next) {
      // dark → light: Storybook's dark Emotion styles are baked into the DOM and cannot
      // be removed dynamically. A reload restarts with the correct light theme from localStorage.
      window.location.reload();
      return;
    }

    // light → dark: our !important constructable sheet wins over light Emotion styles — no reload needed
    setIsDark(true);
    addons.setConfig({ theme: darkTheme });
    try { addons.getChannel().emit('UPDATE_GLOBALS', { globals: { theme: 'dark' } }); } catch {}
  }, [isDark]);

  return React.createElement(
    'button',
    {
      onClick: toggle,
      title: isDark ? 'Switch to Light' : 'Switch to Dark',
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0',
        padding: '4px 8px',
        margin: '0 6px',
        borderRadius: '20px',
        border: '1px solid ' + (isDark ? '#353858' : '#ddd8f5'),
        cursor: 'pointer',
        fontSize: '11px',
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.02em',
        lineHeight: 1,
        background: isDark ? '#2a2f40' : '#f0eeff',
        color: isDark ? '#b9b1d3' : '#6941c6',
        transition: 'background 0.15s, color 0.15s, border-color 0.15s',
        userSelect: 'none' as const,
        whiteSpace: 'nowrap' as const,
      },
    },
    React.createElement('span', { style: { fontSize: '14px', lineHeight: 1 } }, isDark ? '☀' : '☾')
  );
}

/* ── Register toggle button ────────────────────────────────────── */
addons.register('pulse-theme-toggle', () => {
  addons.add('pulse-theme-toggle/tool', {
    type: types.TOOLEXTRA,
    title: 'Theme',
    match: () => true,
    render: () => React.createElement(ThemeToggle),
  });
});

