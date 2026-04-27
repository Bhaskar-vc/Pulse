import { Component, Input } from '@angular/core';

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
    return [
      'v-dropdown-menu-shortcut',
      this.size === 'lg' ? 'dmsc-lg' : '',
      this.variant !== 'default' ? `dmsc-${this.variant}` : '',
    ].filter(Boolean).join(' ');
  }
}
