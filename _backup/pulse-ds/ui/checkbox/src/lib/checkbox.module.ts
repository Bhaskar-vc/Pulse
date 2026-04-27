import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCheckbox } from './checkbox.component';

@NgModule({
  imports: [CommonModule, VCheckbox],
  exports: [VCheckbox],
})
export class CheckboxModule {}
