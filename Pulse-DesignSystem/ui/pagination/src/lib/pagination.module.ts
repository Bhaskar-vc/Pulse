import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VPagination } from './pagination.component';

@NgModule({
  imports: [CommonModule, VPagination],
  exports: [VPagination],
})
export class PaginationModule {}
