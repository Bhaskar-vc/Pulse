import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepHeader, StepState } from '@angular/cdk/stepper';
import { VcStepLabel } from './step-label.directive';

@Component({
    standalone: true,
    selector: 'vc-step-header',
    imports: [CommonModule],
    templateUrl: './step-header.component.html',
    styleUrl: './step-header.component.scss'
})
export class VcStepHeader extends CdkStepHeader {
  @Input() state?: StepState;

  @Input() selected?: boolean;

  @Input() label?: VcStepLabel | string;

  @Input() index?: number;

  @Input() active?: boolean;

  @Input() isFirst?: boolean;

  @Input() isLast?: boolean;

  @Input() orientation?: string;
}
