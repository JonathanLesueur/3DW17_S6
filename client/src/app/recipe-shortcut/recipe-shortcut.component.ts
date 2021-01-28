import { formatDate } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
    selector: 'recipe-shortcut',
    templateUrl: './recipe-shortcut.component.html',
    styleUrls: ['./recipe-shortcut.component.scss']
})
export class RecipeShortcutComponent implements OnInit {
    
    @Input() recipe: Recipe;
    
    constructor(private router: Router) { }
    
    ngOnInit(): void {}
    
}
