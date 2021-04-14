import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoggedIn = false;
    isLoading = false;
    errorMessage: string =null;
    authForm: FormGroup;

    constructor(private authService: AuthService,
        private router: Router){}

    
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
}