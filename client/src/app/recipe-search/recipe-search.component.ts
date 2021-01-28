import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
    debounceTime, distinctUntilChanged, filter, switchMap
} from 'rxjs/operators';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-recipe-search',
    templateUrl: './recipe-search.component.html',
    styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit {
    
    recipes$: Observable<Recipe[]>;
    private searchTerms = new Subject<string>();
    constructor(private recipeService: RecipeService) { }
    private terme: string;
    listLength: number;

    search(term: string): void {
        this.searchTerms.next(term);
        this.terme = term;
    }
    ngOnInit(): void {
        this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.recipeService.getRecipes())).subscribe(datas => {
                
                var newDatas = datas['data'].filter(recipe => recipe.name.toLowerCase().indexOf(this.terme) != -1);
                this.recipes$ = newDatas;
                this.listLength = newDatas.length;
            },
            error => {
                console.log(error);
            });
        }
        delActive(): void {
            this.listLength = 0;
        }
    }
    