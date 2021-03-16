import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm = new FormGroup({
    'title':new FormControl(''),
    'description':new FormControl(''),
    'favorite':new FormControl(false),
  })
  constructor() { }

  ngOnInit(): void {
  }
  submit(){

  }

}
