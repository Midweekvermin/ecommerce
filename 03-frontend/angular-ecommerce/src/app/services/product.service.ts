import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
//created using ng generate service folder/name
/*
In Angular, a service is a class that provides reusable functionality
 that can be shared across different components and other parts of the application.
  Services are typically used to encapsulate business logic, data access, 
  and other operations that are meant to be reused. 
  They help to keep components lean and focused on presentation logic.
  */

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  //baseUrl defines where the api endpoint returns the list of products
  private baseUrl = 'http://localhost:8080/api/products' ;
  //consturctor injects httpclient for http requests
  private categoryURL = 'http://localhost:8080/api/product-category';
  
  constructor(private httpClient: HttpClient) { }

  getProduct(theId: number) : Observable<Product> {

    const productUrl = `${this.baseUrl}/${theId}`;

    return this.httpClient.get<Product>(productUrl);
  }


  getProductList(theCategoryId: number, currentPage: number, pageSize: number) : Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}
    &page=${currentPage}&size=${pageSize}`

    return this.getProducts(searchUrl);
  }

/*
 `getProductList() : Observable<Product[]>` : this initializes a function with the return
 type of Observable<Product[]> this returns and Observable that emits an array of Product objects.
 (what is an observable)

 `this.httpClient.get<GetResponse>(this.baseUrl)` : makes an HTTp get request to the specified URL
 and expects type <GetResponse>. (GetResponse is defined below)

 `.pipe(map(response => response._embedded.products));` : The pipe method is used to combine
  multiple operators. The map operator transforms the response to extract the 
  products array from the _embedded object in the response. (have chatgpt explain better)
*/

getProductCategories(): Observable<ProductCategory[]> {
  return this.httpClient.get<GetResponseProductCategory>(this.categoryURL)
  .pipe(map(response => response._embedded.productCategory));
}

searchProducts(theKeyword: string) {
  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`

    return this.getProducts(searchUrl);
}

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }
}



interface GetResponseProducts{
  _embedded: {
    products: Product[];
  }
}
interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
/* defines the expected structure of the response from the api
response contains an _embedded object which contains a products array 

this is based on the JSON that is returned from the url:
"_embedded": {
"products": [
{
"sku": "BOOK-TECH-1000",
"name": "JavaScript - The Fun Parts",
"description": "Learn JavaScript",
"unitPrice": 19.99,
"imageUrl": "assets/images/products/placeholder.png",
"active": true,
"unitsInStock": 100,
"dateCreated": "2024-06-26T08:47:08.000+00:00",
"lastUpdated": null,
*/