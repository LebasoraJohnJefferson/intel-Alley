import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from '../modules/primeng/primeng.module';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { CustomBtnComponent } from './components/custom-btn/custom-btn.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    LoginComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    CustomBtnComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
})
export class CoreModule {}
