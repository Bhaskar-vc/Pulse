import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcDropdownMenuItem, VcDropdownMenuItemClickEvent } from './dropdown.interface';
import { UniqueIdService } from '@vantagecircle/vantage-ui/core';
import { VcDropdownItem } from './dropdown-item/dropdown-item.component';
import { dropdownAnimation } from './dropdown.animations';

@Component({
    standalone: true,
    selector: 'vc-dropdown',
    imports: [CommonModule, VcDropdownItem],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
    animations: [dropdownAnimation]
})
export class VcDropdown implements OnDestroy {
  /**
   * List of Dropdown option
   * @group Props
   */
  @Input() items?: Array<VcDropdownMenuItem>;

  /**
   * Dropdown option template
   * @group Props
   */
  @Input() itemTemplate?: TemplateRef<unknown>;

  /**
   * Width of the dropdown.
   * @group Props
   */
  @Input() width: number = 240;

  /**
   * To specify whether to show leading icon in each dropdown item.
   * @group Props
   */
  @Input() showIcon: boolean = false;

  /**
   * To specify whether to show trailing shortcut in each dropdown item.
   * @group Props
   */
  @Input() showShortcut: boolean = false;

  /**
   * Callback to invoke on item select from dropdown.
   * @group Emits
   */
  @Output() onClickMenuItem: EventEmitter<VcDropdownMenuItemClickEvent> =
    new EventEmitter<VcDropdownMenuItemClickEvent>();

  @ViewChild('vcDropdownMenu') vcDropdownMenuViewChild!: ElementRef;
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;

  elementId: string;
  selectedItem: VcDropdownMenuItem | undefined;
  activeIndex: number = -1;
  showMenu: boolean = false;

  calculateDropdownPosTimeoutId!: number;
  showDropdownTimeoutId!: number;

  constructor(
    private _el: ElementRef,
    private _uidService: UniqueIdService,
  ) {
    this.elementId = this._uidService.generateUniqueId('vc-dropdown');
  }

  get nativeElement(): HTMLElement {
    return this._el.nativeElement;
  }

  isClickInside(event: Event): boolean {
    return this._el.nativeElement.contains(event.target);
  }

  toggleMenu(value: boolean, triggerOrigin?: HTMLElement): void {
    this.activeIndex = -1;

    if (value === true && triggerOrigin) {
      this.displayMenu(triggerOrigin);
    } else {
      this.showMenu = false;
    }
  }

  getMenuWidth(): number {
    return this.width;
  }

  resetActiveIndex(): void {
    this.activeIndex = -1;
  }

  displayMenu(triggerOrigin: HTMLElement): void {
    // this.showMenu = true;
    // if (this.dropdownViewChild) {
    //   const dropdownElement = this.dropdownViewChild
    //     .nativeElement as HTMLElement;
    //   // Set dropdown opacity to 0.
    //   this._renderer.setStyle(dropdownElement, 'opacity', '0');
    //   // Calculate the position to display the dropdown.
    //   if (triggerOrigin) {
    //     this.calculateDropdownPosTimeoutId = setTimeout(() => {
    //       this.calculateDropdownPosition(triggerOrigin);
    //     }, 1);
    //   }
    //   // Display the dropdown after 1ms delay.
    //   this.showDropdownTimeoutId = setTimeout(() => {
    //     this._renderer.setStyle(dropdownElement, 'opacity', '1');
    //   }, 1);
    // }
  }

  handleEnterPress(event: Event): void {
    event.preventDefault();

    if (this.items && this.items.length > 0 && this.activeIndex > -1) {
      this.handleSelectItem(event, this.items[this.activeIndex]);
    }
  }

  handleSelectItem(event: Event, item: VcDropdownMenuItem): void {
    event.preventDefault();

    this.selectedItem = item;
    this.toggleMenu(false);
    this.onClickMenuItem.emit({
      target: this.selectedItem,
      originalEvent: event,
    });
  }

  hoverUp(event: Event): void {
    event.preventDefault();

    if (this.items && this.items.length > 0) {
      if (this.activeIndex == -1) {
        this.activeIndex = 0;
      }

      this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
    }
  }

  hoverDown(event: Event): void {
    event.preventDefault();

    if (this.items && this.items.length > 0) {
      this.activeIndex = (this.activeIndex + 1) % this.items.length;
    }
  }

  ngOnDestroy(): void {
    if (this.calculateDropdownPosTimeoutId) {
      clearTimeout(this.calculateDropdownPosTimeoutId);
    }

    if (this.showDropdownTimeoutId) {
      clearTimeout(this.showDropdownTimeoutId);
    }
  }
}
