import {
  Component,
  Input,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  ViewContainerRef,
  ContentChild,
  AfterContentInit,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Overlay, OverlayRef, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { VTooltipTrigger } from './tooltip-trigger.component';
import { VTooltipContent } from './tooltip-content.component';
import { TooltipColor, TooltipPlacement } from './tooltip.types';
import { arrowVariants, tooltipVariants } from './tooltip.variants';
import { VTooltipService } from './tooltip.service';

@Component({
    standalone: true,
    selector: 'v-tooltip',
    imports: [OverlayModule],
    template: ` <ng-content select="v-tooltip-trigger"></ng-content> `,
    styles: [`
    :host {
      display: inline-flex;
    }
  `]
})
export class VTooltip implements AfterContentInit, OnDestroy {
  @Input() color: TooltipColor = 'default';
  @Input() placement: TooltipPlacement = 'top';
  @Input() offset: number = 8;
  @Input() openDelay: number = 0;
  @Input() closeDelay: number = 0;
  @Input() customClass: string = '';

  @ContentChild(VTooltipTrigger) triggerComponent!: VTooltipTrigger;
  @ContentChild(VTooltipContent) contentComponent!: VTooltipContent;

  private overlayRef?: OverlayRef;
  private tooltipPortal?: TemplatePortal;
  private openTimeout?: number;
  private closeTimeout?: number;
  private listeners: Array<() => void> = [];

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private tooltipService: VTooltipService,
    @Inject(PLATFORM_ID) private platformId: unknown,
  ) {}

  ngAfterContentInit(): void {
    if (!isPlatformBrowser(this.platformId as object) || !this.triggerComponent?.element) return;

    const triggerElement = this.triggerComponent.element;

    const mouseEnterListener = this.renderer.listen(triggerElement, 'mouseenter', () => this.handleShow());

    const mouseLeaveListener = this.renderer.listen(triggerElement, 'mouseleave', () => this.handleHide());

    const keydownListener = this.renderer.listen(triggerElement, 'keydown', (event: KeyboardEvent) =>
      this.handleKeydown(event),
    );

    const touchStartHandler = () => this.handleShow();

    triggerElement.addEventListener('touchstart', touchStartHandler, { passive: true });

    const touchStartCleanup = () => {
      triggerElement.removeEventListener('touchstart', touchStartHandler);
    };

    this.listeners.push(mouseEnterListener, mouseLeaveListener, keydownListener, touchStartCleanup);
  }

  ngOnDestroy(): void {
    this.clearTimeouts();
    this.destroyOverlay();
    this.removeEventListeners();
  }

  get tooltipClass(): string {
    return tooltipVariants({ color: this.color, class: this.customClass });
  }

  get arrowClass(): string {
    return arrowVariants({ color: this.color, placement: this.placement });
  }

  private removeEventListeners(): void {
    this.listeners.forEach((unlisten) => unlisten());
    this.listeners = [];
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleShow();
    } else if (event.key === 'Escape') {
      this.handleHide();
    }
  }

  private handleShow(): void {
    this.clearTimeouts();

    if (this.openDelay > 0) {
      this.openTimeout = window.setTimeout(() => this.showTooltip(), this.openDelay);
    } else {
      this.showTooltip();
    }
  }

  private handleHide(): void {
    this.clearTimeouts();

    if (this.closeDelay > 0) {
      this.closeTimeout = window.setTimeout(() => this.destroyOverlay(), this.closeDelay);
    } else {
      this.destroyOverlay();
    }
  }

  private showTooltip(): void {
    if (this.overlayRef) return;

    const triggerElement = this.triggerComponent.element;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerElement)
      .withFlexibleDimensions(false)
      .withPush(false)
      .withPositions([this.tooltipService.getConnectedPosition(this.placement, this.offset)]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
      panelClass: 'v-tooltip-panel',
    });

    if (!this.tooltipPortal && this.contentComponent?.templateRef) {
      this.contentComponent.tooltipClass = this.tooltipClass;
      this.contentComponent.arrowClass = this.arrowClass;
      this.tooltipPortal = new TemplatePortal(this.contentComponent.templateRef, this.viewContainerRef);
    }

    if (this.tooltipPortal) {
      this.overlayRef.attach(this.tooltipPortal);
    }
  }

  private destroyOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  private clearTimeouts(): void {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = undefined;
    }
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }
  }
}
