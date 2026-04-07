import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SurveyItem {
  id: number | string;
  name: string;
  responses: number;
  participation: string;
  endDate: string;
  active: boolean;
}

@Component({
  selector: 'survey-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-carousel.html',
  styleUrl: './survey-carousel.scss',
})
export class SurveyCarouselComponent implements OnInit, OnDestroy {
  @Input() surveys: SurveyItem[] = [];
  @ViewChild('cardStack') cardStackRef!: ElementRef<HTMLDivElement>;

  currentIndex = 0;
  dragX = 0;
  dragging = false;

  private startX = 0;
  private startY = 0;
  private hasMoved = false;

  // Bound handlers for cleanup
  private boundMove: ((e: MouseEvent | TouchEvent) => void) | null = null;
  private boundEnd: ((e: MouseEvent | TouchEvent) => void) | null = null;

  get total() { return this.surveys.length; }
  get showCarousel() { return this.total > 1; }

  ngOnInit() {}

  ngOnDestroy() {
    this.cleanupDrag();
  }

  getCardStyle(index: number) {
    const offset = this.getRelativePosition(index);
    if (offset > 2) return { display: 'none' };

    const isCurrent = offset === 0;
    const scale = 1 - offset * 0.04;
    const translateY = offset * 8;
    const translateX = isCurrent ? this.dragX : 0;
    const rotate = isCurrent ? this.dragX / 25 : -offset * 2;
    const opacity = isCurrent ? 1 : offset === 1 ? 0.6 : 0.3;
    const zIndex = 10 - offset;

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity,
      'z-index': zIndex,
      transition: this.dragging && isCurrent ? 'none' : 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };
  }

  getRelativePosition(index: number): number {
    const diff = index - this.currentIndex;
    return ((diff % this.total) + this.total) % this.total;
  }

  onDragStart(event: MouseEvent | TouchEvent) {
    if (!this.showCarousel) return;
    this.dragging = true;
    this.hasMoved = false;
    const point = this.getPoint(event);
    this.startX = point.x;
    this.startY = point.y;

    this.boundMove = (e: MouseEvent | TouchEvent) => this.onDragMove(e);
    this.boundEnd = (e: MouseEvent | TouchEvent) => this.onDragEnd(e);

    document.addEventListener('mousemove', this.boundMove);
    document.addEventListener('mouseup', this.boundEnd);
    document.addEventListener('touchmove', this.boundMove, { passive: false });
    document.addEventListener('touchend', this.boundEnd);
  }

  private onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.dragging) return;
    const point = this.getPoint(event);
    this.dragX = (point.x - this.startX) * 0.7; // elastic feel
    if (Math.abs(this.dragX) > 5) this.hasMoved = true;
  }

  private onDragEnd(event: MouseEvent | TouchEvent) {
    if (!this.dragging) return;
    this.dragging = false;
    this.cleanupDrag();

    if (Math.abs(this.dragX) > 80) {
      this.next();
    }
    this.dragX = 0;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.total;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.total) % this.total;
  }

  private getPoint(event: MouseEvent | TouchEvent) {
    if ('touches' in event) {
      return { x: event.touches[0]?.clientX ?? 0, y: event.touches[0]?.clientY ?? 0 };
    }
    return { x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY };
  }

  private cleanupDrag() {
    if (this.boundMove) {
      document.removeEventListener('mousemove', this.boundMove);
      document.removeEventListener('touchmove', this.boundMove);
    }
    if (this.boundEnd) {
      document.removeEventListener('mouseup', this.boundEnd);
      document.removeEventListener('touchend', this.boundEnd);
    }
    this.boundMove = null;
    this.boundEnd = null;
  }
}
