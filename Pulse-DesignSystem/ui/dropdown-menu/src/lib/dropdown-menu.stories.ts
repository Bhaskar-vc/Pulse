import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { VDropdownMenu } from './dropdown-menu.component';
import { VDropdownMenuTrigger } from './dropdown-menu-trigger.component';
import { VDropdownMenuContent } from './dropdown-menu-content.component';
import { VDropdownMenuItem } from './dropdown-menu-item.component';
import { VDropdownMenuGroup } from './dropdown-menu-group.component';
import { VDropdownMenuDivider } from './dropdown-menu-divider.component';
import { VDropdownMenuLabel } from './dropdown-menu-label.component';
import { VDropdownMenuShortcut } from './dropdown-menu-shortcut.component';
import { VButton } from '@pulse-ds/ui/button';

const meta: Meta<VDropdownMenu> = {
  title: 'Layout/DropdownMenu',
  component: VDropdownMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    moduleMetadata({
      imports: [
        OverlayModule,
        VDropdownMenuTrigger,
        VDropdownMenuContent,
        VDropdownMenuItem,
        VDropdownMenuGroup,
        VDropdownMenuDivider,
        VDropdownMenuLabel,
        VDropdownMenuShortcut,
        VButton,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<VDropdownMenu>;

// --- Default ---
export const Default: Story = {
  render: () => ({
    template: `
      <v-dropdown-menu>
        <v-dropdown-menu-trigger>
          <v-button variant="outlined" color="secondary">Open Menu</v-button>
        </v-dropdown-menu-trigger>
        <v-dropdown-menu-content>
          <v-dropdown-menu-label>My Account</v-dropdown-menu-label>
          <v-dropdown-menu-divider></v-dropdown-menu-divider>
          <v-dropdown-menu-group>
            <v-dropdown-menu-item>
              Profile
              <v-dropdown-menu-shortcut>Ctrl+P</v-dropdown-menu-shortcut>
            </v-dropdown-menu-item>
            <v-dropdown-menu-item>
              Settings
              <v-dropdown-menu-shortcut>Ctrl+S</v-dropdown-menu-shortcut>
            </v-dropdown-menu-item>
            <v-dropdown-menu-item>
              Keyboard shortcuts
              <v-dropdown-menu-shortcut>Ctrl+K</v-dropdown-menu-shortcut>
            </v-dropdown-menu-item>
          </v-dropdown-menu-group>
          <v-dropdown-menu-divider></v-dropdown-menu-divider>
          <v-dropdown-menu-item>Log out</v-dropdown-menu-item>
        </v-dropdown-menu-content>
      </v-dropdown-menu>
    `,
  }),
};

// --- With Disabled Item ---
export const WithDisabledItem: Story = {
  render: () => ({
    template: `
      <v-dropdown-menu>
        <v-dropdown-menu-trigger>
          <v-button variant="solid" color="primary">Actions</v-button>
        </v-dropdown-menu-trigger>
        <v-dropdown-menu-content>
          <v-dropdown-menu-item>Edit</v-dropdown-menu-item>
          <v-dropdown-menu-item>Duplicate</v-dropdown-menu-item>
          <v-dropdown-menu-item [disabled]="true">Archive</v-dropdown-menu-item>
          <v-dropdown-menu-divider></v-dropdown-menu-divider>
          <v-dropdown-menu-item variant="destructive">Delete</v-dropdown-menu-item>
        </v-dropdown-menu-content>
      </v-dropdown-menu>
    `,
  }),
};

// --- Destructive and Success Variants ---
export const ItemVariants: Story = {
  render: () => ({
    template: `
      <v-dropdown-menu>
        <v-dropdown-menu-trigger>
          <v-button variant="outlined" color="secondary">Item Variants</v-button>
        </v-dropdown-menu-trigger>
        <v-dropdown-menu-content>
          <v-dropdown-menu-item variant="default">Default Item</v-dropdown-menu-item>
          <v-dropdown-menu-item variant="success">Success Item</v-dropdown-menu-item>
          <v-dropdown-menu-item variant="destructive">Destructive Item</v-dropdown-menu-item>
        </v-dropdown-menu-content>
      </v-dropdown-menu>
    `,
  }),
};

// --- Content Sizes ---
export const ContentSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px;">
        <v-dropdown-menu>
          <v-dropdown-menu-trigger>
            <v-button variant="outlined" color="secondary" size="sm">Small</v-button>
          </v-dropdown-menu-trigger>
          <v-dropdown-menu-content size="sm">
            <v-dropdown-menu-item size="sm">Option A</v-dropdown-menu-item>
            <v-dropdown-menu-item size="sm">Option B</v-dropdown-menu-item>
            <v-dropdown-menu-item size="sm">Option C</v-dropdown-menu-item>
          </v-dropdown-menu-content>
        </v-dropdown-menu>

        <v-dropdown-menu>
          <v-dropdown-menu-trigger>
            <v-button variant="outlined" color="secondary">Medium</v-button>
          </v-dropdown-menu-trigger>
          <v-dropdown-menu-content size="md">
            <v-dropdown-menu-item size="md">Option A</v-dropdown-menu-item>
            <v-dropdown-menu-item size="md">Option B</v-dropdown-menu-item>
            <v-dropdown-menu-item size="md">Option C</v-dropdown-menu-item>
          </v-dropdown-menu-content>
        </v-dropdown-menu>

        <v-dropdown-menu>
          <v-dropdown-menu-trigger>
            <v-button variant="outlined" color="secondary" size="lg">Large</v-button>
          </v-dropdown-menu-trigger>
          <v-dropdown-menu-content size="lg">
            <v-dropdown-menu-item size="lg">Option A</v-dropdown-menu-item>
            <v-dropdown-menu-item size="lg">Option B</v-dropdown-menu-item>
            <v-dropdown-menu-item size="lg">Option C</v-dropdown-menu-item>
          </v-dropdown-menu-content>
        </v-dropdown-menu>
      </div>
    `,
  }),
};

// --- With Groups and Labels ---
export const GroupsAndLabels: Story = {
  render: () => ({
    template: `
      <v-dropdown-menu>
        <v-dropdown-menu-trigger>
          <v-button variant="outlined" color="secondary">Grouped Menu</v-button>
        </v-dropdown-menu-trigger>
        <v-dropdown-menu-content>
          <v-dropdown-menu-label>Navigation</v-dropdown-menu-label>
          <v-dropdown-menu-group>
            <v-dropdown-menu-item>Home</v-dropdown-menu-item>
            <v-dropdown-menu-item>Dashboard</v-dropdown-menu-item>
            <v-dropdown-menu-item>Reports</v-dropdown-menu-item>
          </v-dropdown-menu-group>
          <v-dropdown-menu-divider></v-dropdown-menu-divider>
          <v-dropdown-menu-label>Account</v-dropdown-menu-label>
          <v-dropdown-menu-group>
            <v-dropdown-menu-item>Profile</v-dropdown-menu-item>
            <v-dropdown-menu-item>Billing</v-dropdown-menu-item>
          </v-dropdown-menu-group>
          <v-dropdown-menu-divider></v-dropdown-menu-divider>
          <v-dropdown-menu-item variant="destructive">Sign Out</v-dropdown-menu-item>
        </v-dropdown-menu-content>
      </v-dropdown-menu>
    `,
  }),
};

// --- With Inset Items ---
export const InsetItems: Story = {
  render: () => ({
    template: `
      <v-dropdown-menu>
        <v-dropdown-menu-trigger>
          <v-button variant="outlined" color="secondary">Inset Menu</v-button>
        </v-dropdown-menu-trigger>
        <v-dropdown-menu-content>
          <v-dropdown-menu-label>Options</v-dropdown-menu-label>
          <v-dropdown-menu-divider></v-dropdown-menu-divider>
          <v-dropdown-menu-item [inset]="true">Indented Item 1</v-dropdown-menu-item>
          <v-dropdown-menu-item [inset]="true">Indented Item 2</v-dropdown-menu-item>
          <v-dropdown-menu-item [inset]="true">Indented Item 3</v-dropdown-menu-item>
        </v-dropdown-menu-content>
      </v-dropdown-menu>
    `,
  }),
};

// --- Label Variants ---
export const LabelVariants: Story = {
  render: () => ({
    template: `
      <v-dropdown-menu>
        <v-dropdown-menu-trigger>
          <v-button variant="outlined" color="secondary">Label Variants</v-button>
        </v-dropdown-menu-trigger>
        <v-dropdown-menu-content>
          <v-dropdown-menu-label variant="default">Default Label</v-dropdown-menu-label>
          <v-dropdown-menu-item>Item under default</v-dropdown-menu-item>
          <v-dropdown-menu-divider></v-dropdown-menu-divider>
          <v-dropdown-menu-label variant="muted">Muted Label</v-dropdown-menu-label>
          <v-dropdown-menu-item>Item under muted</v-dropdown-menu-item>
          <v-dropdown-menu-divider></v-dropdown-menu-divider>
          <v-dropdown-menu-label variant="accent">Accent Label</v-dropdown-menu-label>
          <v-dropdown-menu-item>Item under accent</v-dropdown-menu-item>
        </v-dropdown-menu-content>
      </v-dropdown-menu>
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
            <v-dropdown-menu>
              <v-dropdown-menu-trigger>
                <v-button variant="outlined" color="secondary">Actions</v-button>
              </v-dropdown-menu-trigger>
              <v-dropdown-menu-content>
                <v-dropdown-menu-label>Account</v-dropdown-menu-label>
                <v-dropdown-menu-group>
                  <v-dropdown-menu-item>Profile</v-dropdown-menu-item>
                  <v-dropdown-menu-item>Settings</v-dropdown-menu-item>
                </v-dropdown-menu-group>
                <v-dropdown-menu-divider></v-dropdown-menu-divider>
                <v-dropdown-menu-item variant="destructive">Delete account</v-dropdown-menu-item>
              </v-dropdown-menu-content>
            </v-dropdown-menu>
            <p class="dnd-caption">Group related actions with labels and place destructive actions at the bottom, separated by a divider.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <v-dropdown-menu>
              <v-dropdown-menu-trigger>
                <v-button variant="outlined" color="secondary">Menu</v-button>
              </v-dropdown-menu-trigger>
              <v-dropdown-menu-content>
                <v-dropdown-menu-item>Profile</v-dropdown-menu-item>
                <v-dropdown-menu-item>Settings</v-dropdown-menu-item>
                <v-dropdown-menu-item>Billing</v-dropdown-menu-item>
                <v-dropdown-menu-item>Reports</v-dropdown-menu-item>
                <v-dropdown-menu-item>Integrations</v-dropdown-menu-item>
                <v-dropdown-menu-item>API Keys</v-dropdown-menu-item>
                <v-dropdown-menu-item>Audit Log</v-dropdown-menu-item>
                <v-dropdown-menu-item>Team</v-dropdown-menu-item>
                <v-dropdown-menu-item variant="destructive">Delete</v-dropdown-menu-item>
              </v-dropdown-menu-content>
            </v-dropdown-menu>
            <p class="dnd-caption">Don't put more than 7–8 items in a flat list without grouping — it's hard to scan and overwhelming.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
