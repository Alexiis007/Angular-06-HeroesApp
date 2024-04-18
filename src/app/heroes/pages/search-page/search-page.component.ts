import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/heros.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  constructor(private herosServices : HeroesService){}

  public searchInput = new FormControl('');
  public heroes : Hero[] = [];
  public selectedHero ?: Hero;

  public searchHero(){
    const value : string = this.searchInput.value || '';
    console.log(value);
    this.herosServices.getGuggestions(value)
    .subscribe(respuesta => this.heroes = respuesta )
  }
  public onSelectedOption(event : MatAutocompleteSelectedEvent):void{
    if( !event.option.value )
    {
      this.selectedHero = undefined;
      return;
    }
    const hero : Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
