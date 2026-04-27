import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { Overlay, OverlayModule, ViewportRuler } from '@angular/cdk/overlay';
import { A11yModule, ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { UniqueIdService, VcFormControl } from '@vantagecircle/vantage-ui/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  VcActionSelectionEvent,
  VcListboxActiveIndexChangeEvent,
  VcOption,
  VcSelectEvent,
  VcSelectOption,
  VcSelectionChangeEvent,
} from '@vantagecircle/vantage-ui/listbox';
import { Subscription } from 'rxjs';
import { panelAnimation } from './panel.animations';
import { VcCheckbox } from '@vantagecircle/vantage-ui/checkbox';
import { VcListbox } from '@vantagecircle/vantage-ui/listbox';
import { VcCheckboxChangeEvent } from '@vantagecircle/vantage-ui/checkbox';
import { isEqual } from 'lodash';
import { VcLabel } from '@vantagecircle/vantage-ui/label';
@Component({
    standalone: true,
    selector: 'vc-select',
    imports: [CommonModule, OverlayModule, A11yModule, VcLabel, VcListbox, VcCheckbox],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VcSelect),
            multi: true,
        },
    ],
    animations: [panelAnimation]
})
export class VcSelect
  implements OnInit, OnDestroy, AfterContentInit, VcFormControl
{
  /**
   * List of Dropdown option
   * @group Props
   */
  // @Input() options: Array<VcSelectOption> | undefined;

  /**
   * Select button type
   * @group Props
   */
  @Input() type: 'light' | 'bordered' = 'bordered';
  
  /**
   * Select button label
   * @group Props
   */
  @Input() label: string = '';

  /**
   * Select placeholder
   * @group Props
   */
  @Input() placeholder: string = '';

  /**
   * Whether loading or not.
   * @group Props
   */
  @Input() loading: boolean = false;

  /**
   * Default selected item
   * @group Props
   */
  // @Input() defaultSelected: VcSelectOption | undefined;
  private _defaultSelected: VcSelectOption | VcSelectOption[] | undefined;

  @Input()
  set defaultSelected(value: VcSelectOption | VcSelectOption[] | undefined) {
    this._defaultSelected = value;
    if (value) {
      this._updateSelection(value);
    }
  }

  get defaultSelected(): VcSelectOption | VcSelectOption[] | undefined {
    return this._defaultSelected;
  }

  /**
   * Whether the dropdown will be borderless or not.
   * @group Props
   */
  @Input() borderLess: boolean | undefined = false;

  /**
   * Width of the dropdown.
   * @group Props
   */
  @Input() width: string | undefined;

  /**
   * Min width of the dropdown.
   * @group Props
   */
  @Input() minWidth: string | undefined;

  /**
   * Max width of the dropdown.
   * @group Props
   */
  @Input() maxWidth: string | undefined;

  /**
   * Width of the dropdown.
   * @group Props
   */
  @Input() widthFitContent: boolean = false;

  /**
   * Width of the dropdown.
   * @group Props
   */
  @Input() componentStyle: string = '';

  /**
   * To specify if multiple options can be selected or not
   * @group Props
   */
  @Input() multiple: boolean = false;
  
  /**
   * Size of the dropdown.
   * @group Props
   */
  @Input() size: 'sm' | 'default' = 'default';

  /**
   * Color theme.
   * @group Props
   */
  @Input() theme: 'light' | 'dark' = 'light';
  
  /**
   * Dropdown option style.
   * @group Props
   */
  @Input() optionStyle: string = '';

  /**
   * To specify if the dropdown button is required or not
   * @group Props
   */
  @Input() required: boolean = false;

  /**
   * To specify if the dropdown button is disabled or not
   * @group Props
   */
  @Input() disabled: boolean = false;

  /**
   * Callback to invoke on item select from dropdown.
   * @group Emits
   */
  @Output() onSelect: EventEmitter<VcSelectEvent> =
    new EventEmitter<VcSelectEvent>();

  /**
   * Callback to invoke on action select from dropdown.
   * @group Emits
   */
  @Output() onSelectAction: EventEmitter<VcActionSelectionEvent> = new EventEmitter<VcActionSelectionEvent>();

  /**
   * Callback to invoke on selection change.
   * @group Emits
   */
  @Output() onChange: EventEmitter<VcSelectionChangeEvent> =
    new EventEmitter<VcSelectionChangeEvent>();

  /**
   * Callback to invoke when the Select input receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Callback to invoke when the Select input loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();

  @ViewChild('vcSelectBtn') vcSelectButtonViewChild!: ElementRef;
  @ViewChild('vcSelectMenu') vcSelectMenuViewChild!: ElementRef;
  @ViewChild(VcListbox) vcListboxViewChild!: VcListbox;
  @ContentChildren(VcOption) options!: QueryList<VcOption>;

  listboxOptions: VcSelectOption[] = [];
  activeIndex: number = -1;
  lastSelectedIndex: number = -1;
  elementId: string;

  selectedPlaceholder: string = '';
  remainingSelectedPlaceholder: string = '';

  menuOpen: boolean = false;
  menuWidth!: number | undefined;
  optionsChangeSubscription: Subscription = Subscription.EMPTY;
  viewportChangeSubscription: Subscription = Subscription.EMPTY;

  scrollStrategy = this._overlay.scrollStrategies.reposition();

  model: VcSelectOption | VcSelectOption[] | undefined;
  onModelChange: (
    value: VcSelectOption | VcSelectOption[] | undefined,
  ) => void = () => {};
  onModelTouched: () => void = () => {};

  constructor(
    private _overlay: Overlay,
    private _host: ElementRef,
    private _cd: ChangeDetectorRef,
    private _renderer: Renderer2,
    private _uidService: UniqueIdService,
    private _viewportRuler: ViewportRuler,
  ) {
    this.elementId = this._uidService.generateUniqueId('vc-select');
  }

  ngOnInit(): void {
    this.viewportChangeSubscription = this._viewportRuler
      .change()
      .subscribe(() => {
        this._setMenuWidth();
      });
  }

  ngAfterContentInit(): void {
    this.optionsChangeSubscription = this.options.changes.subscribe(() => {
      this._updateListboxOptions();
    });

    this._updateListboxOptions();

    if (this.width) {
      this._renderer.setStyle(this._host.nativeElement, 'width', this.width);
    }
  }

  private _updateSelection(value: VcSelectOption | VcSelectOption[]): void {
    if (this.options && value && !isEqual(this.model, value)) {
      if (Array.isArray(value) && this.multiple) {
        this.model = value.length > 0 ? value : undefined;
        this._setPlaceholder(value);
        this._setIndices(value);
      } else if (!Array.isArray(value) && value) {
        this.model = value;
        this._setPlaceholder([value]);
        this._setIndices([value]);
      } else {
        this._clearState();
      }
      this._cd.markForCheck();
    } else if (!value) {
      this._clearSelection();
    }
  }

  private _updateListboxOptions(): void {
    this.listboxOptions = this.options.map((option) => option.getValue());
    if (this.defaultSelected) {
      this._updateSelection(this.defaultSelected);
    }
  }

  private _getHTMLElement(
    elementRef: ElementRef | EventTarget | null,
  ): HTMLElement | undefined {
    if (elementRef instanceof ElementRef) {
      return elementRef?.nativeElement as HTMLElement;
    } else if (elementRef instanceof EventTarget) {
      return elementRef as HTMLElement;
    }

    return undefined;
  }

  private _setPlaceholder(selected: VcSelectOption | VcSelectOption[]): void {
    if (Array.isArray(selected)) {
      const len = selected.length;

      if (len > 0) {
        this.selectedPlaceholder = selected[0].text;

        if (len > 1) {
          const remaining = len - 1;
          this.remainingSelectedPlaceholder =
            '+' + remaining + ' other' + (remaining > 1 ? 's' : '');
        } else {
          this.remainingSelectedPlaceholder = '';
        }
      } else {
        this._clearPlaceholder();
      }
    } else {
      this._clearPlaceholder();
    }
  }

  private _clearPlaceholder() {
    this.selectedPlaceholder = '';
    this.remainingSelectedPlaceholder = '';
  }

  private _clearSelection() {
    this.model = undefined;
    this._setIndices(undefined);
    this._clearPlaceholder();
  }

  private _setMenuWidth() {
    this.menuWidth = this._getHTMLElement(
      this.vcSelectButtonViewChild,
    )?.getBoundingClientRect()?.width;
  }

  private _setIndices(value: VcSelectOption[] | undefined): void {
    if (value && value.length > 0) {
      this.options.forEach((option, index) => {
        if (option.getValue()?.id === value[0].id) {
          this.activeIndex = index;
        }
        if (option.getValue()?.id === value[value.length - 1].id) {
          this.lastSelectedIndex = index;
        }
      });
    } else if (!value) {
      this.activeIndex = 0;
      this.lastSelectedIndex = -1;
    }
  }

  private _clearState(): void {
    this.model = undefined;
    this.activeIndex = -1;
    this.lastSelectedIndex = -1;
    this._clearPlaceholder();
  }

  writeValue(value: VcSelectOption | VcSelectOption[]): void {
    this._updateSelection(value);

    // if (this.options && value) {
    //   if (Array.isArray(value) && this.multiple) {
    //     this.model = value.length > 0 ? value : undefined;
    //     this._setPlaceholder(value);
    //     this._setIndices(value);
    //   } else if (!Array.isArray(value) && value) {
    //     this.model = value;
    //     this._setPlaceholder([value]);
    //     this._setIndices([value]);
    //   } else {
    //     this._clearState();
    //   }

    //   this._cd.markForCheck();

    //   // const index = this._indexOf(value);
    //   // const option = this.options.get(index);
    //   // if (index != -1 && option) {
    //   //   this._setHovered(index);
    //   //   this._setSelected(option);
    //   //   this.model = value;
    //   //   this._cd.markForCheck();
    //   // }
    // } else if (!value) {
    //   this._clearSelection();
    // }
    // // else if (!value) {
    // //   this.setHovered(-1);
    // //   this.setSelected(-1);
    // //   this.model = undefined;
    // // }
  }

  registerOnChange(
    fn: (value: VcSelectOption | VcSelectOption[] | undefined) => void,
  ): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cd.markForCheck();
  }

  isSelectionEmpty(): boolean {
    return this.multiple && Array.isArray(this.model)
      ? this.model.length === 0
      : this.model === undefined;
  }

  getSelectBtnClass() {
    return {
      'fit-content': this.widthFitContent,
      'select-light': this.type === 'light',
      borderless: this.borderLess,
    };
  }

  getOverlayYOffset() {
    return this.type === 'light' ? 4 : 8;
  }

  getVisibleImageUrl() {
    const model = this.model;
    const imageUrl =
      Array.isArray(model) && model.length
        ? model[0].imageURL
        : (model as VcSelectOption)?.imageURL;
    return imageUrl;
  }
  
  getVisibleIconClass() {
    const model = this.model;
    const iconClass =
      Array.isArray(model) && model.length
        ? model[0].icon
        : (model as VcSelectOption)?.icon;
    return iconClass;
  }

  toggleMenu(value: boolean): void {
    this.menuOpen = value;
    // setTimeout(() => {
    //   this.menuOpen = value;
    // }, 0);

    if (value) {
      this._setMenuWidth();
    }
    // if (!this._isOptionListEmpty()) {
    //   const isEmpty = this.selectionModel.isEmpty();
    //   let focusIndex: number = 0;
    //   // When menu is to be opened.
    //   if (value) {
    //     this._setMenuWidth();
    //     // Find the index of the option to be focused.
    //     if (this.multiple) {
    //       if (!this.selectionModel.isEmpty()) {
    //         focusIndex = this._getFirstSelectedIndex();
    //       }
    //     } else {
    //       focusIndex = this.lastSelectedIndex;
    //     }
    //     this._setHovered(focusIndex);
    //   }
    //   this.menuOpen = value;
    //   this.scrollOptionIntoViewTimeoutId = setTimeout(() => {
    //     this._scrollOptionIntoView(focusIndex);
    //   }, 1);
    // }
  }

  close(): void {
    if (this.menuOpen) {
      this.toggleMenu(false);
    }
  }

  handleOutsideClick(event: MouseEvent): void {
    const clickTarget = this._getHTMLElement(event.target);

    if (!this.vcSelectButtonViewChild?.nativeElement?.contains(clickTarget)) {
      this.toggleMenu(false);
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (
      event.code === 'Tab' ||
      event.code === 'Enter' ||
      event.code === 'Space' ||
      event.code === 'ArrowUp' ||
      event.code === 'ArrowDown'
    ) {
      if (this.menuOpen) {
        if (event.code === 'Tab' && this.multiple) {
          event.preventDefault();
        }

        this.vcListboxViewChild.handleKeyDown(event);
      } else if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        this.toggleMenu(true);
      }
    }
  }

  handleActiveIndexChange(event: VcListboxActiveIndexChangeEvent): void {
    this.activeIndex = event.activeIndex;
  }

  handleActionSelect(event: VcActionSelectionEvent): void {
    this.onSelectAction.emit(event);
    this.close();
  }

  handleSelectionChange(event: VcSelectionChangeEvent): void {
    const selected = event.selected as VcSelectOption[];
    const value: VcSelectOption | VcSelectOption[] =
      selected.length === 0 ? [] : this.multiple ? selected : selected[0];

    if (selected.length) {
      this.options.forEach((option, index) => {
        if (option.getValue()?.id === selected[selected.length - 1].id) {
          this.lastSelectedIndex = index;
        }
      });
    }

    this.model = value;
    this.onModelChange(value);

    this._setPlaceholder(selected);

    this.onChange.emit({
      selected: value,
      originalEvent: event.originalEvent,
    });

    if (!this.multiple) {
      if (!Array.isArray(value)) {
        this.onSelect.emit({
          selected: value,
          originalEvent: event.originalEvent,
        });
      }

      this.toggleMenu(false);
    }
  }

  handleSelectAllChange(event: VcCheckboxChangeEvent): void {}

  handleFocus(event: Event) {
    this.onFocus.emit(event);
  }

  handleBlur(event: FocusEvent) {
    if (
      !this.vcSelectMenuViewChild?.nativeElement?.contains(event.relatedTarget)
    ) {
      this.toggleMenu(false);
      this.onBlur.emit(event);
    }
  }

  ngOnDestroy(): void {
    this.viewportChangeSubscription.unsubscribe();
    this.optionsChangeSubscription.unsubscribe();

    // if (this.vcOptionsChangeSubscription) {
    //   this.vcOptionsChangeSubscription.unsubscribe();
    // }
  }
}
