import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-add-custom-question',
  templateUrl: './add-custom-question.html',
  styleUrl: './add-custom-question.scss',
})
export class AddCustomQuestionComponent {
  @ViewChild('questionText') questionTextRef!: ElementRef<HTMLInputElement>;

  questionTypes = [
    'Multiple Choice (Single select)',
    'Multiple Choice (Multi select)',
    'Rating Scale',
    'Open Ended',
    'Yes / No',
  ];

  categories = [
    'Employee Satisfaction',
    'Work Environment',
    'Leadership',
    'Career Growth',
    'Wellbeing',
  ];

  availableLanguages = [
    { lang: 'Hindi', native: '\u0939\u093F\u0928\u094D\u0926\u0940' },
    { lang: 'French', native: 'Fran\u00E7ais' },
    { lang: 'Chinese', native: '\u4E2D\u570B\u4EBA' },
    { lang: 'Spanish', native: 'Espa\u00F1ol' },
    { lang: 'German', native: 'Deutsch' },
    { lang: 'Japanese', native: '\u65E5\u672C\u8A9E' },
  ];

  selectedType = 'Multiple Choice (Single select)';
  selectedCategory = 'Employee Satisfaction';
  questionValue = '';
  isSaveDisabled = true;

  options: { value: string; placeholder: string }[] = [
    { value: '', placeholder: 'Option 1' },
    { value: '', placeholder: 'Option 2' },
  ];

  selectedLanguages: { lang: string; native: string }[] = [];
  langDropOpen = false;
  activeLang = 'English';

  previewQuestionText = 'Start typing a question\u2026';
  previewQuestionEmpty = true;

  constructor(private router: Router) {}

  // -- Question type --
  onTypeChange(event: Event): void {
    this.selectedType = (event.target as HTMLSelectElement).value;
    this.updatePreview();
  }

  // -- Category --
  onCategoryChange(event: Event): void {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
  }

  // -- Question input --
  onQuestionInput(event: Event): void {
    this.questionValue = (event.target as HTMLInputElement).value;
    this.isSaveDisabled = this.questionValue.trim() === '';
    this.updatePreview();
  }

  // -- Options --
  onOptionInput(index: number, event: Event): void {
    this.options[index].value = (event.target as HTMLInputElement).value;
    this.updatePreview();
  }

  addOption(): void {
    this.options.push({ value: '', placeholder: 'Option ' + (this.options.length + 1) });
    this.updatePreview();
  }

  removeOption(index: number): void {
    if (this.options.length <= 1) return;
    this.options.splice(index, 1);
    this.updatePreview();
  }

  // -- Preview helpers --
  get hasOptionsPreview(): boolean {
    return this.selectedType.includes('Multiple Choice') || this.selectedType.includes('Yes');
  }

  get isRatingScale(): boolean {
    return this.selectedType === 'Rating Scale';
  }

  get isOpenEnded(): boolean {
    return this.selectedType === 'Open Ended';
  }

  updatePreview(): void {
    const q = this.questionValue.trim();
    if (q) {
      this.previewQuestionText = q;
      this.previewQuestionEmpty = false;
    } else {
      this.previewQuestionText = 'Start typing a question\u2026';
      this.previewQuestionEmpty = true;
    }
  }

  getOptionDisplay(index: number): string {
    const val = this.options[index]?.value?.trim();
    return val || 'Option ' + (index + 1);
  }

  // -- Language dropdown --
  toggleLangDropdown(event: Event): void {
    event.stopPropagation();
    this.langDropOpen = !this.langDropOpen;
  }

  isLangSelected(lang: string): boolean {
    return this.selectedLanguages.some((l) => l.lang === lang);
  }

  toggleLang(language: { lang: string; native: string }): void {
    const idx = this.selectedLanguages.findIndex((l) => l.lang === language.lang);
    if (idx >= 0) {
      this.selectedLanguages.splice(idx, 1);
      if (this.activeLang === language.lang) {
        this.activeLang = 'English';
      }
    } else {
      this.selectedLanguages.push(language);
    }
  }

  removeLangTag(lang: string): void {
    this.selectedLanguages = this.selectedLanguages.filter((l) => l.lang !== lang);
    if (this.activeLang === lang) {
      this.activeLang = 'English';
    }
  }

  get allLangs(): string[] {
    return ['English', ...this.selectedLanguages.map((l) => l.lang)];
  }

  get visibleTabs(): string[] {
    return this.allLangs.slice(0, 2);
  }

  get overflowCount(): number {
    return Math.max(0, this.allLangs.length - 2);
  }

  setActiveLang(lang: string): void {
    this.activeLang = lang;
  }

  // -- Footer actions --
  save(): void {
    this.router.navigate(['/create-survey/select-questions']);
  }

  cancel(): void {
    this.router.navigate(['/create-survey/select-questions']);
  }
}
