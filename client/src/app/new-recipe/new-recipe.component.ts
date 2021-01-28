import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {
    
    public details: boolean = false;
    public detailsMode: string = 'false'
    public recipe: Recipe = {
        name: "",
        serving: 0,
        duration: 0,
        type: 'no',
        difficulty: 1,
        url: ''
    };
        
    
    constructor() {}
    
    ngOnInit(): void {}
    
    changeMode(detailType: string) {
        switch(detailType) {
            case 'url':
                this.details = false;
            break;
            case 'details':
                this.details = true;
            break;
            
        }
        this.detailsMode = detailType;
    }

    addRecipe(recipeForm) {
        console.log(recipeForm.value);
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
    
    changeTime(type: String): void {
        switch(type) {
            case 'down':
                this.recipe.duration--;
            break;
            case 'up':
                this.recipe.duration++;
            break;
        }
        
        (this.recipe.duration < 1) ? this.recipe.duration = 1 : '';
    }
    
    changeDifficulty(type: String): void {
        switch(type) {
            case 'down':
                this.recipe.difficulty--;
            break;
            case 'up':
                this.recipe.difficulty++;
            break;
        }
        
        if(this.recipe.difficulty < 1) {
            this.recipe.difficulty == 1;
        } else if(this.recipe.difficulty > 4) {
            this.recipe.difficulty = 4;
        }
    }
    
}
