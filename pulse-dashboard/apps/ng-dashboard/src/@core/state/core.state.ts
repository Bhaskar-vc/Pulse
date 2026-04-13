import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coreReducer } from './core.reducer';
import { CoreEffects } from './core.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('core', coreReducer),
    EffectsModule.forFeature([CoreEffects]),
  ],
})
export class CoreStateModule {}
