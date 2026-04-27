import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'v-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VPagination implements OnChanges {
  /** Total number of items */
  @Input() total = 0;

  /** Current page (1-based) */
  @Input() page = 1;

  /** Items per page */
  @Input() pageSize = 10;

  /** Maximum page buttons to show (excluding prev/next arrows) */
  @Input() maxVisible = 7;

  /** Emitted when the user navigates to a different page */
  @Output() pageChange = new EventEmitter<number>();

  totalPages = 0;
  visiblePages: number[] = [];

  ngOnChanges(): void {
    this.totalPages = Math.max(1, Math.ceil(this.total / this.pageSize));
    this.visiblePages = this.buildPages();
  }

  go(p: number): void {
    if (p < 1 || p > this.totalPages || p === this.page) return;
    this.pageChange.emit(p);
  }

  private buildPages(): number[] {
    const total = this.totalPages;
    const current = this.page;
    const max = this.maxVisible;

    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor((max - 2) / 2);
    const pages: number[] = [];

    pages.push(1);

    let start = Math.max(2, current - half);
    let end = Math.min(total - 1, current + half);

    if (current - half <= 2) {
      end = Math.min(total - 1, max - 2);
    }
    if (current + half >= total - 1) {
      start = Math.max(2, total - max + 2);
    }

    if (start > 2) pages.push(0); // ellipsis

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < total - 1) pages.push(0); // ellipsis

    pages.push(total);
    return pages;
  }
}
