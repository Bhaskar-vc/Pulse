import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VAvatar } from './avatar.component';
import { VAvatarGroup } from './avatar-group.component';

@NgModule({
  imports: [CommonModule, VAvatar, VAvatarGroup],
  exports: [VAvatar, VAvatarGroup],
})
export class AvatarModule {}
