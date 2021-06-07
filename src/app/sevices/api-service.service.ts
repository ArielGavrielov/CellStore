import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = "http://localhost:8000/api/"
  users: string = "users/"
  products: string = "products/"
  headers = {
    "content-type": "application/json"
  }
  constructor(private http: HttpClient) { }

  // USER API //
  getUser(email): Observable<any> {
    return this.http.get(this.baseURL + this.users + email, {headers: this.headers});
  }

  registerUser(user: User): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post(this.baseURL + this.users + "register", body, {
      headers: this.headers
    });
  }

  loginUser(user): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post(this.baseURL + this.users + "login", body, {
      headers: this.headers
    });
  }

  // PRODUCTS API //

}
