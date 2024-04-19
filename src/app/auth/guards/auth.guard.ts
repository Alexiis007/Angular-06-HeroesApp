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
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';

// export let a : Observable<boolean>;

// export const estado = ( auth : AuthService, router : Router  )=>
// {
//     a = auth.checkAuthentication()
//    .pipe(
//     tap( autenticacion => {
//         if(!autenticacion)
//         {router.navigate(['./auth/login'])}
//     } )
//    )
// };

const checkAuthentication = ():Observable<boolean> =>
{
    //inyeccion
    const authServices : AuthService = inject(AuthService);
    const router : Router = inject(Router);

    return authServices.checkAuthentication()
    .pipe(
        tap(res=>{
            if(!res)
            {router.navigate(['./auth/login'])}
        })
    )
}

//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    console.log('CanActivate');
    console.log({ route, state });
    //se retorna false la ruta estara protegida 
    return checkAuthentication();
};

export const canMatchGuard: CanMatchFn = ( //Tipado CanMatchFN
    route: Route,
    segments: UrlSegment[]
) => {
    console.log('CanMatch');
    console.log({ route, segments });
    //se retorna false la ruta estara protegida
    return checkAuthentication();
};

