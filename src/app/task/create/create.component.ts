import { AuthService } from './../../services/auth/auth.service';
import { TaskService } from './../../services/notes/task.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[MessageService]
})
export class CreateComponent implements OnInit,DoCheck {
  createForm = new FormGroup({
    'title':new FormControl(''),
    'description':new FormControl(''),
    'favorite':new FormControl(false),
  })
  constructor(private router:Router, private taskService:TaskService, private authService:AuthService, private messageService:MessageService) {
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
  submit(){
    if(this.createForm.valid){
      let token=this.authService.user.token,
      id_user = this.authService.user.id,
      title = this.createForm.value.title,
      content = this.createForm.value.description,
      favorite = this.createForm.value.favorite;
      this.taskService.create(token,id_user,title,content, favorite)
      .subscribe((res)=>{
        this.messageService.add({ severity:'success', summary: 'Éxito', detail: 'Tarea creada correctamente'});
        setTimeout(() => {
          this.router.navigate(['/task/home']);
        }, 2000);
      },(error)=>{
        this.messageService.add({ severity:'error', summary: 'Error', detail: 'No se pudo crear la tarea'});
      })
    }
  }

}
