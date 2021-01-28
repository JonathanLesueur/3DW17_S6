import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'last-recipe-shortcut',
  templateUrl: './last-recipe-shortcut.component.html',
  styleUrls: ['./last-recipe-shortcut.component.scss']
})
export class LastRecipeShortcutComponent implements OnInit {

  @Input() recipe: Recipe;
    
    constructor(private router: Router) { }
    
    ngOnInit(): void {}

}
