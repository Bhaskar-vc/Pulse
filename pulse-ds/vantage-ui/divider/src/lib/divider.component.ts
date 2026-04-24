import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'vc-divider',
    imports: [CommonModule],
    templateUrl: './divider.component.html',
    styleUrl: './divider.component.scss'
})
export class VcDivider {
  @Input() type: 'horizontal' | 'vertical' | string = 'horizontal';

  @Input() dashed: boolean = false;

  @Input() title: string | undefined;

  @Input() orientation: 'left' | 'center' | 'right' | string | undefined;
}
