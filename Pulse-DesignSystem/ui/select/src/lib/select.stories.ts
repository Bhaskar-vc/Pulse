import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { VcSelect } from './select.component';
import { VcOption } from '@pulse-ds/ui/listbox';

const meta: Meta<VcSelect> = {
  title: 'Form Controls/Select',
  component: VcSelect,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule, VcSelect, VcOption],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['light', 'bordered'],
      description: 'Select button type',
    },
    label: {
      control: 'text',
      description: 'Select button label',
    },
    placeholder: {
      control: 'text',
      description: 'Select placeholder',
    },
    loading: {
      control: 'boolean',
      description: 'Whether loading or not',
    },
    borderLess: {
      control: 'boolean',
      description: 'Whether the dropdown will be borderless',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
    },
    size: {
      control: 'select',
      options: ['sm', 'default'],
      description: 'Size of the dropdown',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Color theme',
    },
    required: {
      control: 'boolean',
      description: 'Whether the dropdown is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    width: {
      control: 'text',
      description: 'Width of the dropdown',
    },
    widthFitContent: {
      control: 'boolean',
      description: 'Whether width should fit content',
    },
    componentStyle: {
      control: 'text',
      description: 'Inline style string',
    },
  },
};

export default meta;
type Story = StoryObj<VcSelect>;

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
    label: 'Department',
    type: 'bordered',
    size: 'default',
    theme: 'light',
    disabled: false,
    multiple: false,
    loading: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <vc-select
        [placeholder]="placeholder"
        [label]="label"
        [type]="type"
        [size]="size"
        [theme]="theme"
        [disabled]="disabled"
        [multiple]="multiple"
        [loading]="loading"
      >
        <vc-option [value]="{ id: '1', text: 'Engineering' }">Engineering</vc-option>
        <vc-option [value]="{ id: '2', text: 'Design' }">Design</vc-option>
        <vc-option [value]="{ id: '3', text: 'Marketing' }">Marketing</vc-option>
        <vc-option [value]="{ id: '4', text: 'Sales' }">Sales</vc-option>
      </vc-select>
    `,
  }),
};

export const LightType: Story = {
  args: {
    placeholder: 'Select an option',
    type: 'light',
    size: 'default',
    disabled: false,
    multiple: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <vc-select
        [placeholder]="placeholder"
        [type]="type"
        [size]="size"
        [disabled]="disabled"
        [multiple]="multiple"
      >
        <vc-option [value]="{ id: '1', text: 'Option A' }">Option A</vc-option>
        <vc-option [value]="{ id: '2', text: 'Option B' }">Option B</vc-option>
        <vc-option [value]="{ id: '3', text: 'Option C' }">Option C</vc-option>
      </vc-select>
    `,
  }),
};

export const SmallSize: Story = {
  args: {
    placeholder: 'Select',
    label: 'Size',
    type: 'bordered',
    size: 'sm',
    disabled: false,
    multiple: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <vc-select
        [placeholder]="placeholder"
        [label]="label"
        [type]="type"
        [size]="size"
        [disabled]="disabled"
        [multiple]="multiple"
      >
        <vc-option [value]="{ id: '1', text: 'Small' }">Small</vc-option>
        <vc-option [value]="{ id: '2', text: 'Medium' }">Medium</vc-option>
        <vc-option [value]="{ id: '3', text: 'Large' }">Large</vc-option>
      </vc-select>
    `,
  }),
};

export const Multiple: Story = {
  args: {
    placeholder: 'Select skills',
    label: 'Skills',
    type: 'bordered',
    size: 'default',
    disabled: false,
    multiple: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <vc-select
        [placeholder]="placeholder"
        [label]="label"
        [type]="type"
        [size]="size"
        [disabled]="disabled"
        [multiple]="multiple"
      >
        <vc-option [value]="{ id: '1', text: 'JavaScript' }">JavaScript</vc-option>
        <vc-option [value]="{ id: '2', text: 'TypeScript' }">TypeScript</vc-option>
        <vc-option [value]="{ id: '3', text: 'Python' }">Python</vc-option>
        <vc-option [value]="{ id: '4', text: 'Go' }">Go</vc-option>
        <vc-option [value]="{ id: '5', text: 'Rust' }">Rust</vc-option>
      </vc-select>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot select',
    label: 'Disabled select',
    type: 'bordered',
    size: 'default',
    disabled: true,
    multiple: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <vc-select
        [placeholder]="placeholder"
        [label]="label"
        [type]="type"
        [size]="size"
        [disabled]="disabled"
        [multiple]="multiple"
      >
        <vc-option [value]="{ id: '1', text: 'Option A' }">Option A</vc-option>
        <vc-option [value]="{ id: '2', text: 'Option B' }">Option B</vc-option>
      </vc-select>
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
            <vc-select placeholder="Select a department" label="Department" type="bordered" size="default">
              <vc-option [value]="{ id: '1', text: 'Engineering' }">Engineering</vc-option>
              <vc-option [value]="{ id: '2', text: 'Design' }">Design</vc-option>
              <vc-option [value]="{ id: '3', text: 'Marketing' }">Marketing</vc-option>
            </vc-select>
            <p class="dnd-caption">Include a clear placeholder ("Select a department") so the field never appears blank and users know what to choose.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <vc-select label="Preferred contact method" type="bordered" size="default">
              <vc-option [value]="{ id: '1', text: 'Email' }">Email</vc-option>
              <vc-option [value]="{ id: '2', text: 'Phone' }">Phone</vc-option>
              <vc-option [value]="{ id: '3', text: 'SMS' }">SMS</vc-option>
            </vc-select>
            <p class="dnd-caption">Don't pre-select an option when all choices are equally valid — let the user make an explicit, intentional decision.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
