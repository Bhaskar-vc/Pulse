import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagColor, TagSize, TagVariant } from './tag.enums';

@Component({
  standalone: true,
  selector: 'v-tag',
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VTag implements OnChanges {
  /** Visual variant */
  @Input() variant: `${TagVariant}` = TagVariant.LIGHT;

  /** Semantic color */
  @Input() color: `${TagColor}` = TagColor.PRIMARY;

  /** Size */
  @Input() size: `${TagSize}` = TagSize.MD;

  /** Show a colored dot before the label */
  @Input() showDot = false;

  /** Show dismiss (x) button */
  @Input() dismissible = false;

  /** Accessible label for screen readers */
  @Input() ariaLabel = '';

  /** Emitted when the dismiss button is clicked */
  @Output() dismissed = new EventEmitter<void>();

  colorVariantClass = '';

  ngOnChanges(): void {
    this.colorVariantClass = `tag-${this.color}-${this.variant}`;
  }

  onDismiss(event: MouseEvent): void {
    event.stopPropagation();
    this.dismissed.emit();
  }
}
