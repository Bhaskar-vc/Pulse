import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VTooltip } from './tooltip.component';
import { VTooltipTrigger } from './tooltip-trigger.component';
import { VTooltipContent } from './tooltip-content.component';
import { VTooltipService } from './tooltip.service';

const meta: Meta<VTooltip> = {
  title: 'Feedback/Tooltip',
  component: VTooltip,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [VTooltipTrigger, VTooltipContent, OverlayModule, BrowserAnimationsModule],
      providers: [VTooltipService],
    }),
  ],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'info', 'danger', 'neutral', 'white'],
      description: 'Tooltip color theme',
    },
    placement: {
      control: 'select',
      options: [
        'top-start', 'top', 'top-end',
        'bottom-start', 'bottom', 'bottom-end',
        'left-start', 'left', 'left-end',
        'right-start', 'right', 'right-end',
      ],
      description: 'Tooltip placement relative to trigger',
    },
    offset: {
      control: 'number',
      description: 'Offset distance from trigger in pixels',
    },
    openDelay: {
      control: 'number',
      description: 'Delay before showing tooltip (ms)',
    },
    closeDelay: {
      control: 'number',
      description: 'Delay before hiding tooltip (ms)',
    },
    customClass: {
      control: 'text',
      description: 'Custom CSS class for tooltip',
    },
  },
};

export default meta;
type Story = StoryObj<VTooltip>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; text-align: center;">
        <v-tooltip [color]="color" [placement]="placement" [offset]="offset">
          <v-tooltip-trigger>
            <button style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">
              Hover me
            </button>
          </v-tooltip-trigger>
          <v-tooltip-content>
            This is a tooltip
          </v-tooltip-content>
        </v-tooltip>
      </div>
    `,
  }),
  args: {
    color: 'default',
    placement: 'top',
    offset: 8,
    openDelay: 0,
    closeDelay: 0,
  },
};

export const Placements: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 100px 60px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center;">
          <v-tooltip placement="top-start">
            <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">top-start</button></v-tooltip-trigger>
            <v-tooltip-content>Top Start</v-tooltip-content>
          </v-tooltip>
        </div>
        <div style="text-align: center;">
          <v-tooltip placement="top">
            <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">top</button></v-tooltip-trigger>
            <v-tooltip-content>Top</v-tooltip-content>
          </v-tooltip>
        </div>
        <div style="text-align: center;">
          <v-tooltip placement="top-end">
            <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">top-end</button></v-tooltip-trigger>
            <v-tooltip-content>Top End</v-tooltip-content>
          </v-tooltip>
        </div>
        <div style="text-align: center;">
          <v-tooltip placement="left">
            <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">left</button></v-tooltip-trigger>
            <v-tooltip-content>Left</v-tooltip-content>
          </v-tooltip>
        </div>
        <div></div>
        <div style="text-align: center;">
          <v-tooltip placement="right">
            <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">right</button></v-tooltip-trigger>
            <v-tooltip-content>Right</v-tooltip-content>
          </v-tooltip>
        </div>
        <div style="text-align: center;">
          <v-tooltip placement="bottom-start">
            <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">bottom-start</button></v-tooltip-trigger>
            <v-tooltip-content>Bottom Start</v-tooltip-content>
          </v-tooltip>
        </div>
        <div style="text-align: center;">
          <v-tooltip placement="bottom">
            <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">bottom</button></v-tooltip-trigger>
            <v-tooltip-content>Bottom</v-tooltip-content>
          </v-tooltip>
        </div>
        <div style="text-align: center;">
          <v-tooltip placement="bottom-end">
            <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">bottom-end</button></v-tooltip-trigger>
            <v-tooltip-content>Bottom End</v-tooltip-content>
          </v-tooltip>
        </div>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; padding: 80px 40px; flex-wrap: wrap;">
        <v-tooltip color="default" placement="top">
          <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">Default</button></v-tooltip-trigger>
          <v-tooltip-content>Default tooltip</v-tooltip-content>
        </v-tooltip>
        <v-tooltip color="primary" placement="top">
          <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">Primary</button></v-tooltip-trigger>
          <v-tooltip-content>Primary tooltip</v-tooltip-content>
        </v-tooltip>
        <v-tooltip color="success" placement="top">
          <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">Success</button></v-tooltip-trigger>
          <v-tooltip-content>Success tooltip</v-tooltip-content>
        </v-tooltip>
        <v-tooltip color="danger" placement="top">
          <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">Danger</button></v-tooltip-trigger>
          <v-tooltip-content>Danger tooltip</v-tooltip-content>
        </v-tooltip>
        <v-tooltip color="white" placement="top">
          <v-tooltip-trigger><button style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">White</button></v-tooltip-trigger>
          <v-tooltip-content>White tooltip</v-tooltip-content>
        </v-tooltip>
      </div>
    `,
  }),
};

