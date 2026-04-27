import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VSegment } from './segment.component';

@NgModule({
  imports: [CommonModule, VSegment],
  exports: [VSegment],
})
export class SegmentModule {}
