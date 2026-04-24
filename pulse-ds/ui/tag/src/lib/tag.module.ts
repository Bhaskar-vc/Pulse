import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VTag } from './tag.component';

@NgModule({
  imports: [CommonModule, VTag],
  exports: [VTag],
})
export class TagModule {}
