import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pomocni } from 'src/app/pomocni/pomocni';
import Swal from 'sweetalert2';
import { Teacher } from '../model/teacher';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teachers: Teacher[]=[];
  pomocni: Pomocni=new Pomocni();
  constructor(private teacherService: TeacherService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService.getTeacherList().subscribe(data => {
      this.teachers=data;
      console.log("Pokupio predavace");
      this.srediKurseve();
    }, error=>{
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

  srediKurseve() {
    for (let teacher of this.teachers) {
      teacher.content='';
      for(let i=0;i<teacher.courses.length;i++) {
        teacher.content+=teacher.courses[i].name+", ";
      }
      teacher.content=teacher.content.substring(0,teacher.content.length-2);
    }
  }

  updateTeacher(id: number) {
    this.router.navigate(['update-teacher', id]);
  }

  deleteTeacher(id: number) {

  }

  inputVisible: boolean=false;
  showInput() {
    this.inputVisible=!this.inputVisible;
    if(!this.inputVisible) {
      this.getAllTeachers();
      this.pomocni.kriterijum='';
    }
  }

  onChange() {
    console.log(this.pomocni.kriterijum);
    if(this.pomocni.kriterijum!="") {
      this.teacherService.findTeachers(this.pomocni).subscribe( data=> {
        this.teachers=data;
        console.log(this.teachers);
      })
    } else {
      this.getAllTeachers();
    }
  }

  openForm() {
    this.router.navigate(['new-teacher']);
  }
}
