import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';

@Component({
  //Selectors instruct angular to instantiate the component when the tag appears
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

products: Product[] = [];
  constructor(private productService: ProductService) {
  
  }
  //ngOnInit is called when the component is initialized one of the lifecycle hooks
  ngOnInit(): void {
    this.listProducts();
  }
  listProducts() {
    this.productService.getProductList().subscribe(data => {
      this.products = data;
    })
  }

}
