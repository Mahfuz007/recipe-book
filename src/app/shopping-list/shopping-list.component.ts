import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[] =[
    new Ingredient("Apple",10),
    new Ingredient("Orange",20)
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(item:Ingredient){
    this.ingredients.push(item);
  }

}
