import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  avatarSizesMap,
  avatarStatusMap,
  avatarTypesMap,
  VcAvatarSize,
  VcAvatarStatus,
  VcAvatarType,
} from './avatar.constants';

@Component({
    standalone: true,
    selector: 'vc-avatar',
    imports: [CommonModule],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss'
})
export class VcAvatar {
  /**
   * Avatar type
   * @group Props
   */
  @Input() type: VcAvatarType = avatarTypesMap.PLACEHOLDER;

  /**
   * Avatar image
   * @group Props
   */
  @Input() image: string | undefined;

  // /**
  //  * To specify if the placeholder is to be shown
  //  * @group Props
  //  */
  // @Input() showPlaceholder: boolean | undefined;

  /**
   * Avatar text
   * @group Props
   */
  @Input() text: string = '';

  /**
   * To specify if abbreviation of user's name is to be shown
   * @group Props
   */
  @Input() showAbbreviation: boolean | undefined;

  /**
   * Avatar label
   * @group Props
   */
  @Input() label: string | undefined;

  /**
   * Avatar status
   * @group Props
   */
  @Input() status: VcAvatarStatus | undefined;

  /**
   * Avatar size
   * @group Props
   */
  @Input() size: VcAvatarSize = avatarSizesMap.XS;

  readonly avatarTypesMap = avatarTypesMap;
  readonly avatarStatusMap = avatarStatusMap;

  constructor() {}

  getSize() {
    return {
      'avatar-size-xs': this.size === avatarSizesMap.XS,
      'avatar-size-sm': this.size === avatarSizesMap.SM,
      'avatar-size-md': this.size === avatarSizesMap.MD,
      'avatar-size-lg': this.size === avatarSizesMap.LG,
      'avatar-size-xl': this.size === avatarSizesMap.XL,
      'avatar-size-2xl': this.size === avatarSizesMap.XXL,
    };
  }

  getAbbreviation(name: string): string {
    const names = name.split(' ');
    let abbreviation = '';

    if (names.length === 1) {
      abbreviation = names[0].substring(0, 2).toUpperCase();
    } else {
      abbreviation = names[0][0].toUpperCase();

      if (names.length > 1) {
        abbreviation += names[names.length - 1][0].toUpperCase();
      }
    }

    return abbreviation;
  }
}
