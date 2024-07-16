import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  
  theId: number = 1;
  product!: Product;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }
    
    ngOnInit(): void {
      this.route.paramMap.subscribe(() => {
        this.handleProduct();
      });
    }

    handleProduct(){
      this.theId = +this.route.snapshot.paramMap.get('id')!;
      this.productService.getProduct(this.theId).subscribe((data: Product) => {
        this.product = data;
    })
  }
  addIt(product: Product){
    product = this.product;
    const theCartItem = new CartItem(product);
  this.cartService.addToCart(theCartItem);
  alert('Item added to cart.');
  }
  }