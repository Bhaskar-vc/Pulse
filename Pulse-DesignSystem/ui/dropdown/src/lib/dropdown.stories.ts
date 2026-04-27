import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { VDropdown } from './dropdown.component';
import { DropdownItem } from './dropdown.types';

const sampleItems: DropdownItem[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const countryItems: DropdownItem[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'mx', label: 'Mexico' },
];

const iconItems: DropdownItem[] = [
  {
    value: 'edit',
    label: 'Edit',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#667085" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  },
  {
    value: 'duplicate',
    label: 'Duplicate',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="#667085" stroke-width="1.8"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="#667085" stroke-width="1.8"/></svg>`,
  },
  {
    value: 'archive',
    label: 'Archive',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><polyline points="21 8 21 21 3 21 3 8" stroke="#667085" stroke-width="1.8" stroke-linecap="round"/><rect x="1" y="3" width="22" height="5" rx="1" stroke="#667085" stroke-width="1.8"/><line x1="10" y1="12" x2="14" y2="12" stroke="#667085" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  },
  {
    value: 'delete',
    label: 'Delete',
    danger: true,
    dividerBefore: true,
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="#f04438" stroke-width="1.8" stroke-linecap="round"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6" stroke="#f04438" stroke-width="1.8" stroke-linecap="round"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="#f04438" stroke-width="1.8"/></svg>`,
  },
];

const avatarGroupedItems: DropdownItem[] = [
  {
    value: 'jl',
    label: 'Jordan Lee',
    description: 'Senior Designer',
    avatar: 'JL',
    group: 'Design',
  },
  {
    value: 'rk',
    label: 'Riley Kim',
    description: 'Design Systems',
    avatar: 'RK',
    avatarBg: '#ecfdf3',
    avatarColor: '#039855',
    group: 'Design',
  },
  {
    value: 'am',
    label: 'Alex Morgan',
    description: 'Frontend Engineer',
    avatar: 'AM',
    avatarBg: '#fdf2fa',
    avatarColor: '#c11574',
    group: 'Engineering',
    dividerBefore: true,
  },
  {
    value: 'sc',
    label: 'Sam Chen',
    description: 'Full Stack',
    avatar: 'SC',
    avatarBg: '#eff8ff',
    avatarColor: '#026aa2',
    group: 'Engineering',
  },
];

const multiItems: DropdownItem[] = [
  { value: 'item1', label: 'Quarterly Review' },
  { value: 'item2', label: 'Design Critique' },
  { value: 'item3', label: 'Sprint Planning' },
  { value: 'item4', label: 'Retrospective' },
  { value: 'item5', label: 'Stakeholder Sync' },
  { value: 'item6', label: 'Team All Hands' },
  { value: 'item7', label: 'Product Demo' },
];

const meta: Meta<VDropdown> = {
  title: 'Form Controls/Dropdown',
  component: VDropdown,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  parameters: {
    layout: 'centered',
    docs: { canvas: { additionalActions: [] } },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Available options',
    },
    value: {
      control: 'text',
      description: 'Selected value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown when nothing is selected',
    },
    label: {
      control: 'text',
      description: 'Optional field label',
    },
    hint: {
      control: 'text',
      description: 'Optional hint text',
    },
    hasError: {
      control: 'boolean',
      description: 'Error state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    searchable: {
      control: 'boolean',
      description: 'Show search box in menu',
    },
    multi: {
      control: 'boolean',
      description: 'Multi-select mode',
    },
  },
};

export default meta;
type Story = StoryObj<VDropdown>;

export const Default: Story = {
  args: {
    items: sampleItems,
    placeholder: 'Select a fruit',
    label: 'Fruit',
    hint: '',
    hasError: false,
    disabled: false,
    searchable: false,
  },
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      items: iconItems,
      placeholder: 'Select action',
      label: 'Action',
    },
    template: `
      <div style="width:220px;">
        <v-dropdown
          [items]="items"
          [placeholder]="placeholder"
          [label]="label"
        ></v-dropdown>
      </div>
    `,
  }),
};

export const WithAvatarsGrouped: Story = {
  render: () => ({
    props: {
      items: avatarGroupedItems,
      placeholder: 'Assign to team member',
      label: 'Assignee',
    },
    template: `
      <div style="width:260px;">
        <v-dropdown
          [items]="items"
          [placeholder]="placeholder"
          [label]="label"
        ></v-dropdown>
      </div>
    `,
  }),
};

export const WithSearch: Story = {
  args: {
    items: countryItems,
    placeholder: 'Search country…',
    label: 'Country',
    searchable: true,
    hasError: false,
    disabled: false,
  },
};

export const WithLabel: Story = {
  args: {
    items: sampleItems,
    placeholder: 'Choose an option',
    label: 'Favorite fruit',
    hint: 'Pick the one you like most',
    hasError: false,
    disabled: false,
    searchable: false,
  },
};

export const WithError: Story = {
  args: {
    items: sampleItems,
    placeholder: 'Select a fruit',
    label: 'Fruit',
    hasError: true,
    errorMessage: 'This field is required',
    disabled: false,
    searchable: false,
  },
};

export const PreSelected: Story = {
  args: {
    items: sampleItems,
    value: 'cherry',
    placeholder: 'Select a fruit',
    label: 'Fruit',
    hasError: false,
    disabled: false,
    searchable: false,
  },
};

