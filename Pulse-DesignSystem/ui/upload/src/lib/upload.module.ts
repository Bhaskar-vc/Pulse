import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VUpload } from './upload.component';

@NgModule({
  imports: [CommonModule, VUpload],
  exports: [VUpload],
})
export class UploadModule {}
