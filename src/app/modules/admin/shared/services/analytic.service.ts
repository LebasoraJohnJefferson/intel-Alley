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
export class AnalyticService {

  constructor(private http: HttpClient, private router: Router) {}

  usersTookTheSurvey(status: any): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/employment/${status}`);
  }

  surveyOverView(): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/employment`);
  }

  surveyLabel(): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/surveyLabel`);
  }

  getDataSet(surveyId:number): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/surveyData/${surveyId}`);
  }


  otherEmployedDetails(): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/employedAnalytic`);
  }


  otherAnswer(field:any): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/viewOthers/${field}`);
  }
}
