import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const BASEURL = environment.baseURL;
const HELPER = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private _http: HttpClient, private router: Router) {}

  employed(data: any):Observable<any> {
    return this._http.post(`${BASEURL}/api/alumnus/employed`, data);
  }

  selfEmployed(data: any): any {
    return this._http.post(`${BASEURL}/api/alumnus/selfEmployed`, data);
  }

  unemployed(data: any): any {
    return this._http.post(`${BASEURL}/api/alumnus/unemployed`, data);
  }


}
