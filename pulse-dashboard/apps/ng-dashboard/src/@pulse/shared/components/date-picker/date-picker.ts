import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
} from '@angular/core';

export interface DateRange {
  label: string;
  start: Date;
  end: Date;
  display: string;
}

export interface CalCell {
  date: Date;
  day: number;
  isOut: boolean;
  isToday: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];

@Component({
  standalone: false,
  selector: 'ds-date-picker',
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
})
export class DatePickerComponent implements OnInit {
  @Input() initialPreset = 'this-month';
  @Output() rangeApplied = new EventEmitter<DateRange>();

  readonly MONTHS = MONTHS;
  readonly DAYS = DAYS;

  isOpen = false;

  presets = [
    { label: 'Today',      key: 'today' },
    { label: 'Yesterday',  key: 'yesterday' },
    { label: 'This week',  key: 'this-week' },
    { label: 'Last week',  key: 'last-week' },
    { label: 'This month', key: 'this-month' },
    { label: 'Last month', key: 'last-month' },
    { label: 'This year',  key: 'this-year' },
    { label: 'Last year',  key: 'last-year' },
    { label: 'All time',   key: 'all-time' },
  ];

  activePreset: string | null = null;
  viewYear = 0;
  viewMonth = 0;

  rangeStart: Date | null = null;
  rangeEnd: Date | null = null;

  // Committed values shown in the trigger button
  appliedLabel = '';
  appliedDisplay = '';
  private appliedStart: Date | null = null;
  private appliedEnd: Date | null = null;
  private appliedPresetKey: string | null = null;

  leftCells: CalCell[] = [];
  rightCells: CalCell[] = [];
  leftLabel = '';
  rightLabel = '';
  startInput = '';
  endInput = '';

  ngOnInit() {
    const d = this.today();
    this.viewYear = d.getFullYear();
    this.viewMonth = d.getMonth();
    this.applyPreset(this.initialPreset, false);
    this.commit();
  }

  toggle(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.resetToApplied();
  }

  @HostListener('document:click')
  onDocClick() {
    if (this.isOpen) this.isOpen = false;
  }

  stopProp(event: MouseEvent) {
    event.stopPropagation();
  }

  navMonth(dir: number) {
    this.viewMonth += dir;
    if (this.viewMonth > 11) { this.viewMonth = 0; this.viewYear++; }
    if (this.viewMonth < 0)  { this.viewMonth = 11; this.viewYear--; }
    this.render();
  }

  onPresetClick(key: string) {
    this.applyPreset(key, true);
  }

