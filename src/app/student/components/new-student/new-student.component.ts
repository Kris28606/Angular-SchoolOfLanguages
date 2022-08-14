import { HttpStatusCode } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/course/model/course';
import { CourseService } from 'src/app/course/service/course.service';
import Swal from 'sweetalert2';
import { Student } from '../../model/student';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {

  constructor(private courseService: CourseService, private studentService: StudentService,
    private router: Router) { }
  student: Student=new Student();
  courseList: pomocni[]=[];
  courses: Course[]=[];
  brojac: number=0;

  ngOnInit(): void {
    this.courseService.getCourseList().subscribe(data=> {
      this.courses=data;
      this.srediPomocni();
    }, error=> {

    });
  }

  vratiKurseve() {
    for(let i=0;i<this.courseList.length;i++) {
      if(this.courseList[i].isSelected) {
        for(let j=0;j<this.courses.length;j++) {
          if(this.courses[j].id==this.courseList[i].id) {
            this.student.courses[this.brojac++]=this.courses[j];
          }
        }
      }
    }
  }

  srediPomocni() {
    for(let i=0;i<this.courses.length;i++) {
      this.courseList[i]=new pomocni();
      this.courseList[i].name=this.courses[i].name;
      this.courseList[i].id=this.courses[i].id;
    }
  }

  saveStudent() {
    this.brojac=0;
    this.vratiKurseve();
    console.log(this.student);
    this.student.slika="https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png";
    this.studentService.save(this.student).subscribe(data=> {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Student has been created!',
        showConfirmButton: false,
        timer: 1500
      })
      this.goToStudentPage();
    }, error=> {
      if(error.status==HttpStatusCode.BadRequest) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
        this.goToStudentPage();
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

  goToTheStopPage() {
    this.router.navigate(['server-error']);
  }

  goToStudentPage() {
    this.router.navigate(['student']);
  }
}

class pomocni {
  id: number=-1;
  name: String='';
  isSelected: boolean=false
}
