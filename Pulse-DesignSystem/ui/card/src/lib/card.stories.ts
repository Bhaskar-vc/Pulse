import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VCard } from './card.component';
import { VButton } from '@pulse-ds/ui/button';

const meta: Meta<VCard> = {
  title: 'Layout/Card',
  component: VCard,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [VButton] })],
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    clickable:{ control: 'boolean' },
    flat:     { control: 'boolean' },
    horizontal:{ control: 'boolean' },
    glass:    { control: 'boolean', description: 'Frosted glass — use on a coloured background' },
    outlined: { control: 'boolean', description: 'Border only, no shadow lift' },
    overlay:  { control: 'boolean', description: 'Image fills the card background with text overlay' },
  },
};
export default meta;
type Story = StoryObj<VCard>;

// ── Default (controls) ───────────────────────────────
export const Default: Story = {
  args: { size: 'md', selected: false, disabled: false, clickable: false, flat: false, horizontal: false, glass: false, outlined: false, overlay: false },
  render: (args) => ({
    props: args,
    template: `
      <v-card [size]="size" [selected]="selected" [disabled]="disabled"
              [clickable]="clickable" [flat]="flat" [horizontal]="horizontal"
              [glass]="glass" [outlined]="outlined" style="max-width:320px;">
        <div class="card-body">
          <span class="card-eyebrow">Design System</span>
          <div class="card-title">Getting Started</div>
          <div class="card-desc">Learn how to install and configure Pulse DS in your project in minutes.</div>
        </div>
        <div class="card-footer">
          <span class="card-meta">5 min read</span>
        </div>
      </v-card>
    `,
  }),
};

// ── Overview — 3 basic cards ─────────────────────────
export const Overview: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;">

        <v-card>
          <div class="card-body">
            <span class="card-eyebrow">Design System</span>
            <div class="card-title">Getting Started</div>
            <div class="card-desc">Learn how to install and configure Pulse DS in your project in minutes.</div>
          </div>
          <div class="card-footer">
            <span class="card-meta">5 min read</span>
          </div>
        </v-card>

        <v-card>
          <div class="card-body">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
              <span class="card-eyebrow">Release</span>
              <span class="card-badge card-badge-success">v1.0.0</span>
            </div>
            <div class="card-title">Component Library</div>
            <div class="card-desc">Over 20 production-ready components with full accessibility support built in.</div>
          </div>
          <div class="card-footer">
            <span class="card-meta">Updated today</span>
          </div>
        </v-card>

        <v-card>
          <div class="card-body">
            <span class="card-eyebrow">Tutorial</span>
            <div class="card-title">Design Tokens in Practice</div>
            <div class="card-desc">A deep dive into how Pulse DS uses CSS custom properties for consistent theming.</div>
          </div>
          <div class="card-footer">
            <div class="card-author">
              <div class="card-avatar">JL</div>
              <div>
                <div class="card-author-name">Jordan Lee</div>
                <div class="card-meta">Mar 19, 2026</div>
              </div>
            </div>
          </div>
        </v-card>

      </div>
    `,
  }),
};

// ── Image cards (badge on image — Flowbite) ──────────
export const ImageCards: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;">

        <v-card>
          <div class="card-media">
            <div class="card-img-placeholder"></div>
            <span class="card-media-badge card-badge card-badge-info">Design</span>
          </div>
          <div class="card-body">
            <div class="card-title">Visual Systems</div>
            <div class="card-desc">A guide to building cohesive visual systems that scale across products.</div>
          </div>
          <div class="card-actions">
            <v-button variant="ghost" color="primary" size="sm">Read more →</v-button>
          </div>
        </v-card>

        <v-card>
          <div class="card-media">
            <div class="card-img-placeholder"></div>
            <span class="card-media-badge card-badge card-badge-warning">Workshop</span>
            <span class="card-media-badge-tr card-badge card-badge-neutral">12 min</span>
          </div>
          <div class="card-body">
            <div class="card-title">Accessibility First</div>
            <div class="card-desc">Building inclusive interfaces from the ground up, not as an afterthought.</div>
          </div>
          <div class="card-actions">
            <v-button variant="ghost" color="primary" size="sm">Read more →</v-button>
          </div>
        </v-card>

        <v-card>
          <div class="card-media">
            <div class="card-img-placeholder"></div>
            <span class="card-media-badge card-badge card-badge-success">New</span>
          </div>
          <div class="card-body">
            <div class="card-title">Token Architecture</div>
            <div class="card-desc">How to structure design tokens for maintainability across multiple themes.</div>
          </div>
          <div class="card-actions">
            <v-button variant="ghost" color="primary" size="sm">Read more →</v-button>
          </div>
        </v-card>

      </div>
    `,
  }),
};

