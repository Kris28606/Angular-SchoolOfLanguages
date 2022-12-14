import { HttpStatusCode } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/course/model/course';
import { CourseService } from 'src/app/course/service/course.service';
import { Gender } from 'src/app/gender/gender';
import { GenderService} from 'src/app/gender/gender.service.service';
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
    private router: Router, private genderService: GenderService) { }
  student: Student=new Student();
  courseList: pomocni[]=[];
  courses: Course[]=[];
  brojac: number=0;
  selectedGender: Gender=0;
  genders: Gender[]=[];

  ngOnInit(): void {
    this.genderService.getAll().subscribe(data=> {
      this.genders=data;
    }, error=> {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Server has stopped working!"
      });
      this.goToTheStopPage();
    });
    this.courseService.getCourseList().subscribe(data=> {
      this.courses=data;
      this.srediPomocni();
    }, error=> {
      if(error.status==HttpStatusCode.BadRequest) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Can't get courses!"
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
    this.student.gender=this.selectedGender;
    console.log(this.student);
    
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
          text: "Coudnt save the student!"
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
