export type VcSelectOption = {
  id: string;
  text: string;
  subtext?: string;
  icon?: string;
  imageURL?: string;
  disabled?: boolean;
  [key: string]: any;
};

export type VcSelectEvent = {
  /**
   * Selected option.
   */
  selected: VcSelectOption;
  /**
   * Browser event.
   */
  originalEvent?: Event;
};

export type VcSelectionChangeEvent = {
  /**
   * Selected option.
   */
  selected: VcSelectOption | VcSelectOption[];
  /**
   * Browser event.
   */
  originalEvent?: Event;
};

export type VcActionSelectionEvent = {
  /**
   * Selected action.
   */
  selected: VcSelectOption;
  /**
   * Browser event.
   */
  originalEvent?: Event;
};

export type VcListboxActiveIndexChangeEvent = {
  /**
   * Active index.
   */
  activeIndex: number;
};
