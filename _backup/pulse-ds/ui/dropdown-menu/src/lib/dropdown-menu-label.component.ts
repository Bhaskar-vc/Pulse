import { Component, Input } from '@angular/core';

import { dropdownMenuLabelVariants } from './dropdown-menu.variants';

@Component({
    selector: 'v-dropdown-menu-label',
    template: `
    <div [class]="labelClasses" role="none">
      <ng-content></ng-content>
    </div>
  `,
    standalone: true,
    imports: []
})
export class VDropdownMenuLabel {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'default' | 'muted' | 'accent' = 'default';

  get labelClasses() {
    return dropdownMenuLabelVariants({
      size: this.size,
      variant: this.variant,
    });
  }
}
