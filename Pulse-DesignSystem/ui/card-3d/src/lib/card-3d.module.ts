import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCard3d } from './card-3d.component';

@NgModule({
  imports: [CommonModule, VCard3d],
  exports: [VCard3d],
})
export class Card3dModule {}
