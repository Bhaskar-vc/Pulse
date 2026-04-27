import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VRating } from './rating.component';

@NgModule({
  imports: [CommonModule, VRating],
  exports: [VRating],
})
export class RatingModule {}
