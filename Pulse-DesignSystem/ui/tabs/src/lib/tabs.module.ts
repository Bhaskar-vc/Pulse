import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VTabs } from './tabs.component';
import { VTabItem } from './tab-item.component';

@NgModule({
  imports: [CommonModule, VTabs, VTabItem],
  exports: [VTabs, VTabItem],
})
export class TabsModule {}
