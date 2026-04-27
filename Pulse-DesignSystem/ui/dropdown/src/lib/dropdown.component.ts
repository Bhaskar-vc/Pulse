import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  forwardRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DropdownItem } from './dropdown.types';

@Component({
  standalone: true,
  selector: 'v-dropdown',
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => VDropdown), multi: true },
  ],
})
export class VDropdown implements ControlValueAccessor, OnChanges {
  /** Available options */
  @Input() items: DropdownItem[] = [];

  /** Selected value */
  @Input() value = '';

  /** Placeholder shown when nothing is selected */
  @Input() placeholder = 'Select an option';

  /** Optional field label */
  @Input() label = '';

  /** Optional hint text */
  @Input() hint = '';

  /** Error state */
  @Input() hasError = false;

  /** Error message */
  @Input() errorMessage = '';

  /** Disabled state */
  @Input() disabled = false;

  /** Show search box in menu */
  @Input() searchable = false;

  /** Multi-select mode */
  @Input() multi = false;

  /** Selected values for multi-select */
  @Input() selectedValues: string[] = [];

  /** Hint shown in multi-select header */
  @Input() multiHint = '';

  /** Emitted when selection changes */
  @Output() valueChange = new EventEmitter<string>();
  @Output() itemSelected = new EventEmitter<DropdownItem>();
  @Output() selectedValuesChange = new EventEmitter<string[]>();

  isOpen = false;
  selectedLabel = '';
  searchQuery = '';
  filteredItems: DropdownItem[] = [];

  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnChanges(): void {
    this.filteredItems = [...this.items];
    this.updateLabel();
  }

  toggle(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchQuery = '';
      this.filteredItems = [...this.items];
    }
    this.cdr.markForCheck();
  }

  close(): void {
    this.isOpen = false;
    this.cdr.markForCheck();
  }

  select(item: DropdownItem): void {
    if (this.multi) {
      this.toggleMulti(item);
      return;
    }
    this.value = item.value;
    this.updateLabel();
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
    this.itemSelected.emit(item);
    this.close();
  }

  filterItems(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredItems = q
      ? this.items.filter(i => i.label.toLowerCase().includes(q))
      : [...this.items];
    this.cdr.markForCheck();
  }

  isFirstInGroup(item: DropdownItem): boolean {
    const idx = this.filteredItems.indexOf(item);
    if (idx === 0) return true;
    return this.filteredItems[idx - 1]?.group !== item.group;
  }

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  toggleMulti(item: DropdownItem): void {
    const idx = this.selectedValues.indexOf(item.value);
    const updated = idx === -1
      ? [...this.selectedValues, item.value]
      : this.selectedValues.filter(v => v !== item.value);
    this.selectedValues = updated;
    this.selectedValuesChange.emit(this.selectedValues);
    this.cdr.markForCheck();
  }

  isMultiSelected(item: DropdownItem): boolean {
    return this.selectedValues.includes(item.value);
  }

  toggleAll(): void {
    if (this.allSelected) {
      this.selectedValues = [];
    } else {
      this.selectedValues = this.filteredItems
        .filter(i => !i.disabled)
        .map(i => i.value);
    }
    this.selectedValuesChange.emit(this.selectedValues);
    this.cdr.markForCheck();
  }

  removeTag(value: string): void {
    this.selectedValues = this.selectedValues.filter(v => v !== value);
    this.selectedValuesChange.emit(this.selectedValues);
    this.cdr.markForCheck();
  }

  getLabelForValue(value: string): string {
    return this.items.find(i => i.value === value)?.label ?? value;
  }

  get allSelected(): boolean {
    const enabledItems = this.filteredItems.filter(i => !i.disabled);
    return enabledItems.length > 0 && enabledItems.every(i => this.selectedValues.includes(i.value));
  }

  get visibleTags(): string[] {
    return this.selectedValues.slice(0, 2);
  }

  get extraTagCount(): number {
    return Math.max(0, this.selectedValues.length - 2);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.close(); }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const el = e.target as HTMLElement;
    if (!el.closest('v-dropdown')) this.close();
  }

  writeValue(val: string): void {
    this.value = val ?? '';
    this.updateLabel();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  private updateLabel(): void {
    this.selectedLabel = this.items.find(i => i.value === this.value)?.label ?? '';
  }
}
