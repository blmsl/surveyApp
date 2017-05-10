import { TeacherSurveyResult } from './pages/teacher/teacher-survey-result/teacher-survey-result';
import { TeacherSurvey } from './pages/teacher/teacher-survey/teacher-survey';
import { TeacherComponent } from './pages/teacher/teacher';
import { StudentCompleteSurvey } from './pages/student/student-complete-survey/student-complete-survey';
import { StudentSurvey } from './pages/student/student-survey/student-survey';
import { Student } from './pages/student/student';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminComponent } from './pages/admin/admin';
import { AuthGuard } from './providers/auth-guard';
import { GenerateSurveyDynamicPage } from './pages/admin/generate-survey-dynamic/generate-survey-dynamic';
import { ViewSurveyPage } from './pages/admin/surveys/view-survey/view-survey';
import { CreateSurveyPage } from './pages/admin/surveys/create-survey/create-survey';
import { EditSurveyPage } from './pages/admin/surveys/edit-survey/edit-survey';
import { ListSurveyPage } from './pages/admin/surveys/list-survey/list-survey';
import { SurveysComponent } from './pages/admin/surveys/surveys';
import { EditTemplatePage } from './pages/admin/templates/edit-template/edit-template';
import { TemplatesComponent } from './pages/admin/templates/templates';
import { CreateTemplatePage } from './pages/admin/templates/create-template/create-template';
import { ListTemplatePage } from './pages/admin/templates/list-template/list-template';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Editor } from './pages/editor/editor';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/accounts/login/login';
import { ViewTemplatePage } from './pages/admin/templates/view-template/view-template';

const routes: Routes = [
  {
    path: '',
    component: Student,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: StudentSurvey
      },
      {
        path: 'survey/:id',
        component: StudentCompleteSurvey
      }
    ]
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: TeacherSurvey,
          },
          {
            path: 'survey/:id',
            component: TeacherSurveyResult
          }
        ]
      }
    ]
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
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'generate',
            component: GenerateSurveyDynamicPage,
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
          },
          {
            path: '',
            component: AdminDashboardComponent
          }
        ]
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
