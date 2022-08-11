import { City } from "src/app/model/city";


export class Teacher {
    id: number=0;
    first_name: String='';
    last_name: String='';
    address: String='';
    contact: String='';
    city!: City;
}
