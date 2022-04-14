import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token : any;
  constructor( private http: HttpClient) { }

  login(data:any): Observable<any> {
    return this.http.post(`${environment.bas_URL}login`, data)
  }
  register(data:any) : Observable<any> {
    return this.http.post(`${environment.bas_URL}register`, data)
  }
  
  dashboard(userData:any): Observable<any> {
    return this.http.post(`${environment.bas_URL}dashboard`, userData);
  }

  
  getAllUsers(userData: any): Observable<any> {
    return this.http.get(`${environment.bas_URL}getAllUser`, userData);
  }

  deleteUser(userData: any): Observable<any> {
    return this.http.post(`${environment.bas_URL}deleteUser`, userData);
  }

  getUserById(userData : any) {
    return this.http.post(`${environment.bas_URL}getUserById`, userData);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.post(`${environment.bas_URL}updateUser`, userData);
  }

  forgot(data:any): Observable<any> {
    // this.token = localStorage.getItem('token');
    return this.http.post(`${environment.bas_URL}forgotPassword`, data)
  }

  reset(data: any, token:any) {
    let customHeaders = new HttpHeaders({ authorization: token });
    return this.http.post(`${environment.bas_URL}resetPassword`, data, { headers: customHeaders })
  }

}
