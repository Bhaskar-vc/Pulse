import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { VcSelectEvent, VcSelectOption } from '../listbox.types';
import { CommonModule } from '@angular/common';
import { Highlightable, ListKeyManagerOption } from '@angular/cdk/a11y';
import { VcCheckbox } from '@vantagecircle/vantage-ui/checkbox';

enum VcOptionType {
  DEFAULT = 'default',
  ICON_LEADING = 'icon-leading',
  AVATAR_LEADING = 'avatar-leading',
  DOT_LEADING = 'dot-leading',
}

@Component({
    standalone: true,
    selector: 'vc-option',
    imports: [CommonModule, VcCheckbox],
    templateUrl: './option.component.html',
    styleUrl: './option.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VcOption implements Highlightable, ListKeyManagerOption, OnDestroy {
  /**
   * Value of the option.
   * @group Props
   */
  @Input() value!: VcSelectOption;

  /**
   * Type of option.
   * @group Props
   */
  @Input() type: VcOptionType | string | undefined = VcOptionType.DEFAULT;

  /**
   * To specify if the option is active
   * @group Props
   */
  // private _active: boolean = false;

  // @Input()
  // set active(value: boolean) {
  //   this._active = value;
  //   if (value) {
  //     this.scrollOptionIntoView();
  //   }
  // }

  // get active(): boolean {
  //   return this._active;
  // }
  @Input() active: boolean = false;

  /**
   * To specify if the option is to scrolled to view
   * @group Props
   */
  private _scrollToView: boolean = false;

  @Input()
  set scrollToView(value: boolean) {
    this._scrollToView = value;
    if (value) {
      this.scrollOptionIntoView();
    }
  }

  get scrollToView(): boolean {
    return this._scrollToView;
  }

  /**
   * To specify if the option is selected
   * @group Props
   */
  @Input() selected: boolean = false;

  /**
   * To specify if the option is selected
   * @group Props
   */
  @Input() multiple: boolean = false;

  // /**
  //  * Scroll behaviour
  //  * @group Props
  //  */
  // @Input() scrollBehaviour: ScrollBehavior | undefined;

  // /**
  //  * Scroll position
  //  * @group Props
  //  */
  // @Input() scrollPosition: ScrollLogicalPosition | undefined;

  /**
   * To specify if loading animation is to be shown (in case of asynchronous)
   * @group Props
   */
  @Input() loading: boolean = false;

  /**
   * Color theme.
   * @group Props
   */
  @Input() theme: 'light' | 'dark' = 'light';
  
  /**
   * Component style.
   * @group Props
   */
  @Input() componentStyle: string = '';

  // /**
  //  * To specify if the dropdown button is disabled or not
  //  * @group Props
  //  */
  // @Input() disabled: boolean = false;

  /**
   * Callback to invoke when user selects an option.
   * @group Emits
   */
  @Output() onSelect: EventEmitter<VcSelectEvent> = new EventEmitter<VcSelectEvent>();

  hovered: boolean = false;
  // selected: boolean = false;
  // multiple: boolean = false;
  scrollTimerId!: number;

  constructor(public elementRef: ElementRef) {}

  getValue(): VcSelectOption {
    return this.value;
  }

  getLabel(): string {
    return this.value.text;
  }

  isSelected(): boolean {
    return this.selected;
  }

  setHovered(value: boolean): void {
    this.hovered = value;
  }

  setSelected(value: boolean): void {
    this.selected = value;
  }

  toggleSelection(): void {
    this.selected = !this.selected;
  }

  setActiveStyles(): void {
    this.hovered = true;
  }

  setInactiveStyles(): void {
    this.hovered = false;
  }

  handleClick(event: Event): void {
    event.preventDefault();

    if (this.value && !this.value.disabled && !this.loading) {
      const data: VcSelectEvent = {
        selected: this.value,
        originalEvent: event,
      };

      this.onSelect.emit(data);
    }
  }

  scrollOptionIntoView(): void {
    this.scrollTimerId = setTimeout(() => {
      (this.elementRef.nativeElement as HTMLElement).scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
      });
    }, 0);

    // const element = this.elementRef.nativeElement as HTMLElement;
    // const listbox = element.parentElement;

    // if (listbox) {
    // const listboxRect = listbox.getBoundingClientRect();
    // const elementRect = element.getBoundingClientRect();
    // if (elementRect.bottom > listboxRect.bottom) {
    //   listbox.scrollTop += elementRect.bottom - listboxRect.bottom;
    // } else if (elementRect.top < listboxRect.top) {
    //   listbox.scrollTop -= listboxRect.top - elementRect.top;
    // }
    // setTimeout(() => {
    //   listbox.scrollTop = this._getOptionScrollPosition(
    //     element.offsetTop,
    //     element.offsetHeight,
    //     listbox.scrollTop,
    //     listbox.offsetHeight,
    //   );
    // }, 0);
    // }
  }

  // private _getOptionScrollPosition(
  //   optionOffset: number,
  //   optionHeight: number,
  //   currentScrollPosition: number,
  //   panelHeight: number,
  // ): number {
  //   const extraSpace = optionHeight * 1.2;

  //   if (optionOffset < currentScrollPosition) {
  //     return Math.max(0, optionOffset - extraSpace);
  //   }

  //   if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
  //     return Math.max(
  //       0,
  //       optionOffset + optionHeight - panelHeight + extraSpace,
  //     );
  //   }

  //   return currentScrollPosition;
  // }

  ngOnDestroy(): void {
    if (this.scrollTimerId) {
      clearTimeout(this.scrollTimerId);
    }
  }
}
