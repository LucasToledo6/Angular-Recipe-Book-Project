import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})

export class RecipeItemComponent {
  @Input() recipeItem: Recipe;
  @Input() index: number;
  // @Output() recipeSelected = new EventEmitter<void>();
  
  ngOnInit(){

  }
  
  // onSelected(){
  //   this.recipeService.recipeSelected.emit(this.recipeItem);
  // }
}
