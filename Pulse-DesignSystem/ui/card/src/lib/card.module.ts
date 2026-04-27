import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCard } from './card.component';

@NgModule({
  imports: [CommonModule, VCard],
  exports: [VCard],
})
export class CardModule {}
