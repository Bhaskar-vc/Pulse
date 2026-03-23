import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="computedClass" [style.width]="width ? width + 'px' : null">

      <!-- Optional highlight header band -->
      <div *ngIf="accentColor" class="ds-card__accent"
           [style.background]="accentColor"></div>

      <!-- Optional illustration / image area -->
      <div *ngIf="hasMedia" class="ds-card__media">
        <ng-content select="[slot=media]"></ng-content>
      </div>

      <!-- Header -->
      <div *ngIf="title || subtitle" class="ds-card__header">
        <h3 *ngIf="title"    class="ds-card__title">{{ title }}</h3>
        <p  *ngIf="subtitle" class="ds-card__subtitle">{{ subtitle }}</p>
      </div>

      <!-- Body (default slot) -->
      <div class="ds-card__body">
        <ng-content></ng-content>
      </div>

      <!-- Footer / CTA -->
      <div *ngIf="hasFooter" class="ds-card__footer">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title?:      string;
  @Input() subtitle?:   string;
  /** Optional top-edge accent bar color */
  @Input() accentColor?: string;
  /** Show media slot */
  @Input() hasMedia  = false;
  /** Show footer slot */
  @Input() hasFooter = false;
  /** Elevated (shadow) or flat */
  @Input() elevated  = true;
  /** Fixed pixel width */
  @Input() width?:    number;
  /** Extra CSS class */
  @Input() class?:    string;

  get computedClass(): string {
    return [
      'ds-card',
      this.elevated ? 'ds-card--elevated' : '',
      this.class || '',
    ].filter(Boolean).join(' ');
  }
}
