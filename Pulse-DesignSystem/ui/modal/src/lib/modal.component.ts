import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'v-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VModal implements OnChanges, OnDestroy {
  /** Controls modal visibility */
  @Input() isOpen = false;

  /** Modal title text */
  @Input() title = '';

  /** Modal body text (use [modalBody] slot for richer content) */
  @Input() body = '';

  /** Size variant */
  @Input() size: 'default' | 'wide' = 'default';

  /** Center icon + text layout (stacked only) */
  @Input() centered = false;

  /** Show X close button in header */
  @Input() showClose = true;

  /** Actions alignment: 'between' | 'right' | 'center' | 'stacked' */
  @Input() actionsAlign: 'between' | 'right' | 'center' | 'stacked' = 'between';

  /** Close when clicking the backdrop */
  @Input() closeOnBackdrop = true;

  /** Featured icon intent — 'none' hides the icon */
  @Input() intent: 'none' | 'success' | 'warning' | 'error' | 'info' = 'none';

  /** Layout: stacked (default) or horizontal (icon left, content right) */
  @Input() layout: 'stacked' | 'horizontal' = 'stacked';

  /** Variant: modal (default) or drawer (slides in from right) */
  @Input() variant: 'modal' | 'drawer' = 'modal';

  /** Contain overlay within a relative-positioned parent (use in Storybook stories) */
  @Input() contained = false;

  /** Emitted when modal requests close */
  @Output() closed = new EventEmitter<void>();

  actionsClass = '';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnChanges(): void {
    const map: Record<string, string> = {
      between: 'modal-actions',
      right:   'modal-actions modal-actions--right',
      center:  'modal-actions modal-actions--centered',
      stacked: 'modal-actions modal-actions--stacked',
    };
    this.actionsClass = map[this.actionsAlign] ?? 'modal-actions';

    if (isPlatformBrowser(this.platformId) && !this.contained) {
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && !this.contained) {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.isOpen) this.close();
  }

  close(): void {
    this.closed.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.close();
    }
  }
}
