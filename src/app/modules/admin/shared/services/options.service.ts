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
export class OptionsService {

  constructor(private http: HttpClient, private router: Router) {}

  createOption(data:any):Observable <any> {
    return this.http.post(`${BASEURL}/api/option`,data);
  }

  getOption(questionId:any):Observable <any> {
    return this.http.get(`${BASEURL}/api/option/${questionId}`);
  }

  deleteOption(optionId:number):Observable <any> {
    return this.http.delete(`${BASEURL}/api/option/${optionId}`);
  }

  updateOption(data:any):Observable <any> {
    return this.http.put(`${BASEURL}/api/option`,data);
  }


}
