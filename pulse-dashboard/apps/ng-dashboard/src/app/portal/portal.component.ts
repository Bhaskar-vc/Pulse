import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface SetupStep {
  label: string;
  desc: string;
  done: boolean;
  current: boolean;
}

interface TemplateCard {
  title: string;
  questions: number;
  teams: number;
  icon: string;
}

@Component({
  standalone: false,
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent implements OnInit {
  navOpen = false;
  showOnboarding = false;

  constructor(private router: Router) {}

  setupSteps: SetupStep[] = [
    { label: 'Connect HRIS', desc: 'Workday \u00b7 synced 1,074 employees', done: true, current: false },
    { label: 'Invite admins', desc: '3 co-admins added', done: true, current: false },
    { label: 'Launch first survey', desc: 'Pick a template or use AI', done: false, current: true },
  ];

  templateCards: TemplateCard[] = [
    { title: 'Quarterly Engagement', questions: 14, teams: 12, icon: 'engagement' },
    { title: 'Manager Effectiveness', questions: 10, teams: 8, icon: 'manager' },
    { title: 'Onboarding (30/60/90)', questions: 8, teams: 18, icon: 'onboarding' },
    { title: 'eNPS \u00b7 Monthly', questions: 3, teams: 14, icon: 'enps' },
  ];

  get setupComplete(): number { return this.setupSteps.filter(s => s.done).length; }
  get setupPercent(): number { return Math.round((this.setupComplete / this.setupSteps.length) * 100); }
  get setupEstMin(): number { return (this.setupSteps.length - this.setupComplete) * 2; }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  ngOnInit() {
    this.showOnboarding = !localStorage.getItem('pulse_onboarding_done');
  }

  continueSetup() {
    const current = this.setupSteps.find(s => s.current);
    if (current) {
      current.done = true;
      current.current = false;
      const next = this.setupSteps.find(s => !s.done);
      if (next) next.current = true;
    }
    if (this.setupSteps.every(s => s.done)) {
      this.dismissOnboarding();
    }
  }

  isLastStep(step: SetupStep): boolean {
    return this.setupSteps.indexOf(step) === this.setupSteps.length - 1;
  }

  dismissOnboarding() {
    this.showOnboarding = false;
    localStorage.setItem('pulse_onboarding_done', '1');
    this.router.navigate(['/ai-hub']);
  }
}
