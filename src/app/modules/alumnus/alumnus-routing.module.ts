import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlumnusGuard } from 'src/app/core/shared/guards/alumnus.guard';

import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AlumnusGuard],
    children: [{ path: '', component: DashboardComponent }],
  },
  { path: 'account', component: AccountComponent, canActivate: [AlumnusGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnusRoutingModule {}
