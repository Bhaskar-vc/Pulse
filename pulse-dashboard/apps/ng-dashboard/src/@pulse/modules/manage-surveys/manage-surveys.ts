import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface PulseItem {
  name: string;
  date: string;
  questions: number;
  responses: number;
  total: number;
}

type SurveyStatus = 'ongoing' | 'scheduled' | 'completed' | 'automation';

interface Survey {
  id: number;
  name: string;
  status: SurveyStatus;
  startDate: string;
  endDate: string;
  questions: number;
  employees: number;
  responseRate: number;
  responded: number;
  expanded: boolean;
  pulses: PulseItem[];
  nextReminder?: string;
  reminderEmployees?: number;
  automationFrequency?: string;
  frequency?: string;
  paused?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-manage-surveys',
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-surveys.html',
  styleUrl: './manage-surveys.scss',
})
export class ManageSurveysComponent {
  activeTab: SurveyStatus = 'ongoing';

  tabs: { key: SurveyStatus; label: string }[] = [
    { key: 'ongoing', label: 'Ongoing' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'completed', label: 'Completed' },
    { key: 'automation', label: 'Automation' },
  ];

  surveys: Survey[] = [
    // ── ONGOING ──
    {
      id: 1,
      name: 'Q4 2025 Employee Engagement Survey',
      status: 'ongoing',
      startDate: '02 July, 2025',
      endDate: '15 October, 2025',
      questions: 52,
      employees: 310,
      responseRate: 92,
      responded: 285,
      expanded: true,
      pulses: [
        { name: 'Pulse 1', date: '02 July', questions: 12, responses: 298, total: 310 },
        { name: 'Pulse 2', date: '03 Aug', questions: 12, responses: 298, total: 310 },
        { name: 'Pulse 3', date: '04 Sept', questions: 12, responses: 0, total: 310 },
      ],
      nextReminder: '05 September, 2025',
      reminderEmployees: 13,
    },
    {
      id: 2,
      name: 'Manager Effectiveness Pulse',
      status: 'ongoing',
      startDate: '15 August, 2025',
      endDate: '30 November, 2025',
      questions: 28,
      employees: 180,
      responseRate: 78,
      responded: 140,
      expanded: false,
      pulses: [
        { name: 'Pulse 1', date: '15 Aug', questions: 14, responses: 162, total: 180 },
        { name: 'Pulse 2', date: '15 Sept', questions: 14, responses: 0, total: 180 },
      ],
      nextReminder: '20 September, 2025',
      reminderEmployees: 40,
    },
    {
      id: 3,
      name: 'Onboarding Experience Check-in',
      status: 'ongoing',
      startDate: '01 September, 2025',
      endDate: '31 December, 2025',
      questions: 18,
      employees: 45,
      responseRate: 64,
      responded: 29,
      expanded: false,
      pulses: [
        { name: 'Pulse 1', date: '01 Sept', questions: 9, responses: 38, total: 45 },
        { name: 'Pulse 2', date: '01 Oct', questions: 9, responses: 0, total: 45 },
      ],
    },

    // ── SCHEDULED ──
    {
      id: 4,
      name: 'Annual Leadership Feedback Survey',
      status: 'scheduled',
      startDate: '15 October, 2025',
      endDate: '31 December, 2025',
      questions: 52,
      employees: 310,
      responseRate: 0,
      responded: 0,
      expanded: true,
      pulses: [
        { name: 'Pulse 1', date: '02 July', questions: 12, responses: 298, total: 310 },
        { name: 'Pulse 2', date: '03 Aug', questions: 12, responses: 298, total: 310 },
      ],
    },
    {
      id: 5,
      name: 'DEI Annual Assessment 2026',
      status: 'scheduled',
      startDate: '15 February, 2026',
      endDate: '15 April, 2026',
      questions: 36,
      employees: 310,
      responseRate: 0,
      responded: 0,
      expanded: false,
      pulses: [
        { name: 'Pulse 1', date: '15 Feb', questions: 18, responses: 0, total: 310 },
        { name: 'Pulse 2', date: '15 Mar', questions: 18, responses: 0, total: 310 },
      ],
    },
    {
      id: 6,
      name: 'Work-Life Balance Survey',
      status: 'scheduled',
      startDate: '01 March, 2026',
      endDate: '30 April, 2026',
      questions: 20,
      employees: 250,
      responseRate: 0,
      responded: 0,
      expanded: false,
      pulses: [
        { name: 'Pulse 1', date: '01 Mar', questions: 20, responses: 0, total: 250 },
      ],
    },
    {
      id: 7,
      name: 'Q1 2026 Engagement Pulse',
      status: 'scheduled',
      startDate: '05 January, 2026',
      endDate: '31 March, 2026',
      questions: 44,
      employees: 310,
      responseRate: 0,
      responded: 0,
      expanded: false,
      pulses: [
        { name: 'Pulse 1', date: '05 Jan', questions: 15, responses: 0, total: 310 },
        { name: 'Pulse 2', date: '05 Feb', questions: 15, responses: 0, total: 310 },
        { name: 'Pulse 3', date: '05 Mar', questions: 14, responses: 0, total: 310 },
      ],
    },

    // ── COMPLETED ──
    {
      id: 8,
      name: 'Q3 2025 Engagement Survey',
      status: 'completed',
      startDate: '01 April, 2025',
      endDate: '30 June, 2025',
      questions: 48,
      employees: 298,
      responseRate: 89,
      responded: 265,
      expanded: false,
      frequency: 'Weekly',
      pulses: [],
    },
    {
      id: 9,
      name: 'Q2 2025 Team Wellness Survey',
      status: 'completed',
      startDate: '01 April, 2025',
      endDate: '30 June, 2025',
      questions: 25,
      employees: 298,
      responseRate: 89,
      responded: 265,
      expanded: false,
      frequency: 'One-time',
      pulses: [],
    },
    {
      id: 10,
      name: 'Annual Benefits Feedback 2024',
      status: 'completed',
      startDate: '01 November, 2024',
      endDate: '30 November, 2024',
      questions: 18,
      employees: 298,
      responseRate: 89,
      responded: 265,
      expanded: false,
      frequency: 'One-time',
      pulses: [],
    },
    {
      id: 11,
      name: 'Q2 2025 Team Wellness Survey',
      status: 'completed',
      startDate: '01 April, 2025',
      endDate: '30 June, 2025',
      questions: 25,
      employees: 298,
      responseRate: 89,
      responded: 265,
      expanded: false,
      frequency: 'Weekly',
      pulses: [],
    },
    {
      id: 12,
      name: 'Annual Benefits Feedback 2024',
      status: 'completed',
      startDate: '01 April, 2025',
      endDate: '30 June, 2025',
      questions: 18,
      employees: 222,
      responseRate: 78,
      responded: 173,
      expanded: false,
      frequency: 'One-time',
      pulses: [],
    },
    {
      id: 13,
      name: 'Annual Benefits Feedback 2024',
      status: 'completed',
      startDate: '01 November, 2024',
      endDate: '30 November, 2024',
      questions: 18,
      employees: 222,
      responseRate: 78,
      responded: 173,
      expanded: false,
      frequency: 'One-time',
      pulses: [],
    },

    // ── AUTOMATION ──
    {
      id: 14,
      name: 'Monthly eNPS Tracker',
      status: 'automation',
      startDate: '01 January, 2025',
      endDate: 'Recurring',
      questions: 3,
      employees: 310,
      responseRate: 85,
      responded: 264,
      expanded: false,
      automationFrequency: 'Monthly',
      pulses: [
        { name: 'Jan 2025', date: '01 Jan', questions: 3, responses: 290, total: 310 },
        { name: 'Feb 2025', date: '01 Feb', questions: 3, responses: 275, total: 310 },
        { name: 'Mar 2025', date: '01 Mar', questions: 3, responses: 264, total: 310 },
      ],
    },
    {
      id: 15,
      name: 'Weekly Team Mood Check',
      status: 'automation',
      startDate: '10 March, 2025',
      endDate: 'Recurring',
      questions: 2,
      employees: 45,
      responseRate: 93,
      responded: 42,
      expanded: false,
      automationFrequency: 'Weekly',
      pulses: [
        { name: 'Week 34', date: '18 Aug', questions: 2, responses: 42, total: 45 },
        { name: 'Week 35', date: '25 Aug', questions: 2, responses: 40, total: 45 },
        { name: 'Week 36', date: '01 Sept', questions: 2, responses: 0, total: 45 },
      ],
    },
  ];

