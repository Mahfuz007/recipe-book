import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/authGuard.service";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const appRoutes: Routes = [
    {path: 'recipes', component: RecipesComponent, 
      canActivate: [AuthGuard],
      children: [
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailsComponent,
            resolve: [RecipeResolverService]    
        },
        {path: ':id/edit', component: RecipeEditComponent,
            resolve: [RecipeResolverService]
        },
        {path: '', component: RecipeStartComponent}
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class RecipeRouting{}