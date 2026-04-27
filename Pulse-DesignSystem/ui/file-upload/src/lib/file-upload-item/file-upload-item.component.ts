import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'vc-file-upload-item',
    imports: [CommonModule],
    templateUrl: './file-upload-item.component.html',
    styleUrl: './file-upload-item.component.scss'
})
export class VcFileUploadItem {
  @Input() name?: string;
  @Input() icon!: string;
  @Input() showPreview: boolean = false;
  @Input() showUploadStatusIcon: boolean = true;
  @Input() size: number = 0;
  @Input() progress: number = 0;
  @Input() fullWidth: boolean = false;
  @Input() showProgressBar?: boolean = true
  @Input() showBytes?: boolean = true
  @Output() onRemove: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteTemplate: EventEmitter<string> = new EventEmitter<string>();

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    let size = bytes / Math.pow(1024, i);

    if (size < 1) {
      size = parseFloat(size.toFixed(2));
    } else {
      size = parseFloat(size.toFixed(1));
    }

    return `${size} ${sizes[i]}`;
  }

  handleRemoveFile() {
    this.onRemove.emit();
    this.onDeleteTemplate.emit("deleted")
  }
}
