import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniqueIdService } from '@vantagecircle/vantage-ui/core';
import {
  VcFileRemoveEvent,
  VcFileUploadEvent,
  VcFileUploadProgressEvent,
} from './file-upload.types';
import { VcFileUploadItem } from './file-upload-item/file-upload-item.component';
import { Subject, Subscription, skip } from 'rxjs';

@Component({
    standalone: true,
    selector: 'vc-file-upload',
    imports: [CommonModule, VcFileUploadItem],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss'
})
export class VcFileUpload implements OnInit, OnDestroy {
  @Input() type: 'default' | 'image' | 'drag-drop' = 'default';
  @Input() label: string = 'Upload';
  @Input() name: string = '';
  @Input() multiple: boolean = false;
  @Input() accept: string = '';
  @Input() dropAreaHintText: string = '';
  @Input() dropAreaHintTemplate: TemplateRef<any> | undefined;
  @Input() dropAreaWidth: number = 384;
  @Input() dropAreaHeight: number | undefined;
  @Input() showOnlyDropArea: boolean = true;
  @Input() showUploadStatusIcon: boolean = true;
  @Input() uploadButtonStyle: string = '';
  @Input() disabled: boolean = false;

  @Output() onUpload: EventEmitter<VcFileUploadEvent> =
    new EventEmitter<VcFileUploadEvent>();

  @Output() onRemove: EventEmitter<VcFileRemoveEvent> =
    new EventEmitter<VcFileRemoveEvent>();

  @Output() onProgress: EventEmitter<VcFileUploadProgressEvent> =
    new EventEmitter<VcFileUploadProgressEvent>();

  @ViewChild('fileInput') fileInputViewChild!: ElementRef<HTMLInputElement>;

  isDragging: boolean = false;
  elementId: string;
  completedUploads: number = 0;
  uploadedFiles: File[] = [];
  uploadProgresses: number[] = [];

  private filesProcessed: number = 0;
  private filesProcessedSubject: Subject<number> = new Subject<number>();
  private filesProcessedSubscription = Subscription.EMPTY;

  constructor(
    private _uidService: UniqueIdService, 
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.elementId = this._uidService.generateUniqueId('vc-file-upload');
    this.filesProcessedSubscription = this.filesProcessedSubject
      .pipe(skip(1))
      .subscribe((value) => {
        if (this.fileInputViewChild && this.fileInputViewChild.nativeElement) {
          const filesLength =
            this.fileInputViewChild.nativeElement.files?.length;

          if (value === filesLength) {
            this.onUpload.emit({
              uploaded: this.uploadedFiles,
            });
            this.reset();
          }
        }
      });
  }

  ngOnInit(): void {
    this.setHostStyles();
  }

  private _parseStyles(styleString: string): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    const stylePairs = styleString.split(';');

    stylePairs.forEach((pair) => {
      const [key, value] = pair.split(':').map((s) => s.trim());
      if (key && value) {
        styles[key] = value;
      }
    });

    return styles;
  }

  setHostStyles() {
    if (this.uploadButtonStyle) {
      const styles = this._parseStyles(this.uploadButtonStyle);

      if (styles['width']) {
        this.renderer.setStyle(this.el.nativeElement, 'width', styles['width']);
      }
    }
  }

  getFileUploadBtnClass() {
    return {
      'btn-disabled': this.disabled,
    };
  }

  handleFileChosen(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      this.uploadFiles(files);
    }
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  handleDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.attachFilesToInput(files);
      this.uploadFiles(files);
    }
  }

  handleRemoveFile(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.uploadProgresses.splice(index, 1);
    this.onRemove.emit({ index });
  }

  uploadFiles(files: FileList) {
    this.uploadedFiles = Array.from(files);
    this.uploadProgresses = new Array(files.length).fill(0);
    this.filesProcessed = 0;
    this.filesProcessedSubject.next(0);

    this.uploadedFiles.forEach((file, index) =>
      this.uploadSingleFile(file, index),
    );
  }

  attachFilesToInput(files: FileList) {
    if (this.fileInputViewChild && this.fileInputViewChild.nativeElement) {
      const dataTransfer = new DataTransfer();
      Array.from(files).forEach(file => dataTransfer.items.add(file));
      this.fileInputViewChild.nativeElement.files = dataTransfer.files;
    }
  }

  uploadSingleFile(file: File, index: number): void {
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        this.uploadProgresses[index] = progress;
        this.onProgress.emit({
          progresses: this.uploadProgresses,
          originalEvent: event,
        });
      }
    };

    reader.onload = (event) => {
      this.uploadProgresses[index] = 100;
      this.onProgress.emit({
        progresses: this.uploadProgresses,
        originalEvent: event,
      });
      this.updateFilesProcessed();
    };

    reader.onerror = (event) => {
      this.uploadProgresses[index] = 0;
      this.onProgress.emit({
        progresses: this.uploadProgresses,
        originalEvent: event,
      });
      this.updateFilesProcessed();
    };

    reader.readAsArrayBuffer(file);
  }

  updateFilesProcessed() {
    this.filesProcessed++;
    this.filesProcessedSubject.next(this.filesProcessed);
  }

  reset() {
    if (this.fileInputViewChild && this.fileInputViewChild.nativeElement) {
      this.fileInputViewChild.nativeElement.value = '';
    }

    this.filesProcessed = 0;
  }

  clearInput() {
    this.uploadedFiles = [];
    this.uploadProgresses = [];
  }

  ngOnDestroy() {
    this.filesProcessedSubscription.unsubscribe();
  }
}
