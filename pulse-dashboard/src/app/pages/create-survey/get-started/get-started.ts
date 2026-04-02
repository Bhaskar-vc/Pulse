import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './get-started.html',
  styleUrl: './get-started.scss',
})
export class GetStartedComponent {
  @ViewChild('surveyName') surveyNameRef!: ElementRef<HTMLInputElement>;

  nameError = false;

  constructor(private router: Router) {}

  onNameInput(): void {
    const value = this.surveyNameRef.nativeElement.value.trim();
    if (value.length > 0) {
      this.nameError = false;
    }
  }

  proceed(): void {
    const value = this.surveyNameRef.nativeElement.value.trim();
    if (!value) {
      this.nameError = true;
      this.surveyNameRef.nativeElement.focus();
      return;
    }
    this.router.navigate(['/create-survey/select-questions']);
  }
}
