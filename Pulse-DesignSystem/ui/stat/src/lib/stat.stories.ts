import type { Meta, StoryObj } from '@storybook/angular';
import { VStat } from './stat.component';

const meta: Meta<VStat> = {
  title: 'Data Display/Stat',
  component: VStat,
  tags: ['autodocs'],
  argTypes: {
    title:    { control: 'text', description: 'Label above the value' },
    value:    { control: 'text', description: 'Primary metric / big number' },
    desc:     { control: 'text', description: 'Supporting text below value' },
    trend:    { control: 'text', description: 'Trend text (e.g. +12.5% from last month)' },
    trendDir: { control: 'select', options: ['up', 'down', 'neutral'], description: 'Arrow direction' },
    iconColor:{ control: 'select', options: ['none','purple','green','blue','orange','red'], description: 'Icon background colour' },
    centered: { control: 'boolean', description: 'Center-align content' },
  },
};
export default meta;
type Story = StoryObj<VStat>;

// ── Default ──────────────────────────────────────────
export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$48,295',
    trend: '+12.5% from last month',
    trendDir: 'up',
    iconColor: 'purple',
  },
  render: (args) => ({
    props: args,
    template: `
      <v-stat [title]="title" [value]="value" [trend]="trend"
              [trendDir]="trendDir" [iconColor]="iconColor" [centered]="centered"
              style="max-width:340px;">
        <svg icon width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </v-stat>
    `,
  }),
};

// ── Dashboard row (4 stats horizontal) ──────────────
export const DashboardRow: Story = {
  render: () => ({
    template: `
      <div class="stat-group" style="max-width:960px;">

        <v-stat title="Total Revenue" value="$48,295" trend="+12.5% from last month" trendDir="up" iconColor="purple">
          <svg icon width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </v-stat>

        <v-stat title="Active Users" value="3,842" trend="+8.2% from last week" trendDir="up" iconColor="green">
          <svg icon width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </v-stat>

        <v-stat title="Conversion Rate" value="5.27%" trend="-1.1% from last week" trendDir="down" iconColor="blue">
          <svg icon width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </v-stat>

        <v-stat title="Avg. Session" value="4m 32s" trend="+3.7% from last month" trendDir="up" iconColor="orange">
          <svg icon width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </v-stat>

      </div>
    `,
  }),
};

// ── Vertical group ───────────────────────────────────
export const VerticalGroup: Story = {
  render: () => ({
    template: `
      <div class="stat-group stat-group--vertical" style="max-width:380px;">

        <v-stat title="Total Downloads" value="1.2M" trend="+22% this quarter" trendDir="up" iconColor="purple">
          <svg icon width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </v-stat>

        <v-stat title="Active Licenses" value="8,490" desc="Across 340 organisations" iconColor="green">
          <svg icon width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </v-stat>

        <v-stat title="Open Issues" value="24" trend="-6 since last week" trendDir="down" iconColor="red">
          <svg icon width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </v-stat>

      </div>
    `,
  }),
};

// ── Centered (DaisyUI style) ─────────────────────────
export const Centered: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;max-width:860px;">

        <v-stat title="Page views" value="89,400" desc="21% more than last month" [centered]="true" style="flex:1;min-width:180px;">
          <svg figure width="36" height="36" viewBox="0 0 24 24" fill="none" style="margin:0 auto 4px;color:#6941c6;">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="2"/>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </v-stat>

        <v-stat title="New Signups" value="4,200" desc="From 56 countries" [centered]="true" style="flex:1;min-width:180px;">
          <svg figure width="36" height="36" viewBox="0 0 24 24" fill="none" style="margin:0 auto 4px;color:#039855;">
            <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
            <path d="M19 8v6M22 11h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </v-stat>

        <v-stat title="Satisfaction" value="94%" desc="Based on 1,230 ratings" [centered]="true" style="flex:1;min-width:180px;">
          <svg figure width="36" height="36" viewBox="0 0 24 24" fill="none" style="margin:0 auto 4px;color:#f79009;">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </v-stat>

        <v-stat title="Response Time" value="1.2s" desc="-0.3s from last week" [centered]="true" style="flex:1;min-width:180px;">
          <svg figure width="36" height="36" viewBox="0 0 24 24" fill="none" style="margin:0 auto 4px;color:#0ba5ec;">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </v-stat>

      </div>
    `,
  }),
};

// ── With actions ─────────────────────────────────────
export const WithActions: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;max-width:720px;flex-wrap:wrap;">

        <v-stat title="Account balance" value="$4,091.00" desc="Available to withdraw" iconColor="green" style="flex:1;min-width:260px;">
          <svg icon width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
            <path d="M2 10h20" stroke="currentColor" stroke-width="2"/>
          </svg>
          <div actions>
            <button style="padding:6px 14px;border-radius:8px;background:#039855;color:#fff;font-size:12px;font-weight:600;border:none;cursor:pointer;">Withdraw</button>
            <button style="padding:6px 14px;border-radius:8px;background:#f4f4f6;color:#344054;font-size:12px;font-weight:600;border:1px solid #eaeaed;cursor:pointer;">Details</button>
          </div>
        </v-stat>

        <v-stat title="Monthly spend" value="$1,840" trend="+$220 vs last month" trendDir="up" iconColor="orange" style="flex:1;min-width:260px;">
          <svg icon width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div actions>
            <button style="padding:6px 14px;border-radius:8px;background:#f4f4f6;color:#344054;font-size:12px;font-weight:600;border:1px solid #eaeaed;cursor:pointer;">View report</button>
          </div>
        </v-stat>

      </div>
    `,
  }),
};

// ── No icon — minimal ────────────────────────────────
export const Minimal: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:720px;">
        <v-stat title="Pull requests" value="128" trend="+14 this week" trendDir="up"></v-stat>
        <v-stat title="Issues closed" value="64"  trend="-8 vs last week" trendDir="down"></v-stat>
        <v-stat title="Contributors" value="23"   desc="Active this month"></v-stat>
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
            <v-stat title="Total Revenue" value="$48,295" trend="+12.5% from last month" trendDir="up" iconColor="purple" style="max-width:280px;">
              <svg icon width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </v-stat>
            <p class="dnd-caption">Always pair a stat value with a descriptive label, unit, and trend so users have full context at a glance.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-stat value="48295" style="max-width:280px;"></v-stat>
            <p class="dnd-caption">Don't display a number alone without a label or unit — users can't interpret what "48295" means without context.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
