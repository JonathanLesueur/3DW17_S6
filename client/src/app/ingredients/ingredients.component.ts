import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  public time: number = 0;
  constructor() { }

  ngOnInit(): void {
  }
  changeTime(type: String): void{
    switch(type){
      case '+':
        this.time++;
      break;
      case '-':
        if(this.time>0){
          this.time--;
        }
      break;
    }
  }

}
