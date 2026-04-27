import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
    selector: 'v-ui',
    standalone: true,
    imports: [],
    templateUrl: './ui.component.html',
    styleUrl: './ui.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiComponent {}
