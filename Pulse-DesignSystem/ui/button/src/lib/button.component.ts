import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { VSpinner, SpinnerTheme } from '@pulse-ds/ui/spinner';
import {
  ButtonColor,
  ButtonRadius,
  ButtonShape,
  ButtonSize,
  ButtonStatus,
  ButtonType,
  ButtonVariant,
} from './button.enums';

// Maps Angular ButtonColor enum values to the CSS class suffix used in button.component.scss
const COLOR_CSS: Record<ButtonColor, string> = {
  [ButtonColor.PRIMARY]:   'primary',
  [ButtonColor.SECONDARY]: 'secondary',
  [ButtonColor.SUCCESS]:   'success',
  [ButtonColor.INFO]:      'info',
  [ButtonColor.WARNING]:   'warning',
  [ButtonColor.DANGER]:    'error',
};

const SIZE_CSS: Record<ButtonSize, string> = {
  [ButtonSize.XS]:      'btn-xs',
  [ButtonSize.SM]:      'btn-sm',
  [ButtonSize.DEFAULT]: '',
  [ButtonSize.MD]:      'btn-lg',
  [ButtonSize.LG]:      'btn-lg',
};

const RADIUS_CSS: Record<ButtonRadius, string> = {
  [ButtonRadius.NONE]:    'btn-radius-none',
  [ButtonRadius.DEFAULT]: '',
  [ButtonRadius.FULL]:    'btn-radius-full',
};

/**
 * @description
 * A versatile button component that can be customized with various properties such as variant, color, size, radius, etc.
 *
 * @usageNotes
 * ```html
 * <v-button>Click Me</v-button>
 * ```
 *
 * @see {@link https://ui.vantagecircle.co.in/docs/components/button Button in Vantage UI}
 */
