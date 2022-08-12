import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../model/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseURL;
  constructor(private httpClient: HttpClient) { 
    this.baseURL= "http://localhost:8080/teacher";
  }

  getTeacherList() : Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.baseURL+"/all");
  }

  saveTeacher(t : Teacher): Observable<Object> {
    return this.httpClient.post<Object>(this.baseURL+'/new', t);
  }
}
