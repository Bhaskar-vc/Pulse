import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { VCalendar } from './calendar.component';

const meta: Meta<VCalendar> = {
  title: 'Form Controls/Calendar',
  component: VCalendar,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  argTypes: {
    value: {
      control: 'date',
      description: 'Selected date (single mode)',
    },
    rangeMode: {
      control: 'boolean',
      description: 'Enable date range selection',
    },
    rangeStart: {
      control: 'date',
      description: 'Range start date',
    },
    rangeEnd: {
      control: 'date',
      description: 'Range end date',
    },
    minDate: {
      control: 'date',
      description: 'Minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date',
    },
    showFooter: {
      control: 'boolean',
      description: 'Show Cancel / Apply footer buttons',
    },
  },
};

export default meta;
type Story = StoryObj<VCalendar>;

export const Default: Story = {
  args: {
    rangeMode: false,
    showFooter: false,
  },
};

export const WithSelectedDate: Story = {
  args: {
    value: new Date(),
    rangeMode: false,
    showFooter: false,
  },
};

export const WithFooter: Story = {
  args: {
    rangeMode: false,
    showFooter: true,
  },
};

export const RangeMode: Story = {
  args: {
    rangeMode: true,
    showFooter: false,
  },
};

export const RangeModeWithFooter: Story = {
  args: {
    rangeMode: true,
    showFooter: true,
  },
};

export const WithMinMaxDates: Story = {
  args: {
    rangeMode: false,
    showFooter: false,
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0),
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
            <v-calendar [rangeMode]="false" [showFooter]="false"></v-calendar>
            <p class="dnd-caption">Use calendar for single date selection. Pre-highlight today's date for orientation and support keyboard navigation.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-calendar [rangeMode]="true" [showFooter]="false"></v-calendar>
            <p class="dnd-caption">Don't use calendar for selecting a date range — use the Date Range Picker component instead, which is purpose-built for that interaction.</p>
          </div>
        </div>
      </div>
    `,
  }),
};

