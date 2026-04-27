import type { Meta, StoryObj } from '@storybook/angular';
import { VcDivider } from './divider.component';

const meta: Meta<VcDivider> = {
  title: 'Layout/Divider',
  component: VcDivider,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider line',
    },
    dashed: {
      control: 'boolean',
      description: 'Whether the divider uses a dashed line',
    },
    title: {
      control: 'text',
      description: 'Optional title text displayed within the divider',
    },
    orientation: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Position of the title text (left, center, or right)',
    },
  },
};
export default meta;
type Story = StoryObj<VcDivider>;

// --- Default (solid horizontal) ---
export const Default: Story = {
  args: {
    type: 'horizontal',
    dashed: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 20px 0;">
        <vc-divider [type]="type" [dashed]="dashed"></vc-divider>
      </div>
    `,
  }),
};

// --- Dashed ---
export const Dashed: Story = {
  args: {
    type: 'horizontal',
    dashed: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 20px 0;">
        <vc-divider [type]="type" [dashed]="dashed"></vc-divider>
      </div>
    `,
  }),
};

// --- With Title (center) ---
export const WithTitleCenter: Story = {
  args: {
    title: 'Section Title',
    orientation: 'center',
    dashed: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 20px 0;">
        <vc-divider [title]="title" [orientation]="orientation" [dashed]="dashed"></vc-divider>
      </div>
    `,
  }),
};

// --- With Title (left) ---
export const WithTitleLeft: Story = {
  args: {
    title: 'Section Title',
    orientation: 'left',
    dashed: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 20px 0;">
        <vc-divider [title]="title" [orientation]="orientation" [dashed]="dashed"></vc-divider>
      </div>
    `,
  }),
};

// --- With Title (right) ---
export const WithTitleRight: Story = {
  args: {
    title: 'Section Title',
    orientation: 'right',
    dashed: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 20px 0;">
        <vc-divider [title]="title" [orientation]="orientation" [dashed]="dashed"></vc-divider>
      </div>
    `,
  }),
};

// --- Dashed with Title ---
export const DashedWithTitle: Story = {
  args: {
    title: 'Dashed Title',
    orientation: 'center',
    dashed: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 20px 0;">
        <vc-divider [title]="title" [orientation]="orientation" [dashed]="dashed"></vc-divider>
      </div>
    `,
  }),
};

// --- All Variations ---
export const AllVariations: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 100%; padding: 20px 0;">
        <div>
          <p style="margin: 0 0 8px; font-weight: 600;">Solid</p>
          <vc-divider></vc-divider>
        </div>
        <div>
          <p style="margin: 0 0 8px; font-weight: 600;">Dashed</p>
          <vc-divider [dashed]="true"></vc-divider>
        </div>
        <div>
          <p style="margin: 0 0 8px; font-weight: 600;">Title (left)</p>
          <vc-divider title="Left" orientation="left"></vc-divider>
        </div>
        <div>
          <p style="margin: 0 0 8px; font-weight: 600;">Title (center)</p>
          <vc-divider title="Center" orientation="center"></vc-divider>
        </div>
        <div>
          <p style="margin: 0 0 8px; font-weight: 600;">Title (right)</p>
          <vc-divider title="Right" orientation="right"></vc-divider>
        </div>
        <div>
          <p style="margin: 0 0 8px; font-weight: 600;">Dashed + Title</p>
          <vc-divider title="Dashed" orientation="center" [dashed]="true"></vc-divider>
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
            <div style="width:100%;">
              <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#101828;">Profile</p>
              <p style="margin:0 0 12px;font-size:13px;color:#475467;">Update your personal information and photo.</p>
              <vc-divider></vc-divider>
              <p style="margin:12px 0 0;font-size:14px;font-weight:600;color:#101828;">Security</p>
            </div>
            <p class="dnd-caption">Use dividers to separate distinct content sections that need visual breathing room between them.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <div style="width:100%;">
              <p style="margin:0;">Name</p>
              <vc-divider></vc-divider>
              <p style="margin:0;">Email</p>
              <vc-divider></vc-divider>
              <p style="margin:0;">Phone</p>
              <vc-divider></vc-divider>
              <p style="margin:0;">Role</p>
            </div>
            <p class="dnd-caption">Don't overuse dividers between every element — rely on consistent spacing and grouping instead.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
