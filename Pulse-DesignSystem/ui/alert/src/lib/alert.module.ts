import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VAlert } from './alert.component';

@NgModule({
  imports: [CommonModule, VAlert],
  exports: [VAlert],
})
export class AlertModule {}
