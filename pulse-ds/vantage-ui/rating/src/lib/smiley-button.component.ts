import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'lib-smiley-button',
    imports: [CommonModule],
    templateUrl: './smiley-button.component.html',
    styleUrl: './smiley-button.component.scss'
})
export class SmileyButtonComponent {
  @Input() buttonValue: number = 0;
  @Input() selected: boolean = false;
  @Output() onClick: EventEmitter<number> = new EventEmitter();

  handleClick() {
    this.onClick.emit(this.buttonValue);
  }
}
