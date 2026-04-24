import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SliderColor, SliderSize } from './slider.enums';

let nextId = 0;

@Component({
  standalone: true,
  selector: 'v-slider',
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VSlider),
      multi: true,
    },
  ],
})
export class VSlider implements ControlValueAccessor, OnChanges {
  /** Label above the slider */
  @Input() label = '';

  /** Hint text below the slider */
  @Input() hint = '';

  /** Minimum value */
  @Input() min = 0;

  /** Maximum value */
  @Input() max = 100;

  /** Step increment */
  @Input() step = 1;

  /** Whether to show the current value */
  @Input() showValue = true;

  /** Suffix appended to the value display (e.g. '%', 'px') */
  @Input() valueSuffix = '';

  /** Slider size */
  @Input() size: `${SliderSize}` = SliderSize.MD;

  /** Thumb and fill color */
  @Input() color: `${SliderColor}` = SliderColor.PRIMARY;

  /** Whether the slider is disabled */
  @Input()
  set disabled(value: boolean | string) {
    this._disabled = value === '' || value === 'true' || value === true;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /** Emits new numeric value */
  @Output() valueChange = new EventEmitter<number>();

  readonly sliderId = `v-slider-${++nextId}`;
  value = 0;
  trackBackground = '';

  private onChange = (_: number) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {
    this.updateTrack();
  }

  ngOnChanges(): void {
    this.updateTrack();
  }

  onInput(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.value = val;
    this.updateTrack();
    this.onChange(val);
    this.onTouched();
    this.valueChange.emit(val);
    this.cdr.markForCheck();
  }

  private updateTrack(): void {
    const pct = ((this.value - this.min) / (this.max - this.min)) * 100;
    const fillColor = this.getTrackColor();
    this.trackBackground = `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${pct}%, #eaeaed ${pct}%, #eaeaed 100%)`;
  }

  private getTrackColor(): string {
    switch (this.color) {
      case SliderColor.SUCCESS: return '#039855';
      case SliderColor.ERROR:   return '#f04438';
      case SliderColor.WARNING: return '#f79009';
      default: return '#7f56d9';
    }
  }

  writeValue(value: number): void {
    this.value = value ?? 0;
    this.updateTrack();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