// ── Image Overlay — image-full (DaisyUI) ─────────────
export const ImageOverlay: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;">

        <v-card [overlay]="true" style="min-height:300px;">
          <div class="card-overlay-bg-gradient" style="background:linear-gradient(135deg,#0f172a 0%,#1e40af 100%);"></div>
          <div class="card-overlay-body">
            <span class="card-badge card-badge-info" style="margin-bottom:10px;display:inline-flex;">Tutorial</span>
            <div class="card-title-lg">Component Library</div>
            <div class="card-desc" style="margin-top:6px;">20+ production-ready components with built-in accessibility.</div>
          </div>
        </v-card>

        <v-card [overlay]="true" style="min-height:300px;">
          <div class="card-overlay-bg-gradient" style="background:linear-gradient(135deg,#29294c 0%,#6941c6 100%);"></div>
          <div class="card-overlay-body">
            <span class="card-badge card-badge-success" style="margin-bottom:10px;display:inline-flex;">Live</span>
            <div class="card-title-lg">Design Tokens</div>
            <div class="card-desc" style="margin-top:6px;">A robust token system using CSS custom properties for theming.</div>
          </div>
        </v-card>

        <v-card [overlay]="true" style="min-height:300px;">
          <div class="card-overlay-bg-gradient" style="background:linear-gradient(135deg,#064e3b 0%,#059669 100%);"></div>
          <div class="card-overlay-body">
            <span class="card-badge card-badge-warning" style="margin-bottom:10px;display:inline-flex;">Beta</span>
            <div class="card-title-lg">WCAG Compliance</div>
            <div class="card-desc" style="margin-top:6px;">All components meet WCAG 2.1 AA standards out of the box.</div>
          </div>
        </v-card>

      </div>
    `,
  }),
};

// ── Product cards (Flowbite e-commerce) ──────────────
export const ProductCards: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;">

        <v-card [clickable]="true">
          <div class="card-media">
            <div class="card-img-placeholder" style="height:200px;background:linear-gradient(135deg,#f4ebff,#e9d5ff);"></div>
            <span class="card-media-badge card-badge card-badge-success">Sale</span>
          </div>
          <div class="card-body">
            <div class="card-eyebrow">Components</div>
            <div class="card-title">Button Group Kit</div>
            <div class="card-rating">
              <span class="card-rating-stars">★★★★★</span>
              <span>4.9</span>
              <span class="card-rating-count">(128 reviews)</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;margin-top:4px;">
              <div class="card-price">$29<span class="card-price-period">/mo</span></div>
              <span class="card-price-old">$49</span>
              <span class="card-price-badge">40% off</span>
            </div>
          </div>
          <div class="card-actions">
            <v-button variant="solid" color="primary" size="sm" style="flex:1;">Add to cart</v-button>
          </div>
        </v-card>

        <v-card [clickable]="true">
          <div class="card-media">
            <div class="card-img-placeholder" style="height:200px;background:linear-gradient(135deg,#ecfdf3,#a7f3d0);"></div>
          </div>
          <div class="card-body">
            <div class="card-eyebrow">Icon Pack</div>
            <div class="card-title">Pulse Icon Set</div>
            <div class="card-rating">
              <span class="card-rating-stars">★★★★☆</span>
              <span>4.3</span>
              <span class="card-rating-count">(84 reviews)</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;margin-top:4px;">
              <div class="card-price">$12</div>
              <span class="card-price-badge">New</span>
            </div>
          </div>
          <div class="card-actions">
            <v-button variant="solid" color="primary" size="sm" style="flex:1;">Add to cart</v-button>
          </div>
        </v-card>

        <v-card [clickable]="true">
          <div class="card-media">
            <div class="card-img-placeholder" style="height:200px;background:linear-gradient(135deg,#e0f2fe,#bae6fd);"></div>
            <span class="card-media-badge-tr card-badge card-badge-warning">Hot</span>
          </div>
          <div class="card-body">
            <div class="card-eyebrow">Templates</div>
            <div class="card-title">Dashboard Pro</div>
            <div class="card-rating">
              <span class="card-rating-stars">★★★★★</span>
              <span>5.0</span>
              <span class="card-rating-count">(211 reviews)</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;margin-top:4px;">
              <div class="card-price">$79<span class="card-price-period">/yr</span></div>
            </div>
          </div>
          <div class="card-actions">
            <v-button variant="solid" color="primary" size="sm" style="flex:1;">Add to cart</v-button>
          </div>
        </v-card>

      </div>
    `,
  }),
};

