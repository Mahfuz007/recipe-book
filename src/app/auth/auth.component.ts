import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoggedIn = false;
    authForm: FormGroup;

    
    ngOnInit(): void {
        this.initForm();
    }

    onSubmit(){
        console.log(this.authForm.value);
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