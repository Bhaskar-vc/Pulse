import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleColor, ToggleSize } from './toggle.enums';

@Component({
  standalone: true,
  selector: 'v-toggle',
  imports: [CommonModule, FormsModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VToggle),
      multi: true,
    },
  ],
})
export class VToggle implements ControlValueAccessor {
  /** Label displayed next to the toggle */
  @Input() label = '';

  /** Supporting text below the label */
  @Input() supporting = '';

  /** Toggle size */
  @Input() size: `${ToggleSize}` = ToggleSize.MD;

  /** Toggle color when on */
  @Input() color: `${ToggleColor}` = ToggleColor.SUCCESS;

  /** Whether the toggle is disabled */
  @Input()
  set disabled(value: boolean | string) {
    this._disabled = value === '' || value === 'true' || value === true;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /** Emits new boolean value when toggled */
  @Output() changed = new EventEmitter<boolean>();

  checked = false;

  private onChange = (_: boolean) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  toggle(): void {
    if (this._disabled) return;
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
    this.changed.emit(this.checked);
    this.cdr.markForCheck();
  }

  writeValue(value: boolean): void {
    this.checked = !!value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
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
