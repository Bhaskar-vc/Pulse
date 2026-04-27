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
import { VC_FORM_CONTROL, VcFormControl } from '@pulse-ds/ui/core';
import { VcTag } from '@pulse-ds/ui/tag';
import { VcTagItem } from './input-field.types';
import { VcLabel } from '@pulse-ds/ui/label';

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

  @Output() valueChange = new EventEmitter<any>();
  @Output() onEnterPress = new EventEmitter<string>();
  @Output() onInput = new EventEmitter<Event>();
  @Output() onRemoveTag = new EventEmitter<number>();
  @Output() keyUp = new EventEmitter<KeyboardEvent>();
  @Output() keyDown = new EventEmitter<KeyboardEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() iconRightClick = new EventEmitter<Event>();

  @ViewChildren('tagElement') tagViewChildList!: QueryList<VcTag>;
  @ViewChild('inputField') inputViewChild!: ElementRef;

  focused: boolean = false;
  touched: boolean = false;
  model: any;
  displayValue!: any;
  generatedId: string = '';

  onModelChange: (value: any) => void = () => {};
  onModelTouched: () => void = () => {};

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.generatedId = 'inputfield-' + Math.random().toString(36).substring(7);
  }

  ngOnInit() {
    this.setHostStyles();
  }

  /** Whether the field is in an error state */
  get isError(): boolean {
    if (this.customValidation) {
      return this.customValidation === 'invalid';
    }
    return (
      this.required === true &&
      (this.displayValue === '' || this.displayValue === undefined) &&
      this.touched === true
    );
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

  isIconLeftString(): boolean { return typeof this.iconLeft === 'string'; }
  isIconLeftTemplateRef(): boolean { return this.iconLeft instanceof TemplateRef; }
  getIconLeftAsTemplateRef(): TemplateRef<unknown> { return this.iconLeft as TemplateRef<unknown>; }

  isIconRightString(): boolean { return typeof this.iconRight === 'string'; }
  isIconRightTemplateRef(): boolean { return this.iconRight instanceof TemplateRef; }
  getIconRightAsTemplateRef(): TemplateRef<unknown> { return this.iconRight as TemplateRef<unknown>; }

  private setHostStyles() {
    if (this.componentStyle) {
      const pairs = this.componentStyle.split(';');
      pairs.forEach((pair) => {
        const [key, value] = pair.split(':').map((s) => s.trim());
        if (key === 'width')  this.renderer.setStyle(this.el.nativeElement, 'width', value);
        if (key === 'height') this.renderer.setStyle(this.el.nativeElement, 'height', value);
      });
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
    if (this.readOnly || this.disabled) return;
    this.focused = true;
    (this.inputViewChild?.nativeElement as HTMLInputElement)?.focus();
  }

  clearControl() {
    const value = '';
    this.model = value;
    this.displayValue = value;
    this.onModelChange(value);
    this.valueChange.emit(value);
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

  handleInputKeyUp(event: KeyboardEvent)  { this.keyUp.emit(event); }
  handleInputKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      const value = (event.target as HTMLInputElement).value;
      if (value) this.onEnterPress.emit(value);
    } else if (event.code === 'Backspace' && !this.displayValue) {
      const lastTag = this.tagViewChildList?.last;
      if (lastTag) { lastTag.setFocus(); event.preventDefault(); }
    }
    this.keyDown.emit(event);
  }

  handleTagKeyDown(event: KeyboardEvent) {
    if (event.code === 'Tab') {
      this.inputViewChild?.nativeElement?.focus();
      event.preventDefault();
    }
  }

  handleFocus(event: Event)  { this.focused = true;  this.onFocus.emit(event); }
  handleBlur(event: Event)   {
    this.focused = false;
    this.touched = true;
    this.onModelTouched();
    this.onBlur.emit(event);
  }

  handleInputChange(event: Event) {
    this.valueChange.emit((event.target as HTMLInputElement).value);
    this.onInput.emit(event);
  }

  handleIconRightClick(event: Event) {
    if (this.readOnly || this.disabled) return;
    this.iconRightClick.emit(event);
  }
}
