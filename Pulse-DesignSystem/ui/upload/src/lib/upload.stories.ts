import type { Meta, StoryObj } from '@storybook/angular';
import { VUpload } from './upload.component';

const meta: Meta<VUpload> = {
  title: 'Form Controls/Upload',
  component: VUpload,
  tags: ['hidden'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types (e.g. "image/*,.pdf")',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    maxSizeMB: {
      control: 'number',
      description: 'Max file size in MB',
    },
    subtext: {
      control: 'text',
      description: 'Subtext shown in the drop zone',
    },
    hasError: {
      control: 'boolean',
      description: 'Error state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message',
    },
  },
};

export default meta;
type Story = StoryObj<VUpload>;

export const Default: Story = {
  args: {
    accept: '',
    multiple: false,
    maxSizeMB: 10,
    subtext: 'SVG, PNG, JPG or PDF (max. 10 MB)',
    hasError: false,
    errorMessage: '',
  },
};

export const ImagesOnly: Story = {
  args: {
    accept: 'image/*',
    multiple: false,
    maxSizeMB: 5,
    subtext: 'PNG, JPG or SVG (max. 5 MB)',
    hasError: false,
    errorMessage: '',
  },
};

export const MultipleFiles: Story = {
  args: {
    accept: '',
    multiple: true,
    maxSizeMB: 20,
    subtext: 'Upload multiple files (max. 20 MB each)',
    hasError: false,
    errorMessage: '',
  },
};

export const PDFOnly: Story = {
  args: {
    accept: '.pdf',
    multiple: false,
    maxSizeMB: 25,
    subtext: 'PDF files only (max. 25 MB)',
    hasError: false,
    errorMessage: '',
  },
};

export const WithError: Story = {
  args: {
    accept: 'image/*',
    multiple: false,
    maxSizeMB: 5,
    subtext: 'PNG, JPG or SVG (max. 5 MB)',
    hasError: true,
    errorMessage: 'File size exceeds the maximum limit',
  },
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
            <v-upload
              accept="image/*,.pdf"
              [multiple]="true"
              [maxSizeMB]="10"
              subtext="PNG, JPG or PDF — max. 10 MB each"
            ></v-upload>
            <p class="dnd-caption">Show a progress indicator during upload and provide a cancel option so users stay in control of the process.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <div style="padding:24px;background:#f4f4f6;border-radius:8px;text-align:center;width:100%;opacity:0.5;pointer-events:none;">
              <p style="font-size:13px;color:#667085;margin:0;">Uploading… please wait</p>
              <p style="font-size:12px;color:#98a2b3;margin:4px 0 0;">All controls disabled during upload</p>
            </div>
            <p class="dnd-caption">Don't block the entire UI during an upload — let users continue working and show progress inline or in a non-blocking indicator.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
