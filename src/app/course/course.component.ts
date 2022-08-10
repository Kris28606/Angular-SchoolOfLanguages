import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  datum1: Date=new Date(2022,12,12);
  courses: Course[]=[];
  
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourseList().subscribe(data => {
      this.courses=data;
    }, error=>console.log(error));
  }

  updateCourse(id: number) {

  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe(data=> {
      console.log(data);
      this.getCourses();
    },error => console.error(error));
  }
}