export const Disabled: Story = {
  args: {
    items: sampleItems,
    placeholder: 'Cannot select',
    label: 'Fruit',
    hasError: false,
    disabled: true,
    searchable: false,
  },
};

export const MultiSelect: Story = {
  render: () => ({
    props: {
      items: multiItems,
      selectedValues: ['item3', 'item4', 'item5'],
    },
    template: `
      <div style="width:280px;">
        <v-dropdown
          [items]="items"
          [multi]="true"
          [selectedValues]="selectedValues"
          (selectedValuesChange)="selectedValues = $event"
          placeholder="Select meetings…"
          label="Meetings"
          multiHint="Select all that apply"
        ></v-dropdown>
      </div>
    `,
  }),
};

export const NavMenu: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="position:relative;display:inline-block;min-width:240px;">
        <div style="
          position:absolute;top:0;left:0;
          min-width:240px;background:#fff;
          border:1px solid #e4e7ec;border-radius:10px;
          box-shadow:0 8px 24px rgba(16,24,40,.12);
          z-index:1000;overflow:hidden;
          font-family:'Inter',sans-serif;
        ">
          <!-- Profile header -->
          <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #f2f4f7;">
            <div style="
              width:36px;height:36px;border-radius:50%;
              background:#f4ebff;color:#6941c6;
              display:flex;align-items:center;justify-content:center;
              font-size:13px;font-weight:700;flex-shrink:0;
            ">OR</div>
            <div style="display:flex;flex-direction:column;gap:1px;min-width:0;">
              <span style="font-size:13px;font-weight:600;color:#101828;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Olivia Rhye</span>
              <span style="font-size:11px;color:#667085;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">olivia&#64;untitledui.com</span>
            </div>
          </div>
          <!-- Nav items -->
          <div style="padding:4px 0;">
            <div style="display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:13px;color:#344054;cursor:pointer;transition:background .1s;" onmouseenter="this.style.background='#f9fafb'" onmouseleave="this.style.background='transparent'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#667085" stroke-width="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#667085" stroke-width="1.8" stroke-linecap="round"/></svg>
              View profile
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:13px;color:#344054;cursor:pointer;" onmouseenter="this.style.background='#f9fafb'" onmouseleave="this.style.background='transparent'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="#667085" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="#667085" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="#667085" stroke-width="1.8"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="#667085" stroke-width="1.8"/></svg>
              Workspace shortcuts
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:13px;color:#344054;cursor:pointer;" onmouseenter="this.style.background='#f9fafb'" onmouseleave="this.style.background='transparent'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#667085" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="#667085" stroke-width="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#667085" stroke-width="1.8" stroke-linecap="round"/></svg>
              Team
            </div>
          </div>
          <div style="height:1px;background:#f2f4f7;margin:0;"></div>
          <div style="padding:4px 0;">
            <div style="display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:13px;color:#344054;cursor:pointer;" onmouseenter="this.style.background='#f9fafb'" onmouseleave="this.style.background='transparent'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#667085" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Emergency
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:13px;color:#344054;cursor:pointer;" onmouseenter="this.style.background='#f9fafb'" onmouseleave="this.style.background='transparent'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#667085" stroke-width="1.8"/><path d="M12 8v4M12 16h.01" stroke="#667085" stroke-width="1.8" stroke-linecap="round"/></svg>
              Support
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:13px;color:#344054;cursor:pointer;" onmouseenter="this.style.background='#f9fafb'" onmouseleave="this.style.background='transparent'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M8 9l3 3-3 3M13 15h3" stroke="#667085" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="2" y="4" width="20" height="16" rx="3" stroke="#667085" stroke-width="1.8"/></svg>
              API
            </div>
          </div>
          <div style="height:1px;background:#f2f4f7;margin:0;"></div>
          <div style="padding:4px 0;">
            <div style="display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:13px;color:#f04438;cursor:pointer;" onmouseenter="this.style.background='#fff5f5'" onmouseleave="this.style.background='transparent'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="#f04438" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Log out
            </div>
          </div>
          <!-- Footer button -->
          <div style="padding:10px 16px;border-top:1px solid #f2f4f7;">
            <button style="
              width:100%;height:36px;
              background:#7f56d9;color:#fff;
              border:none;border-radius:8px;
              font-family:'Inter',sans-serif;font-size:13px;font-weight:600;
              cursor:pointer;
            ">Upgrade to Pro</button>
          </div>
        </div>
      </div>
    `,
  }),
};

export const DoAndDont: Story = {
  render: (args) => ({
    props: { ...args, sampleItems, binaryItems: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    template: `
      <div class="dnd-wrap">
        <div class="dnd-do">
          <div class="dnd-do-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Do
          </div>
          <div class="dnd-do-body">
            <v-dropdown [items]="sampleItems" placeholder="Select a fruit" label="Favourite fruit"></v-dropdown>
            <p class="dnd-caption">Include a clear placeholder so users know the field is unset and what to select.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-dropdown [items]="binaryItems" placeholder="Choose" label="Send notifications?"></v-dropdown>
            <p class="dnd-caption">Don't use a dropdown for only 2 options — prefer radio buttons or a toggle for binary choices.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
