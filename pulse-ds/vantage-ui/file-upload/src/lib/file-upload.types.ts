export type VcFileUploadEvent = {
  /**
   * Chosen files.
   */
  uploaded: File[];
  /**
   * Browser event.
   */
  originalEvent?: Event;
};

export type VcFileRemoveEvent = {
  /**
   * Remove index.
   */
  index: number;
};

export type VcFileUploadProgressEvent = {
  /**
   * Upload progress.
   */
  progresses: number[];
  /**
   * Browser event.
   */
  originalEvent?: Event;
};
