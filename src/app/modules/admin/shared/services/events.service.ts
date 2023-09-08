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
export class EventsService {
  constructor(private http: HttpClient, private router: Router) {}

  createEvent(data: any): Observable<any> {
    return this.http.post(`${BASEURL}/api/event`, data);
  }

  postComment(data: any, eventId: number): Observable<any> {
    return this.http.post(`${BASEURL}/api/event/comment/${eventId}`, data);
  }

  getEvents(): any {
    return this.http.get(`${BASEURL}/api/event`);
  }

  getEvent(eventId: any): Observable<any> {
    return this.http.get(`${BASEURL}/api/event/${eventId}`);
  }

  deleteEvent(eventId: any) {
    return this.http.delete(`${BASEURL}/api/event/${eventId}`);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${BASEURL}/api/event/comment/${commentId}`);
  }
}
