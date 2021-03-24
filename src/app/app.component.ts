import { LocalstorageService } from './services/localStorage/localstorage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public authService:AuthService, private storage:LocalstorageService){
      //storage.reset();
    }

}
