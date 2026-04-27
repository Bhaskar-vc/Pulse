import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VAccordion } from './accordion.component';
import { VAccordionItem } from './accordion-item.component';
import { VAccordionStatusItem } from './accordion-status-item.component';

const meta: Meta<VAccordion> = {
  title: 'Navigation/Accordion',
  component: VAccordion,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [VAccordionItem, VAccordionStatusItem],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'flush', 'status', 'status-gap'],
      description: 'Visual variant of the accordion container.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Trigger row height — sm 40px, md 48px (default), lg 56px.',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple panels open simultaneously.',
    },
  },
};

export default meta;
type Story = StoryObj<VAccordion>;

/* ── Shared button styles ────────────────────────────────────────── */
const btnCancel  = `background:#fff;border:1px solid #d0d5dd;color:#344054;font-size:14px;font-weight:500;padding:8px 16px;border-radius:8px;cursor:pointer;font-family:'Inter',sans-serif;min-height:36px;min-width:64px;`;
const btnPrimary = `background:#29294c;border:none;color:#fff;font-size:14px;font-weight:500;padding:8px 16px;border-radius:8px;cursor:pointer;font-family:'Inter',sans-serif;min-height:36px;min-width:64px;`;

/* ── Icon SVGs ───────────────────────────────────────────────────── */
const clockIcon    = `<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M10 7v3l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const listIcon     = `<svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const settingsIcon = `<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const boxIcon      = `<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M7 10h6M10 7v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const timeIcon     = `<svg viewBox="0 0 20 20" fill="none"><path d="M10 3a7 7 0 100 14A7 7 0 0010 3zm0 4v3.5l2.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

// ── Default (overview — single open, flush) ───────────────────────
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <v-accordion [variant]="variant" [size]="size" [allowMultiple]="allowMultiple">
        <v-accordion-item title="What is the Pulse Design System?">
          Pulse is a comprehensive design system that provides reusable UI components, design tokens,
          and patterns for building consistent product experiences. It covers foundations like colors,
          typography, and spacing, as well as interactive components.
        </v-accordion-item>
        <v-accordion-item title="How do I install and use Pulse components?">
          You can install Pulse via npm. Import individual components or use the full bundle.
          All components are tree-shakable and work with Angular standalone components.
        </v-accordion-item>
        <v-accordion-item title="What accessibility standards does Pulse meet?">
          All Pulse components are designed and tested to meet WCAG 2.1 Level AA. This includes
          sufficient colour contrast, full keyboard navigability, proper ARIA roles, and screen reader support.
        </v-accordion-item>
      </v-accordion>
    `,
  }),
  args: {
    variant: 'flush',
    size: 'md',
    allowMultiple: false,
  },
};

// ── Status Bordered ───────────────────────────────────────────────
export const StatusBordered: Story = {
  render: () => ({
    template: `
      <v-accordion variant="status">

        <v-accordion-status-item
          title="Budget Receiver"
          subtitle="Lorem ipsum dolor sit amet consectetur."
          statusLabel="Placeholder">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          <div statusFooter style="display:flex;justify-content:flex-end;gap:12px;padding:0 24px 24px;">
            <button style="${btnCancel}">Cancel</button>
            <button style="${btnPrimary}">Continue</button>
          </div>
        </v-accordion-status-item>

        <v-accordion-status-item
          title="Approval Rules"
          subtitle="Set thresholds for automatic approval."
          statusLabel="2 rules">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          <div statusFooter style="display:flex;justify-content:flex-end;gap:12px;padding:0 24px 24px;">
            <button style="${btnCancel}">Cancel</button>
            <button style="${btnPrimary}">Continue</button>
          </div>
        </v-accordion-status-item>

        <v-accordion-status-item
          title="Notification Settings"
          subtitle="Email and in-app alerts."
          statusLabel="Disabled"
          [disabled]="true">
        </v-accordion-status-item>

      </v-accordion>
    `,
  }),
};

