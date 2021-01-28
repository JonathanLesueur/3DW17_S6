import { Injectable } from '@angular/core';
import { RecipeStep } from './recipe-step';
import { STEPS } from './mock-recipe-steps';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipeStepService {

  constructor() { }

  getRecipeSteps(): Observable<RecipeStep[]> {
      return of(STEPS);
  }
  getRecipeStepById(stepId: number) {
      return STEPS.find(element => element.id === stepId);
  }
}
