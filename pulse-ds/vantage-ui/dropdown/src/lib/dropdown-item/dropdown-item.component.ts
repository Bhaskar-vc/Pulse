import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { VcDropdownMenuItem } from '../dropdown.interface';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'vc-dropdown-item',
    imports: [CommonModule],
    templateUrl: './dropdown-item.component.html',
    styleUrl: './dropdown-item.component.scss'
})
export class VcDropdownItem {
  /**
   * Dropdown item.
   * @group Props
   */
  @Input() item: VcDropdownMenuItem | undefined;

  /**
   * Custom dropdown item template.
   * @group Props
   */
  @Input() customTemplate: TemplateRef<unknown> | undefined;

  /**
   * VC icon class.
   * @group Props
   */
  @Input() icon: string | undefined;

  /**
   * To specify whether to show leading icon in each dropdown item.
   * @group Props
   */
  @Input() showIcon: boolean = false;

  /**
   * Shortcut string.
   * @group Props
   */
  @Input() shortcut: string | undefined;

  /**
   * To specify whether to show trailing shortcut in each dropdown item.
   * @group Props
   */
  @Input() showShortcut: boolean = false;

  /**
   * To specify whether the dropdown item should be hovered or not.
   * @group Props
   */
  @Input() hovered: boolean | undefined;

  /**
   * Callback to invoke when user clicks on a dropdown item.
   * @group Emits
   */
  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  handleClick(event: Event): void {
    this.onClick.emit(event);
  }
}
