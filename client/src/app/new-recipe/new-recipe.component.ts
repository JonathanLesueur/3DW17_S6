import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./new-recipe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewRecipeComponent implements OnInit {
    
    public recipeForm: FormGroup;
    public details: boolean = false;
    public detailsMode: string = 'false';
    public addResult: string = 'nothing';
    public resultMessage: string;
    public recipe: Recipe = {
        name: "",
        serving: 0,
        duration: 0,
        type: 'no',
        difficulty: 1,
        url: ''
    };

    
    
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private api: ApiService, private recipeService: RecipeService) {}
    
    ngOnInit(): void {
        this.recipeForm = new FormGroup({
            name: new FormControl(),
            serving: new FormControl(),
            difficulty: new FormControl(),
            duration: new FormControl(),
            url: new FormControl(),
            type: new FormControl('link')
        });
    }

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
    
    addRecipe() {
        console.log(this.recipeForm.value);
        this.api.addRecipe(this.recipeForm.value).subscribe(res => {
            if(res) {
                console.log('form: success');
                this.addResult = 'success';
                this.resultMessage = 'Recette ajoutée avec succès !';
            } else {
                console.log('form: failed');
                this.addResult = 'fail';
                this.resultMessage = 'Erreur lors de l\'enregistrement';
            }
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
