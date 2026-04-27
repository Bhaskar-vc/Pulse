import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { Component, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { VcToast } from './toast.component';
import { VcToastItem } from './toast-item.component';
import { ToastService } from './toast.service';
import { ToastPositionType } from './toast.interface';

/**
 * Helper wrapper component that provides buttons to trigger toasts
 * via the ToastService, since VcToast is driven imperatively.
 */
@Component({
  standalone: true,
  selector: 'toast-story-wrapper',
  imports: [VcToast],
  template: `
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
      <button (click)="showDefault()" style="padding: 8px 16px; cursor: pointer;">Default Toast</button>
      <button (click)="showSuccess()" style="padding: 8px 16px; cursor: pointer;">Success Toast</button>
      <button (click)="showWarning()" style="padding: 8px 16px; cursor: pointer;">Warning Toast</button>
      <button (click)="showError()" style="padding: 8px 16px; cursor: pointer;">Error Toast</button>
    </div>
    <vc-toast [key]="key" [position]="position" [life]="life"></vc-toast>
  `,
})
class ToastStoryWrapperComponent {
  key = 'story';
  position: ToastPositionType = 'top-right';
  life = 3000;

  private toastService = inject(ToastService);

  showDefault() {
    this.toastService.add({
      status: 'default',
      heading: 'Information',
      description: 'This is a default toast message.',
      key: this.key,
      life: this.life,
    });
  }

  showSuccess() {
    this.toastService.add({
      status: 'success',
      heading: 'Success',
      description: 'The operation completed successfully.',
      key: this.key,
      life: this.life,
    });
  }

  showWarning() {
    this.toastService.add({
      status: 'warning',
      heading: 'Warning',
      description: 'Please review before proceeding.',
      key: this.key,
      life: this.life,
    });
  }

  showError() {
    this.toastService.add({
      status: 'error',
      heading: 'Error',
      description: 'Something went wrong. Please try again.',
      key: this.key,
      life: this.life,
    });
  }
}

const meta: Meta<ToastStoryWrapperComponent> = {
  title: 'Utilities/Toast',
  component: ToastStoryWrapperComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), ToastService],
    }),
    moduleMetadata({
      imports: [VcToast, VcToastItem],
    }),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'center',
        'top-center',
        'bottom-center',
      ],
      description: 'Position of the toast container in the viewport.',
    },
    life: {
      control: 'number',
      description: 'Duration in milliseconds before the toast auto-closes.',
    },
    key: {
      control: 'text',
      description: 'Key to scope toast messages to this container.',
    },
  },
};

export default meta;
type Story = StoryObj<ToastStoryWrapperComponent>;

export const Default: Story = {
  args: {
    position: 'top-right',
    life: 3000,
    key: 'story',
  },
};

export const TopLeft: Story = {
  args: {
    position: 'top-left',
    life: 4000,
    key: 'story',
  },
};

export const BottomRight: Story = {
  args: {
    position: 'bottom-right',
    life: 5000,
    key: 'story',
  },
};

export const Center: Story = {
  args: {
    position: 'center',
    life: 3000,
    key: 'story',
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
            <div style="padding:12px 16px;background:#ecfdf3;border:1px solid #6ce9a6;border-radius:10px;display:flex;align-items:center;gap:10px;max-width:320px;">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#12b76a"/><path d="M5 8l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <div>
                <p style="margin:0;font-size:13px;font-weight:600;color:#027a48;">Changes saved</p>
                <p style="margin:2px 0 0;font-size:12px;color:#039855;">Auto-dismissing in 4s…</p>
              </div>
            </div>
            <p class="dnd-caption">Auto-dismiss non-critical toasts (success, info) after 4–5 seconds so they don't block the UI.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <div style="padding:12px 16px;background:#fef3f2;border:1px solid #fda29b;border-radius:10px;display:flex;align-items:center;gap:10px;max-width:320px;">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#f04438"/><path d="M5 5l6 6M11 5l-6 6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
              <div>
                <p style="margin:0;font-size:13px;font-weight:600;color:#b42318;">Payment failed</p>
                <p style="margin:2px 0 0;font-size:12px;color:#d92d20;">Your card was declined.</p>
              </div>
            </div>
            <p class="dnd-caption">Don't use toast for errors that require user action — they auto-dismiss before users can respond. Use an Alert or Modal instead.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
