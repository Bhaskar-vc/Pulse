import type { Meta, StoryObj } from '@storybook/angular';
import { VButton } from './button.component';

const meta: Meta<VButton> = {
  title: 'Layout/Button',
  component: VButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'light', 'outlined', 'ghost', 'tinted'],
      description: 'Visual style of the button',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
      description: 'Color scheme of the button',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'md', 'lg'],
      description: 'Size of the button',
    },
    radius: {
      control: 'select',
      options: ['none', 'default', 'full'],
      description: 'Corner radius style',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Render the button in a square icon-only shape',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button shows a loading spinner',
    },
    loadingText: {
      control: 'text',
      description: 'Text displayed alongside the spinner when loading',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
    customClass: {
      control: 'text',
      description: 'Additional Tailwind classes',
    },
  },
};
export default meta;
type Story = StoryObj<VButton>;

// --- Default ---
export const Default: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'default',
    radius: 'default',
    disabled: false,
    loading: false,
    iconOnly: false,
  },
  render: (args) => ({
    props: args,
    template: `<v-button [variant]="variant" [color]="color" [size]="size" [radius]="radius" [disabled]="disabled" [loading]="loading" [iconOnly]="iconOnly">Button</v-button>`,
  }),
};

// --- Variants ---
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <v-button variant="solid" color="primary">Solid</v-button>
        <v-button variant="light" color="primary">Light</v-button>
        <v-button variant="outlined" color="primary">Outlined</v-button>
        <v-button variant="ghost" color="primary">Ghost</v-button>
        <v-button variant="tinted" color="primary">Tinted</v-button>
      </div>
    `,
  }),
};

// --- Colors ---
export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <v-button color="primary">Primary</v-button>
        <v-button color="secondary">Secondary</v-button>
        <v-button color="success">Success</v-button>
        <v-button color="info">Info</v-button>
        <v-button color="warning">Warning</v-button>
        <v-button color="danger">Danger</v-button>
      </div>
    `,
  }),
};

// --- Sizes ---
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <v-button size="xs">Extra Small</v-button>
        <v-button size="sm">Small</v-button>
        <v-button size="default">Default</v-button>
        <v-button size="md">Medium</v-button>
        <v-button size="lg">Large</v-button>
      </div>
    `,
  }),
};

// --- Radius ---
export const Radius: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <v-button radius="none">None</v-button>
        <v-button radius="default">Default</v-button>
        <v-button radius="full">Full</v-button>
      </div>
    `,
  }),
};

// --- Loading ---
export const Loading: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <v-button [loading]="true">Loading</v-button>
        <v-button [loading]="true" loadingText="Saving...">With Text</v-button>
      </div>
    `,
  }),
};

// --- Disabled ---
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `<v-button [disabled]="disabled">Disabled</v-button>`,
  }),
};

// --- Icon Only ---
export const IconOnly: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <v-button [iconOnly]="true" size="xs" ariaLabel="Add">+</v-button>
        <v-button [iconOnly]="true" size="sm" ariaLabel="Add">+</v-button>
        <v-button [iconOnly]="true" size="default" ariaLabel="Add">+</v-button>
        <v-button [iconOnly]="true" size="md" ariaLabel="Add">+</v-button>
        <v-button [iconOnly]="true" size="lg" ariaLabel="Add">+</v-button>
      </div>
    `,
  }),
};

// --- All Variants x Colors ---
export const VariantColorMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div *ngFor="let variant of ['solid', 'light', 'outlined', 'ghost', 'tinted']">
          <p style="margin: 0 0 8px; font-weight: 600; text-transform: capitalize;">{{ variant }}</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <v-button *ngFor="let c of ['primary', 'secondary', 'success', 'info', 'warning', 'danger']" [variant]="variant" [color]="c">{{ c }}</v-button>
          </div>
        </div>
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
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <v-button variant="solid" color="primary">Save changes</v-button>
              <v-button variant="outlined" color="danger">Delete account</v-button>
            </div>
            <p class="dnd-caption">Use clear, action-oriented labels that describe exactly what the button does.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <v-button variant="solid" color="primary">Click here</v-button>
              <v-button variant="solid" color="secondary">Submit</v-button>
            </div>
            <p class="dnd-caption">Don't use vague labels like "Click here" or context-free "Submit" — users won't know what will happen.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
