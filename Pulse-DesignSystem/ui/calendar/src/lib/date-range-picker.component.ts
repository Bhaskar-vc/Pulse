import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface DRPCell {
  day: number;
  date: Date;
  isOut: boolean;
  isToday: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isPreviewStart: boolean;
  isPreviewEnd: boolean;
  isPreviewRange: boolean;
}

interface Preset {
  label: string;
  getRange: () => { start: Date; end: Date };
}

@Component({
  standalone: true,
  selector: 'v-date-range-picker',
  imports: [CommonModule],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VDateRangePicker implements OnInit, OnChanges {
  /** Range start date */
  @Input() rangeStart: Date | null = null;
  /** Range end date */
  @Input() rangeEnd: Date | null = null;
  /** Initially active preset label */
  @Input() activePreset: string | null = null;

  /** Emitted when both range dates are selected */
  @Output() rangeSelected = new EventEmitter<{ start: Date; end: Date }>();
  /** Emitted on Cancel click */
  @Output() cancelled = new EventEmitter<void>();
  /** Emitted on Apply click */
  @Output() applied = new EventEmitter<{ start: Date | null; end: Date | null }>();

  leftYear  = new Date().getFullYear();
  leftMonth = new Date().getMonth();

  leftLabel  = '';
  rightLabel = '';
  leftCells:  DRPCell[] = [];
  rightCells: DRPCell[] = [];

  hoveredDate: Date | null = null;

  private today = new Date();
  private cdr   = inject(ChangeDetectorRef);

  readonly DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  private readonly MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  readonly presets: Preset[] = [
    {
      label: 'Today',
      getRange: () => { const d = this.strip(new Date()); return { start: d, end: d }; },
    },
    {
      label: 'Yesterday',
      getRange: () => {
        const d = new Date(); d.setDate(d.getDate() - 1);
        return { start: this.strip(d), end: this.strip(d) };
      },
    },
    { label: 'This week',  getRange: () => this.weekRange(0)  },
    { label: 'Last week',  getRange: () => this.weekRange(-1) },
    { label: 'This month', getRange: () => this.monthRange(0)  },
    { label: 'Last month', getRange: () => this.monthRange(-1) },
    { label: 'This year',  getRange: () => this.yearRange(0)  },
    { label: 'Last year',  getRange: () => this.yearRange(-1) },
    {
      label: 'All time',
      getRange: () => ({ start: new Date(2000, 0, 1), end: this.strip(new Date()) }),
    },
  ];

  get rightYear():  number { return this.leftMonth === 11 ? this.leftYear + 1 : this.leftYear; }
  get rightMonth(): number { return this.leftMonth === 11 ? 0 : this.leftMonth + 1; }

  ngOnInit(): void {
    if (this.rangeStart) {
      this.leftYear  = this.rangeStart.getFullYear();
      this.leftMonth = this.rangeStart.getMonth();
    }
    this.build();
  }

  ngOnChanges(): void {
    this.build();
  }

  prevMonth(): void {
    if (this.leftMonth === 0) { this.leftMonth = 11; this.leftYear--; }
    else this.leftMonth--;
    this.build();
  }

  nextMonth(): void {
    if (this.leftMonth === 11) { this.leftMonth = 0; this.leftYear++; }
    else this.leftMonth++;
    this.build();
  }

  onCellClick(cell: DRPCell): void {
    if (cell.isOut) return;
    const d = cell.date;

    if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
      // Start fresh selection
      this.rangeStart   = d;
      this.rangeEnd     = null;
      this.activePreset = null;
    } else {
      // Complete the range
      if (d < this.rangeStart) {
        this.rangeEnd   = this.rangeStart;
        this.rangeStart = d;
      } else {
        this.rangeEnd = d;
      }
      if (this.rangeStart && this.rangeEnd) {
        this.rangeSelected.emit({ start: this.rangeStart, end: this.rangeEnd });
      }
    }
    this.hoveredDate = null;
    this.build();
    this.cdr.markForCheck();
  }

  onCellHover(cell: DRPCell): void {
    if (cell.isOut) return;
    this.hoveredDate = cell.date;
    this.build();
    this.cdr.markForCheck();
  }

  onGridLeave(): void {
    this.hoveredDate = null;
    this.build();
    this.cdr.markForCheck();
  }

  selectPreset(preset: Preset): void {
    this.activePreset = preset.label;
    const { start, end } = preset.getRange();
    this.rangeStart  = start;
    this.rangeEnd    = end;
    this.leftYear    = start.getFullYear();
    this.leftMonth   = start.getMonth();
    this.rangeSelected.emit({ start, end });
    this.build();
    this.cdr.markForCheck();
  }

  formatDate(d: Date | null): string {
    if (!d) return '';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  cancel(): void { this.cancelled.emit(); }

  apply(): void {
    this.applied.emit({ start: this.rangeStart, end: this.rangeEnd });
  }

  // ── Build grid cells ─────────────────────────────────────────────

  private build(): void {
    this.leftLabel  = `${this.MONTHS[this.leftMonth]} ${this.leftYear}`;
    this.rightLabel = `${this.MONTHS[this.rightMonth]} ${this.rightYear}`;
    this.leftCells  = this.buildCells(this.leftYear, this.leftMonth);
    this.rightCells = this.buildCells(this.rightYear, this.rightMonth);
  }

  private buildCells(year: number, month: number): DRPCell[] {
    // Monday-first calendar
    const firstDay       = new Date(year, month, 1).getDay();        // 0=Sun … 6=Sat
    const offset         = (firstDay + 6) % 7;                       // 0=Mo … 6=Su
    const daysInMonth    = new Date(year, month + 1, 0).getDate();
    const prevMonthDays  = new Date(year, month, 0).getDate();

    const cells: DRPCell[] = [];

    // Leading cells from previous month
    for (let i = offset - 1; i >= 0; i--) {
      cells.push(this.makeCell(new Date(year, month - 1, prevMonthDays - i), true));
    }
    // Current month cells
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(this.makeCell(new Date(year, month, d), false));
    }
    // Trailing cells (fill to 42)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push(this.makeCell(new Date(year, month + 1, d), true));
    }
    return cells;
  }

  private makeCell(date: Date, isOut: boolean): DRPCell {
    const rs = this.rangeStart;
    const re = this.rangeEnd;
    const hv = this.hoveredDate;

    const isRangeStart = !!rs && this.same(date, rs);
    const isRangeEnd   = !!re && this.same(date, re);
    const isInRange    = !!rs && !!re && date > rs && date < re;

    // Hover preview (while first point selected, second not yet)
    let isPreviewStart = false;
    let isPreviewEnd   = false;
    let isPreviewRange = false;

    if (rs && !re && hv) {
      const [lo, hi] = hv >= rs ? [rs, hv] : [hv, rs];
      if (this.same(date, lo))       isPreviewStart = true;
      else if (this.same(date, hi))  isPreviewEnd   = true;
      else if (date > lo && date < hi) isPreviewRange = true;
    }

    return {
      day: date.getDate(),
      date,
      isOut,
      isToday: this.same(date, this.today),
      isRangeStart,
      isRangeEnd,
      isInRange,
      isPreviewStart,
      isPreviewEnd,
      isPreviewRange,
    };
  }

  private same(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth()    === b.getMonth()    &&
      a.getDate()     === b.getDate();
  }

  private strip(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  // ── Preset range helpers ─────────────────────────────────────────

  private weekRange(offsetWeeks: number): { start: Date; end: Date } {
    const now     = new Date();
    const dayOfWk = now.getDay();                       // 0=Sun … 6=Sat
    const moOff   = (dayOfWk + 6) % 7;                 // Mon=0
    const mon     = new Date(now);
    mon.setDate(now.getDate() - moOff + offsetWeeks * 7);
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    return { start: this.strip(mon), end: this.strip(sun) };
  }

  private monthRange(offsetMonths: number): { start: Date; end: Date } {
    const now = new Date();
    const m   = now.getMonth() + offsetMonths;
    const y   = now.getFullYear();
    return { start: new Date(y, m, 1), end: new Date(y, m + 1, 0) };
  }

  private yearRange(offsetYears: number): { start: Date; end: Date } {
    const y = new Date().getFullYear() + offsetYears;
    return { start: new Date(y, 0, 1), end: new Date(y, 11, 31) };
  }
}
