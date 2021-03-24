import { LocalstorageService } from './../localStorage/localstorage.service';
import { Observable } from 'rxjs';
import { Notes } from '../../task/models/notesModel.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorAPI } from '../errorsAPI.interface';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  notes:Notes[]=[];
  error:ErrorAPI ={
    error:false,
    errorMessage:'',
    status:0,
    statusText:''
  }
  constructor(private http:HttpClient, private storage:LocalstorageService) {
    if(storage.get(storage.keys.notes) != null){
      this.notes = storage.get(storage.keys.notes);
    }
   }

  getAll(id_user:number, token:string){
    this.http.get(`developer/api_task/notes/list.php?id=${id_user}`,{headers: {
      'authorization':token
    }})
    .subscribe((_res:any)=>{
      this.notes = [];
      for (const data of _res.data) {
        this.notes.unshift({...data, favorite:parseInt(data.favorite) == 1 ? true:false, completed:parseInt(data.completed) == 1 ? true:false});
        this.storage.set(this.storage.keys.notes,this.notes);
      }
      console.log(this.notes);
    },
    (_error: any)=>{
      console.log(_error);
    }
    );
  }
  create(token:string, id_user:number, title:string,content:string, favorite:boolean):Observable<any>{
    let data = {
      'id_user':id_user,
      'title':title,
      'content':content,
      'favorite':favorite ? 1:0,
    }
    return this.http.post(`developer/api_task/notes/create.php`,data,{headers: {
      'authorization':token
    }});
  }
  update(token:string, id_user:number,id_tarea:number, title:string,content:string, favorite:boolean,complete:boolean):Observable<any>{
    let data = {
      'id_user':id_user,
      'id_tarea':id_tarea,
      'title':title,
      'content':content,
      'favorite':favorite ? 1:0,
      'complete':complete ? 1:0
    }
    return this.http.post(`developer/api_task/notes/update.php`,data,{headers: {
      'authorization':token
    }});
  }
  delete(token:string, id_user:number,id_tarea:number):Observable<any>{
    let data={
      'id_user':id_user,
      'id_tarea':id_tarea
    }
    return this.http.post(`developer/api_task/notes/delete.php`,data,{headers: {
      'authorization':token
    }});
  }
  updateFavorite(token:string, id_user:number,id_tarea:number,favorite:boolean):Observable<any>{
    let data={
      'id_user':id_user,
      'id_tarea':id_tarea,
      'favorite':favorite ? 1:0
    }
    return this.http.post(`developer/api_task/notes/update_favorite.php`,data,{headers: {
      'authorization':token
    }});
  }
  updateComplete(token:string, id_user:number,id_tarea:number,complete:boolean):Observable<any>{
    let data={
      'id_user':id_user,
      'id_tarea':id_tarea,
      'complete':complete ? 1:0
    }
    return this.http.post(`developer/api_task/notes/update_complete.php`,data,{headers: {
      'authorization':token
    }});
  }
}
