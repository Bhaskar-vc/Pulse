import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'v-card-3d',
  templateUrl: './card-3d.component.html',
  styleUrl: './card-3d.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VCard3d {
  /** Maximum tilt angle in degrees (default 15) */
  @Input() intensity = 15;

  /** Scale factor on hover (default 1.04) */
  @Input() scale = 1.04;

  /** Perspective depth in px (default 800) */
  @Input() perspective = 800;

  transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
  shadow = '0 4px 16px rgba(16,24,40,.08)';

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = (this.el.nativeElement as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY =  ((x - cx) / cx) * this.intensity;
    const rotX = -((y - cy) / cy) * this.intensity;
    this.transform = `perspective(${this.perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${this.scale},${this.scale},${this.scale})`;
    this.shadow = `${rotY * 1.5}px ${-rotX * 1.5 + 16}px 40px rgba(16,24,40,.18)`;
    this.cdr.markForCheck();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    this.shadow = '0 4px 16px rgba(16,24,40,.08)';
    this.cdr.markForCheck();
  }
}
