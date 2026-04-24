import { Component } from '@angular/core';


@Component({
    selector: 'vc-star-icon-filled',
    standalone: true,
    imports: [],
    templateUrl: './star-icon-filled.component.html',
    styleUrl: './star-icon-filled.component.scss'
})
export class VcStarIconFilled {
  onHover: boolean = false;

  onMouseHover() {
    this.onHover = true;
  }

  onMoueLeave() {
    this.onHover = false;
  }
}