// ── Pricing cards (Flowbite / DaisyUI) ───────────────
export const PricingCards: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;">

        <!-- Starter -->
        <v-card [outlined]="true">
          <div class="card-body">
            <div class="card-eyebrow">Starter</div>
            <div class="card-price" style="font-size:32px;margin:8px 0 4px;">
              $0
              <span class="card-price-period">/month</span>
            </div>
            <div class="card-desc" style="margin-bottom:20px;">Perfect for individuals and small side-projects.</div>
            <div class="card-divider" style="margin-bottom:20px;"></div>
            <ul class="card-feature-list">
              <li class="card-feature-item">
                <svg class="card-feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                3 projects
              </li>
              <li class="card-feature-item">
                <svg class="card-feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                5 GB storage
              </li>
              <li class="card-feature-item card-feature-item--off">
                <svg class="card-feature-x" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                Team collaboration
              </li>
              <li class="card-feature-item card-feature-item--off">
                <svg class="card-feature-x" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                Priority support
              </li>
            </ul>
          </div>
          <div class="card-footer" style="background:transparent;border-top:none;padding-top:0;">
            <v-button variant="outlined" color="primary" style="width:100%;">Get started</v-button>
          </div>
        </v-card>

        <!-- Pro — highlighted -->
        <v-card style="border-color:#7f56d9;box-shadow:0 0 0 3px rgba(127,86,217,.12);">
          <div class="card-body">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="card-eyebrow">Pro</div>
              <span class="card-badge card-badge-info">Most popular</span>
            </div>
            <div class="card-price" style="font-size:32px;margin:8px 0 4px;">
              $29
              <span class="card-price-period">/month</span>
            </div>
            <div class="card-desc" style="margin-bottom:20px;">For growing teams that need more power.</div>
            <div class="card-divider" style="margin-bottom:20px;"></div>
            <ul class="card-feature-list">
              <li class="card-feature-item">
                <svg class="card-feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Unlimited projects
              </li>
              <li class="card-feature-item">
                <svg class="card-feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                100 GB storage
              </li>
              <li class="card-feature-item">
                <svg class="card-feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Team collaboration
              </li>
              <li class="card-feature-item card-feature-item--off">
                <svg class="card-feature-x" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                Priority support
              </li>
            </ul>
          </div>
          <div class="card-footer" style="background:transparent;border-top:none;padding-top:0;">
            <v-button variant="solid" color="primary" style="width:100%;">Get Pro</v-button>
          </div>
        </v-card>

        <!-- Enterprise -->
        <v-card [outlined]="true">
          <div class="card-body">
            <div class="card-eyebrow">Enterprise</div>
            <div class="card-price" style="font-size:32px;margin:8px 0 4px;">
              $99
              <span class="card-price-period">/month</span>
            </div>
            <div class="card-desc" style="margin-bottom:20px;">Advanced controls and dedicated support for large orgs.</div>
            <div class="card-divider" style="margin-bottom:20px;"></div>
            <ul class="card-feature-list">
              <li class="card-feature-item">
                <svg class="card-feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Unlimited everything
              </li>
              <li class="card-feature-item">
                <svg class="card-feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                1 TB storage
              </li>
              <li class="card-feature-item">
                <svg class="card-feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Team collaboration
              </li>
              <li class="card-feature-item">
                <svg class="card-feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Priority support
              </li>
            </ul>
          </div>
          <div class="card-footer" style="background:transparent;border-top:none;padding-top:0;">
            <v-button variant="outlined" color="primary" style="width:100%;">Contact sales</v-button>
          </div>
        </v-card>

      </div>
    `,
  }),
};

// ── Expandable card (MUI) ────────────────────────────
export const ExpandableCard: Story = {
  render: () => ({
    template: `
      <div style="max-width:360px;">
        <v-card>
          <div class="card-body" style="gap:4px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <div class="card-avatar" style="background:#f4ebff;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#6941c6"/></svg>
              </div>
              <div>
                <div class="card-author-name">Shrimp and Chorizo Paella</div>
                <div class="card-meta">September 14, 2016</div>
              </div>
            </div>
          </div>
          <div class="card-img-placeholder" style="height:200px;background:linear-gradient(135deg,#fff1f2,#fce7f3);"></div>
          <div class="card-body" style="padding-top:14px;padding-bottom:0;">
            <div class="card-desc">This impressive paella is a perfect party dish and a fun meal to cook together with your guests.</div>
          </div>
          <div class="card-footer" style="background:transparent;">
            <button id="expand-btn" class="card-expand-btn" onclick="
              const btn = document.getElementById('expand-btn');
              const body = document.getElementById('expand-body');
              btn.classList.toggle('is-open');
              body.classList.toggle('is-open');
              btn.querySelector('span').textContent = btn.classList.contains('is-open') ? 'Show less' : 'Learn more';
            ">
              <span>Learn more</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div id="expand-body" class="card-expand-body">
            <div class="card-desc">
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes. Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.
            </div>
          </div>
        </v-card>
      </div>
    `,
  }),
};

// ── Glass cards (DaisyUI glass) ───────────────────────
export const GlassCards: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;padding:32px;background:linear-gradient(135deg,#6941c6 0%,#29294c 100%);border-radius:16px;">

        <v-card [glass]="true">
          <div class="card-body">
            <div class="card-icon-wrap card-icon-wrap-purple" style="background:rgba(255,255,255,0.2);color:#fff;margin-bottom:4px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="card-title" style="color:#fff;">Component Library</div>
            <div class="card-desc" style="color:rgba(255,255,255,.7);">20+ production-ready components with built-in accessibility.</div>
          </div>
        </v-card>

        <v-card [glass]="true">
          <div class="card-body">
            <div class="card-icon-wrap" style="background:rgba(255,255,255,0.2);color:#fff;margin-bottom:4px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <div class="card-title" style="color:#fff;">WCAG Compliant</div>
            <div class="card-desc" style="color:rgba(255,255,255,.7);">All components meet WCAG 2.1 AA standards out of the box.</div>
          </div>
        </v-card>

        <v-card [glass]="true">
          <div class="card-body">
            <div class="card-icon-wrap" style="background:rgba(255,255,255,0.2);color:#fff;margin-bottom:4px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="2"/></svg>
            </div>
            <div class="card-title" style="color:#fff;">Design Tokens</div>
            <div class="card-desc" style="color:rgba(255,255,255,.7);">A robust token system using CSS custom properties for theming.</div>
          </div>
        </v-card>

      </div>
    `,
  }),
};

