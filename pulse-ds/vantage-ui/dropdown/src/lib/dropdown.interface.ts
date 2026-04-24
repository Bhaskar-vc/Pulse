export interface VcDropdownMenuItem {
  id: string;
  text: string;
  icon?: string;
  shortcut?: string;
}

export interface VcDropdownMenuItemClickEvent {
  /**
   * Target item.
   */
  target: VcDropdownMenuItem;
  /**
   * Browser event.
   */
  originalEvent?: Event;
}