  constructor(private router: Router) {}

  tabCount(key: SurveyStatus): number {
    return this.surveys.filter(s => s.status === key).length;
  }

  get filteredSurveys(): Survey[] {
    return this.surveys.filter(s => s.status === this.activeTab);
  }

  toggleExpand(survey: Survey) {
    survey.expanded = !survey.expanded;
  }

  switchTab(key: SurveyStatus) {
    this.activeTab = key;
  }

  viewInsights(survey: Survey, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/dashboard']);
  }

  viewQuestions(survey: Survey, event: MouseEvent) {
    event.stopPropagation();
    this.closeMenu();
    this.router.navigate(['/coming-soon']);
  }

  sendReminder(survey: Survey, event: MouseEvent) {
    event.stopPropagation();
    this.closeMenu();
    survey.nextReminder = undefined;
    survey.reminderEmployees = undefined;
  }

  extendDeadline(survey: Survey, event: MouseEvent) {
    event.stopPropagation();
    this.closeMenu();
    // Extend end date by 30 days
    const parts = survey.endDate.split(' ');
    const currentEnd = new Date(survey.endDate.replace(/,/g, ''));
    currentEnd.setDate(currentEnd.getDate() + 30);
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    survey.endDate = `${String(currentEnd.getDate()).padStart(2, '0')} ${months[currentEnd.getMonth()]}, ${currentEnd.getFullYear()}`;
  }

