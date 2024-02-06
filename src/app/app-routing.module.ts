import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [

    // { path: '', redirectTo: '/recipes' }, //this gives an error, because the empty path is part of every route
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) }, //lazy loading
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }

]

@NgModule({

    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],

    exports: [RouterModule]

})

export class AppRoutingModule {

}