import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadedFile } from './upload.types';

@Component({
  standalone: true,
  selector: 'v-upload',
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VUpload {
  /** Accepted file types (e.g. "image/*,.pdf") */
  @Input() accept = '';

  /** Allow multiple file selection */
  @Input() multiple = false;

  /** Max file size in MB */
  @Input() maxSizeMB = 10;

  /** Subtext shown in the drop zone */
  @Input() subtext = 'SVG, PNG, JPG or PDF (max. 10 MB)';

  /** Error state */
  @Input() hasError = false;

  /** Error message */
  @Input() errorMessage = '';

  /** Emitted when files are selected */
  @Output() filesSelected = new EventEmitter<UploadedFile[]>();

  /** Emitted when a file is removed */
  @Output() fileRemoved = new EventEmitter<UploadedFile>();

  uploadedFiles: UploadedFile[] = [];
  isDragging = false;

  private cdr = inject(ChangeDetectorRef);

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) this.addFiles(Array.from(input.files));
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.cdr.markForCheck();
  }

  onDragLeave(): void {
    this.isDragging = false;
    this.cdr.markForCheck();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
    this.cdr.markForCheck();
  }

  removeFile(file: UploadedFile): void {
    this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
    this.fileRemoved.emit(file);
    this.cdr.markForCheck();
  }

  private addFiles(files: File[]): void {
    const newFiles: UploadedFile[] = files.map(f => ({
      file: f,
      name: f.name,
      size: f.size,
      type: f.type,
      sizeLabel: this.formatSize(f.size),
      status: 'done',
    }));
    this.uploadedFiles = this.multiple
      ? [...this.uploadedFiles, ...newFiles]
      : newFiles;
    this.filesSelected.emit(this.uploadedFiles);
    this.cdr.markForCheck();
  }

  private formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
