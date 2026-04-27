import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'vc-card',
    imports: [CommonModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class VcCard {
  @Input() fullWidth: boolean = false;

  getCardClass() {
    return {
      'full-width': this.fullWidth,
    };
  }
}
