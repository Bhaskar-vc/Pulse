import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VC_FORM_CONTROL, VcFormControl } from '@vantagecircle/vantage-ui/core';
import { VcTag } from '@vantagecircle/vantage-ui/tag';
import { VcTagItem } from './input-field.types';
import { VcLabel } from '@vantagecircle/vantage-ui/label';

@Component({
    standalone: true,
    selector: 'vc-input-field',
    imports: [CommonModule, FormsModule, VcLabel, VcTag],
    templateUrl: './input-field.component.html',
    styleUrl: './input-field.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VcInputField),
            multi: true,
        },
        {
            provide: VC_FORM_CONTROL,
            useExisting: forwardRef(() => VcInputField),
        },
    ]
})
export class VcInputField implements VcFormControl, OnInit {
  @Input() inputfieldId: string | undefined;

  @Input() placeholder: string = '';

  @Input() label: string | undefined;

  @Input() hintText: string | undefined;

  @Input() readOnly: boolean = false;

  @Input() errorText: string = 'Error';

  @Input() showErrorText: boolean = true;

  @Input() customValidation?: string | 'valid' | 'invalid';

  @Input() required: boolean = false;

  @Input() disabled: boolean = false;

  @Input() iconLeft: string | TemplateRef<unknown> | undefined;

  @Input() iconRight: string | TemplateRef<unknown> | undefined;

  private _value: any;
  @Input()
  set value(val: any) {
    this._value = val;
    this.setControl(val);
  }
  get value(): any {
    return this._value;
  }

  @Input() componentStyle: string | undefined;

  @Input() type: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url' | string = 'text';

  @Input() hideArrowButton: boolean = false;

  @Input() min: number | undefined;

  @Input() max: number | undefined;

  @Input() minLength: number | undefined;

  @Input() maxLength: number | undefined;

  @Input() tags: VcTagItem[] = [];

  @Input() displayFormatter: ((value: any) => string) | null = null;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() onEnterPress: EventEmitter<string> = new EventEmitter<string>();

  @Output() onInput: EventEmitter<Event> = new EventEmitter<Event>();

  @Output() onRemoveTag: EventEmitter<number> = new EventEmitter<number>();

  @Output() keyUp: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  @Output() keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();

  @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();

  @Output() iconRightClick: EventEmitter<Event> = new EventEmitter<Event>();

  @ViewChildren('tagElement') tagViewChildList!: QueryList<VcTag>;

  @ViewChild('inputField') inputViewChild!: ElementRef;

  focused: boolean = false;
  touched: boolean = false;

  model: any;
  displayValue!: any;
  generatedId: string = '';

