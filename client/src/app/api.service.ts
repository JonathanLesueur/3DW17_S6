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
    private options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    private baseUrl: string = 'http://localhost:3030';
    
    constructor(private http: HttpClient) { }
    
    private mapData(data: any): any {
        if (_.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                let one: any = data[i];
                if (one._className) {
                    delete one._className;
                    data[i] = one;
                }
            }
        } else if (_.isObject(data) && (data as any)._className) {
            delete (data as any)._className;
        }
        return data;
    }
    /* Get all recipes */
    getRecipes() {
        return this.http.get<Recipe[]>(`${this.baseUrl}/recipes`, {responseType: 'json', observe: 'body'});
    }
    /* Get recipe by id */
    getRecipeByid(recipeId: string) {
        return this.http.get<Recipe>(`${this.baseUrl}/recipes/${recipeId}`, {responseType: 'json', observe: 'body'});
    }
    addRecipe<T>(T: new (any?) => T, url: string, data: T, options?: any) {
        
        return this.saveRecipe<T>(T, url, data, options);
        
    }
    
    saveRecipe<T>(T: new (any?) => T, url: string, data?: any, options?: any): Observable<T> {
        let sendOptions = this.options;
        if (options) {
            sendOptions = _.extend({}, this.options, options);
        }
        data = this.mapData(data);
        return this.http.post<T>(`${this.baseUrl}/${url}`, data, sendOptions)
        .pipe(
            map((item: T) => new T(item)),
            catchError(err => this.handleError(err))
            );
        }
        /* Get all ingredients (not soft deleted) */
        getIngredients() {
            return this.http.get<Ingredient[]>(`${this.baseUrl}/ingredients`, {responseType: 'json', observe: 'body'});
        }
        /* Get ingredient by id */
        getIngredientById(ingredientId: string) {
            return this.http.get<Ingredient>(`${this.baseUrl}/ingredients/${ingredientId}`, {responseType: 'json', observe: 'body'});
        }

        handleError(error: Response | any): Observable<any> {
            console.error('ApiService::handleError', error);
            return throwError(error);
          }
    }
    