import { AuthService } from './../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TaskService } from './../../services/notes/task.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit,DoCheck {

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
    return task.favorite == true;
  }
}
