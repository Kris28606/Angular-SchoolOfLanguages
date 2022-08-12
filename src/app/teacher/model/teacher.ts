import { City } from "src/app/city/model/city";
import { Course } from "src/app/course/model/course";


export class Teacher {
    id: number=0;
    first_name: String='';
    last_name: String='';
    address: String='';
    contact: String='';
    city!: City;
    courses: Course[]=[];
}
