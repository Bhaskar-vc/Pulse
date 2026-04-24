import {
  Directive,
  ElementRef,
  Host,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { VcAutocomplete } from './autocomplete.component';
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
import { Subscription, distinctUntilChanged } from 'rxjs';
import {
  VcSelectOption,
  VcSelectionChangeEvent,
} from '@vantagecircle/vantage-ui/listbox';
import { VC_FORM_CONTROL, VcFormControl } from '@vantagecircle/vantage-ui/core';
import { VcAutocompleteOptionsChangeEvent } from './autocomplete.types';

export const VC_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken<
  () => ScrollStrategy
>('vc-autocomplete-scroll-strategy', {
  providedIn: 'root',
  factory: () => {
    const overlay = inject(Overlay);
    return () => overlay.scrollStrategies.reposition();
  },
});

@Directive({
  selector: 'vc-input-field[vcAutocomplete]',
  host: {
    role: 'combobox',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur($event)',
    '(input)': 'handleInput($event)',
    '(click)': 'handleClick()',
    '(onFocus)': 'handleFocus()',
    '(onBlur)': 'handleBlur($event)',
    '(onInput)': 'handleInput($event)',
    '(keydown)': 'handleKeydown($event)',
  },
  exportAs: 'vcAutocomplete',
  standalone: true,
})
export class VcAutocompleteDirective implements OnInit, OnDestroy {
  @Input('vcAutocomplete') autocomplete!: VcAutocomplete;
  @Input() position: 'auto' | 'above' | 'below' = 'auto';
  @Input() multiple: boolean = false;

  private _overlayRef!: OverlayRef | null;
  private _portal!: TemplatePortal;
  private _positionStrategy!: FlexibleConnectedPositionStrategy;
  private _aboveClass = '';
  private _optionSelectedSubscription = Subscription.EMPTY;
  private _optionsChangeSubscription = Subscription.EMPTY;
  private _outsidePointerEventsSubscription = Subscription.EMPTY;
  private _viewportSubscription = Subscription.EMPTY;
  private _scrollStrategy!: () => ScrollStrategy;

  menuOpen: boolean = false;
  readyToAttach: boolean = false;

  constructor(
    public _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _overlay: Overlay,
    private _viewportRuler: ViewportRuler,
    @Inject(VC_AUTOCOMPLETE_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional()
    @Inject(VC_FORM_CONTROL)
    @Host()
    private _formControl: VcFormControl,
  ) {
    this._scrollStrategy = scrollStrategy;
  }

  ngOnInit() {
    this._optionSelectedSubscription = this.autocomplete.onSelect.subscribe(
      (event: VcSelectionChangeEvent) => {
        this.handleSelectionChange(event);
      },
    );

    this._optionsChangeSubscription =
      this.autocomplete.onOptionsChange.subscribe(
        (event: VcAutocompleteOptionsChangeEvent) => {
          // if (event.options?.length === 0) {
          //   this._detachOverlay();
          // }
        },
      );
  }

  handleFocus() {
    this._attachOverlay();
  }

  handleBlur(event: Event) {
  }

  handleClick() {
    this._attachOverlay();
  }

  handleKeydown(event: KeyboardEvent) {
    this.autocomplete.handleKeyDown(event, this.menuOpen);
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    if (!value && !this.multiple) {
      this.autocomplete.clearSelection();
    }

    if (!this.readyToAttach) {
      this.readyToAttach = true;
      return;
    }

    if (!this.menuOpen) {
      this._attachOverlay();
    }
  }

  handleSelectionChange(event: VcSelectionChangeEvent) {
    const selected = event.selected;

    if (!this.multiple) {
      const value: VcSelectOption = (selected as VcSelectOption[])[0];
      this._assignValue(value);
      this._detachOverlay();
    }

    // const value: VcSelectOption | null = this.multiple ? null : (selected as VcSelectOption[])[0];
    // this._assignValue(value);
    // this._detachOverlay();
  }

  private _getConnectedElement(): ElementRef<HTMLElement> {
    return this._elementRef;
  }

  private _getHostWidth(): number {
    return (
      this._getConnectedElement().nativeElement as HTMLElement
    ).getBoundingClientRect().width;
  }

  private _getDisplayValue(value: VcSelectOption): VcSelectOption | string {
    const autocomplete = this.autocomplete;
    return autocomplete && autocomplete.displayFormatter
      ? autocomplete.displayFormatter(value)
      : value.text;
  }

  private _assignValue(value: VcSelectOption | null): void {
    const toDisplay = !value ? '' : this._getDisplayValue(value);
    const valueToBeAssigned = !value ? '' : value;

    if (this._formControl && this._formControl.setControl) {
      this._formControl.setControl(valueToBeAssigned, toDisplay);
    }
    
    // const toDisplay = this._getDisplayValue(value);
    // if (this._formControl && this._formControl.setControl) {
    //   this._formControl.setControl(value, toDisplay);
    // }

    // const toDisplay = this.multiple ? '' : this._getDisplayValue(value[0]);
    // const valueToBeAssigned = this.multiple ? '' : value[0];
    // if (this._formControl && this._formControl.setControl) {
    //   this._formControl.setControl(valueToBeAssigned, toDisplay);
    // }
  }

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

    if (this.position === 'above') {
      positions = abovePositions;
    } else if (this.position === 'below') {
      positions = belowPositions;
    } else {
      positions = [...belowPositions, ...abovePositions];
    }

    positionStrategy.withPositions(positions);
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
      width: this._getHostWidth(),
    });
  }

  private _attachOverlay(): void {
    let overlayRef = this._overlayRef;

    if (!overlayRef) {
      this._portal = new TemplatePortal(
        this.autocomplete.template,
        this._viewContainerRef,
      );

      overlayRef = this._overlay.create(this._getOverlayConfig());
      this._overlayRef = overlayRef;

      this._viewportSubscription = this._viewportRuler
        .change()
        .subscribe(() => {
          if (this.menuOpen && overlayRef) {
            overlayRef.updateSize({ width: this._getHostWidth() });
          }
        });
    } else {
      this._positionStrategy.setOrigin(this._getConnectedElement());
      overlayRef.updateSize({ width: this._getHostWidth() });
    }

    if (overlayRef && !overlayRef.hasAttached()) {
      this.autocomplete.setMenuWidth(this._getHostWidth());
      overlayRef.attach(this._portal);
      this.menuOpen = true;

      this._observeInputResize();

      this._outsidePointerEventsSubscription.unsubscribe();
      this._outsidePointerEventsSubscription = overlayRef
        .outsidePointerEvents()
        .subscribe((event) => {
          this._handleOutsideClick(event);
        });
    }
  }

  private _detachOverlay() {
    this._overlayRef?.detach();
    this.menuOpen = false;
    this._outsidePointerEventsSubscription.unsubscribe();
    this._viewportSubscription.unsubscribe();
  }

  private _observeInputResize(): void {
    const inputElement = this._getConnectedElement().nativeElement;
    const resizeObserver = new ResizeObserver(() => {
      if (this._overlayRef) {
        this.autocomplete.setMenuWidth(this._getHostWidth());
        this._overlayRef.updatePosition();
      }
    });

    resizeObserver.observe(inputElement);

    this._overlayRef?.detachments().subscribe(() => {
      resizeObserver.unobserve(inputElement);
      resizeObserver.disconnect();
    });
  }

  private _resetReadyToAttach() {
    setTimeout(() => {
      this.readyToAttach = true;
    });
  }

  private _handleOutsideClick(event: MouseEvent): void {
    const clickTarget = event.target;

    if (
      !this._elementRef?.nativeElement?.contains(clickTarget) &&
      !this.autocomplete.vcAutocompleteMenuViewChild?.nativeElement?.contains(
        clickTarget,
      )
    ) {
      if (this.multiple) this._assignValue(null);
      this._detachOverlay();
    }
  }

  ngOnDestroy() {
    this._optionSelectedSubscription.unsubscribe();
    this._optionsChangeSubscription.unsubscribe();
    this._viewportSubscription.unsubscribe();
    this._outsidePointerEventsSubscription.unsubscribe();
  }
}
