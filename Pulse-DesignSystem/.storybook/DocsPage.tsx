import * as React from 'react';
import {
  Title,
  Primary,
  Controls,
  Stories,
  useOf,
} from '@storybook/blocks';

/* ─── Star polygon helper ──────────────────────────────────────── */
function starPolygonPoints(cx: number, cy: number, R: number, r: number): string {
  const pts: string[] = [];
  for (let k = 0; k < 5; k++) {
    const oa = ((k * 72 - 90) * Math.PI) / 180;
    const ia = (((k * 72 + 36) - 90) * Math.PI) / 180;
    pts.push(`${(cx + R * Math.cos(oa)).toFixed(1)},${(cy + R * Math.sin(oa)).toFixed(1)}`);
    pts.push(`${(cx + r * Math.cos(ia)).toFixed(1)},${(cy + r * Math.sin(ia)).toFixed(1)}`);
  }
  return pts.join(' ');
}

/* ─── Illustrations by category ───────────────────────────────── */
const ILLUSTRATIONS: Record<string, React.ReactElement> = {
  'form': (
    <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="140" height="30" rx="8" stroke="#1570EF" strokeWidth="2" fill="#1570EF" fillOpacity="0.06"/>
      <rect x="22" y="31" width="60" height="8" rx="4" fill="#1570EF" fillOpacity="0.5"/>
      <rect x="130" y="31" width="8" height="8" rx="2" fill="#1570EF" fillOpacity="0.4"/>
      <rect x="10" y="64" width="140" height="30" rx="8" stroke="#6941c6" strokeWidth="2" fill="#6941c6" fillOpacity="0.06"/>
      <rect x="22" y="75" width="40" height="8" rx="4" fill="#b692f6" fillOpacity="0.6"/>
      <rect x="128" y="73" width="12" height="12" rx="6" fill="#6941c6" opacity="0.7"/>
      <rect x="10" y="108" width="140" height="30" rx="8" stroke="#12b76a" strokeWidth="2" fill="#12b76a" fillOpacity="0.06"/>
      <circle cx="156" cy="124" r="10" fill="#12b76a" opacity="0.8"/>
      <rect x="148" y="124" width="16" height="8" rx="4" fill="white" fillOpacity="0.9"/>
      <circle cx="200" cy="45" r="22" fill="#1570EF" fillOpacity="0.12" stroke="#1570EF" strokeWidth="1.5"/>
      <circle cx="200" cy="45" r="10" fill="#1570EF" opacity="0.7"/>
      <circle cx="200" cy="95" r="22" fill="#6941c6" fillOpacity="0.12" stroke="#6941c6" strokeWidth="1.5"/>
      <path d="M190 95l6 6 10-12" stroke="#6941c6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="200" cy="125" r="10" stroke="#9d9dad" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  'layout': (
    <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="120" height="86" rx="10" fill="#6941c6" fillOpacity="0.08" stroke="#6941c6" strokeWidth="1.5"/>
      <rect x="20" y="22" width="60" height="8" rx="4" fill="#6941c6" fillOpacity="0.6"/>
      <rect x="20" y="38" width="90" height="5" rx="2.5" fill="#b692f6" fillOpacity="0.4"/>
      <rect x="20" y="50" width="75" height="5" rx="2.5" fill="#b692f6" fillOpacity="0.3"/>
      <rect x="20" y="68" width="48" height="18" rx="6" fill="#6941c6" opacity="0.8"/>
      <rect x="76" y="68" width="36" height="18" rx="6" stroke="#6941c6" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <rect x="18" y="108" width="190" height="34" rx="10" fill="#1570EF" fillOpacity="0.08" stroke="#1570EF" strokeWidth="1.5"/>
      <rect x="30" y="119" width="50" height="12" rx="4" fill="#1570EF" fillOpacity="0.5"/>
      <rect x="88" y="121" width="80" height="8" rx="4" fill="#1570EF" fillOpacity="0.25"/>
      <rect x="144" y="8" width="68" height="86" rx="10" fill="#12b76a" fillOpacity="0.08" stroke="#12b76a" strokeWidth="1.5"/>
      <rect x="156" y="22" width="44" height="28" rx="6" fill="#12b76a" fillOpacity="0.2"/>
      <rect x="156" y="58" width="44" height="6" rx="3" fill="#12b76a" fillOpacity="0.4"/>
      <rect x="156" y="70" width="30" height="6" rx="3" fill="#12b76a" fillOpacity="0.3"/>
    </svg>
  ),
  'navigation': (
    <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="14" width="194" height="34" rx="8" fill="#0e9f6e" fillOpacity="0.08" stroke="#0e9f6e" strokeWidth="1.5"/>
      <rect x="18" y="22" width="44" height="18" rx="6" fill="#0e9f6e" opacity="0.7"/>
      <rect x="70" y="22" width="44" height="18" rx="6" fill="none" stroke="#0e9f6e" strokeWidth="1.2" opacity="0.4"/>
      <rect x="122" y="22" width="44" height="18" rx="6" fill="none" stroke="#0e9f6e" strokeWidth="1.2" opacity="0.4"/>
      <path d="M20 68l8-8 8 8" stroke="#6941c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="10" y="62" width="96" height="28" rx="6" fill="#6941c6" fillOpacity="0.08" stroke="#6941c6" strokeWidth="1.2"/>
      <rect x="22" y="72" width="60" height="7" rx="3.5" fill="#b692f6" fillOpacity="0.5"/>
      <rect x="10" y="98" width="96" height="28" rx="6" fill="none" stroke="#6941c6" strokeWidth="1" opacity="0.3"/>
      <rect x="22" y="108" width="50" height="7" rx="3.5" fill="#b692f6" fillOpacity="0.25"/>
      <rect x="116" y="62" width="96" height="64" rx="8" fill="#1570EF" fillOpacity="0.06" stroke="#1570EF" strokeWidth="1.5"/>
      <circle cx="136" cy="86" r="8" fill="#1570EF" opacity="0.6"/>
      <circle cx="158" cy="86" r="8" fill="#1570EF" opacity="0.25"/>
      <circle cx="180" cy="86" r="8" fill="#1570EF" opacity="0.15"/>
      <path d="M196 86h8M200 82l4 4-4 4" stroke="#1570EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <rect x="128" y="110" width="72" height="6" rx="3" fill="#1570EF" fillOpacity="0.3"/>
    </svg>
  ),
  'feedback': (
    <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="190" height="36" rx="8" fill="#12b76a" fillOpacity="0.1" stroke="#12b76a" strokeWidth="1.5"/>
      <circle cx="30" cy="28" r="10" fill="#12b76a" opacity="0.7"/>
      <path d="M24 28l4 4 7-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="48" y="22" width="80" height="7" rx="3.5" fill="#12b76a" fillOpacity="0.5"/>
      <rect x="48" y="34" width="55" height="5" rx="2.5" fill="#12b76a" fillOpacity="0.3"/>
      <rect x="10" y="56" width="190" height="36" rx="8" fill="#f79009" fillOpacity="0.1" stroke="#f79009" strokeWidth="1.5"/>
      <path d="M30 68l-10 17h20l-10-17z" stroke="#f79009" strokeWidth="1.5" strokeLinejoin="round" fill="#f79009" fillOpacity="0.5"/>
      <rect x="28.5" y="72" width="3" height="7" rx="1.5" fill="white"/>
      <circle cx="30" cy="82" r="1.5" fill="white"/>
      <rect x="48" y="68" width="80" height="7" rx="3.5" fill="#f79009" fillOpacity="0.5"/>
      <rect x="48" y="80" width="55" height="5" rx="2.5" fill="#f79009" fillOpacity="0.3"/>
      <rect x="10" y="102" width="190" height="36" rx="8" fill="#f04438" fillOpacity="0.08" stroke="#f04438" strokeWidth="1.5"/>
      <circle cx="30" cy="120" r="10" fill="#f04438" opacity="0.6"/>
      <path d="M26 116l8 8M34 116l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <rect x="48" y="114" width="80" height="7" rx="3.5" fill="#f04438" fillOpacity="0.5"/>
      <rect x="48" y="126" width="55" height="5" rx="2.5" fill="#f04438" fillOpacity="0.3"/>
    </svg>
  ),
  'data': (
    <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="100" height="60" rx="10" fill="#1570EF" fillOpacity="0.07" stroke="#1570EF" strokeWidth="1.5"/>
      <rect x="24" y="24" width="16" height="32" rx="4" fill="#1570EF" opacity="0.3"/>
      <rect x="46" y="30" width="16" height="26" rx="4" fill="#1570EF" opacity="0.5"/>
      <rect x="68" y="18" width="16" height="38" rx="4" fill="#1570EF" opacity="0.7"/>
      <rect x="90" y="36" width="10" height="20" rx="4" fill="#1570EF" opacity="0.4"/>
      <circle cx="28" cy="92" r="18" fill="#6941c6" opacity="0.2" stroke="#6941c6" strokeWidth="1.5"/>
      <circle cx="28" cy="86" r="7" fill="#6941c6" opacity="0.6"/>
      <path d="M14 104a14 14 0 0 1 28 0" stroke="#6941c6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <circle cx="68" cy="92" r="18" fill="#12b76a" opacity="0.15" stroke="#12b76a" strokeWidth="1.5"/>
      <circle cx="68" cy="86" r="7" stroke="#12b76a" strokeWidth="1.5" fill="none"/>
      <path d="M54 104a14 14 0 0 1 28 0" stroke="#12b76a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <rect x="120" y="10" width="92" height="130" rx="10" fill="#f79009" fillOpacity="0.06" stroke="#f79009" strokeWidth="1.5"/>
      <rect x="130" y="22" width="40" height="7" rx="3.5" fill="#f79009" fillOpacity="0.5"/>
      <rect x="130" y="36" width="72" height="1.5" rx="1" fill="#f79009" fillOpacity="0.2"/>
      {[0,1,2,3,4].map(i => (
        <React.Fragment key={i}>
          <rect x="130" y={48+i*16} width={30+i*8} height="7" rx="3.5" fill="#f79009" fillOpacity={0.15+i*0.08}/>
        </React.Fragment>
      ))}
    </svg>
  ),
  'token': (
    <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="54" cy="54" r="32" fill="#6941c6" opacity="0.8"/>
      <circle cx="90" cy="54" r="32" fill="#1570EF" opacity="0.8"/>
      <circle cx="54" cy="90" r="32" fill="#12b76a" opacity="0.8"/>
      <circle cx="90" cy="90" r="32" fill="#f79009" opacity="0.8"/>
      <rect x="134" y="20" width="3" height="110" rx="1.5" fill="#9d9dad" opacity="0.3"/>
      <text x="148" y="80" fontFamily="Inter, sans-serif" fontSize="72" fontWeight="800" fill="currentColor" opacity="0.12">A</text>
      <rect x="148" y="28" width="56" height="8" rx="4" fill="#29294c" fillOpacity="0.35"/>
      <rect x="148" y="44" width="42" height="6" rx="3" fill="#29294c" fillOpacity="0.2"/>
      <rect x="148" y="58" width="50" height="6" rx="3" fill="#29294c" fillOpacity="0.15"/>
    </svg>
  ),
  'utility': (
    <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="70" r="44" stroke="#6941c6" strokeWidth="2" fill="#6941c6" fillOpacity="0.07"/>
      <circle cx="80" cy="60" r="18" stroke="#6941c6" strokeWidth="2" fill="#6941c6" fillOpacity="0.15"/>
      <path d="M94 74l20 20" stroke="#6941c6" strokeWidth="3" strokeLinecap="round"/>
      <rect x="144" y="20" width="68" height="20" rx="6" fill="#1570EF" fillOpacity="0.1" stroke="#1570EF" strokeWidth="1.2"/>
      <rect x="154" y="27" width="38" height="6" rx="3" fill="#1570EF" opacity="0.5"/>
      <rect x="144" y="48" width="68" height="20" rx="6" fill="#1570EF" fillOpacity="0.1" stroke="#1570EF" strokeWidth="1.2"/>
      <rect x="154" y="55" width="28" height="6" rx="3" fill="#1570EF" opacity="0.4"/>
      <rect x="144" y="76" width="68" height="20" rx="6" fill="#6941c6" fillOpacity="0.15" stroke="#6941c6" strokeWidth="1.5"/>
      <rect x="154" y="83" width="46" height="6" rx="3" fill="#6941c6" opacity="0.6"/>
      <rect x="144" y="104" width="68" height="20" rx="6" fill="#1570EF" fillOpacity="0.06" stroke="#1570EF" strokeWidth="1" opacity="0.5"/>
      <rect x="154" y="111" width="32" height="6" rx="3" fill="#1570EF" opacity="0.25"/>
    </svg>
  ),
  'default': (
    <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="80" height="80" rx="16" fill="#6941c6" fillOpacity="0.12" stroke="#6941c6" strokeWidth="1.5"/>
      <rect x="36" y="36" width="48" height="48" rx="10" fill="#6941c6" fillOpacity="0.2"/>
      <rect x="48" y="48" width="24" height="24" rx="6" fill="#6941c6" opacity="0.6"/>
      <circle cx="164" cy="50" r="36" fill="#1570EF" fillOpacity="0.1" stroke="#1570EF" strokeWidth="1.5"/>
      <circle cx="164" cy="50" r="20" fill="#1570EF" fillOpacity="0.2"/>
      <circle cx="164" cy="50" r="8" fill="#1570EF" opacity="0.7"/>
      <path d="M40 120h140" stroke="#12b76a" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <circle cx="60" cy="120" r="6" fill="#12b76a" opacity="0.7"/>
      <circle cx="110" cy="120" r="6" fill="#12b76a" opacity="0.4"/>
      <circle cx="160" cy="120" r="6" fill="#12b76a" opacity="0.2"/>
    </svg>
  ),

  'rating': (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 5 stars — 3 filled, 2 empty */}
      {[20, 52, 84, 116, 148].map((cx, i) => (
        <polygon key={i}
          points={starPolygonPoints(cx, 46, 16, 7)}
          fill={i < 3 ? '#f79009' : 'none'}
          stroke={i < 3 ? '#f79009' : '#d0cce6'}
          strokeWidth="1.5"
          opacity={i < 3 ? 0.9 : 0.55}
        />
      ))}
      {/* Progress track */}
      <rect x="20" y="80" width="160" height="8" rx="4" fill="#f79009" opacity="0.18"/>
      <rect x="20" y="80" width="96" height="8" rx="4" fill="#f79009" opacity="0.8"/>
      {/* Score pill */}
      <rect x="148" y="74" width="32" height="20" rx="6" fill="#f79009" opacity="0.15"/>
      <text x="159" y="88" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#f79009" opacity="0.9">3.0</text>
    </svg>
  ),

  'toggle': (
    <svg viewBox="0 0 210 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ON */}
      <rect x="10" y="16" width="64" height="30" rx="15" fill="#12b76a" opacity="0.9"/>
      <circle cx="59" cy="31" r="11" fill="white"/>
      <rect x="86" y="22" width="88" height="8" rx="4" fill="#29294c" opacity="0.35"/>
      <rect x="86" y="35" width="62" height="6" rx="3" fill="#9d9dad" opacity="0.3"/>
      {/* OFF */}
      <rect x="10" y="64" width="64" height="30" rx="15" fill="#e5e7eb"/>
      <rect x="10" y="64" width="64" height="30" rx="15" stroke="#d0cce6" strokeWidth="1.5" fill="none"/>
      <circle cx="29" cy="79" r="11" fill="white" stroke="#d0cce6" strokeWidth="1"/>
      <rect x="86" y="70" width="88" height="8" rx="4" fill="#29294c" opacity="0.35"/>
      <rect x="86" y="83" width="50" height="6" rx="3" fill="#9d9dad" opacity="0.3"/>
      {/* Indeterminate / purple */}
      <rect x="10" y="112" width="64" height="30" rx="15" fill="#6941c6" opacity="0.75"/>
      <circle cx="59" cy="127" r="11" fill="white" opacity="0.85"/>
      <rect x="86" y="118" width="88" height="8" rx="4" fill="#29294c" opacity="0.2"/>
      <rect x="86" y="131" width="40" height="6" rx="3" fill="#9d9dad" opacity="0.2"/>
    </svg>
  ),
};

