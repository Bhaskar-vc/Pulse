import { Component, Input } from '@angular/core';

import { dropdownMenuDividerVariants } from './dropdown-menu.variants';

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
    return dropdownMenuDividerVariants({
      orientation: this.orientation,
      spacing: this.spacing,
    });
  }
}