export const White: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; padding: 80px 40px; flex-wrap: wrap; background: #f4f4f6;">
        <v-tooltip color="white" placement="top">
          <v-tooltip-trigger><button style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; background: #fff;">Top</button></v-tooltip-trigger>
          <v-tooltip-content>White tooltip above</v-tooltip-content>
        </v-tooltip>
        <v-tooltip color="white" placement="bottom">
          <v-tooltip-trigger><button style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; background: #fff;">Bottom</button></v-tooltip-trigger>
          <v-tooltip-content>White tooltip below</v-tooltip-content>
        </v-tooltip>
        <v-tooltip color="white" placement="right">
          <v-tooltip-trigger><button style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; background: #fff;">Right</button></v-tooltip-trigger>
          <v-tooltip-content>White tooltip right</v-tooltip-content>
        </v-tooltip>
        <v-tooltip color="white" placement="left">
          <v-tooltip-trigger><button style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; background: #fff;">Left</button></v-tooltip-trigger>
          <v-tooltip-content>White tooltip left</v-tooltip-content>
        </v-tooltip>
      </div>
    `,
  }),
};

export const WithDelay: Story = {
  render: () => ({
    template: `
      <div style="padding: 80px; text-align: center;">
        <v-tooltip placement="top" [openDelay]="300" [closeDelay]="200">
          <v-tooltip-trigger>
            <button style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;">
              Hover me (300ms delay)
            </button>
          </v-tooltip-trigger>
          <v-tooltip-content>
            This tooltip has open/close delays
          </v-tooltip-content>
        </v-tooltip>
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
            <div style="padding:40px 24px;display:flex;justify-content:center;">
              <v-tooltip placement="top" color="default">
                <v-tooltip-trigger>
                  <button style="padding:8px 16px;border:1px solid #d1d5db;border-radius:6px;cursor:pointer;display:flex;align-items:center;gap:6px;">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#667085" stroke-width="1.4"/><path d="M7 6.3v3.5M7 4.9v.5" stroke="#667085" stroke-width="1.4" stroke-linecap="round"/></svg>
                    Archive
                  </button>
                </v-tooltip-trigger>
                <v-tooltip-content>Moves item to the archive. You can restore it later.</v-tooltip-content>
              </v-tooltip>
            </div>
            <p class="dnd-caption">Use tooltips to reveal supplementary information on hover for non-essential details that would clutter the UI if always visible.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <div style="padding:40px 24px;display:flex;justify-content:center;">
              <v-tooltip placement="top" color="default">
                <v-tooltip-trigger>
                  <button style="padding:8px 16px;border:1px solid #d92d20;background:#fef3f2;border-radius:6px;cursor:pointer;color:#b42318;font-weight:600;">
                    Submit form *
                  </button>
                </v-tooltip-trigger>
                <v-tooltip-content>* All fields marked with * are required to submit</v-tooltip-content>
              </v-tooltip>
            </div>
            <p class="dnd-caption">Don't put essential or required information only inside a tooltip — it's not accessible to touch/keyboard users and is invisible by default.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
