import { Dialog } from '@angular/cdk/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../../model/course';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css']
})
export class CourseModalComponent implements OnInit {

  startDateSelected: any;
  endDateSelected: any;
  course: Course=new Course();

  constructor(private courseService: CourseService, 
    private router: Router) {}

  ngOnInit(): void {

  }

  fetchData() {
    console.log(this.course);
    this.courseService.saveCourse(this.course).subscribe(data=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }, error=> {
      if(error.status==HttpStatusCode.BadRequest) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Course alredy exist!"
        });
        return;
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Server has stopped working!"
      });
    });
  }

}
