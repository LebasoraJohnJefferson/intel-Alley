import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AlumnusModule } from './modules/alumnus/alumnus.module';
import { AdminModule } from './modules/admin/admin.module';

import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    AlumnusModule,
    AdminModule,
    HotToastModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: false,
      timeOut: 3000,
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
