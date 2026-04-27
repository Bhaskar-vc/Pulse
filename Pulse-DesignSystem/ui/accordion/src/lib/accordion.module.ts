import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VAccordion } from './accordion.component';
import { VAccordionItem } from './accordion-item.component';
import { VAccordionStatusItem } from './accordion-status-item.component';

@NgModule({
  imports: [CommonModule, VAccordion, VAccordionItem, VAccordionStatusItem],
  exports: [VAccordion, VAccordionItem, VAccordionStatusItem],
})
export class AccordionModule {}
