import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VModal } from './modal.component';

const meta: Meta<VModal> = {
  title: 'Feedback/Modal',
  component: VModal,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [VModal, BrowserAnimationsModule] }),
  ],
  parameters: {
    docs: { story: { height: '480px' } },
  },
  argTypes: {
    isOpen:          { control: 'boolean',  description: 'Controls modal visibility' },
    title:           { control: 'text',     description: 'Modal title text' },
    body:            { control: 'text',     description: 'Body text (use [modalBody] slot for rich content)' },
    size:            { control: 'select',   options: ['default', 'wide'],                              description: 'Width variant' },
    intent:          { control: 'select',   options: ['none', 'success', 'warning', 'error', 'info'],  description: 'Featured icon intent' },
    layout:          { control: 'select',   options: ['stacked', 'horizontal'],                        description: 'Content layout' },
    variant:         { control: 'select',   options: ['modal', 'drawer'],                              description: 'Modal or Drawer' },
    centered:        { control: 'boolean',  description: 'Center icon + text (stacked only)' },
    showClose:       { control: 'boolean',  description: 'Show close button' },
    actionsAlign:    { control: 'select',   options: ['between', 'right', 'center', 'stacked'],        description: 'Actions alignment' },
    closeOnBackdrop: { control: 'boolean',  description: 'Close on backdrop click' },
  },
};

export default meta;
type Story = StoryObj<VModal>;

// ── Shared inline button styles ───────────────────────────────────
const btnOutline = `padding:8px 16px;border:1px solid #d0d5dd;background:#fff;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;color:#344054;`;
const btnPrimary = `padding:8px 16px;border:none;background:#29294c;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;color:#fff;`;
const btnDanger  = `padding:8px 16px;border:none;background:#d92d20;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;color:#fff;`;

// Trigger wrapper for Canvas (interactive) mode
const triggerWrap = `display:flex;align-items:center;justify-content:center;height:100%;min-height:360px;`;

// ── Stories ───────────────────────────────────────────────────────

export const Default: Story = {
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true" intent="success"
            title="Blog post published"
            body="This blog post has been published. Team members will be able to edit this post and republish changes.">
            <div modalActions style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:12px;">
              <label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#707087;">
                <input type="checkbox" style="width:16px;height:16px;accent-color:#7f56d9;cursor:pointer;">
                Don't show again
              </label>
              <div style="display:flex;gap:8px;">
                <button style="${btnOutline}">Deny</button>
                <button style="${btnPrimary}">Confirm</button>
              </div>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnPrimary}">Open modal</button>
        </div>
        <v-modal [isOpen]="open" intent="success"
          title="Blog post published"
          body="This blog post has been published. Team members will be able to edit this post and republish changes."
          (closed)="open = false">
          <div modalActions style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:12px;">
            <label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#707087;">
              <input type="checkbox" style="width:16px;height:16px;accent-color:#7f56d9;cursor:pointer;">
              Don't show again
            </label>
            <div style="display:flex;gap:8px;">
              <button (click)="open = false" style="${btnOutline}">Deny</button>
              <button (click)="open = false" style="${btnPrimary}">Confirm</button>
            </div>
          </div>
        </v-modal>
      `,
    };
  },
};

export const Warning: Story = {
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true" intent="warning"
            title="Are you sure you want to leave?"
            body="You have unsaved changes. If you leave now, your changes will be lost and cannot be recovered.">
            <div modalActions style="display:flex;gap:12px;width:100%;justify-content:flex-end;">
              <button style="${btnOutline}">Stay on page</button>
              <button style="padding:8px 16px;border:none;background:#f79009;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;color:#fff;">Leave anyway</button>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnPrimary}">Open modal</button>
        </div>
        <v-modal [isOpen]="open" intent="warning"
          title="Are you sure you want to leave?"
          body="You have unsaved changes. If you leave now, your changes will be lost and cannot be recovered."
          (closed)="open = false">
          <div modalActions style="display:flex;gap:12px;width:100%;justify-content:flex-end;">
            <button (click)="open = false" style="${btnOutline}">Stay on page</button>
            <button (click)="open = false" style="padding:8px 16px;border:none;background:#f79009;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;color:#fff;">Leave anyway</button>
          </div>
        </v-modal>
      `,
    };
  },
};

