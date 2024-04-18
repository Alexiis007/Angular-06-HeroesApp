import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, pipe } from 'rxjs';
import { Hero } from '../interfaces/heros.interface';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor( private http : HttpClient ) {  }

  public baseUrl : string = environment.baseUrl;

  public getHeros():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
  public getHerosByid(id : string):Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe( catchError(error => of(undefined) ) )
  }
  public getGuggestions(term : string):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${term}`)
  }
  public addHero(hero : Hero):Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero);
  }
  public updateHero( hero : Hero ):Observable<Hero>{
    if(!hero.id) throw Error('Hero id is required')
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero);
  }
  public deletedHero( id : string ):Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        //En dado caso que no haya pasado el catch(No hubieron errores)
        //Tomamos la respuesta que en este caso seria [] por que se ejecuto delete
        //Y regresamos en su caso true
        map( Response => true ),
        //Si se elimina un dato que no existe se ejecuta error 404
        //Captamos ese error y regresamos false
        catchError(err => of(false)),
      )
  }
}
