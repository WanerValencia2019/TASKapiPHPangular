import { Router } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import {Message,MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit,DoCheck {

  ipassword = '';
  iusername = '';

  show=false;
  message:Message[]=[];


  formLogin = new FormGroup({
    username:new FormControl(''),
    password: new FormControl('')
  });



  constructor(public authService:AuthService, private router: Router, private messageService: MessageService) {
    if(this.authService.user.logged){
      this.router.navigate(['task/']);
    }
  }

  ngOnInit(): void {

  }

  ngDoCheck(){
    if(false !== this.authService.user.logged){
       this.router.navigate(['task/']);
    }
  }

  submit(){
    this.iusername = this.formLogin.value.username;
    this.ipassword = this.formLogin.value.password;

    this.authService.login(this.iusername, this.ipassword)
    .subscribe((_res:any)=>{
      this.authService.user= {..._res.data, logged:true, error:false, errorMessage: ''};
    },
    (_error: any)=>{
      this.authService.user={...this.authService.user, logged:false}
      this.authService.error={...this.authService.error,error:true, status:_error.status, statusText:_error.statusText,errorMessage:_error.error.message }
      if(this.authService.error.status > 500){
        this.messageService.add({severity:'error', summary:'Red', detail:'Revisa tu conexión a internet'});
      }else{
        this.messageService.add({severity:'error', summary:'Error', detail:'Contraseña o usuario son incorrectos'});
      }
    }
    );
  }


}
