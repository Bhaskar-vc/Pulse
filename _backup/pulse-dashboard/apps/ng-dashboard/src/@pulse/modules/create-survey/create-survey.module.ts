import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateSurveyRoutingModule } from './create-survey-routing.module';
import { CreateSurveyComponent } from './create-survey';
import { GetStartedComponent } from './get-started/get-started';
import { SelectQuestionsComponent } from './select-questions/select-questions';
import { ConfigureComponent } from './configure/configure';
import { PreviewLaunchComponent } from './preview-launch/preview-launch';
import { AddCustomQuestionComponent } from './add-custom-question/add-custom-question';

@NgModule({
  declarations: [
    CreateSurveyComponent,
    GetStartedComponent,
    SelectQuestionsComponent,
    ConfigureComponent,
    PreviewLaunchComponent,
    AddCustomQuestionComponent,
  ],
  imports: [CommonModule, FormsModule, CreateSurveyRoutingModule],
})
export class CreateSurveyModule {}
