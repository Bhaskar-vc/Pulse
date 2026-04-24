import { QueryList } from '@angular/core';
import {
  VcOption,
  VcSelectionChangeEvent,
} from '@vantagecircle/vantage-ui/listbox';
import { VcCheckboxChangeEvent } from '@vantagecircle/vantage-ui/checkbox';

export interface VcAutocompleteSelectEvent extends VcSelectionChangeEvent {}
export interface VcAutocompleteSelectAllChangeEvent
  extends VcCheckboxChangeEvent {}

export interface VcAutocompleteOptionsChangeEvent {
  options: QueryList<VcOption>;
}
