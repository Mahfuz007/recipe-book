import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput',{static: false}) nameInputRef:ElementRef;
  @ViewChild('amountInput',{static: false}) amountInputRef:ElementRef;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }
  
  onAdded(){
    const name = this.nameInputRef.nativeElement.value;
    const amount = this.amountInputRef.nativeElement.value;
    this.shoppingService.onAddIngredient(new Ingredient(name,amount));
  }

}