// ── Status Gap (grey background) ──────────────────────────────────
export const StatusGap: Story = {
  render: () => ({
    template: `
      <div style="background:var(--ds-bg-muted);border-radius:10px;padding:4px;">
        <v-accordion variant="status-gap">

          <v-accordion-status-item
            title="Budget Receiver"
            subtitle="Configure how budget is distributed."
            statusLabel="Not set">
            Specify the team members or cost centres that will receive budget allocations
            for this cycle. Changes take effect at the next billing period.
            <div statusFooter style="display:flex;justify-content:flex-end;gap:12px;padding:0 24px 24px;">
              <button style="${btnCancel}">Cancel</button>
              <button style="${btnPrimary}">Save</button>
            </div>
          </v-accordion-status-item>

          <v-accordion-status-item
            title="Approval Rules"
            subtitle="Set thresholds for automatic approval."
            statusLabel="2 rules">
            Define spending thresholds and approval chains for automatic processing.
            Any transaction above the threshold requires manual review.
            <div statusFooter style="display:flex;justify-content:flex-end;gap:12px;padding:0 24px 24px;">
              <button style="${btnCancel}">Cancel</button>
              <button style="${btnPrimary}">Save</button>
            </div>
          </v-accordion-status-item>

          <v-accordion-status-item
            title="Notification Settings"
            subtitle="Email and in-app alerts."
            statusLabel="Disabled"
            [disabled]="true">
          </v-accordion-status-item>

        </v-accordion>
      </div>
    `,
  }),
};

// ── Flush ─────────────────────────────────────────────────────────
export const Flush: Story = {
  render: () => ({
    template: `
      <v-accordion variant="flush">
        <v-accordion-item title="Flush item — no outer border">
          The flush variant removes the outer border and left-border open indicator.
          Use it inside cards or panels where the parent already provides containment.
        </v-accordion-item>
        <v-accordion-item title="Open state still highlights">
          When open, the trigger text changes to the brand colour and the chevron rotates,
          providing a clear visual cue without border decoration.
        </v-accordion-item>
        <v-accordion-item title="When to use flush">
          Flush works best inside modals, sidebars, or settings panels that already have
          a containing border. Avoid using it on bare page backgrounds.
        </v-accordion-item>
      </v-accordion>
    `,
  }),
};

// ── Bordered ──────────────────────────────────────────────────────
export const Bordered: Story = {
  render: () => ({
    template: `
      <v-accordion variant="bordered">
        <v-accordion-item title="Section One">
          Content for section one. The bordered variant wraps all items in a single
          contained box with a shared outer border and rounded corners.
        </v-accordion-item>
        <v-accordion-item title="Section Two">
          Content for section two. Individual items are separated by internal dividers.
        </v-accordion-item>
        <v-accordion-item title="Section Three">
          Content for section three. Use this variant in cards, settings pages,
          or any context where a contained appearance is needed.
        </v-accordion-item>
      </v-accordion>
    `,
  }),
};

// ── Multiple Open ─────────────────────────────────────────────────
export const MultipleOpen: Story = {
  render: () => ({
    template: `
      <v-accordion variant="flush" [allowMultiple]="true">
        <v-accordion-item title="Item A — pre-opened">
          This panel is open. In multiple mode, opening another item does not close this one.
          Both can remain expanded simultaneously.
        </v-accordion-item>
        <v-accordion-item title="Item B">
          Click to expand — Item A above will stay open. Use multiple mode when users
          need to compare information across sections.
        </v-accordion-item>
        <v-accordion-item title="Item C">
          All three panels can be open at the same time in multiple mode.
          Pass <code>[allowMultiple]="true"</code> on the accordion container.
        </v-accordion-item>
      </v-accordion>
    `,
  }),
};

