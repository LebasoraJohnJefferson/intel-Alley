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

  create(data: any): any {
    return this.http.post(`${BASEURL}/api/user/alumni`, data);
  }

  getAlumni(): Observable<any> {
    return this.http.get(`${BASEURL}/api/user/alumni`);
  }

  importAlumni(data: any): any {
    return this.http.post(`${BASEURL}/api/user/alumni/import`, data);
  }

  getAlum(alumId: any): Observable<any> {
    return this.http.get(`${BASEURL}/api/user/alumni/${alumId}`);
  }

  updateAlumStatus(data: any): any {
    return this.http.post(`${BASEURL}/api/user/alumni/status`, data);
  }

  deleteAccount(userId: any): Observable<any> {
    return this.http.delete(`${BASEURL}/api/user/alumni/${userId}`);
  }

  getTemporaryDeletedUser(): Observable<any> {
    return this.http.get(`${BASEURL}/api/user/alumni/temporaryDelete`);
  }

  recoverAccount(userId:number):Observable<any> {
    return this.http.put(`${BASEURL}/api/user/alumni/recoverAccount/${userId}`,'');
  }

  deletePermanent(userId:number):Observable<any> {
    return this.http.delete(`${BASEURL}/api/user/alumni/deletePermanent/${userId}`);
  }

}
