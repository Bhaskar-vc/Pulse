import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'v-tab-item',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VTabItem {
  /** Tab header label */
  @Input() label = '';

  /** Optional count/badge shown next to the label */
  @Input() count: string | number = '';

  /** Disabled state */
  @Input() disabled = false;

  /** Internal index, set by VTabs */
  index = 0;

  /** Active state, set by VTabs */
  isActive = false;

  @HostBinding('style.display') get display(): string {
    return this.isActive ? 'block' : 'none';
  }

  @HostBinding('style.paddingTop') get pt(): string {
    return this.isActive ? '20px' : '0';
  }

  readonly cdr = inject(ChangeDetectorRef);
}
