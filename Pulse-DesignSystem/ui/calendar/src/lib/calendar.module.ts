import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCalendar } from './calendar.component';

@NgModule({
  imports: [CommonModule, VCalendar],
  exports: [VCalendar],
})
export class CalendarModule {}
