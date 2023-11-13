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
export class AlumniService {
  constructor(private http: HttpClient, private router: Router) {}

  getProfile(): any {
    return this.http.get(`${BASEURL}/api/user/alumni/profile`);
  }


  getRecordsById(surveyId:number): any {
    return this.http.get(`${BASEURL}/api/user/alumni/profile/${surveyId}`);
  }

  updateProfile(data: any): any {
    return this.http.put(`${BASEURL}/api/user/alumni/profile`, data);
  }

  changePassword(data: any): any {
    return this.http.put(`${BASEURL}/api/user/alumni/changepassword`, data);
  }

  getListOfRecords():any{
    return this.http.get(`${BASEURL}/api/user/alumni/records`);
  }

  recordsBySurveyId(surveyId:number):any{
    return this.http.get(`${BASEURL}/api/user/alumni/recordsBySurveyId/${surveyId}`);
  }

}
