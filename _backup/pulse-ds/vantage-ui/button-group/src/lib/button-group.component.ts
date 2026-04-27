import {
  Component,
  ContentChild,
  Input,
  Renderer2,
} from '@angular/core';

import { VcButton } from '@vantagecircle/vantage-ui/button';

@Component({
    selector: 'vc-button-group',
    standalone: true,
    imports: [],
    templateUrl: './button-group.component.html',
    styleUrl: './button-group.component.scss'
})
export class VcButtonGroup {
  @Input() className!: string;
  @ContentChild(VcButton) button!: VcButton;

  constructor(private renderer: Renderer2) {}
}
