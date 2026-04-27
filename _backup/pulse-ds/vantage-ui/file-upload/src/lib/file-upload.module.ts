import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcFileUpload } from './file-upload.component';

@NgModule({
  imports: [CommonModule, VcFileUpload],
  exports: [VcFileUpload]
})
export class VcFileUploadModule {}
