import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ContentChild,
} from '@angular/core';

@Component({
    selector: 'v-dropdown-menu-content',
    template: `
    <div
      #contentContainer
      [class]="contentClasses"
      [attr.data-state]="'open'"
      [attr.data-side]="'bottom'"
      role="menu"
      tabindex="-1"
    >
      <ng-content></ng-content>
    </div>
  `,
    standalone: true,
    imports: []
})
export class VDropdownMenuContent implements AfterViewInit, OnDestroy {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() elevation: 'sm' | 'md' | 'lg' = 'md';
  @ViewChild('contentContainer', { static: true }) contentContainer!: ElementRef<HTMLElement>;

  private originalContent: HTMLElement | null = null;

  constructor(public elementRef: ElementRef<HTMLElement>) {}

  get contentClasses() {
    return `v-dropdown-menu-content dmc-${this.size} dmc-elevation-${this.elevation}`;
  }

  setContent(content: HTMLElement) {
    this.originalContent = content;
    if (this.contentContainer) {
      this.updateContent();
    }
  }

  ngAfterViewInit() {
    if (this.originalContent) {
      this.updateContent();
    }
  }

  private updateContent() {
    if (!this.originalContent || !this.contentContainer) return;

    this.contentContainer.nativeElement.innerHTML = '';

    while (this.originalContent.firstChild) {
      this.contentContainer.nativeElement.appendChild(this.originalContent.firstChild);
    }
  }

  ngOnDestroy() {}
}
