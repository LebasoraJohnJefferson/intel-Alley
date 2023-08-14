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
export class SurveyService {

  constructor(private http: HttpClient, private router: Router) {}

  getSurvey():Observable <any> {
    return this.http.get(`${BASEURL}/api/surveyForm`);
  }

  createSurvey(data:any):Observable <any> {
    return this.http.post(`${BASEURL}/api/surveyForm`,data);
  }

  deleteSurvey(id:number):Observable <any> {
    return this.http.delete(`${BASEURL}/api/surveyForm/${id}`);
  }

  editSurvey(data:any,surveyId:number):Observable <any> {
    return this.http.put(`${BASEURL}/api/surveyForm/${surveyId}`,data);
  }

}
