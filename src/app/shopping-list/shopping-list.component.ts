import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:Ingredient[];
  private isChangeSub:Subscription;

  constructor(private shoppingService:ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredient();
    this.isChangeSub = this.shoppingService.ingredientChanged.subscribe(
        (ingredients:Ingredient[]) => {
            this.ingredients = ingredients;
        }
    );
  }

  onEdit(index:number){
      this.shoppingService.editableItem.next(index);
  }

  ngOnDestroy(){
    this.isChangeSub.unsubscribe();
  }

}
