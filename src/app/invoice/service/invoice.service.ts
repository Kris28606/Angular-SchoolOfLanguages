import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