function getIllustration(title: string): React.ReactElement {
  const lower = title.toLowerCase();
  /* ── Specific component matches (checked before generic categories) ── */
  if (lower.includes('rating')) return ILLUSTRATIONS['rating'];
  if (lower.includes('toggle') || lower.includes('switch')) return ILLUSTRATIONS['toggle'];
  /* ── Category matches ─────────────────────────────────────────────── */
  if (lower.includes('form') || lower.includes('input') || lower.includes('checkbox') ||
      lower.includes('radio') || lower.includes('select') ||
      lower.includes('slider') || lower.includes('segment') ||
      lower.includes('calendar') || lower.includes('upload') || lower.includes('textarea') || lower.includes('dropdown')) {
    return ILLUSTRATIONS['form'];
  }
  if (lower.includes('layout') || lower.includes('button') || lower.includes('card') ||
      lower.includes('divider') || lower.includes('carousel')) {
    return ILLUSTRATIONS['layout'];
  }
  if (lower.includes('navigation') || lower.includes('tabs') || lower.includes('accordion') ||
      lower.includes('pagination') || lower.includes('breadcrumb')) {
    return ILLUSTRATIONS['navigation'];
  }
  if (lower.includes('feedback') || lower.includes('alert') || lower.includes('modal') ||
      lower.includes('spinner') || lower.includes('tooltip') || lower.includes('empty') || lower.includes('stepper')) {
    return ILLUSTRATIONS['feedback'];
  }
  if (lower.includes('data') || lower.includes('avatar') || lower.includes('table') ||
      lower.includes('tag') || lower.includes('progress') || lower.includes('steps') || lower.includes('stat')) {
    return ILLUSTRATIONS['data'];
  }
  if (lower.includes('token') || lower.includes('color') || lower.includes('typog') ||
      lower.includes('spacing') || lower.includes('shadow') || lower.includes('style')) {
    return ILLUSTRATIONS['token'];
  }
  if (lower.includes('util') || lower.includes('autocomplete') || lower.includes('toast') ||
      lower.includes('listbox') || lower.includes('label')) {
    return ILLUSTRATIONS['utility'];
  }
  return ILLUSTRATIONS['default'];
}

