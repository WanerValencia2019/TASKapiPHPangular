import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { HomeComponent } from './home/home.component';
import { NoteComponent } from '../components/note/note.component';
import {PanelModule} from 'primeng/panel';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MenuModule} from 'primeng/menu';
import {ToastModule} from 'primeng/toast';
import { EditComponent } from './edit/edit.component'
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    HomeComponent,
    NoteComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    CardModule,
    ButtonModule,
    PanelModule,
    MenuModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule
  ]
})
export class TaskModule { }
