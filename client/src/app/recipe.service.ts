import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})

export class RecipeService {
    
    constructor(private api: ApiService) {};
    
    getRecipes(): Observable<Recipe[]> {
        return this.api.getRecipes();
    }
    
    getRecipeById(recipeId: string): Observable<Recipe> {
        var recipe = this.api.getRecipeByid(recipeId);
        return recipe;
    }
    
    searchByName(term: string): Observable<Recipe[]> {
        return this.api.getRecipes();
    }

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
                    
            console.error(error);
            return of(result as T);
        };
    }
}
      