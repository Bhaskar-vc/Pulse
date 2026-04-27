import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcSelect } from './select.component';
import { VcOption } from '../public-api';

@NgModule({
  imports: [CommonModule, VcSelect, VcOption],
  exports: [VcSelect, VcOption]
})
export class VcSelectModule {}
