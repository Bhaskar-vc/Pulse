import { Component, Input, HostListener, ElementRef, AfterViewInit } from '@angular/core';

import { dropdownMenuItemVariants } from './dropdown-menu.variants';

@Component({
    selector: 'v-dropdown-menu-item',
    template: `
    <div
      [class]="itemClasses"
      [attr.data-disabled]="disabled"
      [attr.data-interactive]="isInteractive"
      role="menuitem"
      tabindex="-1"
    >
      <ng-content></ng-content>
    </div>
  `,
    standalone: true,
    imports: []
})
export class VDropdownMenuItem implements AfterViewInit {
  @Input() disabled = false;
  @Input() inset = false;
  @Input() interactive: boolean | null = null;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'default' | 'destructive' | 'success' = 'default';

  private _isInteractive = true;

  get isInteractive(): boolean {
    if (this.interactive !== null) {
      return this.interactive;
    }
    return this._isInteractive;
  }

  get itemClasses() {
    return dropdownMenuItemVariants({
      inset: this.inset,
      hover: this.isInteractive,
      size: this.size,
      variant: this.variant,
    });
  }

  ngAfterViewInit() {
    if (this.interactive === null) {
      this._isInteractive = this.shouldShowHover();
    }
  }

  private shouldShowHover(): boolean {
    const element = this.elementRef.nativeElement;

    const interactiveSelectors = [
      'v-toggle',
      'v-switch',
      'v-checkbox',
      'v-radio',
      'input[type="checkbox"]',
      'input[type="radio"]',
      'input[type="range"]',
      'select',
      'textarea',
      'button:not([role="menuitem"])',
      '[contenteditable]',
    ];

    for (const selector of interactiveSelectors) {
      if (element.querySelector(selector)) {
        return false;
      }
    }

    return true;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!this.isInteractive) {
      event.stopPropagation();
      return;
    }

    // Close the dropdown menu after item click for interactive items
    const overlayElement = this.elementRef.nativeElement.closest('.cdk-overlay-pane');
    if (overlayElement) {
      const closeEvent = new CustomEvent('dropdown-close', { bubbles: true });
      overlayElement.dispatchEvent(closeEvent);
    }
  }

  constructor(private elementRef: ElementRef) {}
}
