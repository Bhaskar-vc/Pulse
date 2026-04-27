import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { VcPaginationChangeEvent } from './pagination.interface';
import { VcButton } from '@vantagecircle/vantage-ui/button';
import { CommonModule } from '@angular/common';
import { VcOption, VcSelect } from '@vantagecircle/vantage-ui/select';
import { FormsModule } from '@angular/forms';
import {
  VcSelectEvent,
  VcSelectOption,
} from '@vantagecircle/vantage-ui/select';
import { VcInputField } from '@vantagecircle/vantage-ui/input-field';

@Component({
    standalone: true,
    selector: 'vc-pagination',
    imports: [
        CommonModule,
        FormsModule,
        VcButton,
        VcSelect,
        VcOption,
        VcInputField,
    ],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class VcPagination implements OnChanges, OnInit {
  /**
   * Pagination count.
   * @group Props
   */
  @Input() count: number = 30;

  /**
   * Default page number.
   * @group Props
   */
  @Input() defaultPage: number = 1;

  /**
   * Current page number.
   * @group Props
   */
  @Input() currentPage: number = 1;

  /**
   * To specify whether to show the page size options or not.
   * @group Props
   */
  @Input() showPageSizeOptions: boolean = false;

  /**
   * Page size options.
   * @group Props
   */
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  /**
   * Page size.
   * @group Props
   */
  @Input() pageSize?: number;

  /**
   * To specify whether to show the Go to field or not.
   * @group Props
   */
  @Input() showGoTo: boolean = true;

  /**
   * Callback to invoke when page number changes.
   * @group Emits
   */
  @Output() onChange: EventEmitter<VcPaginationChangeEvent> =
    new EventEmitter<VcPaginationChangeEvent>();

  @Output() onPageSizeChange: EventEmitter<VcPaginationChangeEvent> =
    new EventEmitter<VcPaginationChangeEvent>();

  start!: number;
  end!: number;
  totalPages!: number;
  goToInput!: string;
  rowsPerPage!: number;
  selectedRowsPerPage!: VcSelectOption;

  constructor(private _cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    const pageSize = this.pageSize ?? this.pageSizeOptions[0];
    this.goToInput = '1';
    this.rowsPerPage = pageSize;
    this.selectedRowsPerPage = {
      id: pageSize.toString(),
      text: pageSize.toString(),
    };
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['count'] && !changes['count'].firstChange) {
      this.updatePagination();
    }
  }

  findStart(): number {
    const start =
      this.count > 0 ? (this.currentPage - 1) * this.rowsPerPage + 1 : 0;
    return start;
  }

  findEnd(): number {
    const end = this.currentPage * this.rowsPerPage;
    return Math.min(end, this.count);
  }

  updatePagination(): void {
    this.start = this.findStart();
    this.end = this.findEnd();
    this.totalPages = Math.ceil(this.count / this.rowsPerPage);
    const targetRow = (this.currentPage - 1) * this.rowsPerPage + 1;
    this.goToInput = targetRow.toString();
  }

  handleSelectPageSize(event: VcSelectEvent): void {
    this.selectedRowsPerPage = event.selected;
    this.rowsPerPage = Number(this.selectedRowsPerPage.text);
    this.goToInput = '1';
    this.currentPage = 1;
    this.updatePagination();
    this.onPageSizeChange.emit({
      newPage: this.currentPage,
      pageSize: this.rowsPerPage,
      originalEvent: event.originalEvent,
    });
  }

  handleGoToInputChange(input: string): void {
    const formattedInput = Number(input);

    // if (formattedInput > 0 && formattedInput <= this.count) {
    //   this.currentPage = Math.ceil(formattedInput / this.rowsPerPage);
    //   this.updatePagination();
    // }
  }

  handleInputKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.submitGoToInput(event);
    }
  }

  submitGoToInput(event: KeyboardEvent): void {
    const formattedInput = Number((event.target as HTMLInputElement).value);

    if (formattedInput > 0 && formattedInput <= this.count) {
      this.currentPage = Math.ceil(formattedInput / this.rowsPerPage);
      this.updatePagination();
      this.onChange.emit({
        newPage: this.currentPage,
        originalEvent: event,
      });
    } else {
      this.goToInput = this.start.toString();
    }
  }

  handlePrev(event: Event): void {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.goToInput = this.findStart().toString();
      this.updatePagination();
      this.onChange.emit({
        newPage: this.currentPage,
        originalEvent: event,
      });
    }
  }

  handleNext(event: Event): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.goToInput = this.findStart().toString();
      this.updatePagination();
      this.onChange.emit({
        newPage: this.currentPage,
        originalEvent: event,
      });
    }
  }
}
