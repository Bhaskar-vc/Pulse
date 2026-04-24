import { Component, Input } from '@angular/core';

import { dropdownMenuGroupVariants } from './dropdown-menu.variants';

@Component({
    selector: 'v-dropdown-menu-group',
    template: `
    <div [class]="groupClasses" role="group">
      <ng-content></ng-content>
    </div>
  `,
    standalone: true,
    imports: []
})
export class VDropdownMenuGroup {
  @Input() spacing: 'none' | 'sm' | 'md' | 'lg' = 'md';

  get groupClasses() {
    return dropdownMenuGroupVariants({ spacing: this.spacing });
  }
}
