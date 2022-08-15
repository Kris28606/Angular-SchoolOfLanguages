import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Invoice } from '../../model/invoice';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private invoiceService: InvoiceService,
    private router: Router) { }
  invoices: Invoice[]=[];

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService.getAll().subscribe(data=>{
      this.invoices=data;
    }, error=> {
      if(error.status==HttpStatusCode.BadRequest) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Server can't get invoices!"
        });
        return;
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Server has stopped working!"
      });
      this.goToTheStopPage();
    });
  }

  reverseInvoice(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reverse it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceService.reverseInvoice(id).subscribe(data=> {
            Swal.fire(
            'Reversed!',
            'Invoice has been reversed.',
            'success'
            );
          this.getInvoices();
          }
      );
      }
    })
  }

  goToTheStopPage() {
    this.router.navigate(['server-error']);
  }


}
