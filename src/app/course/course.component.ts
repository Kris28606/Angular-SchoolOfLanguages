import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourse(id).subscribe(data=> {
            console.log(data);
          Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
          );
          this.getCourses();
          },error => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            });
      });
      }
    })
  }
}
