import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  constructor(private authServices : AuthService, private router : Router){}

  public sidebarItems = [
    { label:'Listado', icon:'label', url:'./list' },
    { label:'Agregar', icon:'add', url:'./new-hero' },
    { label:'Buscar', icon:'search', url:'./search' }
  ]

  get user():User | undefined{
    return this.authServices.currentUser;
  }

  public onLogout(){
     this.authServices.logout();
     this.router.navigate(['/auth/login'])
  }
}
