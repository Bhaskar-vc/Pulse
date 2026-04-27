import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginWithToken(payload: any): Observable<any> {
    // Stub — returns empty success response
    return of({ success: true });
  }

  isLoggedIn(): boolean {
    // Stub — always returns true so existing app works without real auth
    return true;
  }
}
