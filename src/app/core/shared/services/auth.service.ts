import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const BASEURL = environment.baseURL;
const HELPER = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  alumnusRegister(data: any): any {
    return this.http.post(`${BASEURL}/api/auth/alumnusregister`, data);
  }

  login(type: string, data: any): any {
    return this.http.post(`${BASEURL}/api/auth/${type}login`, data);
  }

  forgotpassword(data: string): any {
    return this.http.post(`${BASEURL}/api/auth/forgotpassword`, data);
  }

  resetPassword(data: any, token: any): Observable<any> {
    localStorage.setItem('token',token)
    return this.http.post(`${BASEURL}/api/auth/resetpassword`, data);
  }

  isLoggedIn(type: string): boolean {
    const token: any = localStorage.getItem(`${type}_access_token`);
    const isExpired = HELPER.isTokenExpired(token);
    
    return !isExpired;
  }

  setSession(type: string, data: any) {
    localStorage.setItem(`${type}_access_token`, data.token);

    if (type == 'student') {
      this.router.navigate([`/`]);
      return;
    }

    this.router.navigate([`/${type}`]);
  }

  logout(type: string) {
    localStorage.removeItem(`${type}_access_token`);
    this.router.navigate([`/login`], {
      queryParams: { type: type },
    });
  }
}