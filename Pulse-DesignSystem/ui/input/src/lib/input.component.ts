import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  @Input() type: `${InputType}` = InputType.TEXT;

  /** Label above the input */
  @Input() label = '';

  /** Show help/info icon next to label */
  @Input() helpIcon = false;

  /** Show required asterisk next to label */
  @Input() required = false;

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

  /** Trailing icon HTML string (ignored when type=password — eye toggle takes over) */
  @Input() trailingIcon = '';

  /** Max character length */
  @Input() maxLength: number | null = null;

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

  /** Initial / bound value */
  @Input()
  set value(v: string) {
    this._value = v ?? '';
    this.charCount = this._value.length;
  }
  get value(): string { return this._value; }
  private _value = '';

  /** Emits value on every keystroke */
  @Output() valueChange = new EventEmitter<string>();

  readonly inputId = `v-input-${++nextId}`;
  showPassword = false;
  charCount = 0;

  private onChange = (_: string) => {};
  private onTouched = () => {};
  private sanitizer = inject(DomSanitizer);

  constructor(private cdr: ChangeDetectorRef) {}

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  get effectiveType(): string {
    return this.type === 'password' && this.showPassword ? 'text' : this.type;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.cdr.markForCheck();
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.value = val; // setter updates charCount
    this.onChange(val);
    this.valueChange.emit(val);
    this.cdr.markForCheck();
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value ?? ''; // setter updates charCount
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
