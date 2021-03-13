import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TaskComponent } from './task/task.component';


const routes: Routes = [
  {
    path:'auth',
    component:AuthComponent,
    loadChildren:()=>import('./auth/auth.module').then(m =>m.AuthModule)
  },

  {
    path:'task',
    component:TaskComponent,
    loadChildren:()=>import('./task/task.module').then(m=>m.TaskModule)
  },
  {
    path:'', redirectTo:'auth', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