  pauseSurvey(survey: Survey, event: MouseEvent) {
    event.stopPropagation();
    this.closeMenu();
    survey.paused = true;
  }

  resumeSurvey(survey: Survey, event: MouseEvent) {
    event.stopPropagation();
    this.closeMenu();
    survey.paused = false;
  }

  downloadReport(survey: Survey, event: MouseEvent) {
    event.stopPropagation();
    this.closeMenu();
    // Simulate download
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(
      `Survey,Status,Response Rate,Responded,Employees\n${survey.name},${survey.status},${survey.responseRate}%,${survey.responded},${survey.employees}`
    );
    a.download = `${survey.name.replace(/\s+/g, '_')}_report.csv`;
    a.click();
  }

  statusLabel(status: SurveyStatus): string {
    switch (status) {
      case 'ongoing': return 'Ongoing';
      case 'scheduled': return 'Scheduled';
      case 'completed': return 'Completed';
      case 'automation': return 'Automation';
    }
  }

  // Completed table sorting
  sortField: 'participation' | 'responseRate' | null = null;
  sortDir: 'asc' | 'desc' = 'desc';

  toggleSort(field: 'participation' | 'responseRate') {
    if (this.sortField === field) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDir = 'desc';
    }
  }

  get sortedCompletedSurveys(): Survey[] {
    const list = this.surveys.filter(s => s.status === 'completed');
    if (!this.sortField) return list;
    return [...list].sort((a, b) => {
      const valA = this.sortField === 'participation' ? a.employees : a.responseRate;
      const valB = this.sortField === 'participation' ? b.employees : b.responseRate;
      return this.sortDir === 'asc' ? valA - valB : valB - valA;
    });
  }

  // How it works drawer
  drawerOpen = false;

  openDrawer(event: MouseEvent) {
    event.stopPropagation();
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  // More menu
  openMenuId: number | null = null;

  toggleMenu(surveyId: number, event: MouseEvent) {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === surveyId ? null : surveyId;
  }

  closeMenu() {
    this.openMenuId = null;
  }
}
