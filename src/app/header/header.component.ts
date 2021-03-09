import {Component} from '@angular/core';
import { DataStorageService} from '../Shared/dataStorageService.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{
    constructor(private dataStorageService: DataStorageService){}

    onSaveData(){
        this.dataStorageService.saveRecipe();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipe().subscribe();
    }
}