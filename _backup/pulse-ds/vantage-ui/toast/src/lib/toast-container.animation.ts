import {animateChild, query, transition, trigger} from '@angular/animations';

export const toastContainerAnimation = trigger('animateToastContainer', [
    transition(':enter, :leave', [
        query('@*', animateChild())
    ])
])