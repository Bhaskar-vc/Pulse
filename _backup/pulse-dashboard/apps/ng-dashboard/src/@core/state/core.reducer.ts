import { createReducer, on } from '@ngrx/store';
import * as CoreActions from './core.actions';

export interface CoreState {
  config: any | null;
  loading: boolean;
}

export const initialCoreState: CoreState = {
  config: null,
  loading: false,
};

export const coreReducer = createReducer(
  initialCoreState,
  on(CoreActions.loadConfig, (state) => ({
    ...state,
    loading: true,
  })),
  on(CoreActions.loadConfigSuccess, (state, { config }) => ({
    ...state,
    config,
    loading: false,
  })),
  on(CoreActions.loadConfigFailure, (state) => ({
    ...state,
    loading: false,
  }))
);
