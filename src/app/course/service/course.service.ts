import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pomocni } from 'src/app/pomocni/pomocni';
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
  saveCourse(course: Course):Observable<Object>{
    return this.httpClient.post<Object>(this.baseURL+"/new", course);
  }

  deleteCourse(id: number): Observable<Object> {
    return this.httpClient.delete<Object>(`${this.baseURL}/${id}`);
  }

  updateCourse(course: Course): Observable<Object> {
    return this.httpClient.put<Object>(`${this.baseURL}/${course.id}`, course);
  }

  getCourse(id: number):Observable<Course> {
    return this.httpClient.get<Course>(`${this.baseURL}/one/${id}`);
  }

  find(pomocni: Pomocni):Observable<Course[]> {
    return this.httpClient.post<Course[]>(this.baseURL+"/find", pomocni);
  }
}
