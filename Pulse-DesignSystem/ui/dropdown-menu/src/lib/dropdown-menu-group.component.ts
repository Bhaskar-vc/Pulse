import { Component, Input } from '@angular/core';

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
    return `v-dropdown-menu-group dmg-${this.spacing}`;
  }
}
