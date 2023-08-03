import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from 'src/app/core/shared/guards/admin.guard';

import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { EventsComponent } from './pages/events/events.component';
import { AccountComponent } from './pages/account/account.component';
import { AlumniComponent } from './pages/alumni/alumni.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AlumComponent } from './pages/alum/alum.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'alumni', component: AlumniComponent },
      { path: 'surveys', component: SurveysComponent },
      { path: 'events', component: EventsComponent },
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
