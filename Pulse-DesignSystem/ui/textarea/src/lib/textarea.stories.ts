import type { Meta, StoryObj } from '@storybook/angular';
import { VcTextarea } from './textarea.component';

const meta: Meta<VcTextarea> = {
  title: 'Form Controls/Textarea',
  component: VcTextarea,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label above the textarea.' },
    placeholder: { control: 'text', description: 'Placeholder text.' },
    hint: { control: 'text', description: 'Helper text below the textarea.' },
    error: { control: 'text', description: 'Error message — activates destructive state.' },
    helpIcon: { control: 'boolean', description: 'Show ⓘ help icon next to the label.' },
    required: { control: 'boolean', description: 'Show required asterisk (*).' },
    disabled: { control: 'boolean', description: 'Disable the textarea.' },
    maxLength: { control: 'number', description: 'Max characters — shows a counter when set.' },
    rows: { control: 'number', description: 'Visible row count.' },
    resize: { control: 'boolean', description: 'Allow vertical resize.' },
  },
};

export default meta;
type Story = StoryObj<VcTextarea>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description…',
  },
};

// ── With Hint ─────────────────────────────────────────────────────────────────
export const WithHint: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us a little about yourself…',
    hint: 'This will appear on your public profile.',
    helpIcon: true,
  },
};

// ── Required ──────────────────────────────────────────────────────────────────
export const Required: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Your feedback is important to us…',
    required: true,
    hint: 'Please describe your experience.',
  },
};

// ── Error State ───────────────────────────────────────────────────────────────
export const ErrorState: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description…',
    required: true,
    error: 'This field cannot be empty.',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label: 'Description',
    placeholder: 'Cannot edit this field.',
    disabled: true,
  },
};

// ── With Char Count ───────────────────────────────────────────────────────────
export const WithCharCount: Story = {
  args: {
    label: 'Product description',
    placeholder: 'Describe the product in detail…',
    hint: 'Keep it concise and informative.',
    helpIcon: true,
    maxLength: 500,
    rows: 4,
  },
};

// ── No Resize ─────────────────────────────────────────────────────────────────
export const NoResize: Story = {
  args: {
    label: 'Fixed height',
    placeholder: 'This textarea cannot be resized…',
    hint: 'Height is fixed for layout consistency.',
    resize: false,
    rows: 3,
  },
};

// ── All States ────────────────────────────────────────────────────────────────
export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;">

        <div style="background:var(--ds-bg);border:1px solid var(--ds-border);border-radius:10px;padding:20px 16px 16px;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:14px;">Placeholder</p>
          <vc-textarea label="Description" placeholder="Enter a description…" [required]="true"></vc-textarea>
        </div>

        <div style="background:var(--ds-bg);border:1px solid var(--ds-border);border-radius:10px;padding:20px 16px 16px;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:14px;">With hint &amp; char count</p>
          <vc-textarea label="Description" [helpIcon]="true" placeholder="Enter a description…" hint="This is a hint text to help the user." [maxLength]="500"></vc-textarea>
        </div>

        <div style="background:var(--ds-bg);border:1px solid var(--ds-border);border-radius:10px;padding:20px 16px 16px;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:14px;">Error (Destructive)</p>
          <vc-textarea label="Description" [required]="true" error="This field cannot be empty."></vc-textarea>
        </div>

        <div style="background:var(--ds-bg);border:1px solid var(--ds-border);border-radius:10px;padding:20px 16px 16px;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ds-text-faint);margin-bottom:14px;">Disabled</p>
          <vc-textarea label="Description" placeholder="Cannot edit this field." [required]="true" [disabled]="true"></vc-textarea>
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
            <vc-textarea label="Product description" placeholder="Describe the product in detail…" hint="Keep it concise and informative." [maxLength]="500"></vc-textarea>
            <p class="dnd-caption">Show a character counter when the field has a maximum length so users can manage their input proactively.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <p style="font-size:13px;color:var(--ds-text-secondary);background:var(--ds-danger-subtle);border:1px solid var(--ds-danger-border);border-radius:8px;padding:12px 16px;margin:0;">
              Don't use a textarea for short, single-line inputs — use the Input component instead, which sets the right expectations for brevity.
            </p>
            <p class="dnd-caption">A textarea signals multi-line content. Use it only when you expect more than one sentence.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
