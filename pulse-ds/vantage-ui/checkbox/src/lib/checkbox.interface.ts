import { VcCheckbox } from './checkbox.component';

/**
 * Checkbox item type.
 */
export type VcCheckItem = {
  /**
   * Identifier of the item.
   */
  id: number;

  /**
   * Title of the item.
   */
  text: string;

  /**
   * Whether the item is checked or not.
   */
  checked: boolean;

  /**
   * Whether the item is disabled or not.
   */
  disabled: boolean;
};

/**
 * Custom change event.
 * @see {@link VcCheckbox["onChangeItem"]}
 * @group Events
 */
export type VcCheckboxChangeEvent = {
  /**
   * Checked value
   */
  checked?: boolean;

  /**
   * Indeterminate value
   */
  indeterminate?: boolean;

  /**
   * Changed item.
   */
  changedItem?: any;

  /**
   * Browser event.
   */
  originalEvent?: Event;
};

// export type VcCheckboxChangeEvent = {
//   /**
//    * Checked value.
//    */
//   changedItem?: any;

//   /**
//    * Browser event.
//    */
//   originalEvent?: Event;
// };

/**
 * Custom change event.
 * @group Events
 */
export type VcCheckgroupChangeEvent = {
  /**
   * Checked value.
   */
  updatedGroup?: VcCheckItem[];

  /**
   * Browser event.
   */
  originalEvent?: Event;
};
