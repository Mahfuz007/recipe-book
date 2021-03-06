import { Injectable} from '@angular/core'
import { Subject } from 'rxjs'
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import {Recipe} from './recipes.model';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        // new Recipe("Grilled Turkish-Style Chicken Wings Recipe",
        // "An improved setup for skewers brings these grilled wings closer to the heat, while a marinade based",
        // "https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13-1500x1125.jpg",
        // [
        //     new Ingredient("Olive Oil",2),
        //     new Ingredient("meat",4)
        // ]),
        // new Recipe("Easy Homemade Chili",
        // "Easy homemade chili. Goes great with cornbread or over corn chips for a chili pie! I like to use ...",
        // "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F2905812.jpg&q=85",
        // [
        //     new Ingredient("beef",1),
        //     new Ingredient("onion",1)
        // ]),
    ];

    constructor(private slService: ShoppingService){}

    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(recipes);
    }
    
    getRecipe(){
        return this.recipes.slice();
    }

    getSingleRecipe(id:number){
        return this.recipes.slice()[id];
    }

    addIngredientToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredientFromRecipe(ingredients);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    
    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}