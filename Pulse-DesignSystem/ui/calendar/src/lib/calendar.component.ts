import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  forwardRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface CalCell {
  key: string;
  day: number;
  date: Date;
  isOut: boolean;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isDisabled: boolean;
  ariaLabel: string;
}

@Component({
  standalone: true,
  selector: 'v-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => VCalendar), multi: true },
  ],
})
export class VCalendar implements ControlValueAccessor, OnChanges, OnInit {
  /** Selected date (single mode) */
  @Input() value: Date | null = null;

  /** Range start (range mode) */
  @Input() rangeStart: Date | null = null;

  /** Range end (range mode) */
  @Input() rangeEnd: Date | null = null;

  /** Enable date range selection */
  @Input() rangeMode = false;

  /** Minimum selectable date */
  @Input() minDate: Date | null = null;

  /** Maximum selectable date */
  @Input() maxDate: Date | null = null;

  /** Show Cancel / Apply footer buttons */
  @Input() showFooter = false;

  /** Emitted when a date is selected */
  @Output() dateSelected = new EventEmitter<Date>();

  /** Emitted when a range is completed */
  @Output() rangeSelected = new EventEmitter<{ start: Date; end: Date }>();

  /** Emitted when Cancel is clicked */
  @Output() cancelled = new EventEmitter<void>();

  /** Emitted when Apply is clicked */
  @Output() applied = new EventEmitter<{ start?: Date | null; end?: Date | null; date?: Date | null }>();

  readonly dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  viewYear = new Date().getFullYear();
  viewMonth = new Date().getMonth();
  monthLabel = '';
  cells: CalCell[] = [];

  isPrevDisabled = false;
  isNextDisabled = false;

  private readonly MONTHS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];

  private today = new Date();
  private onChange: (v: Date | null) => void = () => {};
  private onTouched: () => void = () => {};
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    if (this.value) {
      this.viewYear = this.value.getFullYear();
      this.viewMonth = this.value.getMonth();
    } else if (this.rangeStart) {
      this.viewYear = this.rangeStart.getFullYear();
      this.viewMonth = this.rangeStart.getMonth();
    }
    this.build();
  }

  ngOnChanges(): void {
    this.build();
  }

  prevMonth(): void {
    if (this.viewMonth === 0) { this.viewMonth = 11; this.viewYear--; }
    else this.viewMonth--;
    this.build();
  }

  nextMonth(): void {
    if (this.viewMonth === 11) { this.viewMonth = 0; this.viewYear++; }
    else this.viewMonth++;
    this.build();
  }

  selectDate(cell: CalCell): void {
    const date = cell.date;
    if (this.rangeMode) {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        this.rangeStart = date;
        this.rangeEnd = null;
      } else {
        if (date < this.rangeStart) {
          this.rangeEnd = this.rangeStart;
          this.rangeStart = date;
        } else {
          this.rangeEnd = date;
        }
        if (this.rangeStart && this.rangeEnd) {
          this.rangeSelected.emit({ start: this.rangeStart, end: this.rangeEnd });
        }
      }
    } else {
      this.value = date;
      this.onChange(date);
      this.onTouched();
      this.dateSelected.emit(date);
    }
    this.build();
    this.cdr.markForCheck();
  }

  cancel(): void { this.cancelled.emit(); }

  apply(): void {
    this.applied.emit(this.rangeMode
      ? { start: this.rangeStart, end: this.rangeEnd }
      : { date: this.value });
  }

  writeValue(val: Date | null): void {
    this.value = val;
    if (val) { this.viewYear = val.getFullYear(); this.viewMonth = val.getMonth(); }
    this.build();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (v: Date | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  private build(): void {
    this.monthLabel = `${this.MONTHS[this.viewMonth]} ${this.viewYear}`;

    const firstDay = new Date(this.viewYear, this.viewMonth, 1).getDay();
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const prevMonthDays = new Date(this.viewYear, this.viewMonth, 0).getDate();

    const cells: CalCell[] = [];

    // Leading cells from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = new Date(this.viewYear, this.viewMonth - 1, prevMonthDays - i);
      cells.push(this.makeCell(d, true));
    }

    // Current month cells
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(this.makeCell(new Date(this.viewYear, this.viewMonth, d), false));
    }

    // Trailing cells
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push(this.makeCell(new Date(this.viewYear, this.viewMonth + 1, d), true));
    }

    this.cells = cells;

    this.isPrevDisabled = this.minDate
      ? new Date(this.viewYear, this.viewMonth - 1, 1) < new Date(this.minDate.getFullYear(), this.minDate.getMonth(), 1)
      : false;
    this.isNextDisabled = this.maxDate
      ? new Date(this.viewYear, this.viewMonth + 1, 1) > new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), 1)
      : false;
  }

  private makeCell(date: Date, isOut: boolean): CalCell {
    const isToday = this.sameDay(date, this.today);
    const isSelected = !this.rangeMode && !!this.value && this.sameDay(date, this.value);
    const isRangeStart = this.rangeMode && !!this.rangeStart && this.sameDay(date, this.rangeStart);
    const isRangeEnd = this.rangeMode && !!this.rangeEnd && this.sameDay(date, this.rangeEnd);
    const isInRange = this.rangeMode && !!this.rangeStart && !!this.rangeEnd &&
      date > this.rangeStart && date < this.rangeEnd;
    const isDisabled = (!!this.minDate && date < this.stripTime(this.minDate)) ||
      (!!this.maxDate && date > this.stripTime(this.maxDate));

    return {
      key: date.toISOString().slice(0, 10),
      day: date.getDate(),
      date,
      isOut,
      isToday,
      isSelected,
      isRangeStart,
      isRangeEnd,
      isInRange,
      isDisabled,
      ariaLabel: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    };
  }

  private sameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }

  private stripTime(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
}
