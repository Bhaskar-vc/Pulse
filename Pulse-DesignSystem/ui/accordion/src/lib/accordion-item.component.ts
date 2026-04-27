import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { VAccordion } from './accordion.component';

@Component({
  standalone: true,
  selector: 'v-accordion-item',
  imports: [CommonModule],
  template: `
    <div class="accordion-item">
      <button
        type="button"
        class="accordion-trigger"
        [class.is-open]="isOpen"
        [disabled]="disabled || null"
        [attr.aria-expanded]="isOpen"
        (click)="toggle()"
      >
        <span class="accordion-trigger-content">
          @if (icon) {
            <span class="accordion-leading-icon" [innerHTML]="safeIcon" aria-hidden="true"></span>
          }
          <span>{{ title }}</span>
          @if (badge) {
            <span class="acc-badge" [class]="badgeClass">{{ badge }}</span>
          }
        </span>
        <svg class="accordion-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="accordion-content-wrap" [class.is-open]="isOpen">
        <div class="accordion-content">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VAccordionItem {
  /** Trigger button label */
  @Input() title = '';

  /** Optional leading icon — raw SVG string */
  @Input() icon = '';

  /** Optional badge text */
  @Input() badge = '';

  /** Badge color: '' | 'success' | 'warning' */
  @Input() badgeType: '' | 'success' | 'warning' = '';

  /** Disabled state */
  @Input() disabled = false;

  get isOpen(): boolean { return this.accordion.isOpen(this); }

  get badgeClass(): string {
    return this.badgeType ? `acc-badge acc-badge-${this.badgeType}` : 'acc-badge';
  }

  get safeIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.icon);
  }

  private accordion = inject(VAccordion);
  private sanitizer = inject(DomSanitizer);
  readonly cdr = inject(ChangeDetectorRef);

  toggle(): void {
    if (!this.disabled) this.accordion.toggle(this);
  }
}
