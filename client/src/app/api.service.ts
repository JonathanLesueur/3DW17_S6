import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    private baseUrl: string = 'http://mymenu-api-public.matthieugiraud.fr';
    constructor(private http: HttpClient) { }
    
    /* Get all recipes */
    getRecipes() {
        return this.http.get<Recipe[]>(`${this.baseUrl}/recipes`, {responseType: 'json', observe: 'body'});
    }
    /* Get recipe by id */
    getRecipeByid(recipeId: string) {
        return this.http.get<Recipe>(`${this.baseUrl}/recipes/${recipeId}`, {responseType: 'json', observe: 'body'});
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
