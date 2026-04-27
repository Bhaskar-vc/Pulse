import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ─── Manage Survey Page ──────────────────────────────────────── */
@Component({
  selector: 'manage-survey-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="ms-page">

  <!-- Page header -->
  <div class="ms-header">
    <h1 class="ms-title">Manage Surveys</h1>
    <p class="ms-subtitle">Manage ongoing, scheduled, and completed surveys</p>
  </div>

  <!-- Tabs -->
  <div class="ms-tabs" role="tablist">
    @for (tab of tabs; track tab.id) {
      <button class="ms-tab" role="tab"
        [class.is-active]="activeTab() === tab.id"
        (click)="activeTab.set(tab.id)">
        {{ tab.label }}
        <span class="ms-tab-badge" [class]="'ms-tab-badge--' + tab.color">{{ tab.count }}</span>
      </button>
    }
  </div>

  <!-- Survey list -->
  <div class="ms-list">
    @for (survey of surveys; track survey.id) {
      <div class="ms-card" [class.is-expanded]="expandedId() === survey.id">

        <!-- Card header -->
        <div class="ms-card-head">
          <div class="ms-card-head-left">
            <div class="ms-card-title-row">
              <span class="ms-card-name">{{ survey.name }}</span>
              <span class="ms-badge" [class]="'ms-badge--' + survey.status">{{ survey.statusLabel }}</span>
            </div>
            <div class="ms-card-meta">
              <span class="ms-meta-item">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M5 1v4M11 1v4M2 7h12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                {{ survey.dateRange }}
              </span>
              <span class="ms-meta-sep">·</span>
              <span class="ms-meta-item">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 2h10a1 1 0 011 1v11l-2-1.5L10 14l-2-1.5L6 14l-2-1.5L2 14V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M5 6h6M5 9h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                {{ survey.questions }} questions
              </span>
              <span class="ms-meta-sep">·</span>
              <span class="ms-meta-item">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M1.5 13c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="11.5" cy="5" r="2" stroke="currentColor" stroke-width="1.4"/><path d="M13.5 13c0-2-1.12-3.5-2.5-3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                {{ survey.employees }} employees
              </span>
            </div>
          </div>

          <div class="ms-card-head-right">
            <button class="ms-btn-insights">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 12l4-5 3 3 2.5-4L14 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              View Insights
            </button>
            <button class="ms-btn-icon" aria-label="More options">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.5" r="1.2" fill="currentColor"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="8" cy="12.5" r="1.2" fill="currentColor"/></svg>
            </button>
            <button class="ms-btn-icon" (click)="toggle(survey.id)" [attr.aria-label]="expandedId() === survey.id ? 'Collapse' : 'Expand'">
              <svg class="ms-chevron" [class.is-open]="expandedId() === survey.id"
                width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Expanded body -->
        <div class="ms-card-body" [class.is-open]="expandedId() === survey.id">
          <div class="ms-body-inner">

            <!-- Response Rate -->
            <div class="ms-response-box">
              <div class="ms-response-rate">{{ survey.responseRate }}%</div>
              <div class="ms-response-info">
                <span class="ms-response-label">Response Rate</span>
                <span class="ms-response-sub">{{ survey.responded }} of {{ survey.employees }} employees responded</span>
              </div>
            </div>

            <!-- Pulse Progress -->
            <div class="ms-pulses">
              <div class="ms-pulses-header">
                <span class="ms-pulses-title">Pulse Progress</span>
                <a class="ms-pulses-help" href="#">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M8 7v5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5" r="0.8" fill="currentColor"/></svg>
                  How it works
                </a>
              </div>
              @for (pulse of survey.pulses; track pulse.label; let last = $last) {
                <div class="ms-pulse-row" [class.is-last]="last">
                  <span class="ms-pulse-label">{{ pulse.label }}</span>
                  <span class="ms-pulse-count" [class.is-empty]="!pulse.responses">{{ pulse.responses }}</span>
                </div>
              }
            </div>

            <!-- Reminder -->
            @if (survey.reminder) {
              <div class="ms-reminder">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a5 5 0 015 5v3l1 1.5H2L3 9.5v-3a5 5 0 015-5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6.5 13.5a1.5 1.5 0 003 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                <span>Next automatic reminder: <strong>{{ survey.reminder.date }}</strong> &nbsp;|&nbsp; {{ survey.reminder.employees }} employees</span>
              </div>
            }

          </div>
        </div>

      </div>
    }
  </div>
</div>
  `,
  styles: [`
    .ms-page {
      font-family: 'Inter', sans-serif;
      background: var(--ds-bg, #fff);
      min-height: 100vh;
      padding: 32px 40px;
      max-width: 960px;
      margin: 0 auto;
      box-sizing: border-box;
      color: var(--ds-text, #101828);
    }

    /* ── Header ── */
    .ms-header { margin-bottom: 24px; }
    .ms-title  { font-size: 22px; font-weight: 700; color: var(--ds-text, #101828); margin: 0 0 4px; line-height: 1.3; }
    .ms-subtitle { font-size: 13px; color: var(--ds-text-faint, #667085); margin: 0; }

    /* ── Tabs ── */
    .ms-tabs {
      display: flex; gap: 0; border-bottom: 1.5px solid var(--ds-border, #eaecf0);
      margin-bottom: 24px;
    }
    .ms-tab {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 16px; font-size: 14px; font-weight: 500;
      color: var(--ds-text-faint, #667085); background: none; border: none;
      cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1.5px;
      transition: color .15s, border-color .15s;
    }
    .ms-tab:hover { color: var(--ds-text, #344054); }
    .ms-tab.is-active { color: var(--ds-brand, #7f56d9); border-bottom-color: var(--ds-brand, #7f56d9); }
    .ms-tab-badge {
      font-size: 11px; font-weight: 600; padding: 1px 7px; border-radius: 99px;
    }
    .ms-tab-badge--purple { background: #f4ebff; color: #6941c6; }
    .ms-tab-badge--blue   { background: #eff8ff; color: #026aa2; }
    .ms-tab-badge--green  { background: #ecfdf3; color: #027a48; }
    .ms-tab-badge--orange { background: #fff6ed; color: #b93815; }

    /* ── List ── */
    .ms-list { display: flex; flex-direction: column; gap: 12px; }

    /* ── Card ── */
    .ms-card {
      background: var(--ds-bg, #fff);
      border: 1px solid var(--ds-border, #e4e7ec);
      border-radius: 12px;
      overflow: hidden;
      transition: box-shadow .15s;
    }
    .ms-card:hover { box-shadow: 0 2px 12px rgba(16,24,40,.06); }

    /* ── Card head ── */
    .ms-card-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 16px; padding: 16px 20px;
    }
    .ms-card-head-left  { flex: 1; min-width: 0; }
    .ms-card-head-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

    .ms-card-title-row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
    .ms-card-name { font-size: 15px; font-weight: 600; color: var(--ds-text, #101828); }

    /* Status badge */
    .ms-badge { font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: 99px; }
    .ms-badge--ongoing   { background: #ecfdf3; color: #027a48; border: 1px solid #a9efc5; }
    .ms-badge--scheduled { background: #eff8ff; color: #026aa2; border: 1px solid #b2ddff; }
    .ms-badge--completed { background: #f2f4f7; color: #344054; border: 1px solid #d0d5dd; }

    /* Meta row */
    .ms-card-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .ms-meta-item { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; color: var(--ds-text-faint, #667085); }
    .ms-meta-item svg { flex-shrink: 0; opacity: .8; }
    .ms-meta-sep { color: var(--ds-border, #d0d5dd); font-size: 12px; }

    /* Action buttons */
    .ms-btn-insights {
      display: inline-flex; align-items: center; gap: 6px;
      height: 34px; padding: 0 14px;
      background: var(--ds-brand, #7f56d9); color: #fff;
      border: none; border-radius: 8px;
      font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
      cursor: pointer; transition: background .15s;
    }
    .ms-btn-insights:hover { background: #6941c6; }
    .ms-btn-icon {
      width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
      background: none; border: 1px solid var(--ds-border, #e4e7ec); border-radius: 8px;
      color: var(--ds-text-faint, #667085); cursor: pointer; transition: background .15s, color .15s;
    }
    .ms-btn-icon:hover { background: var(--ds-bg-subtle, #f9fafb); color: var(--ds-text, #344054); }
    .ms-chevron { transition: transform .25s ease; }
    .ms-chevron.is-open { transform: rotate(180deg); }

    /* ── Card body (collapsible) ── */
    .ms-card-body {
      overflow: hidden; max-height: 0;
      transition: max-height .3s ease;
      border-top: 0 solid var(--ds-border, #e4e7ec);
    }
    .ms-card-body.is-open {
      max-height: 600px;
      border-top-width: 1px;
    }
    .ms-body-inner { padding: 20px; display: flex; flex-direction: column; gap: 0; }

    /* ── Response Rate box ── */
    .ms-response-box {
      display: flex; align-items: center; gap: 20px;
      background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px;
      padding: 16px 24px; margin-bottom: 20px;
    }
    .ms-response-rate {
      font-size: 40px; font-weight: 700; color: #026aa2; line-height: 1;
    }
    .ms-response-info { display: flex; flex-direction: column; gap: 4px; }
    .ms-response-label { font-size: 14px; font-weight: 600; color: #0369a1; }
    .ms-response-sub   { font-size: 13px; color: #0284c7; }

    /* ── Pulse Progress ── */
    .ms-pulses { margin-bottom: 16px; }
    .ms-pulses-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 0; border-bottom: 1px solid var(--ds-border, #e4e7ec);
      margin-bottom: 0;
    }
    .ms-pulses-title { font-size: 13px; font-weight: 600; color: var(--ds-text, #101828); }
    .ms-pulses-help {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 12px; color: var(--ds-brand, #7f56d9); text-decoration: none;
    }
    .ms-pulses-help:hover { text-decoration: underline; }
    .ms-pulse-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 11px 0; border-bottom: 1px solid var(--ds-border, #f2f4f7);
    }
    .ms-pulse-row.is-last { border-bottom: none; }
    .ms-pulse-label { font-size: 13px; color: var(--ds-text-faint, #344054); }
    .ms-pulse-count { font-size: 13px; font-weight: 500; color: var(--ds-text, #101828); }
    .ms-pulse-count.is-empty { color: var(--ds-text-faint, #98a2b3); }

    /* ── Reminder ── */
    .ms-reminder {
      display: flex; align-items: center; gap: 10px;
      background: #fffaeb; border: 1px solid #fedf89; border-radius: 8px;
      padding: 11px 16px; font-size: 13px; color: #92400e; margin-top: 4px;
    }
    .ms-reminder svg { flex-shrink: 0; color: #f79009; }
    .ms-reminder strong { font-weight: 600; }
  `],
})
class ManageSurveyPage {
  activeTab = signal('ongoing');

  tabs = [
    { id: 'ongoing',    label: 'Ongoing',    count: 3, color: 'purple' },
    { id: 'scheduled',  label: 'Scheduled',  count: 4, color: 'blue'   },
    { id: 'completed',  label: 'Completed',  count: 6, color: 'green'  },
    { id: 'automation', label: 'Automation', count: 2, color: 'orange' },
  ];

  surveys = [
    {
      id: 1,
      name: 'Q4 2025 Employee Engagement Survey',
      status: 'ongoing',
      statusLabel: 'Ongoing',
      dateRange: '02 July, 2025 – 15 October, 2025',
      questions: 52,
      employees: 310,
      responseRate: 92,
      responded: 285,
      pulses: [
        { label: 'Pulse 1  ( 02 July - 12 questions )',  responses: '298/310 responses' },
        { label: 'Pulse 2  ( 03 Aug - 12 questions )',   responses: '298/310 responses' },
        { label: 'Pulse 3  ( 04 Sept - 12 questions )',  responses: '' },
      ],
      reminder: { date: '05 September, 2025', employees: 13 },
    },
    {
      id: 2,
      name: 'Q3 2025 Manager Effectiveness Survey',
      status: 'ongoing',
      statusLabel: 'Ongoing',
      dateRange: '01 April, 2025 – 30 June, 2025',
      questions: 38,
      employees: 240,
      responseRate: 78,
      responded: 187,
      pulses: [
        { label: 'Pulse 1  ( 01 Apr - 10 questions )',  responses: '240/240 responses' },
        { label: 'Pulse 2  ( 01 May - 14 questions )',  responses: '210/240 responses' },
        { label: 'Pulse 3  ( 01 Jun - 14 questions )',  responses: '187/240 responses' },
      ],
      reminder: null,
    },
    {
      id: 3,
      name: 'Culture & Values Pulse Check',
      status: 'ongoing',
      statusLabel: 'Ongoing',
      dateRange: '15 March, 2025 – 15 September, 2025',
      questions: 24,
      employees: 180,
      responseRate: 65,
      responded: 117,
      pulses: [
        { label: 'Pulse 1  ( 15 Mar - 8 questions )',  responses: '180/180 responses' },
        { label: 'Pulse 2  ( 15 May - 8 questions )',  responses: '154/180 responses' },
        { label: 'Pulse 3  ( 15 Jul - 8 questions )',  responses: '' },
      ],
      reminder: { date: '20 September, 2025', employees: 63 },
    },
  ];

  expandedId = signal<number | null>(1);

  toggle(id: number) {
    this.expandedId.update(cur => cur === id ? null : id);
  }
}

/* ─── Story meta ─────────────────────────────────────────────── */
const meta: Meta<ManageSurveyPage> = {
  title: 'Survey/Manage',
  component: ManageSurveyPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full-page view for managing ongoing, scheduled, and completed surveys. Accessible via Survey → Manage in the sidebar.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ManageSurveyPage>;

export const Default: Story = {};

export const AllCollapsed: Story = {
  render: () => ({
    moduleMetadata: { imports: [ManageSurveyPage] },
    template: `<manage-survey-page></manage-survey-page>`,
  }),
};