@Component({
    standalone: true,
    selector: 'v-button',
    imports: [VSpinner],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VButton implements OnChanges, OnInit {
  /**
   * The type of the button (corresponds to HTML button type attribute).
   * @defaultValue `button`
   * @group Inputs
   */
  @Input() type: `${ButtonType}` = ButtonType.BUTTON;

  /**
   * The variant of the button. Used to define the button's visual style.
   * @defaultValue `solid`
   * @group Inputs
   */
  @Input() variant: `${ButtonVariant}` = ButtonVariant.SOLID;

  /**
   * The color scheme of the button.
   * @defaultValue `primary`
   * @group Inputs
   */
  @Input() color: `${ButtonColor}` = ButtonColor.PRIMARY;

  /**
   * The size of the button.
   * @defaultValue `default`
   * @group Inputs
   */
  @Input() size: `${ButtonSize}` = ButtonSize.DEFAULT;

  /**
   * The corner radius style of the button.
   * @defaultValue `default`
   * @group Inputs
   */
  @Input() radius: `${ButtonRadius}` = ButtonRadius.DEFAULT;

  /**
   * Whether the button should display only an icon without any content.
   * Setting this to true renders the button in a square shape.
   * @defaultValue `false`
   * @group Inputs
   */
  @Input()
  set iconOnly(value: boolean | string) {
    this._iconOnly = value === '' || value === String(true) || value === true;
  }
  get iconOnly(): boolean {
    return this._iconOnly;
  }
  private _iconOnly: boolean = false;

  /**
   * Whether the button should be disabled.
   * @defaultValue `false`
   * @group Inputs
   */
  @Input()
  set disabled(value: boolean | string) {
    this._disabled = value === '' || value === String(true) || value === true;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled: boolean = false;

  /**
   * Indicates whether the button is in a loading state.
   * @defaultValue `false`
   * @group Inputs
   */
  @Input() loading: boolean = false;

  /**
   * Text to display when the button is in a loading state.
   * Leave empty to use the default loading indicator.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() loadingText: string = '';

  /**
   * Accessibility label for the button.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() ariaLabel: string = '';

  /**
   * Indicates whether the button is currently in a pressed state.
   * Used for toggle buttons to indicate their state.
   * @defaultValue `null`
   * @group Inputs
   */
  @Input() pressed: boolean | null = null;

  /**
   * Indicates whether the content controlled by the button is currently expanded.
   * Used for disclosure buttons like accordions or dropdowns.
   * @defaultValue `null`
   * @group Inputs
   */
  @Input() expanded: boolean | null = null;

  /**
   * Identifies the element(s) whose contents or presence are controlled by the button.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() controls: string = '';

  /**
   * Unique identifier for the button.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() id: string = '';

  /**
   * The name of the button, used when submitting forms.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() name: string = '';

  /**
   * The value associated with the button, used when submitting forms.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() value: string = '';

  /**
   * Associates the button with a form element.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() form: string = '';

  /**
   * The URL to which form data should be submitted.
   * Overrides the form's action attribute.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() formaction: string = '';

  /**
   * The encoding type to use when submitting form data.
   * Overrides the form's enctype attribute.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() formenctype: string = '';

  /**
   * The HTTP method to use when submitting form data.
   * Overrides the form's method attribute.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() formmethod: string = '';

  /**
   * If true, the form will not be validated when submitted.
   * Overrides the form's novalidate attribute.
   * @defaultValue `false`
   * @group Inputs
   */
  @Input() formnovalidate: boolean = false;

  /**
   * Specifies where to display the response after submitting the form.
   * Overrides the form's target attribute.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() formtarget: string = '';

  /**
   * Additonal Tailwind class(es) to apply to the button.
   * @defaultValue `''`
   * @group Inputs
   */
  @Input() customClass: string = '';

  /**
   * Event emitted when the button is clicked.
   * @group Events
   */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /**
   * Event emitted when the button receives focus.
   * @group Events
   */
  @Output() focused = new EventEmitter<FocusEvent>();

  /**
   * Event emitted when the button loses focus.
   * @group Events
   */
  @Output() blurred = new EventEmitter<FocusEvent>();

  buttonClasses: string = '';
  spinnerTheme: `${SpinnerTheme}` = SpinnerTheme.LIGHT;

  constructor() {}

  ngOnInit(): void {
    this.updateClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['type'] ||
      changes['variant'] ||
      changes['color'] ||
      changes['size'] ||
      changes['loading'] ||
      changes['disabled'] ||
      changes['customClass']
    ) {
      this.updateClasses();
      this.updateSpinnerTheme();
    }
  }

  /**
   * Handles button click events
   * @param event - The MouseEvent triggered on click
   * @emits clicked - Emits the MouseEvent when button is clicked
   * @group Event Handlers
   */
  onClick(event: MouseEvent): void {
    if (this.loading || this.disabled) return;
    this.clicked.emit(event);
  }

  /**
   * Handles button focus events
   * @param event - The FocusEvent triggered on focus
   * @emits focused - Emits the FocusEvent when button gains focus
   * @group Event Handlers
   */
  onFocus(event: FocusEvent): void {
    if (this.loading || this.disabled) return;
    this.focused.emit(event);
  }

  /**
   * Handles button blur events
   * @param event - The FocusEvent triggered on blur
   * @emits blurred - Emits the FocusEvent when button loses focus
   * @group Event Handlers
   */
  onBlur(event: FocusEvent): void {
    if (this.loading || this.disabled) return;
    this.blurred.emit(event);
  }

  /**
   * Updates the button's CSS classes based on current property values
   * @private
   * @group Internal
   */
  private updateClasses(): void {
    const color   = COLOR_CSS[this.color as ButtonColor]   ?? 'primary';
    const size    = SIZE_CSS[this.size as ButtonSize]       ?? '';
    const radius  = RADIUS_CSS[this.radius as ButtonRadius] ?? '';
    const shape   = this.iconOnly ? 'btn-square' : '';
    const loading = this.loading  ? 'btn-loading' : '';

    this.buttonClasses = [
      'btn',
      `btn-${this.variant}-${color}`,
      size,
      radius,
      shape,
      loading,
      this.customClass,
    ].filter(Boolean).join(' ');
  }

  /**
   * Updates the spinner theme based on the current button variant.
   * Sets the theme to `'light'` for light-styled variants (`GHOST`, `LIGHT`, `OUTLINED`)
   * and to `'dark'` for all other variants to ensure proper visual contrast.
   * @private
   * @group Internal
   */
  private updateSpinnerTheme(): void {
    this.spinnerTheme =
      this.variant === ButtonVariant.GHOST ||
      this.variant === ButtonVariant.LIGHT ||
      this.variant === ButtonVariant.OUTLINED
        ? SpinnerTheme.LIGHT
        : SpinnerTheme.DARK;
  }
}
