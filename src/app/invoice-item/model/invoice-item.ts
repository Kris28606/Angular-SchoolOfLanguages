import { Course } from "../../course/model/course";
import { Invoice } from "../../invoice/model/invoice";

export class InvoiceItem {
    invoice!: Invoice;
    sn: number=0;
    itemValue: number=0;
    course!: Course;
}
