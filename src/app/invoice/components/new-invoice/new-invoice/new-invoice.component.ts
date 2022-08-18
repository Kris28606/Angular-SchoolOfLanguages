import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Course } from 'src/app/course/model/course';
import { InvoiceItem } from 'src/app/invoice-item/model/invoice-item';
import { Invoice } from 'src/app/invoice/model/invoice';
import { InvoiceService } from 'src/app/invoice/service/invoice.service';
import { PaymentMethod } from 'src/app/methodOfPayment/method-of-payment';
import { MethodOfPaymentService } from 'src/app/methodOfPayment/service/method-of-payment.service';
import { Student } from 'src/app/student/model/student';
import { StudentService } from 'src/app/student/service/student.service';
import Swal from 'sweetalert2';
import { __values } from 'tslib';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {

  selectedStudent: Student=new Student();
  selectedMethod: PaymentMethod=0;
  methods: PaymentMethod[]=[];
  students: Student[]=[];
  invoice: Invoice=new Invoice();
  courses: Course[]=[];

  constructor(private paymentMethodService: MethodOfPaymentService,
    private studentServise: StudentService, private invoiceService: InvoiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPaymentMethods();
    this.getStudents();
    
  }

  promeniKurseve(stu: Student,event: any) {
    
      if(event.isUserInput) {
        this.invoiceService.getCoursesForStudent(stu).subscribe(data=> {
          this.courses=data;
        });
      }
    
  }

  saveInvoice() {
    this.invoice.student=this.selectedStudent;
    this.srediPomocne();
    if(this.invoice.student.firstName=="" || this.invoice.items.length==0 || this.invoice.date==undefined) {
      Swal.fire('Please fill the field with the correct informations!');
      return;
    }
    this.invoiceService.save(this.invoice).subscribe(data=> {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Invoice has been saved!',
        showConfirmButton: false,
        timer: 1500
      })
      this.goToInvoicePage();
    },error=> {
      if(error.status==HttpStatusCode.BadRequest) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Can't save invoice!"
        });
        this.goToInvoicePage();
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



  goToTheStopPage() {
    this.router.navigate(['server-error']);
  }

  goToInvoicePage() {
    this.router.navigate(['invoice']);
  }

  izracunajTotal(course: Course) {
    if(course.isSelected) {
      this.invoice.totalPrice+=course.price;
    } else {
      this.invoice.totalPrice-=course.price;
    }
  }

  srediPomocne() {
    console.log("Pomocni: ");
    let brojac=1;
    for(let k of this.courses) {
      if(k.isSelected) {
        let ii=new InvoiceItem();
        ii.course=k;
        ii.itemValue=ii.course.price;
        ii.sn=brojac++;
        this.invoice.items.push(ii);
      }
    }
    console.log(this.invoice.items);
  }

  getStudents() {
    this.studentServise.getAll().subscribe(data=>{
      this.students=data;
    }, error => {
      console.log(error);
    });
  }


  getPaymentMethods() {
    this.paymentMethodService.getAll().subscribe(data=> {
      this.methods=data;
    }, error => {
      console.log(error);
    });
  }

}
