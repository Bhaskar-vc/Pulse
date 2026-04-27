import { ConnectionPositionPair } from '@angular/cdk/overlay';

export interface DropdownMenuConfig {
  panelClass?: string;
  backdropClass?: string;
  hasBackdrop?: boolean;
  disableClose?: boolean;
  offsetX?: number;
  offsetY?: number;
  positions?: ConnectionPositionPair[];
}