// ── Stat / Metric cards ──────────────────────────────
export const StatCards: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:900px;">

        <v-card>
          <div class="stat-card">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="stat-label">Total Revenue</div>
              <div class="card-icon-wrap card-icon-wrap-purple">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
            </div>
            <div class="stat-value">$48,295</div>
            <div class="stat-change stat-change-up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
              12.5% from last month
            </div>
          </div>
        </v-card>

        <v-card>
          <div class="stat-card">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="stat-label">Active Users</div>
              <div class="card-icon-wrap card-icon-wrap-green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
            </div>
            <div class="stat-value">3,842</div>
            <div class="stat-change stat-change-up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
              8.2% from last week
            </div>
          </div>
        </v-card>

        <v-card>
          <div class="stat-card">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="stat-label">Conversion Rate</div>
              <div class="card-icon-wrap card-icon-wrap-blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </div>
            <div class="stat-value">5.27%</div>
            <div class="stat-change stat-change-down">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
              1.1% from last week
            </div>
          </div>
        </v-card>

        <v-card>
          <div class="stat-card">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="stat-label">Avg. Session</div>
              <div class="card-icon-wrap card-icon-wrap-orange">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
            </div>
            <div class="stat-value">4m 32s</div>
            <div class="stat-change stat-change-up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
              3.7% from last month
            </div>
          </div>
        </v-card>

      </div>
    `,
  }),
};

// ── Feature cards ────────────────────────────────────
export const FeatureCards: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;">

        <v-card>
          <div class="card-body">
            <div class="card-icon-wrap card-icon-wrap-purple" style="margin-bottom:8px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="card-title">Component Library</div>
            <div class="card-desc">20+ production-ready components with built-in accessibility and keyboard navigation.</div>
          </div>
        </v-card>

        <v-card>
          <div class="card-body">
            <div class="card-icon-wrap card-icon-wrap-green" style="margin-bottom:8px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <div class="card-title">WCAG Compliant</div>
            <div class="card-desc">All components meet WCAG 2.1 AA standards. Focus rings, ARIA, and keyboard support out of the box.</div>
          </div>
        </v-card>

        <v-card>
          <div class="card-body">
            <div class="card-icon-wrap card-icon-wrap-blue" style="margin-bottom:8px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="2"/></svg>
            </div>
            <div class="card-title">Design Tokens</div>
            <div class="card-desc">A robust token system using CSS custom properties for colors, spacing, typography, and more.</div>
          </div>
        </v-card>

      </div>
    `,
  }),
};

