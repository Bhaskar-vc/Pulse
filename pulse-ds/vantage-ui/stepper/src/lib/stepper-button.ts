import { CdkStepperNext, CdkStepperPrevious } from "@angular/cdk/stepper";
import { Directive } from "@angular/core";

/**
 * Button that moves to the next step in the stepper flow
 */
@Directive({
    selector: 'button[vcStepperNext], vc-button[vcStepperNext]',
    standalone: true,
})

export class VcStepperNext extends CdkStepperNext {}

/**
 * Button that moves to the previoustep in the stepper flow
 */
@Directive({
    selector: 'button[vcStepperPrevious], vc-button[vcStepperPrevious]',
    standalone: true,
})

export class VcStepperPrevious extends CdkStepperPrevious {}