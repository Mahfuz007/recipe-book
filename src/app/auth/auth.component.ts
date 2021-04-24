import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../Shared/alert/alert.component";
import { PlaceholderDirective } from "../Shared/placeHolder/placeHolder.directive";
import { AuthResponseData, AuthService } from "./auth.service";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
    isLoggedIn = false;
    isLoading = false;
    errorMessage: string =null;
    authForm: FormGroup;
    closeSub:Subscription;

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    constructor(private authService: AuthService,
        private router: Router,
        private compenentFactoryResolver: ComponentFactoryResolver
        ){}

    
    ngOnInit(): void {
        this.initForm();
    }

    onSubmit(){
        if(!this.authForm.valid){
            return;
        }
        
        let authObs: Observable<AuthResponseData>;
        const email = this.authForm.value.email;
        const password = this.authForm.value.password;
        this.isLoading = true;

        if(this.isLoggedIn){
            authObs = this.authService.login(email, password);
        }else{
            authObs = this.authService.signUp(email,password);
        }

        authObs.subscribe(resData=>{
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        },errorMsg=>{
            this.errorMessage = errorMsg;
            this.isLoading = false;
            this.showErrorAlert(errorMsg);
        });

        this.authForm.reset();
    }
    
    swithcTo(){
        this.isLoggedIn = !this.isLoggedIn;
    }

    initForm(){
        this.authForm = new FormGroup({
            'email': new FormControl(null,[
                Validators.required,
                Validators.email
            ]),
            'password': new FormControl(null,[
                Validators.required,
                Validators.minLength(6)
            ])
        });
    }

    onErrorHandler(){
        this.errorMessage = null;
    }

    private showErrorAlert(message: string){
        const alertCmpFactory = this.compenentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.ViewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() =>{
            hostViewContainerRef.clear();
        })
    }

    ngOnDestroy() {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}