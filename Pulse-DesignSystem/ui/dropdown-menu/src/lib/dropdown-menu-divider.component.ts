import { Component, Input } from '@angular/core';

@Component({
    selector: 'v-dropdown-menu-divider',
    template: ` <div [class]="dividerClasses" role="separator"></div> `,
    standalone: true,
    imports: []
})
export class VDropdownMenuDivider {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() spacing: 'none' | 'sm' | 'md' | 'lg' = 'md';

  get dividerClasses() {
    return [
      'v-dropdown-menu-divider',
      `dmd-spacing-${this.spacing}`,
      this.orientation === 'vertical' ? 'dmd-vertical' : '',
    ].filter(Boolean).join(' ');
  }
}
