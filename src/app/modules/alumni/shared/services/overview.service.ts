import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const BASEURL = environment.baseURL;
const HELPER = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(private _http: HttpClient, private router: Router) {}

  getOverVIew(): Observable<any> {
    return this._http.get(`${BASEURL}/api/overview`);
  }
}
