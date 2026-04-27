import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { VcRadioClickEvent } from './radio.interface';
import { VcFormControl } from '@vantagecircle/vantage-ui/core';
import { UniqueIdService } from '@vantagecircle/vantage-ui/core';
import { sizes } from '@vantagecircle/vantage-ui/core';

@Component({
    standalone: true,
    selector: 'vc-radio',
    imports: [CommonModule],
    templateUrl: './radio.component.html',
    styleUrl: './radio.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VcRadio),
            multi: true,
        },
    ]
})
export class VcRadio implements OnInit, VcFormControl {
  /**
   * Value of the radio.
   * @group Props
   */
  @Input() value: any;

  /**
   * Name of the radio group.
   * @group Props
   */
  @Input() name: string | undefined;

  /**
   * To specify if the checkbox is disabled or not
   * @group Props
   */
  @Input() disabled: boolean = false;

  /**
   * Label of the radio.
   * @group Props
   */
  @Input() label: string | undefined;

  /**
   * Label font weight.
   * @group Props
   */
  @Input() labelFontWeight: 'light' | 'default' | 'dark' = 'default';

  /**
   * Subtext to be shown below the label.
   * @group Props
   */
  @Input() subtext: string | undefined;

  /**
   * Size of the radio.
   * @group Props
   */
  sizes = sizes;
  @Input() size: string = this.sizes.SMALL;

  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  @Input() ariaLabelledBy: string | undefined;

  /**
   * Used to define a string that labels the input element.
   * @group Props
   */
  @Input() ariaLabel: string | undefined;

  /**
   * Callback to invoke on radio button select.
   * @param {VcRadioClickEvent} event - Custom click event.
   * @group Emits
   */
  @Output() onClick: EventEmitter<VcRadioClickEvent> = new EventEmitter();

  /**
   * Callback to invoke when radio button receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Callback to invoke when the radio button loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();

  @ViewChild('radio') radioViewChild!: ElementRef;
  elementId: string;

  constructor(
    private _cd: ChangeDetectorRef,
    private _uidService: UniqueIdService,
  ) {
    this.elementId = this._uidService.generateUniqueId('vc-radio');
  }

  ngOnInit(): void {
    if (this.value && this.model === this.value) {
      this.checked = true;
    }
  }

  /**
   * Control Value Accessor implementation
   */
  model: any;
  checked: boolean = false;
  hovered: boolean = false;
  focused: boolean = false;

  onModelChange: (value: any) => void = () => {};
  onModelTouched: () => void = () => {};

  writeValue(value: any): void {
    if (this.value !== undefined && this.value !== null) {
      this.checked = value == this.value;
    }
    this.model = value;
    this._cd.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cd.markForCheck();
  }

  getLabelClass() {
    return {
      'font-normal':
        this.labelFontWeight === 'light' || this.labelFontWeight === 'default',
      'text-primary-500':
        (this.labelFontWeight === 'default' || this.labelFontWeight === 'dark') && !this.disabled,
      'font-medium': this.labelFontWeight === 'dark',
      'text-sm': this.size === this.sizes.SMALL,
      'text-base': this.size === this.sizes.MEDIUM || this.sizes.DEFAULT,
    };
  }

  getMainContainerClass() {
    return {
      'gap-sm':
        this.size === this.sizes.SMALL || this.size === this.sizes.DEFAULT,
      'gap-md': this.size === this.sizes.MEDIUM,
    };
  }

  handleClick(event: Event) {
    event.preventDefault();

    if (this.disabled) {
      return;
    }

    if (this.radioViewChild && this.radioViewChild.nativeElement) {
      (this.radioViewChild.nativeElement as HTMLElement).focus();
      this.focused = true;
    }

    this.checked = true;
    this.onModelChange(this.value);
    this.onModelTouched();

    const clickEvent: VcRadioClickEvent = {
      value: this.value,
      originalEvent: event,
    };

    this.onClick.emit(clickEvent);
  }

  handleFocus(event: Event) {
    this.focused = true;
    this.onFocus.emit(event);
  }

  handleBlur(event: Event) {
    this.focused = false;
    this.onBlur.emit(event);
  }

  handleMouseEnter() {
    this.hovered = true;
  }

  handleMouseLeave() {
    this.hovered = false;
  }
}
