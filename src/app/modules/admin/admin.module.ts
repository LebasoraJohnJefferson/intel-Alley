import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AccountComponent } from './pages/account/account.component';
import { LogsComponent } from './pages/logs/logs.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    AccountComponent,
    LogsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
