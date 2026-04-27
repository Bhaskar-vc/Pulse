import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

export type PopoverPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

const popAnim = trigger('pop', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate('140ms cubic-bezier(.05,.9,.4,1)', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
  ]),
]);

@Component({
  standalone: true,
  selector: 'v-popover',
  imports: [CommonModule],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [popAnim],
})
export class VPopover {
  /** Popover header title */
  @Input() title = '';

  /** Placement relative to the trigger */
  @Input() placement: PopoverPlacement = 'bottom';

  /** Gap between trigger and panel (px) */
  @Input() offset = 8;

  /** Show the arrow pointer */
  @Input() showArrow = true;

  /** Close when user clicks outside */
  @Input() closeOnOutsideClick = true;

  /** Emitted when the popover opens */
  @Output() opened = new EventEmitter<void>();

  /** Emitted when the popover closes */
  @Output() closed = new EventEmitter<void>();

  isOpen = false;

  private el    = inject(ElementRef);
  private cdr   = inject(ChangeDetectorRef);

  // ── Open / close ─────────────────────────────────────────────

  toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  open(): void {
    this.isOpen = true;
    this.opened.emit();
    this.cdr.markForCheck();
  }

  close(): void {
    this.isOpen = false;
    this.closed.emit();
    this.cdr.markForCheck();
  }

  // ── Outside click ─────────────────────────────────────────────

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event): void {
    if (!this.closeOnOutsideClick || !this.isOpen) return;
    if (!(this.el.nativeElement as HTMLElement).contains(e.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.isOpen) this.close();
  }

  // ── CSS helpers ───────────────────────────────────────────────

  get panelClass(): string {
    return `pop-panel pop-panel--${this.placement}`;
  }

  get arrowClass(): string {
    return `pop-arrow pop-arrow--${this.placement}`;
  }
}
