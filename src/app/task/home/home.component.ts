import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskService } from '../../services/notes/task.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {

  constructor(public taskService:TaskService, private authService:AuthService, private router:Router) {
    if(!authService.user.logged){
      this.router.navigate(['auth/login'])
    }
   }

   ngDoCheck(){
    if(!this.authService.user.logged){
      this.router.navigate(['auth/login'])
    }
   }

  ngOnInit(): void {
    this.taskService.getAll(this.authService.user.id, this.authService.user.token);
  }

}
