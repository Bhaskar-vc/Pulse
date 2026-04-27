import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { VcCheckbox } from '@vantagecircle/vantage-ui/checkbox';
import { VcOption } from './option/option.component';
import { VcActionSelectionEvent, VcListboxActiveIndexChangeEvent, VcSelectOption, VcSelectionChangeEvent } from './listbox.types';
import { FormsModule } from '@angular/forms';
import { VcCheckboxChangeEvent } from '@vantagecircle/vantage-ui/checkbox';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
    standalone: true,
    selector: 'vc-listbox',
    imports: [CommonModule, ScrollingModule, FormsModule, VcOption, VcCheckbox],
    templateUrl: './listbox.component.html',
    styleUrl: './listbox.component.scss'
})
export class VcListbox implements OnChanges, OnInit {
  /**
   * Listbox options
   * @group Props
   */
  @Input() options: VcSelectOption[] = [];

  /**
   * Default selected options
   * @group Props
   */
  @Input() selected: VcSelectOption | VcSelectOption[] | undefined;

  /**
   * Hint text to be shown in the panel header (for multiple selection)
   * @group Props
   */
  @Input() hintText: string | undefined;

  /**
   * Placeholder of Dropdown
   * @group Props
   */
  @Input() placeholder: string = 'Select';

  /**
   * Width of the listbox
   * @group Props
   */
  @Input() width: string | undefined;

  /**
   * Whether loading or not.
   * @group Props
   */
  @Input() loading: boolean = false;
  
  /**
   * Size of the listbox.
   * @group Props
   */
  @Input() size: 'sm' | 'default' = 'default';

  /**
   * Color theme.
   * @group Props
   */
  @Input() theme: 'light' | 'dark' = 'light';
  
  /**
   * Listbox option style.
   * @group Props
   */
  @Input() optionStyle: string = '';

  /**
   * Default selected item
   * @group Props
   */
  @Input() defaultSelected: VcSelectOption | undefined;

  /**
   * To specify if multiple options can be selected or not
   * @group Props
   */
  @Input() multiple: boolean = false;

  /**
   * Whether to show the select all checkbox in the dropdown or not (in case of multiple selection).
   * @group Props
   */
  @Input() showSelectAllCheckbox: boolean = true;

  /**
   * Callback to invoke on item select from dropdown.
   * @group Emits
   */
  @Output() onActiveIndexChange: EventEmitter<VcListboxActiveIndexChangeEvent> =
    new EventEmitter<VcListboxActiveIndexChangeEvent>();

  /**
   * Callback to invoke on action select from dropdown.
   * @group Emits
   */
  @Output() onSelectAction: EventEmitter<VcActionSelectionEvent> = new EventEmitter<VcActionSelectionEvent>();

  /**
   * Callback to invoke on item select from dropdown.
   * @group Emits
   */
  @Output() onSelectionChange: EventEmitter<VcSelectionChangeEvent> = new EventEmitter<VcSelectionChangeEvent>();

  /**
   * Callback to invoke on Select All checkbox change.
   * @group Emits
   */
  @Output() onSelectAllCheckboxChange: EventEmitter<VcCheckboxChangeEvent> = new EventEmitter<VcCheckboxChangeEvent>();

  selectionModel = new SelectionModel<VcSelectOption>(true);
  selectedAll: boolean = false;
  selectedSome: boolean = false;

  menuOpen: boolean = true;
  menuWidth!: number | undefined;

  activeIndex: number = 0;
  scrollIndexToView: number = 0;
  scrollBehaviour: ScrollBehavior = 'smooth';
  scrollPosition: ScrollLogicalPosition = 'nearest';
  lastSelectedIndex: number = -1;

  constructor() {}

  ngOnInit(): void {
    this._updateSelection(true, true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected'] && !changes['selected'].firstChange) {
      this._updateSelection();
    }

    if (changes['options'] && !changes['options'].firstChange) {
      if (this.options && this.options.length) {
        this._updateSelection(true, true);
      }
    }
  }

  private _updateSelection(setActiveToFirst?: boolean, scrollSelectedToView?: boolean) {
    this.selectionModel.clear();

    if (this.selected) {
      if (Array.isArray(this.selected)) {
        this.selectionModel.select(...this.selected);
      } else {
        this.selectionModel.select(this.selected);
      }
    } else {
      this._clearSelection();
    }

    if (setActiveToFirst) {
      this._setActive(this._getActiveIndex());
    }

    if (scrollSelectedToView) {
      this.scrollIndexToView = this.activeIndex;
    }

    this._setSelectAllCheckboxStatus();
  }