// ── Sizes ─────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">

        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:8px;">sm — 40px trigger</p>
          <v-accordion variant="bordered" size="sm">
            <v-accordion-item title="Small accordion">
              Compact 40px trigger row. Ideal for dense UIs such as sidebars or inspector panels.
            </v-accordion-item>
            <v-accordion-item title="Another small item">Content goes here.</v-accordion-item>
          </v-accordion>
        </div>

        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:8px;">md — 48px (default)</p>
          <v-accordion variant="bordered" size="md">
            <v-accordion-item title="Medium accordion">
              Default 48px trigger row. The standard choice for most page layouts and content areas.
            </v-accordion-item>
            <v-accordion-item title="Another medium item">Content goes here.</v-accordion-item>
          </v-accordion>
        </div>

        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:8px;">lg — 56px trigger</p>
          <v-accordion variant="bordered" size="lg">
            <v-accordion-item title="Large accordion">
              Large 56px trigger row. Best for marketing pages or FAQ sections with prominent headings.
            </v-accordion-item>
            <v-accordion-item title="Another large item">Content goes here.</v-accordion-item>
          </v-accordion>
        </div>

      </div>
    `,
  }),
};

// ── With Leading Icons ────────────────────────────────────────────
export const WithLeadingIcons: Story = {
  render: () => ({
    props: { clockIcon, listIcon, settingsIcon },
    template: `
      <v-accordion variant="flush">
        <v-accordion-item title="Getting started" [icon]="clockIcon">
          Icons help users scan and identify sections quickly. Use consistent, recognisable icons
          that directly relate to the section content.
        </v-accordion-item>
        <v-accordion-item title="Configuration options" [icon]="listIcon">
          The leading icon sits inside the trigger content area. When the trigger is open,
          the icon inherits the brand colour via CSS.
        </v-accordion-item>
        <v-accordion-item title="Advanced usage" [icon]="settingsIcon">
          Keep icons at 18×18px for the default size. Scale proportionally for sm (16px)
          and lg (20px) variants.
        </v-accordion-item>
      </v-accordion>
    `,
  }),
};

// ── With Badges ───────────────────────────────────────────────────
export const WithBadges: Story = {
  render: () => ({
    template: `
      <v-accordion variant="flush">
        <v-accordion-item title="Billing information" badge="Required">
          Badges communicate status at a glance. The badge sits inside the trigger content
          area and inherits the open-state colour.
        </v-accordion-item>
        <v-accordion-item title="API access" badge="Active" badgeType="success">
          Use semantic badge colours to communicate status: green for active/success,
          yellow for warnings, purple for required or new items.
        </v-accordion-item>
        <v-accordion-item title="Notifications" badge="3 pending" badgeType="warning">
          Counts in badges give users an immediate sense of how much is inside without
          opening the panel.
        </v-accordion-item>
      </v-accordion>
    `,
  }),
};

// ── States ────────────────────────────────────────────────────────
export const States: Story = {
  render: () => ({
    template: `
      <v-accordion variant="flush">
        <v-accordion-item title="Closed item (default)">
          This is the closed state. The trigger has no background and the chevron points down.
        </v-accordion-item>
        <v-accordion-item title="Open item (active state)">
          This item is open. The trigger shows the secondary-50 background, secondary-700 text,
          and a 3px left border in secondary-600. The chevron is rotated 180°.
        </v-accordion-item>
        <v-accordion-item title="Disabled item — cannot be expanded" [disabled]="true">
          This content cannot be reached because the trigger is disabled.
        </v-accordion-item>
      </v-accordion>
    `,
  }),
};

// ── With Nested Accordion ─────────────────────────────────────────
export const Nested: Story = {
  render: () => ({
    props: { boxIcon, timeIcon },
    template: `
      <v-accordion variant="flush">

        <v-accordion-item title="Platform settings" [icon]="boxIcon">
          <p style="margin-bottom:12px;font-size:14px;color:var(--ds-text-faint);">
            Top-level section content. Below is a nested accordion for sub-sections.
          </p>
          <v-accordion variant="bordered" size="sm">
            <v-accordion-item title="Security settings">
              Configure two-factor authentication, session timeouts, and access control lists.
            </v-accordion-item>
            <v-accordion-item title="Notification preferences">
              Manage email and push notification delivery settings per event type.
            </v-accordion-item>
          </v-accordion>
        </v-accordion-item>

        <v-accordion-item title="Usage &amp; billing" [icon]="timeIcon">
          Review your usage metrics, current billing cycle, and payment methods.
        </v-accordion-item>

      </v-accordion>
    `,
  }),
};

// ── Do & Don't ────────────────────────────────────────────────────
export const DoAndDont: Story = {
  render: () => ({
    template: `
      <div class="dnd-wrap">

        <div class="dnd-do">
          <div class="dnd-do-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5 6.5-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Do
          </div>
          <div class="dnd-do-body">
            <v-accordion variant="flush">
              <v-accordion-item title="What is Pulse DS?">
                Pulse is a design system for Vantage Circle products.
              </v-accordion-item>
              <v-accordion-item title="How do I install it?">
                Install via npm and import the components you need.
              </v-accordion-item>
              <v-accordion-item title="Is it accessible?">
                Yes — all components meet WCAG 2.1 AA.
              </v-accordion-item>
            </v-accordion>
            <p class="dnd-caption">Use accordions for progressive disclosure of secondary content like FAQs or settings, where users only need some sections at a time.</p>
          </div>
        </div>

        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <p style="font-size:13px;color:var(--ds-text-faint);background:var(--ds-danger-subtle);border:1px solid var(--ds-danger-border);border-radius:8px;padding:12px 16px;margin:0;">
              Don't use an accordion to hide critical or always-needed information — such as required form fields or mandatory onboarding steps. If users must read it, don't collapse it.
            </p>
            <p class="dnd-caption">Don't nest accordions more than one level deep — multiple levels of collapsible content are difficult to navigate with a keyboard.</p>
          </div>
        </div>

      </div>
    `,
  }),
};
