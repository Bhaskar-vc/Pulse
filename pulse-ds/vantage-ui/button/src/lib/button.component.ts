import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  buttonSizesMap,
  buttonTypesMap,
  buttonVariantsMap,
} from './button-styles-map';
import {
  elementTypes,
  colors,
  sizes,
  VcSpinner,
} from '@vantagecircle/vantage-ui/core';
import { BUTTON_STYLE_CONFIG } from './button-style-config';

@Component({
    standalone: true,
    selector: 'vc-button',
    imports: [CommonModule, VcSpinner],
    host: {
        '[style]': 'buttonStyle',
    },
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VcButton {
  @Input() type: string = buttonTypesMap[elementTypes.PRIMARY];
  @Input() variant: string = buttonVariantsMap[colors.DEFAULT];
  @Input() width: string = '';
  @Input() buttonStyle?: string;
  @Input() customStyle?: BUTTON_STYLE_CONFIG = { base: '' };
  @Input() size: string = buttonSizesMap[sizes.DEFAULT];
  @Input() label: string = 'Click Me';
  @Input() iconOnly: boolean | undefined;
  @Input() icon: string | undefined;
  @Input() iconLeft: string | undefined;
  @Input() iconRight: string | undefined;
  // @Input() className: string = '';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<Event>();

  classString: string = '';
  pressed: boolean = false;
  // isComponentInit: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  // ngOnInit(): void {
  //   this.isComponentInit = true;
  //   this.setButtonClass();
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (
  //     this.isComponentInit ||
  //     changes['type'] ||
  //     changes['variant'] ||
  //     changes['size'] ||
  //     // changes['className'] ||
  //     changes['disabled']
  //   ) {
  //     this.setButtonClass();
  //   }
  // }

  getButtonClass() {
    const typeClass =
      buttonTypesMap[this.type] || buttonTypesMap[elementTypes.PRIMARY];

    const variantClass =
      buttonVariantsMap[this.variant] || buttonVariantsMap[colors.DEFAULT];

    const sizeClass =
      buttonSizesMap[this.size] || buttonSizesMap[sizes.DEFAULT];

    return [
      typeClass,
      variantClass,
      sizeClass,
    ].join(' ');
  }

  // setButtonClass() {
  //   const typeClass =
  //     buttonTypesMap[this.type] || buttonTypesMap[elementTypes.PRIMARY];

  //   const variantClass =
  //     buttonVariantsMap[this.variant] || buttonVariantsMap[colors.DEFAULT];

  //   const sizeClass =
  //     buttonSizesMap[this.size] || buttonSizesMap[sizes.DEFAULT];

  //   this.classString = [
  //     typeClass,
  //     variantClass,
  //     sizeClass,
  //   ].join(' ');
  // }

  // private _setImportant(utilClass: string | undefined): string {
  //   return utilClass ? `!${utilClass.trim()}` : '';
  // }

  handleClick(clickEvent: Event): void {
    if (this.disabled || this.loading) {
      return;
    }
    this.onClick.emit(clickEvent);
  }

  handlePress(): void {
    if (this.disabled) {
      return;
    }
    this.pressed = true;
    this.cd.markForCheck();
  }

  handleRelease(): void {
    if (this.disabled) {
      return;
    }
    this.pressed = false;
    this.cd.markForCheck();
  }
}
