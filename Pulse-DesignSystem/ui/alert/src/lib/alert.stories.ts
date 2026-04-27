import type { Meta, StoryObj } from '@storybook/angular';
import { VAlert } from './alert.component';

const meta: Meta<VAlert> = {
  title: 'Feedback/Alert',
  component: VAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: 'Alert semantic type',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'toast', 'banner'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'Size of the alert',
    },
    title: {
      control: 'text',
      description: 'Bold title line',
    },
    message: {
      control: 'text',
      description: 'Body message text',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
    },
    actionLabel: {
      control: 'text',
      description: 'Underlined action link label',
    },
  },
};

export default meta;
type Story = StoryObj<VAlert>;

export const Default: Story = {
  args: {
    type: 'info',
    variant: 'default',
    size: 'default',
    title: 'Information',
    message: 'This is an informational alert message.',
    dismissible: false,
    actionLabel: '',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    variant: 'default',
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    dismissible: true,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    variant: 'default',
    title: 'Warning',
    message: 'Your session will expire in 5 minutes.',
    dismissible: false,
    actionLabel: 'Extend session',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    variant: 'default',
    title: 'Error',
    message: 'Something went wrong. Please try again later.',
    dismissible: true,
    actionLabel: 'Retry',
  },
};

export const Filled: Story = {
  args: {
    type: 'info',
    variant: 'filled',
    title: 'Filled variant',
    message: 'This alert uses the filled visual style.',
    dismissible: false,
  },
};

export const Outlined: Story = {
  args: {
    type: 'success',
    variant: 'outlined',
    title: 'Outlined variant',
    message: 'This alert uses the outlined visual style.',
    dismissible: false,
  },
};

export const Toast: Story = {
  args: {
    type: 'info',
    variant: 'toast',
    title: 'Toast notification',
    message: 'You have a new message.',
    dismissible: true,
  },
};

export const Banner: Story = {
  args: {
    type: 'warning',
    variant: 'banner',
    title: '',
    message: 'Scheduled maintenance on Sunday 10pm-2am. Plan accordingly.',
    dismissible: true,
  },
};

export const SmallSize: Story = {
  args: {
    type: 'info',
    variant: 'default',
    size: 'sm',
    title: '',
    message: 'Compact alert with smaller padding.',
    dismissible: false,
  },
};

export const AllTypes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px;">
        <v-alert type="info" title="Info" message="Informational message here."></v-alert>
        <v-alert type="success" title="Success" message="Operation completed successfully."></v-alert>
        <v-alert type="warning" title="Warning" message="Proceed with caution."></v-alert>
        <v-alert type="error" title="Error" message="An error has occurred."></v-alert>
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
            <v-alert type="success" title="Changes saved" message="Your profile has been updated successfully."></v-alert>
            <v-alert type="error" title="Payment failed" message="Your card was declined. Please try a different payment method."></v-alert>
            <p class="dnd-caption">Match alert type to semantic meaning — success for confirmations, error for failures, warning for caution, info for neutral messages.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-alert type="error" title="Did you know?" message="You can export your data from the settings page anytime."></v-alert>
            <p class="dnd-caption">Don't use error styling for informational messages — it creates unnecessary alarm and undermines user trust.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
