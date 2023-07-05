import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AlumnusRoutingModule } from './alumnus-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccountComponent } from './pages/account/account.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AboutComponent } from './pages/about/about.component';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { EventsComponent } from './pages/events/events.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    AccountComponent,
    NotificationComponent,
    AboutComponent,
    SurveysComponent,
    JobsComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    AlumnusRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AlumnusModule { }
