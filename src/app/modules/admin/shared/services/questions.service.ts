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
export class QuestionsService {

  constructor(private http: HttpClient, private router: Router) {}

  createQuestion(data:any):Observable <any> {
    return this.http.post(`${BASEURL}/api/question`,data);
  }

  updateQuestion(data:any,surveyId:number):Observable <any> {
    return this.http.put(`${BASEURL}/api/question/${surveyId}`,data);
  }

  deleteQuestion(questionId:number):Observable <any> {
    return this.http.delete(`${BASEURL}/api/question/${questionId}`);
  }

  getQuestion(surveyId:number):Observable <any> {
    return this.http.get(`${BASEURL}/api/question/${surveyId}`);
  }

}
