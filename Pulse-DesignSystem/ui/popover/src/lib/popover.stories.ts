import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VPopover } from './popover.component';

const meta: Meta<VPopover> = {
  title: 'Feedback/Popover',
  component: VPopover,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [VPopover, BrowserAnimationsModule] }),
  ],
  argTypes: {
    title:               { control: 'text',    description: 'Header title' },
    placement:           { control: 'select',  options: ['top','top-start','top-end','bottom','bottom-start','bottom-end','left','left-start','left-end','right','right-start','right-end'] },
    showArrow:           { control: 'boolean', description: 'Show the arrow pointer' },
    closeOnOutsideClick: { control: 'boolean', description: 'Dismiss on outside click' },
  },
};

export default meta;
type Story = StoryObj<VPopover>;

// ── Default ───────────────────────────────────────────────────
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 120px; display: flex; justify-content: center;">
        <v-popover [title]="title" [placement]="placement" [showArrow]="showArrow">
          <button trigger style="padding: 8px 18px; background: #7f56d9; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;">
            Click me
          </button>
          <p>This is the popover body. You can put any content here — text, links, or other components.</p>
        </v-popover>
      </div>
    `,
  }),
  args: {
    title:               'Popover heading',
    placement:           'bottom',
    showArrow:           true,
    closeOnOutsideClick: true,
  },
};

// ── No title ──────────────────────────────────────────────────
export const NoTitle: Story = {
  render: () => ({
    template: `
      <div style="padding: 120px; display: flex; justify-content: center;">
        <v-popover placement="bottom">
          <button trigger style="padding: 8px 18px; background: #7f56d9; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;">
            Open
          </button>
          <p>Popover without a title — just body content.</p>
        </v-popover>
      </div>
    `,
  }),
};

// ── With footer actions ────────────────────────────────────────
export const WithFooter: Story = {
  render: () => ({
    template: `
      <div style="padding: 140px; display: flex; justify-content: center;">
        <v-popover title="Confirm action" placement="bottom">
          <button trigger style="padding: 8px 18px; border: 1px solid #d0d5dd; background: #fff; border-radius: 8px; font-size: 14px; cursor: pointer;">
            Delete item
          </button>
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          <div footer>
            <button style="flex:1; padding: 7px 14px; border: 1px solid #d0d5dd; background: #fff; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; color: #344054;">
              Cancel
            </button>
            <button style="flex:1; padding: 7px 14px; border: none; background: #d92d20; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; color: #fff;">
              Delete
            </button>
          </div>
        </v-popover>
      </div>
    `,
  }),
};

// ── All placements ─────────────────────────────────────────────
export const Placements: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:40px; padding:80px 60px; max-width:640px; margin:0 auto; place-items:center;">

        <v-popover title="Top start" placement="top-start">
          <button trigger style="padding:6px 12px;border:1px solid #d0d5dd;border-radius:6px;cursor:pointer;font-size:13px;">top-start</button>
          <p style="font-size:13px;">Content here</p>
        </v-popover>

        <v-popover title="Top" placement="top">
          <button trigger style="padding:6px 12px;border:1px solid #d0d5dd;border-radius:6px;cursor:pointer;font-size:13px;">top</button>
          <p style="font-size:13px;">Content here</p>
        </v-popover>

        <v-popover title="Top end" placement="top-end">
          <button trigger style="padding:6px 12px;border:1px solid #d0d5dd;border-radius:6px;cursor:pointer;font-size:13px;">top-end</button>
          <p style="font-size:13px;">Content here</p>
        </v-popover>

        <v-popover title="Left" placement="left">
          <button trigger style="padding:6px 12px;border:1px solid #d0d5dd;border-radius:6px;cursor:pointer;font-size:13px;">left</button>
          <p style="font-size:13px;">Content here</p>
        </v-popover>

        <div></div>

        <v-popover title="Right" placement="right">
          <button trigger style="padding:6px 12px;border:1px solid #d0d5dd;border-radius:6px;cursor:pointer;font-size:13px;">right</button>
          <p style="font-size:13px;">Content here</p>
        </v-popover>

        <v-popover title="Bottom start" placement="bottom-start">
          <button trigger style="padding:6px 12px;border:1px solid #d0d5dd;border-radius:6px;cursor:pointer;font-size:13px;">bottom-start</button>
          <p style="font-size:13px;">Content here</p>
        </v-popover>

        <v-popover title="Bottom" placement="bottom">
          <button trigger style="padding:6px 12px;border:1px solid #d0d5dd;border-radius:6px;cursor:pointer;font-size:13px;">bottom</button>
          <p style="font-size:13px;">Content here</p>
        </v-popover>

        <v-popover title="Bottom end" placement="bottom-end">
          <button trigger style="padding:6px 12px;border:1px solid #d0d5dd;border-radius:6px;cursor:pointer;font-size:13px;">bottom-end</button>
          <p style="font-size:13px;">Content here</p>
        </v-popover>

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
            <div style="padding:60px 40px;display:flex;justify-content:center;">
              <v-popover title="Storage usage" placement="bottom" [showArrow]="true">
                <button trigger style="padding:6px 14px;border:1px solid #d0d5dd;border-radius:8px;font-size:13px;cursor:pointer;">
                  View details
                </button>
                <p>You have used 4.2 GB of your 10 GB storage quota. Upgrade to get more space.</p>
              </v-popover>
            </div>
            <p class="dnd-caption">Use popovers for contextual extra detail that isn't always needed — triggered on demand so it doesn't clutter the UI.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <p style="font-size:13px;color:#667085;background:#fef3f2;border:1px solid #fecdca;border-radius:8px;padding:12px 16px;margin:0;">
              Using a popover to show "Your subscription has expired — payment required to continue" forces users to click a trigger to see critical blocking information.
            </p>
            <p class="dnd-caption">Don't use a popover for critical information that requires immediate action — use a modal or alert instead so it's impossible to miss.</p>
          </div>
        </div>
      </div>
    `,
  }),
};

