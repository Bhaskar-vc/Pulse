import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VTooltip } from './tooltip.component';
import { VTooltipContent } from './tooltip-content.component';
import { VTooltipTrigger } from './tooltip-trigger.component';

@NgModule({
  imports: [CommonModule, VTooltip, VTooltipTrigger, VTooltipContent],
})
export class TooltipModule {}
