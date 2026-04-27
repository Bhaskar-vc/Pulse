import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VcAutocomplete } from './autocomplete.component';
import { VcOption } from '@pulse-ds/ui/listbox';

const sampleOptions = [
  { id: '1', text: 'United States' },
  { id: '2', text: 'United Kingdom' },
  { id: '3', text: 'India' },
  { id: '4', text: 'Germany' },
  { id: '5', text: 'France' },
  { id: '6', text: 'Canada' },
  { id: '7', text: 'Australia' },
  { id: '8', text: 'Japan' },
];

const meta: Meta<VcAutocomplete> = {
  title: 'Utilities/Autocomplete',
  component: VcAutocomplete,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [VcOption],
    }),
  ],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the autocomplete input.',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the autocomplete is in a loading state.',
    },
    borderLess: {
      control: 'boolean',
      description: 'Whether the dropdown should be rendered without a border.',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected.',
    },
    showSelectAllCheckbox: {
      control: 'boolean',
      description: 'Show "Select All" checkbox (multiple mode only).',
    },
    panelHintText: {
      control: 'text',
      description: 'Hint text shown in the autocomplete panel header.',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the autocomplete input is disabled.',
    },
  },
};

export default meta;
type Story = StoryObj<VcAutocomplete>;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, options: sampleOptions },
    template: `
      <vc-autocomplete
        [placeholder]="placeholder"
        [loading]="loading"
        [disabled]="disabled"
        [required]="required"
        [multiple]="multiple"
        [borderLess]="borderLess"
      >
        @for (opt of options; track opt.id) {
          <vc-option [value]="opt"></vc-option>
        }
      </vc-autocomplete>
    `,
  }),
  args: {
    placeholder: 'Search countries...',
    loading: false,
    disabled: false,
    required: false,
    multiple: false,
    borderLess: false,
  },
};

export const MultipleSelection: Story = {
  render: (args) => ({
    props: { ...args, options: sampleOptions },
    template: `
      <vc-autocomplete
        [placeholder]="placeholder"
        [multiple]="multiple"
        [showSelectAllCheckbox]="showSelectAllCheckbox"
        [panelHintText]="panelHintText"
      >
        @for (opt of options; track opt.id) {
          <vc-option [value]="opt"></vc-option>
        }
      </vc-autocomplete>
    `,
  }),
  args: {
    placeholder: 'Select countries...',
    multiple: true,
    showSelectAllCheckbox: true,
    panelHintText: 'Select one or more countries',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    props: { ...args, options: sampleOptions },
    template: `
      <vc-autocomplete
        placeholder="Cannot interact"
        [disabled]="true"
      >
        @for (opt of options; track opt.id) {
          <vc-option [value]="opt"></vc-option>
        }
      </vc-autocomplete>
    `,
  }),
};

export const Borderless: Story = {
  render: (args) => ({
    props: { ...args, options: sampleOptions },
    template: `
      <vc-autocomplete
        placeholder="Borderless autocomplete"
        [borderLess]="true"
      >
        @for (opt of options; track opt.id) {
          <vc-option [value]="opt"></vc-option>
        }
      </vc-autocomplete>
    `,
  }),
};

export const WithPreselection: Story = {
  render: (args) => ({
    props: { ...args, options: sampleOptions, preselected: [sampleOptions[2]] },
    template: `
      <vc-autocomplete
        placeholder="Search countries..."
        [selected]="preselected"
      >
        @for (opt of options; track opt.id) {
          <vc-option [value]="opt"></vc-option>
        }
      </vc-autocomplete>
    `,
  }),
};

export const DoAndDont: Story = {
  render: (args) => ({
    props: { ...args, options: sampleOptions },
    template: `
      <div class="dnd-wrap">
        <div class="dnd-do">
          <div class="dnd-do-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Do
          </div>
          <div class="dnd-do-body">
            <div style="width: 100%;">
              <label style="display:block;font-size:13px;font-weight:500;color:#344054;margin-bottom:6px;">Country</label>
              <vc-autocomplete placeholder="Search countries...">
                @for (opt of options; track opt.id) {
                  <vc-option [value]="opt"></vc-option>
                }
              </vc-autocomplete>
            </div>
            <p class="dnd-caption">Provide a clear placeholder and visible label so users know what to search for.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <vc-autocomplete [disabled]="true">
              @for (opt of options; track opt.id) {
                <vc-option [value]="opt"></vc-option>
              }
            </vc-autocomplete>
            <p class="dnd-caption">Don't use without a visible label or disable the input without explaining why it's unavailable.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