  onModelChange: (value: any) => void = () => {};
  onModelTouched: () => void = () => {};

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.generatedId = 'inputfield-' + Math.random().toString(36).substring(7);
  }

  ngOnInit() {
    this.setHostStyles();
  }

  private _parseStyles(styleString: string): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    const stylePairs = styleString.split(';');

    stylePairs.forEach((pair) => {
      const [key, value] = pair.split(':').map((s) => s.trim());
      if (key && value) {
        styles[key] = value;
      }
    });

    return styles;
  }

  writeValue(value: any): void {
    this.model = value;
    this.displayValue = this.displayFormatter ? this.displayFormatter(value) : value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getInputContainerClass() {
    return {
      'flex-wrap': this.tags.length,
      'p-2xs': this.tags.length,
      'px-md': !this.tags.length,
      'py-2xs': !this.tags.length,
      'border-neutral-200': this.customValidation
        ? this.customValidation === 'valid'
        : (this.required === true && (this.model === '' || this.model === undefined) && this.touched === false) ||
          this.required === false ||
          (this.required === true && this.model !== '' && this.touched === true),
      'hover:border-neutral-300': !this.disabled,
      'border-error-300': this.customValidation
        ? this.customValidation === 'invalid'
        : this.required === true &&
          (this.displayValue === '' || this.displayValue === undefined) &&
          this.touched === true,
      'bg-neutral-100': this.disabled === true,
      'bg-white': this.disabled === false,
      'border-neutral-300': this.focused,
      'shadow-[0px_0px_0px_4px_#F2F4F7]': this.focused === true,
      'cursor-auto': this.readOnly,
      'cursor-not-allowed': this.disabled,
    };
  }

  getInputClass() {
    return {
      'ml-2xs': this.tags.length,
      'w-full': !this.tags.length,
      'hide-arrow-button': this.hideArrowButton,
      'placeholder:text-neutral-300': this.disabled,
      'pointer-events-none': this.readOnly || this.disabled,
    };
  }

  isIconLeftString(): boolean {
    return typeof this.iconLeft === 'string';
  }

  isIconLeftTemplateRef(): boolean {
    return this.iconLeft instanceof TemplateRef;
  }

  getIconLeftAsTemplateRef(): TemplateRef<unknown> {
    return this.iconLeft as TemplateRef<unknown>;
  }

  isIconRightString(): boolean {
    return typeof this.iconRight === 'string';
  }

  isIconRightTemplateRef(): boolean {
    return this.iconRight instanceof TemplateRef;
  }

  getIconRightAsTemplateRef(): TemplateRef<unknown> {
    return this.iconRight as TemplateRef<unknown>;
  }

  setHostStyles() {
    if (this.componentStyle) {
      const styles = this._parseStyles(this.componentStyle);

      if (styles['width']) {
        this.renderer.setStyle(this.el.nativeElement, 'width', styles['width']);
      }

      if (styles['height']) {
        this.renderer.setStyle(this.el.nativeElement, 'height', styles['height']);
      }
    }
  }

  setControl(value: any, displayValue?: any): void {
    this.model = value;
    this.displayValue = displayValue !== undefined ? displayValue : value;
    this.onModelChange(value);
    this.onModelTouched();
    this.valueChange.emit(value);
  }

  setFocus() {
    if (this.readOnly || this.disabled) {
      return;
    }

    this.focused = true;

    if (this.inputViewChild) {
      (this.inputViewChild.nativeElement as HTMLInputElement)?.focus();
    }
  }

  clearControl() {
    const value = '';
    this.model = value;
    this.displayValue = value;
    this.onModelChange(value);
    this.valueChange.emit(value);
  }

  enterKeyPress(event: Event) {
    if (event && event.target) {
      const value = (event.target as HTMLInputElement).value;
      if (value) {
        this.onEnterPress.emit(value);
      }
    }
  }

  handleRemoveTag(event: Event, index: number) {
    if (event instanceof KeyboardEvent) {
      setTimeout(() => {
        if (this.tags.length && index > 0) {
          this.tagViewChildList.toArray()[index - 1]?.setFocus();
        } else if (this.tags.length && index === 0) {
          this.tagViewChildList.first?.setFocus();
        } else {
          this.inputViewChild.nativeElement.focus();
        }
      }, 0);
    }

    this.onRemoveTag.emit(index);
  }

  handleInputKeyUp(event: KeyboardEvent) {
    this.keyUp.emit(event);
  }

  handleInputKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.enterKeyPress(event);
    } else if (event.code === 'Backspace' && !this.displayValue) {
      const lastTagElement = this.tagViewChildList?.last;
      if (lastTagElement) {
        lastTagElement.setFocus();
        event.preventDefault();
      }
    }

    this.keyDown.emit(event);
  }

  handleTagKeyDown(event: KeyboardEvent) {
    if (event.code === 'Tab') {
      this.inputViewChild?.nativeElement?.focus();
      event.preventDefault();
    }
  }

  handleFocus(event: Event) {
    this.focused = true;
    this.onFocus.emit(event);
  }

  handleBlur(event: Event) {
    this.focused = false;
    this.touched = true;
    this.onModelTouched();
    this.onBlur.emit(event);
  }

  handleInputChange(event: Event) {
    this.valueChange.emit((event.target as HTMLInputElement).value);
    this.onInput.emit(event);
  }

  handleKeyUp(event: KeyboardEvent) {
    this.keyUp.emit(event);
  }

  handleKeyDown(event: KeyboardEvent) {
    this.keyDown.emit(event);
  }

  handleIconRightClick(event: Event) {
    if (this.readOnly || this.disabled) {
      return;
    }
    this.iconRightClick.emit(event);
  }
}
