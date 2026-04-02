import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-preview-launch',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
