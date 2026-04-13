import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiHubComponent } from './ai-hub';

const routes: Routes = [
  { path: '', component: AiHubComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsightsRoutingModule {}
