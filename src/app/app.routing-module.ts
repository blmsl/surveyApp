import { ViewSurveyPage } from './pages/surveys/view-survey/view-survey';
import { CreateSurveyPage } from './pages/surveys/create-survey/create-survey';
import { EditSurveyPage } from './pages/surveys/edit-survey/edit-survey';
import { ListSurveyPage } from './pages/surveys/list-survey/list-survey';
import { SurveysComponent } from './pages/surveys/surveys';
import { EditTemplatePage } from './pages/templates/edit-template/edit-template';
import { TemplatesComponent } from './pages/templates/templates';
import { CreateTemplatePage } from './pages/templates/create-template/create-template';
import { ListTemplatePage } from './pages/templates/list-template/list-template';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Editor } from './pages/editor/editor';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/accounts/login/login';
import { ViewTemplatePage } from './pages/templates/view-template/view-template';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage,
    pathMatch: 'full',
  },
  {
    path: 'editor',
    component: Editor,
    pathMatch: 'full'
  },
  {
    path: 'template',
    component: TemplatesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListTemplatePage
      },
      {
        path: 'edit/:id',
        component: EditTemplatePage
      },
      {
        path: 'create',
        component: CreateTemplatePage
      },
      {
        path: 'view/:id',
        component: ViewTemplatePage
      }
    ]
  },
  {
    path: 'survey',
    component: SurveysComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListSurveyPage,
      },
      {
        path: 'edit/:id',
        component: EditSurveyPage
      },
      {
        path: 'create',
        component: CreateSurveyPage
      },
      {
        path: 'view/:id',
        component: ViewSurveyPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
