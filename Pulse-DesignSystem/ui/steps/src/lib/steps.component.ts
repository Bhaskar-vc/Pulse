import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepDef, StepState, StepsSize, StepsTheme, StepsVariant } from './steps.types';

@Component({
  standalone: true,
  selector: 'v-steps',
  imports: [CommonModule],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VSteps implements OnChanges {
  /** Step definitions */
  @Input() steps: StepDef[] = [];

  /** Active step index (0-based); auto-sets step states if states not provided */
  @Input() activeStep = -1;

  /** Visual size variant */
  @Input() size: StepsSize = 'md';

  /** Vertical orientation (classic only) */
  @Input() vertical = false;

  /** Component variant: classic numbered circles or compact pill style */
  @Input() variant: StepsVariant = 'classic';

  /** Theme for pill variant */
  @Input() theme: StepsTheme = 'default';

  /** Connector style for pill variant: line dash or arrow chevron */
  @Input() separator: 'line' | 'arrow' = 'line';

  stepsClass = '';
  pillClass = '';

  ngOnChanges(): void {
    const parts = ['steps'];
    if (this.size !== 'md') parts.push(`steps--${this.size}`);
    if (this.vertical) parts.push('steps--vertical');
    this.stepsClass = parts.join(' ');

    const pillParts = ['steps-check'];
    if (this.theme !== 'default') pillParts.push(`steps-check--${this.theme}`);
    if (this.size === 'sm') pillParts.push('steps-check--sm');
    if (this.size === 'lg') pillParts.push('steps-check--lg');
    this.pillClass = pillParts.join(' ');

    if (this.activeStep >= 0) {
      this.steps = this.steps.map((s, i) => ({
        ...s,
        state: s.state ?? this.inferState(i),
      }));
    }
  }

  stepClass(step: StepDef): string {
    const parts = ['step'];
    if (step.state) parts.push(`is-${step.state}`);
    return parts.join(' ');
  }

  pillItemClass(step: StepDef): string {
    const parts = ['steps-check-item'];
    if (step.state === 'done') parts.push('is-done');
    else if (step.state === 'active') parts.push('is-active');
    return parts.join(' ');
  }

  /** Arrow color: green if preceding step is done, gray otherwise */
  arrowColor(step: StepDef): string {
    return step.state === 'done' ? '#039855' : '#d0d5dd';
  }

  private inferState(index: number): StepState {
    if (index < this.activeStep) return 'done';
    if (index === this.activeStep) return 'active';
    return 'pending';
  }
}
