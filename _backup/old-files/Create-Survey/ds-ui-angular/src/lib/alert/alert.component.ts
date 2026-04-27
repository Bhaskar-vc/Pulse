import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'ds-alert',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="computedClass" role="alert">
      <!-- Icon slot -->
      <span class="ds-alert__icon" aria-hidden="true">
        <ng-container [ngSwitch]="variant">
          <!-- Info -->
          <svg *ngSwitchCase="'info'" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#eef4ff"/>
            <path d="M20 18v8M20 14h.01" stroke="#3538cd"
                  stroke-width="2" stroke-linecap="round"/>
          </svg>
          <!-- Success -->
          <svg *ngSwitchCase="'success'" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#d1fadf"/>
            <path d="M13 21l5 5 9-10" stroke="#027a48"
                  stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- Warning / Shield -->
          <svg *ngSwitchCase="'warning'" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#fef0c7"/>
            <path d="M20 12l6 3.5v5c0 3.5-2.5 6.8-6 8-3.5-1.2-6-4.5-6-8v-5L20 12z"
                  stroke="#b54708" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M20 18v4M20 24h.01" stroke="#b54708"
                  stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <!-- Error -->
          <svg *ngSwitchCase="'error'" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#fee4e2"/>
            <path d="M24 16l-8 8M16 16l8 8" stroke="#b42318"
                  stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </ng-container>
        <ng-content select="[slot=icon]"></ng-content>
      </span>

      <!-- Content -->
      <div class="ds-alert__content">
        <p *ngIf="title" class="ds-alert__title">{{ title }}</p>
        <p *ngIf="message" class="ds-alert__message">{{ message }}</p>
        <ng-content></ng-content>

        <!-- Actions row -->
        <div *ngIf="primaryAction || secondaryAction" class="ds-alert__actions">
          <button *ngIf="primaryAction" class="ds-alert__btn ds-alert__btn--primary"
                  type="button" (click)="primaryClick.emit()">
            {{ primaryAction }}
          </button>
          <button *ngIf="secondaryAction" class="ds-alert__btn ds-alert__btn--secondary"
                  type="button" (click)="secondaryClick.emit()">
            {{ secondaryAction }}
          </button>
        </div>
      </div>

      <!-- Close -->
      <button *ngIf="dismissible" class="ds-alert__close"
              type="button" aria-label="Dismiss"
              (click)="dismissed.emit()">
        <svg viewBox="0 0 12 12" fill="none">
          <path d="M9 3L3 9M3 3l6 6" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  `,
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
  @Input() title?: string;
  @Input() message?: string;
  @Input() primaryAction?: string;
  @Input() secondaryAction?: string;
  @Input() dismissible = true;

  @Output() dismissed     = new EventEmitter<void>();
  @Output() primaryClick  = new EventEmitter<void>();
  @Output() secondaryClick = new EventEmitter<void>();

  get computedClass(): string {
    return ['ds-alert', `ds-alert--${this.variant}`].join(' ');
  }
}
