import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    CanMatchFn,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';

const checkAuthenticationPublic = ():Observable<boolean> =>
{
    //inyeccion
    const authServices : AuthService = inject(AuthService);
    const router : Router = inject(Router);

    return authServices.checkAuthentication()
    .pipe(
        map(res=>!res),
        tap(res=>{
            if(!res)
            {router.navigate(['./heroes/list'])}
        }),
    )
}

//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateGuardPublic: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    console.log('CanActivate');
    console.log({ route, state });
    //se retorna false la ruta estara protegida 
    return checkAuthenticationPublic();
};

export const canMatchGuardPublic: CanMatchFn = ( //Tipado CanMatchFN
    route: Route,
    segments: UrlSegment[]
) => {
    console.log('CanMatch');
    console.log({ route, segments });
    //se retorna false la ruta estara protegida
    return checkAuthenticationPublic();
};
