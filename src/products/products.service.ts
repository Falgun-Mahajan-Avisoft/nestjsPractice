import { Injectable, Scope } from '@nestjs/common';
import { createProductsDTO } from './DTO/ProductsDTO'

// @Injectable({scope:Scope.TRANSIENT})
// @Injectable({scope:Scope.REQUEST})
@Injectable()
export class ProductsService {
  private products: createProductsDTO[] = [];

  constructor(){
    console.log("Service init");
    
  }

  createProducts(product:createProductsDTO):string {
    console.log("hello")
   this.products.push(product);
    return 'Products added';
  }

  getAllProducts(){
    return this.products;
  }

  getProduct(id:number){
    const prod =this.products.find((product) => product.id === id);
    return prod;
  }

  updateProduct(id:number, product:createProductsDTO){
    const prodIdx = this.products.findIndex((product) => product.id === id);
    if (!prodIdx) {
      return 'no data found';
    }
    this.products[prodIdx] = product;
    return this.products[prodIdx];
  }

  deleteProduct(id:number){
    this.products = this.products.filter((product) => product.id !== id);
    return "Product deleted";
  }
}
