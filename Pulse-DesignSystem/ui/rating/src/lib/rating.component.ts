import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  forwardRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type StarState = 'full' | 'half' | 'empty';

@Component({
  standalone: true,
  selector: 'v-rating',
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => VRating), multi: true },
  ],
})
export class VRating implements ControlValueAccessor, OnChanges {
  /** Rating value (0–max, supports .5 increments) */
  @Input() value = 0;

  /** Total number of stars */
  @Input() max = 5;

  /** Size variant */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Star fill color */
  @Input() color: 'yellow' | 'purple' | 'gray' = 'yellow';

  /** Allow user interaction */
  @Input() interactive = false;

  /** Optional review count shown in parentheses */
  @Input() count: number | null = null;

  /** Show numeric value after stars */
  @Input() showValue = false;

  /** Accessible label */
  @Input() ariaLabel = '';

  /** Emitted when user selects a rating */
  @Output() ratingChange = new EventEmitter<number>();

  stars: StarState[] = [];
  ratingClass = '';
  starFillClass = '';

  private cdr = inject(ChangeDetectorRef);
  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnChanges(): void {
    const parts = ['rating', `rating-${this.size}`];
    if (this.interactive) parts.push('rating-interactive');
    this.ratingClass = parts.join(' ');

    const fillMap: Record<string, string> = {
      yellow: 'star-filled',
      purple: 'star-filled-purple',
      gray:   'star-filled-gray',
    };
    this.starFillClass = fillMap[this.color] ?? 'star-filled';

    this.stars = this.buildStars();
  }

  setRating(rating: number): void {
    this.value = rating;
    this.stars = this.buildStars();
    this.onChange(rating);
    this.onTouched();
    this.ratingChange.emit(rating);
    this.cdr.markForCheck();
  }

  writeValue(val: number): void {
    this.value = val ?? 0;
    this.stars = this.buildStars();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  private buildStars(): StarState[] {
    return Array.from({ length: this.max }, (_, i) => {
      const threshold = i + 1;
      if (this.value >= threshold) return 'full';
      if (this.value >= threshold - 0.5) return 'half';
      return 'empty';
    });
  }
}
