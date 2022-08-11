import { Time } from "@angular/common";
import { Timestamp } from "rxjs";

export class Course {
    id: number=0;
    name: String='';
    price: number=0;
    startDate!: Date;
    endDate!: Date;
}
