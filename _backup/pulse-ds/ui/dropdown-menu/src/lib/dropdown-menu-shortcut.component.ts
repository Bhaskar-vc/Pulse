import { Component, Input } from '@angular/core';

import { dropdownMenuShortcutVariants } from './dropdown-menu.variants';

@Component({
    selector: 'v-dropdown-menu-shortcut',
    template: `
    <span [class]="shortcutClasses">
      <ng-content></ng-content>
    </span>
  `,
    standalone: true,
    imports: []
})
export class VDropdownMenuShortcut {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'default' | 'muted' | 'accent' = 'default';

  get shortcutClasses() {
    return dropdownMenuShortcutVariants({
      size: this.size,
      variant: this.variant,
    });
  }
}
