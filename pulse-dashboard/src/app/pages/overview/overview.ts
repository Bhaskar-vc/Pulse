import { Component, AfterViewInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { ExpandableCardComponent } from '../../shared/expandable-card/expandable-card';
import { SurveyCarouselComponent, SurveyItem } from '../../shared/survey-carousel/survey-carousel';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, ExpandableCardComponent, SurveyCarouselComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  surveyDropdownOpen = false;

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
    { id: 1, name: 'Q1 Engagement Survey 2025', responses: 36, participation: '36%', endDate: 'Jun 2026', active: true },
    { id: 2, name: 'Annual Culture Assessment', responses: 112, participation: '52%', endDate: 'Aug 2026', active: true },
    { id: 3, name: 'Onboarding Feedback Pulse', responses: 8, participation: '67%', endDate: 'May 2026', active: true },
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

    // Needs Attention: Work-Life Balance 85, Leadership 65, Communication 52
    // Top Performers:  Cybersecurity 85,   Leadership 65, Communication 52
    this.engChart = new Chart(ctx, {
      type: 'line',
      plugins: [bgBandsPlugin],
      data: {
        labels: ['W-L Balance', 'Leadership', 'Comm.', 'Cybersec.', 'Leadership', 'Comm.'],
        datasets: [{
          data: [85, 65, 52, 85, 65, 52],
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
          y: { display: false, min: 40, max: 95 }
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

    const makeGrad = (c1: string, c2: string) => {
      const g = ctx.createLinearGradient(0, 0, 0, 240);
      g.addColorStop(0, c1); g.addColorStop(1, c2);
      return g;
    };

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24'],
        datasets: [
          {
            label: 'Engagement',
            data: [32, 36, 34, 44, 38, 42],
            borderColor: '#5b9bd5',
            backgroundColor: makeGrad('rgba(91,155,213,0.18)', 'rgba(91,155,213,0)'),
            borderWidth: 2.5, tension: 0.45, fill: true,
            pointBackgroundColor: '#5b9bd5', pointRadius: 3.5, pointHoverRadius: 5.5, pointBorderWidth: 0,
          },
          {
            label: 'eNPS',
            data: [48, 55, 75, 65, 60, 60],
            borderColor: '#9b72cf',
            backgroundColor: makeGrad('rgba(155,114,207,0.15)', 'rgba(155,114,207,0)'),
            borderWidth: 2.5, tension: 0.45, fill: true,
            pointBackgroundColor: '#9b72cf', pointRadius: 3.5, pointHoverRadius: 5.5, pointBorderWidth: 0,
          },
          {
            label: 'Participants',
            data: [58, 62, 54, 70, 66, 74],
            borderColor: '#1f2937', backgroundColor: 'transparent',
            borderWidth: 2, tension: 0.45, fill: false,
            pointBackgroundColor: '#1f2937', pointRadius: 3.5, pointHoverRadius: 5.5, pointBorderWidth: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index', intersect: false,
            backgroundColor: '#fff', titleColor: '#29294c', bodyColor: '#545470',
            borderColor: '#e5e7eb', borderWidth: 1, padding: 12, cornerRadius: 10,
            titleFont: { family: 'Poppins', weight: '600', size: 12 },
            bodyFont: { family: 'Poppins', size: 12 },
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { family: 'Poppins', size: 12 }, color: '#707070', padding: 8 }
          },
          y: {
            min: 0, max: 100,
            grid: { color: 'rgba(0,0,0,0.05)' },
            border: { display: false },
            ticks: { font: { family: 'Poppins', size: 12 }, color: '#707070', stepSize: 20, padding: 8 }
          }
        },
        interaction: { mode: 'index', intersect: false },
        animation: { duration: 1300, easing: 'easeInOutQuart', delay: 1700 }
      }
    } as any);
  }
}
