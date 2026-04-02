import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
export type ButtonSize    = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="computedClass"
      (click)="clicked.emit($event)">
      <span *ngIf="loading" class="ds-btn__spinner" aria-hidden="true"></span>
      <span *ngIf="iconLeft && !loading" class="ds-btn__icon ds-btn__icon--left" [innerHTML]="iconLeft"></span>
      <span class="ds-btn__label"><ng-content></ng-content></span>
      <span *ngIf="iconRight" class="ds-btn__icon ds-btn__icon--right" [innerHTML]="iconRight"></span>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /** Visual variant */
  @Input() variant: ButtonVariant = 'primary';
  /** Size */
  @Input() size: ButtonSize = 'md';
  /** Native button type */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  /** Disable interaction */
  @Input() disabled = false;
  /** Show loading spinner */
  @Input() loading = false;
  /** SVG string for left icon */
  @Input() iconLeft?: string;
  /** SVG string for right icon */
  @Input() iconRight?: string;
  /** Full-width block button */
  @Input() block = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  get computedClass(): string {
    return [
      'ds-btn',
      `ds-btn--${this.variant}`,
      `ds-btn--${this.size}`,
      this.loading  ? 'ds-btn--loading'  : '',
      this.disabled ? 'ds-btn--disabled' : '',
      this.block    ? 'ds-btn--block'    : '',
    ].filter(Boolean).join(' ');
  }
}
