import { Subject } from "rxjs";

import { Ingredient } from "../Shared/ingredient.model";

export class ShoppingService{
    ingredientChanged = new Subject<Ingredient[]>();
    ingredients:Ingredient[] = [
        new Ingredient("Apple",10),
        new Ingredient("Orange",20)
    ];

    getIngredient(){
        return this.ingredients.slice();
    }

    onAddIngredient(item:Ingredient){
        this.ingredients.push(item);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredientFromRecipe(ingredient:Ingredient[]){
        this.ingredients.push(...ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}