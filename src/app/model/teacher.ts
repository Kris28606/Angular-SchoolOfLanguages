import { City } from "./city";

export class Teacher {
    id: number=0;
    firstName: String='';
    lastName: String='';
    address: String='';
    contact: String='';
    city!: City;
}
