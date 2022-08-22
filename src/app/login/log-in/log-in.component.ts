import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../model/user';
import { LogInService } from '../service/log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user: User=new User();

  constructor(private userService: LogInService, private router: Router) { }

  ngOnInit(): void {
  }


  logIn() {
    console.log(this.user);
    if(this.user.username!="" && this.user.username!=null && this.user.password!="" && this.user.password!=null) {
      this.userService.logIn(this.user).subscribe(data=> {
        this.userService.isAuthenticated=true;
        this.user=data;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Welcome, '+this.user.firstName+" "+this.user.lastName+"!",
          showConfirmButton: false,
          timer: 1500
        });
        this.user=new User();
        console.log(this.userService.isAuthenticated);
        this.router.navigate(['home']);
      }, error=> {
        if(error.status==HttpStatusCode.BadRequest) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "User doesn't exist!"
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
    } else {
      Swal.fire({
        text: "Please fill the fields with correct values!"
      });
    }
  }

  goToTheStopPage() {
    this.router.navigate(['server-error']);
  }

}
