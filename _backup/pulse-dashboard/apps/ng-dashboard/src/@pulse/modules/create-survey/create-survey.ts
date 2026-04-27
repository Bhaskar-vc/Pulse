import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-create-survey',
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurveyComponent implements OnInit, OnDestroy {
  private alertEl: HTMLElement | null = null;
  private alertTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('surveyLaunched') === '1') {
      localStorage.removeItem('surveyLaunched');
      this.showLaunchAlert();
    }
  }

  ngOnDestroy() {
    if (this.alertTimer) clearTimeout(this.alertTimer);
    if (this.alertEl?.parentNode) this.alertEl.parentNode.removeChild(this.alertEl);
  }

  goToGetStarted() {
    this.router.navigate(['/create-survey/get-started']);
  }

  private showLaunchAlert() {
    const el = document.createElement('div');
    el.className = 'launch-alert';
    el.id = 'launchAlert';
    el.innerHTML =
      '<svg class="launch-alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7 12l4 4 6-7"/></svg>' +
      '<div class="launch-alert-body">' +
        '<div class="launch-alert-title">New Survey has been created successfully</div>' +
        '<span class="launch-alert-link">View and manage the survey</span>' +
      '</div>' +
      '<button class="launch-alert-close" title="Dismiss">&times;</button>';
    document.body.appendChild(el);
    this.alertEl = el;

    el.querySelector('.launch-alert-link')?.addEventListener('click', () => {
      this.router.navigate(['/create-survey']);
    });
    el.querySelector('.launch-alert-close')?.addEventListener('click', () => {
      this.dismissAlert();
    });

    this.alertTimer = setTimeout(() => this.dismissAlert(), 6000);
  }

  private dismissAlert() {
    if (!this.alertEl) return;
    this.alertEl.classList.add('hiding');
    setTimeout(() => {
      if (this.alertEl?.parentNode) this.alertEl.parentNode.removeChild(this.alertEl);
      this.alertEl = null;
    }, 260);
  }
}
