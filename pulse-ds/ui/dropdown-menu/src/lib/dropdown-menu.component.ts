import { AfterContentInit, AfterViewInit, Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';

import { VDropdownMenuTrigger } from './dropdown-menu-trigger.component';
import { VDropdownMenuContent } from './dropdown-menu-content.component';
import { VDropdownMenuService } from './dropdown-menu.service';

@Component({
    selector: 'v-dropdown-menu',
    standalone: true,
    imports: [],
    template: `
    <div class="relative inline-block">
      <ng-content select="v-dropdown-menu-trigger"></ng-content>
      <!-- <ng-template #contentTemplate> -->
      <ng-content select="v-dropdown-menu-content"></ng-content>
      <!-- </ng-template> -->
    </div>
  `,
    providers: [VDropdownMenuService]
})
export class VDropdownMenu implements AfterContentInit {
  @ContentChild(VDropdownMenuTrigger) private trigger!: VDropdownMenuTrigger;
  @ContentChild(VDropdownMenuContent) private content!: VDropdownMenuContent;

  // @ViewChild('contentTemplate') private contentTemplate!: TemplateRef<unknown>;

  constructor(private dropdownService: VDropdownMenuService) {}

  ngAfterContentInit() {
    // Pass the content component to the trigger
    if (this.content) {
      this.dropdownService.setContent(this.content);
    }
  }

  // ngAfterViewInit() {
  //   // Template reference is available, but ng-content inside it is not yet rendered
  //   console.log('Content template:', this.contentTemplate);

  //   // if (this.trigger) {
  //   //   this.trigger.setContentTemplate(this.contentTemplate);
  //   // }
  // }
}
