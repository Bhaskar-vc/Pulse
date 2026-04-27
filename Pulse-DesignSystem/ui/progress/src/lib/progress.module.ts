import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VProgressBar } from './progress-bar.component';
import { VProgressCircle } from './progress-circle.component';

@NgModule({
  imports: [CommonModule, VProgressBar, VProgressCircle],
  exports: [VProgressBar, VProgressCircle],
})
export class ProgressModule {}
