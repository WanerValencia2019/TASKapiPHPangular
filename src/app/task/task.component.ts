import { TaskService } from '../services/notes/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(public notesService:TaskService) { }

  ngOnInit(): void {
  }

}
