import { HttpStatusCode } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from 'src/app/gender/gender';
import Swal from 'sweetalert2';
import { Student } from '../../model/student';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private studentService: StudentService,
    private router: Router) { }
  panelOpenState = false;
  students: Student[]=[];
  womanGender: Gender=0;
  manGender: Gender=1;

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getAll().subscribe(data=>{
      this.students=data;
      this.srediStudente();
      console.log(this.students[0].gender.toString());
      console.log(Gender.Male.toString());
      console.log(this.students[0].isMale);
    },error=>{
      if(error.status==HttpStatusCode.BadRequest) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cannot get the students!!'
        });
        return;
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Server has stopped working!"
      });
      this.goToTheStopPage();
    })
  }

  srediStudente() {
    for(let s of this.students) {
      if(s.gender.toString()=="Male") {
        s.isMale=true;
      }
    }
  }

  deleteStudent(id: number) {
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
        this.studentService.deleteStudent(id).subscribe(data=>{
            console.log(data);
          Swal.fire(
          'Deleted!',
          'Student has been deleted.',
          'success'
          );
          this.getStudents();
          },error => {
            if(error.status==HttpStatusCode.BadRequest) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cannot delete the student!!'
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

  openForm() {
    this.router.navigate(['new-student']);
  }

  goToTheStopPage() {
    this.router.navigate(['server-error']);
  }
}
