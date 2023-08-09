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

  employed(uploadFilePoorOfEmp:File,uploadFileCertificateOfEmp:File,data: any):Observable<any> {
    return this._http.post(`${BASEURL}/api/survey/employed`, data);
  }
  
  checkSurvey(): any {
    return this._http.get(`${BASEURL}/api/survey/checkSurvey`);
  }
  
  getResult():any{
    return this._http.get(`${BASEURL}/api/survey/surveyReport`);
  }
  
  selfEmployed(uploadFileProofOfSelfEmploy:File,data: any): any {
    return this._http.post(`${BASEURL}/api/alumnus/selfEmployed`, data);
  }

  unemployed(data: any): any {
    return this._http.post(`${BASEURL}/api/alumnus/unemployed`, data);
  }

  surveyWithQuestionAndOption(data: any): any {
    return this._http.post(`${BASEURL}/api/alumnus/surveyWithQuestionAndOption`, {surveyName:data});
  }

  unAnswerSurvey(): any {
    return this._http.get(`${BASEURL}/api/survey/unAnswerSurvey`);
  }



}
