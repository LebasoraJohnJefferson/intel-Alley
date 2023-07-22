import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlumniGuard } from 'src/app/core/shared/guards/alumni.guard';

import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/account/account.component';
import { AboutComponent } from './pages/about/about.component';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { EventsComponent } from './pages/events/events.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AlumniGuard],
    children: [
      { path: '', component: DashboardComponent, canActivate: [AlumniGuard] },
      { path: 'surveys', component: SurveysComponent },
      { path: 'events', component: EventsComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
  { path: 'account', component: AccountComponent, canActivate: [AlumniGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumniRoutingModule {}
