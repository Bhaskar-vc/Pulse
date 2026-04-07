import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-configure',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './configure.html',
  styleUrl: './configure.scss',
})
export class ConfigureComponent {
  @ViewChild('emailBody') emailBodyRef!: ElementRef<HTMLDivElement>;

  // Scheduling
  activeDuration = '1m';
  startDate = '2025-12-01';
  endDate = '2025-12-31';
  surveyTime = '12:00';
  durationDays = '30 days';
  durationRange = 'Dec 1 – Dec 31, 2025';
  endDateDisabled = true;

  // Frequency
  activeFrequency = 'weekly';
  recurringEnabled = true;
  frequencyOptions = [
    { key: 'once', label: 'Once' },
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'biweekly', label: 'Bi-weekly' },
    { key: 'monthly', label: 'Monthly' },
  ];
  disabledFrequencies: string[] = ['monthly'];

  // Audience
  activeAudience = 'segments';
  csvFileName = '';
  csvFileUploaded = false;
  csvDragOver = false;

  // Email
  emailSubject = "You're invited to participate in our Employee Pulse Survey";
  subjectCount = 58;
  subjectCountOver = false;

  // Skeleton
  skeletonVisible = false;
  contentVisible = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateDuration();
  }

  // ── DURATION ──────────────────────────────────────────────

  setDuration(val: string): void {
    if (this.activeDuration === val) return;
    this.activeDuration = val;
    this.endDateDisabled = true;

    if (this.startDate) {
      const start = new Date(this.startDate);
      const end = new Date(start);
      if (val === '1m') end.setMonth(end.getMonth() + 1);
      else if (val === '3m') end.setMonth(end.getMonth() + 3);
      else if (val === '1y') end.setFullYear(end.getFullYear() + 1);
      const pad = (n: number) => String(n).padStart(2, '0');
      this.endDate = end.getFullYear() + '-' + pad(end.getMonth() + 1) + '-' + pad(end.getDate());
      this.updateDuration();
    }

    // Update disabled frequencies
    this.disabledFrequencies = [];
    if (val === '1m') {
      this.disabledFrequencies = ['monthly'];
      if (this.activeFrequency === 'monthly') this.activeFrequency = 'weekly';
    } else if (val === 'all') {
      this.disabledFrequencies = ['daily', 'weekly', 'biweekly', 'monthly'];
      this.activeFrequency = 'once';
    }
  }

  onStartChange(): void {
    if (this.activeDuration) {
      this.setDuration(this.activeDuration);
    } else {
      this.updateDuration();
    }
  }

  onEndChange(): void {
    this.updateDuration();
  }

  updateDuration(): void {
    if (!this.startDate || !this.endDate) return;
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    if (end < start) return;
    const days = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    this.durationDays = days + ' day' + (days !== 1 ? 's' : '');
    this.durationRange = fmt(start) + ' – ' + fmt(end) + ', ' + end.getFullYear();
  }

  // ── FREQUENCY ─────────────────────────────────────────────

  setFrequency(key: string): void {
    if (this.disabledFrequencies.includes(key)) return;
    this.activeFrequency = key;
  }

  isFrequencyDisabled(key: string): boolean {
    return this.disabledFrequencies.includes(key);
  }

  toggleRecurring(): void {
    this.recurringEnabled = !this.recurringEnabled;
  }

  // ── AUDIENCE ──────────────────────────────────────────────

  setAudience(type: string): void {
    this.activeAudience = type;
  }

  onCsvFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleCsvFile(input.files[0]);
    }
  }

  handleCsvFile(file: File): void {
    const size = file.size > 1024 ? Math.round(file.size / 1024) + ' KB' : file.size + ' B';
    this.csvFileName = file.name + ' (' + size + ')';
    this.csvFileUploaded = true;
  }

  onCsvDragOver(event: DragEvent): void {
    event.preventDefault();
    this.csvDragOver = true;
  }

  onCsvDragLeave(): void {
    this.csvDragOver = false;
  }

  onCsvDrop(event: DragEvent): void {
    event.preventDefault();
    this.csvDragOver = false;
    if (event.dataTransfer?.files[0]?.name.endsWith('.csv')) {
      this.handleCsvFile(event.dataTransfer.files[0]);
    }
  }

  clearCsv(): void {
    this.csvFileName = '';
    this.csvFileUploaded = false;
  }

  // ── EMAIL ─────────────────────────────────────────────────

  onSubjectInput(): void {
    this.subjectCount = this.emailSubject.length;
    this.subjectCountOver = this.emailSubject.length > 80;
  }

  insertVar(v: string): void {
    if (this.emailBodyRef) {
      this.emailBodyRef.nativeElement.focus();
      document.execCommand('insertText', false, v);
    }
  }

  execCommand(command: string): void {
    document.execCommand(command);
  }

  // ── NAVIGATION ────────────────────────────────────────────

  proceed(): void {
    this.router.navigate(['/create-survey/preview-launch']);
  }
}
