import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from 'src/app/core/shared/guards/admin.guard';

import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { EventsComponent } from './pages/events/events.component';
import { EventComponent } from './pages/event/event.component';
import { AccountComponent } from './pages/account/account.component';
import { AlumniComponent } from './pages/alumni/alumni.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AlumComponent } from './pages/alum/alum.component';
import { QuestionComponent } from './components/question/question.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { EmploymentComponent } from './components/analytics/employment/employment.component';
import { SurveyComponent } from './components/analytics/survey/survey.component';
import { FilesComponent } from './pages/files/files.component';
import { EmployedComponent } from './components/files/employed/employed.component';
import { EmployedFilesComponent } from './components/files/employed-files/employed-files.component';
import { EmployedAnalyticsComponent } from './components/analytics-employment/employed-analytics/employed-analytics.component';
import { SelfEmployedAnalyticsComponent } from './components/analytics-employment/self-employed-analytics/self-employed-analytics.component';
import { UnemployedAnalyticsComponent } from './components/analytics-employment/unemployed-analytics/unemployed-analytics.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'alumni', component: AlumniComponent },
      { path: 'files', component: FilesComponent },
      { path: 'files/:status', component: EmployedComponent },
      { path: 'files/:status/:userId', component: EmployedFilesComponent },
      { path: 'analytics', component: AnalyticsComponent ,children: [
        {path:'',component:EmploymentComponent,children:[
          {path:'',component:EmployedAnalyticsComponent},
          {path:'unemployed',component:UnemployedAnalyticsComponent},
          {path:'self-employed',component:SelfEmployedAnalyticsComponent}
        ]},
        {path:'survey',component:SurveyComponent}
      ]},
      { path: 'surveys', component: SurveysComponent },
      { path: 'surveys/:surveyId', component: QuestionComponent },
      { path: 'events', component: EventsComponent },
      { path: 'event', component: EventComponent },
      { path: 'logs', component: LogsComponent },
    ],
  },
  { path: 'admin/alum', component: AlumComponent, canActivate: [AdminGuard] },
  {
    path: 'admin/account',
    component: AccountComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
