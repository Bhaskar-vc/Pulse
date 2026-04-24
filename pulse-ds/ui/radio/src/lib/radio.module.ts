import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VRadio } from './radio.component';
import { VRadioGroup } from './radio-group.component';

@NgModule({
  imports: [CommonModule, VRadio, VRadioGroup],
  exports: [VRadio, VRadioGroup],
})
export class RadioModule {}
