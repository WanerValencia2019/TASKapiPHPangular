import { AuthService } from './../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Notes } from './../models/notesModel.interface';
import { TaskService } from './../../services/notes/task.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-completes',
  templateUrl: './completes.component.html',
  styleUrls: ['./completes.component.css']
})
export class CompletesComponent implements OnInit,DoCheck {


  constructor(private router:Router, public taskService:TaskService, private authService:AuthService) {
    if(!authService.user.logged){
      router.navigate(['/auth/login'])
    }
   }
   ngDoCheck(){
    if(!this.authService.user.logged){
      this.router.navigate(['/auth/login'])
    }
  }

  ngOnInit(): void {

  }
  filter(task:any){
    return task.completed == true;
  }

}
