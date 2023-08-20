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
    const formData = new FormData()
    formData.append('data', JSON.stringify(data)); 
    if(uploadFilePoorOfEmp) formData.append('uploadFilePoorOfEmp', uploadFilePoorOfEmp);
    if(uploadFileCertificateOfEmp) formData.append('uploadFileCertificateOfEmp', uploadFileCertificateOfEmp);
    return this._http.post(`${BASEURL}/api/survey/employed`, formData);
  }


  unemployed(data: any):Observable<any> {
    return this._http.post(`${BASEURL}/api/survey/unemployed`, data);
  }
  
  selfEmployed(file:any,data: any): any {
    const formData = new FormData()
    formData.append('data', JSON.stringify(data)); 
    if(file) formData.append('proofOfSelfEmployFile', file);
    return this._http.post(`${BASEURL}/api/survey/selfEmployed`, formData);
  }


  checkSurvey(): any {
    return this._http.get(`${BASEURL}/api/survey/checkSurvey`);
  }
  


  surveyWithQuestionAndOption(data: any): any {
    return this._http.post(`${BASEURL}/api/alumnus/surveyWithQuestionAndOption`, {surveyName:data});
  }

  unAnswerSurvey(): any {
    return this._http.get(`${BASEURL}/api/survey/unAnswerSurvey`);
  }



}
