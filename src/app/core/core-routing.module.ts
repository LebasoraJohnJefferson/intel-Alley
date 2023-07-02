import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
