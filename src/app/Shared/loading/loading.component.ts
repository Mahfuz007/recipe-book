import { Component } from "@angular/core";

@Component({
    selector: 'app-loading',
    template: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent{
    // constructor(){
    //     console.log('Called from loading');
    // }
}