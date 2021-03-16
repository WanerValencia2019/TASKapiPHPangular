import { DomSanitizer } from '@angular/platform-browser';
import { Notes } from './../models/notesModel.interface';
import { AuthService } from './../../services/auth/auth.service';
import { TaskService } from './../../services/notes/task.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers:[MessageService]
})
export class EditComponent implements OnInit,DoCheck {

  taskId:number = -1;
  task:Notes = {
    title: '',
    completed:false,
    content:'',
    created_at:'',
    favorite:false,
    id:-1
  };
  editForm = new FormGroup({
    'title':new FormControl(''),
    'description':new FormControl(''),
    'favorite':new FormControl(false),
    'complete':new FormControl(false)
  })

  constructor(public sanitizer: DomSanitizer,private router:Router,private route:ActivatedRoute,private taskService:TaskService, private authService:AuthService, private messageService:MessageService) { }
  ngDoCheck(){
    if(!this.authService.user.logged){
      this.router.navigate(['/auth/login'])
    }
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.taskId = Number(routeParams.get('taskId'));
    this.task = this.taskService.notes.filter((task) => task.id == this.taskId)[0];
    console.log("ENTRA");

    let reg = RegExp('<br />','g');
    this.editForm.setValue({
      'title':this.task.title,
      'description':this.task.content.replace(reg,''),
      'favorite':this.task.favorite,
      'complete':this.task.completed
    })
  }
  submit(){
    if(this.editForm.valid){
      let id_tarea = this.taskId,
        token=this.authService.user.token,
        id_user = this.authService.user.id,
        title = this.editForm.value.title,
        content = this.editForm.value.description,
        favorite = this.editForm.value.favorite,
        complete=this.editForm.value.complete;

        this.taskService.update(token,id_user,id_tarea,title,content,favorite,complete)
        .subscribe((res)=>{
          this.messageService.add({ severity:'success', summary: 'Éxito', detail: 'Tarea actualizada correctamente'});
        },(error)=>{
          console.log(error);
          this.messageService.add({ severity:'error', summary: 'Error', detail: 'No se pudo actualizar la tarea'});
        })
    }
    console.log(this.editForm.value.description);
  }
}
