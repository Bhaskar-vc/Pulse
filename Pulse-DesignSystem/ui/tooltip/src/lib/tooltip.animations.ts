import { AnimationTriggerMetadata, animate, style, transition, trigger } from '@angular/animations';

export const tooltipAnimation: AnimationTriggerMetadata = trigger('tooltipAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0.95)',
    }),
    animate(
      '0.15s ease-out',
      style({
        opacity: 1,
        transform: 'scale(1)',
      }),
    ),
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      transform: 'scale(1)',
    }),
    animate(
      '0.1s ease-in',
      style({
        opacity: 0,
        transform: 'scale(0.95)',
      }),
    ),
  ]),
]);
