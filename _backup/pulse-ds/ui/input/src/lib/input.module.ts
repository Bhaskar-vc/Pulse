import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VInput } from './input.component';

@NgModule({
  imports: [CommonModule, VInput],
  exports: [VInput],
})
export class InputModule {}
