import { Component, OnInit } from '@angular/core';
import { Teacher } from '../model/teacher';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teachers: Teacher[]=[];
  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService.getCourseList().subscribe(data => {
      this.teachers=data;
    }, error=>console.log(error));
  }

  updateTeacher(id: number) {

  }

  deleteTeacher(id: number) {

  }
}
