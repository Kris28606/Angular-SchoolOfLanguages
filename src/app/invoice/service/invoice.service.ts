import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/course/model/course';
import { Student } from 'src/app/student/model/student';
import { Invoice } from '../model/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  
  private baseURL;
  constructor(private httpClient: HttpClient) { 
    this.baseURL= "http://localhost:8080/invoice";
  }

  getAll():Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(this.baseURL+"/all");
  }

  reverseInvoice(id: number): Observable<Object> {
    return this.httpClient.delete<Object>(`${this.baseURL}/${id}`);
  }

  getCoursesForStudent(stu: Student):Observable<Course[]> {
    return this.httpClient.post<Course[]>(this.baseURL+"/get-courses", stu);
  }

  save(invoice: Invoice): Observable<Object> {
    return this.httpClient.post<Object>(this.baseURL, invoice);
  }

  findOne(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${this.baseURL}/${id}`);
  }
}
