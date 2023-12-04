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

  usersTookTheSurvey(status: any,year:any,batch:number): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/employment/${status}/${year}?batch=${batch}`);
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


  otherEmployedDetails(year:number,batch:number): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/employedAnalytic/${year}?batch=${batch}`);
  }


  otherUnemployedDetails(year:number,batch:number): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/unemployedAnalytic/${year}?batch=${batch}`);
  }

  otherSelfEmployedDetails(year:number,batch:number): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/selfEmployedAnalytic/${year}?batch=${batch}`);
  }


  otherAnswer(field:any,year:any,batch:number): Observable<any> {
    return this.http.get(`${BASEURL}/api/analytic/viewOthers/${field}/${year}?batch=${batch}`);
  }
}
