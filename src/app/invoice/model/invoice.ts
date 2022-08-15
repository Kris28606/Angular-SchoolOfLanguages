import { InvoiceItem } from "src/app/invoice-item/invoice-item";
import { PaymentMethod } from "src/app/methodOfPayment/method-of-payment";
import { Student } from "src/app/student/model/student";

export class Invoice {
    id: number=0;
    date!: Date;
    totalPrice: number=0;
    paymentMethod: PaymentMethod=0;
    cancelled: boolean=false;
    student!: Student;
    items: InvoiceItem[]=[];
}
