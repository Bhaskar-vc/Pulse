import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { VRadio } from './radio.component';
import { VRadioGroup } from './radio-group.component';

const meta: Meta<VRadioGroup> = {
  title: 'Form Controls/Radio',
  component: VRadioGroup,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule, VRadio, VRadioGroup],
    }),
  ],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of radio items',
    },
    name: {
      control: 'text',
      description: 'The name attribute shared across all radios in the group',
    },
  },
};

export default meta;
type Story = StoryObj<VRadioGroup>;

// --- Default ---
export const Default: Story = {
  args: {
    orientation: 'vertical',
    name: 'plan',
  },
  render: (args) => ({
    props: args,
    template: `
      <v-radio-group [orientation]="orientation" [name]="name">
        <v-radio label="Free plan"   value="free"       supporting="Up to 5 users"></v-radio>
        <v-radio label="Pro plan"    value="pro"        supporting="Up to 50 users"></v-radio>
        <v-radio label="Enterprise"  value="enterprise" supporting="Unlimited users"></v-radio>
      </v-radio-group>
    `,
  }),
};

// --- Radio Group ---
export const RadioGroup: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:6px;">
        <span style="font-size:13px;font-weight:600;color:var(--color-text-primary,#29294c)">Billing cycle</span>
        <span style="font-size:12px;color:var(--color-text-muted,#707087);margin-bottom:8px;">Choose how often you'd like to be billed.</span>
        <v-radio-group orientation="vertical" name="billing">
          <v-radio label="Monthly"   value="monthly"   supporting="Billed every month"></v-radio>
          <v-radio label="Quarterly" value="quarterly" supporting="Billed every 3 months — save 10%"></v-radio>
          <v-radio label="Annually"  value="annual"    supporting="Billed once a year — save 20%"></v-radio>
        </v-radio-group>
      </div>
    `,
  }),
};

// --- Horizontal ---
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    name: 'size',
  },
  render: (args) => ({
    props: args,
    template: `
      <v-radio-group [orientation]="orientation" [name]="name">
        <v-radio label="Small"  value="sm"></v-radio>
        <v-radio label="Medium" value="md"></v-radio>
        <v-radio label="Large"  value="lg"></v-radio>
      </v-radio-group>
    `,
  }),
};

// --- Small Size ---
export const SmallSize: Story = {
  args: {
    orientation: 'vertical',
    name: 'color',
  },
  render: (args) => ({
    props: args,
    template: `
      <v-radio-group [orientation]="orientation" [name]="name">
        <v-radio label="Red"   value="red"   size="sm"></v-radio>
        <v-radio label="Blue"  value="blue"  size="sm"></v-radio>
        <v-radio label="Green" value="green" size="sm"></v-radio>
      </v-radio-group>
    `,
  }),
};

// --- With Disabled Option ---
export const WithDisabledOption: Story = {
  args: {
    orientation: 'vertical',
    name: 'option',
  },
  render: (args) => ({
    props: args,
    template: `
      <v-radio-group [orientation]="orientation" [name]="name">
        <v-radio label="Option A"              value="a"></v-radio>
        <v-radio label="Option B (unavailable)" value="b" disabled></v-radio>
        <v-radio label="Option C"              value="c"></v-radio>
      </v-radio-group>
    `,
  }),
};

// --- Standalone Radio ---
export const SingleRadio: Story = {
  render: () => ({
    template: `
      <v-radio label="Accept terms and conditions" value="accept" supporting="You must accept to continue" size="md"></v-radio>
    `,
  }),
};

// --- Do & Don't ---
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
            <v-radio-group orientation="vertical" name="plan-dnd-do">
              <v-radio label="Free plan"  value="free"       supporting="Up to 5 users"></v-radio>
              <v-radio label="Pro plan"   value="pro"        supporting="Up to 50 users"></v-radio>
              <v-radio label="Enterprise" value="enterprise" supporting="Unlimited users"></v-radio>
            </v-radio-group>
            <p class="dnd-caption">Use radio buttons for mutually exclusive choices where exactly one option must be selected.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-radio-group orientation="vertical" name="features-dnd-dont">
              <v-radio label="Email notifications" value="email"></v-radio>
              <v-radio label="SMS alerts"          value="sms"></v-radio>
              <v-radio label="Push notifications"  value="push"></v-radio>
            </v-radio-group>
            <p class="dnd-caption">Don't use radios for independent selections where multiple can apply — use checkboxes instead.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
