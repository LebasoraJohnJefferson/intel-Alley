import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';



const routes: Routes = [
  {path: '' , component:LoginComponent},
  {path: 'register' , component:RegisterComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
