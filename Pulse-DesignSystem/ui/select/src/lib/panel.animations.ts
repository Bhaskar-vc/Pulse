import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const panelAnimation: AnimationTriggerMetadata = trigger(
  'panelAnimation',
  [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(-10px)',
      }),
      animate(
        '0.15s ease-in-out',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ),
    ]),
    transition(':leave', [
      style({
        opacity: 1,
        transform: 'translateY(0)',
      }),
      animate(
        '0.15s ease-in-out',
        style({
          opacity: 0,
          transform: 'translateY(-10px)',
        }),
      ),
    ]),
  ],
);
