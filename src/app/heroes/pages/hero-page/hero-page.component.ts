import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heros.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit{
  constructor(private herosServices : HeroesService, private activatedRout : ActivatedRoute, private router : Router){}
  public hero ?: Hero;
  ngOnInit(): void {
    this.activatedRout.params
      .pipe(
        delay(1000),
        switchMap( ({id}) => this.herosServices.getHerosByid(id) ),
      )
      .subscribe(
        hero => {
          if(!hero)
            return this.router.navigate(['/heroes/list'])
          this.hero = hero;
          console.log(this.hero);
          
          return;
        }
      )
  }
  public goBack(){
    this.router.navigateByUrl("heroes/list");
  }
}
