import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VAvatar } from './avatar.component';
import { VAvatarGroup } from './avatar-group.component';

const meta: Meta<VAvatar> = {
  title: 'Data Display/Avatar',
  component: VAvatar,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [VAvatarGroup] })],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    initials: {
      control: 'text',
      description: 'Up to 2 initials displayed when no image',
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size',
    },
    color: {
      control: 'select',
      options: ['purple', 'blue', 'green', 'orange', 'teal', 'pink', 'gray'],
      description: 'Background color palette (used when showing initials or placeholder)',
    },
    showOnline: {
      control: 'boolean',
      description: 'Show online status indicator',
    },
    alt: {
      control: 'text',
      description: 'Image alt text',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the avatar',
    },
  },
};

export default meta;
type Story = StoryObj<VAvatar>;

export const Default: Story = {
  args: {
    initials: 'BG',
    size: 'md',
    color: 'purple',
    showOnline: false,
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    size: 'md',
    alt: 'User avatar',
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'JD',
    size: 'lg',
    color: 'blue',
  },
};

export const OnlineStatus: Story = {
  args: {
    initials: 'AB',
    size: 'md',
    color: 'green',
    showOnline: true,
  },
};

export const Placeholder: Story = {
  args: {
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <v-avatar initials="BG" size="2xs" color="purple"></v-avatar>
        <v-avatar initials="BG" size="xs" color="purple"></v-avatar>
        <v-avatar initials="BG" size="sm" color="purple"></v-avatar>
        <v-avatar initials="BG" size="md" color="purple"></v-avatar>
        <v-avatar initials="BG" size="lg" color="purple"></v-avatar>
        <v-avatar initials="BG" size="xl" color="purple"></v-avatar>
        <v-avatar initials="BG" size="2xl" color="purple"></v-avatar>
      </div>
    `,
  }),
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <v-avatar initials="AB" color="purple"></v-avatar>
        <v-avatar initials="CD" color="blue"></v-avatar>
        <v-avatar initials="EF" color="green"></v-avatar>
        <v-avatar initials="GH" color="orange"></v-avatar>
        <v-avatar initials="IJ" color="teal"></v-avatar>
        <v-avatar initials="KL" color="pink"></v-avatar>
        <v-avatar initials="MN" color="gray"></v-avatar>
      </div>
    `,
  }),
};

export const Group: Story = {
  render: () => ({
    template: `
      <v-avatar-group size="md">
        <v-avatar src="https://i.pravatar.cc/150?img=1" size="md"></v-avatar>
        <v-avatar src="https://i.pravatar.cc/150?img=2" size="md"></v-avatar>
        <v-avatar src="https://i.pravatar.cc/150?img=3" size="md"></v-avatar>
        <v-avatar initials="+3" size="md" color="gray"></v-avatar>
      </v-avatar-group>
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
            <div style="display:flex;align-items:center;gap:12px;">
              <v-avatar initials="JD" size="md" color="blue" ariaLabel="Jane Doe"></v-avatar>
              <span style="font-size:14px;color:#344054;">Jane Doe</span>
            </div>
            <p class="dnd-caption">Always provide initials as fallback when no image is available, and include a visible name label or aria-label for context.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-avatar size="md"></v-avatar>
            <p class="dnd-caption">Don't use avatar-only with no initials, alt text, or label context — screen readers and users won't know who it represents.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
