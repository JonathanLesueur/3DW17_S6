import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';

export interface ApiFeathersResponse<T> {
    data: T[],
    limit: number,
    skip: number,
    total: number
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    private baseUrl: string = 'http://localhost:3030';

    constructor(private http: HttpClient) { }
    
    /* Get all recipes */
    getRecipes() {
        return this.http.get<Recipe[]>(`${this.baseUrl}/recipes`, {responseType: 'json', observe: 'body'});
    }
    /* Get recipe by id */
    getRecipeByid(recipeId: string) {
        return this.http.get<Recipe>(`${this.baseUrl}/recipes/${recipeId}`, {responseType: 'json', observe: 'body'});
    }
    addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
    }
    
    
    /* Get all ingredients (not soft deleted) */
    getIngredients() {
        return this.http.get<Ingredient[]>(`${this.baseUrl}/ingredients`, {responseType: 'json', observe: 'body'});
    }
    /* Get ingredient by id */
    getIngredientById(ingredientId: string) {
        return this.http.get<Ingredient>(`${this.baseUrl}/ingredients/${ingredientId}`, {responseType: 'json', observe: 'body'});
    }
    
    
}
