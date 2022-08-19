import { Course } from "src/app/course/model/course";
import { Gender } from "src/app/gender/gender";

export class Student {
    id: number=0;
    firstName: String='';
    lastName: String='';
    years: number=0;
    datumRodjenja!: Date;
    courses: Course[]=[];
    gender: Gender=0;
    isMale: boolean=false;
}
