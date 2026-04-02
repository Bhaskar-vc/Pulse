import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, OnInit, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToastType = 'informative' | 'success' | 'warning' | 'error';

@Component({
  selector: 'ds-toast',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="computedClass" role="alert" [attr.aria-live]="'polite'">

      <!-- Icon -->
      <span class="ds-toast__icon" aria-hidden="true">
        <ng-container [ngSwitch]="type">
          <!-- Informative (blue gradient) -->
          <svg *ngSwitchCase="'informative'" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6"
                  fill="url(#toast-info-grad)"/>
            <path d="M12 11v5M12 8h.01" stroke="#fff"
                  stroke-width="2" stroke-linecap="round"/>
            <defs>
              <linearGradient id="toast-info-grad" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#4dcaff"/>
                <stop offset="100%" stop-color="#4ea3e0"/>
              </linearGradient>
            </defs>
          </svg>
          <!-- Success (green) -->
          <svg *ngSwitchCase="'success'" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="#039855"/>
            <path d="M6 12l4 4 8-8" stroke="#fff" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- Warning (amber) -->
          <svg *ngSwitchCase="'warning'" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="#f79009"/>
            <path d="M12 8v5M12 15h.01" stroke="#fff"
                  stroke-width="2" stroke-linecap="round"/>
          </svg>
          <!-- Error (red) -->
          <svg *ngSwitchCase="'error'" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="#d92d20"/>
            <path d="M15 9l-6 6M9 9l6 6" stroke="#fff"
                  stroke-width="2" stroke-linecap="round"/>
          </svg>
        </ng-container>
      </span>

      <!-- Message area -->
      <div class="ds-toast__body">
        <p *ngIf="title" class="ds-toast__title">{{ title }}</p>
        <p *ngIf="message" class="ds-toast__message">{{ message }}</p>
        <ng-content></ng-content>
      </div>

      <!-- Action button -->
      <button *ngIf="actionLabel" class="ds-toast__action"
              type="button" (click)="action.emit()">
        {{ actionLabel }}
      </button>

      <!-- Close -->
      <button *ngIf="dismissible" class="ds-toast__close"
              type="button" aria-label="Dismiss notification"
              (click)="dismissed.emit()">
        <svg viewBox="0 0 10 10" fill="none">
          <path d="M8.5 1.5l-7 7M1.5 1.5l7 7" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  `,
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() type: ToastType = 'informative';
  @Input() title?: string;
  @Input() message?: string;
  @Input() actionLabel?: string;
  @Input() dismissible = true;
  /** Auto-dismiss after N ms (0 = never) */
  @Input() duration = 0;

  @Output() dismissed = new EventEmitter<void>();
  @Output() action    = new EventEmitter<void>();

  private _timer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    if (this.duration > 0) {
      this._timer = setTimeout(() => this.dismissed.emit(), this.duration);
    }
  }

  ngOnDestroy(): void {
    if (this._timer) clearTimeout(this._timer);
  }

  get computedClass(): string {
    return ['ds-toast', `ds-toast--${this.type}`].join(' ');
  }
}
