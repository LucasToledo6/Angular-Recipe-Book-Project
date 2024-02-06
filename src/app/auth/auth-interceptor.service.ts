import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1), //This operator takes the first value emitted by the user observable and then completes. It's used to ensure that the subscription is automatically unsubscribed after receiving the first value, preventing memory leaks
            exhaustMap(user => { //This operator maps the value emitted by the user observable (in this case, the user object) to a new observable. It then subscribes to this new observable and ignores other values emitted by the source observable until the new observable completes. Here, it's used to wait for the user data before proceeding with the HTTP request modification
                if (!user){
                    return next.handle(req); //If there is no user (i.e., the user is not logged in), the interceptor simply forwards the request unmodified by calling next.handle(req).
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }
}