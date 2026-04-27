import { InjectionToken } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export const VC_FORM_CONTROL = new InjectionToken<VcFormControl>(
  'VC_FORM_CONTROL',
);

/**
 * An interface that extends ControlValueAccessor and defines
 * additional methods for form controls of Vantage UI.
 *
 * @interface VcFormControl
 */
export interface VcFormControl extends ControlValueAccessor {
  /**
   * Method to set the value of the form control.
   *
   * @remarks
   * This method is optional and can be omitted.
   */
  setControl?(value: any, displayValue?: any): void;

  /**
   * Method to set focus on the form control.
   *
   * @remarks
   * This method is optional and can be omitted.
   */
  setFocus?(): void;

  /**
   * Method to clear the form control.
   *
   * @remarks
   * This method is optional and can be omitted.
   */
  clearControl?(): void;

  /**
   * Callback to invoke upon clicking a form control.
   *
   * @remarks
   * This method is optional and can be omitted.
   *
   * @param {Event} event - Browser event.
   */
  handleClick?(event: Event, inputId?: number): void;

  /**
   * Callback to invoke when form control receives focus.
   *
   * @remarks
   * This method is optional and can be omitted.
   *
   * @param {Event} event - Browser event.
   */
  handleFocus?(event: Event): void;

  /**
   * Callback to invoke when form control loses focus or is blured.
   *
   * @remarks
   * This method is optional and can be omitted.
   *
   * @param {Event} event - Browser event.
   */
  handleBlur?(event: Event): void;

  /**
   * Callback to invoke when the form control is hovered.
   *
   * @remarks
   * This method is optional and can be omitted.
   */
  handleMouseEnter?(): void;

  /**
   * Callback to invoke when the form control is unhovered.
   *
   * @remarks
   * This method is optional and can be omitted.
   */
  handleMouseLeave?(): void;
}
