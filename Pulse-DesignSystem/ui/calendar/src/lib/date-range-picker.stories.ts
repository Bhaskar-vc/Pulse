import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VDateRangePicker } from './date-range-picker.component';

const meta: Meta<VDateRangePicker> = {
  title: 'Form Controls/Calendar/Date Range Picker',
  component: VDateRangePicker,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [VDateRangePicker] })],
  argTypes: {
    rangeStart:   { control: 'date',   description: 'Pre-selected range start' },
    rangeEnd:     { control: 'date',   description: 'Pre-selected range end' },
    activePreset: { control: 'text',   description: 'Initially highlighted preset label' },
  },
};

export default meta;
type Story = StoryObj<VDateRangePicker>;

// ── Default — empty ────────────────────────────────────────────
export const Default: Story = {
  args: {},
};

// ── Last-week preset pre-selected ─────────────────────────────
export const LastWeek: Story = {
  render: () => {
    const now     = new Date();
    const dayOfWk = now.getDay();           // 0=Sun
    const moOff   = (dayOfWk + 6) % 7;     // Mo=0
    const mon     = new Date(now);
    mon.setDate(now.getDate() - moOff - 7);
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    const strip = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return {
      props: {
        rangeStart:   strip(mon),
        rangeEnd:     strip(sun),
        activePreset: 'Last week',
      },
      template: `
        <v-date-range-picker
          [rangeStart]="rangeStart"
          [rangeEnd]="rangeEnd"
          [activePreset]="activePreset"
        ></v-date-range-picker>
      `,
    };
  },
};

// ── This month pre-selected ────────────────────────────────────
export const ThisMonth: Story = {
  render: () => {
    const now   = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end   = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
      props: { rangeStart: start, rangeEnd: end, activePreset: 'This month' },
      template: `
        <v-date-range-picker
          [rangeStart]="rangeStart"
          [rangeEnd]="rangeEnd"
          [activePreset]="activePreset"
        ></v-date-range-picker>
      `,
    };
  },
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
            <v-date-range-picker activePreset="Last 7 days"></v-date-range-picker>
            <p class="dnd-caption">Offer common preset ranges (Last 7 days, This month) to help users quickly select frequent date ranges.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <p style="font-size:13px;color:#667085;background:#fef3f2;border:1px solid #fecdca;border-radius:8px;padding:12px 16px;margin:0;">
              Using a Date Range Picker when only a single appointment date is needed forces users to pick a redundant end date, adding unnecessary friction.
            </p>
            <p class="dnd-caption">Don't use Date Range Picker when only a single date is needed — use the Calendar component instead.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
