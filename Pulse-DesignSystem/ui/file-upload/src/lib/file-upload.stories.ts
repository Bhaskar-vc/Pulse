import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VcFileUpload } from './file-upload.component';

const meta: Meta<VcFileUpload> = {
  title: 'Form Controls/File Upload',
  component: VcFileUpload,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [VcFileUpload] })],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'image', 'drag-drop'],
      description: 'Upload component type',
    },
    label: {
      control: 'text',
      description: 'Upload button label',
    },
    name: {
      control: 'text',
      description: 'File input name attribute',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
    dropAreaHintText: {
      control: 'text',
      description: 'Hint text shown in the drop area',
    },
    dropAreaWidth: {
      control: 'number',
      description: 'Width of the drop area in pixels',
    },
    dropAreaHeight: {
      control: 'number',
      description: 'Height of the drop area in pixels',
    },
    showOnlyDropArea: {
      control: 'boolean',
      description: 'Show only the drop area',
    },
    showUploadStatusIcon: {
      control: 'boolean',
      description: 'Show upload status icon',
    },
    uploadButtonStyle: {
      control: 'text',
      description: 'Inline style for the upload button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the upload is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<VcFileUpload>;

export const Default: Story = {
  args: {
    type: 'default',
    label: 'Upload',
    multiple: false,
    accept: '',
    disabled: false,
    showUploadStatusIcon: true,
  },
};

export const ImageUpload: Story = {
  args: {
    type: 'image',
    label: 'Upload Image',
    multiple: false,
    accept: 'image/*',
    disabled: false,
    showUploadStatusIcon: true,
  },
};

export const DragAndDrop: Story = {
  args: {
    type: 'drag-drop',
    label: 'Upload',
    multiple: true,
    accept: '',
    dropAreaHintText: 'Drag and drop files here or click to browse',
    dropAreaWidth: 384,
    showOnlyDropArea: true,
    showUploadStatusIcon: true,
    disabled: false,
  },
};

export const MultipleFiles: Story = {
  args: {
    type: 'default',
    label: 'Upload Files',
    multiple: true,
    accept: '',
    disabled: false,
    showUploadStatusIcon: true,
  },
};

export const AcceptPDFOnly: Story = {
  args: {
    type: 'default',
    label: 'Upload PDF',
    multiple: false,
    accept: '.pdf',
    disabled: false,
    showUploadStatusIcon: true,
  },
};

export const DragDropCustomSize: Story = {
  args: {
    type: 'drag-drop',
    label: 'Upload',
    multiple: false,
    accept: 'image/*',
    dropAreaHintText: 'Drop your image here',
    dropAreaWidth: 500,
    dropAreaHeight: 200,
    showOnlyDropArea: true,
    showUploadStatusIcon: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    type: 'default',
    label: 'Upload',
    multiple: false,
    accept: '',
    disabled: true,
    showUploadStatusIcon: true,
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
            <vc-file-upload
              type="drag-drop"
              dropAreaHintText="PNG, JPG or PDF — max. 10 MB"
              [dropAreaWidth]="320"
              [showOnlyDropArea]="true"
            ></vc-file-upload>
            <p class="dnd-caption">State accepted file types and the maximum file size directly in the upload area so users know before they try.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <vc-file-upload
              type="drag-drop"
              dropAreaHintText="Drop files here"
              [dropAreaWidth]="320"
              [showOnlyDropArea]="true"
            ></vc-file-upload>
            <p class="dnd-caption">Don't silently reject files without explanation — always show a clear error message stating exactly why the file was rejected.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
