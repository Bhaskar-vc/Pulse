import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface Question {
  id: number;
  text: string;
  type: string;
  category?: string;
}

interface Category {
  name: string;
  questions: Question[];
}

@Component({
  selector: 'app-select-questions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './select-questions.html',
  styleUrl: './select-questions.scss',
})
export class SelectQuestionsComponent {
  categories: Category[] = [
    {
      name: 'Recognition',
      questions: [
        { id: 1, text: 'My organization encourages employees to give recognition to one another', type: 'Rating Scale (1-5)' },
        { id: 2, text: 'If I do great work, I know that it will be recognised', type: 'Rating Scale (1-5)' },
        { id: 3, text: 'How well does your organization support your overall wellbeing and mental health?', type: 'MCQ' },
      ],
    },
    {
      name: 'Employee Satisfaction',
      questions: [
        { id: 4, text: 'Overall, how satisfied are you with working at this organization?', type: 'Rating Scale (1-5)' },
        { id: 5, text: 'I feel proud to work for this organization.', type: 'Rating Scale (1-5)' },
        { id: 6, text: 'I would recommend this organization as a great place to work.', type: 'Scale (1-10)' },
        { id: 7, text: 'My work gives me a feeling of personal accomplishment.', type: 'Rating Scale (1-5)' },
        { id: 8, text: 'What is one thing that would improve your work experience?', type: 'Text' },
      ],
    },
    {
      name: 'Compensation and Benefits',
      questions: [
        { id: 9, text: 'I believe my pay is fair for the work I do.', type: 'Rating Scale (1-5)' },
        { id: 10, text: 'The benefits package offered by my organization meets my needs.', type: 'Rating Scale (1-5)' },
        { id: 11, text: 'Which benefit matters most to you?', type: 'MCQ' },
      ],
    },
    {
      name: 'Wellness',
      questions: [
        { id: 12, text: 'My organization supports my physical and mental wellbeing.', type: 'Rating Scale (1-5)' },
        { id: 13, text: 'I feel I have enough energy at the end of a typical workday.', type: 'Yes/No' },
      ],
    },
    {
      name: 'Manager Effectiveness',
      questions: [
        { id: 14, text: 'My manager provides me with regular, useful feedback.', type: 'Rating Scale (1-5)' },
        { id: 15, text: 'My manager genuinely cares about my career development.', type: 'Rating Scale (1-5)' },
        { id: 16, text: 'My manager creates an environment where I feel safe to speak up.', type: 'Rating Scale (1-5)' },
        { id: 17, text: 'How effective is your manager at removing obstacles for your team?', type: 'Scale (1-10)' },
        { id: 18, text: 'My manager clearly communicates team goals and expectations.', type: 'Rating Scale (1-5)' },
      ],
    },
    {
      name: 'Work-Life Balance',
      questions: [
        { id: 19, text: 'I am able to maintain a healthy balance between my work and personal life.', type: 'Rating Scale (1-5)' },
        { id: 20, text: 'My workload is manageable on a day-to-day basis.', type: 'Rating Scale (1-5)' },
        { id: 21, text: 'I am able to disconnect from work outside of working hours.', type: 'Yes/No' },
        { id: 22, text: 'How often do you work beyond your contracted hours?', type: 'MCQ' },
      ],
    },
    {
      name: 'Diversity & Inclusion',
      questions: [
        { id: 23, text: 'People from all backgrounds are treated fairly in this organization.', type: 'Rating Scale (1-5)' },
        { id: 24, text: 'I feel I can be myself at work without fear of judgment.', type: 'Rating Scale (1-5)' },
        { id: 25, text: 'My organization takes diversity and inclusion seriously.', type: 'Rating Scale (1-5)' },
        { id: 26, text: 'Have you witnessed or experienced discrimination at work in the past year?', type: 'Yes/No' },
      ],
    },
    {
      name: 'Learning & Development',
      questions: [
        { id: 27, text: 'I have access to the learning and development resources I need.', type: 'Rating Scale (1-5)' },
        { id: 28, text: 'My organization invests in my professional growth.', type: 'Rating Scale (1-5)' },
        { id: 29, text: 'I have had meaningful career conversations with my manager this year.', type: 'Yes/No' },
        { id: 30, text: 'Which learning format do you prefer?', type: 'MCQ' },
      ],
    },
    {
      name: 'Team Collaboration',
      questions: [
        { id: 31, text: 'My team works well together to achieve common goals.', type: 'Rating Scale (1-5)' },
        { id: 32, text: 'I trust my team members to do their part.', type: 'Rating Scale (1-5)' },
        { id: 33, text: 'Communication within my team is clear and open.', type: 'Rating Scale (1-5)' },
        { id: 34, text: 'My team celebrates wins and learns from setbacks together.', type: 'Rating Scale (1-5)' },
        { id: 35, text: 'How would you rate cross-team collaboration in your organization?', type: 'Scale (1-10)' },
      ],
    },
  ];

  selectedIds = new Set<number>();
  collapsedCategories = new Set<string>([
    'Employee Satisfaction',
    'Compensation and Benefits',
    'Wellness',
    'Manager Effectiveness',
    'Work-Life Balance',
    'Diversity & Inclusion',
    'Learning & Development',
    'Team Collaboration',
  ]);
  expandedSelCards = new Set<number>();
  searchQuery = '';
  previewCollapsed = true;
  previewIndex = 0;
  previewSelectedRating: number | null = null;

  constructor(private router: Router) {}

  // --- Helpers ---

