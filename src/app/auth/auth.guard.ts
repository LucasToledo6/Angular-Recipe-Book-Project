import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {
    
    constructor (private authService: AuthService, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1), 
            map(user => { //Transforms the emitted user value into a boolean or UrlTree. If a user is authenticated (!!user evaluates to true), it allows route activation by returning true. If not authenticated, it prevents access by returning a UrlTree that redirects to the /auth route.
                const isAuth = !!user; 
                if(isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
            // tap(isAuth => {
            //  if(!isAuth) {
            //      this.router.navigate(['/auth']);  
            //  }   
            //})
        );
    }
}