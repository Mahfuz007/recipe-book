import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError,tap } from "rxjs/operators";

import { FIREBASE_API } from '../../apikeys';
import { User } from "./user.model";

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registed?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    private logOutExpire: any;
    constructor(private http: HttpClient, private router: Router){}

    signUp(email:string, password:string){
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`+FIREBASE_API,
            { email, password,
              returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData=>{
                this.handleAuthentication(resData.email,resData.localId,resData.idToken, +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+FIREBASE_API,{
            email, password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(resData=>{
                this.handleAuthentication(resData.email,resData.localId,resData.idToken, +resData.expiresIn);
            })
        );
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['auth']);
        localStorage.removeItem('userData');

        if(this.logOutExpire){
            clearTimeout(this.logOutExpire);
        }

        this.logOutExpire = null;
    }

    autoLogin(){
        const loginUser:{
            email:string, 
            userId:string,
            _token: string,
            _tokenExpiration: Date
        } = JSON.parse(localStorage.getItem('userData'));

        if(!loginUser){
            return;
        }

        const loadedUser = new User(loginUser.email,loginUser.userId,loginUser._token,loginUser._tokenExpiration);
        this.user.next(loadedUser);

        const expireDuration = new Date(loginUser._tokenExpiration).getTime() - new Date().getTime();
        this.autoLogout(expireDuration);
    }

    autoLogout(expiresIn:number){
        console.log(expiresIn);
        this.logOutExpire = setTimeout(() =>{
            this.logout();
        },expiresIn)
    }

    private handleAuthentication(email:string, userId:string,token:string, expiresIn: number){
        const expiresDate = new Date(new Date().getTime() + expiresIn*1000);
        const user = new User(email,userId, token, expiresDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(expiresIn*1000);
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMsg = "An Error occurred";
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMsg);
            }

            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMsg = "Email Already Exists";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMsg = "This email does not exist";
                    break;
                case 'INVALID_PASSWORD':
                    errorMsg = "This password is incorrect";
                    break;

            }

            return throwError(errorMsg);
    }
}