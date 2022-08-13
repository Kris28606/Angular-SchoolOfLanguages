import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pomocni } from 'src/app/pomocni/pomocni';
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
    }, error=>console.log(error));
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
