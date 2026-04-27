import { Component, Input } from '@angular/core';

import { spinnerVariants } from './spinner.variants';
import { SpinnerColor, SpinnerSize, SpinnerTheme } from './spinner.enum';

@Component({
    selector: 'v-spinner',
    standalone: true,
    imports: [],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss'
})
export class VSpinner {
  @Input() color: `${SpinnerColor}` = SpinnerColor.PRIMARY;
  @Input() size: `${SpinnerSize}` = SpinnerSize.DEFAULT;
  @Input() theme: `${SpinnerTheme}` = SpinnerTheme.LIGHT;
  @Input() ariaLabel: string = 'Loading';

  get spinnerClasses() {
    return spinnerVariants({
      color: this.color,
      size: this.size,
      theme: this.theme,
    });
  }
}
