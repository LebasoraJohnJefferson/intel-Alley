import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnusRoutingModule } from './alumnus-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccountComponent } from './pages/account/account.component';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    AccountComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    AlumnusRoutingModule,
    PrimengModule
  ]
})
export class AlumnusModule { }
