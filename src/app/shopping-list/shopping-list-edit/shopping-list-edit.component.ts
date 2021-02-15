import { Component, OnInit, ElementRef,ViewChild, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput',{static: false}) nameInputRef:ElementRef;
  @ViewChild('amountInput',{static: false}) amountInputRef:ElementRef;
  @Output() ingredients = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }
  
  onAdded(){
    const name = this.nameInputRef.nativeElement.value;
    const amount = this.amountInputRef.nativeElement.value;
    this.ingredients.emit(new Ingredient(name,amount));
  }

}
