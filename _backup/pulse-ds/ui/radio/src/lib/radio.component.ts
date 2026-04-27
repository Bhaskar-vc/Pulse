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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VRadio {
  /** Label displayed next to the radio */
  @Input() label = '';

  /** Supporting text below the label */
  @Input() supporting = '';

  /** The value this radio represents */
  @Input() value: any = null;

  /** Whether this radio is selected */
  @Input() checked = false;

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
    if (this._disabled || this.checked) return;
    this.checked = true;
    this.selected.emit(this.value);
    this.cdr.markForCheck();
  }
}
