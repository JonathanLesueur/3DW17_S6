import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { RecipeShortcutComponent } from './recipe-shortcut/recipe-shortcut.component';
import { ListShortcutComponent } from './list-shortcut/list-shortcut.component';
import { RecipeStepComponent } from './recipe-step/recipe-step.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { LastRecipesComponent } from './last-recipes/last-recipes.component';
import { LastRecipeShortcutComponent } from './last-recipe-shortcut/last-recipe-shortcut.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RecipeComponent,
    MainNavComponent,
    MainHeaderComponent,
    MainFooterComponent,
    RecipeShortcutComponent,
    ListShortcutComponent,
    RecipeStepComponent,
    IngredientsComponent,
    NewRecipeComponent,
    RecipeSearchComponent,
    LastRecipesComponent,
    LastRecipeShortcutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{provide: localeFr, useValue: 'fr'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
