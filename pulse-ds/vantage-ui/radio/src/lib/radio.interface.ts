import { VcRadio } from './radio.component';
/**
 * Custom change event.
 * @see {@link VcRadio.onClick}
 * @group Events
 */
export interface VcRadioClickEvent {
  /**
   * Selected value.
   */
  value: string;
  /**
   * Browser event.
   */
  originalEvent: Event;
}
