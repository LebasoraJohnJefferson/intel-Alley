import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PrimengModule } from '../primeng/primeng.module';
import { CoreModule } from 'src/app/core/core.module';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AccountComponent } from './pages/account/account.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AlumniComponent } from './pages/alumni/alumni.component';
import { EventsComponent } from './pages/events/events.component';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { AlumComponent } from './pages/alum/alum.component';
import { QuestionComponent } from './components/question/question.component';
import { AdminPieChartComponent } from './components/admin-pie-chart/admin-pie-chart.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { SurveyComponent } from './components/analytics/survey/survey.component';
import { EmploymentComponent } from './components/analytics/employment/employment.component';
import { EventComponent } from './pages/event/event.component';
import { FilesComponent } from './pages/files/files.component';
import { EmployedComponent } from './components/files/employed/employed.component';
import { EmployedFilesComponent } from './components/files/employed-files/employed-files.component';
import { EmployedAnalyticsComponent } from './components/analytics-employment/employed-analytics/employed-analytics.component';
import { UnemployedAnalyticsComponent } from './components/analytics-employment/unemployed-analytics/unemployed-analytics.component';
import { SelfEmployedAnalyticsComponent } from './components/analytics-employment/self-employed-analytics/self-employed-analytics.component';
import { AnalyticBarChartComponent } from './components/analytics-employment/analytic-bar-chart/analytic-bar-chart.component';
import { AnalyticPieChartComponent } from './components/analytics-employment/analytic-pie-chart/analytic-pie-chart.component';
import { AnalyticPolarAreaChartComponent } from './components/analytics-employment/analytic-polar-area-chart/analytic-polar-area-chart.component';
import { DateAgoPipe } from './shared/pipes/date-ago.pipe';
import { ManualComponent } from './pages/manual/manual.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    AccountComponent,
    LogsComponent,
    AlumniComponent,
    EventsComponent,
    SurveysComponent,
    AlumComponent,
    QuestionComponent,
    AdminPieChartComponent,
    AnalyticsComponent,
    SurveyComponent,
    EmploymentComponent,
    EventComponent,
    FilesComponent,
    EmployedComponent,
    EmployedFilesComponent,
    EmployedAnalyticsComponent,
    UnemployedAnalyticsComponent,
    SelfEmployedAnalyticsComponent,
    AnalyticBarChartComponent,
    AnalyticPieChartComponent,
    AnalyticPolarAreaChartComponent,
    DateAgoPipe,
    ManualComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimengModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class AdminModule { }
