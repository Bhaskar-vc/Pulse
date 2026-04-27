import type { Meta, StoryObj } from '@storybook/angular';
import { VPagination } from './pagination.component';

const meta: Meta<VPagination> = {
  title: 'Navigation/Pagination',
  component: VPagination,
  tags: ['autodocs'],
  argTypes: {
    total: {
      control: 'number',
      description: 'Total number of items across all pages.',
    },
    page: {
      control: 'number',
      description: 'Current active page (1-based).',
    },
    pageSize: {
      control: 'number',
      description: 'Number of items displayed per page.',
    },
    maxVisible: {
      control: 'number',
      description: 'Maximum number of page buttons visible (excluding prev/next).',
    },
  },
};

export default meta;
type Story = StoryObj<VPagination>;

export const Default: Story = {
  args: {
    total: 100,
    page: 1,
    pageSize: 10,
    maxVisible: 7,
  },
};

export const MiddlePage: Story = {
  args: {
    total: 200,
    page: 10,
    pageSize: 10,
    maxVisible: 7,
  },
};

export const FewPages: Story = {
  args: {
    total: 30,
    page: 2,
    pageSize: 10,
    maxVisible: 7,
  },
};

export const LargeDataset: Story = {
  args: {
    total: 500,
    page: 25,
    pageSize: 10,
    maxVisible: 7,
  },
};

export const CustomPageSize: Story = {
  args: {
    total: 120,
    page: 3,
    pageSize: 25,
    maxVisible: 5,
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
            <v-pagination [total]="200" [page]="5" [pageSize]="10" [maxVisible]="7"></v-pagination>
            <p class="dnd-caption">Show the current page and total page count prominently so users always know where they are in the dataset.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-pagination [total]="15" [page]="1" [pageSize]="10" [maxVisible]="7"></v-pagination>
            <p class="dnd-caption">Don't add pagination to a list with only 1–2 pages — it adds unnecessary UI overhead for minimal content.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
