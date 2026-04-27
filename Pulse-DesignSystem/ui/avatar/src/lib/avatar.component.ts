import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarSize, AvatarColor } from './avatar.enums';

@Component({
  standalone: true,
  selector: 'v-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VAvatar implements OnChanges {
  /** Image source URL */
  @Input() src = '';

  /** Up to 2 initials displayed when no image */
  @Input() initials = '';

  /** Avatar size */
  @Input() size: `${AvatarSize}` = AvatarSize.MD;

  /** Background color palette (used when showing initials or placeholder) */
  @Input() color: `${AvatarColor}` = AvatarColor.PURPLE;

  /** Show online status indicator */
  @Input() showOnline = false;

  /** Image alt text */
  @Input() alt = '';

  /** Accessible label for the avatar as a whole */
  @Input() ariaLabel = '';

  avatarClass = '';
  displayInitials = '';

  ngOnChanges(): void {
    this.displayInitials = this.initials.substring(0, 2).toUpperCase();

    const parts = ['av', `av-${this.size}`];
    if (!this.src && !this.initials) {
      parts.push('av-placeholder');
    } else if (!this.src) {
      parts.push(`av-${this.color}`);
    }
    this.avatarClass = parts.join(' ');
  }
}
