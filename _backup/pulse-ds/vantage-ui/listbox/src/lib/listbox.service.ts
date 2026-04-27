import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VcSelectEvent, VcSelectOption } from './listbox.types';

@Injectable()
export class VcListboxService {
  private optionSelectedSubject = new Subject<VcSelectEvent>();
  optionSelected$ = this.optionSelectedSubject.asObservable();

  constructor() {}

  selectOption(option: VcSelectEvent) {
    this.optionSelectedSubject.next(option);
  }
}
