import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InvoiceItemComponent } from 'src/app/invoice-item/components/invoice-item/invoice-item.component';
import { InvoiceItem } from 'src/app/invoice-item/model/invoice-item';
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
    private router: Router, private dialog: MatDialog) { }
  invoices: Invoice[]=[];

  ngOnInit(): void {
    this.getInvoices();
  }

  openItems(items: InvoiceItem[]) {
    const dialogRef = this.dialog.open(InvoiceItemComponent, {
      data: items
    });
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

  novaFaktura() {
    this.router.navigate(['new-invoice']);
  }

  reverseInvoice(id: number) {
    this.invoiceService.findOne(id).subscribe(data=> {
      let inv=data;
      if(inv.cancelled) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Invoice alredy reversed!"
        });
        return;
      }
    })
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
          },error=> {
          if(error.status==HttpStatusCode.BadRequest){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong, can't reverse invoice!"
              });
              return;
            }
            if(error.status==HttpStatusCode.InternalServerError) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Server has stopped working!"
              });
              this.goToTheStopPage();
            }
          }
        ) 
      }
    })
  }

  goToTheStopPage() {
    this.router.navigate(['server-error']);
  }


}
