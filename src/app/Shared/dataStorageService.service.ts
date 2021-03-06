import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService){}

    saveRecipe(){
        const recipes = this.recipeService.getRecipe();
        this.http
            .put('https://recipe-book-c558d-default-rtdb.firebaseio.com/recipes.json',recipes)
            .subscribe(response => {
                console.log(response);
            })
    }

    fetchRecipe(){
        return this.http
            .get<Recipe[]>('https://recipe-book-c558d-default-rtdb.firebaseio.com/recipes.json')
            .pipe( map(recipes =>{
            return recipes.map(recipe =>{
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients:[]};
            })
        }),
        tap(recipes=>{
            this.recipeService.setRecipes(recipes);
        }));
    }
}