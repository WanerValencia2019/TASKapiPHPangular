import { TaskModule } from './task/task.module';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';

//PRIMENG COMPONENTS
import { MenubarModule } from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { TaskComponent } from './task/task.component';
import { NoteComponent } from './components/note/note.component';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    TaskModule,
    FormsModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
