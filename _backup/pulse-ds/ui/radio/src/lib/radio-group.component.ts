import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnInit,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VRadio } from './radio.component';
import { RadioOrientation } from './radio.enums';

@Component({
  standalone: true,
  selector: 'v-radio-group',
  imports: [CommonModule],
  template: `
    <div
      role="radiogroup"
      class="radio-group"
      [class.is-vertical]="orientation === 'vertical'"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VRadioGroup),
      multi: true,
    },
  ],
})
export class VRadioGroup implements ControlValueAccessor, AfterContentInit {
  @Input() orientation: `${RadioOrientation}` = RadioOrientation.VERTICAL;
  @Input() name = `vradio-${Math.random().toString(36).slice(2)}`;

  @ContentChildren(VRadio) radios!: QueryList<VRadio>;

  private selectedValue: any = null;
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.syncRadios();
    this.radios.forEach(radio => {
      radio.name = this.name;
      radio.selected.subscribe((value: any) => {
        this.selectedValue = value;
        this.syncRadios();
        this.onChange(value);
        this.onTouched();
        this.cdr.markForCheck();
      });
    });
  }

  private syncRadios(): void {
    this.radios?.forEach(radio => {
      radio.checked = radio.value === this.selectedValue;
      radio.name = this.name;
    });
  }

  writeValue(value: any): void {
    this.selectedValue = value;
    this.syncRadios();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.radios?.forEach(radio => (radio.disabled = isDisabled));
    this.cdr.markForCheck();
  }
}
