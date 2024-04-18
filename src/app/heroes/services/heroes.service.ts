import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
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
}
