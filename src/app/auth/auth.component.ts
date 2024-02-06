import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData } from "./auth.service";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})

export class AuthComponent {

    isLoginMode = true; //a boolean flag to toggle between login and signup modes
    isLoading = false; //a boolean to show or hide a loading spinner, indicating an ongoing process
    error: string = null; //a string to store and display error messages from authentication processes

    private closeSub: Subscription;
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }
    // The constructor injects two services: 
    // AuthService for authentication-related operations (login/signup) and Router for navigating to other routes upon successful authentication

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {

        if (!form.valid) {
            return;
        }

        console.log(form.value);

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        let authObs: Observable<AuthResponseData>;

        // Depending on the mode, it assigns the authObs variable with the observable returned by either login or signup method of AuthService
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
            // this.authService.login(email, password).subscribe(resData => {
            //     console.log(resData);
            //     this.isLoading = false;
            // }, errorMessage => {
            //     console.log(errorMessage);
            //     this.error = errorMessage;
            //     this.isLoading = false;
            // })
        } else {
            authObs = this.authService.signup(email, password);
            // this.authService.signup(email, password).subscribe(
            //     resData => {
            //         console.log(resData);
            //         this.isLoading = false;
            //     },
            //     errorMessage => {
            //         console.log(errorMessage);
            //         this.error = errorMessage;
            //         this.isLoading = false;
            //     }
            // );
        }

        //It subscribes to authObs to handle the response:
        // On success, it logs the response, stops the loading spinner, and navigates to the /recipes route.
        // On error, it logs the error message, displays it, and stops the loading spinner.
        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    ngOnDestroy(){
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
    private showErrorAlert(message: string){
        // const alertCmp = new AlertComponent() // can't do that in Angular
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }
}