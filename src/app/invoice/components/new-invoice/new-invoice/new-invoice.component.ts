import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/course/model/course';
import { Invoice } from 'src/app/invoice/model/invoice';
import { PaymentMethod } from 'src/app/methodOfPayment/method-of-payment';
import { MethodOfPaymentService } from 'src/app/methodOfPayment/service/method-of-payment.service';
import { Student } from 'src/app/student/model/student';
import { StudentService } from 'src/app/student/service/student.service';
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
    private studentServise: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.getPaymentMethods();
    this.getStudents();
    
  }

  promeniKurseve(stu: Student,event: any) {
    
      if(event.isUserInput) {
        this.courses=stu.courses;
      }
    
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
