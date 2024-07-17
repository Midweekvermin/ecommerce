import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{

  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  

constructor(private cartService: CartService){}

ngOnInit(): void {
  this.listCartDetails();
  
}
  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    this.cartService.computeCartTotals();
  }

  removeItem(item: CartItem){
    item.quantity--
    this.cartService.computeCartTotals();
    
    if(item.quantity <= 0){
      const itemIndex = this.cartItems.findIndex(tempItem => tempItem.id === item.id);
      this.cartService.cartItems.splice(itemIndex,1);
      this.listCartDetails();
    }
    //@TODO set a remove all button if item.quantity is greater than 1
  }

}
