import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items:MenuItem[] = [];

  constructor(public authService:AuthService) {}

  ngOnInit(): void {
    this.items = [
      {
          label: 'Inicio',
          icon:'pi pi-home',
          routerLink:['/task/home'],
      },
      {
          label: 'Categorias',
          icon:PrimeIcons.LIST,
          items: [
              {label: 'Favoritos', icon: PrimeIcons.HEART, routerLink:['/task/favorites'] },
              {label: 'Completas', icon: PrimeIcons.CHECK_CIRCLE, routerLink:['/task/completes']},
          ]
      },
      {
        label: 'Añadir nueva tarea',
        styleClass:'add-task',
        icon: PrimeIcons.PLUS_CIRCLE,
        routerLink:['/task/create']
      }
  ];
  }

}
