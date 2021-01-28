import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-last-recipes',
  templateUrl: './last-recipes.component.html',
  styleUrls: ['./last-recipes.component.scss']
})
export class LastRecipesComponent implements OnInit {

  recipes: Recipe[];
    
    constructor(private recipeService: RecipeService) { }
    
    getRecipes(): void {
        this.recipeService.getRecipes().subscribe(datas => {
            var res = datas['data'];
            this.recipes = res;
        },
        error => {
            console.log(error);
        });
    }
    
    ngOnInit(): void {
        this.getRecipes();
    }

}
