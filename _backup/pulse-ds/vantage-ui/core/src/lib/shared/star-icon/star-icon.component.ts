import { Component } from '@angular/core';


@Component({
    selector: 'vc-star-icon',
    standalone: true,
    imports: [],
    templateUrl: './star-icon.component.html',
    styleUrl: './star-icon.component.scss'
})
export class VcStarIcon {
  onHover: boolean = false;

  onMouseHover() {
    this.onHover = true;
  }

  onMoueLeave() {
    this.onHover = false;
  }
}
