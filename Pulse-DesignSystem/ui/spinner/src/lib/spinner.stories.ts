import type { Meta, StoryObj } from '@storybook/angular';
import { VSpinner } from './spinner.component';

const meta: Meta<VSpinner> = {
  title: 'Feedback/Spinner',
  component: VSpinner,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
      description: 'Spinner color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'md', 'lg'],
      description: 'Spinner size',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Background theme (light or dark)',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label',
    },
  },
};

export default meta;
type Story = StoryObj<VSpinner>;

export const Default: Story = {
  args: {
    color: 'primary',
    size: 'default',
    theme: 'light',
    ariaLabel: 'Loading',
  },
};

export const Small: Story = {
  args: {
    color: 'primary',
    size: 'sm',
    theme: 'light',
  },
};

export const Large: Story = {
  args: {
    color: 'primary',
    size: 'lg',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    color: 'primary',
    size: 'default',
    theme: 'dark',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="background: #1f2937; padding: 24px; border-radius: 8px; display: inline-block;">
        <v-spinner [color]="color" [size]="size" [theme]="theme" [ariaLabel]="ariaLabel"></v-spinner>
      </div>
    `,
  }),
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <v-spinner color="primary"></v-spinner>
        <v-spinner color="secondary"></v-spinner>
        <v-spinner color="success"></v-spinner>
        <v-spinner color="info"></v-spinner>
        <v-spinner color="warning"></v-spinner>
        <v-spinner color="danger"></v-spinner>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <v-spinner size="xs"></v-spinner>
        <v-spinner size="sm"></v-spinner>
        <v-spinner size="default"></v-spinner>
        <v-spinner size="md"></v-spinner>
        <v-spinner size="lg"></v-spinner>
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
            <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border:1px solid #eaeaed;border-radius:8px;background:#fff;">
              <v-spinner color="primary" size="sm"></v-spinner>
              <span style="font-size:13px;color:#344054;">Saving your changes…</span>
            </div>
            <p class="dnd-caption">Use a spinner for short, bounded loading states with clear context about what is loading.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:24px;border:1px solid #eaeaed;border-radius:8px;background:#fff;width:100%;">
              <v-spinner color="primary" size="lg"></v-spinner>
              <span style="font-size:13px;color:#667085;">Loading content…</span>
            </div>
            <p class="dnd-caption">Don't use a spinner as a full-page placeholder for content that may never load — use an empty state or error state instead.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
