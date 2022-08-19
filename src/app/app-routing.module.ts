import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/componenets/course/course.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/components/invoice/invoice.component';
import { NewInvoiceComponent } from './invoice/components/new-invoice/new-invoice/new-invoice.component';
import { ServerStopComponent } from './serverError/server-stop/server-stop.component';
import { NewStudentComponent } from './student/components/new-student/new-student.component';
import { StudentComponent } from './student/components/student/student.component';
import { NewTeacherComponent } from './teacher/components/newTeacher/new-teacher/new-teacher.component';
import { TeacherComponent } from './teacher/components/teacher.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'course', component: CourseComponent
  },
  {
    path: 'teacher', component: TeacherComponent
  },
  {
    path: 'new-teacher', component: NewTeacherComponent
  },
  {
    path: 'update-teacher/:id', component: NewTeacherComponent
  },
  {
    path: 'student', component: StudentComponent
  },
  {
    path: 'server-error', component: ServerStopComponent
  },
  {
    path: 'new-student', component: NewStudentComponent
  },
  {
    path: 'invoice', component: InvoiceComponent
  },
  {
    path: 'new-invoice', component: NewInvoiceComponent
  },
  {
    path:'', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
