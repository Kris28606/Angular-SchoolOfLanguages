import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseURL;
  constructor(private httpClient: HttpClient) { 
    this.baseURL= "http://localhost:8080/city";
  }

  getAll():Observable<City[]> {
    return this.httpClient.get<City[]>(this.baseURL+"/all");
  }
}
