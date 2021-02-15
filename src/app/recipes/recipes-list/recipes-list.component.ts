import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("First Recipe","This is the first Recipe","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0829Srb8IcjD0cD8NGAgI2Vuspo69rtkGA&usqp=CAU")
  ];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedRecipe(item:Recipe){
      this.recipeWasSelected.emit(item);
  }

}
