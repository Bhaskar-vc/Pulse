import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-preview-launch',
  templateUrl: './preview-launch.html',
  styleUrl: './preview-launch.scss',
})
export class PreviewLaunchComponent {
  showExtraQuestions = false;
  showLaunchOverlay = false;

  constructor(private router: Router) {}

  toggleQuestions(): void {
    this.showExtraQuestions = !this.showExtraQuestions;
  }

  launchSurvey(): void {
    this.showLaunchOverlay = true;
  }

  closeLaunch(): void {
    this.showLaunchOverlay = false;
  }

  confirmLaunch(): void {
    localStorage.setItem('surveyLaunched', '1');
    this.router.navigate(['/create-survey']);
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeLaunch();
    }
  }
}
