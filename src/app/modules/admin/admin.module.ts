import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { AlumnusComponent } from './pages/alumnus/alumnus.component';


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
    AlumnusComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimengModule,
    CoreModule
  ]
})
export class AdminModule { }
