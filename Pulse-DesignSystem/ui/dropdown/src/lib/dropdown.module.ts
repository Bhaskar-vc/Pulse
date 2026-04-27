import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VDropdown } from './dropdown.component';

@NgModule({
  imports: [CommonModule, FormsModule, VDropdown],
  exports: [VDropdown],
})
export class DropdownModule {}
