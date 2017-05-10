import { TeacherSurveyResult } from './pages/teacher/teacher-survey-result/teacher-survey-result';
import { TeacherService } from './providers/teacher';
import { TeacherComponent } from './pages/teacher/teacher';
import { TeacherSurvey } from './pages/teacher/teacher-survey/teacher-survey';
import { StudentService } from './providers/student';
import { StudentCompleteSurvey } from './pages/student/student-complete-survey/student-complete-survey';
import { StudentSurvey } from './pages/student/student-survey/student-survey';
import { Student } from './pages/student/student';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard';
import { AuthGuard } from './providers/auth-guard';
import { AdminComponent } from './pages/admin/admin';
import { GenerateSurveyService } from './providers/generate-survey';
import { GenerateSurveyDynamicPage } from './pages/admin/generate-survey-dynamic/generate-survey-dynamic';
import { ViewSurveyPage } from './pages/admin/surveys/view-survey/view-survey';
import { ViewTemplatePage } from './pages/admin/templates/view-template/view-template';
import { SurveyService } from './providers/survey';
import { SurveysComponent } from './pages/admin/surveys/surveys';
import { ListSurveyPage } from './pages/admin/surveys/list-survey/list-survey';
import { EditSurveyPage } from './pages/admin/surveys/edit-survey/edit-survey';
import { CreateSurveyPage } from './pages/admin/surveys/create-survey/create-survey';
import { EditTemplatePage } from './pages/admin/templates/edit-template/edit-template';
import { TemplateService } from './providers/template';
import { TemplatesComponent } from './pages/admin/templates/templates';
import { ListTemplatePage } from './pages/admin/templates/list-template/list-template';
import { CreateTemplatePage } from './pages/admin/templates/create-template/create-template';
import { Helper } from './providers/helper';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Editor } from './pages/editor/editor';
import { AppRoutingModule } from './app.routing-module';
import { Header } from './partials/header/header';
import { Footer } from './partials/footer/footer';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/accounts/login/login';
import { Api } from './providers/api';
import { ApiAdmin } from './providers/api-admin';
import { AccountService } from './providers/account';
import { Ng2Webstorage } from 'ng2-webstorage';
import { EmailValidator } from "./directives/email-validate";
import { ToastyModule } from 'ng2-toasty';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    Editor,
    Header,
    Footer,
    HomePage,
    LoginPage,
    EmailValidator,
    CreateTemplatePage,
    ListTemplatePage,
    TemplatesComponent,
    EditTemplatePage,
    ViewTemplatePage,
    SurveysComponent,
    CreateSurveyPage,
    EditSurveyPage,
    ListSurveyPage,
    ViewSurveyPage,
    GenerateSurveyDynamicPage,
    AdminComponent,
    AdminDashboardComponent,
    Student,
    StudentSurvey,
    StudentCompleteSurvey,
    TeacherComponent,
    TeacherSurvey,
    TeacherSurveyResult
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Webstorage,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    FileUploadModule
  ],
  providers: [
    Api,
    ApiAdmin,
    AccountService,
    Helper,
    TemplateService,
    SurveyService,
    GenerateSurveyService,
    AuthGuard,
    StudentService,
    TeacherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
