import { AuthService } from './../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService, Message } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[MessageService]
})
export class RegisterComponent implements OnInit,DoCheck {

  registerForm =new FormGroup({
    'first_name':new FormControl(''),
    'last_name':new FormControl(''),
    'username':new FormControl(''),
    'email':new FormControl(''),
    'password':new FormControl(''),
    'password_confirm':new FormControl(''),
  })
  show=false;
  message:Message[]=[];

  constructor(public authService:AuthService,private messageService:MessageService, private router: Router) {
    if(this.authService.user.logged){
      this.router.navigate(['task/']);
    }
  }

  ngOnInit(): void {}
  ngDoCheck(){
    if(false !== this.authService.user.logged){
     if(this.authService.user.logged){
       this.router.navigate(['task/']);
     }
    }
  }

  submit(){
    if(this.registerForm.status == "VALID") {
        this.authService.register({...this.registerForm.value})
        .subscribe((_res:any)=>{
          this.authService.user={...this.authService.user, success:true}
          this.authService.error={...this.authService.error, error:false}
          alert('Registrado correctamente, puedes iniciar sesión');
          this.router.navigate(['auth/login']);
        },
        (_error: any)=>{
          this.authService.user={...this.authService.user, logged:false,success:false}
          this.authService.error={...this.authService.error,error:true, status:_error.status, statusText:_error.statusText,errorMessage:_error.error.message }
          if(this.authService.error.status > 500){
            this.messageService.add({severity:'error', summary:'Red', detail:'Revisa tu conexión a internet'});
          }else{
            this.messageService.add({severity:'error', summary:'Error', detail:this.authService.error.errorMessage});
          }
        }
        );
    }

  }

}
