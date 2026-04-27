import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type IconSize = 'xs' | 'sm' | 'md' | 'default' | 'lg';

const SIZE_CLASS: Record<IconSize, string> = {
  xs: 'icon-xs',
  sm: 'icon-sm',
  default: 'icon-default',
  md: 'icon-md',
  lg: 'icon-lg',
};

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
    return [SIZE_CLASS[this.size], this.customClass].filter(Boolean).join(' ');
  }
}