export const Destructive: Story = {
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true" intent="error"
            title="Delete account"
            body="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.">
            <div modalActions style="display:flex;gap:12px;width:100%;">
              <button style="${btnOutline};flex:1;">Cancel</button>
              <button style="${btnDanger};flex:1;">Delete account</button>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnDanger}">Delete account</button>
        </div>
        <v-modal [isOpen]="open" intent="error"
          title="Delete account"
          body="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
          (closed)="open = false">
          <div modalActions style="display:flex;gap:12px;width:100%;">
            <button (click)="open = false" style="${btnOutline};flex:1;">Cancel</button>
            <button (click)="open = false" style="${btnDanger};flex:1;">Delete account</button>
          </div>
        </v-modal>
      `,
    };
  },
};

export const Info: Story = {
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true" intent="info"
            title="New features available"
            body="We've added new tools to your workspace. Explore what's new and make the most of your experience.">
            <div modalActions style="display:flex;gap:12px;width:100%;justify-content:flex-end;">
              <button style="${btnOutline}">Maybe later</button>
              <button style="${btnPrimary}">Explore now</button>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnPrimary}">What's new</button>
        </div>
        <v-modal [isOpen]="open" intent="info"
          title="New features available"
          body="We've added new tools to your workspace. Explore what's new and make the most of your experience."
          (closed)="open = false">
          <div modalActions style="display:flex;gap:12px;width:100%;justify-content:flex-end;">
            <button (click)="open = false" style="${btnOutline}">Maybe later</button>
            <button (click)="open = false" style="${btnPrimary}">Explore now</button>
          </div>
        </v-modal>
      `,
    };
  },
};

export const Centered: Story = {
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true" intent="success" [centered]="true" actionsAlign="stacked"
            title="Payment successful!"
            body="Your payment of $120.00 has been processed. A receipt has been sent to your email address.">
            <div modalActions style="display:flex;flex-direction:column;gap:8px;width:100%;">
              <button style="${btnPrimary};width:100%;">View receipt</button>
              <button style="${btnOutline};width:100%;">Back to dashboard</button>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnPrimary}">Open modal</button>
        </div>
        <v-modal [isOpen]="open" intent="success" [centered]="true" actionsAlign="stacked"
          title="Payment successful!"
          body="Your payment of $120.00 has been processed. A receipt has been sent to your email address."
          (closed)="open = false">
          <div modalActions style="display:flex;flex-direction:column;gap:8px;width:100%;">
            <button (click)="open = false" style="${btnPrimary};width:100%;">View receipt</button>
            <button (click)="open = false" style="${btnOutline};width:100%;">Back to dashboard</button>
          </div>
        </v-modal>
      `,
    };
  },
};

export const CenteredDestructive: Story = {
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true" intent="error" [centered]="true"
            title="Are you sure?"
            body="This will permanently delete your account and all associated data. This action cannot be undone.">
            <div modalActions style="display:flex;gap:12px;width:100%;">
              <button style="${btnOutline};flex:1;">Cancel</button>
              <button style="${btnDanger};flex:1;">Delete account</button>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnDanger}">Delete account</button>
        </div>
        <v-modal [isOpen]="open" intent="error" [centered]="true"
          title="Are you sure?"
          body="This will permanently delete your account and all associated data. This action cannot be undone."
          (closed)="open = false">
          <div modalActions style="display:flex;gap:12px;width:100%;">
            <button (click)="open = false" style="${btnOutline};flex:1;">Cancel</button>
            <button (click)="open = false" style="${btnDanger};flex:1;">Delete account</button>
          </div>
        </v-modal>
      `,
    };
  },
};

