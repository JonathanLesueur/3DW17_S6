import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import {IngredientService } from '../ingredient.service';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})

export class RecipeComponent implements OnInit {
    
    public recipe: Recipe;
    
    constructor(private route: ActivatedRoute, private recipeService: RecipeService, private ingredientService: IngredientService) { }
    
    ngOnInit(): void {
        this.getRecipe();
    }
    
    getRecipe(): void {
        const currentId = this.route.snapshot.paramMap.get('id');
        this.recipeService.getRecipeById(currentId).subscribe(datas => {
            this.recipe = datas;
            //console.log(this.recipe);
            
            if(this.recipe.type == 'details') {
                this.buildIngredients();
            }
        },
        error => {
            console.log('recipe', error);
        });
    }
    buildIngredients():void {
        var object = this;
        this.recipe.details.ingredients.forEach((ingredient, index) => {
            this.ingredientService.getIngredientById(ingredient['ingredientId']).subscribe(externalIngredient => {
                ingredient['name'] = externalIngredient.name;
                ingredient['createdAt'] = externalIngredient.createdAt;
                ingredient['updatedAt'] = externalIngredient.updatedAt;
                ingredient['deletedAt'] = externalIngredient.deletedAt;
            },
            error => {
                console.log('ingredient', error);
            })
        });
    }
    
    changePersons(type: String): void {
        switch(type) {
            case 'down':
                this.recipe.serving--;
            break;
            case 'up':
                this.recipe.serving++;
            break;
        }
        
        (this.recipe.serving < 1) ? this.recipe.serving = 1 : '';
    }
}
