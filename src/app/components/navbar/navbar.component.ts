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
          icon:'pi pi-home'
      },
      {
        label: 'Blog',
        icon:PrimeIcons.BOOK
      },
      {
          label: 'Categorias',
          icon:PrimeIcons.LIST,
          items: [
              {label: 'Deportes', icon: PrimeIcons.BRIEFCASE},
              {label: 'Ciencia y tecnología', icon: 'pi pi-fw pi-refresh'},
              {label: 'Salud', icon: 'pi pi-fw pi-refresh'}
          ]
      }
  ];
  }

}
