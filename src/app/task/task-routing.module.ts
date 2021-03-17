import { FavoritesComponent } from './favorites/favorites.component';
import { CompletesComponent } from './completes/completes.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'home',component:HomeComponent
  },
  {
    path:'create',component:CreateComponent,
  },
  {
    path:'edit/:taskId',component:EditComponent
  },
  {
    path:'completes',component:CompletesComponent
  },
  {
    path:'favorites',component:FavoritesComponent
  },
  {
    path:'', redirectTo:'home',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