  private _clearSelection() {
    this.selectionModel.clear();
    this.lastSelectedIndex = -1;
    this.scrollIndexToView = 0;
  }

  private _getActiveIndex(): number {
    return this.selectionModel.isEmpty() ? 0 : this.options.findIndex((_, index) => this.isSelected(index));
  }

  private _setActive(index: number): void {
    this.activeIndex = index;
    this.onActiveIndexChange.emit({ activeIndex: this.activeIndex });
  }

  private _setSelected(index: number): void {
    const value = this.options[index];

    if (this.multiple) {
      const selected = this.selectionModel.selected;
      const existingIndex = selected.findIndex((item) => item.id === value.id);

      if (existingIndex !== -1) {
        this.selectionModel.deselect(selected[existingIndex]);
      } else {
        this.selectionModel.select(value);
      }
    } else {
      this.selectionModel.clear();
      this.selectionModel.select(value);
    }

    this.lastSelectedIndex = this.selectionModel.isEmpty() ? -1 : index;
  }

  private _setSelectAllCheckboxStatus(): void {
    // Commenting this code as allOptionsSelected is coming as false when all the options are selected initially
    //  const allOptionsSelected =
    //    this.options.length > 0 &&
    //    this.options.length === this.selectionModel.selected.length &&
    //    this.options.every((option) => this.selectionModel.isSelected(option));

    const allOptionsSelected =
      this.options.length > 0 &&
      (this.options.length === this.selectionModel.selected.length ||
        this.options.every((option) => this.selectionModel.isSelected(option)));

    const anyOptionsSelected = this.selectionModel.hasValue();

    this.selectedAll = allOptionsSelected;
    this.selectedSome = !allOptionsSelected && anyOptionsSelected;
  }

  private _selectOptions(options: VcSelectOption[]) {
    options.forEach((option) => this.selectionModel.select(option));
    this._emitSelectionChange();
  }

  private _navigateUpwards(): void {
    const activeIndex = (this.activeIndex - 1 + this.options.length) % this.options.length;
    this._setActive(activeIndex);
    this.scrollIndexToView = activeIndex;
  }

  private _navigateDownwards(): void {
    const activeIndex = (this.activeIndex = (this.activeIndex + 1) % this.options.length);
    this._setActive(activeIndex);
    this.scrollIndexToView = activeIndex;
  }

  private _emitSelectionChange(event?: Event): void {
    this.onSelectionChange.emit({
      selected: this.selectionModel.selected,
      originalEvent: event,
    });
  }

  isSelected(index: number): boolean {
    const target = this.options[index];
    return this.selectionModel.selected.findIndex((selectedItem) => selectedItem?.id === target?.id) !== -1;
  }

  getSelectedCount(): number {
    return this.selectionModel.selected.length;
  }

  trackByFn(index: number, item: any): any {
    return item ? item.id : index;
  }

  handleKeyDown(event: KeyboardEvent): void {
    event.preventDefault();

    if (event.code === 'Enter' || event.code === 'Space') {
      this.handleOptionSelect(event, this.activeIndex);
    } else if (event.code === 'ArrowUp') {
      this._navigateUpwards();
    } else if (event.code === 'ArrowDown') {
      this._navigateDownwards();
    }
  }

  handleSelectAllChange(event: VcCheckboxChangeEvent): void {
    if (event.checked !== undefined && event.indeterminate !== undefined) {
      if (event.checked) {
        this._selectOptions(this.options);
      } else {
        this._clearSelection();
        this._emitSelectionChange();
      }

      this.selectedAll = event.checked;
      this.selectedSome = event.indeterminate;

      this.onSelectAllCheckboxChange.emit(event);
    }
  }

  handleOptionSelect(event: any, index: number): void {
    if (this.options && index >= 0 && index < this.options.length && this.menuOpen) {
      const value = this.options[index];

      if (value?.['isAction']) {
        this.onSelectAction.emit({
          selected: value,
          originalEvent: event
        });
        return;
      }

      this._setSelected(index);
      this._setActive(index);

      this._setSelectAllCheckboxStatus();

      if (value) {
        this._emitSelectionChange(event);
      }
    }
  }
}
