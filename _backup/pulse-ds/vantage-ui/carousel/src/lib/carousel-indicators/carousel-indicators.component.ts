import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import VcCarouselSlideSelectionEvent from '../carousel.types';

@Component({
    standalone: true,
    selector: 'vc-carousel-indicators',
    imports: [CommonModule],
    templateUrl: './carousel-indicators.component.html',
    styleUrl: './carousel-indicators.component.scss'
})
export class VcCarouselIndicators {
  @Input() count: number = 1;
  @Input() active: number = 0;
  @Input() type: 'dot' | 'line' = 'dot';
  @Input() color: 'light' | 'dark' = 'dark';
  @Input() size: 'md' | 'lg' = 'md';
  @Input() framed: boolean = true;

  @Output() onSelectCarouselSlide: EventEmitter<VcCarouselSlideSelectionEvent> =
    new EventEmitter<VcCarouselSlideSelectionEvent>();

  getContainerClass() {
    return {
      [this.color]: true,
      framed: this.framed,
    };
  }

  getIndicatorClass(index: number) {
    return {
      active: this.active === index,
      'dot-indicator': this.type === 'dot',
      'line-indicator': this.type === 'line',
    };
  }

  handleCarouselSlideSelected(event: Event, index: number) {
    this.active = index;
    this.onSelectCarouselSlide.emit({ index, originalEvent: event });
  }
}
