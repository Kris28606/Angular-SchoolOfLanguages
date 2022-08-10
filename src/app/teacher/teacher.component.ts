import { Component, OnInit } from '@angular/core';
import { Teacher } from '../model/teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teachers: Teacher[]=[];
  constructor() { }

  ngOnInit(): void {
  }

  updateTeacher(id: number) {

  }

  deleteTeacher(id: number) {

  }
}
