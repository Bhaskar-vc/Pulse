import { animate, animateChild, AnimationTriggerMetadata, group, query, state, style, transition, trigger } from '@angular/animations';

export const vcStepperAnimations: {
    readonly horizontalStepTransition: AnimationTriggerMetadata;
    readonly verticalStepTransition: AnimationTriggerMetadata;
} = {
    horizontalStepTransition: trigger('horizontalStepTransition', [
        state('previous', style({transform: 'translate3d(-100%, 0 , 0)', visibility: 'hidden'})),
        state('current', style({transform: 'none', visibility: 'inherit'})),
        state('next', style({transform: 'translate3d(100%, 0 , 0)', visibility: 'hidden'})),

        transition(
            '* => *',
            group([
                animate('350ms ease-in-out'),
                query('@*', animateChild(), { optional: true }),
            ])
        )
    ]),

    verticalStepTransition: trigger('verticalStepTransition', [
        // state('previous', style({height: '0px', visibility: 'hidden'})),
        // state('next', style({height: '0px', visbility: 'hidden'})),
        // state('current', style({height: '*', visibility: 'inherit'})),

        // transition(
        //     '* <=> current',
        //     group([
        //         animate('350ms ease-in-out'),
        //         query('@*', animateChild(), { optional: true }),
        //     ])
        // )
        state('previous', style({transform: 'translate3d(0, -25% , 0)', visibility: 'hidden'})),
        state('current', style({transform: 'none', visibility: 'inherit'})),
        state('next', style({transform: 'translate3d(0, 25% , 0)', visibility: 'hidden'})),

        transition(
            '* => *',
            group([
                animate('350ms ease-in-out'),
                query('@*', animateChild(), { optional: true }),
            ])
        )
    ])
}