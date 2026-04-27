import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarSize } from './avatar.enums';

@Component({
  standalone: true,
  selector: 'v-avatar-group',
  imports: [CommonModule],
  template: `
    <div class="av-group" [class]="'av-group av-' + size">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host { display: inline-flex; }
    .av-group { display: inline-flex; align-items: center; }
    .av-group ::ng-deep .av-wrap + .av-wrap,
    .av-group ::ng-deep .av + .av { border: 1.5px solid #fff; }
    .av-group.av-xs ::ng-deep  .av-wrap + .av-wrap { margin-left: -8px; }
    .av-group.av-sm ::ng-deep  .av-wrap + .av-wrap { margin-left: -10px; }
    .av-group.av-md ::ng-deep  .av-wrap + .av-wrap { margin-left: -12px; }
    .av-group.av-lg ::ng-deep  .av-wrap + .av-wrap { margin-left: -14px; }
    .av-group.av-xl ::ng-deep  .av-wrap + .av-wrap { margin-left: -16px; }
    .av-group.av-2xl ::ng-deep .av-wrap + .av-wrap { margin-left: -18px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VAvatarGroup {
  /** Size applied to all child avatars via group class */
  @Input() size: `${AvatarSize}` = AvatarSize.MD;
}
