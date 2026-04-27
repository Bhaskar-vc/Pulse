import type { Meta, StoryObj } from '@storybook/angular';
import { VEmptyState } from './empty-state.component';

const meta: Meta<VEmptyState> = {
  title: 'Feedback/EmptyState',
  component: VEmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    containerStyle: {
      control: 'boolean',
      description: 'Wrap in bordered container box',
    },
    hasIllustration: {
      control: 'boolean',
      description: 'Show illustration slot',
    },
  },
};

export default meta;
type Story = StoryObj<VEmptyState>;

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you are looking for.',
    size: 'md',
    containerStyle: false,
    hasIllustration: true,
  },
};

export const Small: Story = {
  args: {
    title: 'No items',
    description: 'Nothing to display here.',
    size: 'sm',
    containerStyle: false,
    hasIllustration: true,
  },
};

export const Large: Story = {
  args: {
    title: 'No data available',
    description: 'There is no data to display at the moment. Please check back later or try a different query.',
    size: 'lg',
    containerStyle: false,
    hasIllustration: true,
  },
};

export const WithContainer: Story = {
  args: {
    title: 'Empty inbox',
    description: 'You have no new messages.',
    size: 'md',
    containerStyle: true,
    hasIllustration: true,
  },
};

export const NoIllustration: Story = {
  args: {
    title: 'No notifications',
    description: 'You are all caught up.',
    size: 'md',
    containerStyle: false,
    hasIllustration: false,
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <v-empty-state title="Small" description="Small empty state" size="sm"></v-empty-state>
        <v-empty-state title="Medium" description="Medium empty state (default)" size="md"></v-empty-state>
        <v-empty-state title="Large" description="Large empty state for prominent displays" size="lg"></v-empty-state>
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
            <v-empty-state
              title="No results found"
              description="Try adjusting your filters, or create a new item to get started."
              size="md"
              [hasIllustration]="true"
            ></v-empty-state>
            <p class="dnd-caption">Provide a clear call-to-action guiding the user on what to do next when content is empty.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-empty-state
              title="No data"
              description=""
              size="md"
              [hasIllustration]="false"
            ></v-empty-state>
            <p class="dnd-caption">Don't show an empty state without any description or guidance — users are left confused about what to do next.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
