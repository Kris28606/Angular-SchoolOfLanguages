import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private courseService: CourseService, 
    private teacherService: TeacherService,
    private router: Router, private route: ActivatedRoute) { }
  cities: City[]=[];
  selectedValue: City=new City();
  teacher: Teacher=new Teacher();
  courses: Course[]=[];
  kursevi: Course[]=[];
  brojac: number=0;
  id: number=0;
  isUpdate: boolean=false;
  error: boolean=false;
  

  ngOnInit(): void {
    this.cityService.getAll().subscribe(data=>{
      this.cities=data;
    },error=> {
      this.error=true;
    });
    this.courseService.getCourseList().subscribe(data=>{
      this.courses=data;
      this.srediPomocni();
      console.log(this.courseList);
    }, error=> {
      this.error=true;
    });
    this.id=this.route.snapshot.params['id'];
    if(this.id!=undefined) {
      this.isUpdate=true;
      this.teacherService.getOne(this.id).subscribe(data=> {
        this.teacher=data;
        this.selectedValue=this.teacher.city;
        this.podesiKurseve();
      }, error=> {
        this.error=true;
      });
      if(this.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Server has stopped working!"
        });
        this.goToTheStopPage();
      }
    }
  }

  goToTheStopPage() {
    this.router.navigate(['server-error']);
  }

  courseList: pomocni[]=[];

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
        title: 'Teacher has been saved!',
        showConfirmButton: false,
        timer: 1500
      })
      this.goToTeacherPage();
    },error=> {
      if(error.status==HttpStatusCode.BadRequest) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Teacher alredy exist!"
        });
        this.goToTeacherPage();
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

  goToTeacherPage() {
    this.router.navigate(['teacher']);
  }


  podesiKurseve():Array<pomocni> {
    for(let i=0;i<this.teacher.courses.length;i++) {
      for(let j=0;j<this.courseList.length;j++) {
        if(this.teacher.courses[i].name==this.courseList[j].name) {
          this.courseList[j].isSelected=true;
        }
      }
    }
    return this.courseList;
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
    return this.kursevi;
  }

  srediPomocni() {
    for(let i=0;i<this.courses.length;i++) {
      this.courseList[i]=new pomocni();
      this.courseList[i].name=this.courses[i].name;
      this.courseList[i].id=this.courses[i].id;
    }
  }

  updateTeacher() {
    this.teacher.courses=this.vratiKurseve();
    this.teacher.city=this.selectedValue;
    console.log(this.teacher);
    this.teacherService.updateTeacher(this.teacher.id,this.teacher).subscribe(data=> {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Teacher has been updated!',
        showConfirmButton: false,
        timer: 1500
      })
      this.goToTeacherPage();
    },error=> {
      if(error.status==HttpStatusCode.BadRequest) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Teacher alredy exist!"
        });
        this.goToTeacherPage();
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



}

class pomocni {
  id: number=-1;
  name: String='';
  isSelected: boolean=false
}
