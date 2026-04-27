import { CdkStepLabel } from '@angular/cdk/stepper';
import { Directive } from '@angular/core';

@Directive({
  selector: '[vcStepLabel]',
  standalone: true,
})
export class VcStepLabel extends CdkStepLabel {
  //constructor() {}
}
