import { createAction, props } from '@ngrx/store';

export const loadConfig = createAction('[Core] Load Config');

export const loadConfigSuccess = createAction(
  '[Core] Load Config Success',
  props<{ config: any }>()
);

export const loadConfigFailure = createAction(
  '[Core] Load Config Failure',
  props<{ error: any }>()
);
