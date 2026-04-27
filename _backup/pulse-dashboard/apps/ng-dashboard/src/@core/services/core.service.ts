import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  getCountries(): Observable<any[]> {
    return of([]);
  }

  getDepartments(): Observable<any[]> {
    return of([]);
  }

  getRoles(): Observable<any[]> {
    return of([]);
  }

  getPermissions(): Observable<any[]> {
    return of([]);
  }

  getSettings(): Observable<any> {
    return of({});
  }
}
