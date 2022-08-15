import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../model/invoice';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private invoiceService: InvoiceService) { }
  invoices: Invoice[]=[];

  ngOnInit(): void {
    this.invoiceService.getAll().subscribe(data=>{
      this.invoices=data;
    });
  }

}
