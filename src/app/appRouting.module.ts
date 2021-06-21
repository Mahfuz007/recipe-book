import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


const appRoutes:Routes = [
    {path: '', redirectTo: '/recipes', pathMatch:"full"},
    {path: 'auth', component: AuthComponent},
    {path: 'recipes',
     loadChildren: ()=> import('./recipes/recipe.module').then(m=> m.RecipeModule)
    },
    {path: 'shopping-list',
        loadChildren: ()=> import('./shopping-list/shopping.module').then(m=> m.ShoppingModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]    
})
export class AppRoutingModule{

}