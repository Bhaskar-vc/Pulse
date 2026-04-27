import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InsightsRoutingModule } from './insights-routing.module';
import { AiHubComponent } from './ai-hub';

@NgModule({
  declarations: [AiHubComponent],
  imports: [CommonModule, FormsModule, InsightsRoutingModule],
})
export class InsightsModule {}
