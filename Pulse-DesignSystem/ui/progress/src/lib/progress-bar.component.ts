import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressColor, ProgressSize } from './progress.enums';

@Component({
  standalone: true,
  selector: 'v-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VProgressBar implements OnChanges {
  /** Current value (0–max) */
  @Input() value = 0;

  /** Maximum value (default 100) */
  @Input() max = 100;

  /** Track height */
  @Input() size: `${ProgressSize}` = ProgressSize.MD;

  /** Fill color */
  @Input() color: `${ProgressColor}` = ProgressColor.PRIMARY;

  /** Show diagonal stripe pattern */
  @Input() striped = false;

  /** Animate the stripes (requires striped=true) */
  @Input() animated = false;

  /** Show indeterminate animation instead of fixed value */
  @Input() indeterminate = false;

  /** Optional label displayed above the bar */
  @Input() label = '';

  /** Show percentage value to the right of the label */
  @Input() showValue = false;

  trackClass = '';
  fillClass = '';
  displayValue = 0;

  ngOnChanges(): void {
    this.displayValue = Math.round(
      Math.min(100, Math.max(0, (this.value / this.max) * 100)),
    );

    this.trackClass = `progress-track--${this.size}`;

    const parts = ['progress-fill', `progress-fill--${this.color}`];
    if (this.striped) parts.push('progress-fill--striped');
    if (this.animated) parts.push('progress-fill--animated');
    if (this.indeterminate) parts.push('progress-fill--indeterminate');
    this.fillClass = parts.join(' ');
  }
}
