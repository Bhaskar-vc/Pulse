import type { Meta, StoryObj } from '@storybook/angular';
import { VTag } from './tag.component';

const meta: Meta<VTag> = {
  title: 'Data Display/Tag',
  component: VTag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'light', 'outlined', 'tinted'],
      description: 'Visual variant of the tag',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Semantic color of the tag',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tag',
    },
    showDot: {
      control: 'boolean',
      description: 'Show a colored dot before the label',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss (x) button',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<VTag>;

export const Default: Story = {
  args: {
    variant: 'light',
    color: 'primary',
    size: 'md',
    showDot: false,
    dismissible: false,
  },
  render: (args) => ({
    props: args,
    template: `<v-tag [variant]="variant" [color]="color" [size]="size" [showDot]="showDot" [dismissible]="dismissible">Default Tag</v-tag>`,
  }),
};

export const Solid: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<v-tag [variant]="variant" [color]="color" [size]="size">Solid Tag</v-tag>`,
  }),
};

export const WithDot: Story = {
  args: {
    variant: 'light',
    color: 'success',
    size: 'md',
    showDot: true,
  },
  render: (args) => ({
    props: args,
    template: `<v-tag [variant]="variant" [color]="color" [size]="size" [showDot]="showDot">Active</v-tag>`,
  }),
};

export const Dismissible: Story = {
  args: {
    variant: 'light',
    color: 'error',
    size: 'md',
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    template: `<v-tag [variant]="variant" [color]="color" [size]="size" [dismissible]="dismissible">Remove me</v-tag>`,
  }),
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <v-tag color="primary">Primary</v-tag>
        <v-tag color="secondary">Secondary</v-tag>
        <v-tag color="success">Success</v-tag>
        <v-tag color="warning">Warning</v-tag>
        <v-tag color="error">Error</v-tag>
        <v-tag color="info">Info</v-tag>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <v-tag variant="light" color="primary">Light</v-tag>
        <v-tag variant="solid" color="primary">Solid</v-tag>
        <v-tag variant="outlined" color="primary">Outlined</v-tag>
        <v-tag variant="tinted" color="primary">Tinted</v-tag>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <v-tag size="sm">Small</v-tag>
        <v-tag size="md">Medium</v-tag>
        <v-tag size="lg">Large</v-tag>
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
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              <v-tag color="success" variant="light" [showDot]="true">Active</v-tag>
              <v-tag color="primary" variant="light">Engineering</v-tag>
              <v-tag color="warning" variant="light">Beta</v-tag>
            </div>
            <p class="dnd-caption">Use tags to show metadata, categories, or status labels that describe a piece of content.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              <v-tag color="primary" variant="solid">Save</v-tag>
              <v-tag color="danger" variant="solid">Delete</v-tag>
            </div>
            <p class="dnd-caption">Don't use tags as interactive buttons or primary call-to-action elements — use the Button component instead.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
