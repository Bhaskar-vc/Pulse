import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ReportView = 'list' | 'config' | 'loading' | 'report';

interface SavedConfig {
  id: number;
  title: string;
  survey: string;
  viewBy: string;
  startDate: string;
  endDate: string;
  status: 'Ongoing' | 'Completed' | 'Paused';
  lastRun: string;
  usageCount: number;
  categories: string[];
}

interface RecentReport {
  id: number;
  title: string;
  survey: string;
  generatedAt: string;
  sections: number;
  scope: string;
  startDate: string;
  endDate: string;
  status: 'Ongoing' | 'Completed' | 'Paused';
}

interface CategoryScore {
  name: string;
  score: number;
  responses: number;
  delta: number | null;
}

interface QuestionScore {
  text: string;
  category: string;
  score: number;
  responses: number;
  delta: number | null;
  distribution: number[]; // [SD, D, N, A, SA] as %
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sentinel') sentinelRef!: ElementRef<HTMLDivElement>;

  private observer: IntersectionObserver | null = null;
  visibleCount = 10;
  isLoadingMore = false;
  openDownloadId: number | string | null = null;
  compareDropdownOpen = false;
  activeComparison = '';

  get comparableSurveys() {
    return this.surveys.filter(s => s.name !== this.reportMeta.survey);
  }

  toggleDownload(id: number | string, e: Event) {
    e.stopPropagation();
    this.compareDropdownOpen = false;
    this.openDownloadId = this.openDownloadId === id ? null : id;
    this.cdr.detectChanges();
  }

  closeDownload() {
    this.openDownloadId = null;
    this.cdr.markForCheck();
  }

  toggleCompareDropdown(e: Event) {
    e.stopPropagation();
    this.openDownloadId = null;
    this.compareDropdownOpen = !this.compareDropdownOpen;
    this.cdr.detectChanges();
  }

  showComparePanel = false;

  selectComparison(name: string) {
    this.activeComparison = name;
    this.reportMeta.comparison = name;
    this.compareDropdownOpen = false;
    this.showComparePanel = true;
    this.cdr.detectChanges();
  }

  closeComparePanel() {
    this.showComparePanel = false;
    this.activeComparison = '';
    this.reportMeta.comparison = '';
    this.cdr.markForCheck();
  }

  // Mock comparison data keyed by survey name
  getCompareData(name: string) {
    const map: Record<string, { overall: number; participation: number; categories: number[] }> = {
      'Annual Culture Assessment 2025':   { overall: 68, participation: 52, categories: [73, 71, 73, 62, 67, 60, 62, 57] },
      'Onboarding Feedback Pulse':        { overall: 74, participation: 67, categories: [80, 77, 78, 70, 72, 66, 68, 63] },
      'Q4 Exit Interview Analysis':       { overall: 58, participation: 28, categories: [65, 62, 66, 55, 58, 54, 55, 48] },
    };
    return map[name] ?? { overall: 65, participation: 48, categories: [72, 70, 70, 64, 65, 58, 60, 54] };
  }

  removeComparison() {
    this.activeComparison = '';
    this.reportMeta.comparison = '';
    this.compareDropdownOpen = false;
    this.cdr.detectChanges();
  }

  downloadPDF() {
    this.closeDownload();
    window.print();
  }

