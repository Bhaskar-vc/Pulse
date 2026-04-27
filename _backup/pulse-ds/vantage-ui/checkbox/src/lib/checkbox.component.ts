import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { sizes } from '@vantagecircle/vantage-ui/core';
import {
  VcCheckItem,
  VcCheckgroupChangeEvent,
  VcCheckboxChangeEvent,
} from './checkbox.interface';
import { VcFormControl } from '@vantagecircle/vantage-ui/core';
import { UniqueIdService } from '@vantagecircle/vantage-ui/core';

@Component({
    standalone: true,
    selector: 'vc-checkbox',
    imports: [CommonModule],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VcCheckbox),
            multi: true,
        },
    ]
})
export class VcCheckbox implements VcFormControl {
  /**
   * Value of the checkbox
   * @group Props
   */
  @Input() value: string | undefined;

  /**
   * Name of the checkbox group.
   * @group Props
   */
  @Input() name: string | undefined;

  /**
   * Identifier of the focused checkbox to bind with a label
   * @group Props
   */
  @Input() inputId: number | undefined;

  /**
   * To specify if the checkbox is disabled or not
   * @group Props
   */
  @Input() disabled: boolean = false;

  /**
   * Label of the checkbox.
   * @group Props
   */
  @Input() label: string | undefined;

  /**
   * Label type.
   * @group Props
   */
  @Input() labelType: 'light' | 'default' | 'dark' = 'default';

  /**
   * Supporting text for the label.
   * @group Props
   */
  @Input() subtext: string | undefined;

  /**
   * Size of the checkbox
   * @group Props
   */
  sizes = sizes;
  @Input() size: string = this.sizes.DEFAULT;

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
   * When present, it specifies that checkbox must be checked before submitting the form.
   * @group Props
   */
  @Input() required: boolean | undefined;

  /**
   * Checked status of the checkbox
   * @group Props
   */
  @Input() checked: boolean = false;

  /**
   * Indeterminate state of the checkbox
   * @group Props
   */
  private _indeterminate: boolean = false;

  @Input({ transform: booleanAttribute })
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  set indeterminate(value: boolean) {
    if (value != this.indeterminate) {
      const changed = value != this._indeterminate;
      this._indeterminate = value;

      if (changed) {
        if (this._indeterminate) {
          this.checked = false;
        }
        this.onIndeterminateChange.emit(this._indeterminate);
      }
    }
  }

  /**
   * Callback to invoke on group change.
   * @group Emits
   */
  @Output() onChangeGroup: EventEmitter<VcCheckgroupChangeEvent> =
    new EventEmitter();

  /**
   * Callback to invoke when state of a checkbox in a group changes
   * @group Emits
   */
  @Output() onChangeItem: EventEmitter<VcCheckboxChangeEvent> =
    new EventEmitter();

  /**
   * Callback to invoke when state of a checkbox changes
   * @group Emits
   */
  @Output() onChange: EventEmitter<VcCheckboxChangeEvent> = new EventEmitter();

  /**
   * Callback to invoke when indeterminate state changes
   * @group Emits
   */
  @Output() onIndeterminateChange = new EventEmitter<boolean>();

  /**
   * Callback to invoke when the checkbox receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Callback to invoke when the checkbox loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();

  @ViewChild('checkbox') checkboxViewChild!: ElementRef;
  elementId: string;

  /**
   * Control Value Accessor implementation
   */
  model!: VcCheckItem[];
  hovered!: boolean;
  focused!: boolean;

  onModelChange: (value: VcCheckItem[]) => void = () => {};
  onModelTouched: () => void = () => {};

  writeValue(value: VcCheckItem[]): void {
    this.model = value;
    this._cd.markForCheck();
  }

  registerOnChange(fn: (value: VcCheckItem[]) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
    this._cd.markForCheck();
  }

  constructor(
    private _cd: ChangeDetectorRef,
    private _uidService: UniqueIdService,
  ) {
    this.elementId = this._uidService.generateUniqueId('vc-checkbox');
  }

  /**
   * Method to find the item in the checkgroup.
   * @param {string} itemId - Identifier of the check item.
   * @returns {VcCheckItem} The matched check item if found, otherwise undefined.
   */
  findItemIndex(itemId: number | undefined): number {
    let index: number = -1;
    this.model?.forEach((item, idx) => {
      if (item.id === itemId) {
        index = idx;
      }
    });
    return index;
  }

  getCheckboxClass() {
    return {
      'checkbox-size-sm':
        this.size === sizes.SMALL || this.size === sizes.DEFAULT,
      'checkbox-size-md': this.size === sizes.MEDIUM,
      'mt-[3px]': this.size === sizes.SMALL || this.size === sizes.DEFAULT,
      'mt-[1.5px]': this.size === sizes.MEDIUM,
      checked: this.checked,
      indeterminate: this.indeterminate,
    };
  }

  getLabelClass() {
    return {
      'checkbox-size-sm-label': this.size === sizes.SMALL,
      'checkbox-label-light': this.labelType === 'light',
      'checkbox-label-dark': this.labelType === 'dark',
    };
  }

  handleClick(event: Event, checkedItemId: number | undefined): void {
    event.preventDefault();

    if (this.disabled) {
      return;
    }

    if (this.checkboxViewChild && this.checkboxViewChild.nativeElement) {
      (this.checkboxViewChild.nativeElement as HTMLElement).focus();
      this.focused = true;
    }

    if (this.indeterminate) {
      this.checked = true;
      this.indeterminate = false;
    } else {
      this.checked = !this.checked;
    }

    if (checkedItemId !== undefined) {
      const index = this.findItemIndex(checkedItemId);

      if (index != -1) {
        this.model[index].checked = this.checked;

        this.onChangeGroup.emit({
          updatedGroup: this.model,
          originalEvent: event,
        });

        this.onChangeItem.emit({
          changedItem: this.model[index],
          originalEvent: event,
        });
      }
    }

    this.onChange.emit({
      checked: this.checked,
      indeterminate: this.indeterminate,
      originalEvent: event,
    });

    this.onModelChange(this.model);
    this.onModelTouched();
  }

  // handleClick(event: Event, checkedItemId: number | undefined): void {
  //   event.preventDefault();

  //   if (this.disabled) {
  //     return;
  //   }

  //   if (this.checkboxViewChild && this.checkboxViewChild.nativeElement) {
  //     (this.checkboxViewChild.nativeElement as HTMLElement).focus();
  //     this.focused = true;
  //   }

  //   if (this.indeterminate) {
  //     this.checked = true;
  //     this.indeterminate = false;
  //   } else {
  //     this.checked = !this.checked;
  //   }

  //   if (checkedItemId === undefined) {
  //     return;
  //   }

  //   const index = this.findItemIndex(checkedItemId);
  //   if (index != -1) {
  //     this.model[index].checked = this.checked;
  //   }

  //   this.onModelChange(this.model);
  //   this.onModelTouched();

  //   this.onChangeGroup.emit({
  //     updatedGroup: this.model,
  //     originalEvent: event,
  //   });

  //   this.onChangeItem.emit({
  //     changedItem: this.model[index],
  //     originalEvent: event,
  //   });
  // }

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
