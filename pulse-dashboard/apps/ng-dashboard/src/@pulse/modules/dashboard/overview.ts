import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import Chart from 'chart.js/auto';
import { SurveyItem } from '../../shared/components/survey-carousel/survey-carousel';
import { ExpandableCardComponent } from '../../shared/components/expandable-card/expandable-card';

@Component({
  standalone: false,
  selector: 'app-overview',
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class OverviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('engChart') engChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('perfTabCard') perfTabCardRef!: ElementRef<HTMLDivElement>;
  @ViewChild('enpsCard') enpsCardRef!: ElementRef<HTMLDivElement>;
  @ViewChild('partCard') partCardRef!: ElementRef<HTMLDivElement>;
  @ViewChild('engCard') engCardRef!: ElementRef<HTMLDivElement>;
  @ViewChild('segmentCard') segmentCardRef!: ExpandableCardComponent;
  @ViewChild('feedbackCards') feedbackCardsRef!: ElementRef<HTMLDivElement>;

  private chart: Chart | null = null;
  private engChart: Chart | null = null;
  private engChartExpanded: Chart | null = null;
  activeSeg: 'top' | 'needs' = 'top';
  activeTimeSegment: string = '12m';
  surveyDropdownOpen = false;
  countryDropdownOpen = false;

  activePopover: string | null = null;
  popoverTexts: Record<string, string> = {
    enps: 'Employee Net Promoter Score measures how likely employees are to recommend your organization as a great place to work. Scores range from -100 to +100.',
    participation: 'Participation Rate shows the percentage of invited employees who completed the survey. Higher participation yields more reliable insights.',
    category: 'Category scores track performance across key engagement drivers like leadership, communication, and work-life balance over time.',
    engagement_time: 'Engagement Over Time visualizes how overall engagement, eNPS, and participation trends have changed across survey cycles.',
    engagement_index: 'The Engagement Index is a composite score (0–100) reflecting overall employee engagement based on all survey responses.',
  };

  togglePopover(key: string, event: MouseEvent) {
    event.stopPropagation();
    this.activePopover = this.activePopover === key ? null : key;
  }

  datePickerOpen = false;
  dateRangeLabel = 'Last week';
  dateRangeDisplay = 'Jan 6 – Jan 13, 2026';
  datePresets = [
    { label: 'Today', range: 'Apr 24, 2026' },
    { label: 'Yesterday', range: 'Apr 23, 2026' },
    { label: 'This week', range: 'Apr 21 – Apr 27, 2026' },
    { label: 'Last week', range: 'Jan 6 – Jan 13, 2026' },
    { label: 'This month', range: 'Apr 1 – Apr 30, 2026' },
    { label: 'Last month', range: 'Mar 1 – Mar 31, 2026' },
    { label: 'This year', range: 'Jan 1 – Dec 31, 2026' },
    { label: 'Last year', range: 'Jan 1 – Dec 31, 2025' },
    { label: 'All time', range: 'All data' },
  ];

  toggleDatePicker(event: MouseEvent) {
    event.stopPropagation();
    this.datePickerOpen = !this.datePickerOpen;
  }

  selectDatePreset(preset: { label: string; range: string }) {
    this.dateRangeLabel = preset.label;
    this.dateRangeDisplay = preset.range;
    this.datePickerOpen = false;
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.activePopover = null;
    this.datePickerOpen = false;
  }

  countryOptions = [
    { code: 'in', name: 'IND', flag: 'https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/in.svg' },
    { code: 'us', name: 'USA', flag: 'https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/us.svg' },
    { code: 'gb', name: 'UK', flag: 'https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/gb.svg' },
    { code: 'de', name: 'GER', flag: 'https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/de.svg' },
    { code: 'sg', name: 'SGP', flag: 'https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/sg.svg' },
  ];
  selectedCountry = this.countryOptions[0];

  // Calendar state
  calendarOpen = false;
  calYear = new Date().getFullYear();
  calMonth = new Date().getMonth();
  calRangeStart: Date | null = null;
  calRangeEnd: Date | null = null;
  calCustomLabel = 'Custom';

  private readonly MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  private readonly DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su'];

  get calMonthLabel(): string { return `${this.MONTHS[this.calMonth]} ${this.calYear}`; }
  get calRightMonth(): number { return this.calMonth === 11 ? 0 : this.calMonth + 1; }
  get calRightYear(): number { return this.calMonth === 11 ? this.calYear + 1 : this.calYear; }
  get calRightMonthLabel(): string { return `${this.MONTHS[this.calRightMonth]} ${this.calRightYear}`; }
  get calStartDisplay(): string { return this.calRangeStart ? this.fmtDate(this.calRangeStart) : ''; }
  get calEndDisplay(): string { return this.calRangeEnd ? this.fmtDate(this.calRangeEnd) : ''; }

  get leftCalGrid(): { day: number; date: Date; isOut: boolean; isToday: boolean; isStart: boolean; isEnd: boolean; isInRange: boolean }[] {
    return this.buildCalGrid(this.calYear, this.calMonth);
  }
  get rightCalGrid(): { day: number; date: Date; isOut: boolean; isToday: boolean; isStart: boolean; isEnd: boolean; isInRange: boolean }[] {
    return this.buildCalGrid(this.calRightYear, this.calRightMonth);
  }
  get dayHeaders(): string[] { return this.DAYS; }

  private buildCalGrid(year: number, month: number) {
    const todayD = new Date(); todayD.setHours(0,0,0,0);
    const first = new Date(year, month, 1);
    let startDow = first.getDay(); startDow = startDow === 0 ? 6 : startDow - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    const cells: any[] = [];
    for (let i = startDow - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, daysInPrev - i); cells.push(this.makeCell(d, true, todayD));
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day); cells.push(this.makeCell(d, false, todayD));
    }
    const total = startDow + daysInMonth;
    const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let day = 1; day <= remaining; day++) {
      const d = new Date(year, month + 1, day); cells.push(this.makeCell(d, true, todayD));
    }
    return cells;
  }

  private makeCell(date: Date, isOut: boolean, todayD: Date) {
    const dk = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const key = dk(date);
    const startKey = this.calRangeStart ? dk(this.calRangeStart) : null;
    const endKey = this.calRangeEnd ? dk(this.calRangeEnd) : null;
    return {
      day: date.getDate(), date, isOut,
      isToday: key === dk(todayD),
      isStart: key === startKey,
      isEnd: key === endKey,
      isInRange: !!(this.calRangeStart && this.calRangeEnd && date > this.calRangeStart && date < this.calRangeEnd),
    };
  }

  private fmtDate(d: Date): string {
    return `${this.MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}`;
  }

  toggleCalendar() { this.calendarOpen = !this.calendarOpen; }
  calNav(dir: number) {
    this.calMonth += dir;
    if (this.calMonth > 11) { this.calMonth = 0; this.calYear++; }
    if (this.calMonth < 0) { this.calMonth = 11; this.calYear--; }
  }
  pickCalDate(cell: any) {
    if (cell.isOut) return;
    if (!this.calRangeStart || (this.calRangeStart && this.calRangeEnd)) {
      this.calRangeStart = cell.date; this.calRangeEnd = null;
    } else {
      if (cell.date < this.calRangeStart) { this.calRangeEnd = this.calRangeStart; this.calRangeStart = cell.date; }
      else { this.calRangeEnd = cell.date; }
    }
  }
  calCancel() { this.calRangeStart = null; this.calRangeEnd = null; this.calendarOpen = false; }
  calApply() {
    if (this.calRangeStart && this.calRangeEnd) {
      this.calCustomLabel = `${this.fmtDate(this.calRangeStart)} – ${this.fmtDate(this.calRangeEnd)}`;
      this.activeTimeSegment = 'custom';
      const diffDays = Math.round((this.calRangeEnd.getTime() - this.calRangeStart.getTime()) / (1000 * 60 * 60 * 24));
      const labels: string[] = [];
      const engagement: number[] = [], enps: number[] = [], participants: number[] = [];
      const steps = Math.min(diffDays, 12);
      const interval = Math.max(1, Math.floor(diffDays / steps));
      for (let i = 0; i <= diffDays; i += interval) {
        const d = new Date(this.calRangeStart.getTime() + i * 86400000);
        labels.push(`${this.MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}`);
        engagement.push(Math.round(30 + Math.random() * 25));
        enps.push(Math.round(40 + Math.random() * 30));
        participants.push(Math.round(50 + Math.random() * 30));
      }
      this.timeSegmentData['custom'] = { labels, engagement, enps, participants };
      this.onTimeSegmentChange('custom');
      this.calendarOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event) {
    const target = e.target as HTMLElement;
    if (this.calendarOpen && !target.closest('.custom-cal-wrapper')) {
      this.calendarOpen = false;
    }
  }

  private timeSegmentData: Record<string, { labels: string[]; engagement: number[]; enps: number[]; participants: number[] }> = {
    'custom': { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'], engagement: [30, 33, 35, 38, 36, 40, 42, 44], enps: [45, 50, 52, 58, 55, 60, 62, 65], participants: [55, 58, 60, 62, 64, 66, 68, 70] },
    '24h':    { labels: ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM'], engagement: [40, 38, 42, 45, 43, 41], enps: [58, 56, 62, 64, 60, 59], participants: [70, 65, 72, 76, 74, 71] },
    '7d':     { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], engagement: [32, 36, 34, 44, 38, 42, 40], enps: [48, 55, 75, 65, 60, 60, 58], participants: [58, 62, 54, 70, 66, 74, 68] },
    '15d':    { labels: ['Day 1', 'Day 3', 'Day 5', 'Day 7', 'Day 9', 'Day 11', 'Day 13', 'Day 15'], engagement: [30, 34, 32, 38, 36, 42, 40, 44], enps: [50, 54, 58, 62, 56, 64, 60, 68], participants: [56, 60, 58, 66, 62, 70, 68, 72] },
    '30d':    { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], engagement: [34, 38, 42, 46], enps: [52, 58, 64, 68], participants: [60, 66, 70, 76] },
    '3m':     { labels: ['Jan 24', 'Feb 24', 'Mar 24'], engagement: [32, 36, 34], enps: [48, 55, 75], participants: [58, 62, 54] },
    '6m':     { labels: ['Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24'], engagement: [32, 36, 34, 44, 38, 42], enps: [48, 55, 75, 65, 60, 60], participants: [58, 62, 54, 70, 66, 74] },
    '12m':    { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], engagement: [30, 32, 36, 34, 44, 38, 42, 40, 46, 48, 50, 52], enps: [45, 48, 55, 75, 65, 60, 60, 58, 62, 68, 70, 72], participants: [55, 58, 62, 54, 70, 66, 74, 68, 72, 76, 78, 80] },
  };

  onTimeSegmentChange(segment: string) {
    this.activeTimeSegment = segment;
    const data = this.timeSegmentData[segment];
    if (this.chart && data) {
      this.chart.data.labels = data.labels;
      this.chart.data.datasets[0].data = data.engagement;
      this.chart.data.datasets[1].data = data.enps;
      this.chart.data.datasets[2].data = data.participants;
      this.chart.update();
    }
  }

  surveyOptions = [
    {
      id: 0, name: 'All Surveys', dateRange: '01 Jan - 31 Dec 2026', active: true,
      enps: { score: 67, promoter: 21, passive: 34, detractor: 45, delta: 4, benchmarkGap: 36, benchmark: 100 },
      participation: { rate: 36, delta: '- No change', vs: 'vs 0% in previous survey', responded: 36, total: 100 },
      engagement: { score: 65, delta: 4 },
    },
    {
      id: 1, name: 'Q1 Engagement Survey 2025', dateRange: '01 Mar - 30 Jun 2026', active: true,
      enps: { score: 72, promoter: 28, passive: 30, detractor: 42, delta: 7, benchmarkGap: 28, benchmark: 100 },
      participation: { rate: 42, delta: '+6%', vs: 'vs 36% in previous survey', responded: 42, total: 100 },
      engagement: { score: 71, delta: 6 },
    },
    {
      id: 2, name: 'Annual Culture Assessment', dateRange: '01 Jul - 31 Aug 2026', active: true,
      enps: { score: 54, promoter: 18, passive: 36, detractor: 46, delta: -2, benchmarkGap: 46, benchmark: 100 },
      participation: { rate: 52, delta: '+16%', vs: 'vs 36% in previous survey', responded: 112, total: 215 },
      engagement: { score: 58, delta: -3 },
    },
    {
      id: 3, name: 'Onboarding Feedback Pulse', dateRange: '01 Apr - 31 May 2026', active: true,
      enps: { score: 81, promoter: 35, passive: 40, detractor: 25, delta: 12, benchmarkGap: 19, benchmark: 100 },
      participation: { rate: 67, delta: '+31%', vs: 'vs 36% in previous survey', responded: 8, total: 12 },
      engagement: { score: 74, delta: 9 },
    },
    {
      id: 4, name: 'Q4 Exit Interview Analysis', dateRange: '01 Oct - 31 Dec 2025', active: false,
      enps: { score: 43, promoter: 12, passive: 28, detractor: 60, delta: -8, benchmarkGap: 57, benchmark: 100 },
      participation: { rate: 28, delta: '-8%', vs: 'vs 36% in previous survey', responded: 22, total: 78 },
      engagement: { score: 48, delta: -5 },
    },
  ];

  selectedSurvey = this.surveyOptions[0];

  surveys: SurveyItem[] = [
    { id: 1, name: 'Q1 Engagement Survey 2025', responses: 36, total: 100, endDate: 'Jun 2026', active: true },
    { id: 2, name: 'Annual Culture Assessment', responses: 112, total: 215, endDate: 'Aug 2026', active: true },
    { id: 3, name: 'Onboarding Feedback Pulse', responses: 8, total: 12, endDate: 'May 2026', active: true },
  ];

  ngAfterViewInit() {
    this.initPillIndicator();
    this.initChart();
    this.initEngChart();
    this.initCountUp();
    this.initCardTilt(this.enpsCardRef);
    this.initCardTilt(this.partCardRef);
    this.initCardTilt(this.engCardRef);
  }

  ngOnDestroy() {
    this.chart?.destroy();
    this.engChart?.destroy();
    this.engChartExpanded?.destroy();
  }

  toggleSurveyDropdown(event: Event) {
    event.stopPropagation();
    this.surveyDropdownOpen = !this.surveyDropdownOpen;
  }

  selectSurvey(survey: typeof this.surveyOptions[0]) {
    this.selectedSurvey = survey;
    this.surveyDropdownOpen = false;
    this.updateDonutArc();
  }

  toggleCountryDropdown(event: Event) {
    event.stopPropagation();
    this.countryDropdownOpen = !this.countryDropdownOpen;
  }

  selectCountry(country: typeof this.countryOptions[0]) {
    this.selectedCountry = country;
    this.countryDropdownOpen = false;
  }

  get donutDasharray(): string {
    const circumference = 2 * Math.PI * 105; // ~659.73
    const filled = (this.selectedSurvey.engagement.score / 100) * circumference;
    const gap = circumference - filled;
    return `${filled.toFixed(2)} ${gap.toFixed(2)}`;
  }

  private updateDonutArc() {
    const arc = document.querySelector('.donut-arc') as SVGCircleElement;
    if (arc) {
      arc.setAttribute('stroke-dasharray', this.donutDasharray);
    }
  }

  @HostListener('document:click')
  closeSurveyDropdown() {
    this.surveyDropdownOpen = false;
    this.countryDropdownOpen = false;
  }

  scrollFeedback(direction: number) {
    const container = this.feedbackCardsRef?.nativeElement;
    if (!container) return;
    const card = container.querySelector('.fb-card') as HTMLElement;
    if (!card) return;
    const scrollAmount = (card.offsetWidth + 12) * direction; // 12 = gap
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  onSegmentCardOpened(host: HTMLElement) {
    const canvas = host.querySelector('#engChartExpanded') as HTMLCanvasElement;
    if (canvas) {
      // Small delay so the DOM is laid out
      setTimeout(() => this.initExpandedEngChart(canvas), 50);
    }
  }

  onSegmentCardClosed() {
    this.engChartExpanded?.destroy();
    this.engChartExpanded = null;
  }

  switchSeg(seg: 'top' | 'needs') {
    this.activeSeg = seg;
    setTimeout(() => this.movePillIndicator(), 0);
  }

  private initPillIndicator() {
    if (!this.perfTabCardRef) return;
    const indicator = this.perfTabCardRef.nativeElement.querySelector('.rp-seg-indicator') as HTMLElement;
    if (indicator) indicator.style.transition = 'none';
    this.movePillIndicator();
    requestAnimationFrame(() => { if (indicator) indicator.style.transition = ''; });
  }

  private movePillIndicator() {
    if (!this.perfTabCardRef) return;
    const card = this.perfTabCardRef.nativeElement;
    const tabs = card.querySelector('.rp-seg-tabs') as HTMLElement;
    const activeBtn = tabs?.querySelector('.rp-seg-btn.active') as HTMLElement;
    const indicator = tabs?.querySelector('.rp-seg-indicator') as HTMLElement;
    const glow = tabs?.querySelector('.rp-seg-glow') as HTMLElement;
    if (!activeBtn || !indicator) return;
    const tabsRect = tabs.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const left = btnRect.left - tabsRect.left;
    indicator.style.left = left + 'px';
    indicator.style.width = btnRect.width + 'px';
    if (glow) { glow.style.left = left + 'px'; glow.style.width = btnRect.width + 'px'; }
  }

  private initCountUp() {
    const delay = 1700;
    const scores = document.querySelectorAll('.mc-score, .donut-score, .rp-score-val');
    scores.forEach((el: Element) => {
      const raw = (el as HTMLElement).textContent?.trim() || '';
      const suffix = raw.includes('%') ? '%' : '';
      const target = parseFloat(raw);
      if (!isNaN(target)) this.animateCountUp(el as HTMLElement, target, suffix, 1100, delay);
    });
  }

  private animateCountUp(el: HTMLElement, target: number, suffix: string, duration: number, delay: number) {
    const original = el.textContent || '';
    setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = original;
      };
      requestAnimationFrame(tick);
    }, delay);
  }

  private initCardTilt(ref: ElementRef<HTMLDivElement>) {
    const card = ref?.nativeElement;
    if (!card) return;
    const glare = document.createElement('div');
    glare.className = 'mc-glare';
    card.appendChild(glare);

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const rx = ((my - rect.height / 2) / (rect.height / 2)) * -10;
      const ry = ((mx - rect.width / 2) / (rect.width / 2)) * 10;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015,1.015,1.015)`;
      glare.style.setProperty('--mx', `${(mx / rect.width) * 100}%`);
      glare.style.setProperty('--my', `${(my / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  }

  private initEngChart() {
    if (!this.engChartRef) return;
    const ctx = this.engChartRef.nativeElement.getContext('2d')!;
    const split = 3; // first 3 = Needs Attention, last 3 = Top Performers

    const bgBandsPlugin = {
      id: 'engBgBands',
      beforeDraw(chart: any) {
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return;
        const mid = chartArea.left + (chartArea.right - chartArea.left) * 0.5;
        c.save();
        c.fillStyle = 'rgba(239,68,68,0.1)';
        c.fillRect(chartArea.left, chartArea.top, mid - chartArea.left, chartArea.height);
        c.fillStyle = 'rgba(16,185,129,0.13)';
        c.fillRect(mid, chartArea.top, chartArea.right - mid, chartArea.height);
        c.restore();
      }
    };

    // Needs Attention: Work-Life Balance 48, Leadership 42, Communication 35
    // Top Performers:  Cybersecurity 92,   Innovation 87, Team Collab 81
    this.engChart = new Chart(ctx, {
      type: 'line',
      plugins: [bgBandsPlugin],
      data: {
        labels: ['W-L Balance', 'Leadership', 'Comm.', 'Cybersec.', 'Innovation', 'Team Collab.'],
        datasets: [{
          data: [48, 42, 35, 92, 87, 81],
          borderWidth: 2, tension: 0.38,
          pointRadius: 3.5, pointHoverRadius: 5, pointBorderWidth: 1.5,
          fill: false,
          segment: {
            borderColor: (ctx: any) => ctx.p0DataIndex < split
              ? 'rgba(239,68,68,0.82)' : 'rgba(16,185,129,0.9)'
          },
          pointBackgroundColor: (ctx: any) => 'transparent',
          pointBorderColor: (ctx: any) => ctx.dataIndex < split
            ? 'rgba(239,68,68,0.82)' : 'rgba(16,185,129,0.9)',
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 1100, easing: 'easeInOutQuart', delay: 1700 },
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: {
            display: true, offset: true,
            grid: { display: false }, border: { display: false },
            ticks: { font: { family: 'Inter', size: 8 }, color: '#9ca3af', maxRotation: 0 }
          },
          y: { display: false, min: 25, max: 100 }
        },
        layout: { padding: { left: 2, right: 2, top: 4, bottom: 0 } }
      }
    } as any);
  }

  private initExpandedEngChart(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!;
    const split = 3;

    const bgBandsPlugin = {
      id: 'engBgBandsExpanded',
      beforeDraw(chart: any) {
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return;
        const mid = chartArea.left + (chartArea.right - chartArea.left) * 0.5;
        c.save();
        c.fillStyle = 'rgba(239,68,68,0.08)';
        c.fillRect(chartArea.left, chartArea.top, mid - chartArea.left, chartArea.height);
        c.fillStyle = 'rgba(16,185,129,0.1)';
        c.fillRect(mid, chartArea.top, chartArea.right - mid, chartArea.height);
        c.restore();
      }
    };

    this.engChartExpanded = new Chart(ctx, {
      type: 'line',
      plugins: [bgBandsPlugin],
      data: {
        labels: ['W-L Balance', 'Leadership', 'Comm.', 'Cybersec.', 'Leadership', 'Comm.'],
        datasets: [{
          data: [85, 65, 52, 85, 65, 52],
          borderWidth: 2.5, tension: 0.38,
          pointRadius: 5, pointHoverRadius: 7, pointBorderWidth: 2,
          fill: false,
          segment: {
            borderColor: (ctx: any) => ctx.p0DataIndex < split
              ? 'rgba(239,68,68,0.82)' : 'rgba(16,185,129,0.9)'
          },
          pointBackgroundColor: '#fff',
          pointBorderColor: (ctx: any) => ctx.dataIndex < split
            ? 'rgba(239,68,68,0.82)' : 'rgba(16,185,129,0.9)',
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeInOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#fff', titleColor: '#29294c', bodyColor: '#545470',
            borderColor: '#e5e7eb', borderWidth: 1, padding: 12, cornerRadius: 10,
            titleFont: { family: 'Inter', weight: '600', size: 13 },
            bodyFont: { family: 'Inter', size: 13 },
          }
        },
        scales: {
          x: {
            display: true, offset: true,
            grid: { color: 'rgba(0,0,0,0.04)' }, border: { display: false },
            ticks: { font: { family: 'Inter', size: 12 }, color: '#6b7280', maxRotation: 0 }
          },
          y: {
            display: true, min: 40, max: 95,
            grid: { color: 'rgba(0,0,0,0.04)' }, border: { display: false },
            ticks: { font: { family: 'Inter', size: 11 }, color: '#9ca3af', stepSize: 10 }
          }
        },
        layout: { padding: { left: 8, right: 8, top: 12, bottom: 4 } }
      }
    } as any);
  }

  private initChart() {
    const ctx = this.lineChartRef.nativeElement.getContext('2d')!;

    const makeGrad = (stops: [number, string][]) => {
      const g = ctx.createLinearGradient(0, 0, 0, 260);
      stops.forEach(([pos, col]) => g.addColorStop(pos, col));
      return g;
    };

    const defaultData = this.timeSegmentData[this.activeTimeSegment];
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: defaultData.labels,
        datasets: [
          {
            label: 'Engagement',
            data: defaultData.engagement,
            borderColor: '#98a2b3',
            backgroundColor: 'transparent',
            borderWidth: 1.8, tension: 0.45, fill: false,
            pointRadius: 0, pointHoverRadius: 5, pointHoverBackgroundColor: '#98a2b3', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2.5,
          },
          {
            label: 'eNPS',
            data: defaultData.enps,
            borderColor: '#344054',
            backgroundColor: 'transparent',
            borderWidth: 1.8, tension: 0.45, fill: false,
            pointRadius: 0, pointHoverRadius: 5, pointHoverBackgroundColor: '#344054', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2.5,
          },
          {
            label: 'Participants',
            data: defaultData.participants,
            borderColor: '#c4b5fd',
            backgroundColor: makeGrad([[0, 'rgba(196,181,253,0.14)'], [0.7, 'rgba(196,181,253,0.02)'], [1, 'rgba(196,181,253,0)']]),
            borderWidth: 1.8, tension: 0.45, fill: true,
            pointRadius: 0, pointHoverRadius: 5, pointHoverBackgroundColor: '#c4b5fd', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2.5,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: { padding: { top: 6, right: 4 } },
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index', intersect: false,
            backgroundColor: '#fff', titleColor: '#1e1b4b', bodyColor: '#4b5563',
            borderColor: '#e5e7eb', borderWidth: 1, padding: 14, cornerRadius: 12,
            titleFont: { family: 'Inter', weight: '600', size: 13 },
            bodyFont: { family: 'Inter', size: 12 },
            bodySpacing: 6, boxPadding: 6, usePointStyle: true, caretSize: 6,
            displayColors: true,
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { family: 'Inter', size: 12, weight: '500' }, color: '#b0b0b8', padding: 10 }
          },
          y: {
            min: 0, max: 100,
            grid: { color: 'rgba(0,0,0,0.04)', lineWidth: 1, tickBorderDash: [3, 3] },
            border: { display: false, dash: [3, 3] },
            ticks: { font: { family: 'Inter', size: 12, weight: '500' }, color: '#b0b0b8', stepSize: 20, padding: 12 }
          }
        },
        interaction: { mode: 'index', intersect: false },
        animation: { duration: 1400, easing: 'easeInOutQuart', delay: 1700 },
        hover: { mode: 'index', intersect: false }
      }
    } as any);
  }
}
