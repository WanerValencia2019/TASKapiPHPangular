import { Router } from '@angular/router';
import { LocalstorageService } from './../../../services/localStorage/localstorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import {Message,MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers:[MessageService]
})
export class ChangePasswordComponent implements OnInit, DoCheck {

  change_password_form = new FormGroup({
    username:new FormControl(''),
    old_password:new FormControl(''),
    new_password:new FormControl(''),
    password_confirm:new FormControl('')
  })
  constructor(private router:Router,private authService:AuthService, private messageService:MessageService, private storage:LocalstorageService) {
    if(!this.authService.user.logged){
      this.router.navigate(['/auth/login'])
    }
   }

  ngOnInit(): void {
    this.change_password_form.setValue({
      username:this.authService.user.username,
      old_password:'',
      new_password:'',
      password_confirm:''
    })
  }
  ngDoCheck(){
    if(!this.authService.user.logged){
      this.router.navigate(['/auth/login'])
    }
  }

  submit(){
    if(this.change_password_form.valid){
      const { username, old_password, new_password, password_confirm } = this.change_password_form.value;
      //console.log(username,old_password, new_password,password_confirm);
      this.authService.change_password(username,old_password,new_password, password_confirm)
      .subscribe((_res)=>{
        this.messageService.add({severity:'success',summary:'Éxito', detail:"Contraseña cambiada correctamente, vuelve a iniciar sesión"});
        setTimeout(()=>{
          this.storage.reset();
          this.authService.logout();
        },3000)
      }, (_err)=>{
        //console.log(_err);
        this.messageService.add({severity:'error',summary:'Error', detail:_err.error.message});
      })
    }
  }

}