/* ─── Breadcrumb ──────────────────────────────────────────────── */
function Breadcrumb() {
  try {
    const { preparedMeta } = useOf('meta', ['meta']) as any;
    const title: string = preparedMeta?.title ?? '';
    const parts = title.split('/').map((s: string) => s.trim()).filter(Boolean);
    if (parts.length < 1) return null;

    const goHome = (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        const base = window.parent.location.pathname;
        window.parent.location.href = `${base}?path=/docs/pulse-design-system--docs`;
      } catch {}
    };

    type BCPart = { label: string; clickable: boolean; onClick?: (e: React.MouseEvent) => void };
    const allParts: BCPart[] = [{ label: 'Home', clickable: true, onClick: goHome }, ...parts.map((p) => ({ label: p, clickable: false }))];

    return React.createElement(
      'nav',
      { className: 'pulse-breadcrumb', 'aria-label': 'breadcrumb' },
      allParts.flatMap((item, i) => {
        const els: React.ReactElement[] = [];
        if (i > 0) {
          els.push(React.createElement('span', { key: `sep-${i}`, className: 'pulse-breadcrumb-sep', style: { fontSize: '13px', fontWeight: 400, lineHeight: 1 } as React.CSSProperties }, '/'));
        }
        const partStyle: React.CSSProperties = { fontSize: '13px', fontWeight: 500, lineHeight: 1 };
        els.push(React.createElement(
          item.clickable ? 'a' : 'span',
          {
            key: `part-${i}`,
            className: i === allParts.length - 1 ? 'pulse-breadcrumb-current' : 'pulse-breadcrumb-parent',
            style: partStyle,
            ...(item.clickable && item.onClick ? { href: '#', onClick: item.onClick } : {}),
          },
          item.label
        ));
        return els;
      })
    );
  } catch {
    return null;
  }
}

