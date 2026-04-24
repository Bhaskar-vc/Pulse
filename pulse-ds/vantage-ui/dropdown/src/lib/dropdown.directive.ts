import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { VcDropdown } from './dropdown.component';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { VcDropdownMenuItemClickEvent } from './dropdown.interface';

export const VC_DROPDOWN_SCROLL_STRATEGY = new InjectionToken<
  () => ScrollStrategy
>('vc-dropdown-scroll-strategy', {
  providedIn: 'root',
  factory: () => {
    const overlay = inject(Overlay);
    return () => overlay.scrollStrategies.reposition();
  },
});

@Directive({
  selector: 'button, [vcDropdown]',
  standalone: true,
})
export class VcDropdownDirective implements OnInit, OnDestroy {
  @Input() vcDropdown!: VcDropdown;

  private _position = 'auto';
  private _aboveClass = '';
  private _overlayRef!: OverlayRef | null;
  private _portal!: TemplatePortal;
  private _positionStrategy!: FlexibleConnectedPositionStrategy;
  private _itemSelectedSubscription = Subscription.EMPTY;
  private _outsidePointerEventsSubscription = Subscription.EMPTY;
  private _viewportSubscription = Subscription.EMPTY;
  private _scrollStrategy!: () => ScrollStrategy;

  menuOpen: boolean = false;

  constructor(
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _overlay: Overlay,
    private _viewportRuler: ViewportRuler,
    @Inject(VC_DROPDOWN_SCROLL_STRATEGY) scrollStrategy: any,
  ) {
    this._scrollStrategy = scrollStrategy;
  }

  ngOnInit() {
    if (this.vcDropdown) {
      this._itemSelectedSubscription =
        this.vcDropdown.onClickMenuItem.subscribe(() => {
          this._detachOverlay();
        });
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.stopPropagation();

    if (this.vcDropdown) {
      if (this.menuOpen) {
        this._detachOverlay();
      } else {
        this._attachOverlay();
      }
    }

    // if (this.vcDropdown) {
    //   this.vcDropdown.toggleMenu(
    //     !this.vcDropdown.showMenu,
    //     this._elementRef.nativeElement as HTMLElement,
    //   );
    // }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.vcDropdown && this.vcDropdown.showMenu) {
      if (
        !this._elementRef.nativeElement.contains(event.target) &&
        !this.vcDropdown.isClickInside(event)
      ) {
        // this.vcDropdown.toggleMenu(false);
        this._detachOverlay();
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.vcDropdown && this.menuOpen) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.vcDropdown.hoverUp(event);
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.vcDropdown.hoverDown(event);
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        this.vcDropdown.handleEnterPress(event);
      }
    }
  }

  // private _getDropdownMenuWidth(): number {
  //   if(this.vcDropdown?.getMenuWidth)
  // }

  private _setStrategyPositions(
    positionStrategy: FlexibleConnectedPositionStrategy,
    topMargin: number = 0,
  ) {
    const belowPositions: ConnectedPosition[] = [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: topMargin,
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: topMargin,
      },
    ];

    const panelClass = this._aboveClass;
    const abovePositions: ConnectedPosition[] = [
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        panelClass,
        offsetY: topMargin,
      },
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        panelClass,
        offsetY: topMargin,
      },
    ];

    let positions: ConnectedPosition[];

    if (this._position === 'above') {
      positions = abovePositions;
    } else if (this._position === 'below') {
      positions = belowPositions;
    } else {
      positions = [...belowPositions, ...abovePositions];
    }

    positionStrategy.withPositions(positions);
  }

  private _getConnectedElement(): ElementRef<HTMLElement> {
    return this._elementRef;
  }

  private _getOverlayPosition(): PositionStrategy {
    const strategy = this._overlay
      .position()
      .flexibleConnectedTo(this._getConnectedElement())
      .withFlexibleDimensions(false)
      .withPush(false);

    this._setStrategyPositions(strategy, 8);
    this._positionStrategy = strategy;
    return strategy;
  }

  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._getOverlayPosition(),
      scrollStrategy: this._scrollStrategy(),
      width: this.vcDropdown.getMenuWidth(),
    });
  }

  private _attachOverlay(): void {
    let overlayRef = this._overlayRef;

    if (!overlayRef) {
      this._portal = new TemplatePortal(
        this.vcDropdown.template,
        this._viewContainerRef,
      );

      overlayRef = this._overlay.create(this._getOverlayConfig());
      this._overlayRef = overlayRef;

      // this._viewportSubscription = this._viewportRuler
      //   .change()
      //   .subscribe(() => {
      //     if (this.menuOpen && overlayRef) {
      //       overlayRef.updateSize({ width: this._getHostWidth() });
      //     }
      //   });
    } else {
      this._positionStrategy.setOrigin(this._getConnectedElement());
      // overlayRef.updateSize({ width: this._getHostWidth() });
    }

    if (overlayRef && !overlayRef.hasAttached()) {
      // this.autocomplete.setMenuWidth(this._getHostWidth());
      this.vcDropdown.resetActiveIndex();
      overlayRef.attach(this._portal);
      this.menuOpen = true;

      // this._observeInputResize();

      this._outsidePointerEventsSubscription.unsubscribe();
      this._outsidePointerEventsSubscription = overlayRef
        .outsidePointerEvents()
        .subscribe((event) => {
          this._handleOutsideClick(event);
        });
    }
  }

  private _handleOutsideClick(event: MouseEvent): void {
    const clickTarget = event.target;

    if (
      !this._elementRef?.nativeElement?.contains(clickTarget) &&
      !this.vcDropdown.vcDropdownMenuViewChild?.nativeElement?.contains(
        clickTarget,
      )
    ) {
      this._detachOverlay();
    }
  }

  private _detachOverlay() {
    this._overlayRef?.detach();
    this.menuOpen = false;
    this._outsidePointerEventsSubscription.unsubscribe();
    this._viewportSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this._itemSelectedSubscription.unsubscribe();
    this._viewportSubscription.unsubscribe();
    this._outsidePointerEventsSubscription.unsubscribe();
  }
}
