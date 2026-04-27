import { Component, TemplateRef, ViewChild } from '@angular/core';

import { tooltipAnimation } from './tooltip.animations';

@Component({
    selector: 'v-tooltip-content',
    standalone: true,
    imports: [],
    template: `
    <ng-template #contentTemplate>
      <div [class]="tooltipClass" @tooltipAnimation>
        <ng-content></ng-content>
        <!-- <div [class]="arrowClass"></div> -->
      </div>
    </ng-template>
  `,
    animations: [tooltipAnimation]
})
export class VTooltipContent {
  @ViewChild('contentTemplate') templateRef!: TemplateRef<unknown>;

  private _tooltipClass = '';
  private _arrowClass = '';

  get tooltipClass(): string {
    return this._tooltipClass;
  }

  set tooltipClass(className: string) {
    this._tooltipClass = className;
  }

  get arrowClass(): string {
    return this._arrowClass;
  }

  set arrowClass(className: string) {
    this._arrowClass = className;
  }
}
