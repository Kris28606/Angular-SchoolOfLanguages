import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private courseService: CourseService) { }

  ngOnInit(): void {
    this.course=this.data;
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
