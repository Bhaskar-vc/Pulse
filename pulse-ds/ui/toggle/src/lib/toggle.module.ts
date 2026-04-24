import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VToggle } from './toggle.component';

@NgModule({
  imports: [CommonModule, VToggle],
  exports: [VToggle],
})
export class ToggleModule {}
