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
import { CheckboxSize } from './checkbox.enums';

@Component({
  standalone: true,
  selector: 'v-checkbox',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VCheckbox),
      multi: true,
    },
  ],
})
export class VCheckbox implements ControlValueAccessor {
  /** Display label next to the checkbox */
  @Input() label = '';

  /** Supporting/helper text below the label */
  @Input() supporting = '';

  /** Size of the checkbox control */
  @Input() size: `${CheckboxSize}` = CheckboxSize.MD;

  /** Whether the checkbox is in an indeterminate state */
  @Input() indeterminate = false;

  /** Whether the checkbox is disabled */
  @Input()
  set disabled(value: boolean | string) {
    this._disabled = value === '' || value === 'true' || value === true;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /** Emits the new boolean value when toggled */
  @Output() changed = new EventEmitter<boolean>();

  checked = false;

  private onChange = (_: boolean) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  toggle(): void {
    if (this._disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;
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
