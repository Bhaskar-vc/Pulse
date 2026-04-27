import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcToast } from './toast.component';
import { ToastService } from './toast.service';

@NgModule({
  imports: [CommonModule, VcToast],
  exports: [VcToast]
})
export class ToastModule {}
