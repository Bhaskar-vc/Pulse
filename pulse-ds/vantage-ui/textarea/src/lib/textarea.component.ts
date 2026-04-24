import { ChangeDetectorRef, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VcLabel } from '@vantagecircle/vantage-ui/label';

@Component({
    standalone: true,
    selector: 'vc-textarea',
    imports: [CommonModule, FormsModule, VcLabel],
    templateUrl: './textarea.component.html',
    styleUrl: './textarea.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VcTextarea),
            multi: true,
        },
    ]
})
export class VcTextarea {
  @Input() textareaId: string | undefined;

  @Input() label: string | undefined;

  @Input() hintText: string | undefined;

  @Input() errorText: string = "Error";

  @Input() placeholder: string = '';

  @Input() required: boolean = false;

  @Input() disabled: boolean = false;

  @Input() value: string = '';

  @Input() textareaStyle: string | undefined;

  @Input() minLength: number | null = null;

  @Input() maxLength: number | null = null;

  @Input() resize: boolean = true;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  //model!: string;
  model: string = '';
  generatedId: string = '';

  touched: boolean = false;

  onModelChange: (value: string) => void = () => {};
  onModelTouched: () => void = () => {};

  constructor(private _cdRef: ChangeDetectorRef) {
    this.generatedId = 'textarea-' + Math.random().toString(36).substring(7);
  }

  writeValue(value: string): void {
    this.model = value;
    //this._cdRef.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    //this._cdRef.markForCheck();
  }

  onInputChange(event: any) {
    //this.valueChange.emit(event.target.value);
    if(event && event.target) {
      const value = (event.target as HTMLInputElement).value;
      this.onModelChange(value);
      this.onModelTouched();
      this.valueChange.emit(value);
    }
  }

  handleBlur() {
    this.touched = true;
  }
}
