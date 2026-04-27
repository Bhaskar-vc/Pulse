import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  isSubHeaderVisible$ = new BehaviorSubject<boolean>(true);
  isPulseSubHeaderVisible$ = new BehaviorSubject<boolean>(false);
  isHeaderVisible$ = new BehaviorSubject<boolean>(true);
  isSidebarVisible$ = new BehaviorSubject<boolean>(true);
  showPortalStyles$ = new BehaviorSubject<boolean>(true);
  isModuleDropdownVisible$ = new BehaviorSubject<boolean>(true);
  fitSubHeaderConfig$ = new BehaviorSubject<any>(null);
  fitSubHeaderGenerate$ = new Subject<void>();
  fitSubHeaderCustomDropdownChanged$ = new Subject<any>();
  fitFeatures$ = new BehaviorSubject<any>(null);
  fitExportEnabled$ = new BehaviorSubject<boolean>(true);

  setSubHeaderVisible(visible: boolean): void {
    this.isSubHeaderVisible$.next(visible);
  }

  setHeaderVisible(visible: boolean): void {
    this.isHeaderVisible$.next(visible);
  }

  setSidebarVisible(visible: boolean): void {
    this.isSidebarVisible$.next(visible);
  }
}
