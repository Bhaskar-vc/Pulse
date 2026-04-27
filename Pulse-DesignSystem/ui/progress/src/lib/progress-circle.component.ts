import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressColor } from './progress.enums';

@Component({
  standalone: true,
  selector: 'v-progress-circle',
  imports: [CommonModule],
  templateUrl: './progress-circle.component.html',
  styleUrl: './progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VProgressCircle implements OnChanges {
  /** Current percentage value (0–100) */
  @Input() value = 0;

  /** Stroke color */
  @Input() color: `${ProgressColor}` = ProgressColor.PRIMARY;

  /** SVG diameter in px */
  @Input() diameter = 80;

  /** Stroke width in px */
  @Input() strokeWidth = 8;

  /** Optional text label beneath the circle */
  @Input() label = '';

  /** Show percentage in the centre of the circle */
  @Input() showValue = true;

  /** Small sub-text shown below the percentage */
  @Input() sublabel = '';

  r = 32;
  cx = 40;
  circumference = 0;
  offset = 0;
  fillClass = '';
  displayValue = 0;

  ngOnChanges(): void {
    this.cx = this.diameter / 2;
    this.r = (this.diameter - this.strokeWidth * 2) / 2;
    this.circumference = 2 * Math.PI * this.r;

    const clamped = Math.min(100, Math.max(0, this.value));
    this.offset = this.circumference * (1 - clamped / 100);
    this.displayValue = Math.round(clamped);

    this.fillClass = `progress-circle-fill progress-circle-fill--${this.color}`;
  }
}