  downloadCSV() {
    this.closeDownload();
    const escape = (v: string | number | null) => `"${String(v ?? '').replace(/"/g, '""')}"`;

    const sections: string[][] = [];

    // Report header
    sections.push(['REPORT', escape(this.reportMeta.title)]);
    sections.push(['Survey', escape(this.reportMeta.survey)]);
    sections.push(['Date Range', escape(this.reportMeta.dateRange)]);
    sections.push(['Scope', escape(this.reportMeta.scope)]);
    sections.push(['Participation', `${this.reportMeta.participated} / ${this.reportMeta.invited} (${this.reportMeta.rate}%)`]);
    sections.push([]);

    // Category scores
    sections.push(['CATEGORY SCORES']);
    sections.push(['Category', 'Score', 'Band', 'Responses', 'vs Previous'].map(escape));
    this.categoryScores.forEach(c => sections.push([
      escape(c.name), escape(c.score), escape(this.scoreBandLabel(c.score)),
      escape(c.responses), escape(c.delta !== null ? (c.delta! > 0 ? `+${c.delta}` : c.delta) : 'N/A'),
    ]));
    sections.push([]);

    // Dimension breakdown
    sections.push(['DIMENSION BREAKDOWN', `By ${this.dimensionData.dimension}`]);
    sections.push([this.dimensionData.dimension, ...this.categoryScores.map(c => escape(c.name)), 'Overall'].map(escape));
    this.dimensionData.values.forEach(row => sections.push([
      escape(row.name), ...row.scores.map(escape), escape(row.overall),
    ]));
    sections.push([]);

    // Top questions
    sections.push(['TOP 5 QUESTIONS']);
    sections.push(['Question', 'Category', 'Score', 'Responses', 'vs Previous'].map(escape));
    this.topQuestions.forEach(q => sections.push([
      escape(q.text), escape(q.category), escape(q.score),
      escape(q.responses), escape(q.delta !== null ? (q.delta! > 0 ? `+${q.delta}` : q.delta) : 'N/A'),
    ]));
    sections.push([]);

    // Bottom questions
    sections.push(['BOTTOM 5 QUESTIONS']);
    sections.push(['Question', 'Category', 'Score', 'Responses', 'vs Previous'].map(escape));
    this.bottomQuestions.forEach(q => sections.push([
      escape(q.text), escape(q.category), escape(q.score),
      escape(q.responses), escape(q.delta !== null ? (q.delta! > 0 ? `+${q.delta}` : q.delta) : 'N/A'),
    ]));
    sections.push([]);

    // Open-ended
    sections.push(['OPEN-ENDED THEMES']);
    sections.push(['Total Responses', escape(this.openEnded.total)]);
    sections.push(['Positive %', escape(this.openEnded.sentiment.positive)]);
    sections.push(['Neutral %', escape(this.openEnded.sentiment.neutral)]);
    sections.push(['Negative %', escape(this.openEnded.sentiment.negative)]);
    sections.push(['Top Positive Themes', this.openEnded.positiveThemes.map(escape).join(', ')]);
    sections.push(['Top Negative Themes', this.openEnded.negativeThemes.map(escape).join(', ')]);

    const csv = sections.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.reportMeta.title.replace(/[^a-z0-9]/gi, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  printReport() {
    this.closeDownload();
    window.print();
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.initObserver();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private initObserver() {
    if (!this.sentinelRef) return;
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.isLoadingMore) {
        const total = this.recentReports.filter(r => {
          const q = this.reportSearch.toLowerCase();
          return !q || r.title.toLowerCase().includes(q) || r.survey.toLowerCase().includes(q);
        }).length;
        if (this.visibleCount >= total) return;
        this.isLoadingMore = true;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.visibleCount += 10;
          this.isLoadingMore = false;
          this.cdr.markForCheck();
        }, 600);
      }
    }, { threshold: 0.1 });
    this.observer.observe(this.sentinelRef.nativeElement);
  }

  view: ReportView = 'list';
  loadingProgress = 0;
  loadingMessage = 'Assembling survey data…';
  private loadingTimer: ReturnType<typeof setInterval> | null = null;
  activeSection = 'participation';

  // Config state
  config = {
    survey: '',
    comparison: '',
    viewBy: '',
    filters: [] as { dimension: string; values: string[] }[],
    categories: [] as string[],
    sections: ['participation', 'category-overview', 'dimension', 'question-detail', 'open-ended', 'comparison'],
    title: '',
  };

  filterDimensionSelect = '';
  filterValueInput = '';

  surveys = [
    { id: 'q1-2026', name: 'Q1 Engagement Survey 2026', date: '01 Mar – 30 Jun 2026' },
    { id: 'annual-2025', name: 'Annual Culture Assessment 2025', date: '01 Jul – 31 Aug 2025' },
    { id: 'onboarding-2026', name: 'Onboarding Feedback Pulse', date: '01 Apr – 31 May 2026' },
    { id: 'exit-q4-2025', name: 'Q4 Exit Interview Analysis', date: '01 Oct – 31 Dec 2025' },
  ];

  dimensions = ['Department', 'Gender', 'Age Band', 'Tenure Band', 'Location', 'Business Unit', 'Employee Grade', 'Nationality'];

  allCategories = ['Fairness', 'Manager Effectiveness', 'Work-Life Balance', 'Leadership', 'Communication', 'Career Growth', 'Belonging & Inclusion', 'Recognition'];

  sectionsList = [
    { id: 'participation', label: 'Participation Breakdown' },
    { id: 'category-overview', label: 'Category Score Overview' },
    { id: 'dimension', label: 'Dimension Breakdown' },
    { id: 'question-detail', label: 'Question-Level Detail' },
    { id: 'open-ended', label: 'Open-Ended Themes' },
    { id: 'comparison', label: 'Comparison Summary' },
  ];

  savedConfigs: SavedConfig[] = [
    { id: 1, title: 'Monthly Engineering Report', survey: 'Q1 Engagement Survey 2026', viewBy: 'Department', startDate: '01 Mar 2026', endDate: '30 Jun 2026', status: 'Ongoing', lastRun: '2026-03-28', usageCount: 4, categories: ['Manager Effectiveness', 'Work-Life Balance', 'Leadership'] },
    { id: 2, title: 'Leadership Scorecard', survey: 'Annual Culture Assessment 2025', viewBy: 'Business Unit', startDate: '01 Jul 2025', endDate: '31 Aug 2025', status: 'Completed', lastRun: '2026-02-14', usageCount: 2, categories: ['Leadership', 'Communication', 'Fairness'] },
    { id: 3, title: 'Gender Equity Deep Dive', survey: 'Q1 Engagement Survey 2026', viewBy: 'Gender', startDate: '01 Mar 2026', endDate: '30 Jun 2026', status: 'Paused', lastRun: '2026-03-15', usageCount: 1, categories: ['Belonging & Inclusion', 'Fairness', 'Career Growth'] },
  ];

  recentReports: RecentReport[] = [
    { id: 1,  title: 'Q1 Engagement Survey 2026 — Department Report', survey: 'Q1 Engagement Survey 2026', generatedAt: '2026-04-07 10:15', sections: 6, scope: 'All Departments', startDate: '01 Mar 2026', endDate: '30 Jun 2026', status: 'Ongoing' },
    { id: 2,  title: 'Q1 Engagement — Gender Breakdown',              survey: 'Q1 Engagement Survey 2026', generatedAt: '2026-04-07 08:42', sections: 4, scope: 'Female · Male', startDate: '01 Mar 2026', endDate: '30 Jun 2026', status: 'Paused' },
    { id: 3,  title: 'Annual Culture — Leadership View',              survey: 'Annual Culture Assessment 2025', generatedAt: '2026-04-06 14:32', sections: 5, scope: 'Leadership Band', startDate: '01 Jul 2025', endDate: '31 Aug 2025', status: 'Completed' },
    { id: 4,  title: 'Onboarding Feedback — Location Report',         survey: 'Onboarding Feedback Pulse', generatedAt: '2026-04-06 09:10', sections: 4, scope: 'All Locations', startDate: '01 Apr 2026', endDate: '31 May 2026', status: 'Completed' },
    { id: 5,  title: 'Q4 Exit Analysis — Full Report',                survey: 'Q4 Exit Interview Analysis', generatedAt: '2026-04-01 11:45', sections: 6, scope: 'All Company', startDate: '01 Oct 2025', endDate: '31 Dec 2025', status: 'Completed' },
    { id: 6,  title: 'Q1 Engagement — Tenure Breakdown',              survey: 'Q1 Engagement Survey 2026', generatedAt: '2026-03-31 16:20', sections: 4, scope: 'All Tenure Bands', startDate: '01 Mar 2026', endDate: '30 Jun 2026', status: 'Ongoing' },
    { id: 7,  title: 'Annual Culture — Business Unit Report',         survey: 'Annual Culture Assessment 2025', generatedAt: '2026-03-31 11:05', sections: 5, scope: 'All Business Units', startDate: '01 Jul 2025', endDate: '31 Aug 2025', status: 'Completed' },
    { id: 8,  title: 'Onboarding Feedback — Age Band Report',         survey: 'Onboarding Feedback Pulse', generatedAt: '2026-03-28 14:00', sections: 3, scope: 'All Age Bands', startDate: '01 Apr 2026', endDate: '31 May 2026', status: 'Completed' },
    { id: 9,  title: 'Q4 Exit Analysis — Department Breakdown',       survey: 'Q4 Exit Interview Analysis', generatedAt: '2026-03-28 10:30', sections: 5, scope: 'Engineering · Sales', startDate: '01 Oct 2025', endDate: '31 Dec 2025', status: 'Completed' },
    { id: 10, title: 'Q1 Engagement — Location Report',               survey: 'Q1 Engagement Survey 2026', generatedAt: '2026-03-27 09:00', sections: 4, scope: 'Dubai · London', startDate: '01 Mar 2026', endDate: '30 Jun 2026', status: 'Ongoing' },
    { id: 11, title: 'Annual Culture — Full Company Report',          survey: 'Annual Culture Assessment 2025', generatedAt: '2026-03-25 15:45', sections: 6, scope: 'All Company', startDate: '01 Jul 2025', endDate: '31 Aug 2025', status: 'Completed' },
    { id: 12, title: 'Q4 Exit Analysis — Gender Breakdown',           survey: 'Q4 Exit Interview Analysis', generatedAt: '2026-03-22 13:10', sections: 4, scope: 'Female · Male', startDate: '01 Oct 2025', endDate: '31 Dec 2025', status: 'Completed' },
    { id: 13, title: 'Onboarding Feedback — Grade Report',            survey: 'Onboarding Feedback Pulse', generatedAt: '2026-03-20 11:45', sections: 3, scope: 'Grades 1–4', startDate: '01 Apr 2026', endDate: '31 May 2026', status: 'Completed' },
    { id: 14, title: 'Q1 Engagement — Nationality Report',            survey: 'Q1 Engagement Survey 2026', generatedAt: '2026-03-18 08:30', sections: 4, scope: 'All Nationalities', startDate: '01 Mar 2026', endDate: '30 Jun 2026', status: 'Paused' },
    { id: 15, title: 'Annual Culture — Manager Effectiveness',        survey: 'Annual Culture Assessment 2025', generatedAt: '2026-03-15 16:00', sections: 5, scope: 'All Managers', startDate: '01 Jul 2025', endDate: '31 Aug 2025', status: 'Completed' },
  ];

  private _reportSearch = '';
  get reportSearch() { return this._reportSearch; }
  set reportSearch(v: string) { this._reportSearch = v; this.visibleCount = 10; }

  get groupedReports(): { label: string; reports: RecentReport[] }[] {
    const today = '2026-04-07';
    const yesterday = '2026-04-06';
    const q = this.reportSearch.toLowerCase();
    const filtered = (q
      ? this.recentReports.filter(r => r.title.toLowerCase().includes(q) || r.survey.toLowerCase().includes(q))
      : this.recentReports
    ).slice(0, this.visibleCount);
    const groups: { [key: string]: RecentReport[] } = {};

    for (const r of filtered) {
      const dateStr = r.generatedAt.split(' ')[0];
      let label: string;
      if (dateStr === today) label = 'Today';
      else if (dateStr === yesterday) label = 'Yesterday';
      else {
        const [y, m, d] = dateStr.split('-');
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        label = `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
      }
      if (!groups[label]) groups[label] = [];
      groups[label].push(r);
    }

    const order = ['Today', 'Yesterday'];
    return Object.keys(groups)
      .sort((a, b) => {
        const ai = order.indexOf(a), bi = order.indexOf(b);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return 0;
      })
      .map(label => ({ label, reports: groups[label] }));
  }

  // Generated report mock data
  reportMeta = {
    title: 'Q1 Engagement Survey 2026 — Department Report — Apr 2026',
    survey: 'Q1 Engagement Survey 2026',
    dateRange: '01 Mar 2026 – 30 Jun 2026',
    scope: 'All Departments',
    comparison: 'Annual Culture Assessment 2025',
    participated: 247,
    invited: 412,
    rate: 60,
    rateHealth: 'Healthy',
    generatedAt: '7 Apr 2026, 14:32',
  };

  categoryScores: CategoryScore[] = [
    { name: 'Belonging & Inclusion', score: 78, responses: 241, delta: 5 },
    { name: 'Recognition', score: 74, responses: 238, delta: 3 },
    { name: 'Manager Effectiveness', score: 71, responses: 244, delta: -2 },
    { name: 'Career Growth', score: 68, responses: 239, delta: 6 },
    { name: 'Communication', score: 63, responses: 242, delta: -4 },
    { name: 'Fairness', score: 61, responses: 237, delta: 1 },
    { name: 'Leadership', score: 55, responses: 243, delta: -7 },
    { name: 'Work-Life Balance', score: 48, responses: 240, delta: -9 },
  ];

  dimensionData = {
    dimension: 'Department',
    values: [
      { name: 'Product',          scores: [82, 79, 77, 75, 70, 68, 64, 59], overall: 72 },
      { name: 'Design',           scores: [80, 76, 73, 71, 68, 65, 60, 55], overall: 69 },
      { name: 'Marketing',        scores: [74, 72, 68, 65, 62, 60, 56, 52], overall: 64 },
      { name: 'Engineering',      scores: [70, 68, 65, 62, 58, 55, 50, 44], overall: 59 },
      { name: 'Customer Support', scores: [60, 58, 55, 52, 48, 45, 40, 35], overall: 49 },
    ],
  };

  topQuestions: QuestionScore[] = [
    { text: 'I feel a genuine sense of belonging at this company', category: 'Belonging & Inclusion', score: 82, responses: 241, delta: 6, distribution: [4, 8, 12, 38, 38] },
    { text: 'My manager recognises my contributions fairly', category: 'Recognition', score: 79, responses: 238, delta: 3, distribution: [3, 7, 14, 42, 34] },
    { text: 'I understand how my work connects to company goals', category: 'Career Growth', score: 76, responses: 236, delta: 8, distribution: [2, 6, 18, 44, 30] },
    { text: 'I feel comfortable sharing feedback with my manager', category: 'Manager Effectiveness', score: 74, responses: 243, delta: -1, distribution: [3, 8, 16, 40, 33] },
    { text: 'The company values diversity and inclusion', category: 'Belonging & Inclusion', score: 73, responses: 240, delta: 4, distribution: [4, 10, 14, 38, 34] },
  ];

  bottomQuestions: QuestionScore[] = [
    { text: 'Leadership communicates transparently about company direction', category: 'Leadership', score: 44, responses: 243, delta: -10, distribution: [22, 28, 20, 18, 12] },
    { text: 'I have time to recover between periods of high workload', category: 'Work-Life Balance', score: 46, responses: 240, delta: -8, distribution: [20, 26, 22, 20, 12] },
    { text: 'Senior leadership is genuinely interested in employee wellbeing', category: 'Leadership', score: 49, responses: 241, delta: -6, distribution: [18, 24, 24, 22, 12] },
    { text: 'Deadlines are realistic given available resources', category: 'Work-Life Balance', score: 51, responses: 239, delta: -5, distribution: [16, 22, 24, 24, 14] },
    { text: 'I receive enough information to do my job effectively', category: 'Communication', score: 54, responses: 242, delta: -3, distribution: [12, 20, 26, 28, 14] },
  ];

  openEnded = {
    total: 186,
    sentiment: { positive: 38, neutral: 29, negative: 28, unknown: 5 },
    positiveThemes: ['Team Support', 'Learning Opportunities', 'Flexible Working'],
    negativeThemes: ['Leadership Transparency', 'Work-Life Balance', 'Career Progression Clarity'],
    aiPositive: 'Employees most frequently celebrate team collaboration and access to learning as meaningful positives.',
    aiNegative: 'The dominant concern is a lack of visible leadership communication and unsustainable workload during peak periods.',
    quotes: {
      positive: [
        'The team culture here is genuinely supportive — people help each other without being asked.',
        'I\'ve had more chances to learn new skills in 6 months here than in 3 years at my previous job.',
      ],
      negative: [
        'We find out about major decisions after they\'re already made — it feels like we\'re the last to know.',
        'The expectation to be available evenings and weekends has become normalised, which is unsustainable.',
      ],
    },
  };

  comparisonSummary = {
    overallCurrent: 65,
    overallPrevious: 68,
    overallDelta: -3,
    participationCurrent: 60,
    participationPrevious: 52,
    participationDelta: 8,
    mostImproved: [
      { name: 'Career Growth', delta: 6 },
      { name: 'Belonging & Inclusion', delta: 5 },
      { name: 'Recognition', delta: 3 },
    ],
    mostDeclined: [
      { name: 'Work-Life Balance', delta: -9 },
      { name: 'Leadership', delta: -7 },
      { name: 'Communication', delta: -4 },
    ],
    aiSignal: 'The sharpest decline since the last survey is Work-Life Balance (−9 pts), suggesting the workload pressures raised in open-ended feedback are worsening.',
  };

  get scoreBand(): (score: number) => string {
    return (score: number) => {
      if (score >= 75) return 'positive';
      if (score >= 60) return 'watch';
      if (score >= 45) return 'act-now';
      return 'critical';
    };
  }

  get scoreBandLabel(): (score: number) => string {
    return (score: number) => {
      if (score >= 75) return 'Positive';
      if (score >= 60) return 'Watch';
      if (score >= 45) return 'Act Now';
      return 'Critical';
    };
  }

  get rateHealthClass(): string {
    const r = this.reportMeta.rate;
    if (r >= 60) return 'healthy';
    if (r >= 40) return 'moderate';
    if (r >= 20) return 'low';
    return 'critical';
  }

  isSectionEnabled(id: string): boolean {
    return this.config.sections.includes(id);
  }

  toggleSection(id: string) {
    const idx = this.config.sections.indexOf(id);
    if (idx > -1) this.config.sections.splice(idx, 1);
    else this.config.sections.push(id);
  }

  isCategoryEnabled(name: string): boolean {
    return this.config.categories.length === 0 || this.config.categories.includes(name);
  }

  toggleCategory(name: string) {
    const idx = this.config.categories.indexOf(name);
    if (idx > -1) this.config.categories.splice(idx, 1);
    else this.config.categories.push(name);
  }

  get allCatsSelected(): boolean {
    return this.config.categories.length === 0;
  }

  selectAllCategories() {
    this.config.categories = [];
  }

  onSurveyChange() {
    const survey = this.surveys.find(s => s.id === this.config.survey);
    if (survey) {
      this.config.title = `${survey.name} — ${this.config.viewBy || 'Company'} Report — Apr 2026`;
      // Auto-suggest comparison
      const others = this.surveys.filter(s => s.id !== this.config.survey);
      this.config.comparison = others[0]?.id || '';
    }
  }

  onViewByChange() {
    const survey = this.surveys.find(s => s.id === this.config.survey);
    if (survey) {
      this.config.title = `${survey.name} — ${this.config.viewBy || 'All Company'} Report — Apr 2026`;
    }
  }

  addFilter() {
    if (!this.filterDimensionSelect) return;
    const existing = this.config.filters.find(f => f.dimension === this.filterDimensionSelect);
    if (existing) return;
    this.config.filters.push({ dimension: this.filterDimensionSelect, values: [] });
    this.filterDimensionSelect = '';
  }

  removeFilter(idx: number) {
    this.config.filters.splice(idx, 1);
  }

  startCreate() {
    this.config = {
      survey: '',
      comparison: '',
      viewBy: '',
      filters: [],
      categories: [],
      sections: ['participation', 'category-overview', 'dimension', 'question-detail', 'open-ended', 'comparison'],
      title: '',
    };
    this.view = 'config';
    this.cdr.markForCheck();
  }

  runConfig(saved: SavedConfig) {
    this.config.title = saved.title;
    this.startLoading();
  }

  cancelConfig() {
    this.view = 'list';
    this.cdr.markForCheck();
  }

  generate() {
    if (!this.config.survey) return;
    this.reportMeta.title = this.config.title || 'Untitled Report';
    const survey = this.surveys.find(s => s.id === this.config.survey);
    if (survey) {
      this.reportMeta.survey = survey.name;
      this.reportMeta.dateRange = survey.date;
    }
    this.startLoading();
  }

  private startLoading() {
    this.view = 'loading';
    this.loadingProgress = 0;
    this.loadingMessage = 'Assembling survey data…';
    this.cdr.detectChanges();

    const steps = [
      { progress: 20, message: 'Assembling survey data…' },
      { progress: 40, message: 'Calculating category scores…' },
      { progress: 60, message: 'Applying dimension filters…' },
      { progress: 80, message: 'Running AI signal detection…' },
      { progress: 95, message: 'Generating report sections…' },
      { progress: 100, message: 'Done!' },
    ];

    let i = 0;
    this.loadingTimer = setInterval(() => {
      if (i < steps.length) {
        this.loadingProgress = steps[i].progress;
        this.loadingMessage = steps[i].message;
        i++;
        this.cdr.markForCheck();
      } else {
        clearInterval(this.loadingTimer!);
        this.loadingTimer = null;
        setTimeout(() => {
          this.view = 'report';
          this.activeSection = 'participation';
          this.cdr.markForCheck();
        }, 400);
      }
    }, 480);
  }

  backToList() {
    this.view = 'list';
    this.cdr.markForCheck();
  }

  scrollToSection(id: string) {
    this.activeSection = id;
    const el = document.getElementById('rpt-section-' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openReport(report: RecentReport) {
    this.reportMeta.title = report.title;
    this.reportMeta.survey = report.survey;
    this.reportMeta.scope = report.scope;
    this.startLoading();
  }

  get participationBarStyle(): string {
    return `width: ${this.reportMeta.rate}%`;
  }

  distributionColor(i: number): string {
    return ['#ef4444', '#fca5a5', '#9ca3af', '#10b981', '#059669'][i];
  }

  distributionLabel(i: number): string {
    return ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'][i];
  }

  getSurveyName(id: string): string {
    return this.surveys.find(s => s.id === id)?.name ?? '';
  }
}
