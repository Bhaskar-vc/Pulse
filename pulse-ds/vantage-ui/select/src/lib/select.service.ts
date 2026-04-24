import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { VcSelectOption } from './select-types';
import { SelectModule } from './select.module';

@Injectable({
  providedIn: 'root',
})
export class VcSelectService {
  /**
   * Subject for the selected option ID.
   */
  private _selectedOption = new Subject<VcSelectOption | undefined>();

  get selectedOption(): Observable<VcSelectOption | undefined> {
    return this._selectedOption.asObservable();
  }

  set selectedOption(option: VcSelectOption | undefined) {
    this._selectedOption.next(option);
  }

  /**
   * Subject for the currently keyboard hovered option ID.
   */
  private _hoveredOption = new Subject<VcSelectOption | undefined>();

  get hoveredOption(): Observable<VcSelectOption | undefined> {
    return this._hoveredOption.asObservable();
  }

  set hoveredOption(option: VcSelectOption | undefined) {
    this._hoveredOption.next(option);
  }
}
