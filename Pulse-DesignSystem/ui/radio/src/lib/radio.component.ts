import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioSize } from './radio.enums';

@Component({
  standalone: true,
  selector: 'v-radio',
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class VRadio {
  /** Label displayed next to the radio */
  @Input() label = '';

  /** Supporting text below the label */
  @Input() supporting = '';

  /** The value this radio represents */
  @Input() value: any = null;

  /** Whether this radio is selected */
  @Input()
  set checked(value: boolean) {
    this._checked = value;
    this.cdr.markForCheck();
  }
  get checked(): boolean {
    return this._checked;
  }
  private _checked = false;

  /** The name attribute for grouping radios */
  @Input() name = '';

  /** Size of the radio control */
  @Input() size: `${RadioSize}` = RadioSize.MD;

  /** Whether the radio is disabled */
  @Input()
  set disabled(value: boolean | string) {
    this._disabled = value === '' || value === 'true' || value === true;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /** Emits the value when this radio is selected */
  @Output() selected = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  select(): void {
    if (this._disabled || this._checked) return;
    this.checked = true; // triggers setter → markForCheck
    this.selected.emit(this.value);
  }
}
