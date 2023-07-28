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
export class EventService {

  constructor(private _http: HttpClient, private router: Router) {}

  getComment(eventId:number):Observable<any> {
    return this._http.get(`${BASEURL}/api/event/comment/${eventId}`);
  }

  postComment(data: any,eventId:number):Observable<any> {
    return this._http.post(`${BASEURL}/api/event/comment/${eventId}`,data);
  }

  deleteComment(commentId:number):Observable<any>{
    return this._http.delete(`${BASEURL}/api/event/comment/${commentId}`);
  }

  editComment(commentId:number,data:any):Observable<any>{
    return this._http.put(`${BASEURL}/api/event/comment/${commentId}`,data);
  }

  getEvents():Observable<any>{
    return this._http.get(`${BASEURL}/api/event/`)
  }

  likes(eventId:number){
    return this._http.post(`${BASEURL}/api/event/like/${eventId}`,'')
  }
}
