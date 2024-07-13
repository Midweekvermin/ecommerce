import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
=======
>>>>>>> 9c4b156e41c3d1a0a551bd042a2aca796b1386c3

@Component({
  //Selectors instruct angular to instantiate the component when the tag appears
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

products: Product[] = [];
<<<<<<< HEAD
currentCategoryId: number = 1;
  constructor(private productService: ProductService,
    private route: ActivatedRoute) {}
  //ngOnInit is called when the component is initialized one of the lifecycle hooks
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
    this.listProducts();
  });
  }
  listProducts() {
const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
if(hasCategoryId){
  this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
}else {
  this.currentCategoryId = 1;
}

    this.productService.getProductList(this.currentCategoryId).subscribe(data => {
=======
  constructor(private productService: ProductService) {
  
  }
  //ngOnInit is called when the component is initialized one of the lifecycle hooks
  ngOnInit(): void {
    this.listProducts();
  }
  listProducts() {
    this.productService.getProductList().subscribe(data => {
>>>>>>> 9c4b156e41c3d1a0a551bd042a2aca796b1386c3
      this.products = data;
    })
  }

}
