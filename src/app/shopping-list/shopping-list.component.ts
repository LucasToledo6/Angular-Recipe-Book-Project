import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[];
  private ingredientChangeSub: Subscription;

  constructor(private slService: ShoppingListService, private loggingService: LoggingService){

  }

  ngOnInit(){
    this.ingredients = this.slService.getIngredients();
    this.ingredientChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => { 
        this.ingredients = ingredients; 
    });
    this.loggingService.printLog('Hello from ShoppingListComponent OnInit!')
  }

  ngOnDestroy(){
    this.ingredientChangeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }
}
