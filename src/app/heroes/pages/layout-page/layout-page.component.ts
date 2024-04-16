import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label:'Listado', icon:'label', url:'./list' },
    { label:'Agregar', icon:'label', url:'./new-hero' },
    { label:'Buscar', icon:'label', url:'./search' }
  ]
}
