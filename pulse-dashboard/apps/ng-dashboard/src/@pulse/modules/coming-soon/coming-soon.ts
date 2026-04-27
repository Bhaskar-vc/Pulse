import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-coming-soon',
  template: `
    <div class="shadow-rect shadow-rect-1"></div>
    <div class="shadow-rect shadow-rect-2"></div>
    <div class="main-card">
    <div class="cs-wrap">
      <div class="cs-icon">
        <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
          <circle cx="32" cy="32" r="28" stroke="#e9d5ff" stroke-width="2"/>
          <circle cx="32" cy="32" r="18" stroke="#c4b5fd" stroke-width="2"/>
          <path d="M32 22v10l7 4" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1 class="cs-title">Coming Soon</h1>
      <p class="cs-desc">We're working on this page. It will be available shortly.</p>
      <button class="cs-btn" (click)="goBack()">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="10 3 5 8 10 13"/></svg>
        Go back
      </button>
    </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; position: relative; }
    .main-card { display: flex; align-items: center; justify-content: center; height: 100%; }
    .cs-wrap { text-align: center; padding: 48px 24px; }
    .cs-icon { margin-bottom: 24px; opacity: 0.9; }
    .cs-title { font-size: 24px; font-weight: 600; color: #29294c; margin-bottom: 8px; }
    .cs-desc { font-size: 14px; color: #707087; margin-bottom: 28px; max-width: 320px; line-height: 1.6; }
    .cs-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 18px; border-radius: 8px; border: 1px solid #d0d5dd;
      background: #fff; font-size: 14px; font-weight: 500; color: #344054;
      cursor: pointer; font-family: inherit; transition: border-color .15s, box-shadow .15s;
    }
    .cs-btn:hover { border-color: #9e77ed; box-shadow: 0 0 0 3px rgba(127,86,217,0.1); }
  `],
})
export class ComingSoonComponent {
  constructor(private router: Router) {}
  goBack() { history.back(); }
}
