import { QueryList } from '@angular/core';
import {
  VcOption,
  VcSelectionChangeEvent,
} from '@pulse-ds/ui/listbox';
import { VcCheckboxChangeEvent } from '@pulse-ds/ui/checkbox';

export interface VcAutocompleteSelectEvent extends VcSelectionChangeEvent {}
export interface VcAutocompleteSelectAllChangeEvent
  extends VcCheckboxChangeEvent {}

export interface VcAutocompleteOptionsChangeEvent {
  options: QueryList<VcOption>;
}
