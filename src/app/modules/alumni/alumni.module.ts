import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AlumniRoutingModule } from './alumni-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { CoreModule } from 'src/app/core/core.module';
import {CheckboxModule} from 'primeng/checkbox';


import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccountComponent } from './pages/account/account.component';
import { AboutComponent } from './pages/about/about.component';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { EventsComponent } from './pages/events/events.component';
import { SurveyContentComponent } from './components/survey-content/survey-content.component';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

import { DateAgoPipe } from './shared/pipes/date-ago.pipe';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CustomSurveyComponent } from './components/custom-survey/custom-survey.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    AccountComponent,
    AboutComponent,
    SurveysComponent,
    EventsComponent,
    SurveyContentComponent,
    SurveyFormComponent,
    BarChartComponent,
    DateAgoPipe,
    PieChartComponent,
    CustomSurveyComponent
  ],
  imports: [
    CommonModule,
    AlumniRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    CheckboxModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    MatStepperModule,
  ],
})
export class AlumniModule {}
