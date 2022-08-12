import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from '../model/teacher';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teachers: Teacher[]=[];
  constructor(private teacherService: TeacherService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService.getTeacherList().subscribe(data => {
      this.teachers=data;
      console.log(this.teachers[0].courses);
    }, error=>console.log(error));
  }

  updateTeacher(id: number) {

  }

  deleteTeacher(id: number) {

  }

  openForm() {
    this.router.navigate(['new-teacher']);
  }
}
