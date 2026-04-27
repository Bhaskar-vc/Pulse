import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  forwardRef,
} from '@angular/core';

import { Overlay, OverlayModule, ViewportRuler } from '@angular/cdk/overlay';
import { VcInputField } from '@vantagecircle/vantage-ui/input-field';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VcListbox, VcOption, VcSelectOption, VcSelectionChangeEvent } from '@vantagecircle/vantage-ui/listbox';
import { Subscription } from 'rxjs';
import { panelAnimation } from './panel.animations';
import { VcAutocompleteOptionsChangeEvent, VcAutocompleteSelectEvent } from './autocomplete.types';
import { VcCheckboxChangeEvent } from '@vantagecircle/vantage-ui/checkbox';

@Component({
    standalone: true,
    selector: 'vc-autocomplete',
    imports: [FormsModule, OverlayModule, VcInputField, VcListbox],
    templateUrl: './autocomplete.component.html',
    styleUrl: './autocomplete.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VcAutocomplete),
            multi: true,
        },
    ],
    animations: [panelAnimation]
})
export class VcAutocomplete implements AfterContentInit, OnDestroy {
  /**
   * Placeholder of Dropdown
   * @group Props
   */
  @Input() placeholder: string = 'Select';

  /**
   * Whether loading or not.
   * @group Props
   */
  @Input() loading: boolean = false;

  /**
   * Selected option(s)
   * @group Props
   */
  // @Input() selected: VcSelectOption | VcSelectOption[] | undefined;

  private _selected: VcSelectOption | VcSelectOption[] | undefined;
  @Input()
  set selected(value: VcSelectOption | VcSelectOption[] | undefined) {
    const newItems = Array.isArray(value) ? [...value] : value;
    this._selected = newItems;
  }

  get selected(): VcSelectOption | VcSelectOption[] | undefined {
    return this._selected;
  }

  /**
   * Whether the dropdown will be borderless or not.
   * @group Props
   */
  @Input() borderLess: boolean | undefined = false;

  /**
   * Whether to show the select all checkbox in the dropdown or not (in case of multiple selection).
   * @group Props
   */
  @Input() showSelectAllCheckbox: boolean = true;

  // /**
  //  * Width of the dropdown.
  //  * @group Props
  //  */
  // @Input() width: string | undefined;

  /**
   * Hint text to be shown in the header part of the autocomplete dropdown panel.
   * @group Props
   */
  @Input() panelHintText: string | undefined;

  /**
   * To specify if multiple options can be selected or not
   * @group Props
   */
  @Input() multiple: boolean = false;

  /**
   * Method that translates an option's control value to its visible value in the trigger (input or textarea)
   * @group Props
   */
  @Input() displayFormatter: ((value: any) => string) | null = null;

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
   * Callback to invoke on selection change.
   * @group Emits
   */
  @Output() onSelect: EventEmitter<VcAutocompleteSelectEvent> = new EventEmitter<VcAutocompleteSelectEvent>();

  @Output() onSelectAllCheckboxChange: EventEmitter<VcCheckboxChangeEvent> = new EventEmitter<VcCheckboxChangeEvent>();

  /**
   * Callback to invoke on autocomplete options change.
   * @group Emits
   */
  @Output() onOptionsChange: EventEmitter<VcAutocompleteOptionsChangeEvent> =
    new EventEmitter<VcAutocompleteOptionsChangeEvent>();

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

  autocompleteInput: string = '';
  listboxOptions: VcSelectOption[] = [];
  scrollStrategy = this._overlay.scrollStrategies.block();

  menuOpen: boolean = false;
  menuWidth: string | undefined;
  optionsChangeSubscription = Subscription.EMPTY;
  viewportChangeSubscription = Subscription.EMPTY;

  @ViewChild('vcInputField') vcInputFieldViewChild!: ElementRef;
  @ViewChild('vcAutocompleteMenu') vcAutocompleteMenuViewChild!: ElementRef;
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;
  @ViewChild(VcListbox) vcListboxViewChild!: VcListbox;
  @ContentChildren(VcOption) options!: QueryList<VcOption>;

  constructor(private _overlay: Overlay) {}

  ngAfterContentInit(): void {
    this.optionsChangeSubscription = this.options.changes.subscribe((value) => {
      this.createListboxOptions();
      this.onOptionsChange.emit({ options: value });
    });

    this.createListboxOptions();
  }

  private createListboxOptions() {
    this.listboxOptions = this.options.map((option) => option.getValue());
  }

  clearSelection() {
    this.selected = undefined;
  }

  setMenuWidth(value: number) {
    this.menuWidth = value + 'px';
  }

  handleKeyDown(event: KeyboardEvent, menuOpen: boolean): void {
    if (event.code === 'Tab' || event.code === 'Enter' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      if (menuOpen) {
        if ((event.code === 'Tab' || event.code === 'ArrowUp' || event.code === 'ArrowDown') && this.multiple) {
          event.preventDefault();
        }

        this.vcListboxViewChild.handleKeyDown(event);
      } else if (event.code === 'Enter') {
        event.preventDefault();
      }
    }
  }

  handleSelectionChange(event: VcSelectionChangeEvent): void {
    const selected = event.selected;

    if (Array.isArray(selected) && selected.length > 0) {
      this.autocompleteInput = selected[0].text;
    }

    this.selected = event.selected;

    this.onSelect.emit({
      selected: this.selected,
      originalEvent: event.originalEvent,
    });
  }

  handleSelectAllChange(event: VcCheckboxChangeEvent): void {
    this.onSelectAllCheckboxChange.emit(event);
  }

  ngOnDestroy(): void {
    this.optionsChangeSubscription.unsubscribe();
    this.viewportChangeSubscription.unsubscribe();
  }
}
