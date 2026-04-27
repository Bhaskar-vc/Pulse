import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VSlider } from './slider.component';

@NgModule({
  imports: [CommonModule, VSlider],
  exports: [VSlider],
})
export class SliderModule {}
