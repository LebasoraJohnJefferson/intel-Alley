import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



const routes: Routes = [
  {path: '' , component:LoginComponent},
  {path: 'register' , component:RegisterComponent},
  {path: 'dashboard' , component:DashboardComponent,canActivate: [AuthGuard]},
  {path: '404' , component:PageNotFoundComponent},
  {path:'**',redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
