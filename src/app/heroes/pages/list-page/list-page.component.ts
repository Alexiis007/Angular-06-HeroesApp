import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heros.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit{
  constructor(private heroService : HeroesService){}
  public heros : Hero[] = [];
  ngOnInit(): void {
    this.heroService.getHeros()
      .subscribe( respuesta => this.heros = respuesta )
  }
}