  getAllQuestions(): (Question & { category: string })[] {
    const result: (Question & { category: string })[] = [];
    this.categories.forEach((c) =>
      c.questions.forEach((q) => result.push({ ...q, category: c.name }))
    );
    return result;
  }

  getFilteredQuestions(cat: Category): Question[] {
    const q = this.searchQuery.toLowerCase();
    if (!q) return cat.questions;
    return cat.questions.filter(
      (x) =>
        x.text.toLowerCase().includes(q) ||
        x.type.toLowerCase().includes(q)
    );
  }

  get visibleQuestionCount(): number {
    let count = 0;
    this.categories.forEach((cat) => {
      count += this.getFilteredQuestions(cat).length;
    });
    return count;
  }

  get selectedQuestions(): (Question & { category: string })[] {
    return this.getAllQuestions().filter((q) => this.selectedIds.has(q.id));
  }

  get selectedCategoryCount(): number {
    const cats = new Set(this.selectedQuestions.map((q) => q.category));
    return cats.size;
  }

  get estimatedTime(): number {
    return Math.round(this.selectedIds.size * 20);
  }

  get hasSelectedQuestions(): boolean {
    return this.selectedIds.size > 0;
  }

  get allAdded(): boolean {
    const all = this.getAllQuestions();
    return all.length > 0 && all.every((q) => this.selectedIds.has(q.id));
  }

  badgeClass(type: string): string {
    if (type.startsWith('Rating') || type.startsWith('Scale')) return 'tag-rating';
    if (type === 'MCQ') return 'tag-mcq';
    if (type === 'Text') return 'tag-text-type';
    if (type === 'Yes/No') return 'tag-yesno';
    return 'tag-scale';
  }

  isSelected(id: number): boolean {
    return this.selectedIds.has(id);
  }

  isCategoryCollapsed(name: string): boolean {
    return this.collapsedCategories.has(name);
  }

  isSelCardExpanded(id: number): boolean {
    return this.expandedSelCards.has(id);
  }

  // --- Actions ---

  toggleCategory(name: string): void {
    if (this.collapsedCategories.has(name)) {
      // Opening this one - collapse all others
      this.categories.forEach((c) => this.collapsedCategories.add(c.name));
      this.collapsedCategories.delete(name);
    } else {
      this.collapsedCategories.add(name);
    }
  }

  toggleQuestion(id: number): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
      const remaining = this.selectedQuestions.length;
      if (this.previewIndex >= remaining) {
        this.previewIndex = Math.max(0, remaining - 1);
      }
    } else {
      this.selectedIds.add(id);
      const all = this.selectedQuestions;
      this.previewIndex = all.findIndex((q) => q.id === id);
      if (this.previewIndex < 0) this.previewIndex = all.length - 1;
    }
    this.previewSelectedRating = null;
  }

  toggleSelCard(id: number): void {
    if (this.expandedSelCards.has(id)) {
      this.expandedSelCards.delete(id);
    } else {
      this.expandedSelCards.add(id);
      const all = this.selectedQuestions;
      const idx = all.findIndex((q) => q.id === id);
      if (idx >= 0) {
        this.previewIndex = idx;
      }
    }
  }

  addAllQuestions(): void {
    if (this.allAdded) {
      this.getAllQuestions().forEach((q) => this.selectedIds.delete(q.id));
    } else {
      this.getAllQuestions().forEach((q) => this.selectedIds.add(q.id));
    }
    this.previewIndex = 0;
    this.previewSelectedRating = null;
  }

  clearAllQuestions(): void {
    if (!this.selectedIds.size) return;
    this.selectedIds.clear();
    this.previewIndex = 0;
    this.previewSelectedRating = null;
  }

  onSearchInput(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  togglePreview(): void {
    this.previewCollapsed = !this.previewCollapsed;
  }

  previewNav(dir: number): void {
    const all = this.selectedQuestions;
    this.previewIndex = Math.max(0, Math.min(all.length - 1, this.previewIndex + dir));
    this.previewSelectedRating = null;
  }

  selectRating(val: number): void {
    this.previewSelectedRating = val;
  }

  get currentPreviewQuestion(): (Question & { category: string }) | null {
    const all = this.selectedQuestions;
    if (!all.length) return null;
    if (this.previewIndex >= all.length) this.previewIndex = all.length - 1;
    return all[this.previewIndex];
  }

  get previewProgress(): number {
    const all = this.selectedQuestions;
    if (!all.length) return 0;
    return Math.round(((this.previewIndex + 1) / all.length) * 100);
  }

  get previewTotal(): number {
    return this.selectedQuestions.length;
  }

  get previewRatingCount(): number {
    const q = this.currentPreviewQuestion;
    if (!q) return 5;
    return q.type.includes('10') ? 10 : 5;
  }

  get isPreviewRatingType(): boolean {
    const q = this.currentPreviewQuestion;
    if (!q) return false;
    return q.type.startsWith('Rating') || q.type.startsWith('Scale');
  }

  get isPreviewMCQ(): boolean {
    const q = this.currentPreviewQuestion;
    if (!q) return false;
    return q.type === 'MCQ';
  }

  get isPreviewYesNo(): boolean {
    const q = this.currentPreviewQuestion;
    if (!q) return false;
    return q.type === 'Yes/No';
  }

  get isPreviewText(): boolean {
    const q = this.currentPreviewQuestion;
    if (!q) return false;
    return q.type === 'Text';
  }

  getRatingArray(): number[] {
    return Array.from({ length: this.previewRatingCount }, (_, i) => i + 1);
  }

  proceed(): void {
    if (this.selectedIds.size > 0) {
      this.router.navigate(['/create-survey/configure']);
    }
  }
}
