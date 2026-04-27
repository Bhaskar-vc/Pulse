import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VEmptyState } from './empty-state.component';

@NgModule({
  imports: [CommonModule, VEmptyState],
  exports: [VEmptyState],
})
export class EmptyStateModule {}
