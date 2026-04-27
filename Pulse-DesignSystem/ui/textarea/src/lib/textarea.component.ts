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

let nextId = 0;

@Component({
  standalone: true,
  selector: 'vc-textarea',
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VcTextarea),
      multi: true,
    },
  ],
})
export class VcTextarea implements ControlValueAccessor {
  /** Label above the textarea */
  @Input() label = '';

  /** Show ⓘ help icon next to the label */
  @Input() helpIcon = false;

  /** Show required asterisk (*) next to the label */
  @Input() required = false;

  /** Placeholder text */
  @Input() placeholder = '';

  /** Helper text below the textarea */
  @Input() hint = '';

  /** Error message — activates destructive state */
  @Input() error = '';

  /** Max character count — shows a counter when set */
  @Input() maxLength: number | null = null;

  /** Min character count */
  @Input() minLength: number | null = null;

  /** Number of visible rows */
  @Input() rows = 4;

  /** Allow vertical resize */
  @Input() resize = true;

  /** Disable the textarea */
  @Input()
  set disabled(value: boolean | string) {
    this._disabled = value === '' || value === 'true' || value === true;
  }
  get disabled(): boolean { return this._disabled; }
  private _disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  readonly fieldId = `vc-textarea-${++nextId}`;
  value = '';
  charCount = 0;

  private onChange = (_: string) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  onInput(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value = val;
    this.charCount = val.length;
    this.onChange(val);
    this.valueChange.emit(val);
    this.cdr.markForCheck();
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value ?? '';
    this.charCount = this.value.length;
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
