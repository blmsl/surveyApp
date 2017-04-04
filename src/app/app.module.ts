import { ViewSurveyPage } from './pages/surveys/view-survey/view-survey';
import { ViewTemplatePage } from './pages/templates/view-template/view-template';
import { SurveyService } from './providers/survey';
import { SurveysComponent } from './pages/surveys/surveys';
import { ListSurveyPage } from './pages/surveys/list-survey/list-survey';
import { EditSurveyPage } from './pages/surveys/edit-survey/edit-survey';
import { CreateSurveyPage } from './pages/surveys/create-survey/create-survey';
import { EditTemplatePage } from './pages/templates/edit-template/edit-template';
import { TemplateService } from './providers/template';
import { TemplatesComponent } from './pages/templates/templates';
import { ListTemplatePage } from './pages/templates/list-template/list-template';
import { CreateTemplatePage } from './pages/templates/create-template/create-template';
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
    ViewSurveyPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Webstorage,
    ReactiveFormsModule,
    ToastyModule.forRoot()
  ],
  providers: [
    Api,
    ApiAdmin,
    AccountService,
    Helper,
    TemplateService,
    SurveyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
