import { VcToggle } from './toggle.component';
/**
 * Custom change event.
 * @see {@link VcToggle.onClick}
 * @group Events
 */
export interface VcToggleClickEvent {
  /**
   * Toggle state.
   */
  checked: boolean;
  /**
   * Browser event.
   */
  originalEvent: Event;
}
