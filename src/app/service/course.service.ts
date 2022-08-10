import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseURL;
  constructor(private httpClient: HttpClient) { 
    this.baseURL= "http://localhost:8080/course";
  }
 
  getCourseList() : Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.baseURL+"/all");
  }

  deleteCourse(id: number): Observable<Object> {
    return this.httpClient.delete<Object>(`${this.baseURL}/${id}`);
  }
}
