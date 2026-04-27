import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'vc-label',
    imports: [CommonModule],
    templateUrl: './label.component.html',
    styleUrl: './label.component.scss'
})
export class VcLabel {
  @Input() type: 'light' | 'dark' | 'bold' = 'dark';
  @Input() text: string = '';
  @Input() tooltip: boolean = false;
  @Input() required: boolean = false;
  @Input() optional: boolean = false;
  @Input() labelFor: string | undefined;

  getStyling() {
    return {
      'type-light': this.type === 'light',
      'type-dark': this.type === 'dark',
      'type-bold': this.type === 'bold',
    };
  }
}
