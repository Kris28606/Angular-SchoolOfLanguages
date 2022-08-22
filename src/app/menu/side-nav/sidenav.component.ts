import { Component, OnInit } from '@angular/core';
import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  opened=false;

  constructor(private authService: AuthGuardGuard) { }

  ngOnInit(): void {
  }

  open() {
    if(this.authService.auth) {
      this.opened=!this.opened;
    }
  }
}
