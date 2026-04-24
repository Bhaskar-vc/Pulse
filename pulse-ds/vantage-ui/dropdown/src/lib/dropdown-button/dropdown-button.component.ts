import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'vc-dropdown-button',
    standalone: true,
    imports: [],
    templateUrl: './dropdown-button.component.html',
    styleUrl: './dropdown-button.component.scss'
})
export class VcDropdownButton {
  @Input() type: 'default' | 'icon' = 'default';
  @Input() label: string | undefined;
  @Input() title: string = 'Dropdown';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
  @Input() icon: string | undefined;
  @Input() iconLeft: string | undefined;
  @Input() showLabel: boolean = false;
  // @Input() avatarUrl: string | undefined;

  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  constructor() {}

  getButtonType(): string {
    return this.type;
  }

  handleClick(event: Event): void {
    this.onClick.emit(event);
  }
}
