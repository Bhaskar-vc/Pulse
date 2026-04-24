import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';

type TooltipTrigger = 'hover' | 'click';
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Component({
    standalone: true,
    selector: 'vc-tooltip-v2',
    imports: [CommonModule],
    templateUrl: './vc-tooltip-v2.component.html',
    styleUrls: ['./vc-tooltip-v2.component.scss']
})
export class VcTooltipV2 implements OnInit, OnDestroy{
  @Input() trigger: TooltipTrigger = 'hover';
  @Input() placement: TooltipPlacement = 'bottom';

  @ContentChild('tooltipTrigger', { static: true }) triggerTemplate!: TemplateRef<any>;
  @ContentChild('tooltipContent', { static: true }) contentTemplate!: TemplateRef<any>;

  show = false;
  private documentClickSub?: Subscription;

  @ViewChild('triggerWrapper', { read: ElementRef, static: true })
  triggerWrapperRef!: ElementRef<HTMLElement>;

  @ViewChild('tooltipWrapper', { read: ElementRef, static: true })
  tooltipWrapperRef!: ElementRef<HTMLDivElement>;

  constructor(
    private host: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    if (this.trigger === 'click') {
      this.documentClickSub = fromEvent<MouseEvent>(document, 'click').subscribe(evt => {
        if (this.show && !this.host.nativeElement.contains(evt.target as Node)) {
          this.hideTooltip();
        }
      });
    }
  }

  ngOnDestroy() {
    this.documentClickSub?.unsubscribe();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.trigger === 'hover') {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.trigger === 'hover') {
      this.hideTooltip();
    }
  }

  @HostListener('click', ['$event'])
  onClick(evt: MouseEvent) {
    if (this.trigger === 'click') {
      this.show ? this.hideTooltip() : this.showTooltip();
      evt.stopPropagation();
    }
  }

  private showTooltip() {
    this.show = true;
    this.cdr.markForCheck();
    setTimeout(() => this.positionTooltip(), 0);
  }

  private hideTooltip() {
    this.show = false;
    this.cdr.markForCheck();
  }

  private positionTooltip() {
    const triggerEl = this.triggerWrapperRef.nativeElement;
    const tooltipEl = this.tooltipWrapperRef.nativeElement;

    this.renderer.removeStyle(tooltipEl, 'top');
    this.renderer.removeStyle(tooltipEl, 'left');

    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    let top: number, left: number;

    switch (this.placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;

      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;

      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        break;

      case 'right':
      default:
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + 8;
        break;
    }

    if (top < 0) {
      top = triggerRect.bottom + 8;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
    }

    // Clamp within viewport horizontally to avoid overflow
    const vw = window.innerWidth;
    const margin = 8;
    if (left < margin) left = margin;
    if (left + tooltipRect.width > vw - margin) {
      left = Math.max(margin, vw - tooltipRect.width - margin);
    }

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    this.renderer.setStyle(tooltipEl, 'top', `${top + scrollY}px`);
    this.renderer.setStyle(tooltipEl, 'left', `${left + scrollX}px`);
  }
}
