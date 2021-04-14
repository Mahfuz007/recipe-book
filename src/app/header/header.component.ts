import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService} from '../Shared/dataStorageService.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private _unSubscribeAll: Subject<any>;
    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService){
            this._unSubscribeAll = new Subject();
        }

    ngOnInit(){
        this.authService.user.pipe(takeUntil(this._unSubscribeAll))
        .subscribe(
            (user)=>{
                this.isAuthenticated = !!user;
                console.log('isAuth = ', this.isAuthenticated);
            }
        );
    }

    onSaveData(){
        this.dataStorageService.saveRecipe();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipe().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(){
        this._unSubscribeAll.next();
        this._unSubscribeAll.complete();
    }
}