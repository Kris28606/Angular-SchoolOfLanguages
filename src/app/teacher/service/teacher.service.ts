import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pomocni } from 'src/app/pomocni/pomocni';
import { Teacher } from '../model/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  findTeachers(kriterijum: Pomocni):Observable<Teacher[]> {
    return this.httpClient.post<Teacher[]>(this.baseURL+"/find", kriterijum);
  }

  updateTeacher(id: number, teacher: Teacher):Observable<Object> {
    return this.httpClient.put<Teacher>(`${this.baseURL}/update/${id}`,teacher);
  }

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

  getOne(id: number):Observable<Teacher> {
    return this.httpClient.get<Teacher>(`${this.baseURL}/one/${id}`);
  }

}
