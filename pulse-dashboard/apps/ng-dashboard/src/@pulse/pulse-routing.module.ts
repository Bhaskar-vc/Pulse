import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PulseComponent } from './pulse.component';

const routes: Routes = [
  {
    path: '',
    component: PulseComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./modules/reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: 'ai-hub',
        loadChildren: () =>
          import('./modules/insights/insights.module').then(m => m.InsightsModule),
      },
      {
        path: 'create-survey',
        loadChildren: () =>
          import('./modules/create-survey/create-survey.module').then(m => m.CreateSurveyModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PulseRoutingModule {}
