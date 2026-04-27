import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcButton } from './button.component';

@NgModule({
  imports: [CommonModule, VcButton],
  exports: [VcButton]
})
export class VcButtonModule {}
