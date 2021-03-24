import { Notes } from './../../task/models/notesModel.interface';
import { User } from 'src/app/auth/models/userModel.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  storage:Storage
  constructor() {
      this.storage = window.localStorage;
  }

  keys = {
    auth:'auth',
    notes:'notes'
  }

  set(key:string,data:any):boolean{
    try {
      this.storage.setItem(key, JSON.stringify(data));
      return true;
    }catch(ex){
      return false;
    }
  }
  get(key:string){
    try {
      let data:any = this.storage.getItem(key);
      return JSON.parse(data);
    }catch(ex){
      return null;
    }
  }
  reset():boolean {
    let auth:User = {
      id:-1,
      email:'',
      first_name:'',
      last_name:'',
      token:'',
      username:'',
      logged: false,
      error:false,
      errorMessage:'',
      success:false,
    }
    let notes:Notes[]=[];
    try {
      this.storage.clear();
      this.storage.setItem(this.keys.auth,JSON.stringify(auth));
      this.storage.setItem(this.keys.notes,JSON.stringify(notes));
      return true;
    }catch(ex){
      return false;
    }
  }

}
