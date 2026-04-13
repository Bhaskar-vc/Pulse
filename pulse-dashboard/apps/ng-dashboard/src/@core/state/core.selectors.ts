import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from './core.reducer';

export const selectCoreState = createFeatureSelector<CoreState>('core');

export const selectConfig = createSelector(
  selectCoreState,
  (state: CoreState) => state.config
);

export const selectCoreLoading = createSelector(
  selectCoreState,
  (state: CoreState) => state.loading
);