export const Horizontal: Story = {
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true" intent="success" layout="horizontal"
            title="Blog post published"
            body="This blog post has been published. Team members will be able to edit this post and republish changes.">
            <div modalActions style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:12px;">
              <label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#707087;">
                <input type="checkbox" style="width:16px;height:16px;accent-color:#7f56d9;cursor:pointer;">
                Don't show again
              </label>
              <div style="display:flex;gap:8px;">
                <button style="${btnOutline}">Deny</button>
                <button style="${btnPrimary}">Confirm</button>
              </div>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnPrimary}">Open modal</button>
        </div>
        <v-modal [isOpen]="open" intent="success" layout="horizontal"
          title="Blog post published"
          body="This blog post has been published. Team members will be able to edit this post and republish changes."
          (closed)="open = false">
          <div modalActions style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:12px;">
            <label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#707087;">
              <input type="checkbox" style="width:16px;height:16px;accent-color:#7f56d9;cursor:pointer;">
              Don't show again
            </label>
            <div style="display:flex;gap:8px;">
              <button (click)="open = false" style="${btnOutline}">Deny</button>
              <button (click)="open = false" style="${btnPrimary}">Confirm</button>
            </div>
          </div>
        </v-modal>
      `,
    };
  },
};

export const HorizontalWarning: Story = {
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true" intent="warning" layout="horizontal"
            title="Unsaved changes"
            body="Do you want to save or discard changes? Unsaved changes will be lost.">
            <div modalActions style="display:flex;gap:12px;justify-content:flex-end;">
              <button style="${btnOutline}">Discard</button>
              <button style="${btnPrimary}">Save changes</button>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnPrimary}">Open modal</button>
        </div>
        <v-modal [isOpen]="open" intent="warning" layout="horizontal"
          title="Unsaved changes"
          body="Do you want to save or discard changes? Unsaved changes will be lost."
          (closed)="open = false">
          <div modalActions style="display:flex;gap:12px;justify-content:flex-end;">
            <button (click)="open = false" style="${btnOutline}">Discard</button>
            <button (click)="open = false" style="${btnPrimary}">Save changes</button>
          </div>
        </v-modal>
      `,
    };
  },
};

export const FormModal: Story = {
  parameters: { docs: { story: { height: '560px' } } },
  render: (_args, { viewMode }) => {
    const formBody = `
      <div modalBody>
        <div style="display:flex;flex-direction:column;gap:14px;margin-top:12px;">
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="font-size:14px;font-weight:500;color:#29294c;">Full name</label>
            <input type="text" value="Jordan Lee" style="height:36px;padding:0 12px;border:1px solid #e1e5ea;border-radius:6px;font-size:14px;font-family:Inter,sans-serif;outline:none;width:100%;box-sizing:border-box;">
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="font-size:14px;font-weight:500;color:#29294c;">Email address</label>
            <input type="email" value="jordan@company.com" style="height:36px;padding:0 12px;border:1px solid #e1e5ea;border-radius:6px;font-size:14px;font-family:Inter,sans-serif;outline:none;width:100%;box-sizing:border-box;">
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="font-size:14px;font-weight:500;color:#29294c;">Job title</label>
            <input type="text" placeholder="Product Designer" style="height:36px;padding:0 12px;border:1px solid #e1e5ea;border-radius:6px;font-size:14px;font-family:Inter,sans-serif;outline:none;width:100%;box-sizing:border-box;">
          </div>
        </div>
      </div>
    `;
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true" size="wide"
            title="Edit profile"
            body="Update your display name and email address.">
            ${formBody}
            <div modalActions style="display:flex;gap:12px;justify-content:flex-end;width:100%;">
              <button style="${btnOutline}">Cancel</button>
              <button style="${btnPrimary}">Save changes</button>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnPrimary}">Edit profile</button>
        </div>
        <v-modal [isOpen]="open" size="wide"
          title="Edit profile"
          body="Update your display name and email address."
          (closed)="open = false">
          ${formBody}
          <div modalActions style="display:flex;gap:12px;justify-content:flex-end;width:100%;">
            <button (click)="open = false" style="${btnOutline}">Cancel</button>
            <button (click)="open = false" style="${btnPrimary}">Save changes</button>
          </div>
        </v-modal>
      `,
    };
  },
};

export const Wide: Story = {
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true" size="wide" intent="info"
            title="Terms & Conditions"
            body="Please read our updated terms carefully. By continuing to use the service, you agree to be bound by these terms and conditions effective from the date of your next login.">
            <div modalActions style="display:flex;gap:12px;width:100%;justify-content:flex-end;">
              <button style="${btnOutline}">Decline</button>
              <button style="${btnPrimary}">Accept & continue</button>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnPrimary}">View Terms</button>
        </div>
        <v-modal [isOpen]="open" size="wide" intent="info"
          title="Terms & Conditions"
          body="Please read our updated terms carefully. By continuing to use the service, you agree to be bound by these terms and conditions effective from the date of your next login."
          (closed)="open = false">
          <div modalActions style="display:flex;gap:12px;width:100%;justify-content:flex-end;">
            <button (click)="open = false" style="${btnOutline}">Decline</button>
            <button (click)="open = false" style="${btnPrimary}">Accept & continue</button>
          </div>
        </v-modal>
      `,
    };
  },
};

