import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { VSegment } from './segment.component';
import { SegmentItem } from './segment.types';

const basicItems: SegmentItem[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

const viewItems: SegmentItem[] = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
  { value: 'table', label: 'Table' },
];

const withDisabledItems: SegmentItem[] = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived', disabled: true },
];

const meta: Meta<VSegment> = {
  title: 'Form Controls/Segment',
  component: VSegment,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  argTypes: {
    items: {
      control: 'object',
      description: 'Option items to display',
    },
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible group label',
    },
  },
};

export default meta;
type Story = StoryObj<VSegment>;

export const Default: Story = {
  args: {
    items: basicItems,
    value: 'week',
    size: 'md',
    ariaLabel: 'Time period',
  },
};

export const Small: Story = {
  args: {
    items: viewItems,
    value: 'grid',
    size: 'sm',
    ariaLabel: 'View mode',
  },
};

export const Large: Story = {
  args: {
    items: viewItems,
    value: 'list',
    size: 'lg',
    ariaLabel: 'View mode',
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: withDisabledItems,
    value: 'active',
    size: 'md',
    ariaLabel: 'Status filter',
  },
};

export const NoSelection: Story = {
  args: {
    items: basicItems,
    value: '',
    size: 'md',
    ariaLabel: 'Time period',
  },
};

export const DoAndDont: Story = {
  render: (args) => ({
    props: { ...args, viewItems, basicItems },
    template: `
      <div class="dnd-wrap">
        <div class="dnd-do">
          <div class="dnd-do-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Do
          </div>
          <div class="dnd-do-body">
            <v-segment [items]="viewItems" value="grid" size="md" ariaLabel="View mode"></v-segment>
            <p class="dnd-caption">Use Segment to switch between views of the same content (e.g. List / Grid / Table) — all views show the same data differently.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-segment [items]="basicItems" value="day" size="md" ariaLabel="Navigation"></v-segment>
            <p class="dnd-caption">Don't use Segment for app-level navigation between distinct pages — use tabs or a nav bar which provide better routing semantics.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
