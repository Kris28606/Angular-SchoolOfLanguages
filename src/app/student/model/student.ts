import { Course } from "src/app/course/model/course";

export class Student {
    id: number=0;
    firstName: String='';
    lastName: String='';
    years: number=0;
    datumRodjenja!: Date;
    courses: Course[]=[];
    slika: String='';
}
