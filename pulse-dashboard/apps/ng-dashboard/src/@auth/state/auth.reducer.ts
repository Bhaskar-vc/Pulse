import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  authResponse: any | null;
  error: any | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: true, // Default true so existing app works without real auth
  authResponse: null,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { authResponse }) => ({
    ...state,
    isLoggedIn: true,
    authResponse,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    error,
  })),
  on(AuthActions.logout, () => ({
    ...initialAuthState,
    isLoggedIn: false,
  }))
);
