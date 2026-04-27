import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcCarouselItem } from './carousel-item/carousel-item.component';
import { VcButton } from '@vantagecircle/vantage-ui/button';
import { VcCarouselIndicators } from './carousel-indicators/carousel-indicators.component';
import VcCarouselSlideSelectionEvent from './carousel.types';

@Component({
    standalone: true,
    selector: 'vc-carousel',
    imports: [CommonModule, VcButton, VcCarouselIndicators],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss'
})
export class VcCarousel implements AfterContentInit {
  @Input() theme: 'light' | 'dark' = 'dark';
  @Input() width!: number;
  @Input() height!: number;
  @Input() size: 'md' | 'lg' = 'md';
  @Input() indicatorType: 'dot' | 'line' = 'dot';
  @Input() indicatorsFramed: boolean = true;
  @Input() wrapSlides: boolean = true;
  @Input() cols: number = 1;
  @Input() columnGap: number = 0;
  @Input() innerHorizontalPadding: number = 0;
  @Input() innerVerticalPadding: number = 0;
  @Input() showSlideControlsOnHover: boolean = true;
  @Input() showCarouselIndicators: boolean = true;
  @Input() showCarouselControlsInside: boolean = true;

  @ContentChildren(VcCarouselItem) items!: QueryList<VcCarouselItem>;

  currentIndex = 0;

  ngAfterContentInit(): void {
    this.currentIndex = 0;
  }

  getCarouselSlideContent(slideIndex: number): VcCarouselItem[] {
    const start = slideIndex * this.cols;
    const end = Math.min(start + this.cols, this.items.length);
    return this.items.toArray().slice(start, end);
  }

  getCarouselSlidesIterable() {
    if (this.cols < 1) {
      return [];
    }

    return [].constructor(Math.ceil(this.items?.length / this.cols));
  }

  getCarouselSlidesCount() {
    return this.getCarouselSlidesIterable().length;
  }

  getCarouselOuterContainerClass() {
    return {
      'gap-none': this.showCarouselControlsInside,
    };
  }

  getCarouselBodyContainerClass() {
    return {
      'carousel-body-overflow-hidden': this.showCarouselControlsInside,
      'gap-none': this.showCarouselControlsInside,
    };
  }

  getCarouselCurrentSlideWindowStyle() {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`,
      // padding: `${this.innerVerticalPadding}px ${this.innerHorizontalPadding}px`,
    };
  }

  getCarouselSlidesContainerStaticStyle() {
    return { transform: `translateX(${-this.currentIndex * 100}%)` };
  }

  getCarouselSlidesContainerDynamicStyle() {
    return {
      'slides-gap': this.cols > 1,
    };
  }

  getCarouselSlideControlClass() {
    return {
      'btn-light': this.theme === 'light',
      'btn-default': this.theme === 'dark',
      'hover-visible': this.showSlideControlsOnHover,
      'show-inside': this.showCarouselControlsInside,
    };
  }

  getCarouselSlideStyle() {
    return { 'grid-template-columns': `repeat(${this.cols}, 1fr)` };
  }

  getCarouselFooterClass() {
    return {
      'show-inside': this.showCarouselControlsInside,
    };
  }

  prev() {
    const slidesCount = this.getCarouselSlidesCount();

    if (this.wrapSlides) {
      this.currentIndex =
        this.currentIndex > 0 ? this.currentIndex - 1 : slidesCount - 1;
    } else {
      this.currentIndex = this.currentIndex - 1;
    }
  }

  next() {
    const slidesCount = this.getCarouselSlidesCount();

    if (this.wrapSlides) {
      this.currentIndex =
        this.currentIndex < slidesCount - 1 ? this.currentIndex + 1 : 0;
    } else {
      this.currentIndex = this.currentIndex + 1;
    }
  }

  showPrevBtn() {
    return this.wrapSlides || this.currentIndex !== 0;
  }

  showNextBtn() {
    const slidesCount = this.getCarouselSlidesCount();
    return (
      this.wrapSlides || (this.items && this.currentIndex !== slidesCount - 1)
    );
  }

  handleSlideSelected(event: VcCarouselSlideSelectionEvent) {
    this.currentIndex = event.index;
  }
}
