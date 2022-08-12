import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './menu/side-nav/sidenav.component';
import { HomeComponent } from './home/home.component';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { CourseModalComponent } from './course/componenets/course-modal/course-modal.component';
import { TeacherComponent } from './teacher/components/teacher.component';
import { CourseComponent } from './course/componenets/course/course.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateModalComponent } from './course/componenets/update-modal/update-modal.component';
import { NewTeacherComponent } from './teacher/components/newTeacher/new-teacher/new-teacher.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    CourseComponent,
    TeacherComponent,
    CourseModalComponent,
    UpdateModalComponent,
    NewTeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
