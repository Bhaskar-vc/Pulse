import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';

export const toastItemAnimation: AnimationTriggerMetadata = trigger('animateToastItem', [
    transition(':enter', [
        style({ opacity: 0, scale: 0.9 }),
        animate('300ms ease-in-out', style({opacity: 1, scale: 1}))
    ]),

    transition(':leave', [
        animate('300ms', style({opacity: 0, scale: 0.9}))
    ])
])