import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'v-empty-state',
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VEmptyState implements OnChanges {
  /** Title text */
  @Input() title = '';

  /** Description text */
  @Input() description = '';

  /** Size variant */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Wrap in bordered container box */
  @Input() containerStyle = false;

  /** Show illustration slot */
  @Input() hasIllustration = true;

  emptyClass = '';

  ngOnChanges(): void {
    const inner = this.size !== 'md' ? `empty empty--${this.size}` : 'empty';
    this.emptyClass = this.containerStyle
      ? `empty-container`
      : inner;
  }
}
