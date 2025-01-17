import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  //Selectors instruct angular to instantiate the component when the tag appears
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  currentPage: number = 0;
  pageSize: number = 5;
searchMode: boolean = false;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }
  //ngOnInit is called when the component is initialized one of the lifecycle hooks
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    } 
    else{

   this.handleListProducts();
    }
  }

handleListProducts(){
  const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
  if (hasCategoryId) {
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
  } else {
    this.currentCategoryId = 1;
  }

  this.productService.getProductList(this.currentCategoryId, this.currentPage, this.pageSize).subscribe(data => {
    this.products = data;
  })
}

pageChange(page:number){
  this.productService.getProductList(this.currentCategoryId, page, this.pageSize).subscribe(data => {
    this.products = data;
})}

handleSearchProducts(){
  const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

  this.productService.searchProducts(theKeyword).subscribe(
    data => {
      this.products = data;
    }
  )
}

addToCart(theProduct: Product) {

  console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

  const theCartItem = new CartItem(theProduct);
  this.cartService.addToCart(theCartItem);
  alert('Item added to cart.');

}

}
