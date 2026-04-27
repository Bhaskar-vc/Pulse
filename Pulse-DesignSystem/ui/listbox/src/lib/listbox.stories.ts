import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VcListbox } from './listbox.component';
import { VcOption } from './option/option.component';
import { VcSelectOption } from './listbox.types';

const sampleOptions: VcSelectOption[] = [
  { id: '1', text: 'Engineering' },
  { id: '2', text: 'Design' },
  { id: '3', text: 'Marketing' },
  { id: '4', text: 'Sales' },
  { id: '5', text: 'Human Resources' },
];

const optionsWithSubtext: VcSelectOption[] = [
  { id: '1', text: 'Alice Johnson', subtext: 'Engineering Lead' },
  { id: '2', text: 'Bob Smith', subtext: 'Product Designer' },
  { id: '3', text: 'Carol Williams', subtext: 'Marketing Manager' },
  { id: '4', text: 'Dave Brown', subtext: 'Sales Director' },
];

const optionsWithDisabled: VcSelectOption[] = [
  { id: '1', text: 'Option A' },
  { id: '2', text: 'Option B' },
  { id: '3', text: 'Option C (disabled)', disabled: true },
  { id: '4', text: 'Option D' },
];

const meta: Meta<VcListbox> = {
  title: 'Utilities/Listbox',
  component: VcListbox,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [VcOption],
    }),
  ],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of VcSelectOption objects to render.',
    },
    selected: {
      control: 'object',
      description: 'Pre-selected option(s).',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text.',
    },
    hintText: {
      control: 'text',
      description: 'Hint text shown in the panel header (multiple mode).',
    },
    width: {
      control: 'text',
      description: 'Width of the listbox (e.g. "300px").',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the listbox is in a loading state.',
    },
    size: {
      control: 'select',
      options: ['sm', 'default'],
      description: 'Size of the listbox.',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Color theme.',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected.',
    },
    showSelectAllCheckbox: {
      control: 'boolean',
      description: 'Show a "Select All" checkbox (multiple mode only).',
    },
  },
};

export default meta;
type Story = StoryObj<VcListbox>;

export const Default: Story = {
  args: {
    options: sampleOptions,
    selected: sampleOptions[0],
    placeholder: 'Select',
    size: 'default',
    theme: 'light',
    multiple: false,
    loading: false,
  },
};

export const MultipleSelection: Story = {
  args: {
    options: sampleOptions,
    selected: [sampleOptions[0], sampleOptions[2]],
    placeholder: 'Select departments',
    multiple: true,
    showSelectAllCheckbox: true,
    hintText: 'Select one or more departments',
    size: 'default',
    theme: 'light',
  },
};

export const WithSubtext: Story = {
  args: {
    options: optionsWithSubtext,
    selected: optionsWithSubtext[1],
    placeholder: 'Select a person',
    size: 'default',
    theme: 'light',
    multiple: false,
  },
};

export const SmallSize: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select',
    size: 'sm',
    theme: 'light',
    multiple: false,
  },
};

export const DarkTheme: Story = {
  args: {
    options: sampleOptions,
    selected: sampleOptions[3],
    placeholder: 'Select',
    size: 'default',
    theme: 'dark',
    multiple: false,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: optionsWithDisabled,
    placeholder: 'Select an option',
    size: 'default',
    theme: 'light',
    multiple: false,
  },
};

export const Loading: Story = {
  args: {
    options: [],
    placeholder: 'Loading...',
    loading: true,
    size: 'default',
    theme: 'light',
  },
};

export const DoAndDont: Story = {
  render: (args) => ({
    props: { ...args, sampleOptions, binaryOptions: [{ id: '1', text: 'Yes' }, { id: '2', text: 'No' }] },
    template: `
      <div class="dnd-wrap">
        <div class="dnd-do">
          <div class="dnd-do-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Do
          </div>
          <div class="dnd-do-body">
            <vc-listbox [options]="sampleOptions" placeholder="Select a department" size="default" theme="light"></vc-listbox>
            <p class="dnd-caption">Use listbox for selecting from a long list of options (more than 5–6 items) where a dropdown would be too compact.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <vc-listbox [options]="binaryOptions" placeholder="Choose" size="default" theme="light"></vc-listbox>
            <p class="dnd-caption">Don't use listbox for binary yes/no choices — use a toggle or radio buttons instead, which are faster and more intuitive.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
