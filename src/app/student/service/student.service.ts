import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseURL;

  constructor(private httpClient: HttpClient) {
    this.baseURL= "http://localhost:8080/student";
  }

  getAll():Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseURL+'/all');
  }

  deleteStudent(id: number):Observable<Object> {
    return this.httpClient.delete<Object>(`${this.baseURL}/${id}`);
  }

}
