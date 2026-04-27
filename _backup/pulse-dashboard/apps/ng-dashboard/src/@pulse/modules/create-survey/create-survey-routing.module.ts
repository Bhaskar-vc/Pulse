import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSurveyComponent } from './create-survey';
import { GetStartedComponent } from './get-started/get-started';
import { SelectQuestionsComponent } from './select-questions/select-questions';
import { ConfigureComponent } from './configure/configure';
import { PreviewLaunchComponent } from './preview-launch/preview-launch';
import { AddCustomQuestionComponent } from './add-custom-question/add-custom-question';

const routes: Routes = [
  { path: '', component: CreateSurveyComponent },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'select-questions', component: SelectQuestionsComponent },
  { path: 'configure', component: ConfigureComponent },
  { path: 'preview-launch', component: PreviewLaunchComponent },
  { path: 'add-custom-question', component: AddCustomQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSurveyRoutingModule {}
