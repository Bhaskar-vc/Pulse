import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VButton } from './button.component';

@NgModule({
  imports: [CommonModule, VButton],
  exports: [VButton],
})
export class ButtonModule {}