// ── Horizontal cards ─────────────────────────────────
export const HorizontalCards: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:780px;">

        <v-card [horizontal]="true">
          <div class="card-img-col">
            <div class="card-img-placeholder" style="height:100%;min-height:120px;background:linear-gradient(135deg,#f4ebff,#e9d5ff);"></div>
          </div>
          <div class="card-body">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="card-eyebrow">Tutorial</span>
              <span class="card-badge card-badge-success">New</span>
            </div>
            <div class="card-title">Composing Layouts with Grid</div>
            <div class="card-desc">Learn how to create responsive, flexible layouts using CSS Grid and Pulse DS layout utilities.</div>
            <div class="card-meta" style="margin-top:4px;">
              <span>Jordan Lee</span>
              <span class="card-meta-dot"></span>
              <span>Mar 19, 2026</span>
              <span class="card-meta-dot"></span>
              <span>8 min read</span>
            </div>
          </div>
        </v-card>

        <v-card [horizontal]="true">
          <div class="card-img-col">
            <div class="card-img-placeholder" style="height:100%;min-height:120px;background:linear-gradient(135deg,#ecfdf3,#a7f3d0);"></div>
          </div>
          <div class="card-body">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="card-eyebrow">Deep Dive</span>
              <span class="card-badge card-badge-neutral">Intermediate</span>
            </div>
            <div class="card-title">Advanced Typography Scale</div>
            <div class="card-desc">A step-by-step guide to defining a robust type scale using modular ratios and design tokens.</div>
            <div class="card-meta" style="margin-top:4px;">
              <span>Riley Kim</span>
              <span class="card-meta-dot"></span>
              <span>Apr 2, 2026</span>
              <span class="card-meta-dot"></span>
              <span>12 min read</span>
            </div>
          </div>
        </v-card>

      </div>
    `,
  }),
};

// ── Profile cards ────────────────────────────────────
export const ProfileCards: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:720px;">

        <v-card>
          <div class="card-body-center" style="padding-top:32px;">
            <div class="card-avatar card-avatar-lg">JL</div>
            <div class="card-title">Jordan Lee</div>
            <div class="card-desc" style="font-size:13px;">Senior Product Designer</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">
              <span class="chip">UI Systems</span>
              <span class="chip">Figma</span>
              <span class="chip">A11y</span>
            </div>
          </div>
          <div class="card-footer" style="justify-content:center;">
            <v-button variant="outlined" color="primary" size="sm">Message</v-button>
            <v-button variant="solid"    color="primary" size="sm">View Profile</v-button>
          </div>
        </v-card>

        <v-card>
          <div class="card-body-center" style="padding-top:32px;">
            <div class="card-avatar card-avatar-lg" style="background:#fdf2fa;color:#c11574;">AM</div>
            <div class="card-title">Alex Morgan</div>
            <div class="card-desc" style="font-size:13px;">Frontend Engineer</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">
              <span class="chip">React</span>
              <span class="chip">TypeScript</span>
              <span class="chip">CSS</span>
            </div>
          </div>
          <div class="card-footer" style="justify-content:center;">
            <v-button variant="outlined" color="primary" size="sm">Message</v-button>
            <v-button variant="solid"    color="primary" size="sm">View Profile</v-button>
          </div>
        </v-card>

        <v-card>
          <div class="card-body-center" style="padding-top:32px;">
            <div class="card-avatar card-avatar-lg" style="background:#ecfdf3;color:#039855;">RK</div>
            <div class="card-title">Riley Kim</div>
            <div class="card-desc" style="font-size:13px;">Design Systems Lead</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">
              <span class="chip">Tokens</span>
              <span class="chip">Storybook</span>
              <span class="chip">QA</span>
            </div>
          </div>
          <div class="card-footer" style="justify-content:center;">
            <v-button variant="outlined" color="primary" size="sm">Message</v-button>
            <v-button variant="solid"    color="primary" size="sm">View Profile</v-button>
          </div>
        </v-card>

      </div>
    `,
  }),
};

