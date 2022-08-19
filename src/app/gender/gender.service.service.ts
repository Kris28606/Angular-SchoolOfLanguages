import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from './gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseURL;
  constructor(private httpClient: HttpClient) {
    this.baseURL="http://localhost:8080/gender";
   }

  getAll():Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseURL+"/all");
  }
}
