import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PageChangeEvent {
  page:     number;
  pageSize: number;
}

@Component({
  selector: 'ds-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ds-pagination">

      <!-- Rows per page -->
      <div class="ds-pagination__rows">
        <span class="ds-pagination__label">Rows per Page:</span>
        <div class="ds-pagination__select-wrap">
          <select class="ds-pagination__select"
                  [(ngModel)]="pageSize"
                  (ngModelChange)="onPageSizeChange($event)"
                  [attr.aria-label]="'Rows per page'">
            <option *ngFor="let opt of pageSizeOptions" [value]="opt">{{ opt }}</option>
          </select>
          <!-- Down chevron -->
          <svg class="ds-pagination__chevron" viewBox="0 0 16 16" fill="none"
               aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- Divider -->
      <span class="ds-pagination__divider"></span>

      <!-- Go-to page -->
      <div class="ds-pagination__goto">
        <span class="ds-pagination__label">Go to</span>
        <input class="ds-pagination__goto-input"
               type="number" min="1" [max]="totalPages"
               [(ngModel)]="goToPage"
               (keydown.enter)="jumpToPage()"
               [attr.aria-label]="'Go to page'" />
      </div>

      <!-- Divider -->
      <span class="ds-pagination__divider"></span>

      <!-- Nav buttons + range -->
      <div class="ds-pagination__nav">
        <button class="ds-pagination__arrow"
                [disabled]="currentPage <= 1"
                type="button" aria-label="Previous page"
                (click)="prev()">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <span class="ds-pagination__range">
          {{ rangeStart }}&thinsp;–&thinsp;{{ rangeEnd }}
          &nbsp;of&nbsp;
          <strong>{{ totalItems }}</strong>
        </span>

        <button class="ds-pagination__arrow"
                [disabled]="currentPage >= totalPages"
                type="button" aria-label="Next page"
                (click)="next()">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems   = 35;
  @Input() currentPage  = 1;
  @Input() pageSize     = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];

  @Output() pageChange = new EventEmitter<PageChangeEvent>();

  goToPage = 1;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }
  get rangeStart(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  get rangeEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage']) {
      this.goToPage = this.currentPage;
    }
  }

  prev(): void {
    if (this.currentPage > 1) this.emit(this.currentPage - 1);
  }

  next(): void {
    if (this.currentPage < this.totalPages) this.emit(this.currentPage + 1);
  }

  jumpToPage(): void {
    const p = Math.min(Math.max(1, Number(this.goToPage)), this.totalPages);
    if (!isNaN(p)) this.emit(p);
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.emit(1);
  }

  private emit(page: number): void {
    this.currentPage = page;
    this.goToPage    = page;
    this.pageChange.emit({ page, pageSize: this.pageSize });
  }
}
