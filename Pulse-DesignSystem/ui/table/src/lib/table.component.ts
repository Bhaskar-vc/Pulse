import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn, TableVariant, SortEvent } from './table.types';
import { VcCheckbox, VcCheckboxChangeEvent } from '@pulse-ds/ui/checkbox';

@Component({
  standalone: true,
  selector: 'v-table',
  imports: [CommonModule, VcCheckbox],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VTable implements OnChanges {
  /** Column definitions */
  @Input() columns: TableColumn[] = [];

  /** Row data */
  @Input() rows: Record<string, unknown>[] = [];

  /** Visual variant */
  @Input() variant: TableVariant = 'default';

  /** Show checkbox column */
  @Input() selectable = false;

  /** Accessible table label */
  @Input() ariaLabel = 'Data table';

  /** Emitted when a sortable column header is clicked */
  @Output() sortChange = new EventEmitter<SortEvent>();

  /** Emitted when a row is clicked */
  @Output() rowClick = new EventEmitter<Record<string, unknown>>();

  /** Emitted when selection changes */
  @Output() selectionChange = new EventEmitter<Record<string, unknown>[]>();

  tableClass = '';
  sortColumn = '';
  sortDir: 'asc' | 'desc' = 'asc';
  selectedRows = new Set<Record<string, unknown>>();

  get allSelected(): boolean {
    return this.rows.length > 0 && this.selectedRows.size === this.rows.length;
  }

  get someSelected(): boolean {
    return this.selectedRows.size > 0;
  }

  ngOnChanges(): void {
    const parts = ['data-table'];
    if (this.variant !== 'default') parts.push(this.variant);
    this.tableClass = parts.join(' ');
  }

  onSort(key: string): void {
    if (this.sortColumn === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = key;
      this.sortDir = 'asc';
    }
    this.sortChange.emit({ column: key, direction: this.sortDir });
  }

  onRowClick(row: Record<string, unknown>): void {
    this.rowClick.emit(row);
  }

  toggleRow(event: VcCheckboxChangeEvent, row: Record<string, unknown>): void {
    if (event.checked) {
      this.selectedRows.add(row);
    } else {
      this.selectedRows.delete(row);
    }
    this.selectionChange.emit([...this.selectedRows]);
  }

  toggleAll(event: VcCheckboxChangeEvent): void {
    if (event.checked) {
      this.rows.forEach(r => this.selectedRows.add(r));
    } else {
      this.selectedRows.clear();
    }
    this.selectionChange.emit([...this.selectedRows]);
  }

  trackRow(index: number, row: Record<string, unknown>): unknown {
    return row['id'] ?? index;
  }
}
