import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        'preventDuplicates': false,
        timeOut: 3000,
        positionClass: 'toast-top-right',
      }
    ),
  ],
  providers: [
    { 
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
