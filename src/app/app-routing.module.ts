import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/componenets/course/course.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/components/invoice/invoice.component';
import { NewInvoiceComponent } from './invoice/components/new-invoice/new-invoice/new-invoice.component';
import { LogInComponent } from './login/log-in/log-in.component';
import { ServerStopComponent } from './serverError/server-stop/server-stop.component';
import { NewStudentComponent } from './student/components/new-student/new-student.component';
import { StudentComponent } from './student/components/student/student.component';
import { NewTeacherComponent } from './teacher/components/newTeacher/new-teacher/new-teacher.component';
import { TeacherComponent } from './teacher/components/teacher.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full' ,
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'course', component: CourseComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'teacher', component: TeacherComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'new-teacher', component: NewTeacherComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'update-teacher/:id', component: NewTeacherComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'student', component: StudentComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'server-error', component: ServerStopComponent
  },
  {
    path: 'new-student', component: NewStudentComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'new-invoice', component: NewInvoiceComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'login', component: LogInComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
