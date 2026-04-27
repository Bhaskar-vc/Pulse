import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VStat } from './stat.component';

@NgModule({
  imports: [CommonModule, VStat],
  exports: [VStat],
})
export class StatModule {}
