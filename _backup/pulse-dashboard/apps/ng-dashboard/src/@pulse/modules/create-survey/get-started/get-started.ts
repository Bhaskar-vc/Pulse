import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-get-started',
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
