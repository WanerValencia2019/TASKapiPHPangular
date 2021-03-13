//import { Notes } from './../../task/models/notesModel.interface';
import { AuthService } from './../../services/auth/auth.service';
import { TaskService } from './../../services/notes/task.service';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import * as moment from 'moment';

moment.locale('es');

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class NoteComponent implements OnInit {


  items:MenuItem[]=[];
  @Input() title: string='';
  @Input() content: string='';
  @Input() favorite: boolean=false;
  @Input() complete: boolean=false;
  @Input() created_at: string='';
  @Input() id: number=-1;
  formatDate:any;

  constructor(public sanitizer: DomSanitizer, private taskService:TaskService, private authService:AuthService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit(): void {
    let dateString=new Date(this.created_at).toUTCString();
    console.log(dateString);
    this.formatDate=moment(dateString).fromNow();
  }
  deleteConfirmation(){
    this.confirmationService.confirm({
      message: `Estás seguro que deseas eliminar (${this.title})`,
      accept: () => {
        this.delete();
      },
      reject:()=>{
        this.messageService.add({ severity:'warn', summary: 'Cancelado', detail: 'Has cancelado la eliminación'});
      },
      icon:'pi pi-info-circle',
      acceptLabel:'Si',
      acceptButtonStyleClass:'p-button-danger',
      rejectButtonStyleClass:'p-button-outlined',
      rejectLabel:'No',
    });
  }
  delete(){
    const { token, id } = this.authService.user;
    this.taskService.delete(token,id,this.id)
    .subscribe((res)=>{
      this.messageService.add({ severity:'success', summary: 'Éxito', detail: 'Eliminada correctamente'});
      setTimeout(() => {
        this.taskService.notes = this.taskService.notes.filter((n)=>n.id !== this.id);
      }, 2000);
    },(error)=>{
      console.log(error);
      this.messageService.add({ severity:'error', summary: 'Error', detail: 'No se pudo eliminar la tarea'});
    })
  }
  updateFavorite(){
    const { token, id } = this.authService.user;
    this.taskService.updateFavorite(token,id,this.id, !this.favorite)
    .subscribe((res)=>{
      this.messageService.add({ severity:'success', summary: 'Éxito', detail: 'Tarea actualizada correctamente'});
      let index = this.taskService.notes.findIndex((note)=>note.id == this.id);
      this.taskService.notes[index].favorite = !this.favorite;
    },(error)=>{
      console.log(error);
      this.messageService.add({ severity:'error', summary: 'Error', detail: 'No se pudo actualizar la tarea'});
    })
  }
  updateComplete(){
    const { token, id } = this.authService.user;
    this.taskService.updateComplete(token,id,this.id, !this.complete)
    .subscribe((res)=>{
      this.messageService.add({ severity:'success', summary: 'Éxito', detail: 'Tarea actualizada correctamente'});
      let index = this.taskService.notes.findIndex((note)=>note.id == this.id);
      this.taskService.notes[index].completed = !this.complete;
    },(error)=>{
      console.log(error);
      this.messageService.add({ severity:'error', summary: 'Error', detail: 'No se pudo actualizar la tarea'});
    })
  }
}
