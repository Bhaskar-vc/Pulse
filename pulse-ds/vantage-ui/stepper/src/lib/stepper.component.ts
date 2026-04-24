import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, Optional, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepper } from '@angular/cdk/stepper';
import { VcStepHeader } from './step-header.component';
import { VcStep } from './step.component';
import { takeUntil } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { vcStepperAnimations } from './stepper-animations';

@Component({
    standalone: true,
    selector: 'vc-stepper, vc-vertical-stepper, vc-horizontal-stepper, [vcStepper]',
    imports: [CommonModule, VcStepHeader],
    templateUrl: './stepper.component.html',
    styleUrl: './stepper.component.scss',
    host: {
        '[class.vc-stepper-horizontal]': 'orientation === "horizontal"',
        '[class.vc-stepper-vertical]': 'orientation === "vertical"',
    },
    providers: [{ provide: CdkStepper, useExisting: VcStepper }],
    animations: [vcStepperAnimations.horizontalStepTransition, vcStepperAnimations.verticalStepTransition]
})
export class VcStepper extends CdkStepper implements AfterContentInit {
  @ViewChildren(VcStepHeader) override _stepHeader: QueryList<VcStepHeader> = undefined as unknown as QueryList<VcStepHeader>;

  @ContentChildren(VcStep, {descendants: true}) override _steps: QueryList<VcStep> = undefined as unknown as QueryList<VcStep>;

  @Input() linearMode: boolean = true;

  @Input() stepperPosition: string | 'top' | 'bottom' = 'top';

  constructor(
    @Optional() dir: Directionality,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef<HTMLElement>,
  ) {
    super(dir, changeDetectorRef, elementRef);
    const nodeName = elementRef.nativeElement.nodeName.toLowerCase();
    this.orientation = nodeName === 'vc-vertical-stepper' ? 'vertical' : 'horizontal';
  }

  override readonly steps: QueryList<VcStep> = new QueryList<VcStep>();

  onClick(index: number): void {
    this.selectedIndex = index;
  }

  override ngAfterContentInit() {
    super.ngAfterContentInit();

    this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._stateChanged();
    })

    // console.log("Steps: ", this.steps);
    // for(let step of this.steps) {
      // console.log("Step: ", step);
    // }
  }

  _stepIsNavigable(index: number, step: VcStep): boolean {
    return step.completed || this.selectedIndex === index || !this.linear;
  }
}
