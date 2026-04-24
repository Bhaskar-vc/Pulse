import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { VcFormControl } from '@vantagecircle/vantage-ui/core';
import { UniqueIdService } from '@vantagecircle/vantage-ui/core';
import { sizes } from '@vantagecircle/vantage-ui/core';
import { VcToggleClickEvent } from './toggle.interface';

@Component({
    standalone: true,
    selector: 'vc-toggle',
    imports: [CommonModule],
    templateUrl: './toggle.component.html',
    styleUrl: './toggle.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VcToggle),
            multi: true,
        },
    ]
})
export class VcToggle implements VcFormControl {
  /**
   * Status of the toggle.
   * @group Props
   */
  private _checked: boolean = false;
  @Input()
  set checked(value: boolean) {
    this._checked = value;
    this.model = value;
  }

  get checked(): boolean {
    return this._checked;
  }

  /**
   * Label of the form control.
   * @group Props
   */
  @Input() label: string | undefined;

  /**
   * Size of the checkbox
   * @group Props
   */
  sizes = sizes;
  @Input() size: string = this.sizes.MEDIUM;

  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  @Input() ariaLabelledBy: string | undefined;

  /**
   * Used to define a string that labels the form control.
   * @group Props
   */
  @Input() ariaLabel: string | undefined;

  /**
   * To specify if the form control is disabled or not
   * @group Props
   */
  @Input() disabled: boolean | undefined;

  /**
   * Callback to invoke when then toggle button is clicked.
   * @param {VcToggleClickEvent} event - Custom click event.
   * @group Emits
   */
  @Output() onClick: EventEmitter<VcToggleClickEvent> = new EventEmitter();

  /**
   * Callback to invoke when toggle button receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Callback to invoke when the toggle button loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();

  @ViewChild('toggle-btn') toggleBtn!: ElementRef;
  elementId: string;

  constructor(
    private _cd: ChangeDetectorRef,
    private _uidService: UniqueIdService,
  ) {
    this.elementId = this._uidService.generateUniqueId('vc-toggle-btn');
  }

  /**
   * Control Value Accessor implementation
   */

  model: boolean = false;
  hovered: boolean = false;
  focused: boolean = false;

  onModelChange: (value: boolean) => void = () => {};
  onModelTouched: () => void = () => {};

  writeValue(value: boolean | number): void {
    this.model = Boolean(value);
    this._cd.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cd.markForCheck();
  }

  handleClick(event: Event) {
    event.preventDefault();

    if (this.disabled) {
      return;
    }

    if (this.toggleBtn && this.toggleBtn.nativeElement) {
      (this.toggleBtn.nativeElement as HTMLElement).focus();
      this.focused = true;
    }

    this.model = !this.model;
    this.onModelChange(this.model);
    this.onModelTouched();

    const clickEvent: VcToggleClickEvent = {
      checked: this.model,
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
