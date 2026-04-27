import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipPosition, TooltipTheme } from './tooltip.enums';

@Component({
    standalone: true,
    selector: 'vc-tooltip',
    imports: [CommonModule],
    templateUrl: './tooltip.component.html',
    styleUrl: './tooltip.component.scss'
})
export class VcTooltip {
  position: TooltipPosition = TooltipPosition.DEFAULT;
  theme: TooltipTheme = TooltipTheme.DEFAULT;
  VcTooltip: string | null = '';  
  left = 0;
  top = 0;
  visible = false;
}
