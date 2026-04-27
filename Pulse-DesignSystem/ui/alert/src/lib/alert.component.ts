import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertType, AlertVariant, AlertSize } from './alert.enums';

@Component({
  standalone: true,
  selector: 'v-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VAlert implements OnChanges {
  /** Alert semantic type */
  @Input() type: `${AlertType}` = AlertType.INFO;

  /** Visual variant */
  @Input() variant: `${AlertVariant}` = AlertVariant.DEFAULT;

  /** Size */
  @Input() size: `${AlertSize}` = AlertSize.DEFAULT;

  /** Bold title line */
  @Input() title = '';

  /** Body message text */
  @Input() message = '';

  /** Show dismiss (×) button */
  @Input() dismissible = false;

  /** Underlined action link label */
  @Input() actionLabel = '';

  /** Emitted after dismiss animation completes */
  @Output() dismissed = new EventEmitter<void>();

  /** Emitted when the action link is clicked */
  @Output() actionClicked = new EventEmitter<void>();

  isDismissing = false;
  classes = '';

  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(): void {
    this.updateClasses();
  }

  dismiss(): void {
    this.isDismissing = true;
    this.updateClasses();
    this.cdr.markForCheck();
    setTimeout(() => this.dismissed.emit(), 220);
  }

  onAction(): void {
    this.actionClicked.emit();
  }

  private updateClasses(): void {
    const parts = ['alert', `alert-${this.type}`];
    if (this.variant !== 'default') parts.push(`alert-${this.variant}`);
    if (this.size === 'sm') parts.push('alert-sm');
    if (this.isDismissing) parts.push('dismissing');
    this.classes = parts.join(' ');
  }
}