  onCellClick(cell: CalCell) {
    if (cell.isOut) return;
    this.activePreset = null;

    if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
      this.rangeStart = this.clone(cell.date);
      this.rangeEnd = null;
    } else {
      if (cell.date < this.rangeStart) {
        this.rangeEnd = this.clone(this.rangeStart);
        this.rangeStart = this.clone(cell.date);
      } else {
        this.rangeEnd = this.clone(cell.date);
      }
    }
    this.render();
  }

  apply() {
    if (!this.rangeStart || !this.rangeEnd) return;
    this.commit();
    this.rangeApplied.emit({
      label: this.appliedLabel,
      start: this.appliedStart!,
      end: this.appliedEnd!,
      display: this.appliedDisplay,
    });
    this.isOpen = false;
  }

  cancel() {
    this.isOpen = false;
  }

  private applyPreset(key: string, render = true) {
    this.activePreset = key;
    const d = this.today();
    const dow = (d.getDay() + 6) % 7; // Mon = 0

    switch (key) {
      case 'today':
        this.rangeStart = this.clone(d);
        this.rangeEnd   = this.clone(d);
        break;
      case 'yesterday': {
        const y = this.clone(d); y.setDate(d.getDate() - 1);
        this.rangeStart = y; this.rangeEnd = this.clone(y);
        break;
      }
      case 'this-week': {
        const s = this.clone(d); s.setDate(d.getDate() - dow);
        this.rangeStart = s; this.rangeEnd = this.clone(d);
        break;
      }
      case 'last-week': {
        const s = this.clone(d); s.setDate(d.getDate() - dow - 7);
        const e = this.clone(d); e.setDate(d.getDate() - dow - 1);
        this.rangeStart = s; this.rangeEnd = e;
        break;
      }
      case 'this-month':
        this.rangeStart = new Date(d.getFullYear(), d.getMonth(), 1);
        this.rangeEnd   = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        break;
      case 'last-month':
        this.rangeStart = new Date(d.getFullYear(), d.getMonth() - 1, 1);
        this.rangeEnd   = new Date(d.getFullYear(), d.getMonth(), 0);
        break;
      case 'this-year':
        this.rangeStart = new Date(d.getFullYear(), 0, 1);
        this.rangeEnd   = new Date(d.getFullYear(), 11, 31);
        break;
      case 'last-year':
        this.rangeStart = new Date(d.getFullYear() - 1, 0, 1);
        this.rangeEnd   = new Date(d.getFullYear() - 1, 11, 31);
        break;
      case 'all-time':
        this.rangeStart = new Date(2000, 0, 1);
        this.rangeEnd   = this.clone(d);
        break;
    }

    if (this.rangeStart) {
      this.viewYear  = this.rangeStart.getFullYear();
      this.viewMonth = this.rangeStart.getMonth();
    }
    if (render) this.render();
  }

  private resetToApplied() {
    this.rangeStart    = this.appliedStart ? this.clone(this.appliedStart) : null;
    this.rangeEnd      = this.appliedEnd   ? this.clone(this.appliedEnd)   : null;
    this.activePreset  = this.appliedPresetKey;
    if (this.rangeStart) {
      this.viewYear  = this.rangeStart.getFullYear();
      this.viewMonth = this.rangeStart.getMonth();
    }
    this.render();
  }

  private commit() {
    this.appliedStart      = this.rangeStart;
    this.appliedEnd        = this.rangeEnd;
    this.appliedPresetKey  = this.activePreset;
    const preset           = this.presets.find(p => p.key === this.activePreset);
    this.appliedDisplay    = this.buildDisplay(this.rangeStart, this.rangeEnd);
    this.appliedLabel      = preset ? preset.label : this.appliedDisplay;
  }

  private buildDisplay(start: Date | null, end: Date | null): string {
    if (!start) return '';
    if (!end || this.dateKey(start) === this.dateKey(end)) return this.fmt(start);
    return `${this.fmt(start)} – ${this.fmt(end)}`;
  }

  private render() {
    const rM = this.viewMonth === 11 ? 0  : this.viewMonth + 1;
    const rY = this.viewMonth === 11 ? this.viewYear + 1 : this.viewYear;

    this.leftLabel  = `${MONTHS[this.viewMonth]} ${this.viewYear}`;
    this.rightLabel = `${MONTHS[rM]} ${rY}`;

    this.leftCells  = this.buildGrid(this.viewYear, this.viewMonth);
    this.rightCells = this.buildGrid(rY, rM);

    this.startInput = this.fmt(this.rangeStart);
    this.endInput   = this.fmt(this.rangeEnd);
  }

  private buildGrid(year: number, month: number): CalCell[] {
    const todayKey  = this.dateKey(this.today());
    const startKey  = this.dateKey(this.rangeStart);
    const endKey    = this.dateKey(this.rangeEnd);

    const first     = new Date(year, month, 1);
    let   startDow  = first.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1; // Mon = 0

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev  = new Date(year, month, 0).getDate();
    const cells: CalCell[] = [];

    // Prev-month padding
    for (let i = startDow - 1; i >= 0; i--) {
      cells.push(this.makeCell(new Date(year, month - 1, daysInPrev - i), true, todayKey, startKey, endKey));
    }
    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(this.makeCell(new Date(year, month, day), false, todayKey, startKey, endKey));
    }
    // Next-month padding
    const total = startDow + daysInMonth;
    const rem   = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let day = 1; day <= rem; day++) {
      cells.push(this.makeCell(new Date(year, month + 1, day), true, todayKey, startKey, endKey));
    }
    return cells;
  }

  private makeCell(
    date: Date, isOut: boolean,
    todayKey: string, startKey: string, endKey: string,
  ): CalCell {
    const key = this.dateKey(date);
    return {
      date,
      day: date.getDate(),
      isOut,
      isToday:      key === todayKey,
      isRangeStart: !!startKey && key === startKey,
      isRangeEnd:   !!endKey   && key === endKey,
      isInRange:    !!startKey && !!endKey &&
                    !!this.rangeStart && !!this.rangeEnd &&
                    date > this.rangeStart && date < this.rangeEnd,
    };
  }

  private today(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private clone(d: Date): Date {
    return new Date(d.getTime());
  }

  private dateKey(d: Date | null): string {
    return d ? `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` : '';
  }

  private fmt(d: Date | null): string {
    if (!d) return '';
    return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
  }
}
