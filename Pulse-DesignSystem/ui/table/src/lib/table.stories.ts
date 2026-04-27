import type { Meta, StoryObj } from '@storybook/angular';
import { VTable } from './table.component';
import { TableColumn } from './table.types';

const sampleColumns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
];

const sampleRows = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Pending' },
];

const meta: Meta<VTable> = {
  title: 'Data Display/Table',
  component: VTable,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: 'Column definitions (key, label, sortable, numeric, width)',
    },
    rows: {
      control: 'object',
      description: 'Row data as array of objects',
    },
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered', 'minimal'],
      description: 'Visual variant',
    },
    selectable: {
      control: 'boolean',
      description: 'Show checkbox column',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible table label',
    },
  },
};

export default meta;
type Story = StoryObj<VTable>;

export const Default: Story = {
  args: {
    columns: sampleColumns,
    rows: sampleRows,
    variant: 'default',
    selectable: false,
    ariaLabel: 'Data table',
  },
};

export const Striped: Story = {
  args: {
    columns: sampleColumns,
    rows: sampleRows,
    variant: 'striped',
    selectable: false,
  },
};

export const Bordered: Story = {
  args: {
    columns: sampleColumns,
    rows: sampleRows,
    variant: 'bordered',
    selectable: false,
  },
};

export const Minimal: Story = {
  args: {
    columns: sampleColumns,
    rows: sampleRows,
    variant: 'minimal',
    selectable: false,
  },
};

export const Selectable: Story = {
  args: {
    columns: sampleColumns,
    rows: sampleRows,
    variant: 'default',
    selectable: true,
  },
};

export const WithNumericColumn: Story = {
  args: {
    columns: [
      { key: 'product', label: 'Product', sortable: true },
      { key: 'price', label: 'Price', sortable: true, numeric: true, width: '120px' },
      { key: 'quantity', label: 'Qty', numeric: true, width: '80px' },
    ],
    rows: [
      { id: 1, product: 'Widget A', price: 29.99, quantity: 150 },
      { id: 2, product: 'Widget B', price: 49.99, quantity: 85 },
      { id: 3, product: 'Widget C', price: 19.99, quantity: 320 },
    ],
    variant: 'default',
    selectable: false,
  },
};

export const DoAndDont: Story = {
  render: (args) => ({
    props: { ...args, sampleColumns, sampleRows },
    template: `
      <div class="dnd-wrap">
        <div class="dnd-do">
          <div class="dnd-do-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Do
          </div>
          <div class="dnd-do-body">
            <v-table [columns]="sampleColumns" [rows]="sampleRows" variant="default" [selectable]="true"></v-table>
            <p class="dnd-caption">Use pagination or virtual scroll for large datasets, and provide sortable columns to help users navigate data efficiently.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <p style="font-size:13px;color:#667085;background:#fef3f2;border:1px solid #fecdca;border-radius:8px;padding:12px 16px;margin:0;">
              Rendering hundreds of rows all at once without any filtering, sorting, or pagination creates a performance bottleneck and an unusable wall of data.
            </p>
            <p class="dnd-caption">Don't display an unfiltered, unsorted table with hundreds of rows all at once — always paginate or provide filtering for large datasets.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
