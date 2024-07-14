import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  
  theId: number = 1;
  product!: Product;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }
    
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
  }