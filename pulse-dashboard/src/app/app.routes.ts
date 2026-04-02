import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview';
import { AiHubComponent } from './pages/ai-hub/ai-hub';
import { CreateSurveyComponent } from './pages/create-survey/create-survey';
import { GetStartedComponent } from './pages/create-survey/get-started/get-started';
import { SelectQuestionsComponent } from './pages/create-survey/select-questions/select-questions';
import { ConfigureComponent } from './pages/create-survey/configure/configure';
import { PreviewLaunchComponent } from './pages/create-survey/preview-launch/preview-launch';
import { AddCustomQuestionComponent } from './pages/create-survey/add-custom-question/add-custom-question';

export const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'ai-hub', component: AiHubComponent },
  { path: 'create-survey', component: CreateSurveyComponent },
  { path: 'create-survey/get-started', component: GetStartedComponent },
  { path: 'create-survey/select-questions', component: SelectQuestionsComponent },
  { path: 'create-survey/configure', component: ConfigureComponent },
  { path: 'create-survey/preview-launch', component: PreviewLaunchComponent },
  { path: 'create-survey/add-custom-question', component: AddCustomQuestionComponent },
  { path: '**', redirectTo: '' }
];
