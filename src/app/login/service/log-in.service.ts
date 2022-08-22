import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private baseURL;
  isAuthenticated: boolean=false;
  constructor(private httpClient: HttpClient) {
    this.baseURL="http://localhost:8080/login";
   }

  logIn(user: User):Observable<User> {
    return this.httpClient.post<User>(this.baseURL, user);
  }

}
