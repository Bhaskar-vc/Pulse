import type { Meta, StoryObj } from '@storybook/angular';
import { VcLabel } from './label.component';

const meta: Meta<VcLabel> = {
  title: 'Utilities/Label',
  component: VcLabel,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['light', 'dark', 'bold'],
      description: 'Visual weight of the label text.',
    },
    text: {
      control: 'text',
      description: 'The label text to display.',
    },
    tooltip: {
      control: 'boolean',
      description: 'Whether to show a tooltip info icon next to the label.',
    },
    required: {
      control: 'boolean',
      description: 'Whether to show a required asterisk (*).',
    },
    optional: {
      control: 'boolean',
      description: 'Whether to show an "(optional)" suffix.',
    },
    labelFor: {
      control: 'text',
      description: 'The id of the form element this label is associated with.',
    },
  },
};

export default meta;
type Story = StoryObj<VcLabel>;

export const Default: Story = {
  args: {
    type: 'dark',
    text: 'Email address',
    tooltip: false,
    required: false,
    optional: false,
  },
};

export const Light: Story = {
  args: {
    type: 'light',
    text: 'Username',
  },
};

export const Bold: Story = {
  args: {
    type: 'bold',
    text: 'Full Name',
  },
};

export const Required: Story = {
  args: {
    type: 'dark',
    text: 'Password',
    required: true,
  },
};

export const Optional: Story = {
  args: {
    type: 'dark',
    text: 'Phone number',
    optional: true,
  },
};

export const WithTooltip: Story = {
  args: {
    type: 'dark',
    text: 'API Key',
    tooltip: true,
  },
};

export const RequiredWithTooltip: Story = {
  args: {
    type: 'dark',
    text: 'Organization ID',
    required: true,
    tooltip: true,
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
            <div style="display:flex;flex-direction:column;gap:4px;width:100%;">
              <vc-label text="Email address" type="dark" [required]="true" labelFor="email-input"></vc-label>
              <input id="email-input" type="email" placeholder="you@example.com" style="border:1px solid #d0d5dd;border-radius:8px;padding:8px 12px;font-size:14px;width:100%;box-sizing:border-box;" />
            </div>
            <p class="dnd-caption">Associate labels explicitly with their form controls using labelFor so screen readers announce them correctly.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <vc-label text="Section Header" type="bold"></vc-label>
            <p style="font-size:13px;color:#667085;margin:0;">Some standalone content that is not a form field.</p>
            <p class="dnd-caption">Don't use a label component as decorative heading text without a linked input — use a heading or paragraph element instead.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
