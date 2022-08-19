import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pomocni } from 'src/app/pomocni/pomocni';
import Swal from 'sweetalert2';
import { Course } from '../../model/course';
import { CourseService } from '../../service/course.service';
import { CourseModalComponent } from '../course-modal/course-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: Course[]=[];
  pomocni: Pomocni=new Pomocni();
  
  constructor(private courseService: CourseService,private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CourseModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getCourses();
    });
  }

  onChange() {
    if(this.pomocni.kriterijum!="") {
      this.courseService.find(this.pomocni).subscribe(data=> {
        this.courses=data;
      });
    } else {
      this.getCourses();
    }
  }

  getCourses() {
    this.courseService.getCourseList().subscribe(data => {
      this.courses=data;
    }, error=>{
      if(error.status==HttpStatusCode.BadRequest) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cannot find the courses!!'
        });
        return;
      }
      if(error.status==HttpStatusCode.InternalServerError) {
       console.log("Greska serveera!")
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Server has stopped working!"
      });
      this.goToTheStopPage(); 
      }
      console.log(error);
    });
  }

  updateCourse(course: Course) {

    const dialogRef = this.dialog.open(UpdateModalComponent, {
      data: course.id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCourses();
    });
  }

  inputVisible: boolean=false;
  showInput() {
    this.inputVisible=!this.inputVisible;
    if(!this.inputVisible) {
      this.getCourses();
      this.pomocni.kriterijum='';
    }
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
          'Course has been deleted.',
          'success'
          );
          this.getCourses();
          },error => {
            if(error.status==HttpStatusCode.BadRequest) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cannot delete the course!!'
              });
              return;
            }
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Server has stopped working!"
            });
            this.goToTheStopPage();
      });
      }
    })
  }

  goToTheStopPage() {
    this.router.navigate(['server-error']);
  }
}
