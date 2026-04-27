import { Component, Input } from '@angular/core';


@Component({
    selector: 'vc-smiley-icons',
    standalone: true,
    imports: [],
    templateUrl: './smiley-icons.component.html',
    styleUrl: './smiley-icons.component.scss'
})
export class VcSmileyIconsComponent {
  @Input() type: number = 0;
}
