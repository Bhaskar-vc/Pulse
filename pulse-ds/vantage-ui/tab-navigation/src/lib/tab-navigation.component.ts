import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcMenuItem } from './menuitem';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'vc-tab-nav',
    imports: [CommonModule, RouterModule],
    templateUrl: './tab-navigation.component.html',
    styleUrl: './tab-navigation.component.scss'
})
export class VcTabNavigation {
  // @Input() set model(value: VcMenuItem[] | undefined) {
  //   this._model = value;
  // }

  // get model(): VcMenuItem[] | undefined {
  //   return this._model;
  // }

  // _model: VcMenuItem[] | undefined;

  @Input() tabs: VcMenuItem[] | undefined;
  @Input() activeTab: VcMenuItem | undefined;
  @Input() labelSize: 'sm' | 'default' = 'default';

  @Output() onClick: EventEmitter<VcMenuItem> = new EventEmitter();

  selectedTab: VcMenuItem | undefined;

  showModel() {
    return "ng class";
  }

  selectTab(tab: VcMenuItem) {
    this.selectedTab = tab;
    this.activeTab = this.selectedTab;
    this.onClick.emit(this.selectedTab);
  }
}
