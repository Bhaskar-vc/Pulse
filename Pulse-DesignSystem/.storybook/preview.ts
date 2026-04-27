import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { addons } from '@storybook/preview-api';
import { PulseDocsPage } from './DocsPage';


const DARK_BG = '#242933';

function applyTheme(theme: string) {
  const isDark = theme === 'dark';

  // Set data-theme — CSS in preview-head.html handles all dark-mode selectors
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

  // html + body inline bg prevents flash before CSS loads
  document.documentElement.style.backgroundColor = isDark ? DARK_BG : '';
  if (document.body) document.body.style.backgroundColor = isDark ? DARK_BG : '';

  // Docs wrapper needs inline override (MDX styles have !important)
  document.querySelectorAll<HTMLElement>('.sbdocs-wrapper, .sbdocs-content').forEach(el => {
    el.style.backgroundColor = isDark ? DARK_BG : '';
  });

  // NOTE: Do NOT write to localStorage here — that would fire the manager's
  // storage listener on every story navigation, causing addons.setConfig()
  // to run mid-render and blank the canvas.
}

// Set up GLOBALS_UPDATED listener with retry (channel may not be ready at module load)
function setupChannelListener() {
  try {
    addons.getChannel().on('GLOBALS_UPDATED', ({ globals }: { globals: Record<string, string> }) => {
      // On globals change, read authoritative value from localStorage
      let theme = 'light';
      try { theme = localStorage.getItem('pulse-theme') ?? globals?.theme ?? 'light'; } catch {}
      applyTheme(theme);
    });
  } catch {
    setTimeout(setupChannelListener, 100);
  }
}
setupChannelListener();

// Polling fallback — syncs data-theme from localStorage every 500ms.
// Guards against cases where GLOBALS_UPDATED doesn't reach the preview
// (e.g. docs-view re-renders, iframe lifecycle gaps).
setInterval(() => {
  try {
    const stored = localStorage.getItem('pulse-theme') ?? 'light';
    const current = document.documentElement.getAttribute('data-theme') ?? 'light';
    if (stored !== current) applyTheme(stored);
  } catch {}
}, 500);

const withTheme = (Story: any, _context: any) => {
  // localStorage is authoritative — written only by the toggle button.
  // context.globals.theme falls back to defaultValue on navigation when
  // the URL doesn't carry globals state, which would reset dark to light.
  let theme = 'light';
  try { theme = localStorage.getItem('pulse-theme') ?? 'light'; } catch {}
  applyTheme(theme);
  return Story();
};

const preview: Preview = {
  decorators: [
    withTheme,
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: PulseDocsPage,
      toc: {
        disable: true,
      },
    },
    options: {
      initialActive: 'addons',
      storySort: {
        order: [
          'Pulse Design System',
          'Design Tokens',
          ['Colors', 'Typography', 'Shadow & Border'],
          'Getting Started',
          'Layout',
          'Form Controls',
          'Data Display',
          'Feedback',
          'Navigation',
          'Utilities',
        ],
      },
    },
  },
};

export default preview;