/* ─── Auto-subtitle from meta title ──────────────────────────── */
function ComponentSubtitle() {
  try {
    const { preparedMeta } = useOf('meta', ['meta']) as any;
    const explicit: string | undefined =
      preparedMeta?.parameters?.docs?.description?.component ||
      preparedMeta?.parameters?.docs?.subtitle;
    if (explicit) {
      return React.createElement('p', { className: 'pulse-docs-subtitle' }, explicit);
    }
    const title: string = preparedMeta?.title ?? '';
    const name = title.split('/').pop() ?? '';
    if (!name) return null;
    return React.createElement(
      'p',
      { className: 'pulse-docs-subtitle' },
      `Reusable ${name} component — part of the Pulse Design System.`
    );
  } catch {
    return null;
  }
}

/* ─── Changelog data ───────────────────────────────────────────── */
type ChangeType = 'new' | 'fix' | 'improved' | 'breaking';
interface ChangeEntry { type: ChangeType; text: string; }
interface Release { version: string; date: string; changes: ChangeEntry[]; }

const CHANGELOG: Release[] = [
  {
    version: 'v1.6.0', date: 'Apr 26, 2026 · 14:00',
    changes: [
      { type: 'new',      text: 'Component header with large title, description and category illustration' },
      { type: 'new',      text: 'Breadcrumb with Home link on every component docs page' },
      { type: 'new',      text: 'Fullscreen icon button on every story card — opens story in canvas view' },
      { type: 'new',      text: 'Sidebar hidden by default; toggle with S or the sidebar button' },
      { type: 'new',      text: 'Spacing docs page — scale table, range groups, layout principles' },
      { type: 'improved', text: 'Home page Styles section renamed from Design Tokens; added 8 new foundation cards' },
    ],
  },
  {
    version: 'v1.5.0', date: 'Apr 25, 2026 · 14:30',
    changes: [
      { type: 'new',      text: 'Docs page — Examples / Changelog tab navigation on all component pages' },
      { type: 'fix',      text: 'Radio group — single-selection enforced; OnPush CD changed to Default' },
      { type: 'fix',      text: 'Dropdown menu — items now correctly close the overlay on click' },
      { type: 'fix',      text: 'Card — stat cards stretch to equal height in 4-column grid' },
      { type: 'improved', text: 'Button Group — renamed in sidebar to appear directly after Button' },
    ],
  },
  {
    version: 'v1.4.0', date: 'Apr 25, 2026 · 11:00',
    changes: [
      { type: 'new',      text: 'Atlassian-style docs layout: story cards, section labels, controls table' },
      { type: 'new',      text: 'Dark mode toggle synced across manager shell and preview iframe' },
      { type: 'fix',      text: 'Canvas toolbar background colour in dark mode' },
    ],
  },
  {
    version: 'v1.3.0', date: 'Apr 25, 2026 · 09:00',
    changes: [
      { type: 'new',      text: 'Input component — full story set: sizes, states, icons, validation' },
      { type: 'new',      text: 'Dark theme system — CSS custom property tokens for all components' },
    ],
  },
];