// ── Rich content ───────────────────────────────────────────────
export const RichContent: Story = {
  render: () => ({
    template: `
      <div style="padding: 120px; display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;">

        <!-- Profile card popover -->
        <v-popover placement="bottom-start">
          <button trigger style="display:flex;align-items:center;gap:8px;padding:6px 12px;border:1px solid #d0d5dd;border-radius:8px;cursor:pointer;font-size:14px;">
            <span style="width:28px;height:28px;border-radius:50%;background:#eef2ff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#6941c6;">AB</span>
            Alex Brown
          </button>
          <div style="display:flex;gap:12px;align-items:center;">
            <span style="width:44px;height:44px;border-radius:50%;background:#eef2ff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#6941c6;flex-shrink:0;">AB</span>
            <div>
              <div style="font-size:14px;font-weight:600;color:#101828;">Alex Brown</div>
              <div style="font-size:13px;color:#667085;">alex@company.com</div>
              <div style="font-size:12px;color:#98a2b3;margin-top:2px;">Product Designer</div>
            </div>
          </div>
          <div footer>
            <button style="flex:1;padding:6px 12px;border:1px solid #d0d5dd;background:#fff;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;color:#344054;">Message</button>
            <button style="flex:1;padding:6px 12px;border:none;background:#7f56d9;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;color:#fff;">View Profile</button>
          </div>
        </v-popover>

        <!-- Info popover (no title, no arrow) -->
        <v-popover placement="right" [showArrow]="false">
          <button trigger style="width:32px;height:32px;border-radius:50%;border:1px solid #d0d5dd;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#667085;">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.4"/>
              <path d="M8 7v4M8 5.5v.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
          <div>
            <p style="font-size:13px;font-weight:600;color:#101828;margin:0 0 4px;">What is this?</p>
            <p style="font-size:13px;color:#475467;margin:0;">This metric shows the total number of active users over the last 30 days.</p>
          </div>
        </v-popover>

      </div>
    `,
  }),
};
