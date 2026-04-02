import {
  Component, Input, Output, EventEmitter,
  forwardRef, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ds-checkbox',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true,
  }],
  template: `
    <label class="ds-checkbox" [class.ds-checkbox--checked]="checked"
           [class.ds-checkbox--indeterminate]="indeterminate"
           [class.ds-checkbox--disabled]="disabled">

      <span class="ds-checkbox__box" (click)="toggle()">
        <!-- Checked checkmark -->
        <svg *ngIf="checked && !indeterminate"
             class="ds-checkbox__check"
             viewBox="0 0 12 12" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 6L4.5 9L10.5 3" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <!-- Indeterminate dash -->
        <svg *ngIf="indeterminate"
             class="ds-checkbox__check"
             viewBox="0 0 12 12" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 6H9.5" stroke="currentColor"
                stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>

      <span *ngIf="label || hasContent" class="ds-checkbox__content">
        <span *ngIf="label" class="ds-checkbox__label">{{ label }}</span>
        <span *ngIf="description" class="ds-checkbox__description">{{ description }}</span>
        <ng-content></ng-content>
      </span>

      <!-- Hidden native input for a11y -->
      <input
        type="checkbox"
        class="ds-checkbox__input"
        [checked]="checked"
        [disabled]="disabled"
        [attr.name]="name"
        [attr.value]="value"
        (change)="onNativeChange($event)"
        tabindex="-1"
      />
    </label>
  `,
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() description?: string;
  @Input() name?: string;
  @Input() value?: string;
  @Input() disabled = false;
  @Input() indeterminate = false;

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(v: boolean) { this._checked = v; this.cdr.markForCheck(); }

  @Output() checkedChange = new EventEmitter<boolean>();

  hasContent = false;
  private _checked = false;
  private onChange = (_: boolean) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  toggle(): void {
    if (this.disabled) return;
    this._checked = !this._checked;
    this.checkedChange.emit(this._checked);
    this.onChange(this._checked);
    this.onTouched();
    this.cdr.markForCheck();
  }

  onNativeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._checked = input.checked;
    this.checkedChange.emit(this._checked);
    this.onChange(this._checked);
  }

  // ── ControlValueAccessor ────────────────────────────────────
  writeValue(val: boolean): void {
    this._checked = !!val;
    this.cdr.markForCheck();
  }
  registerOnChange(fn: (v: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void          { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
