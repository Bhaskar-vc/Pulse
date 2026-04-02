import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TagColor  = 'primary' | 'error' | 'success' | 'purple' | 'blue-gray' | 'warning';
export type TagSize   = 'sm' | 'md' | 'lg';
export type TagIcon   = 'dot' | 'x' | 'avatar' | 'icon-left' | 'country' | 'none';

@Component({
  selector: 'ds-tag',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="computedClass">

      <!-- Dot indicator -->
      <span *ngIf="icon === 'dot'" class="ds-tag__dot"></span>

      <!-- Left icon (SVG slot) -->
      <span *ngIf="icon === 'icon-left' && iconSvg"
            class="ds-tag__icon" [innerHTML]="iconSvg"></span>

      <!-- Country flag -->
      <span *ngIf="icon === 'country'" class="ds-tag__flag">
        <ng-content select="[slot=flag]"></ng-content>
        <span *ngIf="!hasFlagContent">🌐</span>
      </span>

      <!-- Avatar -->
      <span *ngIf="icon === 'avatar'" class="ds-tag__avatar">
        <img *ngIf="avatarSrc" [src]="avatarSrc" [alt]="label" />
        <span *ngIf="!avatarSrc" class="ds-tag__avatar-fallback">
          {{ label?.charAt(0)?.toUpperCase() }}
        </span>
      </span>

      <span class="ds-tag__label">{{ label }}<ng-content></ng-content></span>

      <!-- Remove / X button -->
      <button *ngIf="dismissible" class="ds-tag__remove"
              type="button" [attr.aria-label]="'Remove ' + label"
              (click)="dismiss.emit()">
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 3L3 9M3 3l6 6" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </span>
  `,
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input() label = 'Label';
  @Input() color: TagColor = 'primary';
  @Input() size: TagSize   = 'md';
  @Input() icon: TagIcon   = 'none';
  @Input() dismissible     = false;
  @Input() iconSvg?: string;
  @Input() avatarSrc?: string;

  @Output() dismiss = new EventEmitter<void>();

  hasFlagContent = false;

  get computedClass(): string {
    return [
      'ds-tag',
      `ds-tag--${this.color}`,
      `ds-tag--${this.size}`,
      this.icon !== 'none' ? `ds-tag--icon-${this.icon}` : '',
    ].filter(Boolean).join(' ');
  }
}
