import { DomSanitizer } from '@angular/platform-browser';
import { Notes } from './../models/notesModel.interface';
import { AuthService } from './../../services/auth/auth.service';
import { TaskService } from './../../services/notes/task.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit,DoCheck {

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
    'favorite':new FormControl(false)
  })

  constructor(public sanitizer: DomSanitizer,private router:Router,private route:ActivatedRoute,private taskService:TaskService, private authService:AuthService) { }
  ngDoCheck(){
    if(!this.authService.user.logged){
      this.router.navigate(['/auth/login'])
    }
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let taskId = routeParams.get('taskId');
    this.task = this.taskService.notes.filter((task) => task.id == Number(taskId))[0];
    let reg = RegExp('<br />','g');
    this.editForm.setValue({
      'title':this.task.title,
      'description':this.task.content.replace(reg,'haha'),
      'favorite':this.task.favorite
    })
  }
  submit(){
    console.log(this.editForm.value);
  }
}
