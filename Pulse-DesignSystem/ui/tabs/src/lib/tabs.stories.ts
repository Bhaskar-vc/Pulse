import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VTabs } from './tabs.component';
import { VTabItem } from './tab-item.component';

const meta: Meta<VTabs> = {
  title: 'Navigation/Tabs',
  component: VTabs,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [VTabItem],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line'],
      description: 'Visual variant of the tabs.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tab labels.',
    },
    vertical: {
      control: 'boolean',
      description: 'Whether to render tabs vertically.',
    },
    activeIndex: {
      control: 'number',
      description: 'Index of the initially active tab (0-based).',
    },
  },
};

export default meta;
type Story = StoryObj<VTabs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <v-tabs [variant]="variant" [size]="size" [vertical]="vertical" [activeIndex]="activeIndex">
        <v-tab-item label="Overview">Overview content goes here.</v-tab-item>
        <v-tab-item label="Analytics" count="12">Analytics content goes here.</v-tab-item>
        <v-tab-item label="Reports">Reports content goes here.</v-tab-item>
        <v-tab-item label="Disabled" [disabled]="true">This tab is disabled.</v-tab-item>
      </v-tabs>
    `,
  }),
  args: {
    variant: 'line',
    size: 'md',
    vertical: false,
    activeIndex: 0,
  },
};

export const Small: Story = {
  render: (args) => ({
    props: args,
    template: `
      <v-tabs variant="line" size="sm" [activeIndex]="0">
        <v-tab-item label="Tab One">Small tab content one.</v-tab-item>
        <v-tab-item label="Tab Two">Small tab content two.</v-tab-item>
      </v-tabs>
    `,
  }),
};

export const Large: Story = {
  render: (args) => ({
    props: args,
    template: `
      <v-tabs variant="line" size="lg" [activeIndex]="0">
        <v-tab-item label="Tab One">Large tab content one.</v-tab-item>
        <v-tab-item label="Tab Two">Large tab content two.</v-tab-item>
      </v-tabs>
    `,
  }),
};

export const Vertical: Story = {
  render: (args) => ({
    props: args,
    template: `
      <v-tabs variant="line" size="md" [vertical]="true" [activeIndex]="0">
        <v-tab-item label="Profile">Profile content.</v-tab-item>
        <v-tab-item label="Settings">Settings content.</v-tab-item>
        <v-tab-item label="Notifications" count="5">Notifications content.</v-tab-item>
      </v-tabs>
    `,
  }),
};

export const WithCounts: Story = {
  render: (args) => ({
    props: args,
    template: `
      <v-tabs variant="line" size="md" [activeIndex]="0">
        <v-tab-item label="All" count="48">All items listed here.</v-tab-item>
        <v-tab-item label="Active" count="32">Active items listed here.</v-tab-item>
        <v-tab-item label="Archived" count="16">Archived items listed here.</v-tab-item>
      </v-tabs>
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
            <v-tabs variant="line" size="md" [activeIndex]="0">
              <v-tab-item label="Overview">Overview content for this product.</v-tab-item>
              <v-tab-item label="Analytics">Analytics data for this product.</v-tab-item>
              <v-tab-item label="Settings">Settings for this product.</v-tab-item>
            </v-tabs>
            <p class="dnd-caption">Use tabs to switch between sibling content sections of the same level — all tabs show content about the same subject.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-tabs variant="line" size="md" [activeIndex]="0">
              <v-tab-item label="Step 1: Account">Set up your account details here.</v-tab-item>
              <v-tab-item label="Step 2: Details">Enter personal information.</v-tab-item>
              <v-tab-item label="Step 3: Review">Confirm and submit.</v-tab-item>
            </v-tabs>
            <p class="dnd-caption">Don't use tabs for sequential steps or wizards — use the Stepper component instead which enforces order and shows progress.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
