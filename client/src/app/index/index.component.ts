import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe }  from '../recipe';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    
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
