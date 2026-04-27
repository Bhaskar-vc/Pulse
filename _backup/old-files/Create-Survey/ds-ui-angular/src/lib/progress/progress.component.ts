import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressType = 'linear' | 'circular';

@Component({
  selector: 'ds-progress',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ── Linear Progress ──────────────────────────────── -->
    <ng-container *ngIf="type === 'linear'">
      <div class="ds-progress-linear" [style.width.px]="width || null">
        <div *ngIf="showLabel" class="ds-progress-linear__header">
          <span class="ds-progress-linear__title">{{ label }}</span>
          <span class="ds-progress-linear__value">{{ value }}%</span>
        </div>
        <div class="ds-progress-linear__track">
          <div class="ds-progress-linear__fill"
               [style.width.%]="clampedValue"
               role="progressbar"
               [attr.aria-valuenow]="clampedValue"
               aria-valuemin="0"
               aria-valuemax="100">
          </div>
          <!-- Tooltip knob -->
          <div *ngIf="showTooltip" class="ds-progress-linear__thumb"
               [style.left.%]="clampedValue">
            <div class="ds-progress-linear__tooltip">{{ clampedValue }}%</div>
          </div>
        </div>
      </div>
    </ng-container>

    <!-- ── Circular Progress ────────────────────────────── -->
    <ng-container *ngIf="type === 'circular'">
      <div class="ds-progress-circle" [style.width.px]="circleSize" [style.height.px]="circleSize">
        <svg [attr.viewBox]="'0 0 ' + circleSize + ' ' + circleSize"
             class="ds-progress-circle__svg">
          <!-- Background ring -->
          <circle class="ds-progress-circle__bg"
                  [attr.cx]="circleSize / 2"
                  [attr.cy]="circleSize / 2"
                  [attr.r]="radius"
                  fill="none"
                  [attr.stroke-width]="strokeWidth" />
          <!-- Progress arc -->
          <circle class="ds-progress-circle__arc"
                  [attr.cx]="circleSize / 2"
                  [attr.cy]="circleSize / 2"
                  [attr.r]="radius"
                  fill="none"
                  [attr.stroke-width]="strokeWidth"
                  [attr.stroke-dasharray]="circumference"
                  [attr.stroke-dashoffset]="dashOffset"
                  stroke-linecap="round"
                  transform="rotate(-90 {{ circleSize/2 }} {{ circleSize/2 }})" />
        </svg>
        <div class="ds-progress-circle__center">
          <span class="ds-progress-circle__value">{{ clampedValue }}%</span>
          <span *ngIf="label" class="ds-progress-circle__label">{{ label }}</span>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnChanges {
  /** 'linear' (slider bar) or 'circular' (donut) */
  @Input() type: ProgressType = 'linear';
  /** 0–100 */
  @Input() value = 40;
  /** Caption below the value in circular, header label in linear */
  @Input() label = '';
  /** Show percentage label in linear mode */
  @Input() showLabel = true;
  /** Show floating tooltip on thumb */
  @Input() showTooltip = true;
  /** Pixel width for linear bar (defaults to 100%) */
  @Input() width?: number;

  // Circular geometry
  circleSize  = 64;
  strokeWidth = 6;

  get radius()      { return (this.circleSize - this.strokeWidth) / 2; }
  get circumference(){ return 2 * Math.PI * this.radius; }
  get clampedValue(){ return Math.min(100, Math.max(0, this.value)); }
  get dashOffset()  { return this.circumference * (1 - this.clampedValue / 100); }

  ngOnChanges(): void { /* triggers getter re-evaluation in OnPush */ }
}
