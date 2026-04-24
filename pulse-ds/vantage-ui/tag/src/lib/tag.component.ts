import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'vc-tag',
    imports: [CommonModule],
    templateUrl: './tag.component.html',
    styleUrl: './tag.component.scss'
})
export class VcTag {
  //common properties
  @Input() color:
    | 'primary'
    | 'error'
    | 'warning'
    | 'success'
    | 'blue gray'
    | 'blue light'
    | 'purple'
    | 'border'
    | string
    | undefined;

  @Input() size: 'sm' | 'md' | 'lg' | string | undefined;

  //left side properties
  @Input() dot: boolean = false;

  @Input() image: string | undefined;

  @Input() focusable: boolean = false;

  @Input() iconLeft: string | undefined;

  //right side properties
  //@Input() showX: 'true' | 'false' | string | undefined;
  @Input() showX: boolean = false;

  @Input() iconRight: string | undefined;

  @Input() iconOnly: string | undefined;

  @Input() componentStyle: string | undefined;

  @Input() customIconSingle: boolean = false;

  @Input() customIconLeft: boolean = false;

  @Input() customIconRight: boolean = false;

  @Input() width?: string;

  @Input() flexy: boolean = true;

  @Input() border: boolean = false;

  @Output() onRemove: EventEmitter<Event> = new EventEmitter<Event>();

  @Output() keyUp: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  @Output() keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  @ViewChild('tag') tagViewChild!: ElementRef;

  getTagClass() {
    return {
      'type-primary': this.color === 'primary' || this.color === undefined,
      'type-error': this.color === 'error',
      'type-warning': this.color === 'warning',
      'type-success': this.color === 'success',
      'type-blue-gray': this.color === 'blue gray',
      'type-blue-light': this.color === 'blue light',
      'type-purple': this.color === 'purple',
      'type-border': this.color === 'border',
      focusable: this.focusable,
      'cursor-pointer': this.focusable,
      'border-[0.5px]': this.border,
      'border-secondary-600':
        this.border && (this.color === undefined || this.color === 'primary' || this.color === 'purple'),
      'border-error-600': this.border && this.color === 'error',
      'border-warning-600': this.border && this.color === 'warning',
      'border-success-600': this.border && this.color === 'success',
      'border-neutral-200': this.border && this.color === 'blue gray',
      'border-info-600': this.border && this.color === 'blue light',
    };
  }

  getSize() {
    return {
      'size-small': this.size === 'sm' || this.size === undefined,
      'size-medium': this.size === 'md',
      'size-large': this.size === 'lg',
    };
  }

  getDotColor() {
    return {
      'bg-secondary-700': this.color === undefined || this.color === 'primary',
      'bg-error-600': this.color === 'error',
      'bg-warning-600': this.color === 'warning',
      'bg-success-600': this.color === 'success',
      'bg-neutral-500': this.color === 'blue gray' || this.color === 'border',
      'bg-info-600': this.color === 'blue light',
      'bg-secondary-600': this.color === 'purple',
    };
  }

  setFocus() {
    if (this.tagViewChild && this.focusable) {
      (this.tagViewChild.nativeElement as HTMLInputElement)?.focus();
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    this.keyUp.emit(event);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Backspace') {
      this.onRemove.emit(event);
    }

    this.keyDown.emit(event);
  }
}
