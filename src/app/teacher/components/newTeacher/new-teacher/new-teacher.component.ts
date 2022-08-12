import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { City } from 'src/app/city/model/city';
import { CityService } from 'src/app/city/service/city.service';
import { Course } from 'src/app/course/model/course';
import { CourseService } from 'src/app/course/service/course.service';
import { Teacher } from 'src/app/teacher/model/teacher';
import { TeacherService } from 'src/app/teacher/service/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-teacher',
  templateUrl: './new-teacher.component.html',
  styleUrls: ['./new-teacher.component.css']
})
export class NewTeacherComponent implements OnInit {

  constructor(private cityService: CityService,
    private courseService: CourseService, private teacherService: TeacherService) { }
  cities: City[]=[];
  selectedValue: City=new City();
  teacher: Teacher=new Teacher();
  courses: Course[]=[];
  kursevi: Course[]=[];
  brojac: number=0;
  

  ngOnInit(): void {
    this.cityService.getAll().subscribe(data=>{
      this.cities=data;
    },error=> {
      console.log(error);
    });
    this.courseService.getCourseList().subscribe(data=>{
      this.courses=data;
      this.srediPomocni();
      console.log(this.courseList);
    }, error=> {
      console.log(error);
    });
    
  }

  courseList: pomocni[]=[];
  
  onChange() {
    console.log(this.courseList);
  }

  saveTeacher() {
    console.log(this.teacher);
    this.kursevi=[];
    this.brojac=0;
    this.teacher.courses=this.vratiKurseve();
    this.teacher.city=this.selectedValue;
    console.log(this.teacher);
    this.teacherService.saveTeacher(this.teacher).subscribe(data=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Teacher has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    },error=> {
      if(error.status==HttpStatusCode.BadRequest) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Teacher alredy exist!"
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

  goToTheStopPage() {

  }

  vratiKurseve():Array<Course> {
    for(let i=0;i<this.courseList.length;i++) {
      if(this.courseList[i].isSelected) {
        for(let j=0;j<this.courses.length;j++) {
          if(this.courses[j].id==this.courseList[i].id) {
            this.kursevi[this.brojac++]=this.courses[j];
          }
        }
      }
    }
    console.log(this.kursevi);
    return this.kursevi;
  }

  srediPomocni() {
    for(let i=0;i<this.courses.length;i++) {
      this.courseList[i]=new pomocni();
      this.courseList[i].name=this.courses[i].name;
      this.courseList[i].id=this.courses[i].id;
    }
  }
}

class pomocni {
  id: number=-1;
  name: String='';
  isSelected: boolean=false
}
