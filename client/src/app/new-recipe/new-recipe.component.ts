import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    public detailsMode: string = 'false'
    public recipe: Recipe = {
        name: "",
        serving: 0,
        duration: 0,
        type: 'no',
        difficulty: 1,
        url: ''
    };
    
    
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private api: ApiService) {}
    
    ngOnInit(): void {
        this.buildRecipeForm();
    }
    
    buildRecipeForm() {
        this.recipeForm = this.fb.group({
            name: ['', Validators.required],
            duration: [10, [Validators.min(1), Validators.max(180)]],
            serving: [4, Validators.min(1)],
            type: ['link', Validators.required],
            url: [''],
            details: this.fb.group({
                instructions: this.fb.array([]),
                ingredients: this.fb.array([])
            })
        });
        
        this.recipeForm.patchValue({
            details: {instructions: [{content: ''}]}
        });
    }
    
    save() {
        let data = this.recipeForm.value;
        this.api.addRecipe<Recipe>(Recipe, 'recipes', data as Recipe)
        .subscribe((result) => {
            console.log('Recipe saved', result);
            this.router.navigate(['/']);
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
    
    typeIsLink(): boolean {
        return this.recipeForm.get('type').value === 'link';
    }
    
    formIsValid() {
        return this.recipeForm.valid && (!this.typeIsLink() || this.recipeForm.get('url').value);
    }
    
}
