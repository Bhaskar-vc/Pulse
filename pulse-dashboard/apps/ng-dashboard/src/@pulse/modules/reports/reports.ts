import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ReportsService, SurveyReportItem, SurveyReportFilter } from '@pulse/services/reports.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

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
  standalone: false,
  selector: 'app-reports',
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sentinel') sentinelRef!: ElementRef<HTMLDivElement>;

  private observer: IntersectionObserver | null = null;
  visibleCount = 10;
  isLoadingMore = false;

  // API state
  apiSurveys: SurveyReportItem[] = [];
  apiTotalSurveys = 0;
  apiLoading = false;
  apiOffset = 0;
  apiLimit = 10;
  apiFilters: SurveyReportFilter[] = [];
  private searchSubject$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  // Sentiment API data (used when viewing a report)
  apiSentiment: any = null;
  apiAiSummary: any = null;
  apiFeedbackCount = 0;
  apiComments: any[] = [];

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
    // Try real API download if we have a survey ID
    const survey = this.surveys.find(s => s.name === this.reportMeta.survey);
    if (survey) {
      const surveyId = parseInt(survey.id, 10) || 0;
      if (surveyId > 0) {
        this.downloadReport(surveyId, 'all');
        return;
      }
    }
    // Fallback to print
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

  constructor(private cdr: ChangeDetectorRef, private reportsService: ReportsService) {}

  ngOnInit() {
    this.loadSurveys();

    // Debounced search
    this.searchSubject$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(keyword => {
      this.apiOffset = 0;
      if (keyword.trim()) {
        this.searchSurveys(keyword);
      } else {
        this.loadSurveys();
      }
    });
  }

  ngAfterViewInit() {
    this.initObserver();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.destroy$.next();
    this.destroy$.complete();
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
        this.loadMoreSurveys();
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

  // Populated from API — empty until loaded
  surveys: { id: string; name: string; date: string }[] = [];

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

  // No API for saved configs — empty until backend supports it
  savedConfigs: SavedConfig[] = [];

  // Populated from API — empty until loaded
  recentReports: RecentReport[] = [];

  private _reportSearch = '';
  get reportSearch() { return this._reportSearch; }
  set reportSearch(v: string) {
    this._reportSearch = v;
    this.visibleCount = 10;
    this.searchSubject$.next(v);
  }

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

  // Populated when a report is opened — empty until then
  reportMeta = {
    title: '',
    survey: '',
    dateRange: '',
    scope: '',
    comparison: '',
    participated: 0,
    invited: 0,
    rate: 0,
    rateHealth: '',
    generatedAt: '',
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

  // Populated from API — empty until loaded
  openEnded = {
    total: 0,
    sentiment: { positive: 0, neutral: 0, negative: 0, unknown: 0 },
    positiveThemes: [] as string[],
    negativeThemes: [] as string[],
    aiPositive: '',
    aiNegative: '',
    quotes: {
      positive: [] as string[],
      negative: [] as string[],
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

    // Load real sentiment data if survey has an ID
    const survey = this.surveys.find(s => s.name === report.survey);
    if (survey) {
      const surveyId = parseInt(survey.id, 10) || 0;
      if (surveyId > 0) this.loadSentimentData(surveyId);
    }
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

  // ── API methods ──────────────────────────────────────────────

  loadSurveys() {
    this.apiLoading = true;
    this.cdr.markForCheck();
    this.reportsService.getSurveysForReport(this.apiOffset, this.apiLimit).subscribe(res => {
      if (this.apiOffset === 0) {
        this.apiSurveys = res.surveys;
      } else {
        this.apiSurveys = [...this.apiSurveys, ...res.surveys];
      }
      this.apiTotalSurveys = res.noOfSurveys;

      // Populate surveys dropdown and recentReports from API
      this.surveys = this.apiSurveys.map(s => ({
        id: String(s.id),
        name: s.name,
        date: `${s.startDate || ''} – ${s.endDate || ''}`,
      }));
      this.recentReports = this.apiSurveys.map((s, i) => ({
        id: s.id,
        title: s.name,
        survey: s.name,
        generatedAt: s.endDate || '',
        sections: 0,
        scope: s.type || '',
        startDate: s.startDate || '',
        endDate: s.endDate || '',
        status: (s.status === 'Ongoing' || s.status === 'Completed' || s.status === 'Paused') ? s.status : 'Completed' as any,
      }));

      this.apiLoading = false;
      this.cdr.markForCheck();
    });
  }

  searchSurveys(keyword: string) {
    this.apiLoading = true;
    this.cdr.markForCheck();
    this.reportsService.searchSurveysForReport(keyword, this.apiOffset, this.apiLimit).subscribe(res => {
      this.apiSurveys = res.surveys;
      this.apiTotalSurveys = res.noOfSurveys;

      this.recentReports = this.apiSurveys.map(s => ({
        id: s.id,
        title: s.name,
        survey: s.name,
        generatedAt: s.endDate || '',
        sections: 0,
        scope: s.type || '',
        startDate: s.startDate || '',
        endDate: s.endDate || '',
        status: (s.status === 'Ongoing' || s.status === 'Completed' || s.status === 'Paused') ? s.status : 'Completed' as any,
      }));

      this.apiLoading = false;
      this.cdr.markForCheck();
    });
  }

  loadMoreSurveys() {
    if (this.apiLoading || this.apiSurveys.length >= this.apiTotalSurveys) return;
    this.apiOffset += this.apiLimit;
    if (this.reportSearch.trim()) {
      this.searchSurveys(this.reportSearch);
    } else {
      this.loadSurveys();
    }
  }

  loadFilters(surveyId: number) {
    this.reportsService.getFiltersForSurveyReport(surveyId).subscribe(res => {
      this.apiFilters = res.filters;
      this.cdr.markForCheck();
    });
  }

  downloadReport(surveyId: number, reportType: string = 'all') {
    this.reportsService.downloadSurveyReport(surveyId, reportType);
  }

  loadSentimentData(surveyId: number) {
    // Load sentiment scores
    this.reportsService.getProcessedSentiments(surveyId).subscribe(res => {
      this.apiSentiment = res.sentiments;
      if (this.apiSentiment) {
        this.openEnded.sentiment.positive = this.apiSentiment.positive ?? 0;
        this.openEnded.sentiment.neutral = this.apiSentiment.neutral ?? 0;
        this.openEnded.sentiment.negative = this.apiSentiment.negative ?? 0;
      }
      this.cdr.markForCheck();
    });

    // Load AI summary
    this.reportsService.getOverallSentiment(surveyId).subscribe(res => {
      this.apiAiSummary = res;
      if (res?.sentiment_json) {
        this.openEnded.aiPositive = res.sentiment_json.positive_summary || '';
        this.openEnded.aiNegative = res.sentiment_json.negative_summary || '';
      }
      this.cdr.markForCheck();
    });

    // Load feedback count
    this.reportsService.getFeedbackCount(surveyId).subscribe(res => {
      this.apiFeedbackCount = res.count;
      this.openEnded.total = res.count;
      this.cdr.markForCheck();
    });

    // Load comments
    this.reportsService.getSurveyComments(surveyId).subscribe(res => {
      this.apiComments = res.comments || [];
      const positiveComments = this.apiComments.filter(c => c.sentiment === 'positive').map(c => c.comment);
      const negativeComments = this.apiComments.filter(c => c.sentiment === 'negative').map(c => c.comment);
      this.openEnded.quotes.positive = positiveComments.slice(0, 3);
      this.openEnded.quotes.negative = negativeComments.slice(0, 3);
      this.cdr.markForCheck();
    });
  }
}
