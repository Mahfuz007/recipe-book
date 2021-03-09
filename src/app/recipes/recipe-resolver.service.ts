import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../Shared/dataStorageService.service";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./recipes.model";


@Injectable({
    providedIn:'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService,
        private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipe();
        if(recipes.length===0){
            return this.dataStorageService.fetchRecipe();
        }else return recipes;
    }
}