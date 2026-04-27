import type { Meta, StoryObj } from '@storybook/angular';
import { VcLegacyTable } from './table.component';

const sampleData = [
  { name: 'Alice Johnson', department: 'Engineering', location: 'New York', status: 'Active' },
  { name: 'Bob Smith', department: 'Marketing', location: 'San Francisco', status: 'Active' },
  { name: 'Carol White', department: 'Design', location: 'London', status: 'On Leave' },
  { name: 'Dan Brown', department: 'Engineering', location: 'Berlin', status: 'Active' },
  { name: 'Eve Davis', department: 'HR', location: 'New York', status: 'Inactive' },
];

const sampleColumns = ['name', 'department', 'location', 'status'];

const meta: Meta<VcLegacyTable> = {
  title: 'Feedback/TableLegacy',
  component: VcLegacyTable,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of row data objects',
    },
    columns: {
      control: 'object',
      description: 'Array of column key strings',
    },
    header: {
      control: 'boolean',
      description: 'Show header section above table',
    },
    heading: {
      control: 'text',
      description: 'Table heading text',
    },
    headingTag: {
      control: 'boolean',
      description: 'Show tag next to heading',
    },
    headingTagText: {
      control: 'text',
      description: 'Text for the heading tag',
    },
    striped: {
      control: 'boolean',
      description: 'Striped row styling',
    },
    maxHeight: {
      control: 'number',
      description: 'Max height in px for scrollable table',
    },
    shadow: {
      control: 'boolean',
      description: 'Show box shadow on the table container',
    },
    sortingEnabled: {
      control: 'boolean',
      description: 'Enable column sorting',
    },
    fixFirstColumn: {
      control: 'boolean',
      description: 'Fix the first column when scrolling horizontally',
    },
  },
};

export default meta;
type Story = StoryObj<VcLegacyTable>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    header: false,
    heading: 'Table',
    headingTag: false,
    headingTagText: 'Heading Tag',
    striped: false,
    shadow: true,
    sortingEnabled: false,
    fixFirstColumn: false,
  },
};

export const WithHeader: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    header: true,
    heading: 'Employee Directory',
    headingTag: true,
    headingTagText: '5 employees',
    striped: false,
    shadow: true,
    sortingEnabled: false,
  },
};

export const Striped: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    header: false,
    striped: true,
    shadow: true,
    sortingEnabled: false,
  },
};

export const Sortable: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    header: true,
    heading: 'Sortable Table',
    striped: false,
    shadow: true,
    sortingEnabled: true,
  },
};

export const ScrollableMaxHeight: Story = {
  args: {
    data: [
      ...sampleData,
      { name: 'Frank Lee', department: 'Sales', location: 'Tokyo', status: 'Active' },
      { name: 'Grace Kim', department: 'Engineering', location: 'Seoul', status: 'Active' },
      { name: 'Henry Zhang', department: 'Finance', location: 'Shanghai', status: 'On Leave' },
    ],
    columns: sampleColumns,
    header: true,
    heading: 'Scrollable Table',
    striped: false,
    shadow: true,
    sortingEnabled: false,
    maxHeight: 200,
  },
};

export const NoShadow: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    header: false,
    striped: false,
    shadow: false,
    sortingEnabled: false,
  },
};

export const DoAndDont: Story = {
  render: (args) => ({
    props: { ...args, sampleData, sampleColumns, singleColData: sampleData.map(r => ({ name: r.name })), singleColColumns: ['name'] },
    template: `
      <div class="dnd-wrap">
        <div class="dnd-do">
          <div class="dnd-do-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Do
          </div>
          <div class="dnd-do-body">
            <vc-legacy-table [data]="sampleData" [columns]="sampleColumns" [sortingEnabled]="true" [shadow]="true"></vc-legacy-table>
            <p class="dnd-caption">Include sortable column headers for data-heavy tables so users can find information quickly.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <vc-legacy-table [data]="singleColData" [columns]="singleColColumns" [shadow]="true"></vc-legacy-table>
            <p class="dnd-caption">Don't use a table for simple lists with only one column of data — a plain list or card layout is cleaner and more appropriate.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
