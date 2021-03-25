import { LocalstorageService } from './../localStorage/localstorage.service';
import { TaskService } from './../notes/task.service';
import { ErrorAPI } from './../errorsAPI.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/auth/models/userModel.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  initialUSER:User = {
    id:0,
    email:'',
    first_name:'',
    last_name:'',
    token:'',
    username:'',
    logged: false,
    error:false,
    errorMessage:'',
    success:false,
  };
  user:User = this.initialUSER
  error:ErrorAPI ={
    error:false,
    errorMessage:'',
    status:0,
    statusText:''
  }
  constructor(private http: HttpClient,private taskService:TaskService, private storage:LocalstorageService) {
      if(storage.get(storage.keys.auth) != null){
        this.user = storage.get(storage.keys.auth);
      }
  }

  register(form:any):Observable<any> {
    let data={
      'username':form.username,
      'password':form.password,
      'first_name':form.first_name,
      'last_name':form.last_name,
      'email':form.email

    }
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post('developer/api_task/auth/register.php',data,{headers: headers});
  }

  login(username:string, password:string):Observable<any>{
    let data={
      'username':username,
      'password':password
    }
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post('developer/api_task/auth/login.php',data,{headers: headers});
  }
  logout():boolean{
    this.http.post('developer/api_task/auth/logout.php',{},{headers: {
      'authorization':this.user.token
    }})
    .subscribe((_res:any)=>{
      this.storage.reset();
      this.user= this.initialUSER;
      this.taskService.notes=[];
      return true;
    },
    (_error: any)=>{
      this.user= this.initialUSER;
      this.storage.reset();
      this.error={...this.error,error:true, errorMessage:_error.error.message}
      return false;
    }
    );
    return false;
  }
}
