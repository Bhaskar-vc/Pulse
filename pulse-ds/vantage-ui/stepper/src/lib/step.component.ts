import {
  AfterContentInit,
  Component,
  ContentChild,
  forwardRef,
  Inject,
  OnDestroy,
  Optional,
  QueryList,
  SkipSelf,
  ViewContainerRef,
} from '@angular/core';

import {
  CdkStep,
  STEPPER_GLOBAL_OPTIONS,
  StepperOptions,
} from '@angular/cdk/stepper';
import { VcStepLabel } from './step-label.directive';
import { VcStepContent } from './step-content.directive';
import { VcStepper } from './stepper.component';
import { map, startWith, Subscription, switchMap } from 'rxjs';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';

@Component({
    standalone: true,
    selector: 'vc-step',
    imports: [PortalModule],
    templateUrl: './step.component.html',
    styleUrl: './step.component.scss',
    providers: [{ provide: CdkStep, useExisting: VcStep }]
})
export class VcStep extends CdkStep implements AfterContentInit, OnDestroy {
  private _isSelected = Subscription.EMPTY;
  // steps: QueryList<VcStep> = new QueryList<VcStep>;
  @ContentChild(VcStepLabel) override stepLabel: VcStepLabel = undefined!;

  @ContentChild(VcStepContent, { static: false }) _lazyContent?: VcStepContent;

  _portal?: TemplatePortal;

  constructor(
    @Inject(forwardRef(() => VcStepper)) stepper: VcStepper,
    //@SkipSelf() private _errorStateMatcher: ErrorStateMatcher,
    private _viewContaierRef: ViewContainerRef,
    @Optional() @Inject(STEPPER_GLOBAL_OPTIONS) stepperOptions?: StepperOptions,
  ) {
    super(stepper, stepperOptions);
  }

  ngAfterContentInit() {
    this._isSelected = this._stepper.steps.changes.pipe(
      switchMap(() => 
        this._stepper.selectionChange.pipe(
          map((event) => event.selectedStep === this),
          startWith(this._stepper.selected === this),
        )
      ),
    ).subscribe(isSelected => {
      if(isSelected && this._lazyContent && !this._portal) {
        this._portal = new TemplatePortal(this._lazyContent._template, this._viewContaierRef!);
      }
    });
  }

  ngOnDestroy() {
    this._isSelected.unsubscribe();
  }
}
