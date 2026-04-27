import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { tv } from 'tailwind-variants';

type IconSize = 'xs' | 'sm' | 'md' | 'default' | 'lg';

const iconVariants = tv({
  base: 'font-medium',
  variants: {
    size: {
      xs: 'text-lg',
      sm: 'text-xl',
      default: 'text-2xl',
      md: 'text-3xl',
      lg: 'text-4xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

@Component({
  selector: 'v-icon',
  standalone: true,
  template: `<i aria-hidden="true" [class]="'hgi-stroke hgi-' + name + ' ' + iconClass"></i>`,
  styles: [
    `
      :host {
        display: inline-flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VIcon {
  @Input() name: string = '';
  @Input() size: IconSize = 'default';
  @Input() customClass: string = '';

  get iconClass(): string {
    return iconVariants({ size: this.size, class: this.customClass });
  }
}
