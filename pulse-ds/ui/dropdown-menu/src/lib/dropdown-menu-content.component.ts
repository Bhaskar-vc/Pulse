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

import { dropdownMenuContentVariants } from './dropdown-menu.variants';

@Component({
    selector: 'v-dropdown-menu-content',
    template: `
    <!-- <ng-template><ng-content></ng-content></ng-template> -->
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
  // @ContentChild(TemplateRef, { static: true }) templateRef!: TemplateRef<unknown>;
  @ViewChild('contentContainer', { static: true }) contentContainer!: ElementRef<HTMLElement>;

  private originalContent: HTMLElement | null = null;

  constructor(public elementRef: ElementRef<HTMLElement>) {}

  get contentClasses() {
    return dropdownMenuContentVariants({
      size: this.size,
      elevation: this.elevation,
    });
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

    // Clear existing content
    this.contentContainer.nativeElement.innerHTML = '';

    // Move children from the cloned content to the overlay
    while (this.originalContent.firstChild) {
      this.contentContainer.nativeElement.appendChild(this.originalContent.firstChild);
    }
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}
