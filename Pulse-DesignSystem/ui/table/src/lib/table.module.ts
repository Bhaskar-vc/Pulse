import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VTable } from './table.component';

@NgModule({
  imports: [CommonModule, VTable],
  exports: [VTable],
})
export class TableModule {}
