import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethod } from '../method-of-payment';

@Injectable({
  providedIn: 'root'
})
export class MethodOfPaymentService {

  private baseURL;
  constructor(private httpClient: HttpClient) { 
    this.baseURL= "http://localhost:8080/payment-method";
  }

  getAll():Observable<PaymentMethod[]> {
    return this.httpClient.get<PaymentMethod[]>(this.baseURL+"/all");
  }
}
