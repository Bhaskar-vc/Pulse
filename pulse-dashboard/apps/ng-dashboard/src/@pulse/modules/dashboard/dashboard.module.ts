import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview';
import { ExpandableCardComponent } from '../../shared/components/expandable-card/expandable-card';
import { SurveyCarouselComponent } from '../../shared/components/survey-carousel/survey-carousel';

@NgModule({
  declarations: [
    OverviewComponent,
    ExpandableCardComponent,
    SurveyCarouselComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
