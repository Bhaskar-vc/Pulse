import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VModal } from './modal.component';

@NgModule({
  imports: [CommonModule, VModal],
  exports: [VModal],
})
export class ModalModule {}
