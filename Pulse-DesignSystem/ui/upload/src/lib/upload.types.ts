export interface UploadedFile {
  file: File;
  name: string;
  size: number;
  type: string;
  /** Human-readable size e.g. "2.3 MB" */
  sizeLabel: string;
  /** Object URL for preview (images only) */
  previewUrl?: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  progress?: number;
  error?: string;
}
