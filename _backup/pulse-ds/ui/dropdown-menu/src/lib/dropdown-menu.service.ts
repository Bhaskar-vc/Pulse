import { ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Injectable, signal } from '@angular/core';
import { DropdownMenuConfig } from './dropdown-menu.types';
import { VDropdownMenuContent } from './dropdown-menu-content.component';

@Injectable()
export class VDropdownMenuService {
  private contentRef = signal<VDropdownMenuContent | null>(null);
  readonly contentSignal = this.contentRef.asReadonly();

  constructor(private overlay: Overlay) {}

  setContent(content: VDropdownMenuContent) {
    this.contentRef.set(content);
  }

  getContent() {
    return this.contentRef();
  }

  createDropdownMenu(origin: HTMLElement, config: DropdownMenuConfig = {}): OverlayRef {
    const defaultPositions: ConnectionPositionPair[] = [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetX: config.offsetX || 0,
        offsetY: config.offsetY || 4,
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetX: config.offsetX || 0,
        offsetY: config.offsetY || -4,
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetX: config.offsetX || 0,
        offsetY: config.offsetY || 4,
      },
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetX: config.offsetX || 0,
        offsetY: config.offsetY || -4,
      },
    ];

    const overlayConfig: OverlayConfig = {
      hasBackdrop: config.hasBackdrop !== false,
      backdropClass: config.backdropClass || 'cdk-overlay-transparent-backdrop',
      panelClass: config.panelClass || '',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(origin)
        .withPositions(config.positions || defaultPositions)
        .withPush(false)
        .withFlexibleDimensions(false),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    };

    return this.overlay.create(overlayConfig);
  }
}
