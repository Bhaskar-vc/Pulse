import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'vc-progress',
    imports: [CommonModule],
    templateUrl: './progress.component.html',
    styleUrl: './progress.component.scss'
})
export class VcProgressComponent implements OnInit {
  @Input() shape: 'bar' | 'circle' | 'half-circle' = 'bar';
  @Input() size: '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | string = 'sm';
  @Input() progress: number = 0;
  @Input() circleDirection: 'clockwise' | 'counter-clockwise' = 'clockwise';
  @Input() progressColor?: string; //default progressColor secondary-600
  @Input() label?: 'right' | 'bottom' | 'top-floating' | 'bottom-floating' | string;
  @Input() type: 'default' | 'success' | 'warning' | 'error' | string = 'default';
  @Input() barWidth?: number;
  @Input() matchProgressTextColor: boolean = false;

  radius!: number;
  circumference!: number;

  dimension = 200; //default dimension for "sm"
  strokeWidth = 20; //default stokeWidth for "sm"
  fontSize = 30; //default fontSize for "sm"

  ngOnInit(): void {
    if (this.size === '4xs') {
      this.dimension = 64;
      this.strokeWidth = 6;
      this.fontSize = 14;
    } else if (this.size === '3xs') {
      this.dimension = 80;
      this.strokeWidth = 8;
      this.fontSize = 18;
    } else if (this.size === '2xs') {
      this.dimension = 120;
      this.strokeWidth = 12;
      this.fontSize = 24;
    } else if (this.size === 'xs') {
      this.dimension = 160;
      this.strokeWidth = 16;
      this.fontSize = 24;
    } else if (this.size === 'md') {
      this.dimension = 240;
      this.strokeWidth = 24;
      this.fontSize = 36;
    } else if (this.size === 'lg') {
      this.dimension = 280;
      this.strokeWidth = 28;
      this.fontSize = 48;
    }

    this.radius = (this.dimension - this.strokeWidth) / 2;
    this.circumference = 2 * Math.PI * this.radius;
  }

  getProgressTextColor(): string {
    if (this.matchProgressTextColor) {
      if (this.type === 'success') {
        return 'text-success-600';
      } else if (this.type === 'warning') {
        return 'text-warning-600';
      } else if (this.type === 'error') {
        return 'text-error-600';
      } else {
        return 'text-secondary-600';
      }
    } else {
      return 'text-gray-700';
    }
  }
}