// ── Sizes ────────────────────────────────────────────
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:380px;">
        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin-bottom:10px;">Small</p>
          <v-card size="sm">
            <div class="card-body">
              <span class="card-eyebrow">Component</span>
              <div class="card-title-sm">Small Card</div>
              <div class="card-desc">Compact layout for dense UIs.</div>
            </div>
          </v-card>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin-bottom:10px;">Medium (default)</p>
          <v-card size="md">
            <div class="card-body">
              <span class="card-eyebrow">Component</span>
              <div class="card-title">Medium Card</div>
              <div class="card-desc">Standard card for most content types.</div>
            </div>
          </v-card>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin-bottom:10px;">Large</p>
          <v-card size="lg">
            <div class="card-body">
              <span class="card-eyebrow">Component</span>
              <div class="card-title-lg">Large Card</div>
              <div class="card-desc">Featured content or hero sections.</div>
            </div>
          </v-card>
        </div>
      </div>
    `,
  }),
};

export const DoAndDont: Story = {
  render: () => ({
    template: `
      <div class="dnd-wrap">
        <div class="dnd-do">
          <div class="dnd-do-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Do
          </div>
          <div class="dnd-do-body">
            <v-card style="max-width:280px;">
              <div class="card-body">
                <span class="card-eyebrow">Tutorial</span>
                <div class="card-title">Design Tokens</div>
                <div class="card-desc">Learn how CSS custom properties power consistent theming across Pulse DS.</div>
              </div>
              <div class="card-footer">
                <span class="card-meta">5 min read</span>
              </div>
            </v-card>
            <p class="dnd-caption">Keep card content scannable with clear hierarchy: eyebrow → title → body → single action.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-card style="max-width:280px;">
              <div class="card-body">
                <div class="card-title">Product Update</div>
                <div class="card-desc">New features added.</div>
              </div>
              <div class="card-footer" style="flex-wrap:wrap;gap:6px;">
                <v-button variant="solid" color="primary" size="sm">Read more</v-button>
                <v-button variant="outlined" color="secondary" size="sm">Share</v-button>
                <v-button variant="outlined" color="secondary" size="sm">Save</v-button>
                <v-button variant="outlined" color="danger" size="sm">Delete</v-button>
              </div>
            </v-card>
            <p class="dnd-caption">Don't overload a single card with too many actions or competing focal points — it overwhelms users.</p>
          </div>
        </div>
      </div>
    `,
  }),
};

// ── States ────────────────────────────────────────────
export const States: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:720px;">
        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin-bottom:10px;">Default</p>
          <v-card><div class="card-body"><div class="card-title">Default</div><div class="card-desc">Lifts on hover.</div></div></v-card>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin-bottom:10px;">Outlined</p>
          <v-card [outlined]="true"><div class="card-body"><div class="card-title">Outlined</div><div class="card-desc">Bold border, no shadow lift.</div></div></v-card>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin-bottom:10px;">Selected</p>
          <v-card [selected]="true"><div class="card-body"><div class="card-title">Selected</div><div class="card-desc">Purple ring.</div></div></v-card>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin-bottom:10px;">Clickable</p>
          <v-card [clickable]="true"><div class="card-body"><div class="card-title">Clickable</div><div class="card-desc">Pointer cursor, hover lift.</div></div></v-card>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin-bottom:10px;">Flat</p>
          <v-card [flat]="true"><div class="card-body"><div class="card-title">Flat</div><div class="card-desc">No hover shadow.</div></div></v-card>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin-bottom:10px;">Disabled</p>
          <v-card [disabled]="true"><div class="card-body"><div class="card-title">Disabled</div><div class="card-desc">50% opacity.</div></div></v-card>
        </div>
      </div>
    `,
  }),
};
