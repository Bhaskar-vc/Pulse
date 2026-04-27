import { Component, Input } from '@angular/core';

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
    return [
      'v-dropdown-menu-label',
      `dml-${this.size}`,
      this.variant !== 'default' ? `dml-${this.variant}` : '',
    ].filter(Boolean).join(' ');
  }
}
