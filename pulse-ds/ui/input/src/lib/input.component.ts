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
import { InputType } from './input.enums';

let nextId = 0;

@Component({
  standalone: true,
  selector: 'v-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VInput),
      multi: true,
    },
  ],
})
export class VInput implements ControlValueAccessor {
  /** Input type */
  @Input() type: `${InputType}` | 'textarea' = InputType.TEXT;

  /** Label above the input */
  @Input() label = '';

  /** Placeholder text */
  @Input() placeholder = '';

  /** Hint text below input */
  @Input() hint = '';

  /** Error message (shown instead of hint, colors input red) */
  @Input() error = '';

  /** Prefix text badge */
  @Input() prefixText = '';

  /** Prefix icon HTML string */
  @Input() prefixIcon = '';

  /** Suffix text badge */
  @Input() suffixText = '';

  /** Leading icon HTML string */
  @Input() leadingIcon = '';

  /** Trailing icon HTML string */
  @Input() trailingIcon = '';

  /** Max character length */
  @Input() maxLength: number | null = null;

  /** Textarea rows (only used when type='textarea') */
  @Input() rows = 4;

  /** Whether input is disabled */
  @Input()
  set disabled(value: boolean | string) {
    this._disabled = value === '' || value === 'true' || value === true;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /** Whether input is readonly */
  @Input() readonly = false;

  /** Emits value on every keystroke */
  @Output() valueChange = new EventEmitter<string>();

  readonly inputId = `v-input-${++nextId}`;
  value = '';

  private onChange = (_: string) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.value = val;
    this.onChange(val);
    this.valueChange.emit(val);
    this.cdr.markForCheck();
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value ?? '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
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