const BADGE_STYLES: Record<ChangeType, React.CSSProperties> = {
  new:      { background: 'var(--ds-success-subtle)',  color: 'var(--ds-success-dark)',    border: '1px solid var(--ds-success-border)' },
  fix:      { background: 'var(--ds-danger-subtle)',   color: 'var(--ds-danger-darkest)',  border: '1px solid var(--ds-danger-border)'  },
  improved: { background: 'var(--ds-brand-light)',     color: 'var(--ds-brand-dark)',      border: '1px solid var(--ds-brand-border)'   },
  breaking: { background: 'var(--ds-warning-subtle)',  color: 'var(--ds-warning-darkest)', border: '1px solid var(--ds-warning-border)' },
};
const BADGE_LABELS: Record<ChangeType, string> = { new: 'New', fix: 'Fix', improved: 'Improved', breaking: 'Breaking' };

/* ─── Open-in-canvas icon (small diagonal arrow) ─────────────── */
const OPEN_ICON = `<svg width="9" height="9" viewBox="0 0 10 10" fill="none" style="flex-shrink:0"><path d="M1 9L9 1M9 1H4M9 1v5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ─── Main component ────────────────────────────────────────────── */
export function PulseDocsPage() {
  const [activeTab, setActiveTab] = React.useState<'interactive' | 'changelog'>('interactive');

  /* Read meta for illustration */
  let metaTitle = '';
  try {
    const { preparedMeta } = useOf('meta', ['meta']) as any;
    metaTitle = preparedMeta?.title ?? '';
  } catch {}

  /* Inject fullscreen buttons */
  React.useEffect(() => {
    if (activeTab !== 'interactive') return;

    const createBtn = (storyId: string): HTMLButtonElement => {
      const btn = document.createElement('button');
      btn.className = 'pulse-fs-btn';
      btn.title = 'Open in canvas';
      btn.setAttribute('aria-label', 'Open story in canvas');
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.innerHTML = OPEN_ICON + '<span style="margin-left:5px">Open</span>';
      Object.assign(btn.style, {
        display: 'inline-flex',
        alignItems: 'center',
        background: 'transparent',
        border: '1px solid ' + (isDark ? '#353858' : '#ddd9f4'),
        borderRadius: '20px',
        color: isDark ? '#6e7798' : '#9e9bc0',
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.03em',
        padding: '4px 12px',
        margin: '8px 0 8px 12px',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        lineHeight: '1',
        transition: 'border-color 0.15s, color 0.15s',
        outline: 'none',
        whiteSpace: 'nowrap',
      });
      btn.addEventListener('mouseenter', () => {
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        btn.style.borderColor = dark ? '#4a3c80' : '#9b77ed';
        btn.style.color = dark ? '#b39ff7' : '#7f56d9';
      });
      btn.addEventListener('mouseleave', () => {
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        btn.style.borderColor = dark ? '#353858' : '#ddd9f4';
        btn.style.color = dark ? '#6e7798' : '#9e9bc0';
      });
      btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        try { window.parent.location.href = `${window.parent.location.pathname}?path=/story/${storyId}`; } catch {}
      });
      return btn;
    };

    const tryInjectBlock = (block: HTMLElement) => {
      const anchor = block.closest<HTMLElement>('[id^="anchor--"]');
      if (!anchor) return;
      if (anchor.querySelector('.pulse-fs-btn')) return;
      const storyId = anchor.id.replace(/^anchor--/, '');
      const btn = createBtn(storyId);
      /* Place alongside the "Show code" button in its container */
      const codeToggle = anchor.querySelector<HTMLElement>('button.docblock-code-toggle');
      if (codeToggle?.parentElement) {
        codeToggle.parentElement.insertBefore(btn, codeToggle);
      } else {
        /* Fallback: right edge of h3 title bar */
        const h3 = anchor.querySelector<HTMLElement>('h3');
        if (h3) h3.appendChild(btn);
      }
    };

    const injectAll = () =>
      document.querySelectorAll<HTMLElement>('[data-story-block="true"]').forEach(tryInjectBlock);

    /* Run immediately + staggered retries */
    injectAll();
    const t1 = setTimeout(injectAll, 400);
    const t2 = setTimeout(injectAll, 1000);
    const t3 = setTimeout(injectAll, 2000);

    /* Watch for Show-code buttons and story blocks added later */
    const observer = new MutationObserver(() => injectAll());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      observer.disconnect();
    };
  }, [activeTab]);

  return (
    <div className="pulse-docs">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="pulse-docs-header">

        {/* Two-column: text left, illustration right */}
        <div className="pulse-docs-header-inner" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          paddingTop: '28px',
        }}>
          <div className="pulse-docs-header-text" style={{ flex: 1, minWidth: 0 }}>
            <Breadcrumb />
            <div className="pulse-docs-header-gap" style={{ height: '36px' }} />
            <Title />
            <ComponentSubtitle />
          </div>
          <div className="pulse-docs-header-art" aria-hidden="true" style={{
            flexShrink: 0,
            width: '160px',
            maxWidth: '160px',
            overflow: 'hidden',
            opacity: 0.85,
          }}>
            {React.cloneElement(getIllustration(metaTitle), {
              width: '100%',
              style: { display: 'block', height: 'auto' } as React.CSSProperties,
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="pulse-docs-tabs">
          <button className={`pulse-docs-tab${activeTab === 'interactive' ? ' is-active' : ''}`} onClick={() => setActiveTab('interactive')}>Interactive</button>
          <button className={`pulse-docs-tab${activeTab === 'changelog' ? ' is-active' : ''}`} onClick={() => setActiveTab('changelog')}>Changelog</button>
        </div>
      </div>

      {/* ── Interactive tab ────────────────────────────── */}
      {activeTab === 'interactive' && (
        <>
          <div className="pulse-docs-section"><Primary /><Controls /></div>
          <div className="pulse-docs-section">
            <span className="pulse-docs-label">Examples</span>
            <Stories includePrimary={false} />
          </div>
        </>
      )}

      {/* ── Changelog tab ──────────────────────────────── */}
      {activeTab === 'changelog' && (
        <div className="pulse-docs-changelog">
          {CHANGELOG.map((release) => (
            <div key={release.version} className="cl-release">
              <div className="cl-release-header">
                <span className="cl-version">{release.version}</span>
                <span className="cl-date">{release.date}</span>
              </div>
              <ul className="cl-list">
                {release.changes.map((change, i) => (
                  <li key={i} className="cl-item">
                    <span className="cl-badge" style={BADGE_STYLES[change.type]}>{BADGE_LABELS[change.type]}</span>
                    <span className="cl-text">{change.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
