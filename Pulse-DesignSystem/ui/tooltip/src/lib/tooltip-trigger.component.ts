import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { twMerge } from 'tailwind-merge';

@Component({
    selector: 'v-tooltip-trigger',
    standalone: true,
    imports: [],
    template: `
    <div #triggerElement [class]="getTriggerContainerClass">
      <ng-content></ng-content>
    </div>
  `,
    styles: [`
    :host {
      display: inline-flex;
    }
  `]
})
export class VTooltipTrigger {
  @Input() customClass: string = '';

  @ViewChild('triggerElement', { static: true }) triggerElement!: ElementRef<HTMLElement>;

  get element(): HTMLElement {
    return this.triggerElement.nativeElement;
  }

  get getTriggerContainerClass(): string {
    return twMerge('inline-flex', this.customClass);
  }
}