export const NoIcon: Story = {
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        template: `
          <v-modal [isOpen]="true" [contained]="true"
            title="Save changes"
            body="You have unsaved changes. Would you like to save before leaving?">
            <div modalActions style="display:flex;gap:12px;justify-content:flex-end;width:100%;">
              <button style="${btnOutline}">Discard</button>
              <button style="${btnPrimary}">Save</button>
            </div>
          </v-modal>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnPrimary}">Open modal</button>
        </div>
        <v-modal [isOpen]="open"
          title="Save changes"
          body="You have unsaved changes. Would you like to save before leaving?"
          (closed)="open = false">
          <div modalActions style="display:flex;gap:12px;justify-content:flex-end;width:100%;">
            <button (click)="open = false" style="${btnOutline}">Discard</button>
            <button (click)="open = false" style="${btnPrimary}">Save</button>
          </div>
        </v-modal>
      `,
    };
  },
};

export const Drawer: Story = {
  parameters: { docs: { story: { height: '480px' } } },
  render: (_args, { viewMode }) => {
    if (viewMode === 'docs') {
      return {
        props: { open: true },
        template: `
          <div style="position:relative;height:440px;overflow:hidden;border-radius:8px;background:#f9fafb;">
            <v-modal [isOpen]="open" variant="drawer" [contained]="true"
              title="Send a test email">
              <div modalBody>
                <div style="display:flex;flex-direction:column;gap:16px;margin-top:8px;">
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    <label style="font-size:14px;font-weight:500;color:#29294c;">Emails</label>
                    <input type="email" placeholder="Add email address here..." style="height:36px;padding:0 12px;border:1px solid #e1e5ea;border-radius:6px;font-size:14px;font-family:Inter,sans-serif;outline:none;width:100%;box-sizing:border-box;">
                  </div>
                </div>
              </div>
              <div modalActions style="display:flex;gap:12px;width:100%;">
                <button style="padding:8px 16px;border:none;background:#7f56d9;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;color:#fff;">Send Mail</button>
              </div>
            </v-modal>
          </div>
        `,
      };
    }
    return {
      props: { open: false },
      template: `
        <div style="${triggerWrap}">
          <button (click)="open = true" style="${btnPrimary}">Open Drawer</button>
        </div>
        <v-modal [isOpen]="open" variant="drawer"
          title="Send a test email"
          (closed)="open = false">
          <div modalBody>
            <div style="display:flex;flex-direction:column;gap:16px;margin-top:8px;">
              <div style="display:flex;flex-direction:column;gap:6px;">
                <label style="font-size:14px;font-weight:500;color:#29294c;">Emails</label>
                <input type="email" placeholder="Add email address here..." style="height:36px;padding:0 12px;border:1px solid #e1e5ea;border-radius:6px;font-size:14px;font-family:Inter,sans-serif;outline:none;width:100%;box-sizing:border-box;">
              </div>
            </div>
          </div>
          <div modalActions style="display:flex;gap:12px;width:100%;">
            <button (click)="open = false" style="padding:8px 16px;border:none;background:#7f56d9;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;color:#fff;">Send Mail</button>
          </div>
        </v-modal>
      `,
    };
  },
};

export const DoAndDont: Story = {
  parameters: { docs: { story: { height: '640px' } } },
  render: () => ({
    template: `
      <div class="dnd-wrap">
        <div class="dnd-do">
          <div class="dnd-do-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Do
          </div>
          <div class="dnd-do-body">
            <v-modal [isOpen]="true" [contained]="true" intent="error"
              title="Delete project"
              body="This will permanently delete the project and all its data. This action cannot be undone.">
              <div modalActions style="display:flex;gap:12px;width:100%;">
                <button style="flex:1;padding:8px 16px;border:1px solid #d0d5dd;background:#fff;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;color:#344054;">Cancel</button>
                <button style="flex:1;padding:8px 16px;border:none;background:#d92d20;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;color:#fff;">Delete</button>
              </div>
            </v-modal>
            <p class="dnd-caption">Use the appropriate intent icon to signal severity — an error icon for destructive actions makes the risk immediately clear.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <p style="font-size:13px;color:#667085;background:#fef3f2;border:1px solid #fecdca;border-radius:8px;padding:12px 16px;margin:0;">
              Avoid stacking multiple modals on top of each other or placing large scrollable forms inside — this overwhelms users and breaks focus management.
            </p>
            <p class="dnd-caption">Don't stack multiple modals or put excessive scrollable content inside — break complex flows into separate pages or steps instead.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
