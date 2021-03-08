import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) slFrom: NgForm;
  subscription: Subscription;
  isEdit = false;
  editItemIndex:number;
  editedItem;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
      this.subscription = this.shoppingService.editableItem.subscribe(
          (index:number)=>{
              this.isEdit = true;
              this.editItemIndex = index;
              this.editedItem = this.shoppingService.getIngredientByIndex(index); 
              this.slFrom.setValue({
                  name: this.editedItem.name,
                  amount: this.editedItem.amount
              });            
          }
      );
  }
  
  onAdded(form: NgForm) {
    const value = form.value;
    if(this.isEdit){
        this.shoppingService.updateIngredient(this.editItemIndex,new Ingredient(value.name,value.amount));
    }else{
      this.shoppingService.onAddIngredient(new Ingredient(value.name,value.amount));
    }

    this.isEdit = false;
    form.reset();
  }

  onClear(){
    this.slFrom.reset();
    this.isEdit = false;
  }

  onDelete(){
      this.shoppingService.deleteIngredient(this.editItemIndex);
      this.onClear();
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
