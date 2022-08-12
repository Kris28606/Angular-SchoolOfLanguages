import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../../model/course';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {

  course: Course=new Course();
  id: number=0;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private courseService: CourseService,
  private router: Router) { }

  ngOnInit(): void {
    this.id=this.data;
    this.ucitajKurs();
  }

  ucitajKurs() {
    this.courseService.getCourse(this.id).subscribe(data=> {
      this.course=data;
    },error=> {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Can't view course!"
      });
      this.goToCoursePage();
    });
  }

  goToCoursePage() {
    
  }

  fetchData() {
    this.courseService.updateCourse(this.course).subscribe(data=> {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course has been updated!',
        showConfirmButton: false,
        timer: 1500
      })
    }, error=> {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong, can't update course!"
      });
    });
  }
}
