import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Hero } from '../../heroes/interfaces/heros.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    private baseURL = environment.baseUrl;
    private user?: User;

    get currentUser(): User | undefined {
        if (!this.user) return undefined;
        //Clonacion v17 node
        return structuredClone(this.user);
    }

    public login(email: string, password: string): Observable<User> {
        return this.http.get<User>(`${this.baseURL}/users/1`)
            .pipe(
                tap(resp => this.user = resp),
                tap(resp => localStorage.setItem('token', resp.id.toString())),
            )
    }

    public checkAuthentication():Observable<boolean> {
        if (!localStorage.getItem('token')) {
            //los of sirven en los Observable tranformanco la info / data a algo(boolean)
            return of(false)            
        }
        const token = localStorage.getItem('token');
        return this.http.get<User>(`${this.baseURL}/users/1`)
            .pipe(
                tap(res => this.user = res),
                //map transforma la informacion. En este caso user que seria la respuesta
                //la tranforma en bool, si existe es true pero como es doble ! es lo opuesto false
                //si no existe es false y lo opusto true
                map(user => !!user),
                catchError(err => of(false)),
            );
    }

    public logout(): void {
        this.user = undefined;
        localStorage.clear();
    }
}