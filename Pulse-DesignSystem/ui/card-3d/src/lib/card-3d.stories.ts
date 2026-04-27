import type { Meta, StoryObj } from '@storybook/angular';
import { VCard3d } from './card-3d.component';

const meta: Meta<VCard3d> = {
  title: 'Layout/Card 3D',
  component: VCard3d,
  tags: ['autodocs'],
  argTypes: {
    intensity:   { control: { type: 'range', min: 0, max: 30, step: 1 }, description: 'Max tilt angle in degrees' },
    scale:       { control: { type: 'number', step: 0.01 }, description: 'Scale factor on hover' },
    perspective: { control: { type: 'number', step: 50 }, description: 'CSS perspective depth (px)' },
  },
};
export default meta;
type Story = StoryObj<VCard3d>;

// ── Default ──────────────────────────────────────────
export const Default: Story = {
  args: { intensity: 15, scale: 1.04, perspective: 800 },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:60px;background:#f8f9fb;display:flex;align-items:center;justify-content:center;min-height:340px;">
        <v-card-3d [intensity]="intensity" [scale]="scale" [perspective]="perspective" style="width:300px;">
          <div class="card-img-placeholder" style="height:160px;background:linear-gradient(135deg,#f4ebff,#e9d5ff);"></div>
          <div class="card-body">
            <span class="card-eyebrow">Design System</span>
            <div class="card-title">Getting Started</div>
            <div class="card-desc">Learn how to install and configure Pulse DS in your project in minutes.</div>
          </div>
          <div class="card-footer">
            <span style="font-size:12px;color:#98a2b3;">5 min read</span>
            <span class="card-badge card-badge-info">New</span>
          </div>
        </v-card-3d>
      </div>
    `,
  }),
};

// ── Feature cards ────────────────────────────────────
export const FeatureCards: Story = {
  render: () => ({
    template: `
      <div style="padding:60px;background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%);display:flex;gap:24px;justify-content:center;min-height:320px;align-items:center;flex-wrap:wrap;">

        <v-card-3d style="width:240px;">
          <div class="card-body" style="gap:12px;">
            <div class="card-icon-wrap card-icon-wrap-purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="card-title">Components</div>
            <div class="card-desc">20+ accessible, production-ready components.</div>
          </div>
        </v-card-3d>

        <v-card-3d style="width:240px;">
          <div class="card-body" style="gap:12px;">
            <div class="card-icon-wrap card-icon-wrap-green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <div class="card-title">WCAG 2.1</div>
            <div class="card-desc">Full accessibility compliance built in.</div>
          </div>
        </v-card-3d>

        <v-card-3d style="width:240px;">
          <div class="card-body" style="gap:12px;">
            <div class="card-icon-wrap card-icon-wrap-blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="2"/></svg>
            </div>
            <div class="card-title">Tokens</div>
            <div class="card-desc">CSS custom properties for consistent theming.</div>
          </div>
        </v-card-3d>

      </div>
    `,
  }),
};

// ── Stat cards ───────────────────────────────────────
export const StatCards: Story = {
  render: () => ({
    template: `
      <div style="padding:60px;background:#f8f9fb;display:flex;gap:20px;justify-content:center;flex-wrap:wrap;align-items:center;">

        <v-card-3d style="width:200px;">
          <div style="padding:20px;display:flex;flex-direction:column;gap:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="stat-label">Revenue</div>
              <div class="card-icon-wrap card-icon-wrap-purple" style="width:38px;height:38px;border-radius:8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
            </div>
            <div class="stat-value" style="font-size:24px;">$48,295</div>
            <div class="stat-change stat-change-up">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
              +12.5%
            </div>
          </div>
        </v-card-3d>

        <v-card-3d style="width:200px;">
          <div style="padding:20px;display:flex;flex-direction:column;gap:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="stat-label">Users</div>
              <div class="card-icon-wrap card-icon-wrap-green" style="width:38px;height:38px;border-radius:8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
              </div>
            </div>
            <div class="stat-value" style="font-size:24px;">3,842</div>
            <div class="stat-change stat-change-up">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
              +8.2%
            </div>
          </div>
        </v-card-3d>

        <v-card-3d style="width:200px;">
          <div style="padding:20px;display:flex;flex-direction:column;gap:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="stat-label">Conversion</div>
              <div class="card-icon-wrap card-icon-wrap-orange" style="width:38px;height:38px;border-radius:8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </div>
            <div class="stat-value" style="font-size:24px;">5.27%</div>
            <div class="stat-change stat-change-down">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
              -1.1%
            </div>
          </div>
        </v-card-3d>

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
            <v-card-3d [intensity]="15" style="width:220px;">
              <div class="card-body" style="gap:10px;">
                <span class="card-eyebrow">Featured</span>
                <div class="card-title">Getting Started</div>
                <div class="card-desc">A hero spotlight for key content that deserves visual emphasis.</div>
              </div>
            </v-card-3d>
            <p class="dnd-caption">Use 3D cards for hero or spotlight content that benefits from visual emphasis on a clean, uncluttered layout.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;width:100%;">
              <v-card-3d style="width:100%;"><div class="card-body"><div class="card-title" style="font-size:11px;">Item 1</div></div></v-card-3d>
              <v-card-3d style="width:100%;"><div class="card-body"><div class="card-title" style="font-size:11px;">Item 2</div></div></v-card-3d>
              <v-card-3d style="width:100%;"><div class="card-body"><div class="card-title" style="font-size:11px;">Item 3</div></div></v-card-3d>
            </div>
            <p class="dnd-caption">Don't use 3D cards in dense lists or data-heavy grids — the tilt effect creates visual noise and competes for attention.</p>
          </div>
        </div>
      </div>
    `,
  }),
};

// ── Intensity variants ───────────────────────────────
export const IntensityVariants: Story = {
  render: () => ({
    template: `
      <div style="padding:60px;background:#f4f4f6;display:flex;gap:24px;justify-content:center;align-items:center;flex-wrap:wrap;">

        <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin:0 0 4px;">Subtle — 8°</p>
          <v-card-3d [intensity]="8" style="width:200px;">
            <div class="card-body">
              <div class="card-title">Subtle</div>
              <div class="card-desc">Gentle tilt, professional feel.</div>
            </div>
          </v-card-3d>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin:0 0 4px;">Default — 15°</p>
          <v-card-3d [intensity]="15" style="width:200px;">
            <div class="card-body">
              <div class="card-title">Default</div>
              <div class="card-desc">Balanced tilt for most UIs.</div>
            </div>
          </v-card-3d>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#98a2b3;margin:0 0 4px;">Dramatic — 25°</p>
          <v-card-3d [intensity]="25" style="width:200px;">
            <div class="card-body">
              <div class="card-title">Dramatic</div>
              <div class="card-desc">Strong tilt for visual impact.</div>
            </div>
          </v-card-3d>
        </div>

      </div>
    `,
  }),
};
