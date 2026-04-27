import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VAccordion } from './accordion.component';

@Component({
  standalone: true,
  selector: 'v-accordion-status-item',
  imports: [CommonModule],
  template: `
    <div class="acc-sb-item" [class.is-disabled]="disabled">
      <button
        type="button"
        class="acc-sb-trigger"
        [class.is-open]="isOpen"
        [attr.aria-expanded]="isOpen"
        [attr.aria-disabled]="disabled || null"
        [disabled]="disabled || null"
        (click)="toggle()"
      >
        <div class="acc-check-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7l3 3 6-6"
              [attr.stroke]="disabled ? '#d0d5dd' : '#039855'"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="acc-sb-text">
          <div class="acc-sb-title">{{ title }}</div>
          @if (subtitle) {
            <div class="acc-sb-subtitle">{{ subtitle }}</div>
          }
        </div>
        <div class="acc-sb-right">
          @if (statusLabel) {
            <span class="acc-sb-label">{{ statusLabel }}</span>
          }
          <svg class="acc-sb-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>
      <div class="acc-sb-panel" [class.is-open]="isOpen">
        <div class="acc-sb-content">
          <ng-content></ng-content>
        </div>
        <ng-content select="[statusFooter]"></ng-content>
      </div>
    </div>
  `,
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VAccordionStatusItem {
  /** Main trigger label */
  @Input() title = '';

  /** Subtitle below the title */
  @Input() subtitle = '';

  /** Text shown on the right side of the trigger */
  @Input() statusLabel = '';

  /** Disabled state */
  @Input() disabled = false;

  get isOpen(): boolean { return this.accordion.isOpen(this); }

  private accordion = inject(VAccordion);
  readonly cdr = inject(ChangeDetectorRef);

  toggle(): void {
    if (!this.disabled) this.accordion.toggle(this);
  }
}
