import type { Meta, StoryObj } from '@storybook/angular';
import { VInput } from './input.component';

const emailSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 5.5l8 5 8-5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><rect x="1.5" y="3.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.3"/></svg>`;
const userSvg  = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke="currentColor" stroke-width="1.3"/><path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;
const phoneSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6.5 3h-2A1.5 1.5 0 003 4.5v.5C3 12.508 7.492 17 15.5 17h.5A1.5 1.5 0 0017.5 15.5v-2a1.5 1.5 0 00-1.5-1.5h-2a1.5 1.5 0 00-1.5 1.5c0 .276-.224.5-.5.5A7.5 7.5 0 015 6c0-.276.224-.5.5-.5A1.5 1.5 0 006.5 4V3z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`;

const meta: Meta<VInput> = {
  title: 'Form Controls/Input',
  component: VInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'HTML input type. For multi-line text use the Textarea component.',
    },
    label: { control: 'text', description: 'Label shown above the field.' },
    placeholder: { control: 'text', description: 'Placeholder text inside the field.' },
    hint: { control: 'text', description: 'Helper text below the field.' },
    error: { control: 'text', description: 'Error message — activates destructive state.' },
    helpIcon: { control: 'boolean', description: 'Show ⓘ help icon next to the label.' },
    required: { control: 'boolean', description: 'Show required asterisk (*) next to the label.' },
    disabled: { control: 'boolean', description: 'Disable the input.' },
    prefixText: { control: 'text', description: 'Badge text on the left edge (e.g. "USD").' },
    suffixText: { control: 'text', description: 'Badge text on the right edge (e.g. "kg").' },
    maxLength: { control: 'number', description: 'Max character count.' },
  },
};

export default meta;
type Story = StoryObj<VInput>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Jane Appleseed',
    hint: 'Enter your legal name as it appears on your ID.',
  },
};

// ── With Leading Icon ─────────────────────────────────────────────────────────
export const WithLeadingIcon: Story = {
  args: {
    type: 'email',
    label: 'Email address',
    placeholder: 'you@company.com',
    leadingIcon: emailSvg,
    hint: 'We\'ll never share your email.',
    helpIcon: true,
  },
};

// ── Error / Destructive ───────────────────────────────────────────────────────
export const ErrorState: Story = {
  render: () => ({
    template: `
      <div style="max-width:320px">
        <v-input
          type="email"
          label="Email address"
          placeholder="you@company.com"
          [leadingIcon]="emailSvg"
          error="This doesn't look like a valid email."
        ></v-input>
      </div>
    `,
    props: { emailSvg },
  }),
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label: 'Email address',
    placeholder: 'olivia@untitledui.com',
    leadingIcon: emailSvg,
    disabled: true,
  },
};

// ── Required ──────────────────────────────────────────────────────────────────
export const Required: Story = {
  args: {
    label: 'Work email',
    placeholder: 'you@company.com',
    leadingIcon: emailSvg,
    required: true,
    hint: 'Required for account verification.',
  },
};

// ── Password ──────────────────────────────────────────────────────────────────
export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    hint: 'Must be at least 8 characters.',
  },
};

// ── Search ────────────────────────────────────────────────────────────────────
export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search…',
  },
};

// ── Prefix / Suffix ───────────────────────────────────────────────────────────
export const PrefixSuffix: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px;">
        <v-input label="Amount" placeholder="1,000.00" prefixText="USD" type="number"></v-input>
        <v-input label="Weight" placeholder="0.00" suffixText="kg" type="number"></v-input>
        <v-input label="Budget" placeholder="0.00" prefixText="$" suffixText="USD" type="number"></v-input>
      </div>
    `,
  }),
};

// ── All States ────────────────────────────────────────────────────────────────
export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;">

        <div style="background:var(--ds-bg);border:1px solid var(--ds-border);border-radius:10px;padding:20px 16px 16px;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:14px;">Placeholder</p>
          <v-input label="Email" placeholder="olivia@untitledui.com" [leadingIcon]="emailSvg"></v-input>
        </div>

        <div style="background:var(--ds-bg);border:1px solid var(--ds-border);border-radius:10px;padding:20px 16px 16px;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:14px;">Filled</p>
          <v-input label="Email" placeholder="olivia@untitledui.com" [leadingIcon]="emailSvg" value="olivia@untitledui.com"></v-input>
        </div>

        <div style="background:var(--ds-bg);border:1px solid var(--ds-border);border-radius:10px;padding:20px 16px 16px;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:14px;">Disabled</p>
          <v-input label="Email" placeholder="olivia@untitledui.com" [leadingIcon]="emailSvg" [disabled]="true"></v-input>
        </div>

        <div style="background:var(--ds-bg);border:1px solid var(--ds-border);border-radius:10px;padding:20px 16px 16px;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:14px;">Error (Destructive)</p>
          <v-input label="Email" [leadingIcon]="emailSvg" error="This is an error message."></v-input>
        </div>

        <div style="background:var(--ds-bg);border:1px solid var(--ds-border);border-radius:10px;padding:20px 16px 16px;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:14px;">With hint</p>
          <v-input label="Email" placeholder="you@company.com" [leadingIcon]="emailSvg" hint="We'll never share your email."></v-input>
        </div>

        <div style="background:var(--ds-bg);border:1px solid var(--ds-border);border-radius:10px;padding:20px 16px 16px;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:14px;">Password</p>
          <v-input type="password" label="Password" placeholder="Enter password"></v-input>
        </div>

      </div>
    `,
    props: { emailSvg },
  }),
};

// ── Label & Hint Combinations ─────────────────────────────────────────────────
export const LabelHintCombinations: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:24px;">

        <div style="min-width:200px;flex:1">
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--ds-text-faint);margin-bottom:8px;">No label, no hint</p>
          <v-input placeholder="Placeholder text"></v-input>
        </div>

        <div style="min-width:200px;flex:1">
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--ds-text-faint);margin-bottom:8px;">Label only</p>
          <v-input label="Field label" placeholder="Placeholder text"></v-input>
        </div>

        <div style="min-width:200px;flex:1">
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--ds-text-faint);margin-bottom:8px;">Label + help icon + hint</p>
          <v-input label="Field label" placeholder="Placeholder text" [helpIcon]="true" hint="Helpful supporting information."></v-input>
        </div>

        <div style="min-width:200px;flex:1">
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--ds-text-faint);margin-bottom:8px;">Required</p>
          <v-input label="Field label" placeholder="Placeholder text" [required]="true" hint="This field is required."></v-input>
        </div>

      </div>
    `,
  }),
};

// ── Do & Don't ────────────────────────────────────────────────────────────────
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
            <v-input label="Work email" placeholder="jane@acme.com" type="email" hint="We'll use this to contact you."></v-input>
            <p class="dnd-caption">Always pair a visible label with every input. Link them for screen readers.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <p style="font-size:13px;color:var(--ds-text-secondary);background:var(--ds-danger-subtle);border:1px solid var(--ds-danger-border);border-radius:8px;padding:12px 16px;margin:0;">
              Don't use placeholder text as a substitute for a label — it disappears when the user starts typing, leaving them without context.
            </p>
            <p class="dnd-caption">Placeholder-only fields are an accessibility failure for screen readers and forgetful users alike.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
