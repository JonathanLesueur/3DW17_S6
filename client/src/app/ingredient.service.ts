import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';
import { INGREDIENTS } from './mock-ingredients';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class IngredientService {

  constructor(private api: ApiService) { }

  getIngredients(): Observable<Ingredient[]> {
      var listIngredients = this.api.getIngredients();
      return listIngredients;
  }
  getIngredientById(ingredientId: string): Observable<Ingredient> {
      var ingredient = this.api.getIngredientById(ingredientId);
      return ingredient;
  }
}
