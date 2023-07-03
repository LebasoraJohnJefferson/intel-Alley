import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from '../modules/primeng/primeng.module';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CoreModule {}
