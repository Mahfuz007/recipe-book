import { Subject } from "rxjs";

import { Ingredient } from "../Shared/ingredient.model";

export class ShoppingService{
    ingredientChanged = new Subject<Ingredient[]>();
    editableItem = new Subject<number>();
    ingredients:Ingredient[] = [
        new Ingredient("Apple",10),
        new Ingredient("Orange",20)
    ];

    getIngredient(){
        return this.ingredients.slice();
    }

    getIngredientByIndex(index:number):Ingredient{
        return this.ingredients[index];
    }

    onAddIngredient(item:Ingredient){
        this.ingredients.push(item);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredientFromRecipe(ingredient:Ingredient[]){
        this.ingredients.push(...ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}